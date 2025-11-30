"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { Author } from "@/db/schema";
import { deleteAuthor } from "@/server/authors-actions";
import { useTransition } from "react";
import { toast } from "sonner";

export default function AuthorCtrl({ author }: { author: Author }) {
  const [isPending, startTransition] = useTransition();
  return (
    <div className="flex gap-2">
      <Link href={`/admin/authors/edit/${author.id}`}>
        <Button
          disabled={isPending}
          variant="outline"
          size="sm"
          className="border-neutral-700/50 cursor-pointer text-neutral-400 hover:text-purple-400 bg-transparent"
        >
          <Edit2 className="w-4 h-4" />
        </Button>
      </Link>
      <Button
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const result = await deleteAuthor(author.id);
            if (!result.success) {
              toast.error(`Error deleting author: ${result.message}`);
              return;
            }
            toast.success("Author deleted successfully");
          });
        }}
        variant="outline"
        size="sm"
        className="cursor-pointer border-neutral-700/50 text-neutral-400 hover:text-red-400"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
