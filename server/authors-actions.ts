"use server";

import { authors } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cacheTag, revalidatePath, updateTag } from "next/cache";
import { slugify } from "@/lib/slugify";
import { db } from "@/lib/drizzle";
import { authorFormSchema, AuthorFormValues } from "@/lib/validations/authors";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";

/* ============================
 ✅ CREATE AUTHOR
============================ */

export async function createAuthor(data: AuthorFormValues) {
  // 1. Server-side validation
  const parsed = authorFormSchema.safeParse(data);

  if (!parsed.success) {
    return { error: "Invalid form data" };
  }

  const { name, role, bio, avatar, resourceLabel, resourceUrl } = parsed.data;

  // 2. Prepare data for Drizzle
  // Logic to handle avatar generation if the user didn't type initials
  const finalAvatar =
    avatar ||
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  const id = randomUUID();
  const slug = slugify(name, id);

  try {
    await db.insert(authors).values({
      id,
      name,
      role,
      bio,
      slug,
      imageUrl: finalAvatar, // Storing initials in image_url as per your logic
      resourceLabel,
      // Convert single URL to array for JSONB column
      resourceLinks: resourceUrl ? [resourceUrl] : [],
    });

    updateTag("authors");
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Failed to create author. Please try again." };
  }

  // Redirect needs to happen outside the try/catch block in Next.js
  redirect("/admin/authors");
}

/* ============================
 ✅ READ
============================ */
export async function getAuthors() {
  "use cache";
  cacheTag("authors");
  return await db.select().from(authors).orderBy(authors.createdAt);
}

export async function getAuthorById(id: string) {
  "use cache";
  cacheTag(`author-${id}`);
  const [author] = await db.select().from(authors).where(eq(authors.id, id));

  return author;
}

/* ============================
 ✅ UPDATE AUTHOR
============================ */
export async function updateAuthor(id: string, data: AuthorFormValues) {
  try {
    const parsed = authorFormSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, message: "Invalid form data" };
    }
    const updateData: any = {
      ...data,
      updatedAt: new Date(),
    };

    if (data.name) updateData.slug = slugify(data.name, id);

    const [updated] = await db
      .update(authors)
      .set(updateData)
      .where(eq(authors.id, id))
      .returning();

    updateTag("authors");
    return { success: true, updated };
  } catch (error: any) {
    return { success: false, message: error?.message };
  }
}

/* ============================
 ✅ DELETE AUTHOR
============================ */
export async function deleteAuthor(id: string) {
  try {
    await db.delete(authors).where(eq(authors.id, id));

    updateTag("authors");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error?.message };
  }
}
