export default function ProjectsSectionSkeleton() {
  return (
    <section
      id="portfolio"
      className="border-b border-neutral-800/40 bg-neutral-900/30"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 animate-pulse">
        {/* Header Skeleton */}
        <div className="mb-12">
          <div className="h-6 w-24 bg-neutral-800 rounded mb-3"></div>
          <div className="h-8 w-64 bg-neutral-800 rounded mb-4"></div>
          <div className="h-5 w-full max-w-xl bg-neutral-800 rounded mb-2"></div>
          <div className="h-5 w-5/6 bg-neutral-800 rounded"></div>
        </div>

        {/* Project Cards Skeleton */}
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="border border-neutral-800/40 rounded-lg p-6 bg-neutral-800/20"
            >
              <div className="flex justify-between items-start mb-4">
                {/* Title + Desc */}
                <div className="flex-1">
                  <div className="h-6 w-48 bg-neutral-800 rounded mb-2"></div>
                  <div className="h-4 w-full bg-neutral-800 rounded mb-1"></div>
                  <div className="h-4 w-5/6 bg-neutral-800 rounded"></div>
                </div>

                {/* Icon placeholder */}
                <div className="w-5 h-5 bg-neutral-800 rounded ml-4 shrink-0"></div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <div className="h-5 w-16 bg-neutral-800 rounded"></div>
                <div className="h-5 w-14 bg-neutral-800 rounded"></div>
                <div className="h-5 w-20 bg-neutral-800 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
