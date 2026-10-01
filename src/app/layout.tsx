import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import ScrollProgress from "@/components/ScrollProgress";

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
    default: "Shubham Maurya — Full-Stack Developer & Designer",
    template: "%s | Shubham Maurya"
  },

  description:
    "Portfolio of Shubham Maurya, a full-stack developer crafting minimal, premium web experiences with Next.js, TypeScript, and modern design.",

  keywords: [
    "Shubham Maurya",
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
      name: "Shubham Maurya",
      url: "https://example.com"
    }
  ],

  creator: "Shubham Maurya",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://example.com",
    siteName: "Shubham Maurya — Portfolio",
    title: "Shubham Maurya — Full-Stack Developer & Designer",
    description:
      "I build minimal, premium web experiences with Next.js, TypeScript and thoughtful design.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Shubham Maurya — Portfolio"
      }
    ]
  },

  twitter: {
    card: "summary_large_image",
    title: "Shubham Maurya — Full-Stack Developer",
    description:
      "Minimal, premium web experiences built with Next.js and TypeScript.",
    images: ["/opengraph-image"]
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
    icon: "/favicon.svg",
  },

  alternates: {
    canonical: "/",
  },
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
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shubham Maurya",
    jobTitle: "Full-Stack Developer",
    knowsAbout: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"]
  };

  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[var(--color-bg)] font-sans text-[var(--color-text)] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <div className="relative min-h-screen bg-[var(--color-bg)]">
          <ScrollProgress />
          <BackgroundBlobs />
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
