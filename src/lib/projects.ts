import { type CollectionEntry, getCollection } from 'astro:content'

export type ProjectEntry = CollectionEntry<'projects'>

export type ProjectData = ProjectEntry['data']

export async function getProjects(): Promise<ProjectEntry[]> {
  const projects = await getCollection('projects')

  return projects.sort(orderByRank)
}

function orderByRank(a: ProjectEntry, b: ProjectEntry): number {
  return a.data.rank - b.data.rank
}
