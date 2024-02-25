import { render, screen, within } from '@testing-library/preact'
import { describe, expect, it } from 'vitest'

import * as subject from '$components/header.tsx'

describe('header component', () => {
  it('should have my name as the main title, in a link to go home', () => {
    render(<subject.Header urlPathname="/" />)

    const title = screen.getByRole('heading', { level: 1 })
    const link = within(title).getByRole('link')

    expect(title).toHaveTextContent(/michael ?cousins/i)
    expect(link).toHaveAttribute('aria-current', 'page')
  })

  it('should have my description', () => {
    render(<subject.Header urlPathname="/" />)

    const description = screen.getByText('/[a-z]+ware engineer/')
    const caveat = screen.getByText('* warranty void if coffee is removed')

    expect(description).toBeInTheDocument()
    expect(caveat).toBeInTheDocument()
  })

  it('should have my GitHub profile', () => {
    render(<subject.Header urlPathname="/" />)

    const result = screen.getByRole('link', { name: 'GitHub' })
    const resultIcon = within(result).getByRole('img', { hidden: true })

    expect(result).toHaveAttribute('href', 'https://github.com/mcous')
    expect(resultIcon).toHaveClass('i-fa6-brands-github')
  })

  it('should have my resume', () => {
    render(<subject.Header urlPathname="/" />)

    const result = screen.getByRole('link', { name: 'Résumé' })
    const resultIcon = within(result).getByRole('img', { hidden: true })

    expect(result).toHaveAttribute('href', 'http://mike.cousins.io/resume/')
    expect(resultIcon).toHaveClass('i-fa6-regular-file-lines')
  })

  it('should have my email', () => {
    render(<subject.Header urlPathname="/" />)

    const result = screen.getByRole('link', { name: 'Email' })
    const resultIcon = within(result).getByRole('img', { hidden: true })

    expect(result).toHaveAttribute('href', 'mailto:michael@cousins.io')
    expect(resultIcon).toHaveClass('i-fa6-regular-envelope')
  })

  it('should have my LinkedIn', () => {
    render(<subject.Header urlPathname="/" />)

    const result = screen.getByRole('link', { name: 'LinkedIn' })
    const resultIcon = within(result).getByRole('img', { hidden: true })

    expect(result).toHaveAttribute('href', 'https://www.linkedin.com/in/mcous/')
    expect(resultIcon).toHaveClass('i-fa6-brands-linkedin-in')
  })

  it('should not display extra info and social links if not on the home page', () => {
    render(<subject.Header urlPathname="/foobar" />)

    const title = screen.getByRole('heading', { level: 1 })
    const link = within(title).getByRole('link')

    expect(link).toHaveAttribute('aria-current', 'false')

    expect(screen.queryByText(/engineer/)).not.toBeInTheDocument()
    expect(screen.queryByText(/warranty void/)).not.toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: 'GitHub' }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: 'Résumé' }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: 'Email' }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: 'LinkedIn' }),
    ).not.toBeInTheDocument()
  })
})
