import React from 'react'

import { H4, Text } from '@sourcegraph/wildcard'

import { DismissibleAlert } from '../DismissibleAlert'

export const GitHubAppFailureAlert: React.FunctionComponent<React.PropsWithChildren<{ error: string }>> = ({
    error,
}) => (
    <DismissibleAlert className="mb-3" variant="danger">
        <div>
            <H4>Your GitHub App did not finish connecting to Sourcegraph correctly.</H4>
            <p className="m-0">An error occurred during setup: {error}</p>
            <p className="m-0">Please try removing the GitHub App and setting it up again.</p>
        </div>
    </DismissibleAlert>
)
