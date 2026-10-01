import {
  Code2,
  Server,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/* ── Site ─────────────────────────────────────────── */
// TODO: replace email + social URLs below with your real info.
export const siteConfig = {
  name: "Shubham",
  role: "Full-Stack Developer",
  tagline: "I build minimal, premium web experiences.",
  description:
    "Full-stack developer working with Next.js, React, TypeScript, Tailwind CSS, and Node.js. Focused on minimal, premium, modern web experiences.",
  // No location provided — left empty on purpose (components hide it when empty).
  location: "",
  email: "your-email@example.com",
  availability: "Available for freelance",
  resumeUrl: "#",
};

/* ── Nav ──────────────────────────────────────────── */
export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

/* ── Socials / links ──────────────────────────────── */
export const socials = [
  { label: "GitHub", href: "https://github.com", icon: "Github" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
  { label: "Twitter", href: "https://x.com", icon: "Twitter" },
  { label: "Dribbble", href: "https://dribbble.com", icon: "Dribbble" },
] as const;

export const links = {
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://x.com",
  email: "your-email@example.com",
};

/* ── Stats ────────────────────────────────────────── */
// TODO: replace "—" with your real numbers.
export const stats = [
  { value: "—", label: "Years Experience" },
  { value: "—", label: "Projects Completed" },
  { value: "—", label: "Happy Clients" },
];

/* ── Skills ───────────────────────────────────────── */
export type SkillCategory = {
  title: string;
  description: string;
  icon: LucideIcon;
  skills: { name: string; level: number }[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    description: "Pixel-perfect, accessible interfaces.",
    icon: Code2,
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Tailwind CSS", level: 94 },
      { name: "Framer Motion", level: 88 },
    ],
  },
  {
    title: "Backend",
    description: "Scalable APIs and data layers.",
    icon: Server,
    skills: [
      { name: "Node.js", level: 90 },
      { name: "PostgreSQL / Prisma", level: 86 },
      { name: "tRPC / REST", level: 89 },
      { name: "Redis / Queues", level: 78 },
    ],
  },
  {
    title: "Tools",
    description: "Ship fast, ship safely.",
    icon: Wrench,
    skills: [
      { name: "Git / GitHub Actions", level: 91 },
      { name: "Docker / AWS", level: 80 },
      { name: "Vercel / Edge", level: 92 },
      { name: "Figma / Testing", level: 86 },
    ],
  },
];

// Flat list for simple UIs — replace with your own
export const skills = [
  "Next.js",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Framer Motion",
  "Figma",
];

/* ── Projects ─────────────────────────────────────── */
export type Project = {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  githubUrl: string;
  liveUrl: string;
  featured?: boolean;
  year: string;
};

export const projects: Project[] = [
  {
    title: "Lumen Dashboard",
    description:
      "Analytics platform with real-time charts, command palette, and edge caching. 40% faster TTI after migration to RSC.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Recharts"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
    year: "2025",
  },
  {
    title: "Nimbus Commerce",
    description:
      "Headless storefront with ISR, Stripe checkout, and 98+ Lighthouse scores across all pages.",
    tags: ["Next.js", "Stripe", "Sanity", "Vercel"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
    year: "2024",
  },
  {
    title: "Pulse Chat",
    description:
      "End-to-end encrypted chat with presence, typing indicators, and offline-first sync.",
    tags: ["React", "WebSockets", "Redis", "Postgres"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    year: "2024",
  },
  {
    title: "Astra Portfolio Kit",
    description:
      "Minimal portfolio starter with MDX blog, OG generation, and dark-mode design tokens.",
    tags: ["Next.js", "MDX", "Tailwind v4"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    year: "2023",
  },
  {
    title: "Forge Forms",
    description:
      "Drag-and-drop form builder with conditional logic, webhooks, and CSV export.",
    tags: ["TypeScript", "tRPC", "Prisma"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    year: "2023",
  },
  {
    title: "Orbit Docs",
    description:
      "Collaborative docs with live cursors, version history, and AI summaries.",
    tags: ["React", "Yjs", "AI SDK"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    year: "2022",
  },
];

/* ── About ────────────────────────────────────────── */
export const aboutParagraphs = [
  "I'm Shubham — a full-stack developer working with Next.js, React, TypeScript, Tailwind CSS, and Node.js. I focus on building minimal, premium, modern web experiences that are fast, accessible, and easy to maintain.",
  "I enjoy turning ideas into polished, responsive interfaces with clean, type-safe code — and I'm always learning and improving my craft.",
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
};

// TODO: add your real experience here. No placeholder companies included.
export const experience: Experience[] = [];
