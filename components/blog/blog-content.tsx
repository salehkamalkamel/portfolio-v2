import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
export default function BlogPostContent({ content }: { content: string }) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12 border-b border-neutral-800/40">
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown
          components={{
            // Headings
            h1: ({ node, ...props }) => (
              <h1
                className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 mt-12 first:mt-0 text-white"
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight mb-5 mt-10 pb-3 border-b border-neutral-800/40 text-white"
                {...props}
              />
            ),
            h3: ({ node, ...props }) => (
              <h3
                className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 mt-8 text-white"
                {...props}
              />
            ),
            h4: ({ node, ...props }) => (
              <h4
                className="text-xl sm:text-2xl font-bold mb-3 mt-6 text-white"
                {...props}
              />
            ),
            h5: ({ node, ...props }) => (
              <h5
                className="text-lg sm:text-xl font-bold mb-3 mt-5 text-white"
                {...props}
              />
            ),
            h6: ({ node, ...props }) => (
              <h6
                className="text-base sm:text-lg font-bold mb-2 mt-4 text-neutral-300"
                {...props}
              />
            ),

            // Paragraphs
            p: ({ node, ...props }) => (
              <p
                className="text-neutral-400 text-base sm:text-lg leading-relaxed mb-6"
                {...props}
              />
            ),

            // Links
            a: ({ node, ...props }) => (
              <a
                className="text-cyan-400 hover:text-cyan-300 transition-colors underline decoration-cyan-400/30 hover:decoration-cyan-300/50 underline-offset-2"
                {...props}
              />
            ),

            // Lists
            ul: ({ node, ...props }) => (
              <ul className="list-none space-y-3 mb-6 ml-0" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol
                className="list-decimal list-inside space-y-3 mb-6 text-neutral-400 marker:text-cyan-400"
                {...props}
              />
            ),
            li: ({ node, ...props }) => (
              <li
                className="text-neutral-400 text-base sm:text-lg leading-relaxed flex items-start gap-3"
                {...props}
              >
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2.5 shrink-0"></span>
                <span className="flex-1">{props.children}</span>
              </li>
            ),

            // Blockquotes
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="border-l-4 border-cyan-500/50 bg-neutral-800/20 pl-6 pr-4 py-4 my-6 rounded-r-lg"
                {...props}
              >
                <div className="text-neutral-300 italic">{props.children}</div>
              </blockquote>
            ),

            // Horizontal Rule
            hr: ({ node, ...props }) => (
              <hr
                className="border-0 border-t border-neutral-800/40 my-12"
                {...props}
              />
            ),

            // Emphasis
            strong: ({ node, ...props }) => (
              <strong className="font-bold text-white" {...props} />
            ),
            em: ({ node, ...props }) => (
              <em className="italic text-neutral-300" {...props} />
            ),

            // Code blocks and inline code
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || "");

              return !inline && match ? (
                <div className="my-6">
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid rgba(38, 38, 38, 0.4)",
                      borderRadius: "0.5rem",
                      padding: "1.5rem",
                      fontSize: "0.875rem",
                      lineHeight: "1.7",
                    }}
                    codeTagProps={{
                      style: {
                        fontFamily:
                          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                      },
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code
                  className="bg-neutral-800/40 text-cyan-300 px-2 py-1 rounded text-sm border border-neutral-700/40 font-mono"
                  {...props}
                >
                  {children}
                </code>
              );
            },

            // Images (if you use them)
            img: ({ node, alt, ...props }) => (
              <figure className="my-8">
                <img
                  className="rounded-lg border border-neutral-800/40 w-full hover:border-neutral-700/60 transition-colors"
                  alt={alt}
                  loading="lazy"
                  {...props}
                />
                {alt && (
                  <figcaption className="text-neutral-500 text-sm text-center mt-3 italic">
                    {alt}
                  </figcaption>
                )}
              </figure>
            ),

            // Tables (if you use them)
            table: ({ node, ...props }) => (
              <div className="overflow-x-auto my-8">
                <table
                  className="w-full border-collapse border border-neutral-800/40 rounded-lg"
                  {...props}
                />
              </div>
            ),
            thead: ({ node, ...props }) => (
              <thead className="bg-neutral-800/30" {...props} />
            ),
            th: ({ node, ...props }) => (
              <th
                className="border border-neutral-800/40 px-4 py-3 text-left text-white font-bold text-sm"
                {...props}
              />
            ),
            td: ({ node, ...props }) => (
              <td
                className="border border-neutral-800/40 px-4 py-3 text-neutral-400 text-sm"
                {...props}
              />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </section>
  );
}
