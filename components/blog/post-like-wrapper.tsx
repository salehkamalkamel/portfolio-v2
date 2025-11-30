import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import PostLikeButton from "./post-like-btn";
import { getPostLikeInfo } from "@/server/likes-actions";

export async function PostLikeWrapper({ postId }: { postId: string }) {
  const session = await auth.api.getSession({ headers: await headers() });
  // Parallel fetch: Cached Count + Dynamic User Status
  const postLikeInfo = await getPostLikeInfo(postId, session?.user?.id);

  return (
    <PostLikeButton
      postId={postId}
      initialLikesCount={postLikeInfo.totalLikes}
      initialIsLiked={postLikeInfo.isLikedByUser}
      isAuthenticated={!!session?.user}
    />
  );
}
