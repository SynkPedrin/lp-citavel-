"use client";

import { gsap, MQ, ScrollTrigger, useGSAP } from "./gsap";

/**
 * Sistema de motion declarativo e consistente para toda a página:
 *  - [data-reveal]            → entrada (sobe + fade) em lote
 *  - [data-lines] .mask-line  → títulos revelados por máscara vertical
 *  - [data-parallax="0.2"]    → parallax de background (fração da altura)
 *  - [data-scale-in]          → escala controlada de imagens
 * O estado padrão no HTML é o FINAL (visível). Sem JS ou com movimento reduzido, nada fica oculto.
 */
export function MotionDirector() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(MQ.motion, () => {
      // Títulos com máscara (exceto o hero, que tem coreografia própria)
      gsap.utils.toArray<HTMLElement>("[data-lines]:not([data-hero])").forEach((title) => {
        const lines = title.querySelectorAll(".mask-line > span");
        gsap.from(lines, {
          yPercent: 110,
          duration: 1.2,
          stagger: 0.09,
          ease: "expo.out",
          scrollTrigger: { trigger: title, start: "top 85%", once: true },
        });
      });

      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { y: 36, opacity: 0 },
            // clearProps devolve o transform ao CSS (hover com elevação continua funcionando)
            { y: 0, opacity: 1, duration: 1.1, stagger: 0.08, ease: "expo.out", overwrite: true, clearProps: "transform" },
          ),
      });
      // Estado inicial aplicado após o batch ser criado (somente elementos abaixo da dobra).
      // Só opacity (nunca visibility): o conteúdo continua na ordem de Tab e focável.
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.getBoundingClientRect().top > window.innerHeight * 0.88) gsap.set(el, { y: 36, opacity: 0 });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = parseFloat(el.dataset.parallax ?? "0.15");
        gsap.fromTo(
          el,
          { yPercent: -amount * 50 },
          {
            yPercent: amount * 50,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-scale-in]").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.12 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom 30%", scrub: true },
          },
        );
      });
    });

    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    return () => mm.revert();
  });

  return null;
}
