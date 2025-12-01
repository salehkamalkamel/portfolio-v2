export default function EditAuthorSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white animate-pulse">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-neutral-800/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <div className="w-6 h-6 bg-neutral-800 rounded" />
          <div className="w-40 h-6 bg-neutral-800 rounded" />
        </div>
      </header>

      {/* Page Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="border border-neutral-800/40 rounded-xl p-8 bg-neutral-900/30 space-y-6">
          {/* Name input */}
          <div className="space-y-2">
            <div className="w-20 h-4 bg-neutral-800 rounded" />
            <div className="w-full h-10 bg-neutral-800 rounded" />
          </div>

          {/* Bio textarea */}
          <div className="space-y-2">
            <div className="w-16 h-4 bg-neutral-800 rounded" />
            <div className="w-full h-24 bg-neutral-800 rounded" />
          </div>

          {/* Image field */}
          <div className="space-y-2">
            <div className="w-24 h-4 bg-neutral-800 rounded" />
            <div className="w-full h-32 bg-neutral-800 rounded" />
          </div>

          {/* Submit button */}
          <div className="pt-4">
            <div className="w-28 h-10 bg-neutral-800 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
