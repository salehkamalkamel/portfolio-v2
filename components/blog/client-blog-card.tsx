import Link from "next/link";
import { Badge } from "../ui/badge";
import { ArrowUpRight, Heart } from "lucide-react";
import { Post } from "@/db/schema";
import { getPostLikesCount } from "@/server/likes-actions";

const colorMap = {
  React: "bg-cyan-900/20 text-cyan-300 border-cyan-700/40",
  Performance: "bg-purple-900/20 text-purple-300 border-purple-700/40",
  Web: "bg-emerald-900/20 text-emerald-300 border-emerald-700/40",
  Career: "bg-amber-900/20 text-amber-300 border-amber-700/40",
  Tools: "bg-rose-900/20 text-rose-300 border-rose-700/40",
  JavaScript: "bg-yellow-900/20 text-yellow-300 border-yellow-700/40",
};

export default async function ClientBlogCard({ post }: { post: Post }) {
  const postLikesCount = await getPostLikesCount(post.id);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="
        group border border-neutral-800/40 rounded-xl p-6 
        bg-neutral-900/20 hover:bg-neutral-900/40 
        transition-all duration-300 hover:border-neutral-700/60
        flex flex-col gap-4
      "
    >
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className={`
              border text-xs font-medium px-2 py-1 
              ${colorMap[post.category as keyof typeof colorMap]}
            `}
          >
            {post.category}
          </Badge>

          <span className="text-xs text-neutral-500">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        {/* Arrow stays inside borders now */}
        <ArrowUpRight
          className="
            w-5 h-5 text-neutral-600 
            group-hover:text-cyan-400 transition-colors 
            shrink-0
          "
        />
      </div>

      {/* Title */}
      <h2
        className="
          text-xl font-semibold leading-snug 
          group-hover:text-cyan-400 transition-colors
        "
      >
        {post.title}
      </h2>

      {/* Excerpt — truncated */}
      <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">
        {post.excerpt}
      </p>

      {/* Bottom section */}
      <div
        className="
          mt-2 pt-4 border-t border-neutral-800/40 
          flex items-center justify-between text-sm text-neutral-500
        "
      >
        <span>{post.readTime} min read</span>

        <div className="flex items-center gap-1">
          <Heart
            className="
              w-4 h-4 
              fill-current
              text-neutral-500  
              transition-colors
            "
          />
          <span>{postLikesCount || 0}</span>
        </div>
      </div>
    </Link>
  );
}
