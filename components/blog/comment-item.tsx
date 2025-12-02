"use client";

import { useState, useTransition } from "react";
import {
  Heart,
  MessageCircle,
  MoreVertical,
  Trash2,
  Edit2,
  CornerDownRight,
} from "lucide-react";
import {
  CommentWithAuthor,
  toggleCommentLike,
  deleteComment,
  updateComment,
} from "@/server/comments-actions";
import { formatDistanceToNow } from "date-fns";
import CommentForm from "./comment-form";
import CommentList from "./comment-list";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useComments } from "./live-comments-section";

interface CommentItemProps {
  comment: CommentWithAuthor;
  postId: string;
  currentUser: { id: string; name: string; image?: string | null } | null;
  depth: number;
}

export default function CommentItem({
  comment,
  postId,
  currentUser,
  depth,
}: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { mutateComments } = useComments();

  // Optimistic State
  const [isLiked, setIsLiked] = useState(comment.isLikedByUser);
  const [likesCount, setLikesCount] = useState(comment.likesCount || 0);
  const [editedContent, setEditedContent] = useState(comment.content);

  const isOwner = currentUser?.id === comment.userId;
  const hasReplies = (comment.replies?.length ?? 0) > 0;
  const MAX_DEPTH = 3;

  const handleLike = () => {
    if (!currentUser) {
      toast.error("Please sign in to like comments");
      return;
    }

    const previousLiked = isLiked;
    const previousCount = likesCount;

    // Optimistic Update
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));

    startTransition(async () => {
      const result = await toggleCommentLike(comment.id, postId);
      console.log(result);
      if (!result.success) {
        // Revert on failure
        setIsLiked(previousLiked);
        setLikesCount(previousCount);
        toast.error(result.error || "Failed to like comment");
      } else {
        mutateComments();
      }
    });
  };

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    startTransition(async () => {
      const result = await deleteComment(comment.id, postId);
      if (result.success) {
        mutateComments();
        toast.success("Comment deleted");
      } else {
        toast.error(result.error || "Failed to delete comment");
      }
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedContent.trim()) return;

    startTransition(async () => {
      const result = await updateComment(
        comment.id,
        editedContent.trim(),
        postId
      );
      if (result.success) {
        mutateComments();
        toast.success("Comment updated!");
        setIsEditing(false);
      } else {
        toast.error(result.error || "Failed to update comment");
      }
    });
  };

  const getInitials = (name: string) => name.substring(0, 2).toUpperCase();

  return (
    <div
      className={`group  ${isPending ? "opacity-60 pointer-events-none" : ""}`}
    >
      <div className="flex gap-4 items-start max-sm:flex-col ">
        {/* Avatar Section */}
        <div className="shrink-0">
          <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center overflow-hidden">
            {comment.author.image ? (
              <img
                src={comment.author.image}
                alt={comment.author.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-sm font-semibold text-neutral-300">
                {getInitials(comment.author.name)}
              </span>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0 w-full">
          <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-lg p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-neutral-200">
                  {comment.author.name}
                </span>
                <span className="text-xs text-neutral-500">
                  {comment.createdAt &&
                    formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                </span>
                {comment.createdAt !== comment.createdAt && !isEditing && (
                  <span className="text-xs text-neutral-600">(edited)</span>
                )}
              </div>

              {isOwner && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="opacity-80 group-hover:opacity-100 transition-opacity text-neutral-500 hover:text-white cursor-pointer">
                    <MoreVertical className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-neutral-900 border-neutral-800"
                  >
                    <DropdownMenuItem
                      onClick={() => setIsEditing(true)}
                      className="cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4 mr-2" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleDelete}
                      className="text-red-400 cursor-pointer focus:text-red-300"
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Content / Edit Mode */}
            {isEditing ? (
              <form onSubmit={handleEditSubmit} className="mt-2">
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded p-3 text-neutral-200 focus:outline-none focus:border-cyan-800 transition-colors resize-none"
                  rows={3}
                  autoFocus
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditedContent(comment.content);
                    }}
                    className="px-3 py-1 text-xs text-neutral-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="px-3 py-1 text-xs bg-cyan-900 text-cyan-100 rounded hover:bg-cyan-800 cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-neutral-300 whitespace-pre-wrap wrap-break-word max-w-full text-sm leading-relaxed">
                {comment.content}
              </p>
            )}
          </div>

          {/* Action Bar */}
          {!isEditing && (
            <div className="flex flex-wrap items-center gap-4 mt-2 pl-1">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  isLiked
                    ? "text-red-400"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                <Heart
                  className={`w-3.5 h-3.5 ${isLiked ? "fill-current" : ""}`}
                />
                {likesCount > 0 && <span>{likesCount}</span>}
              </button>

              {currentUser && depth < MAX_DEPTH && (
                <button
                  onClick={() => setIsReplying(!isReplying)}
                  className="cursor-pointer flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-300 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Reply
                </button>
              )}
            </div>
          )}

          {/* Reply Form */}
          {isReplying && currentUser && (
            <div className="mt-4 pl-3 sm:pl-4 border-l border-neutral-800">
              <CommentForm
                postId={postId}
                userId={currentUser.id}
                userName={currentUser.name}
                parentId={comment.id}
                onSuccess={() => {
                  setIsReplying(false);
                  if (!showReplies) setShowReplies(true);
                }}
                onCancel={() => setIsReplying(false)}
                autoFocus
                placeholder={`Reply to ${comment.author.name}...`}
              />
            </div>
          )}

          {hasReplies ? (
            <div>
              <button
                onClick={() => {
                  setShowReplies((prev) => !prev);
                }}
                className="flex items-center gap-2 text-xs text-cyan-500 hover:text-cyan-400 mt-2 px-2 cursor-pointer"
              >
                <CornerDownRight className="w-3 h-3" />
                {showReplies
                  ? `Hide ${comment.replies!.length} replies`
                  : `Show ${comment.replies!.length} replies`}
              </button>
              {showReplies && (
                <CommentList
                  comments={comment.replies!}
                  postId={postId}
                  currentUser={currentUser}
                  depth={depth + 1}
                />
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
