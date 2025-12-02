import { NextRequest, NextResponse } from "next/server";
import { getCommentsForPost } from "@/server/comments-actions";
import { auth } from "@/lib/auth"; // Ensure this path is correct
import { headers } from "next/headers";

// export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const postId = searchParams.get("postId");

  if (!postId) {
    return NextResponse.json({ error: "Post ID required" }, { status: 400 });
  }

  // We need to fetch the user session here to correctly calculate "isLikedByUser"
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const comments = await getCommentsForPost(postId, session?.user?.id);

  return NextResponse.json(comments);
}
