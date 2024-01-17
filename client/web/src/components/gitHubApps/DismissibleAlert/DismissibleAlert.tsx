import React from 'react'
import { H4, Text } from '@sourcegraph/wildcard'

export const DismissibleAlert: React.FunctionComponent<{ variant: string; children: React.ReactNode }> = ({
  variant,
  children,
}) => (
  <div className={`alert alert-${variant} mb-3`} role="alert">
    {children}
  </div>
)
