import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import type { ExperienceContent } from "@/lib/types";

export function ExperienceSection({
  label,
  heading,
  experience,
}: {
  label: string;
  heading: string;
  experience: ExperienceContent;
}) {
  return (
    <section className="bg-surface-light py-24 text-ink-primary sm:py-32">
      <Container>
        <div className="section-heading">
          <SectionLabel>{label}</SectionLabel>
          <Reveal>
            <h2>{heading}</h2>
          </Reveal>
        </div>
        <div className="border-t border-ink-primary/15">
          {experience.items.map((item, index) => (
            <Reveal key={item.company} delay={index * 0.06}>
              <article className="group grid gap-5 border-b border-ink-primary/15 py-8 md:grid-cols-[0.75fr_1.25fr_2fr_auto] md:items-start md:py-10">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink-muted">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="flex items-center gap-4">
                  {item.logo ? (
                    <div
                      className="grid size-12 shrink-0 place-items-center rounded-2xl border border-ink-primary/10 p-2.5"
                      style={{ backgroundColor: item.color }}
                    >
                      <Image
                        src={item.logo}
                        alt={`${item.company} logo`}
                        width={96}
                        height={48}
                        className="max-h-7 w-auto object-contain  transition duration-300 group-hover:opacity-100"
                        
                      />
                    </div>
                  ) : null}
                  <div>
                    <h3 className="text-2xl font-medium tracking-[-0.035em]">
                      {item.company}
                    </h3>
                    <p className="mt-1 text-sm text-ink-muted">{item.role}</p>
                  </div>
                </div>
                <p className="max-w-2xl text-base leading-7 text-ink-muted">
                  {item.description}
                </p>
                {item.url ? (
                  <Link
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${item.company}`}
                    className="rounded-full border border-ink-primary/15 p-3 transition-colors hover:bg-ink-primary hover:text-ink-inverse"
                  >
                    <ArrowUpRight className="size-4" />
                  </Link>
                ) : (
                  <div className="rounded-full border border-ink-primary/15 size-10 transition-colors hover:bg-ink-primary hover:text-ink-inverse" />
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
