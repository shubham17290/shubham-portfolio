"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Copy, Check, Send, Phone } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { siteConfig } from "@/lib/data";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Placeholder — wire to Resend / Formspree / API route later
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 border-t border-white/[0.06] bg-white/[0.01] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something great together"
          description="Placeholder form — connect it to your email service later. I usually reply within 24 hours."
        />

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <div className="rounded-2xl border border-white/[0.07] bg-[#0e0e11] p-6 sm:p-7">
              <h3 className="text-lg font-semibold text-white">Get in touch</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Currently {siteConfig.availability.toLowerCase()} for freelance,
                full-time roles and fun collaborations.
              </p>

              <div className="mt-6 space-y-3">
                <button
                  onClick={copyEmail}
                  className="group flex w-full items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-left transition-colors hover:border-white/20"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-black">
                      <Mail className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[11px] uppercase tracking-wider text-zinc-500">Email</span>
                      <span className="block text-sm font-medium text-white">{siteConfig.email}</span>
                    </span>
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition-colors group-hover:text-white">
                    {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </span>
                </button>

                {[
                  { icon: MapPin, label: "Location", value: siteConfig.location },
                  { icon: Phone, label: "Response time", value: "Within 24 hours" },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.06] px-4 py-3.5"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[11px] uppercase tracking-wider text-zinc-500">{label}</span>
                      <span className="block text-sm font-medium text-zinc-200">{value}</span>
                    </span>
                  </div>
                ))}
              </div>

              {copied && (
                <p className="mt-3 text-center text-xs font-medium text-emerald-400">
                  Email copied to clipboard!
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-6">
              <p className="text-sm leading-relaxed text-emerald-100/90">
                <span className="font-semibold text-emerald-300">Prefer a quick call? </span>
                Mention your timezone and I&apos;ll send a Calendly link. No recruiters spam, promise.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-white/[0.07] bg-[#0e0e11] p-6 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-[13px] font-medium text-zinc-300">Name</span>
                <input
                  required
                  name="name"
                  placeholder="Jane Smith"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-white/30 focus:bg-white/[0.05]"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[13px] font-medium text-zinc-300">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="jane@company.com"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-white/30 focus:bg-white/[0.05]"
                />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="mb-1.5 block text-[13px] font-medium text-zinc-300">Subject</span>
              <input
                name="subject"
                placeholder="Project inquiry — landing page redesign"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-white/30 focus:bg-white/[0.05]"
              />
            </label>
            <label className="mt-4 block">
              <span className="mb-1.5 block text-[13px] font-medium text-zinc-300">Message</span>
              <textarea
                required
                name="message"
                rows={5}
                placeholder="Tell me about your project, timeline and budget..."
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-white/30 focus:bg-white/[0.05]"
              />
            </label>

            <button
              type="submit"
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[15px] font-medium text-black transition-all hover:bg-zinc-200 sm:w-auto sm:px-8"
            >
              {sent ? (
                <>
                  <Check className="h-4 w-4" /> Message Sent!
                </>
              ) : (
                <>
                  Send Message <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </button>
            <p className="mt-4 font-mono text-[11px] leading-relaxed text-zinc-600">
              {"// TODO: wire to /api/contact or Resend. Currently front-end only."}
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
