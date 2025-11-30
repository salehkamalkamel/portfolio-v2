import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogRow from "@/components/blog/blog-row";
import { getPosts } from "@/server/blog-actions";

export default async function AdminBlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-neutral-800/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Blog Posts</h1>
          </div>
          <Link href="/admin/blog/add">
            <Button className="bg-emerald-500 text-black hover:bg-emerald-400">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Posts List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-neutral-300">
              All Posts ({posts.length})
            </h2>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-neutral-800/60 rounded-xl">
              <p className="text-neutral-400 mb-4">
                No posts yet. Create one to get started.
              </p>
              <Link href="/admin/blog/add">
                <Button className="bg-emerald-500 text-black hover:bg-emerald-400">
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Post
                </Button>
              </Link>
            </div>
          ) : (
            <div className="border border-neutral-800/40 rounded-xl overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-4 bg-neutral-900/50 border-b border-neutral-800/40 text-sm font-medium text-neutral-400">
                <div className="col-span-5">Title</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-2">Author</div>
                <div className="col-span-1">Stats</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              {/* Table Rows */}
              {posts?.map((post, index) => (
                <BlogRow
                  key={post.id}
                  post={post}
                  index={index}
                  postsLength={posts.length}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
