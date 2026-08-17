import Link from "next/link";
import { Container } from "@/components/layout/container";
import type { ContactContent, NavigationContent } from "@/lib/types";

export default function Footer({
  navigation,
  contact,
}: {
  navigation: NavigationContent;
  contact: ContactContent;
}) {
  const emailSubject = "Project inquiry for Cornerstone Ephraim";

  return (
    <footer className="bg-canvas-dark py-16 text-ink-inverse sm:py-20">
      <Container>
        <div className="grid gap-12 border-b border-ink-inverse/15 pb-16 md:grid-cols-4">
          <div>
            <p className="text-xl font-semibold tracking-[-0.04em]">{navigation.brand}</p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-ink-inverse/50">
              {navigation.footerDescription}
            </p>
          </div>
          <div>
            <p className="footer-label">Navigation</p>
            <div className="mt-5 flex flex-col gap-3">
              {navigation.items.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-ink-inverse/70 hover:text-ink-inverse">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="footer-label">Connect</p>
            <div className="mt-5 flex flex-col gap-3">
              {contact.socials.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink-inverse/70 hover:text-ink-inverse"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="footer-label">Contact Me</p>
            <Link
              href={`mailto:${contact.email}?subject=${encodeURIComponent(emailSubject)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block break-all text-sm text-ink-inverse/70 hover:text-ink-inverse"
            >
              {contact.email}
            </Link>
            <a
              href={contact.resume.href}
              target="_blank"
              rel="noopener noreferrer"
              download="Cornerstone_Ephraim_Resume.pdf"
              className="mt-3 block text-sm text-ink-inverse/70 hover:text-ink-inverse"
            >
              {contact.resume.label}
            </a>
            <Link
              href={contact.scheduler.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-sm text-ink-inverse/70 hover:text-ink-inverse"
            >
              {contact.scheduler.label}
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-7 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-inverse/55 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Cornerstone Ephraim</span>
          <span>Designed and built with intention</span>
        </div>
      </Container>
    </footer>
  );
}
