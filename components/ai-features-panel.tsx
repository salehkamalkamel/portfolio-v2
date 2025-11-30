"use client";

import { useState, useTransition } from "react";
import {
  Sparkles,
  Languages,
  FileText,
  X,
  ChevronDown,
  ChevronUp,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIActionType, generateAIContent } from "@/services/geminiService";

interface AIFeaturesPanelProps {
  title: string;
  content: string;
}

export function AIFeaturesPanel({ title, content }: AIFeaturesPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState<AIActionType | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // useTransition handles the loading state of server actions automatically
  const [isPending, startTransition] = useTransition();

  const handleGenerate = (type: AIActionType) => {
    setActiveFeature(type);
    setError(null);
    setResult(null);

    startTransition(async () => {
      const response = await generateAIContent(content, type);

      if (response.success && response.data) {
        setResult(response.data);
      } else {
        setError(response.error || "An unexpected error occurred");
      }
    });
  };

  const handleClose = () => {
    // Optional: Reset everything or just close the result view
    // For now, let's keep the panel open but reset the result view
    setActiveFeature(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="border border-neutral-800/40 rounded-xl overflow-hidden bg-linear-to-br from-neutral-900/80 via-neutral-900/50 to-neutral-900/80 backdrop-blur-sm">
      {/* Header - Always Visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800/30 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all">
            <Sparkles className="w-5 h-5 text-violet-400" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-white flex items-center gap-2">
              AI Insights
              <span className="px-1.5 py-0.5 text-[10px] font-medium bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded-full uppercase tracking-wider">
                Beta
              </span>
            </h3>
            <p className="text-xs text-neutral-500">
              Summarize or Translate this article
            </p>
          </div>
        </div>
        <div>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-neutral-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-neutral-500" />
          )}
        </div>
      </button>

      {/* Expandable Content */}
      {isOpen && (
        <div className="border-t border-neutral-800/40 animate-in slide-in-from-top-2 duration-200">
          {/* Feature Selection (Only show if no active result/loading) */}
          {!activeFeature && !isPending && (
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureButton
                icon={<FileText className="w-6 h-6 text-cyan-400" />}
                title="English Summary"
                description="Get key points in seconds"
                colorClass="cyan"
                onClick={() => handleGenerate("summary")}
              />
              <FeatureButton
                icon={<Languages className="w-6 h-6 text-emerald-400" />}
                title="Arabic Summary"
                description="ملخص سريع للمقال"
                colorClass="emerald"
                onClick={() => handleGenerate("translate")}
              />
            </div>
          )}

          {/* Loading State */}
          {isPending && (
            <div className="p-8 flex flex-col items-center justify-center min-h-[200px]">
              <div className="relative mb-4">
                <div className="w-12 h-12 rounded-full border-2 border-neutral-800 border-t-violet-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
                </div>
              </div>
              <p className="text-neutral-400 text-sm animate-pulse">
                {activeFeature === "summary"
                  ? "Analyzing content..."
                  : "Translating and summarizing..."}
              </p>
            </div>
          )}

          {/* Result Display */}
          {(result || error) && !isPending && (
            <div className="p-6">
              {/* Result Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {activeFeature === "summary" ? (
                    <FileText className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <Languages className="w-4 h-4 text-emerald-400" />
                  )}
                  <h4 className="font-medium text-white text-sm">
                    {activeFeature === "summary"
                      ? "Summary"
                      : "المخلص (Arabic)"}
                  </h4>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleGenerate(activeFeature!)}
                    className="h-8 w-8 text-neutral-500 hover:text-white hover:bg-neutral-800/50"
                    title="Regenerate"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClose}
                    className="h-8 w-8 text-neutral-500 hover:text-white hover:bg-neutral-800/50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Content Area */}
              {result ? (
                <div
                  className={`p-5 rounded-lg border text-sm leading-relaxed whitespace-pre-line shadow-inner ${
                    activeFeature === "summary"
                      ? "bg-cyan-950/10 border-cyan-500/20 text-neutral-300"
                      : "bg-emerald-950/10 border-emerald-500/20 text-neutral-300 text-right font-arabic" // Assuming you have a generic arabic font class
                  }`}
                  dir={activeFeature === "translate" ? "rtl" : "ltr"}
                >
                  {result}
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-red-950/20 border border-red-500/20 text-red-400 text-sm text-center">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Sub-component for buttons to keep main file clean
function FeatureButton({
  icon,
  title,
  description,
  colorClass,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  colorClass: "cyan" | "emerald";
  onClick: () => void;
}) {
  const borderColors = {
    cyan: "group-hover:border-cyan-500/30",
    emerald: "group-hover:border-emerald-500/30",
  };

  const bgColors = {
    cyan: "from-cyan-500/10 to-transparent",
    emerald: "from-emerald-500/10 to-transparent",
  };

  const iconBg = {
    cyan: "bg-cyan-500/10 border-cyan-500/20",
    emerald: "bg-emerald-500/10 border-emerald-500/20",
  };

  return (
    <button
      onClick={onClick}
      className={`group relative p-4 rounded-xl border border-neutral-800/60 bg-neutral-800/20 hover:bg-neutral-800/40 ${borderColors[colorClass]} transition-all duration-300 text-left`}
    >
      <div
        className={`absolute inset-0 rounded-xl bg-linear-to-br ${bgColors[colorClass]} opacity-0 group-hover:opacity-100 transition-opacity`}
      />
      <div className="relative flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-lg ${iconBg[colorClass]} border flex items-center justify-center group-hover:scale-110 transition-transform`}
        >
          {icon}
        </div>
        <div>
          <h4 className="font-semibold text-white text-sm mb-0.5">{title}</h4>
          <p className="text-xs text-neutral-500">{description}</p>
        </div>
      </div>
    </button>
  );
}
