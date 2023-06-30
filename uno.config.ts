import { defineConfig, presetUno, presetIcons } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetIcons()],
  theme: {
    fontFamily: {
      sans: ['Open Sans Variable', 'sans-serif'],
      mono: ['Source Code Pro Variable', 'monospace'],
    },
    lineHeight: {
      tight: '1.15',
    },
  },
})
