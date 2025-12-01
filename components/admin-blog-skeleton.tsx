export default function AdminBlogSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white animate-pulse">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-neutral-800/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-40 h-6 bg-neutral-800 rounded" />
          </div>
          <div className="w-28 h-10 bg-neutral-800 rounded" />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-6">
        {/* Section Title */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-52 h-6 bg-neutral-800 rounded" />
        </div>

        {/* Table Skeleton */}
        <div className="border border-neutral-800/40 rounded-xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 bg-neutral-900/50 border-b border-neutral-800/40 text-sm">
            <div className="w-full h-4 bg-neutral-800 rounded col-span-5" />
            <div className="w-full h-4 bg-neutral-800 rounded col-span-2" />
            <div className="w-full h-4 bg-neutral-800 rounded col-span-2" />
            <div className="w-full h-4 bg-neutral-800 rounded col-span-1" />
            <div className="w-full h-4 bg-neutral-800 rounded col-span-2" />
          </div>

          {/* Rows Skeleton */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-12 gap-4 p-4 border-b border-neutral-800/20 last:border-none"
            >
              <div className="col-span-5 h-5 bg-neutral-800 rounded" />
              <div className="col-span-2 h-5 bg-neutral-800 rounded" />
              <div className="col-span-2 h-5 bg-neutral-800 rounded" />
              <div className="col-span-1 h-5 bg-neutral-800 rounded" />
              <div className="col-span-2 flex justify-end">
                <div className="w-16 h-5 bg-neutral-800 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
