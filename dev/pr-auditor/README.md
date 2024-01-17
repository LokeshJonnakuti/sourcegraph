# pr-auditor [![pr-auditor](https://github.com/sourcegraph/sourcegraph/actions/workflows/pr-auditor.yml/badge.svg)](https://github.com/sourcegraph/sourcegraph/actions/workflows/pr-auditor.yml)

`pr-auditor` is a tool designed to operate on some [GitHub Actions pull request events](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request) to identify and fix issues with pull requests and to check for SOC2 compliance.
Owned by the [DevX team](https://handbook.sourcegraph.com/departments/product-engineering/engineering/enablement/dev-experience).

Learn more: [Testing principles and guidelines](https://docs.sourcegraph.com/dev/background-information/testing_principles)

## Usage

The following installation or configuration steps are required:

The optional `-protected-branch` flag defines a base branch that always opens a PR audit issue to track all pull requests made to it.

```sh
GITHUB_EVENT_PATH="/path/to/json/payload.json"
GITHUB_TOKEN="personal-access-token"

# run directly
go run ./dev/pr-auditor/ check \
  -github.payload-path="$GITHUB_EVENT_PATH" \
  -github.token="$GITHUB_TOKEN" \
  -protected-branch="release"

# run using wrapper script
go run ./dev/pr-auditor/check -github.payload-path="$GITHUB_EVENT_PATH" -github.token="$GITHUB_TOKEN" -protected-branch="main"
```

## Deployment

`pr-auditor` can be deployed to repositories using the available [batch changes](./batch-changes/README.md).
