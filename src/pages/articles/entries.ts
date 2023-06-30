import type { Metadata } from '../../renderer/page-context.ts'
import type { ArticleEntry } from '../../components/articles.tsx'

const MODULE_PATH_RE = /^\.\/(?<stem>.+)\.page\.mdx$/iu

const pagesByPath = import.meta.glob<Metadata>('./*.page.mdx', {
  import: 'metadata',
  eager: true,
})

const entries = Object.entries(pagesByPath)
  .map(moduleToEntry)
  .filter(okToPost)
  .sort(orderByPosted)

function moduleToEntry(
  moduleEntry: [pathname: string, metadata: Metadata]
): ArticleEntry {
  const [pathname, metadata] = moduleEntry
  const { stem = '' } = MODULE_PATH_RE.exec(pathname)?.groups ?? {}
  const href = `/articles/${stem}/`

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

export { entries }
