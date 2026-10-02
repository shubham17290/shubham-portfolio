"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  Mail,
  Copy,
  Check,
  Send,
  Github,
  Linkedin,
  Twitter,
  Dribbble,
  Code2,
  Globe,
  CheckCircle2,
  AlertCircle,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { siteConfig, socials } from "@/lib/data";
import MagneticButton from "@/components/MagneticButton";

const socialIcons: Record<string, LucideIcon> = {
  Github,
  Linkedin,
  Twitter,
  Dribbble,
  Code2,
};

const fallbackIcon = Globe;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Toast = { type: "success" | "error"; message: string } | null;

function validate(name: string, email: string, message: string): Errors {
  const errors: Errors = {};
  if (name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email.trim()))
    errors.email = "Please enter a valid email address.";
  if (message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";
  return errors;
}

const inputClass = (invalid: boolean) =>
  `w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors focus:bg-white/[0.05] ${
    invalid
      ? "border-red-400/60 focus:border-red-400"
      : "border-white/10 focus:border-white/30"
  }`;

const container: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (next: NonNullable<Toast>) => {
    setToast(next);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast({ type: "error", message: "Could not copy email." });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate(name, email, message);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company: honeypot }),
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        errors?: Errors;
        error?: string;
      } | null;

      if (!res.ok || !data?.ok) {
        if (data?.errors) setErrors(data.errors);
        throw new Error(data?.error ?? "submit-failed");
      }

      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
      showToast({
        type: "success",
        message: "Message sent! I'll get back to you soon.",
      });
    } catch (e) {
      showToast({
        type: "error",
        message:
          e instanceof Error && e.message !== "submit-failed"
            ? e.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 border-t border-white/10 bg-white/[0.01] py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-6xl px-6 sm:px-8"
      >
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something great together"
          description="Fill out the form and I'll get back to you as soon as I can."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"
        >
          {/* Left: heading + email + socials */}
          <motion.div variants={item} className="flex flex-col gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset]">
              <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">Get in touch</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Currently {siteConfig.availability.toLowerCase()} for
                freelance, full-time roles and fun collaborations.
              </p>

              <div className="group mt-6 flex w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-left shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset] transition-colors hover:border-white/20">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-black">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-zinc-500">
                      Email
                    </span>
                    <span className="block text-sm font-medium text-white">
                      {siteConfig.email}
                    </span>
                  </span>
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition-colors hover:text-white active:scale-95"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              {copied && (
                <p className="mt-3 text-center text-xs font-medium text-emerald-400">
                  Email copied to clipboard!
                </p>
              )}

              <div className="mt-6 border-t border-white/10 pt-6">
                <p className="font-mono text-xs uppercase tracking-wider text-zinc-600">
                  Follow me
                </p>
                <div className="mt-3 flex items-center gap-2">
                  {socials.map((s) => {
                    const Icon = socialIcons[s.icon] ?? fallbackIcon;
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 transition-all hover:border-white/20 hover:text-white"
                      >
                        <Icon className="h-[18px] w-[18px]" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            variants={item}
            className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset]"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-zinc-300">
                  Name
                </span>
                <input
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                  }}
                  placeholder="Jane Smith"
                  aria-invalid={!!errors.name}
                  className={inputClass(!!errors.name)}
                />
                {errors.name && (
                  <span className="mt-1.5 block text-xs text-red-400">{errors.name}</span>
                )}
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-zinc-300">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                  }}
                  placeholder="jane@company.com"
                  aria-invalid={!!errors.email}
                  className={inputClass(!!errors.email)}
                />
                {errors.email && (
                  <span className="mt-1.5 block text-xs text-red-400">{errors.email}</span>
                )}
              </label>
            </div>

            <label className="mt-4 block">
              <span className="mb-1.5 block text-sm font-medium text-zinc-300">
                Message
              </span>
              <textarea
                name="message"
                rows={5}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) setErrors((p) => ({ ...p, message: undefined }));
                }}
                placeholder="Tell me about your project, timeline and budget..."
                aria-invalid={!!errors.message}
                className={`${inputClass(!!errors.message)} resize-none`}
              />
              {errors.message && (
                <span className="mt-1.5 block text-xs text-red-400">{errors.message}</span>
              )}
            </label>

            {/* Honeypot: hidden from users, tempting to bots. Not display:none
                so it stays out of the accessibility tree and screen readers. */}
            <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
              <label htmlFor="company">Company (leave blank)</label>
              <input
                id="company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <MagneticButton className="mt-6 inline-block w-full sm:w-auto">
              <button
                type="submit"
                disabled={sending}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium bg-primary text-black hover:bg-primary/90 transition-colors disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {sending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    Send Message{" "}
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
            </MagneticButton>
          </motion.form>
        </motion.div>
      </motion.div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            role="status"
            className={`fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2.5 rounded-full border px-5 py-3 text-sm font-medium shadow-2xl backdrop-blur-xl ${
              toast.type === "success"
                ? "border-emerald-400/30 bg-emerald-950/90 text-emerald-100"
                : "border-red-400/30 bg-red-950/90 text-red-100"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-400" />
            )}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
