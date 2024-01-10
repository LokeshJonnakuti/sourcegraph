import React from 'react'

import { H4, Text } from '@sourcegraph/wildcard'

import { DismissibleAlert } from '../DismissibleAlert'

export const GitHubAppFailureAlert: React.FunctionComponent<React.PropsWithChildren<{ error: string | null }>> = ({
    error,
}) => (
    <DismissibleAlert className="mb-3" variant="danger">
        <div>
            {error ? <H4>Error connecting to Sourcegraph</H4> : <H4>Your GitHub App did not finish connecting to Sourcegraph correctly.</H4>}
            {error ? null : <Text className="m-0">The following error occurred during setup: {error}</Text>}
            {error ? null : <Text className="m-0">You may need to remove the GitHub App and try again.</Text>}
        </div>
    </DismissibleAlert>
)
