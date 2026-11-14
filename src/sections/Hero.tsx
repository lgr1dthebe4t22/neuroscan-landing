import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

type Segment = "gov" | "private";

const segmentCopy: Record<
  Segment,
  { chip: string; accent: string }
> = {
  gov: {
    chip: "Работа по ОМС · Отчётность для ТФОМС · Скорость выдачи заключений",
    accent: "государственной больницы",
  },
  private: {
    chip: "Рост среднего чека · Удержание пациентов · Репутация точности",
    accent: "частного диагностического центра",
  },
};

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const [seg, setSeg] = useState<Segment>("gov");
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const tiltInterface = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 5);
    rotateX.set(py * -5);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-28 md:pt-36">
      {/* мягкие зелёные пятна света на фоне */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full bg-emerald-200/40 blur-[120px]" />
        <div className="absolute left-[-12%] top-1/3 h-[480px] w-[480px] rounded-full bg-teal-100/60 blur-[110px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(15,81,50,0.10) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(ellipse 90% 70% at 50% 20%, black, transparent)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* сегментация трафика */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto flex w-fit rounded-full border border-emerald-900/10 bg-white/80 p-1 shadow-sm backdrop-blur"
          role="tablist"
          aria-label="Тип учреждения"
        >
          {(
            [
              ["gov", "Государственным больницам"],
              ["private", "Частным центрам"],
            ] as [Segment, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              role="tab"
              aria-selected={seg === key}
              onClick={() => setSeg(key)}
              className={`relative rounded-full px-4 py-2 text-xs font-bold transition-colors duration-300 md:px-6 md:text-sm ${
                seg === key ? "text-white" : "text-emerald-950/60 hover:text-emerald-800"
              }`}
            >
              {seg === key && (
                <motion.span
                  layoutId="seg-pill"
                  className="absolute inset-0 rounded-full bg-emerald-700 shadow-[0_8px_20px_-8px_rgba(16,122,76,0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </button>
          ))}
        </motion.div>

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
          <motion.div style={{ y: textY, opacity: fade }} className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-700/15 bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-800">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                </span>
                Зарегистрированное медицинское изделие · РУ Росздравнадзора
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="text-balance mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-emerald-950 md:text-6xl"
            >
              Сократите время на описание снимков КТ и рентгена{" "}
              <span className="relative whitespace-nowrap text-emerald-600">
                на 40%
                <svg
                  className="absolute -bottom-1.5 left-0 w-full"
                  viewBox="0 0 120 10"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M2 8 Q 60 1 118 6"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, delay: 1, ease }}
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease }}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-emerald-950/65 md:text-lg lg:mx-0"
            >
              Медицинская нейросеть <strong className="text-emerald-900">NeuroScan</strong> — «второе мнение»
              для {segmentCopy[seg].accent}: находит до 95% скрытых патологий и за 30 секунд
              формирует черновик заключения для врача. ИИ не заменяет врача — он страхует его.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease }}
              className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start sm:justify-center"
            >
              <a
                href="#demo"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-700 px-8 py-4 text-base font-bold text-white shadow-[0_18px_40px_-12px_rgba(16,122,76,0.65)] transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-600 hover:shadow-[0_26px_50px_-12px_rgba(16,122,76,0.7)] sm:w-auto"
              >
                Получить демо-доступ на 14 дней
                <svg
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M4 10 H16 M11 5 L16 10 L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#scan-demo"
                className="inline-flex w-full items-center justify-center rounded-full border border-emerald-900/15 bg-white/70 px-8 py-4 text-base font-bold text-emerald-900 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-emerald-700/40 sm:w-auto"
              >
                Запустить демо-анализ
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-4 text-xs font-medium text-emerald-950/45"
            >
              Требуется подтверждение статуса медицинского работника
            </motion.p>

            <AnimatePresence mode="wait">
              <motion.div
                key={seg}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease }}
                className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-emerald-900/10 bg-white/70 px-4 py-2.5 text-xs font-semibold text-emerald-900/70 backdrop-blur"
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 L14.5 8 L8 14.5 L1.5 8 Z" stroke="#059669" strokeWidth="1.6" />
                  <circle cx="8" cy="8" r="2" fill="#059669" />
                </svg>
                {segmentCopy[seg].chip}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* интерфейс продукта с параллаксом */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.45, ease }}
            style={{ y: imgY }}
            className="relative"
          >
            <motion.div
              onMouseMove={tiltInterface}
              onMouseLeave={resetTilt}
              style={{ rotateX, rotateY, transformPerspective: 1200 }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              className="relative overflow-hidden rounded-3xl border border-emerald-900/10 shadow-[0_50px_100px_-30px_rgba(15,60,40,0.45)] will-change-transform"
            >
              <img
                src="assets/hero-interface.png"
                alt="Интерфейс NeuroScan: КТ грудной клетки с подсвеченной нейросетью зоной риска и черновиком заключения"
                className="block w-full"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
              {!reduce && (
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-emerald-300/10 to-transparent"
                  animate={{ top: ["-15%", "100%"] }}
                  transition={{ duration: 5.5, repeat: Infinity, repeatDelay: 3, ease: "linear" }}
                />
              )}
            </motion.div>

            {/* плавающая карточка точности */}
            <motion.div
              animate={reduce ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-3 bottom-8 rounded-2xl border border-emerald-900/10 bg-white/95 px-5 py-4 shadow-[0_20px_50px_-20px_rgba(15,60,40,0.4)] backdrop-blur md:-left-8"
            >
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-950/50">
                Уверенность находки
              </div>
              <div className="font-mono-num mt-1 text-2xl font-bold text-emerald-700">95%</div>
              <div className="mt-2 h-1.5 w-32 overflow-hidden rounded-full bg-emerald-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "95%" }}
                  transition={{ duration: 1.4, delay: 1.2, ease }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                />
              </div>
            </motion.div>

            {/* плавающая карточка времени */}
            <motion.div
              animate={reduce ? undefined : { y: [0, 10, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute -right-2 top-8 rounded-2xl border border-emerald-900/10 bg-white/95 px-5 py-3.5 shadow-[0_20px_50px_-20px_rgba(15,60,40,0.4)] backdrop-blur md:-right-6"
            >
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-950/50">
                Анализ снимка
              </div>
              <div className="font-mono-num mt-0.5 text-xl font-bold text-emerald-700">30 сек</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
