import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ProjectCover } from "@/components/project/project-cover";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import type { ProjectContent } from "@/lib/types";

export function ProjectHero({ project }: { project: ProjectContent }) {
  return (
    <section className="bg-canvas-dark pb-16 pt-16 text-ink-inverse sm:pb-24 sm:pt-24">
      <Container>
        <SectionLabel className="text-ink-inverse/60">{project.category}</SectionLabel>
        <Reveal>
          <h1 className="mt-14 max-w-6xl text-[clamp(4rem,11vw,10rem)] font-medium leading-[0.82] tracking-[-0.075em]">
            {project.title}
          </h1>
        </Reveal>
        <Reveal className="mb-14 mt-10 grid gap-8 border-t border-ink-inverse/15 pt-8 md:grid-cols-4">
          {[
            ["Industry", project.industry],
            ["Role", project.role],
            ["Status", project.status],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-inverse/40">
                {label}
              </p>
              <p className="mt-2 text-sm text-ink-inverse/80">{value}</p>
            </div>
          ))}
          {(project.website || project.github) && (
            <div className="flex flex-wrap items-center gap-4 md:justify-self-end">
              {project.website ? (
                <Link
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm"
                >
                  Visit live site
                  <ArrowUpRight className="size-4" />
                </Link>
              ) : null}
              {project.github ? (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm"
                >
                  View GitHub
                  <Github className="size-4" />
                </Link>
              ) : null}
            </div>
          )}
        </Reveal>
        <Reveal>
          <ProjectCover project={project} priority className="aspect-[4/3] md:aspect-[16/8]" />
        </Reveal>
      </Container>
    </section>
  );
}
