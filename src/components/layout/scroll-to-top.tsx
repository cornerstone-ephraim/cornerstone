"use client";

import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setVisible(latest > 720);
    });

    return () => unsubscribe();
  }, [scrollY]);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          aria-label="Scroll to top"
          onClick={scrollToTop}
          initial={
            shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.92 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={
            shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.92 }
          }
          whileHover={shouldReduceMotion ? undefined : { y: -3 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.28,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="fixed bottom-5 right-5 z-50 grid size-12 place-items-center rounded-full border border-ink-inverse/10 bg-canvas-dark text-ink-inverse shadow-lg shadow-ink-primary/20 md:bottom-8 md:right-8"
        >
          <ArrowUp className="size-5" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
