import { NextResponse } from "next/server";
import { streamText } from "ai";
import { google } from "@ai-sdk/google";

const SYSTEM_PROMPT = `You are the AI assistant on Shubham Maurya's portfolio website. Answer questions about him in a friendly, professional tone. Keep responses short (2-3 sentences max).

About Shubham:
- Full-Stack Developer and AI Intern at IBM
- Final year B.Tech CSE student at AKTU
- Skills: Next.js, React, TypeScript, Tailwind CSS, Node.js, MongoDB, PostgreSQL, Prisma, Python, LLMs/Prompting
- Projects: PREPForge (interview prep platform), Fitness Application (workout tracker)
- Experience: AI Intern at IBM (June-Aug 2026)
- Location: Kanpur, India (open to Delhi, Lucknow, Noida, Mumbai, Gurgaon)
- Contact: smourya1046@gmail.com
- Socials: github.com/shubham17290, linkedin.com/in/shubham-maurya-99325b380, leetcode.com/u/algoXninja
- Currently open to internship opportunities

If asked something unrelated to Shubham, politely redirect to questions about him.`;

// Basic in-memory rate limiting: max 10 requests per IP per minute.
// Note: single-instance only; use Redis/Upstash for multi-instance production.
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;
const hits = new Map<string, number[]>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const prev = hits.get(ip) ?? [];
  const recent = prev.filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

type IncomingMessage = {
  role?: unknown;
  content?: unknown;
};

function toModelMessages(body: { messages?: unknown }) {
  if (!Array.isArray(body.messages)) return null;
  const out: Array<{ role: "user" | "assistant"; content: string }> = [];
  for (const m of body.messages as IncomingMessage[]) {
    if (typeof m !== "object" || m === null) return null;
    const content = typeof m.content === "string" ? m.content.trim() : "";
    if (!content || content.length > 4000) return null;
    if (m.role === "user") out.push({ role: "user", content });
    else if (m.role === "assistant") out.push({ role: "assistant", content });
    else return null;
  }
  if (out.length === 0 || out.length > 50) return null;
  if (out[out.length - 1]?.role !== "user") return null;
  return out;
}

export async function POST(request: Request) {
  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please try again in a minute." },
      { status: 429 }
    );
  }

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return NextResponse.json(
      { error: "Chat service is not configured. Please try again later." },
      { status: 500 }
    );
  }

  let body: { messages?: unknown } | null = null;
  try {
    body = (await request.json()) as { messages?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = toModelMessages(body ?? {});
  if (!messages) {
    return NextResponse.json(
      { error: "Invalid messages. Send a non-empty user message." },
      { status: 400 }
    );
  }

  try {
    console.log("KEY EXISTS:", !!process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    const result = streamText({
      model: google("gemini-3.8-flash"),
      system: SYSTEM_PROMPT,
      messages,
      onError({ error }) {
        console.error("[chat] stream error:", error);
      },
    });
    return result.toTextStreamResponse();
  } catch (err) {
    console.error("[chat] streamText failed:", err);
    return NextResponse.json(
      { error: "Chat service is unavailable. Please try again." },
      { status: 500 }
    );
  }
}
