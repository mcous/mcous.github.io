import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/preact'

import * as subject from '../mdx-layout.tsx'

describe('markdown content layout', () => {
  it('should define the main content', () => {
    render(
      <subject.MDXLayout metadata={{ title: '', description: '' }}>
        <span data-testid="contents" />
      </subject.MDXLayout>
    )

    const result = screen.getByRole('main')

    expect(within(result).getByTestId('contents')).toBeInTheDocument()
  })

  it('should include the page title', () => {
    render(
      <subject.MDXLayout metadata={{ title: 'Cool title', description: '' }} />
    )

    const main = screen.getByRole('main')
    const result = within(main).getByRole('heading', { level: 1 })

    expect(result).toHaveTextContent('Cool title')
  })

  it('should include a link back home', () => {
    render(<subject.MDXLayout metadata={{ title: '', description: '' }} />)

    const result = screen.getByRole('link', { name: /back/iu })

    expect(result).toHaveAttribute('href', '/')
  })
})
