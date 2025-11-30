"use client";

import { useState, useRef, useCallback } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  ImageIcon,
  Heading1,
  Heading2,
  Heading3,
  Minus,
  Eye,
  Edit3,
  Table,
  Columns,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SecureMarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder = "Type your markdown here...",
}: SecureMarkdownEditorProps) {
  const [mode, setMode] = useState<"edit" | "preview" | "split">("edit");

  // Simulated preview rendering (replace with react-markdown in production)
  const PreviewContent = () => {
    // In production, use:
    // import ReactMarkdown from 'react-markdown'
    // import remarkGfm from 'remark-gfm'
    // import rehypeSanitize from 'rehype-sanitize'
    //
    // <ReactMarkdown
    //   remarkPlugins={[remarkGfm]}
    //   rehypePlugins={[rehypeSanitize]}
    // >
    //   {value}
    // </ReactMarkdown>

    return (
      <div className="prose prose-invert prose-emerald max-w-none">
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
          <p className="text-sm text-emerald-300 mb-2 font-semibold">
            ⚠️ Demo Mode
          </p>
          <p className="text-xs text-neutral-400 mb-3">
            Install required packages for production:
          </p>
          <pre className="bg-neutral-900 p-3 rounded text-xs overflow-x-auto">
            <code className="text-emerald-400">
              npm install react-markdown remark-gfm rehype-sanitize
            </code>
          </pre>
          <p className="text-xs text-neutral-400 mt-3">
            Your markdown will render here securely with proper HTML
            sanitization.
          </p>
        </div>
        <div className="mt-4 p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
          <h3 className="text-white font-semibold mb-2">
            Preview of your content:
          </h3>
          <p className="text-neutral-300 whitespace-pre-wrap text-sm">
            {value || "Nothing to preview yet..."}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col border border-neutral-700/50 rounded-lg overflow-hidden bg-neutral-900 shadow-xl">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 bg-neutral-900 border-b border-neutral-700/50">
        <div className="flex items-center gap-2">
          <div className="text-xs font-medium text-neutral-400 px-2">
            Secure Markdown Editor
          </div>
        </div>

        {/* View mode toggles */}
        <div className="flex items-center gap-1 bg-neutral-950/50 p-1 rounded-md border border-neutral-800">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setMode("edit")}
            className={`h-7 px-2 text-xs ${
              mode === "edit"
                ? "bg-neutral-800 text-white shadow-sm"
                : "text-neutral-500 hover:text-white"
            }`}
          >
            <Edit3 className="h-3 w-3 mr-1.5" />
            Edit
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setMode("split")}
            className={`h-7 px-2 text-xs ${
              mode === "split"
                ? "bg-neutral-800 text-white shadow-sm"
                : "text-neutral-500 hover:text-white"
            }`}
          >
            <Columns className="h-3 w-3 mr-1.5" />
            Split
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setMode("preview")}
            className={`h-7 px-2 text-xs ${
              mode === "preview"
                ? "bg-neutral-800 text-white shadow-sm"
                : "text-neutral-500 hover:text-white"
            }`}
          >
            <Eye className="h-3 w-3 mr-1.5" />
            Preview
          </Button>
        </div>
      </div>

      {/* Editor / Preview area */}
      <div
        className={`relative flex-1 ${
          mode === "split" ? "grid grid-cols-2 divide-x divide-neutral-800" : ""
        }`}
      >
        {/* Editor */}
        {(mode === "edit" || mode === "split") && (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-full min-h-[400px] p-4 bg-transparent text-neutral-200 placeholder-neutral-600 resize-none focus:outline-none focus:ring-1 focus:ring-emerald-500/20 font-mono text-sm leading-relaxed"
            spellCheck={false}
          />
        )}

        {/* Preview */}
        {(mode === "preview" || mode === "split") && (
          <div className="w-full h-full min-h-[400px] p-4 bg-neutral-900/50 overflow-auto">
            <PreviewContent />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-950 border-t border-neutral-800 text-[10px] uppercase tracking-wider text-neutral-500 font-medium">
        <span>Markdown Supported</span>
        <div className="flex gap-4">
          <span>{value.split(/\s+/).filter(Boolean).length} words</span>
          <span>{value.length} chars</span>
        </div>
      </div>
    </div>
  );
}
