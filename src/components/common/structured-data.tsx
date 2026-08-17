import Script from "next/script";

interface StructuredDataProps {
  type?: "person" | "website";
}

export default function StructuredData({
  type = "person",
}: StructuredDataProps) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Cornerstone Ephraim",
    jobTitle: "Frontend Engineer",
    url: "https://cornerstoneephraim.vercel.app",
    sameAs: [
      "https://github.com/cornerstone-ephraim",
      "https://linkedin.com/in/cornerstone-ephraim",
      "https://x.com/4th_ephraim",
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
      "Web Development",
      "JavaScript",
      "TailwindCSS",
      "Zustand",
      "Playwright",
    ],
    email: "thecornerstoneephraim@gmail.com",
    image: "https://cornerstoneephraim.vercel.app/images/cornerstone.jpg",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Cornerstone Ephraim Portfolio",
    url: "https://cornerstoneephraim.vercel.app",
    description:
      "Frontend Engineer with 3 years experience building scalable, responsive web apps with ReactJS, Next.js, and TypeScript.",
    author: {
      "@type": "Person",
      name: "Cornerstone Ephraim",
    },
  };

  const schema = type === "person" ? personSchema : websiteSchema;

  return (
    <Script id="structured-data" type="application/ld+json">
      {JSON.stringify(schema)}
    </Script>
  );
}
