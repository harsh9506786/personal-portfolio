import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((p) => ({
      url: `${siteConfig.url}/work/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
