import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, THEME_INIT_SCRIPT } from "@/lib/theme";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import BackToTop from "@/components/BackToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://aks-builds.github.io";
const TITLE = "Aditya Kumar Singh — Quality & Performance Engineer";
const DESCRIPTION =
  "SDET with 3.5+ years building test automation, performance engineering, and observability for enterprise insurance platforms. Open to remote roles and international relocation.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Aditya Kumar Singh",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aditya Kumar Singh",
  url: SITE_URL,
  jobTitle: "Software Development Engineer in Test (SDET)",
  worksFor: { "@type": "Organization", name: "NashTech Ltd, UK" },
  address: { "@type": "PostalAddress", addressLocality: "Greater Noida", addressCountry: "IN" },
  sameAs: [
    "https://github.com/aks-builds",
    "https://linkedin.com/in/its-aks",
    "https://www.npmjs.com/~aks-builds",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <SmoothScroll>
            <CursorGlow />
            <ScrollProgress />
            <Nav />
            <main>{children}</main>
            <Footer />
            <BackToTop />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
