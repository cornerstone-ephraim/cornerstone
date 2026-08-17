"use client";

import { ArrowRight, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { NavigationContent } from "@/lib/types";
import MobileNav from "./mobile-nav";

export default function Navbar({ content }: { content: NavigationContent }) {
  const pathname = usePathname();
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;

      setHidden(scrollingDown && currentScrollY > 96);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeHref = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-ink-inverse/10 bg-canvas-dark text-ink-inverse backdrop-blur transition-transform duration-300 ease-out ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav className="mx-auto flex h-20 w-full items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="text-lg font-semibold tracking-[-0.035em]"
          onClick={() => setOpen(false)}
        >
          {content.brand}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {content.items.map((item) => {
            const active = activeHref(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors hover:text-ink-inverse ${
                  active ? "text-ink-inverse" : "text-ink-inverse/55"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <Link
          className="hidden min-h-10 items-center justify-center gap-2 rounded-[14px] bg-surface-light px-4 text-sm font-medium text-ink-primary transition-transform duration-200 hover:-translate-y-0.5 lg:inline-flex"
          href={content.cta.href}
        >
          {content.cta.label}
          <ArrowRight className="size-4" />
        </Link>

        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-controls={menuId}
          aria-expanded={open}
          ref={menuButtonRef}
          onClick={() => setOpen((value) => !value)}
          className="grid size-11 place-items-center rounded-full border border-ink-inverse/20 md:hidden"
        >
          <Menu className="size-5" />
        </button>
      </nav>

      <MobileNav
        id={menuId}
        content={content}
        open={open}
        onCloseAction={() => {
          setOpen(false);
          requestAnimationFrame(() => menuButtonRef.current?.focus());
        }}
      />
    </header>
  );
}
