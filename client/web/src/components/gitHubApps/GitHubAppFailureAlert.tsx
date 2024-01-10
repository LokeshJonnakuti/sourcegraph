import React from 'react'

import { H4, Text } from '@sourcegraph/wildcard'

import { DismissibleAlert } from '../DismissibleAlert'

export const GitHubAppFailureAlert: React.FunctionComponent<React.PropsWithChildren<{ error: string }>> = ({
    error,
}) => (
    <DismissibleAlert className="mb-3" variant="danger">
        <div>
            <H4>There was an error connecting your GitHub App to Sourcegraph.</H4>
            <Text className="m-0">The following error occurred during setup: {error}</Text>
            <Text className="m-0">Please check your GitHub App configuration and try again.</Text>
        </div>
    </DismissibleAlert>
)
            <Text className="m-0">If the issue persists, please contact support for further assistance.</Text>
            <Text className="m-0">If the issue persists, please contact support for further assistance.</Text>
