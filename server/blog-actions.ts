"use server";

import { comments, postLikes, posts } from "@/db/schema";
import { eq, desc, sql, or, ilike } from "drizzle-orm";
import { cacheTag, revalidatePath, updateTag } from "next/cache";
import { slugify } from "@/lib/slugify";
import { db } from "@/lib/drizzle";
import { PostFormValues, postFormSchema } from "@/lib/validations/posts"; // ⬅️ Assume you define these
import { InferSelectModel } from "drizzle-orm";

// 📝 Type for Post data returned from the database
export type Post = InferSelectModel<typeof posts>;

// ============================================
// ✅ CREATE POST
// ============================================

export async function createPost(data: PostFormValues) {
  // 1. Server-side validation
  const parsed = postFormSchema.safeParse(data);

  if (!parsed.success) {
    // Return a structured error response
    return {
      success: false,
      error: "Invalid form data",
    };
  }

  const {
    title,
    excerpt,
    content,
    category,
    tags,
    authorId,
    coverImageUrl,
    seoTitle,
    seoDescription,
    canonicalUrl,
    readTime,
    isFeatured,
  } = parsed.data;

  const id = crypto.randomUUID();
  // 2. Prepare data for Drizzle
  const slug = slugify(title, id);

  try {
    const [newPost] = await db
      .insert(posts)
      .values({
        id,
        title,
        slug,
        excerpt,
        content,
        category,
        tags: tags || [], // Ensure JSONB is not null if empty
        authorId,
        coverImageUrl,
        seoTitle,
        seoDescription,
        canonicalUrl,
        readTime,
        isFeatured,
        updatedAt: new Date(),
      } as any)
      .returning();

    // 3. Revalidate and Redirect
    updateTag("posts");
    return {
      success: true,
    };
  } catch (error) {
    console.error("Database Error (Create Post):", error);
    // In a real app, you might check for unique constraint violations (e.g., slug)
    return {
      success: false,
      error: "Failed to create post. Please check the slug or try again.",
    };
  }
}

// ============================================
// ✅ READ (GET) POSTS
// ============================================

/**
 * Fetches all blog posts, typically for the admin listing page.
 */
export async function getPosts(searchQuery?: string) {
  "use cache";
  cacheTag("posts");
  try {
    // Base query
    let query = db.select().from(posts);

    // Add search filters if query exists
    if (searchQuery && searchQuery.trim()) {
      const searchTerm = `%${searchQuery.trim()}%`;

      query = query.where(
        or(
          // Search in title
          ilike(posts.title, searchTerm),
          // Search in excerpt
          ilike(posts.excerpt, searchTerm),
          // Search in content
          ilike(posts.content, searchTerm),
          // Search in category
          ilike(posts.category, searchTerm),
          // Search in SEO fields
          ilike(posts.seoTitle, searchTerm),
          ilike(posts.seoDescription, searchTerm)
        )
      ) as any;
    }

    // Order by most recent first
    const results = await query.orderBy(desc(posts.createdAt));

    return results;
  } catch (error) {
    console.error("Database Error (Get Posts):", error);
    return [];
  }
}
/**
 * Fetches a single post by its UUID ID.
 */
export async function getPostById(id: string) {
  "use cache";
  cacheTag(`post-${id}`);
  const [post] = await db.select().from(posts).where(eq(posts.id, id));

  return post;
}

/**
 * Fetches a single post by its URL slug.
 */
export async function getPostBySlug(slug: string) {
  "use cache";
  cacheTag(`post-${slug}`);
  const [post] = await db.select().from(posts).where(eq(posts.slug, slug));

  return post;
}

// ============================================
// ✅ UPDATE POST
// ============================================

export async function updatePost(id: string, data: PostFormValues) {
  // 1. Server-side validation
  const parsed = postFormSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, message: "Invalid form data" };
  }

  // 2. Prepare data for Drizzle
  // Include updated slug if the title was changed
  const updateData: Partial<PostFormValues> & {
    slug?: string;
    updatedAt: Date;
  } = {
    ...parsed.data,
    updatedAt: new Date(),
  };

  if (parsed.data.title) {
    updateData.slug = slugify(parsed.data.title, id);
  }

  try {
    const [updatedPost] = await db
      .update(posts)
      .set(updateData as any)
      .where(eq(posts.id, id))
      .returning();

    // 3. Revalidate paths
    // Invalidate the admin list page and the public post page
    updateTag("posts");
    updateTag(`post-${id}`);
    updateTag("posts-with-counts");

    return { success: true, updated: updatedPost };
  } catch (error) {
    console.error("Database Error (Update Post):", error);
    return {
      success: false,
      message: "Failed to update post. Please try again.",
    };
  }
}

// ============================================
// ✅ DELETE POST
// ============================================

export async function deletePost(id: string) {
  try {
    const [deletedPost] = await db
      .delete(posts)
      .where(eq(posts.id, id))
      .returning({ slug: posts.slug }); // Return the slug to revalidate the public page

    // Revalidate paths
    updateTag("posts");
    updateTag(`post-${id}`);
    updateTag(`post-${deletedPost.slug}`);
    updateTag("posts-with-counts");

    return { success: true };
  } catch (error) {
    console.error("Database Error (Delete Post):", error);
    return {
      success: false,
      message: "Failed to delete post. Please try again.",
    };
  }
}

export async function getPostsWithCounts() {
  "use cache";
  cacheTag("posts-with-counts");
  return await db.query.posts.findMany({
    orderBy: [desc(posts.createdAt)],
    extras: {
      // SQL magic to count relations without fetching them
      commentsCount:
        sql<number>`(SELECT count(*) FROM ${comments} WHERE ${comments.postId} = ${posts.id})`.as(
          "comments_count"
        ),
      likesCount:
        sql<number>`(SELECT count(*) FROM ${postLikes} WHERE ${postLikes.postId} = ${posts.id})`.as(
          "likes_count"
        ),
    },
    with: {
      author: true,
    },
  });
}
