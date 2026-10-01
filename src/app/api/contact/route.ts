import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/data";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  // Honeypot: real users never fill a hidden field.
  company?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Field limits. Without these the endpoint accepts unbounded bodies.
const LIMITS = { name: 100, email: 254, message: 5000 } as const;

// 5 submissions per 10 minutes per IP.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60_000;

function validate(body: ContactPayload) {
  const errors: Record<string, string> = {};

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.name)
    errors.name = `Name must be under ${LIMITS.name} characters.`;

  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  else if (email.length > LIMITS.email)
    errors.email = "Please enter a shorter email address.";

  if (message.length < 10)
    errors.message = "Message must be at least 10 characters.";
  else if (message.length > LIMITS.message)
    errors.message = `Message must be under ${LIMITS.message} characters.`;

  return { errors, values: { name, email, message } };
}

export async function POST(request: Request) {
  const limit = rateLimit(
    `contact:${getClientIp(request)}`,
    RATE_LIMIT,
    RATE_WINDOW_MS
  );
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many messages sent. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: ContactPayload | null = null;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  // Honeypot tripped: pretend success so bots do not learn they were caught.
  if (typeof body?.company === "string" && body.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const { errors, values } = validate(body ?? {});

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    // Fail loudly in the logs, but do not pretend the message was delivered.
    console.error(
      "[contact] RESEND_API_KEY is not set — message from",
      values.email,
      "was NOT delivered.",
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "The contact form is not configured yet. Please email me directly instead.",
      },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO ?? siteConfig.email,
      replyTo: values.email,
      subject: `Portfolio enquiry from ${values.name}`,
      text: [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        "",
        values.message,
      ].join("\n"),
    });

    if (error) throw new Error(error.message);
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Could not send your message. Please try again or email me directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
