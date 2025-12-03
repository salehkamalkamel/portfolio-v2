import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { getCommentsForPost } from "@/server/comments-actions";
// Import the new Client Component
import LiveCommentsSection from "./live-comments-section";

export async function CommentsWrapper({ postId }: { postId: string }) {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user || null;

  const comments = await getCommentsForPost(postId, user?.id);

  return (
    <section
      id="comments"
      className="max-w-4xl mx-auto px-6 py-16 border-t border-neutral-800/40"
    >
      <h2 className="text-3xl font-bold mb-8">Comments</h2>

      {/* Auth Prompt */}
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

      {/* Pass data to the Client Component */}
      <LiveCommentsSection
        initialComments={comments}
        postId={postId}
        currentUser={user}
      />
    </section>
  );
}
