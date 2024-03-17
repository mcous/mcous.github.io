import { type CollectionEntry, getEntry } from 'astro:content'

export type BioEntry = CollectionEntry<'bio'>

export type BioData = BioEntry['data']

export async function getBio(): Promise<BioEntry> {
  return getEntry('bio', 'me')
}
