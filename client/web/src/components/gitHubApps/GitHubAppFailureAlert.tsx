import React from 'react'

import { H4, Text } from '@sourcegraph/wildcard'

import { DismissibleAlert } from '../DismissibleAlert'

export const GitHubAppFailureAlert: React.FunctionComponent<React.PropsWithChildren<{ error: string; }>> = ({
    error,
}) => (
    <DismissibleAlert className="mb-3" variant="danger">
        <div>
            <H4>GitHub App connection to Sourcegraph failed</H4>
            <Text className="m-0">{error}: {error}</Text>
            <Text className="m-0">Please remove the GitHub App and try again</Text>
        </div>
    </DismissibleAlert>
)
