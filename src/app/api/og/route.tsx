import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { getPostBySlug } from "@/lib/blog";
import {
  OG_HEIGHT,
  OG_WIDTH,
  buildOgData,
  isValidSlug,
  ogTitleFontSize,
} from "@/lib/og";

/* Node.js runtime is required: post loading (@/lib/blog) reads MDX files
   via node:fs, which is unavailable on the Edge runtime. This mirrors the
   existing root `opengraph-image.tsx`, which also uses nodejs. */
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug")?.trim() ?? "";

  if (!slug) {
    return new Response("Missing slug", { status: 400 });
  }

  if (!isValidSlug(slug)) {
    return new Response("Invalid slug", { status: 400 });
  }

  let post: ReturnType<typeof getPostBySlug>;
  try {
    post = getPostBySlug(slug);
  } catch {
    return new Response("Post not found", { status: 404 });
  }

  const { title, excerpt, tags, year } = buildOgData(post);
  const titleSize = ogTitleFontSize(title);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "64px 72px",
          backgroundColor: "#09090b",
          fontFamily: "sans-serif",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: "0.2em",
              color: "#a1a1aa",
            }}
          >
            SHUBHAM MAURYA
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "0.15em",
              color: "#34d399",
              border: "2px solid #34d399",
              borderRadius: "999px",
              padding: "4px 18px",
            }}
          >
            BLOG
          </div>
        </div>

        {/* Title + excerpt */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              maxHeight: "260px",
              overflow: "hidden",
            }}
          >
            {title}
          </div>
          {excerpt ? (
            <div
              style={{
                display: "flex",
                fontSize: 26,
                lineHeight: 1.4,
                color: "#a1a1aa",
                maxHeight: "76px",
                overflow: "hidden",
              }}
            >
              {excerpt}
            </div>
          ) : null}
        </div>

        {/* Footer: tags + year + domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  fontSize: 22,
                  color: "#f4f4f5",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "8px",
                  padding: "6px 16px",
                }}
              >
                {tag}
              </div>
            ))}
            {year ? (
              <div style={{ display: "flex", fontSize: 22, color: "#71717a" }}>
                {year}
              </div>
            ) : null}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#71717a" }}>
            shubham-maurya-seven.vercel.app
          </div>
        </div>
      </div>
    ),
    { width: OG_WIDTH, height: OG_HEIGHT },
  );
}
