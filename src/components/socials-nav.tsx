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
    href: 'mailto:michael@cousins.io',
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

function IconLink(props: IconLinksProps) {
  const { title, href, icon } = props
  return (
    <a
      class="mx-2 inline-flex items-center justify-center border-2 border-current p-3 transition-color hover:text-blue-700"
      title={title}
      aria-label={title}
      href={href}
    >
      <div aria-hidden="true" role="img" class={icon} />
    </a>
  )
}

export interface SocialsNavProps {
  class?: string
}

export function SocialsNav(props: SocialsNavProps) {
  const { class: className = '' } = props
  return (
    <nav class={`text-2xl leading-none ${className}`}>
      {SOCIAL_LINKS.map((linkProps, index) => (
        <IconLink key={index} {...linkProps} />
      ))}
    </nav>
  )
}
