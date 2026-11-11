import { motion } from "framer-motion";
import { Reveal, SectionHeading } from "../components/Reveal";

const pains = [
  {
    title: "Перегрузка врачей",
    text: "До 100 снимков в смену. К концу дня «замыливается» глаз — растёт риск пропустить мелкое новообразование.",
  },
  {
    title: "Дефицит кадров в регионах",
    text: "Квалифицированный рентгенолог на место — месяцы поиска. Пациенты ждут расшифровки КТ и МРТ неделями.",
  },
  {
    title: "Клиника теряет деньги",
    text: "Низкая пропускная способность отделения — это сорванные направления, ушедшие пациенты и недовольные страховые.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Pain() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker="Проблема"
          title="Региональная диагностика работает на пределе"
          lead="Человеческий фактор — не слабость врача, а следствие системной перегрузки. NeuroScan берёт рутину на себя."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="group h-full rounded-3xl border border-emerald-900/10 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-emerald-600/30 hover:shadow-[0_30px_60px_-25px_rgba(15,60,40,0.35)]">
                <div className="font-mono-num text-sm font-semibold text-emerald-600/70">
                  0{i + 1}
                </div>
                <h3 className="mt-3 text-xl font-extrabold tracking-tight text-emerald-950">
                  {p.title}
                </h3>
                <p className="mt-3 leading-relaxed text-emerald-950/60">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* стрелка к решению */}
        <Reveal delay={0.15} className="mt-12">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-emerald-900 p-8 md:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(52,211,153,0.14) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15"
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 3 L12 13 M12 3 L8 7 M12 3 L16 7 M4 15 V19 A2 2 0 0 0 6 21 H18 A2 2 0 0 0 20 19 V15"
                    stroke="#34d399"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                  Решение: первичный скрининг за 15–30 секунд
                </h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-emerald-100/75">
                  Врач получает снимок с уже размеченными триггерными зонами и черновиком
                  описания. Он принимает решение быстрее и увереннее — а ответственность за
                  заключение, как и положено, остаётся у врача.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
