import { Badge } from "../ui/badge";
const expertise = [
  {
    category: "Technologies",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Skills",
    items: [
      "Performance Optimization",
      "Web Vitals",
      "Frontend Architecture",
      "UX Design",
    ],
  },
  {
    category: "Experience",
    items: ["ERP Systems", "WordPress", "Framer", "Backend Integration"],
  },
];
export default function ExpertiseSection() {
  return (
    <section
      id="skills"
      className="border-b border-neutral-800/40 bg-neutral-900/30"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="mb-12">
          <Badge className="bg-amber-900/30 text-amber-300 border-amber-700/50 border mb-3">
            Full Stack Capabilities
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Expertise & Diversity
          </h2>
          <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">
            Beyond frontend development, I’ve explored many areas of the web —
            from building ERP systems with Frappe (arguably the most frustrating
            framework you can try 😅) to creating lightweight websites with
            WordPress and Framer, and even backend work with Flask and Django.
            This diversity helped me become a well-rounded web developer, not
            just someone who masters a single framework. While I don’t usually
            focus on listing every technology I’ve learned, here’s a snapshot of
            my “LLM-like” capabilities that hiring managers (and ATS systems)
            tend to love.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 pb-12 border-b border-neutral-800/40">
          {expertise.map((section) => (
            <div
              key={section.category}
              className="border-l border-neutral-800/40 pl-6"
            >
              <h3 className="font-bold mb-6 text-neutral-300 text-sm uppercase tracking-widest">
                {section.category}
              </h3>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-neutral-400 text-sm"
                  >
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <p className="text-neutral-400 mb-6 text-sm">
            I've worked with diverse technologies:
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              "ERP Systems",
              "WordPress",
              "Framer",
              "Backend APIs",
              "Database Design",
              "UI/UX Design",
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-neutral-800/30 text-neutral-300 rounded-full text-sm border border-neutral-800/40 hover:bg-neutral-800/50 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
