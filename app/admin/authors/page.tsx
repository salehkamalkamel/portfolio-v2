import Link from "next/link";
import { Plus, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAuthors } from "@/server/authors-actions";
import AuthorCtrl from "@/components/author/author-ctrl";

function getAvatarInitials(name: string) {
  const names = name.trim().split(" ");
  if (names.length === 0) return "";
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (
    names[0].charAt(0).toUpperCase() +
    names[names.length - 1].charAt(0).toUpperCase()
  );
}
export default async function AdminAuthorsPage() {
  const authors = await getAuthors();

  if (!authors) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading authors...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-neutral-800/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Authors</h1>
          </div>
          <Link href="/admin/authors/add">
            <Button className="bg-purple-500 text-white hover:bg-purple-400">
              <Plus className="w-4 h-4 mr-2" />
              New Author
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Authors List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-neutral-300">
              All Authors ({authors.length})
            </h2>
          </div>

          {authors.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-neutral-800/60 rounded-xl">
              <p className="text-neutral-400 mb-4">
                No authors yet. Add one to get started.
              </p>
              <Link href="/admin/authors/add">
                <Button className="bg-purple-500 text-white hover:bg-purple-400">
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Author
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {authors.map((author) => (
                <div
                  key={author.id}
                  className="border border-neutral-800/40 rounded-xl p-6 bg-neutral-900/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center shrink-0">
                      <span className="text-lg font-bold text-purple-400">
                        {getAvatarInitials(author.name)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xl font-bold">{author.name}</h3>
                        <AuthorCtrl author={author} />
                      </div>
                      <p className="text-purple-400 text-sm mb-2">
                        {author.role}
                      </p>
                      <p className="text-neutral-400 text-sm mb-3">
                        {author.bio}
                      </p>
                      <a
                        href={
                          author.resourceLinks && author.resourceLinks[0]
                            ? author.resourceLinks[0]
                            : "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {author.resourceLabel}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
