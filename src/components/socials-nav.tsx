const SOCIAL_LINKS: IconLinksProps[] = [
  {
    title: 'GitHub',
    href: 'https://github.com/mcous',
    icon: 'i-fa6-brands-github',
  },
  {
    title: 'Résumé',
    href: 'http://mike.cousins.io/resume/',
    icon: 'i-fa6-regular-file-lines',
  },
  {
    title: 'Email',
    href: 'mailto:mike@cousins.io',
    icon: 'i-fa6-regular-envelope',
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mcous/',
    icon: 'i-fa6-brands-linkedin-in',
  },
]

interface IconLinksProps {
  title: string
  href: string
  icon: string
}

function IconLink(props: IconLinksProps): JSX.Element {
  const { title, href, icon } = props

  return (
    <a
      class="mx-2 p-3 border border-current border-2 inline-flex items-center justify-center transition-opacity hover:opacity-50"
      title={title}
      href={href}
    >
      <div aria-hidden role="img" class={icon} />
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
