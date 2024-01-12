import React from 'react'

import { H4, Text } from '@sourcegraph/wildcard'

import { DismissibleAlert } from '../DismissibleAlert'

export const GitHubAppFailureAlert: React.FunctionComponent<React.PropsWithChildren<{ error: string }>> = ({
    error,
}) => (
    <DismissibleAlert className="mb-3" variant="danger">
        <div>
            <H4>An error occurred during setup. Please check the logs for more details.</H4>
            <Text className="m-0">The following error occurred during setup: {error}</Text>
            <Text className="m-0"></Text>
        </div>
    </DismissibleAlert>
)
