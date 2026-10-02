import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import ScrollProgress from "@/components/ScrollProgress";
import LoadingScreen from "@/components/LoadingScreen";
import EasterEggs from "@/components/EasterEggs";
import BackToTop from "@/components/BackToTop";
import LazyWidgets from "@/components/LazyWidgets";

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
  metadataBase: new URL("https://shubham-maurya-seven.vercel.app"),

  title: "Shubham Maurya — Full-Stack Developer & AI Intern at IBM",

  description:
    "Portfolio of Shubham Maurya, Full-Stack Developer and AI Intern at IBM. Building minimal, premium web experiences with Next.js, React, TypeScript, and AI.",

  keywords: [
    "Shubham Maurya",
    "Full-Stack Developer",
    "Next.js Developer",
    "React Developer",
    "AI Intern",
    "IBM Intern",
    "Portfolio",
    "Kanpur Developer"
  ],

  authors: [
    {
      name: "Shubham Maurya",
      url: "https://shubham-maurya-seven.vercel.app"
    }
  ],

  creator: "Shubham Maurya",

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://shubham-maurya-seven.vercel.app",
    siteName: "Shubham Maurya — Portfolio",
    title: "Shubham Maurya — Full-Stack Developer & AI Intern at IBM",
    description:
      "Portfolio of Shubham Maurya, Full-Stack Developer and AI Intern at IBM. Building minimal, premium web experiences with Next.js, React, TypeScript, and AI.",
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
    title: "Shubham Maurya — Full-Stack Developer & AI Intern at IBM",
    description:
      "Portfolio of Shubham Maurya, Full-Stack Developer and AI Intern at IBM. Building minimal, premium web experiences with Next.js, React, TypeScript, and AI.",
    images: ["/opengraph-image"],
    creator: "@shubh_1729"
  },

  robots: {
    index: true,
    follow: true
  },

  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg"
  },

  manifest: "/manifest.json",

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
      <body className={`${inter.variable} bg-[var(--color-bg)] font-sans text-[var(--color-text)] antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <div className="relative min-h-screen bg-[var(--color-bg)]">
          <LoadingScreen />
          <ScrollProgress />
          <BackgroundBlobs />
          <EasterEggs />
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
          <BackToTop />
          <LazyWidgets />
        </div>
      </body>
    </html>
  );
}
