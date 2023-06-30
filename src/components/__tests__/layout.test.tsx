import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/preact'

import * as subject from '../layout.tsx'

describe('default content layout', () => {
  it('should define the main content', () => {
    render(
      <subject.Layout metadata={{ title: '', description: '' }}>
        <span data-testid="contents" />
      </subject.Layout>
    )

    const result = screen.getByRole('main')

    expect(within(result).getByTestId('contents')).toBeInTheDocument()
  })
})
