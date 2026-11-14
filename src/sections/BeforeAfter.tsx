import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal, SectionHeading } from "../components/Reveal";

/** Интерактивный ползунок «до / после» на рентген-снимке. */
export function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [pos, setPos] = useState(58);
  const [dragging, setDragging] = useState(false);
  const interacted = useRef(false);
  const stopIntro = useRef<(() => void) | null>(null);
  const x = useMotionValue(58);
  const lineX = useTransform(x, (v) => `${v}%`);
  const reduce = useReducedMotion();

  // Короткая демонстрация движения, когда блок впервые появляется на экране.
  useEffect(() => {
    if (!inView || reduce || interacted.current) return;
    const controls = animate(x, [58, 38, 72, 58], {
      duration: 3.2,
      delay: 0.35,
      ease: "easeInOut",
      onUpdate: (value) => setPos(value),
    });
    stopIntro.current = () => controls.stop();
    return () => controls.stop();
  }, [inView, reduce, x]);

  const updatePosition = useCallback((value: number) => {
    const clamped = Math.min(96, Math.max(4, value));
    setPos(clamped);
    x.set(clamped);
  }, [x]);

  const updateFromPointer = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    updatePosition(((clientX - rect.left) / rect.width) * 100);
  }, [updatePosition]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    interacted.current = true;
    stopIntro.current?.();
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromPointer(e.clientX);
  };

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker="Визуализация"
          title="Одно движение — и суть NeuroScan понятна"
          lead="Двигайте ползунок: слева — снимок, как его видит глаз врача. Справа — то, что видит нейросеть."
        />

        <Reveal className="mt-14">
          <div
            ref={ref}
            className={`relative mx-auto max-w-3xl cursor-ew-resize touch-none select-none overflow-hidden rounded-3xl border bg-emerald-950 transition-shadow duration-500 ${dragging ? "border-emerald-400/60 shadow-[0_45px_100px_-35px_rgba(16,185,129,0.5)]" : "border-emerald-900/15 shadow-[0_50px_100px_-40px_rgba(15,60,40,0.5)]"}`}
            onPointerDown={onPointerDown}
            onPointerMove={(e) => { if (dragging) updateFromPointer(e.clientX); }}
            onPointerUp={() => setDragging(false)}
            onPointerCancel={() => setDragging(false)}
            role="slider"
            aria-label="Сравнение снимка до и после анализа нейросетью"
            aria-valuenow={Math.round(pos)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuetext={`${Math.round(pos)} процентов обычного снимка`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                e.preventDefault();
                interacted.current = true;
                stopIntro.current?.();
                updatePosition(pos + (e.key === "ArrowLeft" ? -4 : 4));
              }
            }}
          >
            <img
              src="assets/xray-marked.png"
              alt="Рентген-снимок с разметкой нейросети: зоны риска подсвечены зелёным"
              className="block w-full"
              draggable={false}
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <img
                src="assets/xray-plain.png"
                alt="Обычный рентген-снимок без разметки"
                className="block h-full w-full max-w-none object-cover"
                draggable={false}
              />
            </div>

            <motion.div
              className="pointer-events-none absolute inset-y-0 z-10 w-[3px] -translate-x-1/2 bg-white shadow-[0_0_24px_rgba(52,211,153,0.85)]"
              style={{ left: lineX }}
            >
              <motion.div
                animate={{ scale: dragging ? 1.15 : 1 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                style={{ x: "-50%", y: "-50%" }}
                className="absolute left-1/2 top-1/2 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-emerald-600 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
              >
                {!reduce && !interacted.current && (
                  <span className="absolute inset-[-8px] animate-ping rounded-full border border-emerald-300/70" />
                )}
                <MoveHorizontal size={24} color="white" strokeWidth={2.4} aria-hidden="true" />
              </motion.div>
            </motion.div>

            <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1.5 text-[10px] font-bold tracking-wide text-white backdrop-blur sm:left-4 sm:top-4 sm:px-3.5 sm:text-xs">
              До · обычный снимок
            </span>
            <span className="absolute right-3 top-3 rounded-full bg-emerald-600/90 px-3 py-1.5 text-[10px] font-bold tracking-wide text-white backdrop-blur sm:right-4 sm:top-4 sm:px-3.5 sm:text-xs">
              После · анализ NeuroScan
            </span>

            <motion.div
              animate={{ opacity: pos > 78 ? 0 : 1, scale: pos > 78 ? 0.9 : 1 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-none absolute right-[5%] top-[22%] rounded-xl border border-emerald-400/50 bg-black/70 px-3 py-2 backdrop-blur sm:right-[14%] sm:top-[26%]"
            >
              <div className="text-[9px] font-bold uppercase tracking-wider text-emerald-300 sm:text-[10px]">
                Легочный узел · вероятность
              </div>
              <div className="font-mono-num text-lg font-bold text-white">94,2%</div>
            </motion.div>

            <motion.div
              animate={{ opacity: dragging ? 0 : 1, y: dragging ? 8 : 0 }}
              className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-black/55 px-4 py-2 text-[10px] font-bold text-white backdrop-blur sm:text-xs"
            >
              <MoveHorizontal size={15} className="text-emerald-300" /> Потяните ползунок
            </motion.div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-5 flex max-w-3xl items-center gap-3 px-2 text-xs font-semibold text-emerald-950/45">
            <span>Обычный снимок</span>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-emerald-100">
              <motion.div className="h-full rounded-full bg-emerald-500" animate={{ width: `${pos}%` }} transition={{ duration: 0.1 }} />
            </div>
            <span>Разметка ИИ</span>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-emerald-950/50">
            На клинических испытаниях NeuroScan снизил долю пропущенных мелких новообразований
            и микротрещин в 2,5 раза — именно те находки, которые чаще всего теряются
            в конце тяжёлой смены.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
