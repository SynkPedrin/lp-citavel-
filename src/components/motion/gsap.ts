"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

/**
 * Motion CITÁVEL: "sobe, firma e para". Nada gira, nada quica.
 * Curva da marca cubic-bezier(.2, .8, .2, 1) · entradas 640 ms · saídas 320 ms · loops 1200 ms · sequência de 80 ms.
 */
export const DUR = { in: 0.64, out: 0.32, loop: 1.2, stagger: 0.08 } as const;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP);
  CustomEase.create("cit", "0.2, 0.8, 0.2, 1");
  CustomEase.create("cit-in", "0.6, 0, 0.8, 0.2");
  gsap.defaults({ ease: "cit", duration: DUR.in });
}

/** Breakpoints do sistema de motion (usados com gsap.matchMedia). */
export const MQ = {
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
  motion: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
} as const;

export { gsap, ScrollTrigger, useGSAP };
