import type { FunctionComponent } from 'preact'

import type { BioData } from '$lib/bio.ts'

export interface SocialsNavProps {
  bio: BioData
  class?: string
}

export const SocialsNav: FunctionComponent<SocialsNavProps> = ({
  bio,
  class: className = '',
}) => (
  <nav class={`text-2xl leading-none ${className}`}>
    {getSocialLinks(bio).map((linkProps, index) => (
      <IconLink key={index} {...linkProps} />
    ))}
  </nav>
)

interface IconLinksProps {
  title: string
  href: string
  icon: string
}

const IconLink: FunctionComponent<IconLinksProps> = ({ title, href, icon }) => (
  <a
    class="mx-2 inline-flex items-center justify-center border-2 border-current p-3 transition-color hover:text-blue-700"
    title={title}
    aria-label={title}
    href={href}
  >
    <div aria-hidden="true" role="img" class={icon} />
  </a>
)

const getSocialLinks = (bio: BioData): IconLinksProps[] => [
  {
    title: 'GitHub',
    href: `https://github.com/${bio.github}`,
    icon: 'i-fa6-brands-github',
  },
  {
    title: 'Résumé',
    href: '/resume/',
    icon: 'i-fa6-regular-file-lines',
  },
  {
    title: 'Email',
    href: `mailto:${bio.email}`,
    icon: 'i-fa6-regular-envelope',
  },
  {
    title: 'LinkedIn',
    href: `https://www.linkedin.com/in/${bio.linkedIn}/`,
    icon: 'i-fa6-brands-linkedin-in',
  },
]
