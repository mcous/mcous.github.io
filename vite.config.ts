import url from 'node:url'

import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import ssr from 'vike/plugin'
import unoCss from 'unocss/vite'
import mdx from '@mdx-js/rollup'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkEmoji from 'remark-emoji'
import remarkGfm from 'remark-gfm'

const resolve = (pathname: string) =>
  url.fileURLToPath(new URL(pathname, import.meta.url))

export default defineConfig({
  appType: 'custom',
  plugins: [
    mdx({
      jsxImportSource: 'preact',
      providerImportSource: '@mdx-js/preact',
      elementAttributeNameCase: 'html',
      rehypePlugins: [rehypeHighlight, rehypeSlug],
      remarkPlugins: [[remarkEmoji, { accessible: 'true' }], remarkGfm],
    }),
    unoCss(),
    preact(),
    ssr({ prerender: true }),
  ],
  resolve: {
    alias: {
      $articles: resolve('src/articles'),
      $components: resolve('src/components'),
      $lib: resolve('src/lib'),
      $pages: resolve('src/pages'),
      $renderer: resolve('src/renderer'),
    },
  },
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
    },
    setupFiles: [resolve('etc/vitest-setup.ts')],
  },
})
