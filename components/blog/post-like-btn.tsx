"use client";

import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { togglePostLike } from "@/server/likes-actions";

interface PostLikeButtonProps {
  postId: string;
  initialLikesCount: number;
  initialIsLiked: boolean;
  isAuthenticated: boolean;
}

export default function PostLikeButton({
  postId,
  initialLikesCount,
  initialIsLiked,
  isAuthenticated,
}: PostLikeButtonProps) {
  // const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to like posts");
      redirect("/login");
    }

    startTransition(async () => {
      const result = await togglePostLike(postId);
      if (!result.success) {
        toast.error(result.error || "Failed to like post");
      }
    });
  };

  return (
    <button
      onClick={handleLike}
      disabled={isPending}
      className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
        initialIsLiked
          ? "bg-red-900/30 border-red-700/50 text-red-300"
          : "bg-neutral-800/20 border-neutral-800/40 text-neutral-400 hover:bg-neutral-800/40"
      } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <Heart className={`w-4 h-4 ${initialIsLiked ? "fill-current" : ""}`} />
      <span>{initialLikesCount > 0 ? initialLikesCount : "Like"}</span>
    </button>
  );
}
