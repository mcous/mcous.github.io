import '@fontsource/open-sans/400.css'
import 'virtual:windi.css'
import 'virtual:windi-devtools' // eslint-disable-line import/no-unassigned-import

import { hydrate as preactHydrate, render as preactRender } from 'preact'

import type { ComponentType } from 'preact'
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client'

interface PageContext extends PageContextBuiltInClient {
  Page: ComponentType
}

export async function render(pageContext: PageContext): Promise<void> {
  const { Page, isHydration } = pageContext
  const mount = isHydration ? preactHydrate : preactRender

  mount(<Page />, window.document.body)
}
