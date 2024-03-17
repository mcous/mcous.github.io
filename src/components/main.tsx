import type { FunctionComponent } from 'preact'

import type { BioData } from '$lib/bio.ts'

import { Header } from './header.tsx'

export interface MainProps {
  bio: BioData
  isHome?: boolean
}

export const Main: FunctionComponent<MainProps> = ({
  bio,
  isHome,
  children,
}) => (
  <>
    <Header bio={bio} isHome={isHome} />
    <main class="mx-auto max-w-xl flex flex-col items-center px-4">
      {children}
    </main>
  </>
)
