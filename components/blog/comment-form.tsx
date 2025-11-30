"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // or your toast library
import { addComment } from "@/server/comments-actions";

interface CommentFormProps {
  postId: string;
  userId: string;
  userName: string;
  parentId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  autoFocus?: boolean;
  placeholder?: string;
}

export default function CommentForm({
  postId,
  userId,
  userName,
  parentId,
  onSuccess,
  onCancel,
  autoFocus = false,
  placeholder = "Share your thoughts on this article...",
}: CommentFormProps) {
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) return;

    startTransition(async () => {
      const result = await addComment({
        postId,
        content: content.trim(),
        parentId,
      });

      if (result.success) {
        setContent("");
        toast.success(parentId ? "Reply posted!" : "Comment posted!");
        onSuccess?.();
        // Refresh server components to show new comment
        router.refresh();
      } else {
        toast.error(result.error || "Failed to post comment");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 p-6 bg-neutral-900/50 border border-neutral-800/40 rounded-lg"
    >
      <label htmlFor="comment-input" className="block text-sm font-medium mb-3">
        {parentId ? `Reply as ${userName}` : "Add your comment"}
      </label>
      <textarea
        id="comment-input"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-white placeholder:text-neutral-500 focus:border-neutral-600 focus:ring-0 resize-none"
        rows={parentId ? 3 : 4}
        disabled={isPending}
        maxLength={5000}
      />

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-neutral-500">
          {content.length}/5000 characters
        </span>

        <div className="flex gap-2">
          {onCancel && (
            <Button
              type="button"
              onClick={onCancel}
              variant="ghost"
              className="text-neutral-400 hover:text-white"
              disabled={isPending}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-700 text-white"
            disabled={!content.trim() || isPending}
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Posting...
              </span>
            ) : parentId ? (
              "Post Reply"
            ) : (
              "Post Comment"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
