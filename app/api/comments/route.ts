import { NextRequest, NextResponse } from "next/server";
import { getCommentsForPost } from "@/server/comments-actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const postId = searchParams.get("postId");

  if (!postId) return NextResponse.json({ error: "Required" }, { status: 400 });

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const comments = await getCommentsForPost(postId, session?.user?.id);

  // Simple ETag generation based on length + last comment ID
  const lastCommentId = comments.length > 0 ? comments[0].id : "empty";
  const etag = `"${comments.length}-${lastCommentId}"`;

  const ifNoneMatch = request.headers.get("if-none-match");

  if (ifNoneMatch === etag) {
    return new NextResponse(null, { status: 304 });
  }

  return NextResponse.json(comments, {
    headers: {
      ETag: etag,
      "Cache-Control": "no-cache",
    },
  });
}
