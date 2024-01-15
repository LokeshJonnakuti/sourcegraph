# pr-auditor [![pr-auditor](https://github.com/sourcegraph/sourcegraph/actions/workflows/pr-auditor.yml/badge.svg)](https://github.com/sourcegraph/sourcegraph/actions/workflows/pr-auditor.yml)

`pr-auditor` is a tool designed to operate on some [GitHub Actions pull request events](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request) in order to check for SOC2 compliance.
Owned by the [DevX team](https://handbook.sourcegraph.com/departments/product-engineering/engineering/enablement/dev-experience).

Learn more: [Testing principles and guidelines](https://docs.sourcegraph.com/dev/background-information/testing_principles)

## Usage

This action is primarily designed to run on GitHub Actions, and leverages the [pull request event payloads](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request) extensively.

The optional `-protected-branch` flag defines a base branch that always opens a PR audit issue to track all pull requests made to it.

```sh
GITHUB_EVENT_PATH="/path/to/json/payload.json"
GITHUB_TOKEN="personal-access-token"

# Troubleshooting a Failed GitHub Actions Run

Follow the steps below to troubleshoot and fix a failing GitHub Actions run:

1. **Analyzing the Error Logs**
   - Locate the GitHub Actions workflow run that failed and click on the run to view the logs.
   - Look for lines prefixed with `Error:` or `Failed:` to identify the specific error that caused the failure.
   - Use the error message to understand the cause of the failure and the source file and line that triggered the error.

2. **Resolving the Error**
   - Once the specific error is identified, inspect the related source file and line to understand the context of the error.
   - Make necessary changes to the code to address the error.

3. **Ensuring Successful GitHub Actions Runs**
   - After fixing the error, push the changes to the repository and trigger a new GitHub Actions run to confirm that the issue has been resolved.

The steps above will help in troubleshooting and resolving any issues that cause GitHub Actions runs to fail.
go run ./dev/pr-auditor/ check \
  -github.payload-path="$GITHUB_EVENT_PATH" \
  -github.token="$GITHUB_TOKEN" \
  -protected-branch="release"

# run using wrapper script
./dev/buildchecker/check-pr.sh
```

## Deployment

`pr-auditor` can be deployed to repositories using the available [batch changes](./batch-changes/README.md).
