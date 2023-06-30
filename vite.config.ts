import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import ssr from 'vite-plugin-ssr/plugin'
import unoCss from 'unocss/vite'
import mdx from '@mdx-js/rollup'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkEmoji from 'remark-emoji'
import remarkGfm from 'remark-gfm'

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
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
    },
    setupFiles: ['./etc/vitest-setup.ts'],
  },
})
