import { defineCollection, z } from 'astro:content'

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    posted: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
  }),
})

const bio = defineCollection({
  type: 'data',
  schema: z.object({
    firstName: z.string(),
    lastName: z.string(),
    blurb: z.string(),
    description: z.string(),
    caveats: z.array(z.string()).nonempty(),
    location: z.string(),
    email: z.string(),
    github: z.string(),
    linkedIn: z.string(),
    education: z.object({
      degree: z.string(),
      school: z.string(),
      year: z.string(),
      details: z.string(),
    }),
  }),
})

const jobs = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    url: z
      .string()
      .url()
      .transform((url) => new URL(url))
      .optional(),
    roles: z
      .array(
        z.object({
          title: z.string(),
          start: z.coerce.date(),
          end: z.coerce.date().optional(),
        }),
      )
      .nonempty(),
    achievements: z.array(z.string()),
  }),
})

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    repository: z.string().regex(/^[a-z0-9_-]+\/[a-z0-9_-]+/iu),
    description: z.string(),
    roles: z
      .array(
        z.object({
          title: z.string(),
          start: z.coerce.date(),
          end: z.coerce.date().optional(),
        }),
      )
      .nonempty(),
    rank: z.number(),
  }),
})

const skills = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    skills: z.array(z.string()),
    rank: z.number(),
  }),
})

export const collections = { articles, bio, jobs, projects, skills }
