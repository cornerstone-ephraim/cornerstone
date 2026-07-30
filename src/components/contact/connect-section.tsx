"use client";

import { motion } from "motion/react";
import Link from "next/link";
import type { ComponentType } from "react";
import { LuArrowUpRight } from "react-icons/lu";

type ConnectItem = {
  id: number;
  social: string;
  url: string;
  icon: ComponentType<{ size?: number }>;
};

export default function ConnectSection({
  items,
  className = "",
}: {
  items: ConnectItem[];
  className?: string;
}) {
  return (
    <motion.div
      className={`w-full flex flex-col md:flex-row align-baseline md:space-x-6 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="w-full md:w-1/5 font-semibold text-lg text-zinc-900 dark:text-zinc-100"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Connect
      </motion.h2>

      <motion.div
        className="w-full md:w-4/5"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="font-medium text-zinc-900 dark:text-zinc-100">
          Reach out! I&apos;d love to chat.
        </p>

        <div className="flex flex-wrap gap-4 mt-4">
          {items.map((el, index) => {
            const Icon = el.icon;
            const href =
              el.social === "Email"
                ? "mailto:thecornerstoneephraim@gmail.com"
                : `https://${el.url}`;

            return (
              <motion.div
                key={`connect-${el.id}`}
                className="w-full sm:w-[48%]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-lg border transition-colors
                             border-zinc-300 dark:border-zinc-800
                             hover:bg-zinc-100/70 dark:hover:bg-[#0f0f0f]
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-3 text-blue-800 dark:text-blue-400">
                      <Icon size={40} />
                      <span className="font-medium">{el.social}</span>
                    </div>
                    <LuArrowUpRight
                      className="text-blue-800 dark:text-blue-400"
                      size={20}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
