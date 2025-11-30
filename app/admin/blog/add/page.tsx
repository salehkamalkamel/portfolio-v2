import AddBlogForm from "@/components/blog/add-blog-form";
import { getAuthors } from "@/server/authors-actions";

export default async function AddBlogPostPage() {
  const authors = await getAuthors();
  if (!authors || authors.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-lg">
          No authors found. Please add an author before creating a blog post.
        </p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-neutral-800/40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <h1 className="text-2xl font-bold">Create New Post</h1>
        </div>
      </header>
      <AddBlogForm authors={authors} />
    </div>
  );
}
