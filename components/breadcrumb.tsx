"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumb() {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/signup" || pathname === "/login")
    return null;

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split("/").filter((path) => path);
    const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

    let currentPath = "";
    paths.forEach((path, index) => {
      currentPath += `/${path}`;

      let label = path;

      // Handle special cases for top-level routes
      if (path === "admin") label = "Admin Dashboard";
      if (path === "blog" && index === 0) label = "Blog";
      if (path === "projects" && index === 0) label = "Projects";
      if (path === "contact") label = "Contact";
      if (path === "login") label = "Sign In";
      if (path === "signup") label = "Sign Up";

      // Handle dynamic routes (slug__id)
      if (paths[index - 1] === "blog" || paths[index - 1] === "projects") {
        // Remove the ID part after __
        const [slugPart] = path.split("__");
        label = slugPart
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      } else {
        // Regular label formatting
        label = path
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }

      breadcrumbs.push({ label, href: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-black/50 border-b border-neutral-800/40 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        <ol className="flex items-center gap-2 text-sm flex-wrap">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const isFirst = index === 0;

            return (
              <li key={crumb.href} className="flex items-center gap-2">
                {isFirst ? (
                  <Link
                    href={crumb.href}
                    className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors group"
                  >
                    <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="hidden sm:inline">{crumb.label}</span>
                  </Link>
                ) : (
                  <>
                    <ChevronRight className="w-4 h-4 text-neutral-600" />
                    {isLast ? (
                      <span className="text-white font-medium max-w-[200px] sm:max-w-none truncate">
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        href={crumb.href}
                        className="text-neutral-400 hover:text-white transition-colors max-w-[150px] sm:max-w-none truncate"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
