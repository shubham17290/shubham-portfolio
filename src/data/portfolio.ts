import {
  Code2,
  Palette,
  Server,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const siteConfig = {
  name: "John Doe",
  role: "Full-Stack Developer",
  tagline: "I build minimal, premium web experiences.",
  description:
    "Full-stack developer based in San Francisco with 5+ years of experience crafting fast, accessible, and delightful products for startups and global brands.",
  location: "San Francisco, CA",
  email: "hello@johndoe.dev",
  availability: "Available for freelance",
  resumeUrl: "#",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const socials = [
  { label: "GitHub", href: "https://github.com", icon: "Github" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
  { label: "Twitter", href: "https://x.com", icon: "Twitter" },
  { label: "Dribbble", href: "https://dribbble.com", icon: "Dribbble" },
] as const;

export const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "48+", label: "Projects Shipped" },
  { value: "20+", label: "Happy Clients" },
  { value: "12k+", label: "GitHub Stars" },
];

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
    title: "Design",
    description: "Minimal systems with premium feel.",
    icon: Palette,
    skills: [
      { name: "Figma / Prototyping", level: 90 },
      { name: "Design Systems", level: 88 },
      { name: "Motion Design", level: 82 },
      { name: "Accessibility", level: 93 },
    ],
  },
  {
    title: "Tools & DevOps",
    description: "Ship fast, ship safely.",
    icon: Wrench,
    skills: [
      { name: "Git / GitHub Actions", level: 91 },
      { name: "Docker / AWS", level: 80 },
      { name: "Vercel / Edge", level: 92 },
      { name: "Testing (Vitest/Playwright)", level: 84 },
    ],
  },
];

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

export const aboutParagraphs = [
  "I'm John — a full-stack developer who loves the intersection of engineering and design. I specialize in Next.js, TypeScript, and design systems that scale from MVP to millions of users.",
  "Previously I led frontend at two YC startups and shipped products used by 500k+ people. Now I help teams build fast, accessible, premium web experiences — from idea to production.",
];

export const experience = [
  {
    role: "Senior Frontend Engineer",
    company: "Acme Inc.",
    period: "2022 — Present",
    description: "Leading design system and Next.js platform serving 500k users.",
  },
  {
    role: "Full-Stack Developer",
    company: "Startup XYZ",
    period: "2020 — 2022",
    description: "Built MVP to Series A, owned web app, API and infra.",
  },
  {
    role: "UI Engineer",
    company: "Freelance",
    period: "2019 — 2020",
    description: "Shipped 20+ marketing sites and dashboards for global clients.",
  },
];
