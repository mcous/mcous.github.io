import { render as renderToString } from 'preact-render-to-string'
import {
  escapeInject as html,
  dangerouslySkipEscape,
} from 'vite-plugin-ssr/server'

import faviconIco from './favicon.ico'
import faviconSvg from './favicon.svg'

import type { ComponentType } from 'preact'
import type { PageContextBuiltInClientWithClientRouting } from 'vite-plugin-ssr/types'

interface PageContext extends PageContextBuiltInClientWithClientRouting {
  Page: ComponentType
  exports: {
    title: string
    description: string
  }
}

export function render(pageContext: PageContext): unknown {
  const { Page, exports: pageExports } = pageContext
  const pageHtml = renderToString(<Page />)

  const documentHtml = html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${pageExports.title}</title>
        <meta name="description" content="${pageExports.description}" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="${faviconIco}" sizes="any" />
        <link rel="icon" href="${faviconSvg}" type="image/svg+xml" />
      </head>
      <body class="font-sans">
        ${dangerouslySkipEscape(pageHtml)}
      </body>
    </html>
  `

  return { documentHtml }
}
