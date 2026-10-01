import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),
  title: {
    default: "John Doe — Full-Stack Developer & Designer",
    template: "%s | John Doe",
  },
  description:
    "Portfolio of John Doe, a full-stack developer crafting minimal, premium web experiences with Next.js, TypeScript, and modern design. Based in San Francisco, working worldwide.",
  keywords: [
    "portfolio",
    "full-stack developer",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "web developer",
    "frontend",
    "UI design",
  ],
  authors: [{ name: "John Doe", url: "https://your-domain.com" }],
  creator: "John Doe",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    siteName: "John Doe — Portfolio",
    title: "John Doe — Full-Stack Developer & Designer",
    description:
      "I build minimal, premium web experiences with Next.js, TypeScript and thoughtful design.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "John Doe — Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "John Doe — Full-Stack Developer",
    description:
      "Minimal, premium web experiences built with Next.js and TypeScript.",
    creator: "@yourhandle",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} bg-[#09090b] text-zinc-100 antialiased`}
      >
        <div className="relative min-h-screen bg-[#09090b]">
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
