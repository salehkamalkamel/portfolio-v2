import CommentItemSkeleton from "./comment-item-skeleton";

export default function CommentsSkeleton() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16 border-t border-neutral-800/40 animate-pulse">
      {/* Header Placeholder */}
      <div className="h-8 w-48 bg-neutral-800/80 rounded mb-8" />

      {/* Comment Form Placeholder (Assuming the form is only shown if logged in) */}
      <div className="mb-8 space-y-4">
        <div className="h-10 w-full bg-neutral-800/80 rounded-lg" />
        <div className="h-10 w-24 ml-auto bg-cyan-700/50 rounded-lg" />
      </div>

      {/* List of Comment Skeletons (Mimic 3 comments) */}
      <div className="space-y-6">
        <CommentItemSkeleton />
        <CommentItemSkeleton />
        <CommentItemSkeleton />
      </div>
    </section>
  );
}
