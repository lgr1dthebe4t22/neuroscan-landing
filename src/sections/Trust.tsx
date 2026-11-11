import { motion } from "framer-motion";
import { Counter } from "../components/Counter";
import { Reveal, SectionHeading } from "../components/Reveal";

const stats = [
  { value: 94.8, decimals: 1, suffix: "%", label: "Чувствительность алгоритмов", note: "подтверждено клиническими испытаниями" },
  { value: 92.1, decimals: 1, suffix: "%", label: "Специфичность", note: "минимум ложных тревог для врача" },
  { value: 30, suffix: " сек", label: "Средний анализ снимка", note: "от загрузки до черновика заключения" },
  { value: 5, suffix: " млн+", label: "Верифицированных снимков", note: "в обучающей базе нейросети" },
];

const shields = [
  {
    title: "ФЗ-152 «О персональных данных»",
    text: "Обезличивание снимков перед обработкой, шифрование каналов передачи, регистрация в реестре операторов ПДн.",
  },
  {
    title: "Закрытый контур VPN",
    text: "Интеграция с клиникой по изолированному каналу. Данные не покидают контур медицинской организации без обезличивания.",
  },
  {
    title: "Серверы на территории РФ",
    text: "Все вычисления выполняются на серверах, размещённых на территории Российской Федерации.",
  },
  {
    title: "Регистрационное удостоверение",
    text: "NeuroScan зарегистрирован как медицинское изделие Росздравнадзора — легально для применения в клинической практике.",
  },
];

export function Trust() {
  return (
    <section id="trust" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker="Доверие · Точность · Безопасность"
          title="Медицина не прощает компромиссов"
          lead="Для главного врача критичны три вещи: доказанная точность, юридическая чистота и защита данных пациентов. Мы закрываем все три."
        />

        {/* счётчики */}
        <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="group h-full rounded-3xl border border-emerald-900/10 bg-white p-6 text-center transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-25px_rgba(15,60,40,0.35)] md:p-8">
                <div className="text-4xl font-extrabold tracking-tight text-emerald-700 md:text-5xl">
                  <Counter to={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} />
                </div>
                <div className="mt-3 text-sm font-bold text-emerald-950">{s.label}</div>
                <div className="mt-1.5 text-xs leading-relaxed text-emerald-950/50">{s.note}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* наглядное сравнение показателей до и после */}
        <Reveal delay={0.08} className="mt-8">
          <div className="rounded-3xl border border-emerald-900/10 bg-white p-6 md:p-9">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <h3 className="text-lg font-extrabold text-emerald-950">Изменения в работе отделения</h3>
              <span className="text-xs font-semibold text-emerald-950/40">Данные пилотного внедрения</span>
            </div>
            <div className="mt-7 grid gap-7 md:grid-cols-3 md:gap-8">
              {[
                { label: "Время заключения", before: "40 минут", after: "18 минут", from: 100, to: 45 },
                { label: "Количество ошибок", before: "Исходный уровень", after: "В 2,5 раза меньше", from: 100, to: 40 },
                { label: "Пропускная способность", before: "Исходный уровень", after: "+35%", from: 74, to: 100 },
              ].map((item, index) => (
                <div key={item.label}>
                  <div className="text-sm font-extrabold text-emerald-950">{item.label}</div>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-emerald-950/5">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.12 }}
                        style={{ width: `${item.from}%`, transformOrigin: "left" }}
                        className="h-full rounded-full bg-emerald-950/15"
                      />
                    </div>
                    <span className="w-28 text-right text-[11px] font-semibold text-emerald-950/40">{item.before}</span>
                  </div>
                  <div className="mt-2.5 flex items-center gap-3">
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-emerald-950/5">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.25 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        style={{ width: `${item.to}%`, transformOrigin: "left" }}
                        className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                      />
                    </div>
                    <span className="w-28 text-right text-[11px] font-extrabold text-emerald-700">{item.after}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* паспорт надёжности */}
        <Reveal delay={0.1} className="mt-14">
          <div className="overflow-hidden rounded-3xl bg-emerald-950">
            <div className="grid gap-px bg-emerald-900/40 sm:grid-cols-2 lg:grid-cols-4">
              {shields.map((sh) => (
                <div
                  key={sh.title}
                  className="group bg-emerald-950 p-7 transition-colors duration-500 hover:bg-emerald-900"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 transition-transform duration-500 group-hover:scale-110">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path
                        d="M10 1.5 L16.5 4 V9 C16.5 13.5 13.7 17 10 18.5 C6.3 17 3.5 13.5 3.5 9 V4 Z"
                        stroke="#34d399"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                      />
                      <path d="M7 9.8 L9.2 12 L13 7.6" stroke="#34d399" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-base font-extrabold text-white">{sh.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-emerald-100/60">{sh.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-emerald-950/50">
            NeuroScan — не замена врачу. Это инструмент «второго мнения»: нейросеть
            подсвечивает зоны риска и готовит черновик, а диагноз ставит и подписывает
            врач-рентгенолог. Таковы и этика, и требования регулятора.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
