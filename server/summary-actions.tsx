"use server";

import { count } from "drizzle-orm";
import { projects, posts, authors, comments } from "@/db/schema"; // Adjust this path to your schema file
import { db } from "@/lib/drizzle";
import { cacheTag } from "next/cache";

/**
 * Gets the total number of projects in the portfolio.
 */
export async function getTotalProjectsCount(): Promise<number> {
  try {
    const [result] = await db.select({ value: count() }).from(projects);
    return result.value;
  } catch (error) {
    console.error("Failed to fetch project count:", error);
    return 0;
  }
}

/**
 * Gets the total number of blog posts.
 */
export async function getTotalPostsCount(): Promise<number> {
  try {
    const [result] = await db.select({ value: count() }).from(posts);
    return result.value;
  } catch (error) {
    console.error("Failed to fetch post count:", error);
    return 0;
  }
}

/**
 * Gets the total number of registered authors.
 */
export async function getTotalAuthorsCount(): Promise<number> {
  try {
    const [result] = await db.select({ value: count() }).from(authors);
    return result.value;
  } catch (error) {
    console.error("Failed to fetch author count:", error);
    return 0;
  }
}

/**
 * Gets the total number of comments across all posts.
 */
export async function getTotalCommentsCount(): Promise<number> {
  try {
    const [result] = await db.select({ value: count() }).from(comments);
    return result.value;
  } catch (error) {
    console.error("Failed to fetch comment count:", error);
    return 0;
  }
}

/**
 * Optional: A utility to get all stats at once for a dashboard
 */
export async function getDashboardStats() {
  "use cache";
  cacheTag("admin-summary");
  const [projectsCount, postsCount, authorsCount, commentsCount] =
    await Promise.all([
      getTotalProjectsCount(),
      getTotalPostsCount(),
      getTotalAuthorsCount(),
      getTotalCommentsCount(),
    ]);

  return {
    projects: projectsCount,
    posts: postsCount,
    authors: authorsCount,
    comments: commentsCount,
  };
}
