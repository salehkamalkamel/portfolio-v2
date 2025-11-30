export default function CommentItemSkeleton() {
  return (
    <div
      className={`border border-neutral-800/40 rounded-lg p-6 bg-neutral-800/20`}
    >
      <div className="flex items-start gap-4 animate-pulse">
        {/* Avatar Placeholder (w-10 h-10 circle) */}
        <div className="w-10 h-10 bg-neutral-700/50 rounded-full shrink-0" />

        <div className="flex-1 min-w-0">
          {/* Header (Author Name and Date) */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Name */}
              <div className="h-4 w-28 bg-neutral-700/50 rounded" />
              {/* Date */}
              <div className="h-3 w-16 bg-neutral-700/30 rounded" />
            </div>
          </div>

          {/* Content (3 lines of text) */}
          <div className="space-y-2">
            <div className="h-4 bg-neutral-700/50 rounded w-full" />
            <div className="h-4 bg-neutral-700/50 rounded w-11/12" />
            <div className="h-4 bg-neutral-700/50 rounded w-5/6" />
          </div>

          {/* Actions (Like and Reply Buttons) */}
          <div className="mt-4 flex items-center gap-6">
            {/* Like Button */}
            <div className="h-4 w-16 bg-neutral-700/50 rounded" />
            {/* Reply Button */}
            <div className="h-4 w-16 bg-neutral-700/50 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
