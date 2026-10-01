import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // TODO: replace with your real domain.
  const base = "https://example.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
