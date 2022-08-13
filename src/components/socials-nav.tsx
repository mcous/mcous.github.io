import { faFileLines } from '@fortawesome/free-regular-svg-icons/faFileLines'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons/faPaperPlane'
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn'

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

const SOCIAL_LINKS: IconLinksProps[] = [
  { title: 'GitHub', href: 'https://github.com/mcous', icon: faGithub },
  {
    title: 'Résumé',
    href: 'http://mike.cousins.io/resume/',
    icon: faFileLines,
  },
  { title: 'Email', href: 'mailto:mike@cousins.io', icon: faPaperPlane },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mcous/',
    icon: faLinkedinIn,
  },
]

interface IconLinksProps {
  title: string
  href: string
  icon: IconDefinition
}

function IconLink(props: IconLinksProps): JSX.Element {
  const { title, href, icon } = props
  const [width, height, , , pathData] = icon.icon

  return (
    <a
      class="mx-2 p-3 border-current border-2 inline-flex items-center justify-center transition-opacity hover:opacity-50"
      title={title}
      href={href}
    >
      <svg
        aria-hidden
        focusable="false"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
        class="fill-current w-1em h-1em"
      >
        <path d={typeof pathData === 'string' ? pathData : pathData.join('')} />
      </svg>
    </a>
  )
}

export interface SocialsNavProps {
  class: string
}

export function SocialsNav(props: SocialsNavProps): JSX.Element {
  return (
    <nav class={props.class}>
      {SOCIAL_LINKS.map((linkProps, index) => (
        <IconLink key={index} {...linkProps} />
      ))}
    </nav>
  )
}
