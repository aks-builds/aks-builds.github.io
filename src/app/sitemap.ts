import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/lib/data/projects";

const BASE_URL = "https://aks-builds.github.io";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = CASE_STUDIES.map((p) => ({
    url: `${BASE_URL}/work/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...caseStudyRoutes];
}
