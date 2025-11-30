import { getPosts } from "@/server/blog-actions";
import ClientBlogCard from "./client-blog-card";

interface ClientBlogListProps {
  search: string;
}

export default async function ClientBlogList({ search }: ClientBlogListProps) {
  // Pass the search query to getPosts
  const blogPosts = await getPosts(search);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      {blogPosts.length > 0 ? (
        <>
          {/* Show search result count */}
          {search && (
            <div className="mb-6 text-neutral-400">
              Found {blogPosts.length} article
              {blogPosts.length !== 1 ? "s" : ""}
              {search && ` matching "${search}"`}
            </div>
          )}

          <div className="grid gap-6">
            {blogPosts.map((post) => (
              <ClientBlogCard key={post.id} post={post} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-neutral-400 text-lg">
            {search
              ? `No articles found matching "${search}"`
              : "No articles found."}
          </p>
          <p className="text-neutral-500 text-sm mt-2">
            Try searching for different keywords
          </p>
        </div>
      )}
    </section>
  );
}
