"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/components/motion/gsap";

/** Encerramento: linha verde percorre a tela e se transforma no símbolo Citável. */
export function FooterSignature() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: scope.current, start: "top 85%", once: true } });
        tl.fromTo("[data-sig-line]", { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 1.4, ease: "power3.inOut" })
          .to("[data-sig-line]", { scaleX: 0, transformOrigin: "right center", duration: 0.7, ease: "power3.in" }, "+=0.05")
          .fromTo("[data-sig-head]", { xPercent: -50, left: "0%", autoAlpha: 1 }, { left: "100%", duration: 1.4, ease: "power3.inOut" }, 0)
          .to("[data-sig-head]", { left: "50%", duration: 0.7, ease: "power3.out" }, 1.45)
          .to("[data-sig-head]", { autoAlpha: 0, scale: 3, duration: 0.4 }, ">-0.1")
          .fromTo("[data-sig-symbol]", { autoAlpha: 0, scale: 0.4, rotate: -20 }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 1, ease: "back.out(1.8)" }, "<")
          .fromTo("[data-sig-glow]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, "<");
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <div ref={scope} aria-hidden className="relative mt-20 h-40 sm:h-48">
      <div className="absolute inset-x-0 top-1/2 h-px bg-line" />
      <div data-sig-line className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 scale-x-0 bg-lime shadow-[0_0_16px_rgba(189,245,49,0.9)]" />
      <div data-sig-head className="invisible absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-lime shadow-[0_0_24px_6px_rgba(189,245,49,0.8)]" />
      <div data-sig-glow className="absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/15 blur-3xl" />
      <div data-sig-symbol className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image src="/assets/brand/icon-citavel.png" alt="" width={618} height={740} sizes="80px" className="h-16 w-auto sm:h-20" />
      </div>
    </div>
  );
}
