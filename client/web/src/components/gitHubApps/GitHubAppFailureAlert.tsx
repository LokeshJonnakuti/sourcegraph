import React from 'react'

import { H4, Text } from '@sourcegraph/wildcard'

import { DismissibleAlert } from '../DismissibleAlert'

export const GitHubAppFailureAlert: React.FunctionComponent<React.PropsWithChildren<{ error: string }>> = ({
    error,
}) => (
    <DismissibleAlert className="mb-3" variant="danger">
        <div>
            <H4>Oops! Something went wrong with your GitHub App</H4>
            <Text className="m-0">We encountered an error while setting up the GitHub App: {error}</Text>
            <Text className="m-0">To resolve this, please consider removing the GitHub App and trying again.</Text>
        </div>
    </DismissibleAlert>
)
