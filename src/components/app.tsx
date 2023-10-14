import '@fontsource-variable/open-sans'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import type { AppStateSignal } from '$lib/app-state.ts'
import { HeadMeta } from './head-meta.tsx'
import { Header } from './header.tsx'
import { RootLayout } from './root-layout.tsx'

export interface AppProps {
  state: AppStateSignal
}

export function App(props: AppProps) {
  const { Layout, Page, metadata, urlPathname } = props.state.value

  return (
    <>
      <HeadMeta metadata={metadata} />
      <Header urlPathname={urlPathname} />
      <RootLayout>
        <Layout metadata={metadata}>
          <Page />
        </Layout>
      </RootLayout>
    </>
  )
}
