import Lenis from "lenis";
import { useEffect } from "react";
import { AIScanDemo } from "./sections/AIScanDemo";
import { BeforeAfter } from "./sections/BeforeAfter";
import { CaseStudy } from "./sections/CaseStudy";
import { Economy } from "./sections/Economy";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { HowItWorks } from "./sections/HowItWorks";
import { Footer, LeadForm } from "./sections/LeadForm";
import { Pain } from "./sections/Pain";
import { Trust } from "./sections/Trust";

export default function App() {
  // Плавный инерционный скролл по всему сайту
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    // поддержка якорных ссылок вместе с Lenis
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 });
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Pain />
        <HowItWorks />
        <AIScanDemo />
        <Trust />
        <Economy />
        <BeforeAfter />
        <CaseStudy />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
