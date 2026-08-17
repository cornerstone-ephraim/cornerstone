import type { Metadata } from "next";
import { ClientWorkSection } from "@/components/sections/client-work-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ProductsSection } from "@/components/sections/products-section";
import { SelectedWorkSection } from "@/components/sections/selected-work-section";
import {
  getAllProjects,
  getExperienceContent,
  getHomeContent,
  getProjectsByCategory,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const content = getHomeContent();

export const metadata: Metadata = buildMetadata({
  title: content.seo.title,
  description: content.seo.description,
  path: "/",
  image: content.seo.image,
  imageAlt: "Portrait of Cornerstone Ephraim",
  keywords: [
    "Portfolio",
    "Product-minded Frontend Engineer",
    "Client Work",
    "Product Work",
  ],
});

export default function Home() {
  const allProjects = getAllProjects();
  const selected = content.selectedWork.projectSlugs
    .map((slug) => allProjects.find((project) => project.slug === slug))
    .filter((project) => project !== undefined);
  const clientProjects = allProjects.filter(
    (project) =>
      project.category === "Client Work" || project.category === "Digital Experience",
  );

  return (
    <>
      <HeroSection content={content.hero} />
      <SelectedWorkSection content={content.selectedWork} projects={selected} />
      <ClientWorkSection
        label={content.clientWork.label}
        heading={content.clientWork.heading}
        projects={clientProjects}
      />
      <ProductsSection
        label={content.products.label}
        heading={content.products.heading}
        projects={getProjectsByCategory("Product")}
      />
      <ExperienceSection
        label={content.experience.label}
        heading={content.experience.heading}
        experience={getExperienceContent()}
      />
      <ProcessSection content={content.process} />
      <ContactSection content={content.contact} />
    </>
  );
}
