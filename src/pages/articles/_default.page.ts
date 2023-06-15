import '@fontsource-variable/source-code-pro'
import 'highlight.js/styles/github-dark-dimmed.css'

import { HEADER_MINIMAL, type HeaderProps } from '../../components/header.tsx'

export { MDXLayout as Layout } from '../../components/mdx-layout.tsx'

export const headerProps: HeaderProps = {
  mode: HEADER_MINIMAL,
}
