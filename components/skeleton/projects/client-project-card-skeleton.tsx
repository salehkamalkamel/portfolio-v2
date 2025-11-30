export default function ClientProjectCardSkeleton() {
  return (
    <div className="border border-neutral-800/40 rounded-xl overflow-hidden animate-pulse">
      <div className="grid md:grid-cols-2 gap-6 bg-neutral-900/30 p-6 md:p-8">
        {/* Content Side */}
        <div className="flex flex-col justify-between w-full">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-3 w-20 bg-neutral-700/40 rounded"></div>
              <div className="w-1 h-1 bg-neutral-700 rounded-full"></div>
              <div className="h-3 w-14 bg-neutral-700/40 rounded"></div>
            </div>

            <div className="h-7 w-3/4 bg-neutral-700/40 rounded mb-4"></div>

            <div className="space-y-2 mb-6">
              <div className="h-4 w-full bg-neutral-700/40 rounded"></div>
              <div className="h-4 w-5/6 bg-neutral-700/40 rounded"></div>
              <div className="h-4 w-2/3 bg-neutral-700/40 rounded"></div>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-6 w-16 bg-neutral-700/40 rounded"
                ></div>
              ))}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-800/40">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <div className="h-7 w-10 bg-neutral-700/40 rounded mb-2"></div>
                  <div className="h-3 w-16 bg-neutral-700/40 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Image Side Placeholder */}
        <div className="hidden md:flex items-center justify-center bg-linear-to-br from-neutral-800/30 to-neutral-900/30 rounded-lg border border-neutral-800/40 min-h-72">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-neutral-700/30 mb-4"></div>
            <div className="h-3 w-20 bg-neutral-700/40 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
