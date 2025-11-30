import { CommentWithAuthor } from "@/server/comments-actions";
import CommentItem from "./comment-item";

interface CommentListProps {
  comments: CommentWithAuthor[];
  postId: string;
  currentUser: { id: string; name: string; image?: string | null } | null;
  depth?: number;
}

export default function CommentList({
  comments,
  postId,
  currentUser,
  depth = 0,
}: CommentListProps) {
  // Sort by created date locally if needed, though server usually handles this
  return (
    <div
      className={
        depth > 0
          ? "space-y-4 mt-4 ml-2 pl-4 border-l-2 border-neutral-800"
          : "space-y-6"
      }
    >
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          postId={postId}
          currentUser={currentUser}
          depth={depth}
        />
      ))}
    </div>
  );
}
