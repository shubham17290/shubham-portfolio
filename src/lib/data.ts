import { Code2, Server, Wrench, type LucideIcon } from "lucide-react";

/* ── Site ─────────────────────────────────────────── */
export const siteConfig = {
  name: "Shubham Maurya",
  role: "Full-Stack Developer",
  tagline: "I design and build fast, AI-powered web experiences.",
  description:
    "Full-stack developer working with Next.js, React, TypeScript, Tailwind CSS, and Node.js. AI intern at IBM. Currently pursuing B.Tech CSE and open to internship opportunities.",
  location: "Kanpur, India",
  locationsOpen: ["Kanpur", "Delhi", "Lucknow", "Noida", "Mumbai", "Gurgaon"],
  email: "smourya1046@gmail.com",
  availability: "Open to Internships",
  resumeUrl: "/resume.pdf",
  currently:
    "🔨 Building PREPForge v2 · 📖 Learning RAG pipelines & AI agents · 📍 Kanpur, India"
};

/* ── Nav ──────────────────────────────────────────── */
export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" }
];

/* ── Socials / links ──────────────────────────────── */
export const socials = [
  { label: "GitHub", href: "https://github.com/shubham17290", icon: "Github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shubham-maurya-99325b380/",
    icon: "Linkedin"
  },
  { label: "Twitter", href: "https://x.com/shubh_1729", icon: "Twitter" },
  {
    label: "Dribbble",
    href: "https://dribbble.com/smourya1046",
    icon: "Dribbble"
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/algoXninja/",
    icon: "Code2"
  }
] as const;

export const links = {
  github: "https://github.com/shubham17290",
  linkedin: "https://www.linkedin.com/in/shubham-maurya-99325b380/",
  twitter: "https://x.com/shubh_1729",
  dribbble: "https://dribbble.com/smourya1046",
  leetcode: "https://leetcode.com/u/algoXninja/",
  portfolio: "https://shubham-maurya-seven.vercel.app",
  email: "smourya1046@gmail.com"
};

/* ── Stats ────────────────────────────────────────── */
export const stats = [
  { value: "1", label: "Year of Coding" },
  { value: "2", label: "Projects Built" },
  { value: "1", label: "AI Internship" }
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
      { name: "React / Next.js", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Framer Motion", level: 75 }
    ]
  },
  {
    title: "Backend",
    description: "Scalable APIs and data layers.",
    icon: Server,
    skills: [
      { name: "Node.js", level: 80 },
      { name: "PostgreSQL / Prisma", level: 72 },
      { name: "REST APIs", level: 82 },
      { name: "MongoDB", level: 75 }
    ]
  },
  {
    title: "AI / Tools",
    description: "Ship fast, ship smart.",
    icon: Wrench,
    skills: [
      { name: "Python for AI", level: 75 },
      { name: "LLMs / Prompting", level: 78 },
      { name: "Git / GitHub", level: 85 },
      { name: "Vercel / Docker", level: 78 }
    ]
  }
];

// Flat list for simple UIs
export const skills = [
  "Next.js",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Node.js",
  "MongoDB",
  "PostgreSQL",
  "Prisma",
  "Python",
  "LLMs / Prompting",
  "Framer Motion",
  "Git / GitHub",
  "Vercel"
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
    title: "PREPForge",
    description:
      "PREPForge is an intelligent PYQ practice platform for GATE CS & IT aspirants — with subject-wise, topic-wise, and year-wise question banks, timed mock tests, MCQ/MSQ/NAT support, and performance analytics. Built with Next.js, TypeScript, Node.js, PostgreSQL, and Prisma.",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    // TODO: apna real repo URL daal
    githubUrl: "https://github.com/shubham17290",
    // TODO: agar deploy kiya hai toh URL daal, warna khali chhod de
    liveUrl: "",
    featured: true,
    year: "2025"
  },
  {
    title: "AI Fitness Coach",
    description:
      "An AI-powered fitness and sports guidance app that delivers personalized workout plans, real-time exercise tracking, and health improvement insights. Features goal-based fitness planning, workout analytics, and AI-based assistance. Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "AI"],
    githubUrl: "https://github.com/shubham17290",
    liveUrl: "",
    featured: true,
    year: "2025"
  }
];

/* ── About ────────────────────────────────────────── */
export const aboutParagraphs = [
  "I'm Shubham — a full-stack developer and final-year B.Tech CSE student at AKTU. I specialize in building AI-powered web applications with Next.js, TypeScript, and modern LLM APIs.",
  "Recently, I completed an AI internship at IBM where I worked on real-world AI development tasks — from prompt engineering to building production features. I love turning complex ideas into simple, beautiful user experiences.",
  "When I'm not coding, I'm training my mind for grit — whether through chess, endurance workouts, or deep-focus reading."
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
};

export const experience: Experience[] = [
  {
    role: "AI Intern",
    company: "IBM",
    period: "June 2026 – August 2026",
    description:
      "Completed an AI internship at IBM, working on AI-driven development tasks, exploring LLM-based workflows, and gaining exposure to enterprise-grade AI tooling and real-world problem solving."
  }
];

export type Education = {
  degree: string;
  institution: string;
  period: string;
  description?: string;
};

export const education: Education[] = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "AKTU",
    period: "Final Year",
    description:
      "Currently in my final year, focusing on full-stack development and DSA."
  }
];
