import type { Metadata } from '$renderer/types.ts'
import { pathnameToSlug } from './article-slugs.ts'

export interface ArticleEntry extends Metadata {
  href: string
}

const metadataByPath = import.meta.glob<Metadata>('../articles/*.mdx', {
  import: 'metadata',
  eager: true,
})

export const articleEntries = Object.entries(metadataByPath)
  .map(metadataWithHref)
  .filter(okToPost)
  .sort(orderByPosted)

export function getArticleUrls(): string[] {
  return articleEntries.map(({ href }) => href)
}

function metadataWithHref(
  moduleEntry: [pathname: string, metadata: Metadata],
): ArticleEntry {
  const [pathname, metadata] = moduleEntry
  const slug = pathnameToSlug(pathname)
  const href = `/articles/${slug}/`

  return { ...metadata, href }
}

function okToPost(entry: ArticleEntry): boolean {
  return entry.posted !== undefined || import.meta.env.DEV
}

function orderByPosted(a: ArticleEntry, b: ArticleEntry): number {
  const { posted: aPosted = '' } = a
  const { posted: bPosted = '' } = b

  if (aPosted > bPosted) return -1
  if (bPosted > aPosted) return 1
  return 0
}
