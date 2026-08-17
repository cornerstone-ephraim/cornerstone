import Script from "next/script";
import {
  DEFAULT_SEO_IMAGE,
  SITE_AUTHOR,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

export default function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_AUTHOR,
    jobTitle: "Frontend Engineer",
    url: SITE_URL,
    sameAs: [
      "https://github.com/Cornerstone-04",
      "https://linkedin.com/in/cornerstone-ephraim",
      "https://x.com/4th_ephraim",
      "https://instagram.com/thecornerstoneephraim",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Moniepoint Inc",
    },
    alumniOf: "Stutern",
    knowsAbout: [
      "ReactJS",
      "Next.js",
      "TypeScript",
      "Frontend Development",
      "Product Engineering",
      "User Experience",
      "Product Websites",
      "Digital Products",
      "Tailwind CSS",
    ],
    email: "thecornerstoneephraim@gmail.com",
    image: `${SITE_URL}${DEFAULT_SEO_IMAGE}`,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${SITE_NAME} Portfolio`,
    url: SITE_URL,
    description:
      "A product-minded frontend engineering portfolio featuring client work, product work, and digital experiences.",
    author: {
      "@type": "Person",
      name: SITE_AUTHOR,
      url: SITE_URL,
    },
  };

  return (
    <Script id="structured-data" type="application/ld+json">
      {JSON.stringify([personSchema, websiteSchema])}
    </Script>
  );
}
