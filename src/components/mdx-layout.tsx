import type { ComponentProps } from 'preact'
import { MDXProvider } from '@mdx-js/preact'

import type { LayoutProps } from '../renderer/page-context.ts'
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

export function MDXLayout(props: LayoutProps): JSX.Element {
  const { metadata, children } = props
  const { title, posted = 'Draft', updated } = metadata

  return (
    <main class="flex flex-col items-stretch max-w-148 mx-auto px-4">
      <h1 class="mt-4 text-center text-xl">{title}</h1>
      <small class="mt-1 text-center text-sm leading-relaxed font-light">
        <p>Posted: {posted}</p>
        {updated ? <p>Updated: {updated}</p> : false}
      </small>
      <MDXProvider components={components}>{children}</MDXProvider>
      <atoms.Link href="/" class="self-center my-8">
        Back
      </atoms.Link>
    </main>
  )
}
