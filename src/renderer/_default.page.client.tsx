import '@fontsource-variable/open-sans'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import './favicon.ico'
import './favicon.svg'

import { hydrate, Fragment } from 'preact'
import { signal } from '@preact/signals'

import { App, type AppState } from '../components/app.tsx'
import type { PageContextClient } from './page-context.ts'

export const clientRouting = true

const appState = signal<AppState>({
  metadata: { title: '', description: '' },
  Page: Fragment,
})

export function render(pageContext: PageContextClient): void {
  const { Page, isHydration, exports: pageExports } = pageContext
  const { headerProps, metadata, Layout } = pageExports

  appState.value = {
    metadata,
    headerProps,
    Layout,
    Page,
  }

  window.document.title = metadata.title
  window.document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', metadata.description)

  if (isHydration) {
    hydrate(<App state={appState} />, window.document.body)
  }
}
