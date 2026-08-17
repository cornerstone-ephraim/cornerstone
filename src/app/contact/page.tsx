import type { Metadata } from "next";
import { ArrowUpRight, Download } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { getContactContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const content = getContactContent();
const emailSubject = "Project inquiry for Cornerstone Ephraim";

export const metadata: Metadata = {
  ...buildMetadata({
    title: content.seo.title,
    description: content.seo.description,
    path: "/contact",
    keywords: [
      "Contact Cornerstone Ephraim",
      "Hire Frontend Engineer",
      "Freelance Frontend Developer",
      "Technical Consulting",
    ],
  }),
};

export default function ContactPage() {
  return (
    <section className="bg-canvas-light py-20 text-ink-primary sm:py-28">
      <Container>
        <SectionLabel>{content.label}</SectionLabel>
        <div className="mt-14 grid gap-16 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <Reveal>
            <div>
              <h1 className="max-w-2xl text-[clamp(3.5rem,7vw,7rem)] font-medium leading-[0.88] tracking-[-0.065em]">
                {content.heading}
              </h1>
              <p className="mt-8 max-w-md text-lg leading-8 text-ink-muted">
                {content.description}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            {/*<div className="rounded-[28px] border border-ink-primary/10 bg-surface-light p-6 sm:p-8 lg:p-10">*/}
            <div>
              <ContactRow label="Email">
                <Link
                  href={`mailto:${content.email}?subject=${encodeURIComponent(emailSubject)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 break-all text-xl font-medium tracking-[-0.035em] sm:text-2xl"
                >
                  {content.email}
                  <ArrowUpRight className="size-5" />
                </Link>
              </ContactRow>

              <ContactRow label="Schedule">
                <Link
                  href={content.scheduler.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xl font-medium tracking-[-0.035em] sm:text-2xl"
                >
                  {content.scheduler.label}
                  <ArrowUpRight className="size-5" />
                </Link>
              </ContactRow>

              <ContactRow label="Resume">
                <a
                  href={content.resume.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Cornerstone_Ephraim_Resume.pdf"
                  className="inline-flex items-center gap-2 text-xl font-medium tracking-[-0.035em] sm:text-2xl"
                >
                  {content.resume.label}
                  <Download className="size-5" />
                </a>
              </ContactRow>

              <div className="pt-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                  Elsewhere
                </p>
                <div className="mt-5 flex flex-wrap gap-4">
                  {content.socials.map((social) => (
                    <Link
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink-primary/10 px-4 py-2 text-sm transition-colors hover:border-ink-primary/25"
                    >
                      {social.label}
                      <ArrowUpRight className="size-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function ContactRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-ink-primary/10 py-7 first:pt-0">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
        {label}
      </p>
      {children}
    </div>
  );
}
