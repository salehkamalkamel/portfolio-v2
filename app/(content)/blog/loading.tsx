import BlogUserProfileSkeleton from "@/components/blog/blog-user-profile-skeleton";
import SkeletonBlogPostCard from "@/components/skeleton/blog/client-blog-skeleton";

export default function LoadingBlogPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Profile Skeleton */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <BlogUserProfileSkeleton />
      </div>

      {/* Header Section Skeleton */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 border-b border-neutral-800/40 animate-pulse">
        <div className="mb-12 space-y-4">
          <div className="w-40 h-3 bg-neutral-800 rounded"></div>
          <div className="w-80 h-10 bg-neutral-800 rounded"></div>
          <div className="w-full max-w-md h-4 bg-neutral-800 rounded"></div>
          <div className="w-full max-w-sm h-4 bg-neutral-800 rounded"></div>
        </div>

        {/* Search Bar Skeleton */}
        <div className="w-full max-w-xl h-12 bg-neutral-800 rounded-lg"></div>
      </section>

      {/* Posts Skeleton */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonBlogPostCard key={i} />
          ))}
        </div>
      </section>

      {/* CTA box Skeleton */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="relative border border-neutral-800/40 rounded-xl p-12 bg-neutral-900/40 animate-pulse">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 rounded-full bg-neutral-800"></div>

            <div className="flex-1 space-y-4">
              <div className="w-72 h-6 bg-neutral-800 rounded"></div>
              <div className="w-full max-w-md h-4 bg-neutral-800 rounded"></div>
              <div className="w-full max-w-sm h-4 bg-neutral-800 rounded"></div>
            </div>

            <div className="w-40 h-12 bg-neutral-800 rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className="border-t border-neutral-800/40 bg-neutral-900/30 mt-16 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="w-60 h-4 bg-neutral-800 mx-auto rounded"></div>
        </div>
      </footer>
    </div>
  );
}
