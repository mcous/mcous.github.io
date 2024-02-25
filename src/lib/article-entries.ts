import { type CollectionEntry, getCollection } from 'astro:content'

export type ArticleEntry = CollectionEntry<'articles'>

export async function getArticles(): Promise<ArticleEntry[]> {
  const articles = await getCollection('articles')

  return articles.filter(okToPost).sort(orderByPosted)
}

function okToPost(entry: ArticleEntry): boolean {
  return entry.data.posted !== undefined || import.meta.env.DEV
}

function orderByPosted(a: ArticleEntry, b: ArticleEntry): number {
  const { posted: aPosted = 0 } = a.data
  const { posted: bPosted = 0 } = b.data

  if (aPosted > bPosted) return -1
  if (bPosted > aPosted) return 1
  return 0
}
