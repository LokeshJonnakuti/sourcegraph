import React from 'react'

import { H4, Text } from '@sourcegraph/wildcard'

import { DismissibleAlert } from '../DismissibleAlert'

export const GitHubAppFailureAlert: React.FunctionComponent<React.PropsWithChildren<{ error: string }>> = ({
    error,
}) => (
    <DismissibleAlert className="mb-3" variant="danger">
        <div>
            <H4>Your GitHub App did not finish connecting to Sourcegraph correctly. Error message: </H4>
            <Text className="m-0">The following error occurred during setup: {error}</Text>
            <Text className="m-0">Please resolve the issue and try connecting again.</Text>
        </div>
    </DismissibleAlert>
)
