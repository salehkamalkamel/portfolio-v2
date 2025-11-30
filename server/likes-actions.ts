"use server";

import { db } from "@/lib/drizzle";
import { postLikes, posts } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { cacheTag, updateTag } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/**
 * Toggle like for a post.
 * - If user already liked -> unlike (delete row)
 * - Otherwise -> insert row
 * Returns { success, liked, totalLikes }
 */
export async function togglePostLike(postId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return { success: false, error: "Unauthinticated user" };
    }
    const userId = session.user.id;
    // Verify post exists
    const [post] = await db.select().from(posts).where(eq(posts.id, postId));
    if (!post) {
      return { success: false, error: "Post not found" };
    }

    // Check existing like
    const [existing] = await db
      .select()
      .from(postLikes)
      .where(and(eq(postLikes.userId, userId), eq(postLikes.postId, postId)));

    if (existing) {
      // Unlike
      await db
        .delete(postLikes)
        .where(and(eq(postLikes.userId, userId), eq(postLikes.postId, postId)));
    } else {
      // Like
      await db.insert(postLikes).values({
        userId,
        postId,
      });
    }

    // Recalculate total likes
    const [countRow] = await db
      .select({ count: sql<number>`count(*)` })
      .from(postLikes)
      .where(eq(postLikes.postId, postId));

    // Revalidate cache/tag
    updateTag(`post-likes-${postId}`);

    return {
      success: true,
      liked: !existing,
      totalLikes: Number(countRow?.count ?? 0),
    };
  } catch (error) {
    console.error("Error toggling post like:", error);
    return { success: false, error: "Failed to toggle like" };
  }
}

/**
 * Get post like info: total likes and whether the provided user has liked it.
 * If userId omitted, will only return totalLikes.
 */
export async function getPostLikeInfo(postId: string, userId?: string) {
  "use cache";
  cacheTag(`post-likes-${postId}`);
  try {
    // Total likes for this post
    const [countRow] = await db
      .select({ count: sql<number>`count(*)` })
      .from(postLikes)
      .where(eq(postLikes.postId, postId));

    const totalLikes = Number(countRow?.count ?? 0);

    let isLikedByUser = false;
    if (userId) {
      const [userRow] = await db
        .select()
        .from(postLikes)
        .where(and(eq(postLikes.postId, postId), eq(postLikes.userId, userId)));
      isLikedByUser = !!userRow;
    }

    return { totalLikes, isLikedByUser };
  } catch (error) {
    console.error("Error getting post like info:", error);
    return { totalLikes: 0, isLikedByUser: false };
  }
}

/**
 * Small helper: returns number of likes for a post (no user check)
 */
export async function getPostLikesCount(postId: string) {
  try {
    const [countRow] = await db
      .select({ count: sql<number>`count(*)` })
      .from(postLikes)
      .where(eq(postLikes.postId, postId));

    return Number(countRow?.count ?? 0);
  } catch (error) {
    console.error("Error getting likes count:", error);
    return 0;
  }
}
