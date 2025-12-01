"use client";

import { Project } from "@/db/schema";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function ClientProjectCard({
  project,
  idx,
}: {
  project: Project;
  idx: number;
}) {
  const router = useRouter();

  const goToDetails = () => {
    router.push(`/projects/${project.slug}`);
  };

  return (
    <div
      onClick={goToDetails}
      className="group border border-neutral-800/40 rounded-xl overflow-hidden hover:border-neutral-700/60 transition-all cursor-pointer"
    >
      <div className="grid md:grid-cols-2 gap-6 bg-neutral-900/30 hover:bg-neutral-900/50 transition-colors">
        {/* Content Side */}
        <div className="flex flex-col justify-between p-6 md:p-8 z-10 relative">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <p className="text-xs text-neutral-500 uppercase tracking-widest">
                {project.stack}
              </p>
              <div className="w-1 h-1 bg-neutral-700 rounded-full"></div>
              <p className="text-xs text-neutral-400">{`Project ${idx + 1}`}</p>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>

            <p className="text-neutral-400 text-base leading-relaxed mb-6 line-clamp-3">
              {project.description}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="bg-neutral-800/50 text-neutral-300 border-neutral-700/50 text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* {project?.metrics && (
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-800/40">
                <div>
                  <p className="text-2xl font-bold text-cyan-400">
                    {project.metrics.improvement}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">Improvement</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-400">
                    {project.metrics.lighthouse}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">Lighthouse</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-400">
                    {project.metrics.lcp}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">LCP</p>
                </div>
              </div>
            )} */}
          </div>
        </div>

        {/* Image Side */}
        <div className="relative hidden md:block h-80 md:h-auto rounded-lg overflow-hidden group-hover:border-neutral-700/60 transition duration-300">
          <Image
            src={
              project?.thumbnailUrl ||
              "https://res.cloudinary.com/dz4gikdws/image/upload/v1764511644/how_the_web-works_hydxrk.jpg"
            }
            alt={project.title}
            fill
            className="object-cover w-full h-full"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link
              href={project.liveUrl || "#"}
              onClick={(e) => e.stopPropagation()}
              className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 hover:bg-white/30 transition-colors"
            >
              <ArrowUpRight className="w-8 h-8 text-white hover:text-cyan-400 transition-colors" />
            </Link>
            <p className="text-white text-sm">View Project</p>
          </div>
        </div>
      </div>
    </div>
  );
}
