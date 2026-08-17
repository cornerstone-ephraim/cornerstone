import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionLabel } from "@/components/ui/section-label";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Page not found | Cornerstone Ephraim",
  description:
    "The page you are looking for is unavailable. Return to Cornerstone Ephraim's portfolio homepage.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <section className="bg-canvas-light py-16 text-ink-primary sm:py-24">
      <Container>
        <div className="grid min-h-[70svh] gap-12 lg:grid-cols-[0.75fr_1.5fr]">
          <div className="flex flex-col justify-between gap-16">
            <div>
              <SectionLabel>404</SectionLabel>
              <h1 className="mt-12 text-[clamp(3.5rem,7vw,7rem)] font-medium leading-[0.9] tracking-[-0.06em]">
                Looks like you’ve reached unfamiliar territory.
              </h1>
            </div>
            <div>
              <p className="mb-6 max-w-sm text-ink-muted">
                The page you are looking for is unavailable. Return home and continue
                exploring.
              </p>
              <Link className="button bg-canvas-dark text-ink-inverse" href="/">
                Return home
                <ArrowRight />
              </Link>
            </div>
          </div>
          <div className="abstract-art min-h-[520px] overflow-hidden rounded-[28px]" />
        </div>
      </Container>
    </section>
  );
}
