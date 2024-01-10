import React from 'react'

import { H4, Text } from '@sourcegraph/wildcard'

import { DismissibleAlert } from '../DismissibleAlert'

export const GitHubAppFailureAlert: React.FunctionComponent<React.PropsWithChildren<{ error: string }>> = ({
    error,
}) => (
    <DismissibleAlert className="mb-3" variant="danger">
        <div>
            <H4>Oops, something went wrong!</H4>
            <Text className="m-0">An error occurred while setting up your GitHub App: {error}</Text>
            <Text className="m-0">Please try removing the GitHub App and setting it up again.</Text>
        </div>
    </DismissibleAlert>
)
