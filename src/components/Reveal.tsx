import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** Плавное появление блока при прокрутке: мягкий подъём + проявление. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Заголовок секции: каскад строк. */
export function SectionHeading({
  kicker,
  title,
  lead,
  dark = false,
}: {
  kicker: string;
  title: string;
  lead?: string;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Reveal>
        <span
          className={`inline-block rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${
            dark
              ? "border-white/20 text-emerald-300"
              : "border-emerald-800/15 bg-emerald-50 text-emerald-800"
          }`}
        >
          {kicker}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`text-balance mt-5 text-3xl font-extrabold leading-tight tracking-tight md:text-5xl ${
            dark ? "text-white" : "text-emerald-950"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.16}>
          <p
            className={`mt-5 text-base leading-relaxed md:text-lg ${
              dark ? "text-emerald-100/70" : "text-emerald-950/60"
            }`}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
