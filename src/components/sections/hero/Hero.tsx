"use client";

import { useRef } from "react";
import { hero } from "@/content/sections";
import { Onda } from "@/components/brand/Graphics";
import { DUR, gsap, MQ, useGSAP } from "@/components/motion/gsap";
import { HeroChat } from "./HeroChat";

export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Sobe como sinal: entradas da base em sequência de 80 ms. Só transform (o campo já funciona).
      mm.add(MQ.motion, () => {
        gsap.from("[data-hero-in]", { y: 28, duration: DUR.in * 1.4, stagger: DUR.stagger });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} id="top" aria-labelledby="hero-title" className="t-dark relative isolate overflow-hidden pt-[calc(var(--header-h)+3rem)] sm:pt-[calc(var(--header-h)+4.5rem)]">
      <div className="shell text-center">
        {/* No desktop, duas linhas fixas: a altura não muda quando a Archivo substitui a fonte de fallback (CLS ≈ 0). */}
        <h1 id="hero-title" data-hero-in className="t-title mx-auto max-w-6xl text-[clamp(2.2rem,6.4vw,3rem)] lg:text-[clamp(3rem,4.3vw,4rem)]">
          <span className="block lg:whitespace-nowrap">{hero.headline[0]}</span>{" "}
          <span className="block lg:whitespace-nowrap">
            <span className="mark">{hero.headline[1]}</span>
          </span>
        </h1>
        <p data-hero-in className="mx-auto mt-6 max-w-2xl text-[clamp(1.05rem,1.35vw,1.25rem)] leading-relaxed text-fg-2">
          {hero.sub}
        </p>
        <div data-hero-in className="mt-10">
          <HeroChat />
        </div>
        <p data-hero-in className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-fg-2">
          {hero.microcopy.map((m, i) => (
            <span key={m} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden className="h-3 w-1.5 rotate-[20deg] rounded-full bg-lima" />}
              {m}
            </span>
          ))}
        </p>
      </div>

      <Onda bars={64} height={72} lit={[11, 37, 52]} className="shell mt-16 opacity-90 sm:mt-20" />
    </section>
  );
}
