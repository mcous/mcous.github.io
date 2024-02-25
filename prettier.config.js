import baseConfig from '@mcous/prettier-config'

export default {
  ...baseConfig,
  plugins: ['prettier-plugin-astro'],
  proseWrap: 'always',
  overrides: [{ files: '*.astro', options: { parser: 'astro' } }],
}
