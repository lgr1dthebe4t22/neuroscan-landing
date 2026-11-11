import { motion } from "framer-motion";
import { useMemo, useState, type CSSProperties } from "react";
import { Reveal, SectionHeading } from "../components/Reveal";

type RangeStyle = CSSProperties & { "--range-progress": string };

function RangeField({ id, label, value, min, max, step, suffix = "", onChange }: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  const progress = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <label htmlFor={id} className="flex items-center justify-between gap-4 text-sm font-semibold text-emerald-950/70">
        {label}
        <motion.span
          key={value}
          initial={{ scale: 0.92, backgroundColor: "rgb(209 250 229)" }}
          animate={{ scale: 1, backgroundColor: "rgb(236 253 245)" }}
          className="font-mono-num whitespace-nowrap rounded-lg px-3 py-1 text-emerald-800"
        >
          {value.toLocaleString("ru-RU")}{suffix}
        </motion.span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="neuro-range mt-4"
        style={{ "--range-progress": `${progress}%` } as RangeStyle}
      />
      <div className="mt-1.5 flex justify-between text-[10px] font-semibold text-emerald-950/30">
        <span>{min.toLocaleString("ru-RU")}{suffix}</span><span>{max.toLocaleString("ru-RU")}{suffix}</span>
      </div>
    </div>
  );
}

/** Калькулятор окупаемости для главного врача. */
export function Economy() {
  const [scansPerDay, setScansPerDay] = useState(60);
  const [avgPrice, setAvgPrice] = useState(2500);
  const [radiologists, setRadiologists] = useState(2);
  const [minutesPerScan, setMinutesPerScan] = useState(10);

  const calc = useMemo(() => {
    const minutesSavedPerScan = minutesPerScan * 0.4;
    const hoursSavedPerDay = (scansPerDay * minutesSavedPerScan) / 60;
    const extraCapacity = Math.round(scansPerDay * 0.35);
    const freedHoursMonth = Math.round(hoursSavedPerDay * 22);
    const potentialRevenue = extraCapacity * avgPrice * 22;
    const salaryPerHour = 700;
    const savedCost = Math.round(hoursSavedPerDay * salaryPerHour * 22);
    const roi = Math.max(1, Math.round((potentialRevenue * 0.3 + savedCost) / 45000));
    return {
      hoursSavedPerDay: hoursSavedPerDay.toFixed(1),
      freedHoursMonth,
      potentialRevenue,
      savedCost,
      roi,
      extraCapacity,
      perDoctor: Math.round(scansPerDay / radiologists),
    };
  }, [scansPerDay, avgPrice, radiologists, minutesPerScan]);

  return (
    <section id="economy" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker="Экономика"
          title="Язык цифр для главного врача"
          lead="Двигайте ползунки — калькулятор пересчитает эффект для вашей клиники в реальном времени."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <div className="h-full rounded-3xl border border-emerald-900/10 bg-white p-6 md:p-10">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-extrabold text-emerald-950">Параметры вашего отделения</h3>
                <span className="hidden rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-700 sm:block">Изменения видны сразу</span>
              </div>
              <div className="mt-8 space-y-7">
                <RangeField id="scans" label="Снимков в день" value={scansPerDay} min={10} max={200} step={5} onChange={setScansPerDay} />
                <RangeField id="price" label="Средний чек исследования" value={avgPrice} min={800} max={8000} step={100} suffix=" ₽" onChange={setAvgPrice} />
                <RangeField id="docs" label="Рентгенологов в штате" value={radiologists} min={1} max={10} step={1} onChange={setRadiologists} />
                <RangeField id="minutes" label="Время описания сейчас" value={minutesPerScan} min={5} max={30} step={1} suffix=" мин" onChange={setMinutesPerScan} />
              </div>
              <div className="mt-7 rounded-2xl bg-emerald-50 px-4 py-3 text-xs leading-relaxed text-emerald-900/60">
                Сейчас каждый врач описывает примерно <strong className="text-emerald-800">{calc.perDoctor} исследований в день</strong>. Расчёт использует ускорение описания на 40%.
              </div>
              <p className="mt-5 text-xs leading-relaxed text-emerald-950/40">
                Оценка носит модельный характер и зависит от специализации отделения.
                Точный расчёт для вашей клиники сделает наш медицинский инженер на демо.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative h-full overflow-hidden rounded-3xl bg-emerald-900 p-6 md:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ backgroundImage: "radial-gradient(rgba(52,211,153,0.12) 1px, transparent 1px)", backgroundSize: "20px 20px" }}
              />
              <h3 className="relative text-lg font-extrabold text-white">Эффект в месяц</h3>

              <div className="relative mt-7 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-100/60">
                  <span>Исследований в день</span><span className="font-mono-num text-emerald-300">+{calc.extraCapacity}</span>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-14 text-[10px] text-emerald-100/45">Сейчас</span>
                    <div className="h-2 flex-1 rounded-full bg-white/10">
                      <motion.div className="h-full rounded-full bg-white/25" animate={{ width: `${(scansPerDay / (scansPerDay + calc.extraCapacity)) * 100}%` }} />
                    </div>
                    <span className="font-mono-num w-8 text-right text-xs text-white/60">{scansPerDay}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-14 text-[10px] text-emerald-200">С ИИ</span>
                    <div className="h-2 flex-1 rounded-full bg-white/10">
                      <motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300" animate={{ width: "100%" }} transition={{ type: "spring", stiffness: 100, damping: 20 }} />
                    </div>
                    <span className="font-mono-num w-8 text-right text-xs font-bold text-emerald-300">{scansPerDay + calc.extraCapacity}</span>
                  </div>
                </div>
              </div>

              <div className="relative mt-6 space-y-5">
                {[
                  { v: `${calc.hoursSavedPerDay} ч`, l: "экономии врачебного времени в день" },
                  { v: calc.freedHoursMonth.toLocaleString("ru-RU"), l: "врачебных часов освобождается в месяц" },
                  { v: `≈ ${calc.potentialRevenue.toLocaleString("ru-RU")} ₽`, l: "потенциал дополнительной выручки от роста пропускной способности (+35%)" },
                  { v: `≈ ${calc.savedCost.toLocaleString("ru-RU")} ₽`, l: "экономия на переработках и ночных сменах" },
                ].map((row) => (
                  <div key={row.l} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                    <motion.div
                      key={row.v}
                      initial={{ opacity: 0.4, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="font-mono-num text-2xl font-bold text-emerald-300 md:text-3xl"
                    >
                      {row.v}
                    </motion.div>
                    <div className="mt-1 text-xs leading-relaxed text-emerald-100/60">{row.l}</div>
                  </div>
                ))}
              </div>

              <div className="relative mt-6 rounded-2xl bg-emerald-500/15 p-4 text-center">
                <span className="text-sm font-bold text-emerald-200">Окупаемость системы — порядка {calc.roi} мес</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
