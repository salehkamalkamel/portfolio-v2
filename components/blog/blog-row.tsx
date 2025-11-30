"use client";

import { Post } from "@/db/schema";
import Link from "next/link";
import { Button } from "../ui/button";
import { Edit2, Eye, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { deletePost } from "@/server/blog-actions";
import { toast } from "sonner";

export default function BlogRow({
  post,
  index,
  postsLength,
}: {
  post: Post;
  index: number;
  postsLength: number;
}) {
  const [isPending, startTransition] = useTransition();
  function handleDelete(postId: string) {
    startTransition(async () => {
      const response = await deletePost(postId);
      if (!response.success) {
        toast.error(response.message || "Failed to delete post.");
      } else {
        toast.success("Post deleted successfully.");
      }
    });
  }
  return (
    <div
      key={post.id}
      className={`grid grid-cols-12 gap-4 p-4 items-center hover:bg-neutral-900/30 transition-colors ${
        index !== postsLength - 1 ? "border-b border-neutral-800/40" : ""
      }`}
    >
      <div className="col-span-5">
        <h3 className="font-semibold text-white mb-1 line-clamp-1">
          {post.title}
        </h3>
        <p className="text-sm text-neutral-500 line-clamp-1">{post.excerpt}</p>
        <p className="text-xs text-neutral-600 mt-1">
          {new Date(post.createdAt).toLocaleDateString()} · {post.readTime} min
          read
        </p>
      </div>
      <div className="col-span-2">
        <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded">
          {post.category}
        </span>
      </div>
      <div className="col-span-2">
        {/* <span className="text-sm text-purple-400">{post?.authorName}</span> */}
      </div>
      <div className="col-span-1">
        <div className="flex items-center gap-3 text-xs text-neutral-500">
          {/* <span>❤️ {post?.likeCount}</span>
          <span>💬 {post?.commentCount}</span> */}
        </div>
      </div>
      <div className="col-span-2 flex justify-end gap-2">
        <Link href={`/blog/${post.id}`}>
          <Button
            disabled={isPending}
            variant="outline"
            size="sm"
            className="border-neutral-700/50 text-neutral-400 hover:text-white bg-transparent"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </Link>
        <Link href={`/admin/blog/edit/${post.id}`}>
          <Button
            disabled={isPending}
            variant="outline"
            size="sm"
            className="border-neutral-700/50 text-neutral-400 hover:text-emerald-400 bg-transparent"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
        </Link>
        <Button
          disabled={isPending}
          onClick={() => handleDelete(post.id)}
          variant="outline"
          size="sm"
          className="border-neutral-700/50 text-neutral-400 hover:text-red-400"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
