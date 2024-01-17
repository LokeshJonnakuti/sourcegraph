import React from 'react'
import { H4, Text } from '@sourcegraph/wildcard'
import { DismissibleAlert } from '../DismissibleAlert'

export const GitHubAppFailureAlert: React.FunctionComponent<React.PropsWithChildren<{ error: string }>> = ({
    error,
}) => (
    <DismissibleAlert className="mb-3" variant="danger">
        <div>
            <H4>Your GitHub App did not finish connecting to Sourcegraph correctly.</H4>
            <Text className="m-0">The following error occurred during setup: {error}</Text>
            <Text className="m-0">You may need to remove the GitHub App and try again.</Text>
        </div>
    </DismissibleAlert>
)
```

Unit tests:

```tsx
import React from 'react'
import { render } from '@testing-library/react'
import { GitHubAppFailureAlert } from './GitHubAppFailureAlert'

describe('GitHubAppFailureAlert', () => {
    it('renders the error message correctly', () => {
        const error = 'Test error message'
        const { getByText } = render(<GitHubAppFailureAlert error={error} />)
        expect(getByText(`The following error occurred during setup: ${error}`)).toBeInTheDocument()
    })

    it('renders the default message when error is empty', () => {
        const { getByText } = render(<GitHubAppFailureAlert error="" />)
        expect(getByText('The following error occurred during setup:')).toBeInTheDocument()
    })
})
