import { Container } from "@/components/layout/container";
import { ProjectCover } from "@/components/project/project-cover";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import type { ProjectContent } from "@/lib/types";

export function ProjectDetail({ project }: { project: ProjectContent }) {
  const caseStudy = project.caseStudy ?? {
    overview: [project.summary],
    role: project.responsibilities,
    challenges: project.highlights,
    approach: project.responsibilities,
    outcome: [project.shortDescription],
  };

  return (
    <section className="bg-canvas-light py-28 text-ink-primary sm:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:items-start">
          <SectionLabel>Overview</SectionLabel>
          <Reveal>
            <div className="max-w-5xl space-y-8">
              {caseStudy.overview.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={
                    index === 0
                      ? "text-[clamp(2.35rem,4.8vw,5.2rem)] font-medium leading-[1] tracking-[-0.06em]"
                      : "max-w-3xl text-lg leading-8 text-ink-muted sm:text-xl sm:leading-9"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        {caseStudy.pullQuote ? (
          <Reveal>
            <blockquote className="my-24 border-y border-ink-primary/15 py-10 text-[clamp(2.4rem,5vw,5.8rem)] font-medium leading-[0.95] tracking-[-0.065em] sm:my-32 sm:py-14">
              “{caseStudy.pullQuote}”
            </blockquote>
          </Reveal>
        ) : null}

        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <StickyPanel project={project} role={caseStudy.role} />
          </Reveal>

          <div className="space-y-20 sm:space-y-28">
            <CaseSection
              label="Challenges"
              title="What needed to be solved."
              items={caseStudy.challenges}
            />
            <CaseSection
              label="Approach"
              title="How the work was structured."
              items={caseStudy.approach}
            />
            <CaseSection
              label="Outcome"
              title="What the experience became."
              items={caseStudy.outcome}
              large
            />
          </div>
        </div>

        <Reveal>
          <div className="mt-28 sm:mt-36">
            <SectionLabel>Project image</SectionLabel>
            <ProjectCover project={project} className="mt-10 aspect-[16/8]" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function StickyPanel({
  project,
  role,
}: {
  project: ProjectContent;
  role: string[];
}) {
  return (
    <aside className="lg:sticky lg:top-28">
      <div className="rounded-[28px] border border-ink-primary/10 bg-surface-light p-6 sm:p-8">
        <DetailList title="Role" items={role} />
        <div className="mt-10">
          <DetailList
            title="Technologies"
            items={project.technologies}
            compact
          />
        </div>
      </div>
    </aside>
  );
}

function CaseSection({
  label,
  title,
  items,
  large = false,
}: {
  label: string;
  title: string;
  items: string[];
  large?: boolean;
}) {
  return (
    <Reveal>
      <section className="border-t border-ink-primary/15 pt-8">
        <div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr]">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
            {label}
          </h2>
          <div>
            <h3 className="max-w-2xl text-[clamp(2rem,4vw,4rem)] font-medium leading-[0.95] tracking-[-0.055em]">
              {title}
            </h3>
            <div className="mt-8 space-y-5">
              {items.map((item) => (
                <p
                  key={item}
                  className={
                    large
                      ? "text-xl leading-9 text-ink-primary sm:text-2xl sm:leading-10"
                      : "text-lg leading-8 text-ink-muted"
                  }
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

function DetailList({
  title,
  items,
  compact = false,
}: {
  title: string;
  items: string[];
  compact?: boolean;
}) {
  return (
    <div>
      <h2 className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
        {title}
      </h2>
      <ul
        className={
          compact
            ? "mt-5 flex flex-wrap gap-2"
            : "mt-6 border-t border-ink-primary/10"
        }
      >
        {items.map((item, index) =>
          compact ? (
            <li
              key={item}
              className="rounded-full border border-ink-primary/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em]"
            >
              {item}
            </li>
          ) : (
            <li
              key={item}
              className="flex gap-5 border-b border-ink-primary/10 py-4 text-base leading-7"
            >
              <span className="font-mono text-[10px] text-ink-secondary">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item}
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
