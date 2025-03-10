package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/buildkite/go-buildkite/v3/buildkite"
	"github.com/gorilla/mux"
	"github.com/sourcegraph/log/logtest"
	"github.com/stretchr/testify/require"

	"github.com/sourcegraph/sourcegraph/dev/build-tracker/build"
	"github.com/sourcegraph/sourcegraph/dev/build-tracker/config"
	"github.com/sourcegraph/sourcegraph/dev/build-tracker/notify"
)

func TestGetBuild(t *testing.T) {
	logger := logtest.Scoped(t)

	req, _ := http.NewRequest(http.MethodGet, "/-/debug/1234", nil)
	req = mux.SetURLVars(req, map[string]string{"buildNumber": "1234"})
	t.Run("401 Unauthorized when in production mode and incorrect credentials", func(t *testing.T) {
		server := NewServer(logger, config.Config{Production: true, DebugPassword: "this is a test"})
		rec := httptest.NewRecorder()
		server.handleGetBuild(rec, req)

		require.Equal(t, http.StatusUnauthorized, rec.Result().StatusCode)

		req.SetBasicAuth("devx", "this is the wrong password")
		server.handleGetBuild(rec, req)

		require.Equal(t, http.StatusUnauthorized, rec.Result().StatusCode)
	})

	t.Run("404 for build that does not exist", func(t *testing.T) {
		server := NewServer(logger, config.Config{})
		rec := httptest.NewRecorder()
		server.handleGetBuild(rec, req)

		require.Equal(t, 404, rec.Result().StatusCode)
	})

	t.Run("get marshalled json for build", func(t *testing.T) {
		server := NewServer(logger, config.Config{})
		rec := httptest.NewRecorder()

		num := 1234
		url := "http://www.google.com"
		commit := "78926a5b3b836a8a104a5d5adf891e5626b1e405"
		pipelineID := "sourcegraph"
		msg := "this is a test"
		job := newJob(t, "job 1 test", 0)
		req = mux.SetURLVars(req, map[string]string{"buildNumber": "1234"})

		event := build.Event{
			Name: "build.finished",
			Build: buildkite.Build{
				Message: &msg,
				WebURL:  &url,
				Creator: &buildkite.Creator{
					AvatarURL: "https://www.gravatar.com/avatar/7d4f6781b10e48a94d1052c443d13149",
				},
				Pipeline: &buildkite.Pipeline{
					ID:   &pipelineID,
					Name: &pipelineID,
				},
				Author: &buildkite.Author{
					Name:  "William Bezuidenhout",
					Email: "william.bezuidenhout@sourcegraph.com",
				},
				Number: &num,
				URL:    &url,
				Commit: &commit,
			},
			Pipeline: buildkite.Pipeline{
				Name: &pipelineID,
			},
			Job: job.Job,
		}

		expected := event.WrappedBuild()
		expected.AddJob(event.WrappedJob())

		server.store.Add(&event)

		server.handleGetBuild(rec, req)

		require.Equal(t, 200, rec.Result().StatusCode)

		var result build.Build
		err := json.NewDecoder(rec.Body).Decode(&result)
		require.NoError(t, err)
		require.Equal(t, *expected, result)
	})

	t.Run("200 with valid credentials in production mode", func(t *testing.T) {
		server := NewServer(logger, config.Config{Production: true, DebugPassword: "this is a test"})
		rec := httptest.NewRecorder()

		req.SetBasicAuth("devx", server.config.DebugPassword)
		num := 1234
		server.store.Add(&build.Event{
			Name: "Fake",
			Build: buildkite.Build{
				Number: &num,
			},
			Pipeline: buildkite.Pipeline{},
			Job:      buildkite.Job{},
		})
		server.handleGetBuild(rec, req)

		require.Equal(t, http.StatusOK, rec.Result().StatusCode)
	})
}

func TestOldBuildsGetDeleted(t *testing.T) {
	logger := logtest.Scoped(t)

	finishedBuild := func(num int, state string, finishedAt time.Time) *build.Build {
		b := buildkite.Build{}
		b.State = &state
		b.Number = &num
		b.FinishedAt = &buildkite.Timestamp{Time: finishedAt}

		return &build.Build{Build: b}
	}

	t.Run("All old builds get removed", func(t *testing.T) {
		server := NewServer(logger, config.Config{})
		b := finishedBuild(1, "passed", time.Now().AddDate(-1, 0, 0))
		server.store.Set(b)

		b = finishedBuild(2, "canceled", time.Now().AddDate(0, -1, 0))
		server.store.Set(b)

		b = finishedBuild(3, "failed", time.Now().AddDate(0, 0, -1))
		server.store.Set(b)

		stopFunc := server.startCleaner(10*time.Millisecond, 24*time.Hour)
		time.Sleep(20 * time.Millisecond)
		stopFunc()

		builds := server.store.FinishedBuilds()

		if len(builds) != 0 {
			t.Errorf("Not all old builds removed. Got %d, wanted %d", len(builds), 0)
		}
	})
	t.Run("1 build left after old builds are removed", func(t *testing.T) {
		server := NewServer(logger, config.Config{})
		b := finishedBuild(1, "canceled", time.Now().AddDate(-1, 0, 0))
		server.store.Set(b)

		b = finishedBuild(2, "passed", time.Now().AddDate(0, -1, 0))
		server.store.Set(b)

		b = finishedBuild(3, "failed", time.Now())
		server.store.Set(b)

		stopFunc := server.startCleaner(10*time.Millisecond, 24*time.Hour)
		time.Sleep(20 * time.Millisecond)
		stopFunc()

		builds := server.store.FinishedBuilds()

		if len(builds) != 1 {
			t.Errorf("Expected one build to be left over. Got %d, wanted %d", len(builds), 1)
		}
	})

}

type MockNotificationClient struct {
	sendCalled            int
	getNotificationCalled int
	GetNotificationFunc   func(int) *notify.SlackNotification
	SendFunc              func(*notify.BuildNotification) error
}

func (m *MockNotificationClient) Reset() {
	m.sendCalled = 0
	m.getNotificationCalled = 0
}

// GetNotification implements notify.NotificationClient.
func (m *MockNotificationClient) GetNotification(buildNumber int) *notify.SlackNotification {
	m.getNotificationCalled++
	if m.GetNotificationFunc != nil {
		return m.GetNotificationFunc(buildNumber)
	}
	return &notify.SlackNotification{}
}

// Send implements notify.NotificationClient.
func (m *MockNotificationClient) Send(info *notify.BuildNotification) error {
	m.sendCalled++
	if m.SendFunc != nil {
		return m.SendFunc(info)
	}
	return nil
}

var _ notify.NotificationClient = (*MockNotificationClient)(nil)

func TestProcessEvent(t *testing.T) {
	logger := logtest.Scoped(t)
	newJobEvent := func(name string, buildNumber int, jobExitCode int) *build.Event {
		state := "done"
		pipelineID := "pipeline"
		pipeline := &buildkite.Pipeline{
			ID:   &pipelineID,
			Name: &pipelineID,
		}
		jobState := build.JobFinishedState
		job := buildkite.Job{Name: &name, ExitStatus: &jobExitCode, State: &jobState}
		return &build.Event{Name: build.EventJobFinished, Build: buildkite.Build{State: &state, Number: &buildNumber, Pipeline: pipeline}, Job: job}
	}
	newBuildEvent := func(name string, buildNumber int, state string, jobExitCode int) *build.Event {
		job := newJobEvent(name, buildNumber, jobExitCode)
		pipelineID := "pipeline"
		pipeline := &buildkite.Pipeline{
			ID:   &pipelineID,
			Name: &pipelineID,
		}
		return &build.Event{Name: build.EventBuildFinished, Build: buildkite.Build{State: &state, Number: &buildNumber, Pipeline: pipeline}, Job: job.Job}
	}
	t.Run("no send notification on unfinished builds", func(t *testing.T) {
		server := NewServer(logger, config.Config{})
		mockNotifyClient := &MockNotificationClient{}
		server.notifyClient = mockNotifyClient
		buildNumber := 1234
		buildStartedEvent := newBuildEvent("test 2", buildNumber, "failed", 1)
		buildStartedEvent.Name = "build.started"
		server.processEvent(buildStartedEvent)
		require.Equal(t, 0, mockNotifyClient.sendCalled)
		server.processEvent(newJobEvent("test", buildNumber, 0))
		// build is not finished so we should send nothing
		require.Equal(t, 0, mockNotifyClient.sendCalled)

		builds := server.store.FinishedBuilds()
		require.Equal(t, 1, len(builds))
	})

	t.Run("failed build sends notification", func(t *testing.T) {
		server := NewServer(logger, config.Config{})
		mockNotifyClient := &MockNotificationClient{}
		server.notifyClient = mockNotifyClient
		buildNumber := 1234
		server.processEvent(newJobEvent("test", buildNumber, 0))
		server.processEvent(newBuildEvent("test 2", buildNumber, "failed", 1))

		require.Equal(t, 1, mockNotifyClient.sendCalled)

		builds := server.store.FinishedBuilds()
		require.Equal(t, 1, len(builds))
		require.Equal(t, 1234, *builds[0].Number)
		require.Equal(t, "failed", *builds[0].State)
	})

	t.Run("passed build sends notification", func(t *testing.T) {
		server := NewServer(logger, config.Config{})
		mockNotifyClient := &MockNotificationClient{}
		server.notifyClient = mockNotifyClient
		buildNumber := 1234
		server.processEvent(newJobEvent("test", buildNumber, 0))
		server.processEvent(newBuildEvent("test 2", buildNumber, "passed", 0))

		require.Equal(t, 0, mockNotifyClient.sendCalled)

		builds := server.store.FinishedBuilds()
		require.Equal(t, 1, len(builds))
		require.Equal(t, 1234, *builds[0].Number)
		require.Equal(t, "passed", *builds[0].State)
	})

	t.Run("failed build, then passed build sends fixed notification", func(t *testing.T) {
		server := NewServer(logger, config.Config{})
		mockNotifyClient := &MockNotificationClient{}
		server.notifyClient = mockNotifyClient
		buildNumber := 1234

		server.processEvent(newJobEvent("test 1", buildNumber, 1))
		server.processEvent(newBuildEvent("test 2", buildNumber, "failed", 1))

		require.Equal(t, 1, mockNotifyClient.sendCalled)

		builds := server.store.FinishedBuilds()
		require.Equal(t, 1, len(builds))
		require.Equal(t, 1234, *builds[0].Number)
		require.Equal(t, "failed", *builds[0].State)

		server.processEvent(newJobEvent("test 1", buildNumber, 0))
		server.processEvent(newBuildEvent("test 2", buildNumber, "passed", 0))

		builds = server.store.FinishedBuilds()
		require.Equal(t, 1, len(builds))
		require.Equal(t, 1234, *builds[0].Number)
		require.Equal(t, "passed", *builds[0].State)

		// fixed notification
		require.Equal(t, 2, mockNotifyClient.sendCalled)
	})
}
