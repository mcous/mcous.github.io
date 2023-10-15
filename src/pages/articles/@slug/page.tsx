import { articlePagesBySlug } from '$lib/article-pages'
import type { MDXPageGetter } from '$renderer/types.ts'

export const ArticlePageGetter: MDXPageGetter = {
  getPage: async ({ slug }) => {
    const importPage = slug ? articlePagesBySlug[slug] : undefined

    return importPage ? importPage() : { Page: () => <></> }
  },
}
