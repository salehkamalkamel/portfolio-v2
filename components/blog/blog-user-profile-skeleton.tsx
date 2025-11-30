export default function BlogUserProfileSkeleton() {
  return (
    <div className="border-b border-neutral-800/40 bg-neutral-900/20 animate-pulse">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex items-center gap-3">
            {/* Skeleton Avatar */}
            <div className="w-10 h-10 rounded-full bg-neutral-800/50 border border-neutral-700/50" />

            {/* Skeleton User Info */}
            <div className="space-y-1">
              <div className="h-3 w-24 bg-neutral-800/40 rounded" />
              <div className="h-2 w-40 bg-neutral-800/30 rounded" />
            </div>
          </div>

          {/* Right-side Button Skeleton */}
          <div className="h-8 w-20 bg-neutral-800/40 rounded-md" />
        </div>
      </div>
    </div>
  );
}
