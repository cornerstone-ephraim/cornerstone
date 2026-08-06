import "server-only";
import fs from "node:fs";
import path from "node:path";
import aboutContent from "@/content/about.json";
import contactContent from "@/content/contact.json";
import experienceContent from "@/content/experience.json";
import homeContent from "@/content/home.json";
import navigationContent from "@/content/navigation.json";
import type {
  AboutContent,
  ContactContent,
  ExperienceContent,
  HomeContent,
  NavigationContent,
  ProjectCategory,
  ProjectContent,
} from "@/lib/types";

const projectDirectory = path.join(process.cwd(), "src/content/projects");

export function getHomeContent() {
  return homeContent as HomeContent;
}

export function getAboutContent() {
  return aboutContent as AboutContent;
}

export function getExperienceContent() {
  return experienceContent as ExperienceContent;
}

export function getContactContent() {
  return contactContent as ContactContent;
}

export function getNavigationContent() {
  return navigationContent as NavigationContent;
}

export function getAllProjects(): ProjectContent[] {
  return fs
    .readdirSync(projectDirectory)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const source = fs.readFileSync(path.join(projectDirectory, file), "utf8");
      return JSON.parse(source) as ProjectContent;
    })
    .filter((project) => project.published !== false)
    .sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects() {
  return getAllProjects().filter((project) => project.featured);
}

export function getProjectBySlug(slug: string) {
  return getAllProjects().find((project) => project.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory) {
  return getAllProjects().filter((project) => project.category === category);
}
