import { defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetIcons(), presetUno()],
  theme: {
    breakpoints: {
      sm: '640px',
      md: '816px',
    },
    fontFamily: {
      sans: ['Open Sans Variable', 'sans-serif'],
      mono: ['Source Code Pro Variable', 'monospace'],
    },
    fontSize: {
      '2xs': ['0.625rem', { 'line-height': '1rem' }],
    },
    lineHeight: {
      tight: '1.15',
    },
  },
})
