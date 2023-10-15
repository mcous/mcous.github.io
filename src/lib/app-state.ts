import type { PageContext } from 'vike/types'
import { Fragment, type ComponentType } from 'preact'
import { signal, type Signal } from '@preact/signals'

import type { Metadata, LayoutProps, PageProps } from '$renderer/types.ts'

export interface AppState {
  Layout: ComponentType<LayoutProps>
  Page: ComponentType<PageProps>
  metadata: Metadata
  urlPathname: string
  routeParams: Record<string, string>
}

export type AppStateSignal = Signal<AppState>

export function createAppStateSignal(state: AppState): AppStateSignal {
  return signal(state)
}

export async function getAppState(pageContext: PageContext): Promise<AppState> {
  const { urlPathname, exports, routeParams = {} } = pageContext
  const { Layout = Fragment } = exports
  const { Page, metadata = { title: '', description: '' } } =
    'getPage' in pageContext.Page
      ? await pageContext.Page.getPage(routeParams)
      : { Page: pageContext.Page, metadata: exports.metadata }

  return {
    Layout,
    Page,
    metadata,
    routeParams,
    urlPathname,
  }
}
