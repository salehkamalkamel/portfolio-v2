export default function SkeletonBlogPostCard() {
  return (
    <div className="border border-neutral-800/40 rounded-lg p-6 bg-neutral-800/20 animate-pulse">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
        {/* Left */}
        <div className="flex-1">
          {/* Category + Date */}
          <div className="flex items-center gap-3 mb-3">
            <div className="h-5 w-20 bg-neutral-700/40 rounded-full" />
            <div className="h-3 w-16 bg-neutral-700/40 rounded-full" />
          </div>

          {/* Title */}
          <div className="h-7 w-3/4 bg-neutral-700/40 rounded mb-3" />

          {/* Excerpt */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-neutral-700/40 rounded" />
            <div className="h-4 w-5/6 bg-neutral-700/40 rounded" />
          </div>
        </div>

        {/* Arrow */}
        <div className="w-5 h-5 bg-neutral-700/40 rounded-full shrink-0 mt-2" />
      </div>

      {/* Footer stats */}
      <div className="flex flex-wrap items-center gap-6 text-sm pt-4 border-t border-neutral-700/30">
        <div className="h-4 w-16 bg-neutral-700/40 rounded" />

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-neutral-700/40 rounded" />
            <div className="h-4 w-6 bg-neutral-700/40 rounded" />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-neutral-700/40 rounded" />
            <div className="h-4 w-6 bg-neutral-700/40 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
