import { z } from "zod";

export const postFormSchema = z.object({
  title: z.string().min(1).max(256),
  // You might want to make slug optional if you calculate it on the server

  excerpt: z.string().max(500),
  category: z.string().min(1),
  content: z.string().min(1),

  readTime: z.number().min(1),
  authorId: z.string().min(1),

  tags: z.array(z.string()).default([]),

  coverImageUrl: z.string().url().optional().or(z.literal("")),
  seoTitle: z.string().max(256).optional().or(z.literal("")),
  seoDescription: z.string().max(320).optional().or(z.literal("")),
  canonicalUrl: z.string().url().optional().or(z.literal("")),
  isFeatured: z.boolean().default(false),
});

export type PostFormValues = z.infer<typeof postFormSchema>;
