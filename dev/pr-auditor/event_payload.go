package prauditor

import (
	"encoding/json"
	"log"
)

type EventPayload struct {
	// Define the fields of the EventPayload struct based on the structure of the payload data
	PullRequest PullRequest `json:"pull_request"`
	Action      string      `json:"action"`
	// Add other fields as needed
}

type PullRequest struct {
	URL   string `json:"url"`
	Draft bool   `json:"draft"`
	Merged bool   `json:"merged"`
	Base  Base   `json:"base"`
	// Add other fields as needed
}

type Base struct {
	Ref string `json:"ref"`
	// Add other fields as needed
}

// ParsePayload parses the payload JSON into an EventPayload struct
func ParsePayload(payloadData []byte) (*EventPayload, error) {
	var payload EventPayload
	err := json.Unmarshal(payloadData, &payload)
	if err != nil {
		log.Println("Failed to parse payload:", err)
		return nil, err
	}
	return &payload, nil
}

// HandlePayload handles the event payload by performing the necessary checks and actions
func HandlePayload(payload *EventPayload) {
	// Perform checks and actions based on the payload data
	if payload.PullRequest.Merged {
		// Handle merged pull request
	} else {
		// Handle non-merged pull request
	}
}
