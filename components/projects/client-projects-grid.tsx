import Link from "next/link";
import ClientProjectCard from "./client-project-card";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";
import { getProjects } from "@/server/projects-actions";

export default async function ClientProjectsGrid() {
  const projects = await getProjects();

  if (projects.length === 0) {
    return null;
  }
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="grid gap-8">
        {projects.map((project, idx) => (
          <ClientProjectCard key={project.id} project={project} idx={idx} />
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-24 border-t border-neutral-800/40 pt-16">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Interested in working together?
          </h2>
          <p className="text-neutral-400 mb-8 max-w-md mx-auto">
            Let's discuss how I can help optimize your web application and
            improve user experience.
          </p>
          <Link href="/contact">
            <Button className="bg-white text-black hover:bg-neutral-200 cursor-pointer">
              Get In Touch <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
