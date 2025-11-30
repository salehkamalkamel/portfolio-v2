import { Suspense } from "react";
import ClientBlogList from "@/components/blog/clint-blog-list";
import SkeletonBlogPostCard from "@/components/skeleton/blog/client-blog-skeleton";
import BlogSearch from "@/components/blog/blog-search";
import { ArrowUpRight, PenLine, Sparkles } from "lucide-react";
import Link from "next/link";
import BlogUserProfile from "@/components/blog-user-profile";
import BlogUserProfileSkeleton from "@/components/blog/blog-user-profile-skeleton";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const params = await searchParams;
  const searchQuery = params.search || "";
  return (
    <div>
      <Suspense fallback={<BlogUserProfileSkeleton />}>
        <BlogUserProfile />
      </Suspense>

      <div className="min-h-screen bg-black text-white">
        {/* Header Section */}
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 border-b border-neutral-800/40">
          <div className="mb-12">
            <p className="text-xs text-neutral-500 uppercase tracking-widest mb-3">
              Articles & Resources
            </p>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Web Development Blog
            </h1>
            <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">
              I write about web performance, frontend optimization, modern
              JavaScript frameworks, and best practices for building fast,
              scalable web applications.
            </p>
          </div>

          {/* Search Bar */}
          <BlogSearch />
        </section>

        {/* Posts Section */}
        <Suspense
          fallback={
            <section className="max-w-6xl mx-auto px-6 py-16">
              <div className="grid gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index}>
                    <SkeletonBlogPostCard />
                  </div>
                ))}
              </div>
            </section>
          }
        >
          <ClientBlogList search={searchQuery} />
        </Suspense>

        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="relative border border-dashed border-neutral-700/60 rounded-xl p-8 md:p-12 bg-linear-to-br from-neutral-900/50 to-neutral-800/20 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 text-neutral-700">
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="shrink-0 w-16 h-16 rounded-full bg-linear-to-br from-purple-500/20 to-cyan-500/20 border border-neutral-700/50 flex items-center justify-center">
                <PenLine className="w-7 h-7 text-purple-400" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                  Got something to share?{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-cyan-400">
                    I'll lend you some pixels.
                  </span>
                </h3>
                <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-2xl">
                  If you have insights about web development, performance tips,
                  or just a cool project story — let's talk. My blog is open for
                  guest posts from fellow devs who love what they do.
                </p>
              </div>

              <Link
                href="/contact"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors group"
              >
                Let's Connect
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

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
    </div>
  );
}
