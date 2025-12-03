import { NextRequest, NextResponse } from "next/server";
import { getCommentsForPost } from "@/server/comments-actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const postId = searchParams.get("postId");

  if (!postId) return NextResponse.json({ error: "Required" }, { status: 400 });

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const comments = await getCommentsForPost(postId, session?.user?.id);

  return NextResponse.json(comments);
}
