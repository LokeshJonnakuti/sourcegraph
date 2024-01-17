import React, { ErrorInfo } from 'react'

import { H4, Text } from '@sourcegraph/wildcard'

import { DismissibleAlert, Text } from '../DismissibleAlert'

export const GitHubAppFailureAlert: React.FunctionComponent<React.PropsWithChildren<{ error: string }>> = ({
    error,
}) => (
    <DismissibleAlert className="mb-3" variant="danger">
        <div>
            import React, { ErrorInfo } from 'react';
import { DismissibleAlert, Text, H4 } from '@sourcegraph/wildcard';
import { showAlert } from 'sourcegraph';
<H4>Your GitHub App did not finish connecting to Sourcegraph correctly.</H4>
            <Text className="m-0">The following error occurred during setup: {error}</Text>
            <Text className="m-0">You may need to remove the GitHub App and try again. Please check the GitHub App permissions and reconnect to resolve this issue.</Text>
        </div>
    <Text className="error-message">Error message: {error}</Text>
    </DismissibleAlert>
)
