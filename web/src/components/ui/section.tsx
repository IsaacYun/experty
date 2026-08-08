"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px", amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  desc,
  align = "center",
  dark = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  desc?: React.ReactNode;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      {eyebrow && (
        <div
          className={cn(
            "mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold",
            dark ? "bg-white/10 text-brand-200" : "bg-brand-100 text-brand-deep"
          )}
        >
          {eyebrow}
        </div>
      )}
      <h2
        className={cn(
          "text-3xl font-bold leading-[1.16] tracking-[-0.04em] md:text-5xl md:leading-[1.1]",
          dark ? "text-white" : "text-ink-950"
        )}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      {desc && (
        <p className={cn("mt-5 text-base leading-relaxed md:text-lg", dark ? "text-white/60" : "text-ink-500")}>
          {desc}
        </p>
      )}
    </div>
  );
}
