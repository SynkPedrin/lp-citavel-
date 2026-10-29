"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";

/** Indicador de progresso de leitura (decorativo). */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } },
    );
  });

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-lime shadow-[0_0_12px_rgba(189,245,49,0.7)]" />
    </div>
  );
}
