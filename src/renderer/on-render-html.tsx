import { render as renderToString } from 'preact-render-to-string'
import { escapeInject as html, dangerouslySkipEscape } from 'vike/server'
import type { PageContextServer } from 'vike/types'

import faviconIco from './favicon.ico'
import faviconSvg from './favicon.svg'

import { App } from '$components/app.tsx'
import { createAppStateSignal, getAppState } from '$lib/app-state.ts'

export async function onRenderHtml(
  pageContext: PageContextServer,
): Promise<unknown> {
  const appState = await getAppState(pageContext)
  const documentHtml = html`
    <!doctype html>
    <html lang="en">
      <head>
        <title>${appState.metadata.title}</title>
        <meta name="description" content="${appState.metadata.description}" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="${faviconIco}" sizes="any" />
        <link rel="icon" href="${faviconSvg}" type="image/svg+xml" />
      </head>
      <body class="font-sans">
        ${dangerouslySkipEscape(
          renderToString(<App state={createAppStateSignal(appState)} />),
        )}
      </body>
    </html>
  `

  return { documentHtml }
}
