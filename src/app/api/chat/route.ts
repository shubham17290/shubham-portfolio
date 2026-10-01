import { NextResponse } from "next/server";
import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

const MODEL = process.env.CHAT_MODEL ?? "gemini-2.0-flash";

// 10 requests per minute per IP.
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;

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
  const limit = rateLimit(
    `chat:${getClientIp(request)}`,
    RATE_LIMIT,
    RATE_WINDOW_MS
  );
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please try again shortly." },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      }
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

  // streamText() is lazy: it does not contact the provider until the response
  // stream is consumed, so provider errors surface via onError rather than by
  // throwing here. This try/catch only guards synchronous setup failures.
  try {
    const result = streamText({
      model: google(MODEL),
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
