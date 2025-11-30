import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/server/projects-actions";
import ProjectRow from "@/components/projects/project-row";

export default async function AdminProjectsPage() {
  const projects = await getProjects();
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-neutral-800/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Projects</h1>
          </div>
          <Link href="/admin/projects/add">
            <Button className="bg-cyan-500 text-black hover:bg-cyan-400">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Projects List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-neutral-300">
              All Projects ({projects.length})
            </h2>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-neutral-800/60 rounded-xl">
              <p className="text-neutral-400 mb-4">
                No projects yet. Create one to get started.
              </p>
              <Link href="/admin/projects/add">
                <Button className="bg-cyan-500 text-black hover:bg-cyan-400">
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Project
                </Button>
              </Link>
            </div>
          ) : (
            <div className="border border-neutral-800/40 rounded-xl overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-4 bg-neutral-900/50 border-b border-neutral-800/40 text-sm font-medium text-neutral-400">
                <div className="col-span-4">Project</div>
                <div className="col-span-2">Stack</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1">Featured</div>
                <div className="col-span-3 text-right">Actions</div>
              </div>

              {/* Table Rows */}
              {projects.map((project, index) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  projectsLength={projects.length}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
