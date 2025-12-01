"use server";

import { db } from "@/lib/drizzle";
import { comments, commentLikes } from "@/db/schema";
import { eq, and, desc, inArray, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { cacheTag, updateTag } from "next/cache";
import { headers } from "next/headers";

// Type definition for the frontend
export type CommentWithAuthor = typeof comments.$inferSelect & {
  author: {
    id: string;
    name: string;
    image: string | null;
  };
  isLikedByUser: boolean;
  replies?: CommentWithAuthor[];
};

/**
 * FETCH COMMENTS
 * Strategy: Fetch all comments for post + Fetch current user's likes for this post.
 * Merge in memory. This avoids N+1 queries.
 */
export async function getCommentsForPost(
  postId: string,
  userId?: string
): Promise<CommentWithAuthor[]> {
  "use cache";
  cacheTag(`post-comments-${postId}`);
  // 1. Fetch raw comments
  const rawComments = await db.query.comments.findMany({
    where: eq(comments.postId, postId),
    orderBy: [desc(comments.createdAt)],
    with: {
      author: {
        columns: { id: true, name: true, image: true },
      },
    },
  });

  // 2. If user is logged in, fetch their likes for this post's comments in one batch
  const userLikedCommentIds = new Set<string>();
  if (userId && rawComments.length > 0) {
    const commentIds = rawComments.map((c) => c.id);
    const likes = await db.query.commentLikes.findMany({
      where: and(
        eq(commentLikes.userId, userId),
        inArray(commentLikes.commentId, commentIds)
      ),
      columns: { commentId: true },
    });
    likes.forEach((l) => userLikedCommentIds.add(l.commentId));
  }

  // 3. Transform and Threading
  const commentMap = new Map<string, CommentWithAuthor>();

  // Initialize map with user status
  rawComments.forEach((c) => {
    commentMap.set(c.id, {
      ...c,
      isLikedByUser: userLikedCommentIds.has(c.id),
      replies: [],
    });
  });

  const roots: CommentWithAuthor[] = [];

  // Build tree
  for (const c of rawComments) {
    const comment = commentMap.get(c.id)!;
    if (comment.parentId && commentMap.has(comment.parentId)) {
      commentMap.get(comment.parentId)!.replies!.push(comment);
    } else {
      roots.push(comment);
    }
  }

  return roots;
}

/**
 * ADD COMMENT
 */
export async function addComment({
  postId,
  content,
  parentId = null,
}: {
  postId: string;
  content: string;
  parentId?: string | null;
}) {
  const session = await auth.api.getSession({
    headers: await import("next/headers").then((h) => h.headers()),
  });
  if (!session?.user) return { error: "Unauthorized" };

  if (!content.trim()) return { error: "Content is required" };

  await db.insert(comments).values({
    content: content.trim(),
    postId,
    parentId,
    userId: session.user.id,
  });

  updateTag(`post-comments-${postId}`);
  return { success: true };
}

/**
 * TOGGLE LIKE
 * Uses a Transaction to ensure the join table and the count column stay in sync.
 */
export async function toggleCommentLike(commentId: string, postId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;
  if (!userId) return { error: "Unauthorized" };

  try {
    // Attempt to insert like
    const inserted = await db
      .insert(commentLikes)
      .values({ userId, commentId })
      .onConflictDoNothing()
      .returning();

    // If inserted.length > 0 → LIKE
    if (inserted.length > 0) {
      await db
        .update(comments)
        .set({ likesCount: sql`${comments.likesCount} + 1` })
        .where(eq(comments.id, commentId));

      return { success: true, liked: true };
    }

    // ELSE: UNLIKE
    await db
      .delete(commentLikes)
      .where(
        and(
          eq(commentLikes.commentId, commentId),
          eq(commentLikes.userId, userId)
        )
      );

    await db
      .update(comments)
      .set({ likesCount: sql`${comments.likesCount} - 1` })
      .where(eq(comments.id, commentId));

    updateTag(`post-comments-${postId}`);
    return { success: true, liked: false };
  } catch (error) {
    console.error("Comment Like Error:", error);
    return { success: false, error: "Failed to toggle comment like" };
  }
}

/**
 * UPDATE COMMENT
 */
export async function updateComment(
  commentId: string,
  content: string,
  postId: string
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) return { error: "Unauthorized" };

  const existing = await db.query.comments.findFirst({
    where: eq(comments.id, commentId),
  });

  if (!existing || existing.userId !== session.user.id) {
    return { error: "Not allowed" };
  }

  await db
    .update(comments)
    .set({ content: content.trim() })
    .where(eq(comments.id, commentId));

  updateTag(`post-comments-${postId}`);
  return { success: true };
}

/**
 * DELETE COMMENT
 */
export async function deleteComment(commentId: string, postId: string) {
  const session = await auth.api.getSession({
    headers: await import("next/headers").then((h) => h.headers()),
  });
  if (!session?.user) return { error: "Unauthorized" };

  const existing = await db.query.comments.findFirst({
    where: eq(comments.id, commentId),
  });

  if (!existing || existing.userId !== session.user.id) {
    return { error: "Not allowed" };
  }

  await db.delete(comments).where(eq(comments.id, commentId));

  updateTag(`post-comments-${postId}`);
  return { success: true };
}
