import { User, LogIn } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UserSignout } from "./user-signout";

export default async function BlogUserProfile({ postId }: { postId?: string }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <div className="border-b border-neutral-800/40 bg-neutral-900/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-800/50 border border-neutral-700/50 flex items-center justify-center">
                <User className="w-5 h-5 text-neutral-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-400">
                  Not signed in
                </p>
                <p className="text-xs text-neutral-600">
                  Sign in to like and comment
                </p>
              </div>
            </div>
            <Link href="/login">
              <Button
                size="sm"
                className="bg-cyan-600 cursor-pointer hover:bg-cyan-700 text-white gap-2"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="border-b border-neutral-800/40 bg-linear-to-r from-cyan-500/5 via-transparent to-emerald-500/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* User Avatar with gradient border */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-linear-to-r from-cyan-500 to-emerald-500 opacity-50 blur-sm"></div>
              <div className="relative w-10 h-10 rounded-full bg-linear-to-r from-cyan-600 to-emerald-600 flex items-center justify-center text-white font-bold border border-neutral-700/50">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* User Info */}
            <div>
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-neutral-500">{user.email}</p>
            </div>
          </div>

          {/* Logout Button */}
          <UserSignout postId={postId} />
        </div>
      </div>
    </div>
  );
}
