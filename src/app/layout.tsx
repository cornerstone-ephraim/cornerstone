import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import ScrollProgress from "@/components/layout/scroll-progress";
import ScrollToTop from "@/components/layout/scroll-to-top";
import StructuredData from "@/components/common/structured-data";
import {
  getContactContent,
  getHomeContent,
  getNavigationContent,
} from "@/lib/content";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const home = getHomeContent();

export const metadata: Metadata = {
  title: home.seo.title,
  description: home.seo.description,
  metadataBase: new URL("https://cornerstoneephraim.vercel.app"),
  openGraph: {
    title: home.seo.title,
    description: home.seo.description,
    url: "/",
    siteName: "Cornerstone Ephraim",
    images: [home.seo.monogram!, home.seo.image!],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@4th_ephraim",
    title: home.seo.title,
    description: home.seo.description,
    images: [home.seo.monogram!, home.seo.image!],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
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
        <ScrollProgress />
        <Navbar content={navigation} />
        <main>{children}</main>
        <ScrollToTop />
        <Footer navigation={navigation} contact={contact} />
      </body>
    </html>
  );
}
