import React from 'react'

import { H4, Text, DismissibleAlert } from '@sourcegraph/wildcard'

import { DismissibleAlert } from '@sourcegraph/wildcard'

export const GitHubAppFailureAlert: React.FunctionComponent<React.PropsWithChildren<{ error: string }>> = ({
    error,
}) => (
    <DismissibleAlert className="mb-3" variant="danger">
        <div>
            <H4>Your GitHub App encountered an error.</H4>
            <Text className="m-0">The following error occurred during setup: {error}</Text>
            <Text className="m-0">Please review the error message and take appropriate action.</Text>
        </div>
    </DismissibleAlert>
)
