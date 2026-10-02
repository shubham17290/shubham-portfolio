"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  User,
  Code2,
  FolderGit2,
  Mail,
  Newspaper,
  Github,
  Linkedin,
  Twitter,
  Dribbble,
  Copy,
  Download,
  SunMoon,
  CornerDownLeft,
} from "lucide-react";
import { siteConfig, navLinks, projects, links } from "@/lib/data";

const navigateIcons: Record<string, typeof Home> = {
  "#home": Home,
  "#about": User,
  "#skills": Code2,
  "#projects": FolderGit2,
  "#contact": Mail,
  "/blog": Newspaper,
};

const socialEntries = [
  { label: "GitHub", href: links.github, Icon: Github },
  { label: "LinkedIn", href: links.linkedin, Icon: Linkedin },
  { label: "Twitter", href: links.twitter, Icon: Twitter },
  { label: "LeetCode", href: links.leetcode, Icon: Code2 },
  { label: "Dribbble", href: links.dribbble, Icon: Dribbble },
];

function scrollToSection(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  else window.location.hash = href;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpenEvent = () => setOpen(true);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open ]);

  const runNavigate = (href: string) => {
    close();
    if (href.startsWith("/")) {
      // Pathname route (e.g. /blog) — client-side navigation
      setTimeout(() => router.push(href), 80);
      return;
    }
    // Hash anchor — smooth scroll on the home page
    setTimeout(() => scrollToSection(href), 80);
  };

  const runProject = (title: string) => {
    close();
    setTimeout(() => {
      scrollToSection("#projects");
      // Ask Projects section to open the modal for this project
      window.dispatchEvent(new CustomEvent("open-project", { detail: title }));
    }, 350);
  };

  const runSocial = (href: string) => {
    close();
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const runCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
    } catch {
      /* clipboard unavailable */
    }
    close();
  };

  const runDownloadResume = () => {
    const a = document.createElement("a");
    a.href = siteConfig.resumeUrl;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();
    close();
  };

  const runToggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    close();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={close}
          className="fixed inset-0 z-[80] flex items-start justify-center bg-black/60 p-4 pt-[12vh] backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e11]/95 shadow-2xl backdrop-blur-xl"
          >
            <Command
              label="Command palette"
              className="[&_[cmdk-input]]:w-full"
            >
              <div className="flex items-center gap-2 border-b border-white/[0.07] px-4">
                <Command.Input
                  autoFocus
                  placeholder="Type a command or search..."
                  className="h-12 w-full bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-600"
                />
                <kbd className="hidden shrink-0 items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 sm:inline-flex">
                  ESC
                </kbd>
              </div>
              <Command.List className="max-h-[320px] overflow-y-auto p-2">
                <Command.Empty className="px-3 py-8 text-center text-sm text-zinc-500">
                  No results found.
                </Command.Empty>

                <Command.Group
                  heading="Navigate"
                  className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:text-zinc-600"
                >
                  {navLinks.map((link) => {
                    const Icon = navigateIcons[link.href] ?? Home;
                    return (
                      <Command.Item
                        key={link.href}
                        value={`Navigate ${link.label}`}
                        onSelect={() => runNavigate(link.href)}
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 outline-none data-[selected='true']:bg-white/[0.07] data-[selected='true']:text-white aria-selected:bg-white/[0.07]"
                      >
                        <Icon className="h-4 w-4 text-zinc-500" />
                        {link.label}
                        <CornerDownLeft className="ml-auto h-3.5 w-3.5 text-zinc-600" />
                      </Command.Item>
                    );
                  })}
                </Command.Group>

                <Command.Group
                  heading="Projects"
                  className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:text-zinc-600"
                >
                  {projects.map((p) => (
                    <Command.Item
                      key={p.title}
                      value={`Project ${p.title} ${p.tags.join(" ")}`}
                      onSelect={() => runProject(p.title)}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 outline-none data-[selected='true']:bg-white/[0.07] data-[selected='true']:text-white aria-selected:bg-white/[0.07]"
                    >
                      <FolderGit2 className="h-4 w-4 text-zinc-500" />
                      {p.title}
                      <span className="ml-auto font-mono text-[11px] text-zinc-600">
                        {p.year}
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group
                  heading="Social"
                  className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:text-zinc-600"
                >
                  {socialEntries.map(({ label, href, Icon }) => (
                    <Command.Item
                      key={label}
                      value={`Social ${label}`}
                      onSelect={() => runSocial(href)}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 outline-none data-[selected='true']:bg-white/[0.07] data-[selected='true']:text-white aria-selected:bg-white/[0.07]"
                    >
                      <Icon className="h-4 w-4 text-zinc-500" />
                      {label}
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group
                  heading="Actions"
                  className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:text-zinc-600"
                >
                  <Command.Item
                    value="Action Copy email"
                    onSelect={runCopyEmail}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 outline-none data-[selected='true']:bg-white/[0.07] data-[selected='true']:text-white aria-selected:bg-white/[0.07]"
                  >
                    <Copy className="h-4 w-4 text-zinc-500" />
                    Copy email
                  </Command.Item>
                  <Command.Item
                    value="Action Download resume"
                    onSelect={runDownloadResume}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 outline-none data-[selected='true']:bg-white/[0.07] data-[selected='true']:text-white aria-selected:bg-white/[0.07]"
                  >
                    <Download className="h-4 w-4 text-zinc-500" />
                    Download resume
                  </Command.Item>
                  <Command.Item
                    value="Action Toggle theme"
                    onSelect={runToggleTheme}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 outline-none data-[selected='true']:bg-white/[0.07] data-[selected='true']:text-white aria-selected:bg-white/[0.07]"
                  >
                    <SunMoon className="h-4 w-4 text-zinc-500" />
                    Toggle theme
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
