import { getViteConfig } from 'astro/config'

export default getViteConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
    },
    setupFiles: ['./etc/vitest-setup.ts'],
  },
})
