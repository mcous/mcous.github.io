import { defineCollection, z } from 'astro:content'
import { retext } from 'retext'
import retextSmartypants from 'retext-smartypants'

const typographer = retext().use(retextSmartypants)

/** Display text with typographic quotes, dashes, and ellipses. */
const prose = z
  .string()
  .transform((text) => String(typographer.processSync(text)))

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: prose,
    description: prose,
    posted: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
  }),
})

const bio = defineCollection({
  type: 'data',
  schema: z.object({
    firstName: z.string(),
    lastName: z.string(),
    blurb: prose,
    description: prose,
    caveats: z.array(prose).nonempty(),
    location: z.string(),
    email: z.string(),
    github: z.string(),
    linkedIn: z.string(),
    education: z.object({
      degree: z.string(),
      school: z.string(),
      year: z.string(),
      details: prose,
    }),
  }),
})

const jobs = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    description: prose,
    url: z
      .string()
      .url()
      .transform((url) => new URL(url))
      .optional(),
    roles: z
      .array(
        z.object({
          title: prose,
          start: z.coerce.date(),
          end: z.coerce.date().optional(),
        }),
      )
      .nonempty(),
    achievements: z.array(prose),
    hidden: z.boolean().optional(),
  }),
})

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    repository: z.string().regex(/^[a-z0-9_-]+\/[a-z0-9_-]+/iu),
    description: prose,
    roles: z
      .array(
        z.object({
          title: prose,
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
    name: prose,
    skills: z.array(prose),
    rank: z.number(),
  }),
})

export const collections = { articles, bio, jobs, projects, skills }
