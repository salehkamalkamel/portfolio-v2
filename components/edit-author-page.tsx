import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getAuthorById } from "@/server/authors-actions";
import EditAuthorForm from "@/components/author/edit-form";

export default async function EditAuthorPage({
  authorId,
}: {
  authorId: string;
}) {
  const author = await getAuthorById(authorId);

  if (!author) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Author not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-neutral-800/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            href="/admin/authors"
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold">Edit Author</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="border border-neutral-800/40 rounded-xl p-8 bg-neutral-900/30">
          <EditAuthorForm author={author} />
        </div>
      </div>
    </div>
  );
}
