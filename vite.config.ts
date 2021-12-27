import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  plugins: [
    // TODO(mc, 2021-12-28): remove `exclude` workaround to
    // https://github.com/preactjs/preset-vite/issues/37
    preact({ exclude: /node_modules/ }),
    WindiCSS(),
  ],
})
