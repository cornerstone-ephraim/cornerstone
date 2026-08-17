import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/sections/contact-section";
import { ProjectDetail } from "@/components/project/project-detail";
import { ProjectHero } from "@/components/project/project-hero";
import { ProjectNavigation } from "@/components/project/project-navigation";
import { getAllProjects, getHomeContent, getProjectBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.seo.title,
    description: project.seo.description,
    path: `/projects/${project.slug}`,
    image: project.cover.image,
    imageAlt: project.cover.alt,
    type: "article",
    keywords: [
      project.title,
      project.category,
      project.industry,
      project.role,
      ...project.highlights,
      ...project.technologies,
    ],
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const projects = getAllProjects();

  return (
    <>
      <ProjectHero project={project} />
      <ProjectDetail project={project} />
      <ProjectNavigation current={project} projects={projects} />
      <ContactSection content={getHomeContent().contact} />
    </>
  );
}
