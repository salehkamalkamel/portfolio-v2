"use client";

import useSWR from "swr";
import { CommentWithAuthor } from "@/server/comments-actions";
import CommentList from "./comment-list";
import CommentForm from "./comment-form";
import { createContext, useContext } from "react";

const CommentsContext = createContext<{
  mutateComments: () => Promise<any>;
} | null>(null);

export const useComments = () => {
  const context = useContext(CommentsContext);
  if (!context)
    throw new Error("useComments must be used within LiveCommentsSection");
  return context;
};

// 2. The Fetcher Function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface LiveCommentsProps {
  initialComments: CommentWithAuthor[];
  postId: string;
  currentUser: { id: string; name: string; image?: string | null } | null;
}

export default function LiveCommentsSection({
  initialComments,
  postId,
  currentUser,
}: LiveCommentsProps) {
  // 3. SWR Hook
  const { data: comments, mutate } = useSWR<CommentWithAuthor[]>(
    `/api/comments?postId=${postId}`,
    fetcher,
    {
      fallbackData: initialComments, // Uses Server Data immediately (No Loading spinner)
      refreshInterval: 5000, // Polls every 5 seconds for new replies
      revalidateOnFocus: true, // Updates when user switches tabs back to this window
    }
  );

  return (
    <CommentsContext.Provider value={{ mutateComments: mutate }}>
      {/* Root Comment Form */}
      {currentUser && (
        <div className="mb-10">
          <CommentForm
            postId={postId}
            userId={currentUser.id}
            userName={currentUser.name}
          />
        </div>
      )}

      {/* The List */}
      <div className="space-y-8">
        {comments && comments.length > 0 ? (
          <CommentList
            comments={comments}
            postId={postId}
            currentUser={currentUser}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-500">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>
    </CommentsContext.Provider>
  );
}
