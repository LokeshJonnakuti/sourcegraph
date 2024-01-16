import React from 'react'

import { H4, Text } from '@sourcegraph/wildcard'

import { DismissibleAlert } from '../DismissibleAlert'

export const GitHubAppFailureAlert: React.FunctionComponent<React.PropsWithChildren<{ error: string }>> = ({
    error,
}) => (
    <DismissibleAlert className="mb-3" variant="danger" onClose={handleClose}>
        <div>
            <H4>Your GitHub App did not finish connecting to Sourcegraph correctly.</H4>
            <Text className="m-0">The following error occurred during setup: {error}</Text>
            <Text className="m-0">You may need to remove the GitHub App and try again. If the issue persists, please check your GitHub App configuration and permissions.</Text>
        </div>
    </DismissibleAlert>
)
