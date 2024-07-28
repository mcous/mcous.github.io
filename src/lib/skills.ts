import { type CollectionEntry, getCollection } from 'astro:content'

export type SkillsEntry = CollectionEntry<'skills'>

export type SkillsData = SkillsEntry['data']

export async function getSkills(): Promise<SkillsEntry[]> {
  const skills = await getCollection('skills')

  return skills.sort(orderByRank)
}

function orderByRank(a: SkillsEntry, b: SkillsEntry): number {
  return a.data.rank - b.data.rank
}
