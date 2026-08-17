"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { NavigationContent } from "@/lib/types";

type MobileNavProps = {
  id: string;
  content: NavigationContent;
  open: boolean;
  onCloseAction: () => void;
};

export default function MobileNav({
  id,
  content,
  open,
  onCloseAction,
}: MobileNavProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : originalOverflow;

    if (open) {
      requestAnimationFrame(() => closeButtonRef.current?.focus());
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseAction();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusableElements = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCloseAction, open]);

  const activeHref = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id={id}
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          initial={
            shouldReduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }
          }
          animate={
            shouldReduceMotion ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }
          }
          exit={
            shouldReduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }
          }
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.55,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="fixed inset-0 z-[60] flex min-h-dvh flex-col bg-canvas-dark px-5 pb-8 text-canvas-light sm:px-8 md:hidden"
        >
          <div className="flex items-center justify-between h-20">
            <Link
              href="/"
              onClick={onCloseAction}
              className="text-lg font-semibold capitalize tracking-[-0.035em]"
            >
              {content.brand}
            </Link>

            <button
              type="button"
              aria-label="Close navigation"
              ref={closeButtonRef}
              onClick={onCloseAction}
              className="grid size-11 place-items-center rounded-full border border-ink-inverse/20 bg-canvas-dark text-ink-inverse md:hidden"
            >
              <X className="size-5" />
            </button>
          </div>

          <motion.div
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{
              hidden: {},
              show: {
                transition: {
                  delayChildren: 0.2,
                  staggerChildren: 0.08,
                },
              },
            }}
            className="flex flex-1 flex-col items-center justify-center"
          >
            {content.items.map((item) => {
              const active = activeHref(item.href);

              return (
                <motion.div
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 34 },
                    show: { opacity: 1, y: shouldReduceMotion ? 0 : 0 },
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0.01 : 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={onCloseAction}
                    className={`block text-center text-[clamp(3.25rem,15vw,5.6rem)] font-black capitalize leading-[0.82] tracking-[-0.08em] ${
                      active ? "text-canvas-light" : "text-ink-secondary"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ delay: 0.5, duration: 0.35 }}
            className="pb-3 text-center text-sm font-semibold capitalize tracking-[-0.02em]"
          >
            ©2026 {content.brand}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
