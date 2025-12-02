"use client";

import useSWR from "swr";
import { CommentWithAuthor } from "@/server/comments-actions";
import CommentList from "./comment-list";
import CommentForm from "./comment-form";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const CommentsContext = createContext<{
  mutateComments: () => Promise<any>;
} | null>(null);

export const useComments = () => {
  const context = useContext(CommentsContext);
  if (!context)
    throw new Error("useComments must be used within LiveCommentsSection");
  return context;
};

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
  // 1. Setup Intersection Observer state
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const refreshInterval = isVisible ? 10000 : 0;

  const { data: comments, mutate } = useSWR<CommentWithAuthor[]>(
    `/api/comments?postId=${postId}`,
    fetcher,
    {
      fallbackData: initialComments,
      refreshInterval: refreshInterval,
      revalidateOnFocus: false, // Optional: Disable tab-switch revalidation to save costs
    }
  );

  return (
    <CommentsContext.Provider value={{ mutateComments: mutate }}>
      <div ref={containerRef}>
        {currentUser && (
          <div className="mb-10">
            <CommentForm
              postId={postId}
              userId={currentUser.id}
              userName={currentUser.name}
            />
          </div>
        )}

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
      </div>
    </CommentsContext.Provider>
  );
}
