import { render as renderToString } from 'preact-render-to-string'
import {
  escapeInject as html,
  dangerouslySkipEscape,
} from 'vite-plugin-ssr/server'

import faviconIco from './favicon.ico'
import faviconSvg from './favicon.svg'

import { App } from '../components/app.tsx'
import type { PageContextServer } from './page-context.ts'

export function render(pageContext: PageContextServer): unknown {
  const { Page, exports: pageExports } = pageContext
  const { headerProps, metadata, Layout } = pageExports
  const { title, description } = metadata

  const documentHtml = html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${title}</title>
        <meta name="description" content="${description}" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="${faviconIco}" sizes="any" />
        <link rel="icon" href="${faviconSvg}" type="image/svg+xml" />
      </head>
      <body class="font-sans">
        ${dangerouslySkipEscape(
          renderToString(
            <App state={{ value: { metadata, headerProps, Layout, Page } }} />
          )
        )}
      </body>
    </html>
  `

  return { documentHtml }
}
