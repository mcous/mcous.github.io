import type { FunctionComponent } from 'preact'

import { Header } from './header.tsx'

export interface MainProps {
  urlPathname: string
}

export const Main: FunctionComponent<MainProps> = ({
  urlPathname,
  children,
}) => (
  <body class="font-sans -mr-[calc(100vw-100%)]">
    <Header urlPathname={urlPathname} />
    <main class="mx-auto max-w-xl flex flex-col items-center px-4">
      {children}
    </main>
  </body>
)
