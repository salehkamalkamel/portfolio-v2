"use client";
import { Project } from "@/db/schema";
import { Edit2, Eye, Star, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { deleteProject } from "@/server/projects-actions";
import { toast } from "sonner";

export default function ProjectRow({
  project,
  projectsLength,
  index,
}: {
  project: Project;
  projectsLength: number;
  index: number;
}) {
  const [isPending, startTransition] = useTransition();
  function handleDelete(projectId: string) {
    startTransition(async () => {
      const response = await deleteProject(projectId);
      if (!response?.success) {
        toast.error("Failed to delete project.");
        throw new Error("Failed to delete project.");
      } else {
        toast.success("Project deleted successfully.");
      }
    });
  }
  return (
    <div
      key={project.id}
      className={`grid grid-cols-12 gap-4 p-4 items-center hover:bg-neutral-900/30 transition-colors ${
        index !== projectsLength - 1 ? "border-b border-neutral-800/40" : ""
      }`}
    >
      <div className="col-span-4">
        <h3 className="font-semibold text-white mb-1">{project.title}</h3>
        <p className="text-sm text-neutral-500 line-clamp-1">{project.brief}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {project.technologies?.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs bg-neutral-800/50 text-neutral-400 px-2 py-0.5 rounded"
            >
              {tech}
            </span>
          ))}
          {(project.technologies?.length ?? 0) > 3 && (
            <span className="text-xs text-neutral-500">
              +{(project.technologies?.length ?? 0) - 3}
            </span>
          )}
        </div>
      </div>
      <div className="col-span-2">
        <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">
          {project.stack}
        </span>
      </div>
      <div className="col-span-2">
        {project.published ? (
          <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded">
            Published
          </span>
        ) : (
          <span className="text-xs bg-neutral-500/20 text-neutral-400 px-2 py-1 rounded">
            Draft
          </span>
        )}
      </div>
      <div className="col-span-1">
        {project.featured && (
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
        )}
      </div>
      <div className="col-span-3 flex justify-end gap-2">
        <Link href={`/projects/${project.slug}`}>
          <Button
            variant="outline"
            size="sm"
            className="border-neutral-700/50 text-neutral-400 hover:text-white bg-transparent"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </Link>
        <Link href={`/admin/projects/edit/${project.id}`}>
          <Button
            variant="outline"
            size="sm"
            className="border-neutral-700/50 text-neutral-400 hover:text-cyan-400 bg-transparent"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
        </Link>
        <Button
          onClick={() => handleDelete(project.id)}
          disabled={isPending}
          variant="outline"
          size="sm"
          className="border-neutral-700/50 text-neutral-400 hover:text-red-400"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
