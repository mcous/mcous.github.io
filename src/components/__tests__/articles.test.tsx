import { render, screen, within } from '@testing-library/preact'
import { describe, expect, it } from 'vitest'

import * as subject from '$components/articles.tsx'
import type { ArticleEntry } from '$lib/articles.ts'

describe('articles component', () => {
  it('should have title', () => {
    render(<subject.ArticleList entries={[]} />)

    const result = screen.getByRole('heading', { level: 2 })

    expect(result).toHaveTextContent(/thoughts/iu)
  })

  it('should display links to articles', () => {
    const entries = [
      {
        id: 'fizz-buzz.md' as ArticleEntry['id'],
        slug: 'fizz-buzz' as ArticleEntry['slug'],
        data: {
          title: 'How to fizz buzz',
          description: 'Fizz buzz for fun and profit',
          posted: new Date('2021-01-01'),
        },
      },
      {
        id: 'foo-bar.md' as ArticleEntry['id'],
        slug: 'foo-bar' as ArticleEntry['slug'],
        data: {
          title: 'How to foo bar',
          description: 'Foo bar for fun and profit',
          posted: new Date('2022-02-02'),
        },
      },
    ] as ArticleEntry[]

    render(<subject.ArticleList entries={entries} />)

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
