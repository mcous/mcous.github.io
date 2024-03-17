import { type CollectionEntry, getCollection } from 'astro:content'

export type JobEntry = CollectionEntry<'jobs'>

export type JobData = JobEntry['data']

export type JobRoles = JobData['roles']

export type JobRole = JobRoles[number]

export type JobAchievements = JobData['achievements']

export async function getJobs(): Promise<JobEntry[]> {
  const jobs = await getCollection('jobs')

  return jobs.sort(orderByStart)
}

const orderByStart = (a: JobEntry, b: JobEntry): number => {
  const { roles: rolesA } = a.data
  const { roles: rolesB } = b.data
  const startA = rolesA[0].start
  const startB = rolesB[0].start

  return startB.getTime() - startA.getTime()
}
