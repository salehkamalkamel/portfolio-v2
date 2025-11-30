import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/", // Hide admin or private routes
    },
    sitemap: "https://yourdomain.com/sitemap.xml",
  };
}
