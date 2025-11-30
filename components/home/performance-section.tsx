import { Badge } from "../ui/badge";

const performanceKeywords = [
  { label: "Core Web Vitals", color: "cyan" },
  { label: "Optimization", color: "purple" },
  { label: "Performance", color: "emerald" },
  { label: "Speed", color: "amber" },
  { label: "Metrics", color: "rose" },
];

export default function PerformanceSection() {
  return (
    <section id="performance" className="border-b border-neutral-800/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="mb-12">
          <div className="mb-6">
            <Badge className="bg-cyan-900/30 text-cyan-300 border-cyan-700/50 border mb-3">
              Performance Focus
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Performance Optimization
            </h2>
          </div>
          <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">
            I love web performance — it’s basically frontend engineering mixed
            with the fun of tuning a drift car. You want more speed, but you
            can’t sacrifice control. Over time, I developed a deep focus on
            performance optimization. I’ve worked on projects where I diagnosed
            what slowed a website down and improved loading times, Web Vitals,
            and overall user experience. Real performance isn’t just scoring 100
            in Lighthouse; it’s building fast, stable, reliable websites.
          </p>
        </div>

        <div className="mb-12 pb-12 border-b border-neutral-800/40">
          <p className="text-sm text-neutral-500 mb-4">Core Focus Areas</p>
          <div className="flex flex-wrap gap-3">
            {performanceKeywords.map((keyword) => (
              <Badge
                key={keyword.label}
                className={`
                    ${
                      keyword.color === "cyan" &&
                      "bg-cyan-900/30 text-cyan-300 border-cyan-700/50"
                    }
                    ${
                      keyword.color === "purple" &&
                      "bg-purple-900/30 text-purple-300 border-purple-700/50"
                    }
                    ${
                      keyword.color === "emerald" &&
                      "bg-emerald-900/30 text-emerald-300 border-emerald-700/50"
                    }
                    ${
                      keyword.color === "amber" &&
                      "bg-amber-900/30 text-amber-300 border-amber-700/50"
                    }
                    ${
                      keyword.color === "rose" &&
                      "bg-rose-900/30 text-rose-300 border-rose-700/50"
                    }
                    border`}
                variant="outline"
              >
                {keyword.label}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-neutral-800/40 rounded-lg p-6 bg-neutral-800/20 hover:bg-neutral-800/30 transition-colors">
            <p className="text-3xl font-bold mb-2">45%</p>
            <p className="text-neutral-400 text-sm">
              Average improvement in performance metrics across client and
              personal projects
            </p>
          </div>
          <div className="border border-neutral-800/40 rounded-lg p-6 bg-neutral-800/20 hover:bg-neutral-800/30 transition-colors">
            <p className="text-3xl font-bold mb-2">0.1s</p>
            <p className="text-neutral-400 text-sm">
              Typical Largest Contentful Paint (LCP) after optimization work —
              just kidding, it depends
            </p>
          </div>
          <div className="border border-neutral-800/40 rounded-lg p-6 bg-neutral-800/20 hover:bg-neutral-800/30 transition-colors">
            <p className="text-3xl font-bold mb-2">100 Lighthouse</p>
            <p className="text-neutral-400 text-sm">
              Because high performance shouldn’t be optional
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
