"use client";

import Link from "next/link";
import { ShieldAlert, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ForbiddenPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center animate-pulse">
            <ShieldAlert className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-6xl sm:text-7xl font-bold tracking-tighter mb-4 text-neutral-800 select-none">
          403
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
          Nice try, hacker.
        </h2>

        {/* HUMOR ADDED HERE */}
        <div className="space-y-4 max-w-lg mx-auto mb-8 text-neutral-400 text-lg">
          <p>I caught you, bro.</p>
          <p>
            I appreciate the ambition, but you can't just take charge of my
            website like that. This area is for the admin (me) to break things
            in peace.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button className="bg-white text-black hover:bg-neutral-200 gap-2 min-w-40 cursor-pointer">
              <Home className="w-4 h-4" />
              Retreat to safety
            </Button>
          </Link>
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="border-neutral-700 hover:bg-neutral-900 gap-2 min-w-40 cursor-pointer "
          >
            <ArrowLeft className="w-4 h-4" />
            Pretend this didn't happen
          </Button>
        </div>

        {/* Additional Info - Self Deprecating Humor */}
        <div className="mt-12 pt-8 border-t border-neutral-800/40">
          <p className="text-neutral-500 text-sm">
            (If you actually <strong>are</strong> me and you locked yourself
            out... well, this is awkward. Check the console.)
          </p>
        </div>
      </div>
    </div>
  );
}
