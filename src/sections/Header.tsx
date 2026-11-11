import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "#how", label: "Как работает" },
  { href: "#trust", label: "Безопасность" },
  { href: "#economy", label: "Экономика" },
  { href: "#case", label: "Кейс" },
];

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label="NeuroScan — на главную">
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill="#0f5132" />
        <path
          d="M6 20 L11 20 L13.5 12 L17 24 L19.5 16 L21.5 20 L26 20"
          stroke="#34d399"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-lg font-extrabold tracking-tight text-emerald-950">
        Neuro<span className="text-emerald-600">Scan</span>
      </span>
    </a>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/85 shadow-[0_8px_40px_-16px_rgba(15,81,50,0.25)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      {/* индикатор прогресса чтения */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[2.5px] origin-left bg-gradient-to-r from-emerald-600 to-emerald-400"
        style={{ scaleX: progress }}
      />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-[72px] md:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Основная навигация">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-emerald-950/70 transition-colors duration-200 hover:text-emerald-700"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#demo"
            className="hidden rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_30px_-10px_rgba(16,122,76,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-[0_16px_36px_-10px_rgba(16,122,76,0.75)] md:inline-block"
          >
            Демо-доступ
          </a>
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-emerald-900/10 bg-white/70 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              {open ? (
                <path d="M5 5 L15 15 M15 5 L5 15" stroke="#0f5132" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M3 6 H17 M3 10 H17 M3 14 H17" stroke="#0f5132" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* мобильное меню */}
      <motion.nav
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden bg-white/95 backdrop-blur-xl md:hidden"
        aria-label="Мобильная навигация"
      >
        <div className="flex flex-col gap-1 px-5 pb-5 pt-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-semibold text-emerald-950/80 transition-colors hover:bg-emerald-50"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#demo"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-xl bg-emerald-700 px-4 py-3 text-center text-base font-bold text-white"
          >
            Демо-доступ
          </a>
        </div>
      </motion.nav>
    </header>
  );
}
