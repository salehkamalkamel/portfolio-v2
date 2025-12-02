import { getAuthorById } from "@/server/authors-actions";
import { ExternalLink } from "lucide-react";

export default async function PostAuthorSection({
  authorId,
}: {
  authorId: string;
}) {
  const author = await getAuthorById(authorId);
  const initial = author.name?.charAt(0)?.toUpperCase();
  console.log(author.imageUrl);

  return (
    <section className="max-w-4xl mx-auto py-6 w-full">
      <div className="rounded-xl border border-neutral-800/50 bg-neutral-900/40 backdrop-blur-sm p-5">
        <div className="flex items-start gap-4">
          {/* Smaller Avatar */}
          <div className="w-14 h-14 rounded-full bg-linear-to-br from-purple-500/20 to-purple-900/10 border border-purple-500/40 flex items-center justify-center overflow-hidden shrink-0">
            {author.imageUrl ? (
              <img
                src={author.imageUrl}
                alt={author.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-lg font-semibold text-purple-400">
                {initial}
              </span>
            )}
          </div>

          {/* Info Section */}
          <div className="flex-1">
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest mb-1">
              Written by
            </p>

            <h3 className="text-lg font-semibold leading-tight">
              {author.name}
            </h3>

            <p className="text-[13px] text-purple-400 -mt-0.5 mb-2">
              {author.role}
            </p>

            <p className="text-[13px] text-neutral-400 leading-snug line-clamp-3">
              {author.bio}
            </p>

            {author?.resourceLinks?.[0] && (
              <a
                href={author.resourceLinks[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-1.5 text-xs mt-3
                  px-3 py-1.5 rounded-lg
                  border border-cyan-700/40 bg-cyan-900/20 
                  text-cyan-300 hover:text-cyan-200
                  hover:border-cyan-500/40 hover:bg-cyan-900/30
                  transition-all
                "
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {author.resourceLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
