import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";

export default function ContentSection() {
  return (
    <section id="blog" className="border-b border-neutral-800/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="mb-8">
          <Badge className="bg-emerald-900/30 text-emerald-300 border-emerald-700/50 border mb-3">
            Articles & Resources
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Content & Learning
          </h2>
        </div>
        <p className="text-neutral-400 text-lg mb-6 leading-relaxed max-w-2xl">
          I create detailed articles about web development, performance
          optimization, and best practices. In today’s AI-driven world,
          memorizing every new framework or library won’t make you faster than
          an LLM — but understanding the fundamentals will. Think of it as
          leveling up your brain while the bots handle the syntax.
        </p>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          Explore all articles <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
