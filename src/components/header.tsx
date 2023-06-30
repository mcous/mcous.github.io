import { SocialsNav } from './socials-nav.tsx'

export const HEADER_HERO = 'hero'
export const HEADER_MINIMAL = 'minimal'

export interface HeaderProps {
  mode?: typeof HEADER_HERO | typeof HEADER_MINIMAL
}

export function Header(props: HeaderProps): JSX.Element {
  const { mode = HEADER_HERO } = props
  const isHero = mode === HEADER_HERO

  return (
    <header
      class={`flex flex-col items-center text-center mx-auto ${
        isHero ? 'mt-32' : 'mt-8'
      }`}
    >
      <a href="/" class="w-32 h-32 border border-current border-2 rounded-full">
        <h1 class="pt-8.5 text-2xl leading-tight">
          michael
          <br />
          cousins
        </h1>
      </a>
      {isHero && (
        <div class="mt-4">
          <p class="text-xl">/[a-z]+ware engineer/</p>
          <p class="font-light">* warranty void if coffee is removed</p>
          <SocialsNav class="mt-8 max-h-16" />
        </div>
      )}
    </header>
  )
}
