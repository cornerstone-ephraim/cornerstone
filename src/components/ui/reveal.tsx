"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  blur = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  blur?: boolean;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 44, filter: blur ? "blur(10px)" : "none" }}
      whileInView={{ opacity: 1, y: 0, filter: "none" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
