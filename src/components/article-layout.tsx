import type { ComponentChildren } from 'preact'

import type { ArticleEntry } from '$lib/article-entries.ts'

export interface ArticleProps {
  data: ArticleEntry['data']
  children: ComponentChildren
}

export function Article(props: ArticleProps) {
  const {
    data: { title, posted, updated },
    children,
  } = props

  return (
    <>
      <article class="w-full flex flex-col items-stretch">
        <h1 class="mt-4 text-center text-xl">{title}</h1>
        <small class="mt-1 text-center text-sm font-light leading-relaxed">
          <p>Posted: {posted?.toLocaleDateString() ?? 'DRAFT'}</p>
          {updated ? <p>Updated: {updated.toLocaleDateString()}</p> : false}
        </small>

        {children}
      </article>
      <a
        href="/"
        class="my-8 self-center text-blue-700 visited:text-purple-700 hover:underline"
      >
        Back
      </a>
    </>
  )
}
