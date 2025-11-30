"use client";

import { Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ShareButton({ title }: { title: string }) {
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    try {
      setLoading(true);

      // 1️⃣ Native Web Share API
      if (navigator.share) {
        await navigator.share({
          title,
          text: title,
          url,
        });
        return;
      }

      // 2️⃣ Fallback: copy to clipboard
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to share the post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={loading}
      className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border bg-neutral-800/20 border-neutral-800/40 text-neutral-400 hover:bg-neutral-800/40 transition-all disabled:opacity-50"
    >
      <Share2 className="w-4 h-4" />
      <span>{loading ? "Sharing..." : "Share"}</span>
    </button>
  );
}
