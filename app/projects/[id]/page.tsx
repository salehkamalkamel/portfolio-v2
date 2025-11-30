import Link from "next/link";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProjectById, getProjects } from "@/server/projects-actions";
import Image from "next/image";
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => {
    return {
      id: project.slug,
    };
  });
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const slug = (await params).id;
  const projectId = slug.split("__")[1];
  const project = await getProjectById(projectId);
  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-neutral-400 mb-8">
            Sorry, we couldn't find the project you're looking for.
          </p>
          <Link
            href="/"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="border-b border-neutral-800/40 bg-neutral-900/30">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="mb-8">
            <p className="text-xs text-neutral-500 uppercase tracking-widest mb-3">
              Project Case Study
            </p>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
              {project.title}
            </h1>
          </div>
          <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </div>
      </section>

      {/* Main Project Image */}
      <section className="border-b border-neutral-800/40">
        <div className="max-w-6xl mx-auto px-6 py-24 relative rounded-lg overflow-hidden group transition-all">
          {/* Image */}
          <Image
            src={project.thumbnailUrl || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover w-full h-96 rounded-lg transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity opacity-0 group-hover:opacity-100"></div>

          {/* Optional Visit Button on Top */}
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              // onClick={(e) => e.stopPropagation()}
              className="absolute bottom-6 right-6 flex items-center gap-2 bg-neutral-900/70 px-5 py-3 rounded-full text-white hover:bg-neutral-900/90 transition-colors backdrop-blur-md"
            >
              Visit Project <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          {/* Optional Caption / Title overlay */}
          <div className="absolute bottom-6 left-6 text-white">
            <p className="text-sm text-neutral-300 mb-1 uppercase">
              {project.stack}
            </p>
            <h2 className="text-3xl font-bold">{project.title}</h2>
          </div>
        </div>
      </section>

      {/* Project Story */}
      <section className="border-b border-neutral-800/40 bg-neutral-900/30">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
                The Story
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-6">
                {project.description}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight mb-6">
                The Challenge
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                {project.problem}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="border-b border-neutral-800/40">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
            The Solution
          </h2>
          <p className="text-neutral-400 leading-relaxed max-w-3xl mb-12">
            {project.solution}
          </p>

          <div className="border-t border-neutral-800/40 pt-12">
            <h3 className="text-lg font-bold tracking-tight mb-6">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies?.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-neutral-800/30 text-neutral-300 rounded-full text-sm border border-neutral-800/40"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Links Section */}
      <section className="border-b border-neutral-800/40 bg-neutral-900/30">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
            View Project
          </h2>
          <div className="flex flex-col md:flex-row gap-6">
            <a
              href={project.repoUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-neutral-800/40 rounded-lg p-6 bg-neutral-800/20 hover:bg-neutral-800/40 transition-all hover:border-neutral-700/60 group"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold group-hover:text-cyan-400 transition-colors">
                  View on GitHub
                </h3>
                <Github className="w-5 h-5 text-neutral-600 group-hover:text-cyan-400 transition-colors" />
              </div>
              <p className="text-neutral-400 text-sm">
                Check out the source code and implementation details
              </p>
            </a>
            <a
              href={project.liveUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-neutral-800/40 rounded-lg p-6 bg-neutral-800/20 hover:bg-neutral-800/40 transition-all hover:border-neutral-700/60 group"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold group-hover:text-cyan-400 transition-colors">
                  Visit Live Site
                </h3>
                <ExternalLink className="w-5 h-5 text-neutral-600 group-hover:text-cyan-400 transition-colors" />
              </div>
              <p className="text-neutral-400 text-sm">
                Experience the project in production
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section>
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="border border-neutral-800/40 rounded-lg p-12 bg-neutral-800/20 text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Let's work together
            </h2>
            <p className="text-neutral-400 mb-8 max-w-2xl mx-auto">
              Interested in discussing how I can help optimize your project?
              Let's connect and explore the possibilities.
            </p>
            <Link href="/contact">
              <Button className="bg-white text-black hover:bg-neutral-200 cursor-pointer">
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800/40 bg-neutral-900/30">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center text-neutral-500 text-sm">
          <p>
            © 2025 Saleh Kamal. Built with Next.js and optimized for
            performance.
          </p>
        </div>
      </footer>
    </div>
  );
}
