"use client";

import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function BlogSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  // Local state for immediate UI feedback
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search")?.toString() || ""
  );

  // Debounced search function (300ms delay)
  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (query && query.trim()) {
      params.set("search", query.trim());
    } else {
      params.delete("search");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }, 300);

  // Handle input change
  const handleInputChange = (value: string) => {
    setSearchValue(value);
    handleSearch(value);
  };

  // Clear search
  const clearSearch = () => {
    setSearchValue("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  // Sync with URL changes (for browser back/forward)
  useEffect(() => {
    const urlSearch = searchParams.get("search")?.toString() || "";
    if (urlSearch !== searchValue) {
      setSearchValue(urlSearch);
    }
  }, [searchParams]);

  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />

      <Input
        type="text"
        value={searchValue}
        placeholder="Search articles by title, topic, or keyword..."
        onChange={(e) => handleInputChange(e.target.value)}
        className="w-full pl-12 pr-12 py-3 bg-neutral-900/50 border border-neutral-800/60 text-white placeholder:text-neutral-500 focus:border-neutral-700 focus:ring-0 rounded-lg"
      />

      {/* Clear button */}
      {searchValue && (
        <button
          onClick={clearSearch}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
          aria-label="Clear search"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Loading indicator */}
      {isPending && (
        <div className="absolute right-12 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-neutral-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
