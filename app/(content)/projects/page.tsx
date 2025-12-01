import ClientProjectsGrid from "@/components/projects/client-projects-grid";
import ClientProjectCardSkeleton from "@/components/skeleton/projects/client-project-card-skeleton";
import { Suspense } from "react";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="border-b border-neutral-800/40 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32">
        <div className="mb-8">
          <p className="text-xs text-neutral-500 uppercase tracking-widest mb-4">
            Portfolio
          </p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
            Selected Works & Projects
          </h1>
          <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">
            A collection of projects that demonstrate my expertise in frontend
            development, performance optimization, and building scalable web
            applications. Each project shows the impact of thoughtful
            engineering and optimization strategies.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <Suspense
        fallback={
          <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <div className="grid gap-8">
              {Array.from({ length: 3 }).map((_, idx) => (
                <ClientProjectCardSkeleton key={idx} />
              ))}
            </div>
          </section>
        }
      >
        <ClientProjectsGrid />
      </Suspense>
    </div>
  );
}
