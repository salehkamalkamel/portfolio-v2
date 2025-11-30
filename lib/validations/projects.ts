import z from "zod";

export const projectFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(256, "Title is too long"),
  brief: z.string().min(1, "Brief is required").max(512, "Brief is too long"),
  description: z.string().min(1, "Description is required"),
  stack: z.string().min(1, "Stack is required").max(256, "Stack is too long"),
  technologies: z.array(z.string()).optional(),
  thumbnailUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  liveUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  repoUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  problem: z.string().min(1, "Problem is required"),
  solution: z.string().min(1, "Solution is required"),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
