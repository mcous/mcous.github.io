import type { Config } from 'vike/types'
import { ArticleLayout } from '$components/article-layout.tsx'
import { getArticleUrls } from '$lib/article-entries.ts'
import { ArticlePageGetter } from './page.tsx'

export default {
  Page: ArticlePageGetter,
  Layout: ArticleLayout,
  onBeforePrerenderStart: getArticleUrls,
} satisfies Config
