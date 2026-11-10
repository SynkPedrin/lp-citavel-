"use client";

import { useRef } from "react";
import { method } from "@/content/sections";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gsap, MQ, useGSAP } from "@/components/motion/gsap";

/**
 * Método PULSO™ em faixa lima: cinco fases lado a lado (sem pin).
 * A linha grafite acompanha o scroll e a fase atual vira chip grafite com letra lima.
 */
export function Method() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const steps = gsap.utils.toArray<HTMLElement>("[data-step]");
        const list = scope.current?.querySelector("[data-steps]");
        const st = { trigger: list, start: "top 75%", end: "bottom 45%", scrub: 0.6 };
        gsap.fromTo("[data-pulse-x]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: st });
        gsap.fromTo(
          "[data-pulse-y]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              ...st,
              onUpdate: (self) => {
                const active = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
                steps.forEach((s, i) => s.classList.toggle("is-on", i <= active && self.progress > 0.02));
              },
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} id="metodo" aria-labelledby="metodo-title" className="t-lima py-20 sm:py-28">
      <div className="shell">
        <SectionHeading id="metodo-title" eyebrow={method.eyebrow} lines={[method.headline]} sub={method.sub} split />

        <div data-steps className="relative mt-14 lg:mt-20">
          <div aria-hidden className="absolute left-0 right-0 top-7 hidden h-0.5 bg-grafite/20 lg:block">
            <div data-pulse-x className="h-full w-full origin-left bg-grafite motion-reduce:scale-x-100" />
          </div>
          <div aria-hidden className="absolute bottom-6 left-7 top-6 w-0.5 bg-grafite/20 lg:hidden">
            <div data-pulse-y className="h-full w-full origin-top bg-grafite motion-reduce:scale-y-100" />
          </div>

          <ol className="relative grid gap-5 lg:grid-cols-5 lg:gap-6">
            {method.steps.map((s, i) => (
              <li key={s.letter} data-step className="group flex gap-5 lg:flex-col lg:gap-0">
                <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full border-2 border-grafite bg-lima text-[1.6rem] font-extrabold text-grafite transition-colors duration-[320ms] ease-[var(--ease-cit)] group-[.is-on]:bg-grafite group-[.is-on]:text-lima motion-reduce:bg-grafite motion-reduce:text-lima">
                  {s.letter}
                </span>
                <div className="lg:pt-6">
                  <p className="t-num text-sm text-fg-3">Fase {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="t-display mt-1 text-[clamp(2rem,3vw,2.75rem)]">{s.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div data-reveal className="p-dark mt-14 flex flex-col gap-3 rounded-[28px] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="text-[clamp(1.05rem,1.6vw,1.35rem)] font-semibold tracking-[-0.02em]">
            PULSO Score = <span className="text-lima">V</span> × 0,40 + <span className="text-lima">C</span> × 0,35 + <span className="text-lima">S</span> × 0,25
          </p>
          <p className="t-label text-fg-3">{method.formulaLegend}</p>
        </div>
      </div>
    </section>
  );
}
