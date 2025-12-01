import { notFound } from "next/navigation";
import { getPostById, getPosts } from "@/server/blog-actions";
import { getAuthors } from "@/server/authors-actions";
import EditBlogForm from "@/components/blog/edit-blog-form";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => {
    return {
      id: post.id,
    };
  });
}

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  // Fetch post and authors in parallel for better performance
  const [post, authors] = await Promise.all([
    getPostById(resolvedParams.id),
    getAuthors(), // You likely need authors list for the select dropdown
  ]);

  if (!post) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-neutral-800/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <h1 className="text-2xl font-bold text-emerald-400">Edit Post</h1>
        </div>
      </header>

      <EditBlogForm
        existingPost={post}
        postId={resolvedParams.id}
        authors={authors}
      />
    </div>
  );
}
