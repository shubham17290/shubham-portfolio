import { Github, Linkedin, Twitter, Dribbble, ArrowUp, Heart } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/data";

const socialIcons = [
  { label: "GitHub", href: "https://github.com", Icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
  { label: "Twitter", href: "https://x.com", Icon: Twitter },
  { label: "Dribbble", href: "https://dribbble.com", Icon: Dribbble },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#08080a]">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-bold text-black">
                S
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-zinc-100">
                {siteConfig.name}
                <span className="text-zinc-500">.dev</span>
              </span>
            </a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-500">
              {siteConfig.tagline}
              {siteConfig.location ? ` Based in ${siteConfig.location}, working worldwide.` : ""}
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="rounded-full px-3.5 py-2 text-sm text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {socialIcons.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-500 transition-all hover:border-white/20 hover:text-white"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
            <a
              href="#home"
              aria-label="Back to top"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-zinc-200"
            >
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-7 sm:flex-row">
          <p className="text-[13px] text-zinc-600">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-[13px] text-zinc-600">
            Built with <Heart className="h-3.5 w-3.5 fill-zinc-600" /> using Next.js, Tailwind & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
