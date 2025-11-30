"use client";

import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { signOut } from "@/server/users";

export function UserSignout({ postId }: { postId?: string }) {
  const [isPending, startTranstion] = useTransition();

  function handleLogout() {
    startTranstion(async () => {
      const response = await signOut(postId);
      if (response.success) {
        toast.success("Signed out successfully");
      } else {
        toast.error("Error signing out. Please try again.");
      }
    });
  }

  return (
    <Button
      size="sm"
      disabled={isPending}
      onClick={handleLogout}
      variant="outline"
      className="border-neutral-700 cursor-pointer hover:bg-neutral-900 text-neutral-400 hover:text-white gap-2 bg-transparent"
    >
      <LogOut className="w-4 h-4" />
      <span className="hidden sm:inline">Logout</span>
    </Button>
  );
}
