"use server";
import { randomUUID } from "crypto"; // ← Add this

import { projects } from "@/db/schema";
import { db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/slugify";
import {
  projectFormSchema,
  ProjectFormValues,
} from "@/lib/validations/projects";
import { redirect } from "next/navigation";

/* ============================
   ✅ CREATE PROJECT
============================ */
export async function createProject(data: ProjectFormValues) {
  const parsed = projectFormSchema.safeParse(data);

  if (!parsed.success) {
    return { error: "Invalid project data." };
  }

  const {
    title,
    brief,
    description,
    stack,
    technologies,
    thumbnailUrl,
    liveUrl,
    repoUrl,
    problem,
    solution,
    featured,
    published,
  } = parsed.data;

  const id = randomUUID();
  console.log(id);

  const slug = slugify(title, id);
  try {
    // 1️⃣ Insert WITHOUT slug → get ID
    const [created] = await db
      .insert(projects)
      .values({
        id,
        title,
        brief,
        description,
        stack,
        technologies,
        thumbnailUrl,
        liveUrl,
        slug,
        repoUrl,
        problem,
        solution,
        featured,
        published,
      })
      .returning();

    revalidatePath("/admin/projects");
  } catch (error) {
    console.error("DB ERROR:", error);
    return { error: "Failed to create project." };
  }

  redirect("/admin/projects");
}

/* ============================
   ✅ READ — GET ALL PROJECTS
============================ */
export async function getProjects() {
  return await db.select().from(projects).orderBy(projects.createdAt);
}

export async function getFeaturedProjects() {
  return await db
    .select()
    .from(projects)
    .where(eq(projects.featured, true))
    .orderBy(projects.createdAt);
}

/* ============================
   ✅ READ — GET PROJECT BY ID
============================ */
export async function getProjectById(id: string) {
  const [project] = await db.select().from(projects).where(eq(projects.id, id));

  return project;
}

/* ============================
   ✅ UPDATE PROJECT
============================ */
export async function updateProject(id: string, data: ProjectFormValues) {
  try {
    const parsed = projectFormSchema.safeParse(data);

    if (!parsed.success) {
      return { success: false, message: "Invalid project data." };
    }

    const updateData: any = {
      ...parsed.data,
      updatedAt: new Date(),
    };

    if (data.title) {
      updateData.slug = slugify(data.title, id);
    }

    const [updated] = await db
      .update(projects)
      .set(updateData)
      .where(eq(projects.id, id))
      .returning();

    revalidatePath("/admin/projects");

    return { success: true, updated };
  } catch (error: any) {
    console.error("UPDATE ERROR:", error);
    return { success: false, message: error.message };
  }
}

/* ============================
   ❌ DELETE PROJECT
============================ */
export async function deleteProject(id: string) {
  try {
    await db.delete(projects).where(eq(projects.id, id));

    revalidatePath("/admin/projects");

    return { success: true };
  } catch (error: any) {
    console.error("DELETE ERROR:", error);
    return { success: false, message: error.message };
  }
}
