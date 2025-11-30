import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { getFeaturedProjects } from "@/server/projects-actions";

export default async function ProjectsSection() {
  const projects = await getFeaturedProjects();
  return (
    <section
      id="portfolio"
      className="border-b border-neutral-800/40 bg-neutral-900/30"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="mb-12">
          <Badge className="bg-purple-900/30 text-purple-300 border-purple-700/50 border mb-3">
            Portfolio
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Featured Projects
          </h2>
          <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">
            I have worked on multiple projects ranging from e-commerce platforms
            to SaaS applications. Each project demonstrates my commitment to
            performance excellence, clean code, and user-centric design.
          </p>
        </div>

        <div className="grid gap-6">
          {projects.map((project, idx) => (
            <Link
              key={idx}
              href={`/projects/${project.id}`}
              className="group border border-neutral-800/40 rounded-lg p-6 bg-neutral-800/20 hover:bg-neutral-800/40 transition-all hover:border-neutral-700/60"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400 text-sm">
                    {project.description}
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-neutral-600 group-hover:text-cyan-400 transition-colors shrink-0 mt-1" />
              </div>
              <div className="flex flex-wrap gap-2">
                {project?.technologies?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-neutral-700/50 text-neutral-300 rounded border border-neutral-700/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
