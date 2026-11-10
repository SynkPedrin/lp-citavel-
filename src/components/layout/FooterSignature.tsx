"use client";

import { useRef } from "react";
import { GrowingSymbol, Onda } from "@/components/brand/Graphics";
import { Lockup } from "@/components/brand/Logo";
import { DUR, gsap, MQ, useGSAP } from "@/components/motion/gsap";

/** Encerramento (Brand Book · slide final): faixa lima, "Seja a resposta." e o símbolo crescendo da base. */
export function FooterSignature() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from("[data-sig-line]", {
          yPercent: 105,
          duration: DUR.in * 1.5,
          stagger: DUR.stagger,
          scrollTrigger: { trigger: scope.current, start: "top 75%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} aria-label="Seja a resposta" className="t-lima relative overflow-hidden">
      <div className="shell grid items-end gap-10 pb-10 pt-16 sm:pt-24 lg:grid-cols-[minmax(0,1fr)_auto]">
        <p className="t-display text-[clamp(4.2rem,15vw,13.5rem)]">
          <span className="block overflow-hidden pb-[0.04em]">
            <span data-sig-line className="block">
              Seja a
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.04em]">
            <span data-sig-line className="block">
              resposta.
            </span>
          </span>
        </p>
        <GrowingSymbol className="hidden w-[min(26vw,22rem)] lg:block" color="var(--color-grafite)" />
      </div>
      <div className="shell flex items-center justify-between gap-6 pb-8">
        <span className="text-[22px]">
          <Lockup tone="positiva" />
        </span>
        <Onda bars={22} height={44} color="rgb(28 29 26 / 0.85)" className="w-40 sm:w-56" />
      </div>
    </section>
  );
}
