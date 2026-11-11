import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Reveal, SectionHeading } from "../components/Reveal";

const steps = [
  {
    id: "upload",
    num: "01",
    title: "Загрузка",
    short: "Из PACS — автоматически и по шифрованному каналу",
    text: "Снимок из локальной PACS-системы клиники автоматически и в зашифрованном виде отправляется в закрытый контур NeuroScan по VPN. Данные пациента обезличиваются до отправки.",
    points: ["Интеграция с любой PACS по DICOM", "VPN-контур, обезличивание снимков", "Без установки нового софта на рабочие станции"],
  },
  {
    id: "analyze",
    num: "02",
    title: "Анализ",
    short: "Сверка с базой из 5 000 000+ верифицированных снимков",
    text: "Нейросеть обрабатывает кадр, сверяясь с базой из более чем 5 000 000 клинических изображений, размеченных практикующими врачами-рентгенологами. Анализ занимает до 30 секунд.",
    points: ["Обучение на разметке практикующих врачей", "Поиск новообразований, микротрещин, очагов", "Чувствительность 94,8%, специфичность 92,1%"],
  },
  {
    id: "result",
    num: "03",
    title: "Результат",
    short: "Тепловая карта и готовый текст для врача",
    text: "Врач открывает снимок в привычном интерфейсе: видит тепловую карту вероятности патологий и готовый черновик текста заключения. Врач проверяет, редактирует и подписывает.",
    points: ["Зоны риска подсвечены контуром", "Черновик заключения за 30 секунд", "Финальное слово всегда за врачом"],
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section id="how" className="scroll-mt-24 bg-gradient-to-b from-emerald-50/70 to-transparent py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker="Технология"
          title="Как это работает — три простых шага"
          lead="От снимка в PACS до готового черновика заключения — меньше минуты. Без изменения привычного рабочего процесса врача."
        />

        {/* табы */}
        <Reveal className="mt-14">
          <div className="mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-full border border-emerald-900/10 bg-white p-1.5 shadow-sm" role="tablist" aria-label="Шаги работы NeuroScan">
            {steps.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-colors duration-300 md:px-7 ${
                  active === i ? "text-white" : "text-emerald-950/55 hover:text-emerald-800"
                }`}
              >
                {active === i && (
                  <motion.span
                    layoutId="how-pill"
                    className="absolute inset-0 rounded-full bg-emerald-700"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span className="font-mono-num text-xs opacity-70">{s.num}</span>
                  {s.title}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* содержимое шага */}
        <div className="relative mx-auto mt-10 max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.99 }}
              transition={{ duration: 0.45, ease }}
              className="rounded-3xl border border-emerald-900/10 bg-white p-8 shadow-[0_30px_70px_-30px_rgba(15,60,40,0.3)] md:p-12"
            >
              <div className="flex items-start gap-5">
                <div className="font-mono-num hidden text-6xl font-bold text-emerald-100 md:block">
                  {steps[active].num}
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold tracking-tight text-emerald-950 md:text-3xl">
                    {steps[active].title}
                  </h3>
                  <p className="mt-1.5 text-sm font-semibold text-emerald-600">
                    {steps[active].short}
                  </p>
                  <p className="mt-4 leading-relaxed text-emerald-950/65">{steps[active].text}</p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                    {steps[active].points.map((pt, j) => (
                      <motion.li
                        key={pt}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + j * 0.1, duration: 0.4, ease }}
                        className="flex items-start gap-2.5 rounded-2xl bg-emerald-50/80 p-4 text-sm font-medium leading-snug text-emerald-900"
                      >
                        <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <circle cx="8" cy="8" r="7" fill="#059669" opacity="0.15" />
                          <path d="M5 8.5 L7 10.5 L11 6" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {pt}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* индикатор прогресса */}
          <div className="mx-auto mt-8 flex w-fit items-center gap-2">
            {steps.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                aria-label={`Шаг ${i + 1}: ${s.title}`}
                className="group p-1.5"
              >
                <span
                  className={`block rounded-full transition-all duration-500 ${
                    i === active ? "w-10 bg-emerald-600" : "w-4 bg-emerald-900/15 group-hover:bg-emerald-900/30"
                  } h-1.5`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
