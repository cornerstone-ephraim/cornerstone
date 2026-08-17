import type { Metadata } from "next";

export const SITE_URL = "https://cornerstoneephraim.vercel.app";
export const SITE_NAME = "Cornerstone Ephraim";
export const SITE_AUTHOR = "Cornerstone Ephraim";
export const SITE_TWITTER = "@4th_ephraim";
export const DEFAULT_SEO_IMAGE = "/cornerstone.webp";
export const DEFAULT_SEO_MONOGRAM = "/cornerstone-monogram.webp";

const DEFAULT_KEYWORDS = [
  "Cornerstone Ephraim",
  "Frontend Engineer",
  "Product Engineer",
  "React",
  "Next.js",
  "TypeScript",
  "Product Websites",
  "Frontend Development",
  "Digital Products",
];

type BuildMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_SEO_IMAGE,
  imageAlt = SITE_AUTHOR,
  keywords = [],
  type = "website",
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const mergedKeywords = Array.from(new Set([...DEFAULT_KEYWORDS, ...keywords]));

  return {
    title,
    description,
    applicationName: `${SITE_NAME} Portfolio`,
    authors: [{ name: SITE_AUTHOR, url: SITE_URL }],
    creator: SITE_AUTHOR,
    publisher: SITE_AUTHOR,
    keywords: mergedKeywords,
    category: "portfolio",
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          alt: imageAlt,
        },
      ],
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      creator: SITE_TWITTER,
      title,
      description,
      images: [
        {
          url: image,
          alt: imageAlt,
        },
      ],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
