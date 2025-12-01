import { Github, Linkedin, Youtube, Instagram } from "lucide-react";
import Hero from "@/components/home/hero";
import DevJourneySection from "@/components/home/dev-journey-section";
import PerformanceSection from "@/components/home/performance-section";
import ProjectsSection from "@/components/home/projects-sections";
import ContentSection from "@/components/home/content-section";
import ExpertiseSection from "@/components/home/expertise-section";
import { Suspense } from "react";
import ProjectsSectionSkeleton from "@/components/featured-projects-skeleton";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white ">
      {/* Hero Section - centered and symmetric */}
      <Hero />

      {/* Dev Journey Section - redesigned to match performance section style */}
      <DevJourneySection />
      {/* Performance Optimization Section */}
      <PerformanceSection />

      {/* Projects Section */}
      <Suspense fallback={<ProjectsSectionSkeleton />}>
        <ProjectsSection />
      </Suspense>

      {/* Content & Learning Section */}
      <ContentSection />
      {/* Expertise & Diversity Section */}
      <ExpertiseSection />
      {/* Footer */}
      <footer className="border-t border-neutral-800/40 bg-neutral-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <h3 className="font-bold mb-2">Saleh Kamal</h3>
              <p className="text-neutral-400 text-sm">
                Frontend Developer & Web Performance Specialist
              </p>
            </div>
            <div className="flex gap-6">
              <a
                href="https://github.com/salehkamalkamel"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/saleh-kamal-60b96931a"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@devjourney-e1y7e?si=-OCmJBsK4Ok0qioO"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/saleh_kamal_tsx/"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="border-t border-neutral-800/40 mt-8 pt-8 text-center text-neutral-500 text-sm">
            <p>
              © 2025 Saleh Kamal. Built with Next.js and optimized for
              performance.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
