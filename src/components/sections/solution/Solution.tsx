"use client";

import { useRef } from "react";
import { solution } from "@/content/sections";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DUR, gsap, MQ, useGSAP } from "@/components/motion/gsap";
import { cn } from "@/lib/utils";
import { AnalysisDemo, ExecutionDemo, OpportunitiesDemo } from "./SolutionDemos";

const demos = [AnalysisDemo, OpportunitiesDemo, ExecutionDemo];

export function Solution() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.utils.toArray<HTMLElement>("[data-demo]").forEach((demo) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: demo, start: "top 80%", once: true } });
          // desloca no eixo de 20° e firma; itens sobem em sequência de 80 ms
          tl.from(demo, { x: -14, y: 40, duration: DUR.in * 1.4 }).from(demo.querySelectorAll("[data-demo-item]"), { y: 12, duration: DUR.in, stagger: DUR.stagger }, 0.12);
          const line = demo.querySelector("[data-demo-line]");
          if (line) tl.from(line, { strokeDashoffset: 1, duration: DUR.loop }, 0.3);
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} id="como-funciona" aria-labelledby="como-funciona-title" className="t-dark py-20 sm:py-28">
      <div className="shell">
        <SectionHeading id="como-funciona-title" eyebrow={solution.eyebrow} lines={solution.headline} markLine={1} sub={solution.sub} split />

        <ol className="mt-14 space-y-16 sm:mt-20 lg:space-y-24">
          {solution.steps.map((step, i) => {
            const Demo = demos[i];
            const flip = i % 2 === 1;
            return (
              <li key={step.index} className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <div data-reveal className={cn("min-w-0", flip && "lg:order-2")}>
                  <span className="t-display block text-[clamp(3.5rem,6vw,5.5rem)] text-lima">{step.index}</span>
                  <h3 className="t-title mt-3 text-[clamp(1.9rem,3.2vw,2.8rem)]">{step.title}</h3>
                  <p className="mt-4 max-w-md text-[clamp(1rem,1.25vw,1.15rem)] leading-relaxed text-fg-2">{step.body}</p>
                  <ul className="mt-6 max-w-md">
                    {step.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-3 border-t border-line py-3 text-fg">
                        <BrandIcon name="citada" className="size-5 text-lima" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div data-demo className={cn("min-w-0", flip && "lg:order-1")}>
                  <Demo />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
