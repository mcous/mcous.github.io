import '@fontsource-variable/open-sans'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import { hydrate as preactHydrate, render as preactRender } from 'preact'

import type { ComponentType } from 'preact'
import type { PageContextBuiltInClientWithClientRouting } from 'vite-plugin-ssr/types'

interface PageContext extends PageContextBuiltInClientWithClientRouting {
  Page: ComponentType
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function render(pageContext: PageContext): Promise<void> {
  const { Page, isHydration } = pageContext
  const mount = isHydration ? preactHydrate : preactRender

  mount(<Page />, window.document.body)
}
