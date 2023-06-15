import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/preact'

import * as subject from '../articles.tsx'

describe('articles component', () => {
  it('should have title', () => {
    render(<subject.Articles entries={[]} />)

    const result = screen.getByRole('heading', { level: 2 })

    expect(result).toHaveTextContent(/thoughts/iu)
  })

  it('should display links to articles', () => {
    const entries: subject.ArticleEntry[] = [
      {
        title: 'How to fizz buzz',
        description: 'Fizz buzz for fun and profit',
        href: '/articles/fizz-buzz/',
        posted: '2021-01-01',
      },
      {
        title: 'How to foo bar',
        description: 'Foo bar for fun and profit',
        href: '/articles/foo-bar/',
        posted: '2022-02-02',
      },
    ]

    render(<subject.Articles entries={entries} />)

    const nav = screen.getByRole('navigation')
    const list = within(nav).getByRole('list')
    const items = within(list).getAllByRole('listitem')
    const item0 = items[0]!
    const item1 = items[1]!
    const link0 = within(item0).getByRole('link')
    const link1 = within(item1).getByRole('link')

    expect(link0).toHaveTextContent('How to fizz buzz')
    expect(link0).toHaveAttribute('href', '/articles/fizz-buzz/')
    expect(item0).toHaveTextContent('Fizz buzz for fun and profit')

    expect(link1).toHaveTextContent('How to foo bar')
    expect(link1).toHaveAttribute('href', '/articles/foo-bar/')
    expect(item1).toHaveTextContent('Foo bar for fun and profit')
  })
})
