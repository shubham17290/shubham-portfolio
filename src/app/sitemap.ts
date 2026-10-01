import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // TODO: replace with your real domain.
  const base = "https://example.com";
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
