import { Skeleton } from "@/components/ui/skeleton";

export default function BreadcrumbSkeleton() {
  return (
    <nav
      aria-label="Breadcrumb Loading"
      className="bg-black/50 border-b border-neutral-800/40 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        <ol className="flex items-center gap-2 text-sm flex-wrap">
          {/* Home Icon + Label */}
          <li className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded-md bg-neutral-700/60" />
            <Skeleton className="hidden sm:block w-20 h-4 rounded bg-neutral-700/60" />
          </li>

          {/* Chevron + middle crumb */}
          <li className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded bg-neutral-700/40" />
            <Skeleton className="w-24 h-4 rounded bg-neutral-700/60" />
          </li>

          {/* Chevron + last crumb */}
          <li className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded bg-neutral-700/40" />
            <Skeleton className="w-32 h-4 rounded bg-neutral-700/60" />
          </li>
        </ol>
      </div>
    </nav>
  );
}
