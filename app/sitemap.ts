// app/sitemap.ts
import { getPosts } from "@/server/blog-actions";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://yourdomain.com";

  // 1. Fetch all blog posts
  const posts = await getPosts();

  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post?.updatedAt ?? post?.createdAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 2. Return static + dynamic routes
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...blogUrls,
  ];
}
