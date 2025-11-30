import Link from "next/link";
import { Badge } from "../ui/badge";
import { ArrowUpRight, Heart } from "lucide-react";
import { Post } from "@/db/schema";
import { getPostLikesCount } from "@/server/likes-actions";

const colorMap = {
  React: "bg-cyan-900/30 text-cyan-300 border-cyan-700/50",
  Performance: "bg-purple-900/30 text-purple-300 border-purple-700/50",
  Web: "bg-emerald-900/30 text-emerald-300 border-emerald-700/50",
  Career: "bg-amber-900/30 text-amber-300 border-amber-700/50",
  Tools: "bg-rose-900/30 text-rose-300 border-rose-700/50",
  JavaScript: "bg-yellow-900/30 text-yellow-300 border-yellow-700/50",
};

// pick the color based on category

export default async function ClientBlogCard({ post }: { post: Post }) {
  const postLikesCount = await getPostLikesCount(post.id);
  return (
    <Link
      key={post.id}
      href={`/blog/${post.slug}`}
      className="group border border-neutral-800/40 rounded-lg p-6 bg-neutral-800/20 hover:bg-neutral-800/40 transition-all hover:border-neutral-700/60"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <Badge
              variant="outline"
              className={`${
                colorMap[post?.category as keyof typeof colorMap]
              } border`}
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
          <h2 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
            {post.title}
          </h2>
          <p className="text-neutral-400 text-base leading-relaxed">
            {post.excerpt}
          </p>
        </div>
        <ArrowUpRight className="w-5 h-5 text-neutral-600 group-hover:text-cyan-400 transition-colors shrink-0 mt-2" />
      </div>

      <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500 pt-4 border-t border-neutral-700/30">
        <span>
          {post.readTime}
          min read
        </span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{postLikesCount || 0}</span>
          </div>
          {/* <div className="flex items-center gap-1">
            <span>💬</span>
            <span>{post.comments || 0}</span>
          </div> */}
        </div>
      </div>
    </Link>
  );
}
