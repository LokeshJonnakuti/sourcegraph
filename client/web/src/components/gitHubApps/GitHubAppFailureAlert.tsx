import React from 'react'

import { H4, Text,Error as ErrorComponent } from '@sourcegraph/wildcard'

import { DismissibleAlert, Error as ErrorComponent } from '../DismissibleAlert'

export const GitHubAppFailureAlert: React.FunctionComponent<React.PropsWithChildren<{ error: string }>> = ({
    error,
}) => (
    <DismissibleAlert className="mb-3" variant="danger">
        <div>
            <H4>Your GitHub App did not finish connecting to Sourcegraph correctly.</H4>
            <ErrorComponent className="m-0">Error: {error}</ErrorComponent>
            <Text className="m-0">You may need to remove the GitHub App and try again.</Text>
        </div>
    </DismissibleAlert>
)
