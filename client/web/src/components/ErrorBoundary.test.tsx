import React from 'react'
import { renderWithBrandedContext } from '@sourcegraph/wildcard/src/testing'
import { ErrorBoundary } from './ErrorBoundary'

const ThrowError: React.FunctionComponent<React.PropsWithChildren<unknown>> = () => {
    throw new Error('x')
}

/** Throws an error that resembles the error when a dynamic import(...) fails. */
const ThrowDynamicImportError: React.FunctionComponent<React.PropsWithChildren<unknown>> = () => {
    throw new TypeError('Failed to fetch dynamically imported module: https://example.com/x.js')
}

describe('ErrorBoundary', () => {
    test('passes through if non-error', () => {
        const { asFragment } = renderWithBrandedContext(
            <ErrorBoundary location={null}>
                <ThrowError />
            </ErrorBoundary>
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test('renders error page if error', () => {
        const { asFragment } = renderWithBrandedContext(
            <ErrorBoundary location={null}>
                <span>hello</span>
            </ErrorBoundary>
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test('renders reload page if dynamic import error', () => {
        const { asFragment } = renderWithBrandedContext(
            <ErrorBoundary location={null}>
                <ThrowDynamicImportError />
            </ErrorBoundary>
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
