import { defineCollection, z } from 'astro:content'

const articles = defineCollection({
  type: 'content',
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    posted: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
  }),
})

export const collections = { articles }
