import { defineConfig } from 'windicss/helpers'
import defaultTheme from 'windicss/defaultTheme'

export default defineConfig({
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open SansVariable', ...defaultTheme.fontFamily.sans],
      },
      lineHeight: {
        tight: '1.15',
      },
    },
  },
})
