import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import CommentForm from "./comment-form";
import { getCommentsForPost } from "@/server/comments-actions";
import CommentList from "./comment-list";

export async function CommentsWrapper({ postId }: { postId: string }) {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user || null;

  // This is efficient now: 1 query for comments + 1 query for user likes
  const comments = await getCommentsForPost(postId, user?.id);

  return (
    <section className="max-w-4xl mx-auto px-6 py-16 border-t border-neutral-800/40">
      <h2 className="text-3xl font-bold mb-8">Comments ({comments.length})</h2>

      {/* Authentication Prompt */}
      {!user && (
        <div className="mb-8 p-6 bg-cyan-900/20 border border-cyan-700/50 rounded-lg">
          <p className="text-cyan-300 text-center">
            Please{" "}
            <Link
              href="/login"
              className="underline font-medium hover:text-cyan-200"
            >
              sign in
            </Link>{" "}
            or{" "}
            <Link
              href="/signup"
              className="underline font-medium hover:text-cyan-200"
            >
              create an account
            </Link>{" "}
            to comment.
          </p>
        </div>
      )}

      {/* Root Comment Form */}
      {user && (
        <div className="mb-10">
          <CommentForm postId={postId} userId={user.id} userName={user.name} />
        </div>
      )}

      {/* Comments List Recursive Entry */}
      <div className="space-y-8">
        {comments.length > 0 ? (
          <CommentList comments={comments} postId={postId} currentUser={user} />
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-500">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
