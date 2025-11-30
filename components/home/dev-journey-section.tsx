import { ArrowUpRight, Youtube } from "lucide-react";
import { Badge } from "../ui/badge";
import Image from "next/image";

export default function DevJourneySection() {
  return (
    <section
      id="youtube"
      className="border-b border-neutral-800/40 bg-neutral-900/30"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="mb-12">
          <div className="mb-6">
            <Badge className="bg-red-900/30 text-red-300 border-red-700/50 border mb-3">
              YouTube Channel
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Creating Content for Developers
            </h2>
          </div>
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed max-w-2xl">
            On my YouTube channel "Dev Journey", I share my learning path from
            Junior to Senior Frontend Developer. I believe the best way to
            master something is to teach it, so I create content about
            frameworks, web fundamentals, and real development challenges to
            help us all grow together.
          </p>
        </div>

        {/* Channel Info & CTAs */}
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-12 pb-12 border-b border-neutral-800/40">
          {/* Channel Logo & Stats */}
          <div className="border border-neutral-800/40 rounded-lg p-6 sm:p-8 bg-neutral-800/20 flex flex-col items-center sm:items-start text-center sm:text-left">
            <Image
              width={300}
              height={300}
              src="/LOGO.png"
              alt="Dev Journey"
              className="w-32 sm:w-40 mb-4 rounded-full"
            />
            <h3 className="text-xl font-bold mb-2">Dev Journey</h3>
            <p className="text-neutral-400 text-sm mb-6">
              Building in public, sharing knowledge, growing together
            </p>
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start w-full">
              <a
                href="https://youtube.com/@devjourney"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors text-sm"
              >
                <Youtube className="w-4 h-4" />
                Subscribe
              </a>
              <a
                href="https://youtube.com/@devjourney"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-neutral-700 hover:border-neutral-600 text-neutral-300 hover:text-white rounded-lg font-medium transition-colors text-sm"
              >
                <ArrowUpRight className="w-4 h-4" />
                Watch Latest
              </a>
            </div>
          </div>

          {/* Topics Covered */}
          <div className="border border-neutral-800/40 rounded-lg p-6 sm:p-8 bg-neutral-800/20">
            <h3 className="font-bold mb-6 text-neutral-300 text-xs sm:text-sm uppercase tracking-widest">
              Topics I Cover
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3 sm:gap-4">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 shrink-0"></div>
                <div>
                  <p className="font-medium mb-1 text-sm sm:text-base">
                    Frontend Frameworks
                  </p>
                  <p className="text-neutral-400 text-xs sm:text-sm">
                    React, Next.js, TypeScript, and modern tooling
                  </p>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 shrink-0"></div>
                <div>
                  <p className="font-medium mb-1 text-sm sm:text-base">
                    Web Fundamentals
                  </p>
                  <p className="text-neutral-400 text-xs sm:text-sm">
                    Performance, accessibility, and best practices
                  </p>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 shrink-0"></div>
                <div>
                  <p className="font-medium mb-1 text-sm sm:text-base">
                    Learning Journey
                  </p>
                  <p className="text-neutral-400 text-xs sm:text-sm">
                    Real challenges, solutions, and career growth
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
