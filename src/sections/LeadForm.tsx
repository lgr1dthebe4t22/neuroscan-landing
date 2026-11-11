import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Reveal, SectionHeading } from "../components/Reveal";

type Errors = Partial<Record<"name" | "phone" | "clinic" | "email", string>>;

export function LeadForm() {
  const [form, setForm] = useState({ name: "", phone: "", clinic: "", email: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [k]: e.target.value });
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Errors = {};
    if (form.name.trim().length < 2) er.name = "Введите имя";
    if (!/^[\d\s()+\-]{10,}$/.test(form.phone.trim())) er.phone = "Введите корректный телефон";
    if (form.clinic.trim().length < 2) er.clinic = "Укажите клинику и должность";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) er.email = "Введите корректный e-mail";
    setErrors(er);
    if (Object.keys(er).length === 0) setSent(true);
  };

  const inputCls = (bad?: string) =>
    `w-full rounded-xl border bg-white px-4 py-3.5 text-base text-emerald-950 placeholder:text-emerald-950/35 outline-none transition-all duration-300 focus:ring-4 ${
      bad
        ? "border-red-400 focus:ring-red-100"
        : "border-emerald-900/15 focus:border-emerald-600 focus:ring-emerald-100"
    }`;

  return (
    <section id="demo" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker="Демонстрация"
          title="Закажите персональную онлайн-демонстрацию для вашей клиники"
          lead="30 минут: покажем систему на реальных (обезличенных) снимках, посчитаем экономику для вашего отделения и ответим на вопросы ваших врачей."
        />

        <Reveal className="mt-14">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[2rem] border border-emerald-900/10 bg-white p-8 shadow-[0_40px_90px_-40px_rgba(15,60,40,0.4)] md:p-12">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="py-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100"
                  >
                    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12.5 L10 17.5 L19 7" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                  <h3 className="mt-6 text-2xl font-extrabold text-emerald-950">Заявка принята!</h3>
                  <p className="mx-auto mt-3 max-w-sm text-emerald-950/60">
                    Наш медицинский инженер свяжется с вами в течение рабочего дня, чтобы
                    согласовать время демонстрации и выслать соглашение о конфиденциальности.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setForm({ name: "", phone: "", clinic: "", email: "" });
                    }}
                    className="mt-8 text-sm font-bold text-emerald-700 underline-offset-4 hover:underline"
                  >
                    Отправить ещё одну заявку
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -12 }}
                  onSubmit={submit}
                  noValidate
                  className="space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="f-name" className="mb-1.5 block text-sm font-bold text-emerald-950">
                        Имя
                      </label>
                      <input id="f-name" className={inputCls(errors.name)} placeholder="Иван Иванов" value={form.name} onChange={set("name")} />
                      {errors.name && <p className="mt-1.5 text-xs font-semibold text-red-600">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="f-phone" className="mb-1.5 block text-sm font-bold text-emerald-950">
                        Телефон
                      </label>
                      <input id="f-phone" type="tel" className={inputCls(errors.phone)} placeholder="+7 (___) ___-__-__" value={form.phone} onChange={set("phone")} />
                      {errors.phone && <p className="mt-1.5 text-xs font-semibold text-red-600">{errors.phone}</p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="f-clinic" className="mb-1.5 block text-sm font-bold text-emerald-950">
                      Клиника и должность
                    </label>
                    <input id="f-clinic" className={inputCls(errors.clinic)} placeholder="ГБ №4, главный врач" value={form.clinic} onChange={set("clinic")} />
                    {errors.clinic && <p className="mt-1.5 text-xs font-semibold text-red-600">{errors.clinic}</p>}
                  </div>
                  <div>
                    <label htmlFor="f-email" className="mb-1.5 block text-sm font-bold text-emerald-950">
                      Корпоративный e-mail
                    </label>
                    <input id="f-email" type="email" className={inputCls(errors.email)} placeholder="i.ivanov@clinic.ru" value={form.email} onChange={set("email")} />
                    {errors.email && <p className="mt-1.5 text-xs font-semibold text-red-600">{errors.email}</p>}
                  </div>

                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-emerald-700 px-8 py-4 text-base font-bold text-white shadow-[0_18px_40px_-12px_rgba(16,122,76,0.6)] transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-600"
                  >
                    Посмотреть систему в действии
                    <svg className="transition-transform duration-300 group-hover:translate-x-1" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M4 10 H16 M11 5 L16 10 L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <p className="text-center text-xs leading-relaxed text-emerald-950/40">
                    Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных (ФЗ-152).
                    Доступ к демо предоставляется после подтверждения статуса медицинского работника.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-emerald-950 pb-10 pt-16 text-emerald-100/60">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2.5">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <rect width="32" height="32" rx="9" fill="#0f5132" />
                <path d="M6 20 L11 20 L13.5 12 L17 24 L19.5 16 L21.5 20 L26 20" stroke="#34d399" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-lg font-extrabold text-white">
                Neuro<span className="text-emerald-400">Scan</span>
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed">
              AI-ассистент врача-рентгенолога. Второе мнение для региональной медицины —
              быстрее, точнее, безопаснее.
            </p>
          </div>

          {/* QR-код на демо */}
          <div className="flex items-center gap-4 rounded-2xl bg-emerald-900/50 p-4">
            <svg width="84" height="84" viewBox="0 0 29 29" aria-label="QR-код демо-версии" role="img">
              {Array.from({ length: 29 }).map((_, r) =>
                Array.from({ length: 29 }).map((__, c) => {
                  const inFinder =
                    (r < 7 && c < 7) || (r < 7 && c > 21) || (r > 21 && c < 7);
                  const seed = (r * 31 + c * 17 + r * c * 7) % 9;
                  const on = inFinder
                    ? (r % 6 === 0 || c % 6 === 0 || (r > 1 && r < 5 && c > 1 && c < 5))
                    : seed < 4;
                  return on ? (
                    <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="#d1fae5" />
                  ) : null;
                })
              )}
            </svg>
            <div className="text-sm">
              <div className="font-bold text-white">Демо-версия</div>
              <div className="mt-0.5">Наведите камеру —<br />посмотрите NeuroScan</div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs md:flex-row md:items-center">
          <span>© 2026 NeuroScan · Медицинское изделие, рег. удостоверение Росздравнадзора</span>
          <div className="flex gap-6">
            <a href="#trust" className="transition-colors hover:text-white">Политика ПДн (ФЗ-152)</a>
            <a href="#trust" className="transition-colors hover:text-white">Документы и лицензии</a>
            <a href="#demo" className="transition-colors hover:text-white">Контакты</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
