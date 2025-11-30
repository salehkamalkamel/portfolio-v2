import { ArrowUpRight, Code2, FolderOpen, Youtube, Zap } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-32 md:py-34 border-b border-neutral-800/40">
      <div className="text-center space-y-8">
        {/* Location Badge */}
        <p className="text-neutral-500 text-xs sm:text-sm tracking-widest uppercase">
          Saleh Kamal · Cairo, Egypt
        </p>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-balance">
          I am a web dev focused on{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
            Frontend
          </span>{" "}
          and{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-500">
            Web Performance
          </span>
        </h1>

        {/* Description */}
        <p className="text-neutral-400 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
          Building lightning-fast web experiences with modern technologies.
          Specializing in performance optimization and scalable frontend
          architecture.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 max-w-3xl mx-auto">
          <a
            href="#youtube"
            className="group bg-neutral-900/50 hover:bg-red-900/20 border border-neutral-800/50 hover:border-red-500/50 rounded-lg p-4 transition-all hover:scale-105"
          >
            <Youtube className="w-6 h-6 text-neutral-400 group-hover:text-red-400 transition-colors mx-auto mb-2" />
            <p className="text-sm font-medium text-neutral-300 group-hover:text-red-300 transition-colors">
              YouTube
            </p>
            <p className="text-xs text-neutral-500 mt-1">Content</p>
          </a>
          <a
            href="#performance"
            className="group bg-neutral-900/50 hover:bg-cyan-900/20 border border-neutral-800/50 hover:border-cyan-500/50 rounded-lg p-4 transition-all hover:scale-105"
          >
            <Zap className="w-6 h-6 text-neutral-400 group-hover:text-cyan-400 transition-colors mx-auto mb-2" />
            <p className="text-sm font-medium text-neutral-300 group-hover:text-cyan-300 transition-colors">
              Performance
            </p>
            <p className="text-xs text-neutral-500 mt-1">Speed</p>
          </a>
          <a
            href="#portfolio"
            className="group bg-neutral-900/50 hover:bg-purple-900/20 border border-neutral-800/50 hover:border-purple-500/50 rounded-lg p-4 transition-all hover:scale-105"
          >
            <FolderOpen className="w-6 h-6 text-neutral-400 group-hover:text-purple-400 transition-colors mx-auto mb-2" />
            <p className="text-sm font-medium text-neutral-300 group-hover:text-purple-300 transition-colors">
              Portfolio
            </p>
            <p className="text-xs text-neutral-500 mt-1">Projects</p>
          </a>
          <a
            href="#skills"
            className="group bg-neutral-900/50 hover:bg-emerald-900/20 border border-neutral-800/50 hover:border-emerald-500/50 rounded-lg p-4 transition-all hover:scale-105"
          >
            <Code2 className="w-6 h-6 text-neutral-400 group-hover:text-emerald-400 transition-colors mx-auto mb-2" />
            <p className="text-sm font-medium text-neutral-300 group-hover:text-emerald-300 transition-colors">
              Skills
            </p>
            <p className="text-xs text-neutral-500 mt-1">Tech Stack</p>
          </a>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href={"/projects"}>
            <Button className="bg-white text-black hover:bg-neutral-200 px-8 py-6 text-base cursor-pointer">
              View My Work <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href={"/contact"}>
            <Button
              variant="outline"
              className="border-neutral-700 hover:bg-neutral-900 bg-transparent px-8 py-6 text-base cursor-pointer"
            >
              Get In Touch
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
