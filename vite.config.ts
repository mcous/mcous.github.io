import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import ssr from 'vite-plugin-ssr/plugin'
import windiCss from 'vite-plugin-windicss'

export default defineConfig({
  appType: 'custom',
  plugins: [
    preact(),
    windiCss(),
    ssr({ prerender: true, includeAssetsImportedByServer: true }),
  ],
})
