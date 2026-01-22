import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/", // Hide admin or private routes
    },
    sitemap: "https://saleh-kamal.blog//sitemap.xml",
  };
}
