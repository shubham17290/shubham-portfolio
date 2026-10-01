import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    console.log(
      "✅ API HIT. Key exists:",
      !!process.env.GOOGLE_GENERATIVE_AI_API_KEY
    );

    const result = streamText({
      model: google("gemini-3.8-flash"),
      system: `You are the AI assistant on Shubham Maurya's portfolio website. Answer questions about him in a friendly, professional tone. Keep responses short (2-3 sentences max).

About Shubham:
- Full-Stack Developer and AI Intern at IBM
- Final year B.Tech CSE student at AKTU
- Skills: Next.js, React, TypeScript, Tailwind CSS, Node.js, MongoDB, PostgreSQL, Prisma, Python, LLMs
- Projects: PREPForge (interview prep platform), Fitness Application (workout tracker)
- Location: Kanpur, India
- Contact: smourya1046@gmail.com
- Socials: github.com/shubham17290, linkedin.com/in/shubham-maurya-99325b380, leetcode.com/u/algoXninja
- Currently open to internship opportunities

If asked something unrelated, politely redirect to questions about Shubham.`,
      messages,
      onError({ error }) {
        console.error("❌ STREAM ERROR:", error);
      }
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("❌ API ERROR:", error);
    return new Response(JSON.stringify({ error: "Something went wrong." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
