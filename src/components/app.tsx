import type { ComponentType } from 'preact'

import type {
  LayoutProps,
  PageProps,
  Metadata,
} from '../renderer/page-context.ts'

import { Header, type HeaderProps } from './header.tsx'
import { Layout as DefaultLayout } from './layout.tsx'

export interface AppState {
  headerProps?: HeaderProps | undefined
  metadata: Metadata
  Layout?: ComponentType<LayoutProps> | undefined
  Page: ComponentType<PageProps>
}

export interface AppProps {
  state: { value: AppState }
}

export function App(props: AppProps) {
  const {
    headerProps = {},
    metadata,
    Layout = DefaultLayout,
    Page,
  } = props.state.value

  return (
    <>
      <Header {...headerProps} />
      <Layout metadata={metadata}>
        <Page />
      </Layout>
    </>
  )
}
