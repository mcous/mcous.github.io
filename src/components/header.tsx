import { SocialsNav } from './socials-nav.tsx'

export interface HeaderProps {
  urlPathname: string
}

export function Header(props: HeaderProps) {
  const { urlPathname } = props
  const isHome = urlPathname === '/'

  return (
    <header class="mx-auto mt-16 flex flex-col items-center text-center">
      <h1 class="h-32 w-32 border border-2 border-current rounded-full">
        <a
          href="/"
          class="block pt-8.5 text-2xl leading-tight"
          aria-current={isHome ? 'page' : false}
        >
          michael
          <br />
          cousins
        </a>
      </h1>
      {isHome && (
        <div class="mt-4">
          <p class="text-xl">/[a-z]+ware engineer/</p>
          <p class="font-light">* warranty void if coffee is removed</p>
          <SocialsNav class="mt-8 max-h-16" />
        </div>
      )}
    </header>
  )
}
