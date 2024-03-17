import mdx from '@astrojs/mdx'
import preact from '@astrojs/preact'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import remarkEmoji from 'remark-emoji'
import unoCss from 'unocss/astro'

import { resumePDF } from './etc/resume-pdf'

export default defineConfig({
  site: 'https://michael.cousins.io',
  integrations: [
    mdx({ remarkPlugins: [[remarkEmoji, { accessible: 'true' }]] }),
    sitemap(),
    unoCss({ injectReset: true }),
    preact(),
    resumePDF(),
  ],
})
