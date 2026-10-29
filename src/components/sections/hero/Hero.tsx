"use client";

import { useRef } from "react";
import { hero } from "@/content/sections";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { gsap, MQ, useGSAP } from "@/components/motion/gsap";
import { HeroDashboard } from "./HeroDashboard";
import { HeroUrlForm } from "./HeroUrlForm";

export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        // Entrada curta: o formulário fica utilizável imediatamente (sem bloqueio).
        gsap.from("[data-hero-in]", { y: 18, opacity: 0, duration: 0.8, stagger: 0.06, ease: "expo.out" });
        gsap.from("[data-hero-dash]", { y: 50, opacity: 0, duration: 1.2, delay: 0.25, ease: "expo.out" });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-[calc(var(--header-h)+3rem)] sm:pt-[calc(var(--header-h)+4.5rem)]">
      {/* Filme Remotion como elemento secundário e sutil */}
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[46rem] opacity-[0.16]">
        {/* só no desktop: no mobile o hero fica leve e o LCP é sempre o texto */}
        <LazyVideo eager media="(min-width: 1024px)" sources={[{ src: "/media/hero-film.mp4" }]} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,transparent_0%,#090b08_70%)]" />
      </div>
      <div aria-hidden className="absolute left-1/2 top-24 -z-10 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-lime/[0.08] blur-[120px]" />

      <div className="shell text-center">
        <h1 id="hero-title" data-hero-in className="mx-auto max-w-6xl font-display text-[clamp(1.85rem,3.7vw,3.4rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.02em]">
          <span className="block">{hero.headline[0]}</span>{" "}
          <span className="block text-lime">{hero.headline[1]}</span>
        </h1>
        <p data-hero-in className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
          {hero.sub}
        </p>
        <div data-hero-in className="mt-8">
          <HeroUrlForm />
        </div>
      </div>

      <div data-hero-dash className="shell relative mt-12 sm:mt-14">
        <div className="mx-auto max-w-5xl">
          <HeroDashboard />
        </div>
      </div>
    </section>
  );
}
