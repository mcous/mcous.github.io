import type { Config } from 'vike/types'
import { onRenderClient } from './on-render-client.tsx'
import { onRenderHtml } from './on-render-html.tsx'

export default {
  onRenderClient,
  onRenderHtml,
  clientRouting: true,
  passToClient: ['routeParams'],
  meta: {
    Layout: {
      env: 'server-and-client',
    },
    metadata: {
      env: 'server-and-client',
    },
  },
} satisfies Config
