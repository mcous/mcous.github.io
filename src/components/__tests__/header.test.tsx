import { describe, it, expect } from 'vitest'
import { render, within, screen } from '@testing-library/preact'

import * as subject from '../header.tsx'

describe('header component', () => {
  it('should have my name as the main title, in a link to go home', () => {
    render(<subject.Header />)

    const link = screen
      .getAllByRole('link')
      .find((element) => element.getAttribute('href') === '/')

    const title = within(link!).getByRole('heading', { level: 1 })

    expect(title).toHaveTextContent(/michael ?cousins/i)
  })

  it('should have my description', () => {
    render(<subject.Header />)

    const description = screen.getByText('/[a-z]+ware engineer/')
    const caveat = screen.getByText('* warranty void if coffee is removed')

    expect(description).toBeInTheDocument()
    expect(caveat).toBeInTheDocument()
  })

  it('should have my GitHub profile', () => {
    render(<subject.Header />)

    const result = screen.getByRole('link', { name: 'GitHub' })
    const resultIcon = within(result).getByRole('img', { hidden: true })

    expect(result).toHaveAttribute('href', 'https://github.com/mcous')
    expect(resultIcon).toHaveClass('i-fa6-brands-github')
  })

  it('should have my resume', () => {
    render(<subject.Header />)

    const result = screen.getByRole('link', { name: 'Résumé' })
    const resultIcon = within(result).getByRole('img', { hidden: true })

    expect(result).toHaveAttribute('href', 'http://mike.cousins.io/resume/')
    expect(resultIcon).toHaveClass('i-fa6-regular-file-lines')
  })

  it('should have my email', () => {
    render(<subject.Header />)

    const result = screen.getByRole('link', { name: 'Email' })
    const resultIcon = within(result).getByRole('img', { hidden: true })

    expect(result).toHaveAttribute('href', 'mailto:michael@cousins.io')
    expect(resultIcon).toHaveClass('i-fa6-regular-envelope')
  })

  it('should have my LinkedIn', () => {
    render(<subject.Header />)

    const result = screen.getByRole('link', { name: 'LinkedIn' })
    const resultIcon = within(result).getByRole('img', { hidden: true })

    expect(result).toHaveAttribute('href', 'https://www.linkedin.com/in/mcous/')
    expect(resultIcon).toHaveClass('i-fa6-brands-linkedin-in')
  })

  it('should have a minimal mode', () => {
    render(<subject.Header mode="minimal" />)

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.queryByText(/engineer/)).not.toBeInTheDocument()
    expect(screen.queryByText(/warranty void/)).not.toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: 'GitHub' })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: 'Résumé' })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: 'Email' })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: 'LinkedIn' })
    ).not.toBeInTheDocument()
  })
})
