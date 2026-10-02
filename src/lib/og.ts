/* Shared helpers for the dynamic blog OG image generator.
   Pure functions only (no fs access) so the logic stays testable and the
   API route stays thin. Post loading is reused from "@/lib/blog". */

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export const OG_FALLBACK_TITLE = "Shubham Maurya — Blog";

const MAX_TITLE_LENGTH = 110;
const MAX_EXCERPT_LENGTH = 140;
const MAX_TAGS = 4;
const MAX_TAG_LENGTH = 20;

/** Allow only safe slug characters — blocks path traversal (`../`) etc. */
export function isValidSlug(slug: string): boolean {
  return /^[a-zA-Z0-9-_]+$/.test(slug);
}

export function truncate(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

export type OgData = {
  title: string;
  excerpt: string;
  tags: string[];
  year: string;
};

/**
 * Normalize raw frontmatter into safe OG display data.
 * Missing excerpt/tags/date are omitted (never crash, never fabricate).
 */
export function buildOgData(input: {
  title?: unknown;
  excerpt?: unknown;
  tags?: unknown;
  date?: unknown;
}): OgData {
  const rawTitle = typeof input.title === "string" ? input.title.trim() : "";
  const title = rawTitle ? truncate(rawTitle, MAX_TITLE_LENGTH) : OG_FALLBACK_TITLE;

  const rawExcerpt = typeof input.excerpt === "string" ? input.excerpt : "";
  const excerpt = rawExcerpt.trim() ? truncate(rawExcerpt, MAX_EXCERPT_LENGTH) : "";

  const tags = Array.isArray(input.tags)
    ? input.tags
        .filter((t): t is string => typeof t === "string" && t.trim().length > 0)
        .slice(0, MAX_TAGS)
        .map((t) => truncate(t, MAX_TAG_LENGTH))
    : [];

  let year = "";
  if (typeof input.date === "string" && input.date.trim()) {
    const parsed = new Date(input.date);
    if (!Number.isNaN(parsed.getTime())) {
      year = String(parsed.getFullYear());
    }
  }

  return { title, excerpt, tags, year };
}

/** Adaptive title size so long titles don't overflow the 1200×630 canvas. */
export function ogTitleFontSize(title: string): number {
  if (title.length > 80) return 52;
  if (title.length > 50) return 60;
  return 68;
}
