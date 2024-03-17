import type { FunctionComponent } from 'preact'

import type { BioData } from '$lib/bio.ts'

import { SocialsNav } from './socials-nav.tsx'

export interface HeaderProps {
  bio: BioData
  isHome: boolean | undefined
}

export const Header: FunctionComponent<HeaderProps> = ({ bio, isHome }) => (
  <header class="mx-auto mt-16 flex flex-col items-center text-center">
    <h1 class="border-2 border-current rounded-full">
      <a
        href="/"
        class="block h-32 w-32 pt-9 text-2xl leading-tight lowercase"
        aria-current={isHome ? 'page' : false}
      >
        {bio.firstName}
        <br />
        {bio.lastName}
      </a>
    </h1>
    {isHome && (
      <div class="mt-4">
        <p class="text-xl">{bio.blurb}</p>
        <p class="mt-1 text-sm font-light">*{bio.caveats[0]}</p>
        <SocialsNav bio={bio} class="mt-8 max-h-16" />
      </div>
    )}
  </header>
)
