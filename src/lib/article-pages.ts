import type { MDXPage } from '$renderer/types'

import { pathnameToSlug } from './article-slugs.ts'

type MDXModule = typeof import('*.mdx')

const pagesByPath = import.meta.glob<MDXModule>('../articles/*.mdx')

const articlePagesBySlug = Object.fromEntries(
  Object.entries(pagesByPath).map(toPageBySlug),
)

function toPageBySlug(
  moduleEntry: [pathname: string, moduleGetter: () => Promise<MDXModule>],
): [slug: string, pageGetter: () => Promise<MDXPage>] {
  const [pathname, moduleGetter] = moduleEntry
  const slug = pathnameToSlug(pathname)
  const pageGetter = async () => {
    const { default: Page, metadata } = await moduleGetter()
    return { Page, metadata }
  }

  return [slug, pageGetter]
}

export { articlePagesBySlug }
