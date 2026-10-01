import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap"
});

export const metadata: Metadata = {
  // TODO: replace "https://example.com" with your real domain when ready.
  metadataBase: new URL("https://example.com"),

  title: {
    default: "Shubh Dev — Full-Stack Developer & Designer",
    template: "%s | Shubh Dev"
  },

  description:
    "Portfolio of Shubh Dev, a full-stack developer crafting minimal, premium web experiences with Next.js, TypeScript, and modern design.",

  keywords: [
    "Shubh Dev",
    "portfolio",
    "full-stack developer",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "web developer",
    "frontend developer",
    "UI design"
  ],

  authors: [
    {
      name: "Shubh Dev",
      url: "https://example.com"
    }
  ],

  creator: "Shubh Dev",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://example.com",
    siteName: "Shubh Dev — Portfolio",
    title: "Shubh Dev — Full-Stack Developer & Designer",
    description:
      "I build minimal, premium web experiences with Next.js, TypeScript and thoughtful design.",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "Shubh Dev — Portfolio"
      }
    ]
  },

  twitter: {
    card: "summary_large_image",
    title: "Shubh Dev — Full-Stack Developer",
    description:
      "Minimal, premium web experiences built with Next.js and TypeScript.",
    images: ["/og.svg"]
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },

  icons: {
    icon: "/favicon.svg"
  }
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[var(--color-bg)] font-sans text-[var(--color-text)] antialiased">
        <div className="relative min-h-screen bg-[var(--color-bg)]">
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
