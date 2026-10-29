"use client";

import { useRef } from "react";
import { method } from "@/content/sections";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/components/motion/gsap";

/**
 * Método PULSO™ compacto: 5 etapas lado a lado no desktop (sem pin).
 * Uma linha verde-lima "pulsa" pelas etapas conforme a seção atravessa a tela.
 * Mobile: cards verticais com linha de progresso.
 */
export function Method() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const steps = gsap.utils.toArray<HTMLElement>("[data-step]");
        const list = scope.current?.querySelector("[data-steps]");
        gsap.fromTo(
          "[data-pulse-fill]",
          { scaleX: 0, scaleY: 0 },
          {
            scaleX: 1,
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: list,
              start: "top 75%",
              end: "bottom 45%",
              scrub: 0.6,
              onUpdate: (self) => {
                const active = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
                steps.forEach((s, i) => s.classList.toggle("is-on", i <= active && self.progress > 0.02));
              },
            },
          },
        );
        ScrollTrigger.refresh();
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} id="metodo" aria-labelledby="metodo-title" className="border-t border-line bg-void/40 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading id="metodo-title" eyebrow={method.eyebrow} lines={[method.headline]} sub={method.sub} />

        <div data-steps className="relative mx-auto mt-14 max-w-6xl">
          {/* linha condutora: horizontal (desktop) / vertical (mobile) */}
          <div aria-hidden className="absolute left-0 right-0 top-7 hidden h-px bg-line-strong lg:block">
            <div data-pulse-fill className="h-full w-full origin-left bg-lime shadow-[0_0_12px_rgba(189,245,49,0.8)] motion-reduce:scale-x-100" />
          </div>
          <div aria-hidden className="absolute bottom-6 left-7 top-6 w-px bg-line-strong lg:hidden">
            <div data-pulse-fill className="h-full w-full origin-top bg-lime shadow-[0_0_12px_rgba(189,245,49,0.8)]" />
          </div>

          <ol className="relative grid gap-4 lg:grid-cols-5 lg:gap-5">
            {method.steps.map((s, i) => (
              <li key={s.letter} data-step className="group relative flex gap-4 lg:flex-col lg:gap-0">
                <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl border border-line-strong bg-graphite font-display text-2xl font-black text-mist transition-[color,border-color,background-color,box-shadow] duration-500 group-[.is-on]:border-lime group-[.is-on]:bg-lime group-[.is-on]:text-ink group-[.is-on]:shadow-[0_0_30px_-6px_rgba(189,245,49,0.7)] motion-reduce:border-lime motion-reduce:text-lime">
                  {s.letter}
                </span>
                <div className="pt-1 lg:pt-5">
                  <p className="font-mono text-xs text-mist">Etapa {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 text-lg font-bold uppercase text-paper">{s.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div data-reveal className="mx-auto mt-12 max-w-3xl rounded-2xl border border-line bg-graphite/60 px-6 py-5 text-center">
          <p className="text-sm text-paper/90 sm:text-base">{method.formula}</p>
          <p className="mt-1 font-mono text-xs text-mist">{method.formulaLegend}</p>
        </div>
      </div>
    </section>
  );
}
