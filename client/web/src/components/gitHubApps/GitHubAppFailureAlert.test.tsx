import React from 'react';
import { render } from '@testing-library/react';
import { GitHubAppFailureAlert } from './GitHubAppFailureAlert';

describe('GitHubAppFailureAlert', () => {
  it('renders the error message correctly', () => {
    const error = 'Sample error message';
    const { getByText } = render(<GitHubAppFailureAlert error={error} />);
    expect(getByText(error)).toBeInTheDocument();
  });

  // Add more test cases to cover different scenarios and error cases
});
