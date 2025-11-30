import Link from "next/link";
import { FileText, Folder, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

import { UserSignout } from "@/components/user-signout";
import { getDashboardStats } from "@/server/summary-actions";
import { Suspense } from "react";

export default async function AdminDashboard() {
  // fetching admin data insights
  const { projects, posts, authors, comments } = await getDashboardStats();
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-neutral-800/40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tighter">
            Admin Dashboard
          </h1>
          <Suspense fallback={<p>loading...</p>}>
            <UserSignout />
          </Suspense>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Navigation Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Projects Management Card */}
          <Link href="/admin/projects">
            <div className="group border border-neutral-800/40 rounded-xl p-8 bg-neutral-900/30 hover:bg-neutral-900/50 hover:border-neutral-700/60 transition-all cursor-pointer h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                  <Folder className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Projects</h2>
                  <p className="text-neutral-500 text-sm">
                    Manage your portfolio
                  </p>
                </div>
              </div>
              <p className="text-neutral-400 mb-6">
                Add, edit, and delete projects. Update project details, images,
                metrics, and tags.
              </p>
              <Button className="bg-cyan-500 text-black hover:bg-cyan-400">
                Manage Projects
              </Button>
            </div>
          </Link>

          {/* Blog Management Card */}
          <Link href="/admin/blog">
            <div className="group border border-neutral-800/40 rounded-xl p-8 bg-neutral-900/30 hover:bg-neutral-900/50 hover:border-neutral-700/60 transition-all cursor-pointer h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                  <FileText className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Blog Posts</h2>
                  <p className="text-neutral-500 text-sm">
                    Manage your content
                  </p>
                </div>
              </div>
              <p className="text-neutral-400 mb-6">
                Create, edit, and delete blog posts. Manage categories, tags,
                and view analytics.
              </p>
              <Button className="bg-emerald-500 text-black hover:bg-emerald-400">
                Manage Blog
              </Button>
            </div>
          </Link>

          {/* Authors Management Card */}
          <Link href="/admin/authors">
            <div className="group border border-neutral-800/40 rounded-xl p-8 bg-neutral-900/30 hover:bg-neutral-900/50 hover:border-neutral-700/60 transition-all cursor-pointer h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Authors</h2>
                  <p className="text-neutral-500 text-sm">
                    Manage blog authors
                  </p>
                </div>
              </div>
              <p className="text-neutral-400 mb-6">
                Add, edit, and delete authors. Manage author profiles and
                resource links.
              </p>
              <Button className="bg-purple-500 text-white hover:bg-purple-400">
                Manage Authors
              </Button>
            </div>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mt-12 border-t border-neutral-800/40 pt-12">
          <h2 className="text-2xl font-bold mb-8">Overview</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="border border-neutral-800/40 rounded-xl p-6 bg-neutral-900/30">
              <p className="text-neutral-500 text-sm mb-2">Total Projects</p>
              <p className="text-3xl font-bold">{projects}</p>
            </div>
            <div className="border border-neutral-800/40 rounded-xl p-6 bg-neutral-900/30">
              <p className="text-neutral-500 text-sm mb-2">Blog Posts</p>
              <p className="text-3xl font-bold">{posts}</p>
            </div>
            <div className="border border-neutral-800/40 rounded-xl p-6 bg-neutral-900/30">
              <p className="text-neutral-500 text-sm mb-2">Authors</p>
              <p className="text-3xl font-bold">{authors}</p>
            </div>
            <div className="border border-neutral-800/40 rounded-xl p-6 bg-neutral-900/30">
              <p className="text-neutral-500 text-sm mb-2">Total Comments</p>
              <p className="text-3xl font-bold">{comments}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
