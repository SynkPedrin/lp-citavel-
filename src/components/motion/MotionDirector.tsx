"use client";

import { DUR, gsap, MQ, ScrollTrigger, useGSAP } from "./gsap";

const fmt = (n: number, decimals: number) =>
  new Intl.NumberFormat("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n);

/**
 * Sistema de motion declarativo (Brand Book · Motion: "sobe, firma e para").
 *  - [data-reveal]  → sobe 28 px como sinal, em sequência de 80 ms (repouso sempre visível: só transform)
 *  - .mark          → o marca-texto lima cresce atrás da expressão quando entra na tela
 *  - [data-count]   → números contam até o valor atual ("todo dado entra contando")
 * Sem JS ou com movimento reduzido, tudo já está no estado final.
 */
export function MotionDirector() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(MQ.motion, () => {
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 90%",
        once: true,
        onEnter: (els) =>
          gsap.fromTo(els, { y: 28 }, { y: 0, duration: DUR.in * 1.4, stagger: DUR.stagger, overwrite: true, clearProps: "transform" }),
      });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.getBoundingClientRect().top > window.innerHeight * 0.9) gsap.set(el, { y: 28 });
      });

      ScrollTrigger.batch(".mark", {
        start: "top 88%",
        once: true,
        onEnter: (els) => els.forEach((el, i) => window.setTimeout(() => el.classList.add("in"), i * 80 + 160)),
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const to = Number(el.dataset.count);
        const from = Number(el.dataset.countFrom ?? 0);
        const decimals = Number(el.dataset.decimals ?? 0);
        const obj = { v: from };
        el.textContent = fmt(from, decimals);
        gsap.to(obj, {
          v: to,
          duration: DUR.loop,
          ease: "cit",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onUpdate: () => {
            el.textContent = fmt(obj.v, decimals);
          },
        });
      });
    });

    // Sem movimento: marcas já preenchidas.
    mm.add(MQ.reduced, () => {
      document.querySelectorAll(".mark").forEach((el) => el.classList.add("in"));
    });

    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    return () => mm.revert();
  });

  return null;
}
