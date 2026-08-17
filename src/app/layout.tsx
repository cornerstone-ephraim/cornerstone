import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import ScrollProgress from "@/components/layout/scroll-progress";
import ScrollToTop from "@/components/layout/scroll-to-top";
import StructuredData from "@/components/common/structured-data";
import {
  getContactContent,
  getNavigationContent,
} from "@/lib/content";
import {
  DEFAULT_SEO_IMAGE,
  DEFAULT_SEO_MONOGRAM,
  SITE_AUTHOR,
  SITE_NAME,
  SITE_URL,
  buildMetadata,
} from "@/lib/seo";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${SITE_NAME} | Product-minded Frontend Engineer`,
    description:
      "Frontend engineer building modern interfaces, digital products, and experiences for startups, technology companies, and ambitious founders.",
    image: DEFAULT_SEO_IMAGE,
    imageAlt: SITE_AUTHOR,
  }),
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileImage": DEFAULT_SEO_MONOGRAM,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = getNavigationContent();
  const contact = getContactContent();

  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <meta name="author" content="Cornerstone Ephraim" />
        <StructuredData />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ScrollProgress />
        <Navbar content={navigation} />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <ScrollToTop />
        <Footer navigation={navigation} contact={contact} />
      </body>
    </html>
  );
}
