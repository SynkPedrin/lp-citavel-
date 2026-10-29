"use client";

import { Check } from "lucide-react";
import { useRef } from "react";
import { solution } from "@/content/sections";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gsap, MQ, useGSAP } from "@/components/motion/gsap";
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
          const tl = gsap.timeline({ scrollTrigger: { trigger: demo, start: "top 78%", once: true } });
          tl.from(demo, { y: 40, opacity: 0, duration: 0.9, ease: "expo.out" }).from(
            demo.querySelectorAll("[data-demo-item]"),
            { y: 10, opacity: 0, duration: 0.5, stagger: 0.06, ease: "power3.out" },
            0.2,
          );
          const line = demo.querySelector("[data-demo-line]");
          if (line) tl.from(line, { strokeDashoffset: 1, duration: 1.2, ease: "power2.inOut" }, 0.4);
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} id="como-funciona" aria-labelledby="como-funciona-title" className="border-t border-line py-20 sm:py-28">
      <div className="shell">
        <SectionHeading id="como-funciona-title" eyebrow={solution.eyebrow} lines={solution.headline} accentLine={1} sub={solution.sub} />

        <ol className="mx-auto mt-14 max-w-6xl space-y-16 sm:mt-20 lg:space-y-24">
          {solution.steps.map((step, i) => {
            const Demo = demos[i];
            const flip = i % 2 === 1;
            return (
              <li key={step.index} className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <div data-reveal className={cn("min-w-0", flip && "lg:order-2")}>
                  <span className="font-mono text-sm text-lime">{step.index}</span>
                  <h3 className="mt-2 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold uppercase leading-tight">{step.title}</h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-mist sm:text-lg">{step.body}</p>
                  <ul className="mt-6 space-y-2.5">
                    {step.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-3 text-paper/90">
                        <span className="grid size-5 place-items-center rounded-full bg-lime/15 text-lime">
                          <Check aria-hidden className="size-3" strokeWidth={3} />
                        </span>
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
