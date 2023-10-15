import { hydrate } from 'preact'
import type { PageContextClient } from 'vike/types'

import { App } from '$components/app.tsx'
import {
  createAppStateSignal,
  getAppState,
  type AppStateSignal,
} from '$lib/app-state.ts'

let appState: AppStateSignal | undefined

export async function onRenderClient(
  pageContext: PageContextClient,
): Promise<void> {
  const { isHydration } = pageContext
  const nextAppState = await getAppState(pageContext)

  if (appState === undefined) {
    appState = createAppStateSignal(nextAppState)
  } else {
    appState.value = nextAppState
  }

  if (isHydration) {
    hydrate(<App state={appState} />, window.document.body)
  }
}
