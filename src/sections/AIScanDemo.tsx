import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, FileText, Play, RotateCcw, ScanLine } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "../components/Reveal";

const stages = [
  { at: 0, title: "Снимок загружен", note: "DICOM · обезличенные данные" },
  { at: 25, title: "Анализ структур", note: "Нейросеть изучает исследование" },
  { at: 58, title: "Проверка зон риска", note: "Сравнение с обучающей выборкой" },
  { at: 88, title: "Черновик для врача", note: "Разметка и описание находки" },
];

/** Интерактивная демонстрация интерфейса — не медицинский анализ. */
export function AIScanDemo() {
  const [running, setRunning] = useState(false);
  const [complete, setComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!running) return;
    const startedAt = performance.now();
    const duration = reduce ? 500 : 3600;
    const timer = window.setInterval(() => {
      const next = Math.min(100, ((performance.now() - startedAt) / duration) * 100);
      setProgress(next);
      if (next >= 100) {
        window.clearInterval(timer);
        setRunning(false);
        setComplete(true);
      }
    }, 40);
    return () => window.clearInterval(timer);
  }, [running, reduce]);

  const start = () => {
    setProgress(0);
    setComplete(false);
    setRunning(true);
  };

  const activeStage = complete ? stages.length - 1 : stages.reduce(
    (current, stage, index) => (progress >= stage.at ? index : current),
    0,
  );

  return (
    <section id="scan-demo" className="relative scroll-mt-24 overflow-hidden bg-emerald-950 py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[-20%] h-96 w-96 rounded-full bg-emerald-500/15 blur-[110px]" />
        <div className="absolute bottom-[-25%] right-[5%] h-[420px] w-[420px] rounded-full bg-teal-400/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(rgba(110,231,183,0.15) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
              <ScanLine size={14} aria-hidden="true" /> Интерактивное демо
            </div>
            <h2 className="mt-6 text-balance text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
              Запустите анализ.<br />
              <span className="text-emerald-400">Увидьте находку.</span>
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-emerald-100/65 md:text-lg">
              Пройдите путь исследования вместе с NeuroScan: от загрузки снимка до разметки,
              которую проверит врач-рентгенолог.
            </p>

            <button
              type="button"
              onClick={start}
              disabled={running}
              className="group mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-emerald-400 px-7 py-4 text-base font-extrabold text-emerald-950 shadow-[0_18px_45px_-15px_rgba(52,211,153,0.65)] transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-300 disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0 sm:w-auto"
            >
              {running ? (
                <><span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-900/30 border-t-emerald-950" /> Анализируем снимок…</>
              ) : complete ? (
                <><RotateCcw size={19} className="transition-transform duration-500 group-hover:-rotate-180" /> Запустить ещё раз</>
              ) : (
                <><Play size={19} fill="currentColor" /> Запустить демо-анализ</>
              )}
            </button>
            <p className="mt-4 max-w-md text-xs leading-relaxed text-emerald-100/40">
              Демонстрация интерфейса на учебном изображении. Не является медицинским заключением.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#071d18] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-6">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <span className={`h-2 w-2 rounded-full ${running ? "animate-pulse bg-amber-400" : complete ? "bg-emerald-400" : "bg-white/30"}`} />
                {running ? "Анализ выполняется" : complete ? "Анализ завершён" : "Готов к демонстрации"}
              </div>
              <span className="font-mono-num text-sm text-emerald-300">{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.12, ease: "linear" }}
              />
            </div>

            <div className="grid md:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[320px] overflow-hidden bg-black sm:min-h-[390px]">
                <img
                  src="/assets/xray-plain.png"
                  alt="Учебный рентген-снимок для демонстрации интерфейса"
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />
                <motion.img
                  src="/assets/xray-marked.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover"
                  animate={{ opacity: progress > 55 ? Math.min(1, (progress - 55) / 30) : 0 }}
                  transition={{ duration: 0.25 }}
                  draggable={false}
                />

                <AnimatePresence>
                  {running && (
                    <motion.div
                      key="scan-line"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, top: `${Math.min(96, progress)}%` }}
                      exit={{ opacity: 0 }}
                      transition={{ top: { duration: 0.12, ease: "linear" }, opacity: { duration: 0.2 } }}
                      className="pointer-events-none absolute inset-x-0 top-0 z-10"
                    >
                      <div className="h-16 -translate-y-full bg-gradient-to-t from-emerald-400/20 to-transparent" />
                      <div className="h-[2px] bg-emerald-300 shadow-[0_0_22px_5px_rgba(52,211,153,0.55)]" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {complete && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 240, damping: 20 }}
                      className="absolute bottom-5 left-5 right-5 rounded-2xl border border-emerald-400/35 bg-emerald-950/85 p-4 backdrop-blur-md"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-emerald-950">
                          <Check size={20} strokeWidth={3} />
                        </span>
                        <div>
                          <div className="text-sm font-extrabold text-white">Подозрительная зона отмечена</div>
                          <div className="mt-0.5 text-xs text-emerald-100/60">Ознакомьтесь с разметкой и проверьте находку</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!running && !complete && (
                  <button
                    type="button"
                    onClick={start}
                    className="absolute inset-0 flex items-center justify-center bg-emerald-950/20 transition-colors hover:bg-emerald-950/10"
                    aria-label="Запустить демонстрацию анализа снимка"
                  >
                    <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white shadow-2xl backdrop-blur-md transition-transform duration-300 hover:scale-110">
                      <Play size={30} fill="currentColor" className="ml-1" />
                    </span>
                  </button>
                )}
              </div>

              <div className="p-5 md:p-6">
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-400">Этапы анализа</div>
                <div className="mt-5 space-y-1">
                  {stages.map((stage, index) => {
                    const done = complete || progress >= (stages[index + 1]?.at ?? 100);
                    const active = running && index === activeStage;
                    return (
                      <motion.div
                        key={stage.title}
                        animate={{ opacity: complete || progress >= stage.at ? 1 : 0.35 }}
                        className={`relative flex gap-3 rounded-xl px-3 py-3 transition-colors ${active ? "bg-emerald-400/10" : ""}`}
                      >
                        <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold ${done ? "border-emerald-400 bg-emerald-400 text-emerald-950" : active ? "border-emerald-400 text-emerald-300" : "border-white/20 text-white/50"}`}>
                          {done ? <Check size={13} strokeWidth={3} /> : index + 1}
                        </span>
                        <div>
                          <div className={`text-sm font-bold ${active || done ? "text-white" : "text-white/60"}`}>{stage.title}</div>
                          <div className="mt-0.5 text-[11px] leading-relaxed text-emerald-100/45">{stage.note}</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="mt-5 flex items-start gap-2 border-t border-white/10 pt-4 text-xs leading-relaxed text-emerald-100/50">
                  <FileText size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                  Итоговое заключение всегда проверяет и подписывает врач.
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
