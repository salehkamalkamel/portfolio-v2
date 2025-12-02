import { z } from "zod";

export const authorFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(256, "Name cannot exceed 256 characters"),
  role: z.string().max(128).default("Author"),
  bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
  // We will map this to 'imageUrl' in the DB
  imageUrl: z.string().optional(),
  resourceLabel: z.string().max(128).optional(),
  // We will map this to 'resourceLinks' array in the DB
  resourceUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export type AuthorFormValues = z.infer<typeof authorFormSchema>;
