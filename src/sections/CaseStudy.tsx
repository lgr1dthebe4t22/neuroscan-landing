import { motion } from "framer-motion";
import { Counter } from "../components/Counter";
import { Reveal, SectionHeading } from "../components/Reveal";

const caseStats = [
  { to: 40, suffix: " мин", label: "было: заключение по КТ лёгких" },
  { to: 18, suffix: " мин", label: "стало после внедрения NeuroScan" },
  { to: 27, suffix: "", label: "ранних онкологических находок за 3 месяца" },
];

export function CaseStudy() {
  return (
    <section id="case" className="scroll-mt-24 bg-gradient-to-b from-transparent to-emerald-50/70 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker="Социальное доказательство"
          title="Опыт сети клиник «МедикалСкан»"
          lead="Пилот в трёх диагностических центрах сети, 3 месяца работы, 14 000+ исследований."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <figure className="relative h-full rounded-3xl border border-emerald-900/10 bg-white p-8 md:p-12">
              <svg
                className="absolute left-8 top-8 text-emerald-100"
                width="72"
                height="72"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M10 8c-3.3 0-6 2.7-6 6v2h5v-5H6.5C6.8 9.6 8.2 8.5 10 8.5V8zm10 0c-3.3 0-6 2.7-6 6v2h5v-5h-2.5c.3-1.4 1.7-2.5 3.5-2.5V8z" />
              </svg>
              <blockquote className="relative mt-12">
                <p className="text-xl font-semibold leading-relaxed tracking-tight text-emerald-950 md:text-2xl">
                  «Внедрение NeuroScan позволило сократить время выдачи заключений по КТ лёгких
                  с 40 до 18 минут. За три месяца система помогла выявить{" "}
                  <span className="text-emerald-700">27 ранних стадий онкологии</span> — находки,
                  которые уставший персонал мог бы пропустить в ночную смену. Врачи восприняли
                  систему не как конкурента, а как надёжного ассистента».
                </p>
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-700 text-lg font-extrabold text-white">
                  КС
                </div>
                <div>
                  <div className="font-extrabold text-emerald-950">Кирилл Самарин</div>
                  <div className="text-sm text-emerald-950/55">
                    Заведующий отделением лучевой диагностики, сеть «МедикалСкан»
                  </div>
                </div>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex h-full flex-col justify-between gap-5">
              {caseStats.map((s) => (
                <motion.div
                  key={s.label}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="flex-1 rounded-3xl bg-emerald-900 p-7"
                >
                  <div className="text-4xl font-extrabold tracking-tight text-emerald-300">
                    <Counter to={s.to} suffix={s.suffix} />
                  </div>
                  <div className="mt-1.5 text-sm text-emerald-100/65">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
