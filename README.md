# Shubham Maurya — Portfolio

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)

Minimal, premium developer portfolio with signature interactive features — an AI chatbot that answers questions about me, a ⌘K command palette, a live terminal hero, GitHub stats, and butter-smooth animations throughout.

**Live:** https://shubham-maurya-seven.vercel.app

## Features

- **AI chatbot** — floating assistant powered by Vercel AI SDK + Google Gemini, with streaming replies, suggested questions, copy buttons, session persistence, and rate limiting
- **Command palette (⌘K / Ctrl+K)** — fuzzy search over navigation, projects, socials, and actions (copy email, download resume, toggle theme)
- **Terminal hero** — floating terminal card with traffic-light dots and a line-by-line typewriter sequence
- **GitHub stats** — live contribution graph (`react-github-calendar`) plus animated repo / star / streak counters with loading skeletons
- **Micro-interactions** — magnetic buttons, 3D-tilt project cards with cursor glow and detail modals, animated skill bars, count-up stats, magnetic navbar underlines, bouncing socials
- **Visual alive feel** — ambient background blobs, scroll progress bar, typewriter roles, staggered section reveals
- **Polish & wow** — first-visit loading screen, Konami-code confetti easter egg, console ASCII art, logo click egg, back-to-top button, smooth anchor scrolling
- **SEO + PWA ready** — metadata/OG/Twitter cards, sitemap, robots, `manifest.json`

## Tech Stack

- **Next.js 15+** (App Router, Turbopack)
- **React** + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (animations)
- **Vercel AI SDK** + **Gemini** (`gemini-2.0-flash`) for the chatbot
- **cmdk** (command palette), **canvas-confetti** (easter egg), **lucide-react** (icons)

## Local Setup

```bash
# 1. Clone
git clone https://github.com/shubham17290/portfolio.git
cd portfolio

# 2. Install
npm install

# 3. Environment — copy the example and add your Gemini key
cp .env.example .env.local
# GOOGLE_GENERATIVE_AI_API_KEY=your_key_here

# 4. Run dev
npm run dev
```

Open http://localhost:3000. Production checks:

```bash
npm run build
npm run lint
npm run start
```

## Folder Structure

```text
src/
  app/
    api/chat/route.ts      # Gemini streaming endpoint (10 req/min/IP)
    api/contact/route.ts   # Contact form endpoint
    layout.tsx             # Metadata, fonts, global widgets
    page.tsx               # Section composition (code-split)
    sitemap.ts / robots.ts # SEO routes
  components/
    Hero.tsx               # Typewriter roles + terminal card
    About.tsx              # Profile + animated stat counters
    Skills.tsx             # Animated skill bars
    Projects.tsx           # 3D tilt cards + detail modals
    GitHubStats.tsx        # Contribution graph + live counters
    Contact.tsx            # Validated form + toast
    ChatWidget.tsx         # AI chatbot panel
    CommandPalette.tsx     # ⌘K palette
    MagneticButton.tsx     # Cursor-following buttons
    LoadingScreen.tsx      # First-visit loader
    EasterEggs.tsx         # Konami + console art
    BackToTop.tsx          # Scroll-to-top
    Navbar.tsx / Footer.tsx / BackgroundBlobs.tsx / ScrollProgress.tsx
  lib/data.ts              # Site content (edit me)
public/
  profile.jpg  manifest.json  resume.pdf  favicon.ico (add)  og-image.png (add)
```

## Credits

Built by **Shubham Maurya** — Full-Stack Developer & AI Intern at IBM.

## License

MIT
