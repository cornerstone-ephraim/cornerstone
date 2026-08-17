import type { Metadata } from "next";
import { Download } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import {
  getAboutContent,
  getExperienceContent,
  getHomeContent,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const content = getAboutContent();

export const metadata: Metadata = {
  ...buildMetadata({
    title: content.seo.title,
    description: content.seo.description,
    path: "/about",
    image: content.portrait,
    imageAlt: content.portraitAlt,
    keywords: [
      "About Cornerstone Ephraim",
      "Frontend Engineering",
      "Product Thinking",
      "User Experience",
    ],
  }),
};

export default function AboutPage() {
  const home = getHomeContent();

  return (
    <>
      <section className="bg-canvas-dark py-20 text-ink-inverse sm:py-28">
        <Container>
          <SectionLabel className="text-ink-inverse/60">{content.label}</SectionLabel>
          <Reveal>
            <h1 className="mt-16 max-w-6xl text-[clamp(4rem,9vw,9rem)] font-medium leading-[0.86] tracking-[-0.07em]">
              {content.heading}
            </h1>
          </Reveal>
          <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-end">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-surface-dark">
                <Image
                  src={content.portrait}
                  alt={content.portraitAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top grayscale"
                />
              </div>
            </Reveal>
            <Reveal className="space-y-6 pb-2">
              {content.introduction.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-3xl text-xl leading-9 text-ink-inverse/65 sm:text-2xl sm:leading-10"
                >
                  {paragraph}
                </p>
              ))}
              <a
                href={content.resume.href}
                target="_blank"
                rel="noopener noreferrer"
                download="Cornerstone_Ephraim_Resume.pdf"
                className="button button-ghost-dark motion-link mt-4"
              >
                {content.resume.label}
                <Download />
              </a>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-canvas-light py-24 sm:py-32">
        <Container>
          <div className="section-heading">
            <SectionLabel>Principles</SectionLabel>
            <Reveal>
              <h2>How I approach the work.</h2>
            </Reveal>
          </div>
          <div className="grid border-t border-ink-primary/15 md:grid-cols-2 lg:grid-cols-4">
            {content.principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 0.06}>
                <article className="min-h-64 border-b border-ink-primary/15 py-8 md:border-b-0 md:border-r md:px-8 first:pl-0 last:border-r-0">
                  <p className="font-mono text-[10px] text-ink-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-14 text-3xl font-medium tracking-[-0.04em]">
                    {principle.title}
                  </h3>
                  <p className="mt-4 max-w-sm leading-7 text-ink-muted">
                    {principle.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-24 items-start grid gap-16 border-t border-ink-primary/15 pt-12 lg:grid-cols-[1fr_1.6fr]">
            <SectionLabel>Working style</SectionLabel>
            <Reveal>
              <div className="space-y-6">
                {content.workingStyle.map((item) => (
                  <p key={item} className="max-w-3xl text-xl leading-9 text-ink-muted sm:text-2xl sm:leading-10">
                    {item}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="mt-24 grid gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-[28px] bg-surface-light p-6 sm:p-8">
                <SectionLabel>Industries</SectionLabel>
                <div className="mt-8 flex flex-wrap gap-3">
                  {content.industries.map((industry) => (
                    <span
                      key={industry}
                      className="rounded-full border border-ink-primary/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em]"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="rounded-[28px] bg-surface-light p-6 sm:p-8">
                <SectionLabel>Tools</SectionLabel>
                <div className="mt-8 flex flex-wrap gap-3">
                  {content.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-ink-primary/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-24 grid items-start gap-12 border-t border-ink-primary/15 pt-12 lg:grid-cols-[0.9fr_1.5fr]">
            <SectionLabel>What I enjoy building</SectionLabel>
            <Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                {content.enjoyBuilding.map((item, index) => (
                  <div key={item} className="rounded-[24px] border border-ink-primary/10 p-5 sm:p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-secondary">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-8 text-xl font-medium leading-7 tracking-[-0.035em]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <ExperienceSection
        label={home.experience.label}
        heading={home.experience.heading}
        experience={getExperienceContent()}
      />
      <ContactSection content={home.contact} />
    </>
  );
}
