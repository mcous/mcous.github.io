import type { ComponentChildren, FunctionComponent } from 'preact'

import type { ArticleData } from '$lib/articles.ts'

export interface ArticleProps {
  article: ArticleData
  children: ComponentChildren
}

export const Article: FunctionComponent<ArticleProps> = ({
  article: { title, posted, updated },
  children,
}) => (
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
