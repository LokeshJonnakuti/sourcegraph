import React from 'react'

import { H4, Text } from '@sourcegraph/wildcard'

import { DismissibleAlert, Badge } from '../DismissibleAlert'

export const GitHubAppFailureAlert: React.FunctionComponent<React.PropsWithChildren<{ error: string }>> = ({
    error,
}) => (
    <DismissibleAlert className="mb-3" variant="danger">
        <div>
            <H4>Your GitHub App did not finish connecting to Sourcegraph correctly.</H4>
            <Badge className="m-0" variant="error">{error}</Badge>
            <Text className="m-0">You may need to remove the GitHub App and try again.</Text>
        </div>
    </DismissibleAlert>
)
