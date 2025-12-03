import { Calendar, MessageCircle } from "lucide-react";
import { getPostById, getPosts } from "@/server/blog-actions";

import BlogPostContent from "@/components/blog/blog-content";
import { AIFeaturesPanel } from "@/components/ai-features-panel";
import ShareButton from "@/components/blog/share-button";
import { Suspense } from "react";
import BlogUserProfileSkeleton from "@/components/blog/blog-user-profile-skeleton";
import BlogUserProfile from "@/components/blog-user-profile";
import { notFound } from "next/navigation";
import { PostLikeWrapper } from "@/components/blog/post-like-wrapper";
import { CommentsWrapper } from "@/components/blog/comments-wrapper";
import CommentsSkeleton from "@/components/blog/comments-skeleton";
import PostAuthorSection from "@/components/blog/post-author-section";
import { Metadata } from "next";
import Link from "next/link";

export async function generateStaticParams() {
  const blogs = await getPosts();
  return blogs.map((post) => ({
    id: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const postId = id?.split("__")[1];
  const post = await getPostById(postId);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.seoDescription,
    alternates: { canonical: `/blog/${id}` },
    openGraph: {
      title: post.title,
      description: post?.seoDescription || post.title,
      url: `/blog/${id}`,
      images: [
        {
          url: post?.coverImageUrl || "",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = id?.split("__")[1];
  const post = await getPostById(postId);

  if (!post) return notFound();

  return (
    <>
      {/* User Profile Top Bar */}
      <Suspense fallback={<BlogUserProfileSkeleton />}>
        <BlogUserProfile postId={post.id} />
      </Suspense>

      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <article className="max-w-4xl mx-auto px-6 py-8 border-b border-neutral-800/40">
          {/* Category + Meta */}
          <div className="flex items-center flex-wrap gap-3 mb-4">
            <span className="px-3 py-1 bg-cyan-900/20 text-cyan-300 border border-cyan-700/40 rounded text-xs font-medium">
              {post.category}
            </span>

            <span className="flex items-center gap-2 text-sm text-neutral-500">
              <Calendar className="w-4 h-4" />
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>

            <span className="text-sm text-neutral-500">
              {post.readTime} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
            {post.title}
          </h1>

          {/* Slim Author Row */}
          <PostAuthorSection authorId={post.authorId} />

          {/* Action Row */}
          <div className="border-t border-neutral-800/40 pt-4 mt-6 flex items-center gap-4">
            <Suspense
              fallback={
                <div className="h-10 w-24 bg-neutral-800 rounded animate-pulse" />
              }
            >
              <PostLikeWrapper postId={post.id} />
            </Suspense>
            <Link
              href={"#comments"}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border bg-neutral-800/20 border-neutral-800/40 text-neutral-400 hover:bg-neutral-800/40 transition-all disabled:opacity-50"
            >
              <MessageCircle className="w-5 h-5" />
              Comments
            </Link>
            <ShareButton title={post.title} />
          </div>
        </article>

        {/* AI Enhancement Panel */}
        <section className="max-w-4xl mx-auto px-6 py-6">
          <AIFeaturesPanel title={post.title} content={post.content} />
        </section>

        {/* Blog Content */}
        <BlogPostContent content={post.content} />

        {/* Comments */}
        <Suspense fallback={<CommentsSkeleton />}>
          <CommentsWrapper postId={post.id} />
        </Suspense>

        {/* Footer */}
        <footer className="border-t border-neutral-800/40 bg-neutral-900/30 mt-10">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <p className="text-center text-neutral-500 text-sm">
              © 2025 Saleh Kamal. Built with Next.js and optimized for
              performance.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
