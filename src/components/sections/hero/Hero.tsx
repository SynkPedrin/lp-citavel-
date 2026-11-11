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
        {/* Chat e onda numa grade: o chat ocupa as linhas 1 e 2 (metades iguais) e a onda vai da linha 2 até o fim,
            ou seja, sobe do pé do hero até o meio do quadro branco, de borda a borda da tela. */}
        <div className="mt-10 grid grid-cols-1 grid-rows-[1fr_1fr_auto]">
          <div className="relative col-start-1 row-start-2 row-end-4 min-h-0">
            <Onda fluid bars={72} lit={[11, 27, 44, 58]} className="absolute inset-y-0 left-[calc(50%-50vw)] w-screen justify-center opacity-90 [&>span]:max-w-none" />
          </div>
          <div data-hero-in className="relative z-10 col-start-1 row-start-1 row-end-3">
            <HeroChat />
          </div>
          <p data-hero-in className="relative z-10 col-start-1 row-start-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 pb-28 pt-5 text-sm text-fg-2 sm:pb-36">
            {hero.microcopy.map((m, i) => (
              <span key={m} className="flex items-center gap-3 rounded-full bg-grafite/80 px-2 py-0.5">
                {i > 0 && <span aria-hidden className="h-3 w-1.5 rotate-[20deg] rounded-full bg-lima" />}
                {m}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
