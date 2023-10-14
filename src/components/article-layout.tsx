import '@fontsource-variable/source-code-pro'
import 'highlight.js/styles/github-dark-dimmed.css'

import type { ComponentProps } from 'preact'
import { MDXProvider } from '@mdx-js/preact'

import type { LayoutProps } from '$renderer/types.ts'
import * as atoms from './atoms.tsx'

type MDXComponents = ComponentProps<typeof MDXProvider>['components']

const components: MDXComponents = {
  h1: atoms.Heading1,
  h2: atoms.Heading2,
  h3: atoms.Heading3,
  p: atoms.Copy,
  a: atoms.Link,
  code: atoms.Code,
  pre: atoms.PreformattedText,
  ul: atoms.UnorderedList,
  ol: atoms.OrderedList,
  li: atoms.ListItem,
}

export function ArticleLayout(props: LayoutProps): JSX.Element {
  const { metadata, children } = props
  const { title, posted = 'Draft', updated } = metadata

  return (
    <>
      <h1 class="mt-4 text-center text-xl">{title}</h1>
      <small class="mt-1 text-center text-sm font-light leading-relaxed">
        <p>Posted: {posted}</p>
        {updated ? <p>Updated: {updated}</p> : false}
      </small>
      <MDXProvider components={components}>{children}</MDXProvider>
      <atoms.Link href="/" class="my-8 self-center">
        Back
      </atoms.Link>
    </>
  )
}
