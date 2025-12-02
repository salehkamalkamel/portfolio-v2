"use client";

import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function BlogSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  // Local-only state (never overridden by URL)
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search")?.toString() || ""
  );

  // Debounced search
  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query.trim()) params.set("search", query.trim());
    else params.delete("search");

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }, 300);

  const handleInputChange = (value: string) => {
    setSearchValue(value); // Always update local immediately
    handleSearch(value); // URL updates debounced
  };

  const clearSearch = () => {
    setSearchValue("");
    const params = new URLSearchParams(searchParams);
    params.delete("search");

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />

      <Input
        type="text"
        value={searchValue}
        placeholder="Search articles..."
        onChange={(e) => handleInputChange(e.target.value)}
        className="w-full pl-12 pr-12 py-3 bg-neutral-900/50 border border-neutral-800/60 text-white"
      />

      {searchValue && (
        <button
          onClick={clearSearch}
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          <X className="w-5 h-5 text-neutral-500" />
        </button>
      )}

      {isPending && (
        <div className="absolute right-12 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-neutral-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
