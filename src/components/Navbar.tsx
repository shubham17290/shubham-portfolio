"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Search } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [logoMsg, setLogoMsg] = useState(false);
  const logoClicks = useRef<number[]>([]);
  const logoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoClick = () => {
    const now = Date.now();
    logoClicks.current = [...logoClicks.current.filter((t) => now - t < 1500), now];
    if (logoClicks.current.length >= 5) {
      logoClicks.current = [];
      setLogoMsg(true);
      if (logoTimer.current) clearTimeout(logoTimer.current);
      logoTimer.current = setTimeout(() => setLogoMsg(false), 2500);
    }
  };

  useEffect(() => {
    return () => {
      if (logoTimer.current) clearTimeout(logoTimer.current);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-[var(--bg)]/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8">
          <a href="#home" onClick={handleLogoClick} aria-label="Shubham Maurya — home" className="group relative flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-bold text-black transition-transform group-hover:scale-105">
              S
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-zinc-100">
              {siteConfig.name}
              <span className="text-zinc-400">.dev</span>
            </span>
            <AnimatePresence>
              {logoMsg && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-full mt-2 whitespace-nowrap rounded-full border border-white/10 bg-[#0e0e11] px-3.5 py-1.5 text-xs text-zinc-300 shadow-xl"
                >
                  You really like clicking, huh? 😄
                </motion.span>
              )}
            </AnimatePresence>
          </a>

          {/* Desktop */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.href.startsWith("/") ? (
                  <Link
                    href={link.href}
                    className="group relative rounded-full px-4 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className="absolute bottom-1 left-4 right-4 h-px origin-left scale-x-0 bg-white/80 transition-transform duration-300 group-hover:scale-x-100"
                    />
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="group relative rounded-full px-4 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className="absolute bottom-1 left-4 right-4 h-px origin-left scale-x-0 bg-white/80 transition-transform duration-300 group-hover:scale-x-100"
                    />
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
              aria-label="Open command palette"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Search className="h-4 w-4" />
              <kbd className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[11px] text-zinc-500">
                ⌘K
              </kbd>
            </button>
            <a
              href="#contact"
              className="group hidden items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium bg-primary text-black hover:bg-primary/90 transition-colors md:inline-flex"
            >
              Let&apos;s Talk
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-200 active:scale-95 md:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#09090b]/95 backdrop-blur-xl md:hidden"
          >
            <motion.ul
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex h-full flex-col justify-center gap-2 px-8 pt-16"
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  {link.href.startsWith("/") ? (
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block border-b border-white/10 py-4 text-2xl font-medium tracking-tight text-zinc-100"
                    >
                      <span className="mr-3 font-mono text-sm text-zinc-600">
                        0{i + 1}
                      </span>
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block border-b border-white/10 py-4 text-2xl font-medium tracking-tight text-zinc-100"
                    >
                      <span className="mr-3 font-mono text-sm text-zinc-600">
                        0{i + 1}
                      </span>
                      {link.label}
                    </a>
                  )}
                </motion.li>
              ))}
              <li className="pt-6">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium bg-primary text-black hover:bg-primary/90 transition-colors"
                >
                  Let&apos;s Talk <ArrowUpRight className="h-5 w-5" />
                </a>
              </li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
