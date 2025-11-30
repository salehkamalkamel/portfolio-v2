import { Calendar } from "lucide-react";
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
// app/blog/[slug]/page.tsx
import { Metadata } from "next";

export async function generateStaticParams() {
  const blogs = await getPosts();
  return blogs.map((post) => {
    return {
      id: post.slug,
    };
  });
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
    alternates: {
      canonical: `/blog/${id}`,
    },
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
      <Suspense fallback={<BlogUserProfileSkeleton />}>
        <BlogUserProfile postId={post.id} />
      </Suspense>
      <div className="min-h-screen bg-black text-white">
        {/* Post Header */}
        <article className="max-w-4xl mx-auto px-6 py-16 border-b border-neutral-800/40">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-cyan-900/30 text-cyan-300 border border-cyan-700/50 rounded text-xs font-medium">
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

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-neutral-400 text-lg leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* Post Meta */}
          <div className="border-t border-neutral-800/40 pt-6 flex items-center gap-6">
            <Suspense
              fallback={
                <div className="h-10 w-24 bg-neutral-800 rounded animate-pulse" />
              }
            >
              <PostLikeWrapper postId={post.id} />
            </Suspense>

            <ShareButton title={post.title} />
          </div>
        </article>

        <section className="max-w-4xl mx-auto px-6 py-8">
          <AIFeaturesPanel title={post.title} content={post.content} />
        </section>

        {/* Post Content */}
        <BlogPostContent content={post.content} />

        {/* Comments Section */}
        <Suspense fallback={<CommentsSkeleton />}>
          <CommentsWrapper postId={post.id} />
        </Suspense>

        {/* Footer */}
        <footer className="border-t border-neutral-800/40 bg-neutral-900/30 mt-16">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="text-center text-neutral-500 text-sm">
              <p>
                © 2025 Saleh Kamal. Built with Next.js and optimized for
                performance.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
