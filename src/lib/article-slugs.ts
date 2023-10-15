const MODULE_PATH_RE = /articles\/(?<slug>.+)\.mdx$/iu

export function pathnameToSlug(pathname: string): string {
  return MODULE_PATH_RE.exec(pathname)?.groups?.slug ?? ''
}
