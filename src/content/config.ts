import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    figureNumber: z.number(),
    description: z.string(),
    tags: z.array(z.string()),
    github: z.string().url().optional(),
    annotation: z.string(),
  }),
});

const writing = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    abstract: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { projects, writing };
