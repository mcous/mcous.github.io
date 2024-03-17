import { render, screen, within } from '@testing-library/preact'
import type { ComponentProps } from 'preact'
import { describe, expect, it } from 'vitest'

import * as subject from '$components/header.tsx'
import type { BioData } from '$lib/bio'

const renderSubject = (
  props?: Partial<ComponentProps<typeof subject.Header>>,
) => {
  const bio: BioData = {
    firstName: 'Jeremy',
    lastName: 'Bearimy',
    blurb: 'Tuesdays and sometimes never',
    location: 'IHOP',
    email: 'janet@the-void.com',
    github: 'good-janet',
    linkedIn: 'bad-janet',
    caveats: ['Everyone has seen the time knife'],
    description:
      'A trillion different realities folding onto each other like thin sheets of metal forming a single blade',
    education: { degree: '', school: '', year: '', details: '' },
  }
  const defaultProps = { bio, isHome: true }

  return render(<subject.Header {...defaultProps} {...props} />)
}

describe('header component', () => {
  it('should have my name as the main title, in a link to go home', () => {
    renderSubject()

    const title = screen.getByRole('heading', { level: 1 })
    const link = within(title).getByRole('link')

    expect(title).toHaveTextContent(/jeremy ?bearimy/i)
    expect(link).toHaveAttribute('aria-current', 'page')
  })

  it('should have my description', () => {
    renderSubject()

    const description = screen.getByText(/tuesdays and sometimes never/iu)
    const caveat = screen.getByText(/everyone has seen the time knife/iu)

    expect(description).toBeInTheDocument()
    expect(caveat).toBeInTheDocument()
  })

  it('should have my GitHub profile', () => {
    renderSubject()

    const result = screen.getByRole('link', { name: 'GitHub' })
    const resultIcon = within(result).getByRole('img', { hidden: true })

    expect(result).toHaveAttribute('href', 'https://github.com/good-janet')
    expect(resultIcon).toHaveClass('i-fa6-brands-github')
  })

  it('should have my resume', () => {
    renderSubject()

    const result = screen.getByRole('link', { name: 'Résumé' })
    const resultIcon = within(result).getByRole('img', { hidden: true })

    expect(result).toHaveAttribute('href', '/resume/')
    expect(resultIcon).toHaveClass('i-fa6-regular-file-lines')
  })

  it('should have my email', () => {
    renderSubject()

    const result = screen.getByRole('link', { name: 'Email' })
    const resultIcon = within(result).getByRole('img', { hidden: true })

    expect(result).toHaveAttribute('href', 'mailto:janet@the-void.com')
    expect(resultIcon).toHaveClass('i-fa6-regular-envelope')
  })

  it('should have my LinkedIn', () => {
    renderSubject()

    const result = screen.getByRole('link', { name: 'LinkedIn' })
    const resultIcon = within(result).getByRole('img', { hidden: true })

    expect(result).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/bad-janet/',
    )
    expect(resultIcon).toHaveClass('i-fa6-brands-linkedin-in')
  })

  it('should not display extra info and social links if not on the home page', () => {
    renderSubject({ isHome: false })

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
