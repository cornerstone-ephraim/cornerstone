import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionLabel } from "@/components/ui/section-label";
import type { HomeContent } from "@/lib/types";

export function HeroSection({ content }: { content: HomeContent["hero"] }) {
  return (
    <section className="bg-canvas-dark pb-8 pt-4 text-ink-inverse sm:pb-12">
      <Container className="max-w-full">
        <div className="hero-stage relative min-h-[calc(100svh-7rem)] overflow-hidden bg-surface-dark">
          <div className="hero-image-reveal absolute inset-0">
            <Image
              src={content.portrait}
              alt={content.portraitAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="hero-portrait object-cover object-[50%_28%] grayscale md:object-[90%_10%]"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-canvas-dark)_98%,transparent)_0%,color-mix(in_srgb,var(--color-canvas-dark)_75%,transparent)_35%,color-mix(in_srgb,var(--color-canvas-dark)_18%,transparent)_78%,color-mix(in_srgb,var(--color-canvas-dark)_38%,transparent)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,color-mix(in_srgb,var(--color-canvas-dark)_80%,transparent)_0%,transparent_50%)] md:hidden" />

          <div className="relative flex min-h-[calc(100svh-7rem)] flex-col justify-between p-6 sm:p-10 lg:p-14">
            <div className="hero-copy-in">
              <SectionLabel className="text-ink-inverse/70">{content.eyebrow}</SectionLabel>
            </div>

            <div className="max-w-5xl py-20">
              <h1 className="text-[clamp(3.65rem,9vw,8.8rem)] font-medium leading-[0.84] tracking-[-0.072em]">
                {content.title.map((line, index) => (
                  <span
                    key={line}
                    className="hero-line-in block"
                    style={{ animationDelay: `${0.16 + index * 0.08}s` }}
                  >
                    <span className={index === 2 ? "text-ink-inverse/45" : ""}>{line}</span>
                  </span>
                ))}
              </h1>
            </div>

            <div className="hero-copy-in grid items-end gap-8 md:grid-cols-[minmax(0,1fr)_420px]">
              <div className="space-y-7">
                <div className="flex flex-wrap gap-3">
                  <Link className="button button-light motion-link" href={content.primaryAction.href}>
                    {content.primaryAction.label}
                    <ArrowRight />
                  </Link>
                  <a
                    className="button button-ghost-dark motion-link"
                    href={content.secondaryAction.href}
                    target={content.secondaryAction.external ? "_blank" : undefined}
                    rel={content.secondaryAction.external ? "noreferrer" : undefined}
                    download="Cornerstone_Ephraim_Resume.pdf"
                  >
                    {content.secondaryAction.label}
                    <Download />
                  </a>
                </div>
                {content.trustSignals?.length ? (
                  <div className="flex max-w-2xl flex-wrap gap-2">
                    {content.trustSignals.map((signal) => (
                      <span
                        key={signal}
                        className="rounded-full border border-ink-inverse/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-inverse/55"
                      >
                        {signal}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <p className="max-w-sm text-base leading-7 text-ink-inverse/65 sm:text-lg">
                {content.description}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
