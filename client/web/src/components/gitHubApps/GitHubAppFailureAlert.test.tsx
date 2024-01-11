import React from 'react'
import { render } from '@testing-library/react'
import { GitHubAppFailureAlert } from './GitHubAppFailureAlert'

describe('GitHubAppFailureAlert Component', () => {
  test('renders with error message', () => {
    const errorMessage = 'Test error message'
    const { getByText } = render(<GitHubAppFailureAlert error={errorMessage} />)
    
    expect(getByText(errorMessage)).toBeInTheDocument()
  })
})
