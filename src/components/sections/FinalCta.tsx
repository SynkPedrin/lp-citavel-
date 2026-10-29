"use client";

import { Check } from "lucide-react";
import { finalCta } from "@/content/sections";
import { LeadForm } from "@/components/conversion/LeadForm";
import { useLead } from "@/components/conversion/LeadContext";
import { LazyVideo } from "@/components/ui/LazyVideo";

export function FinalCta() {
  const { delivery, lastPlan } = useLead();

  return (
    <section id="diagnostico" aria-labelledby="diagnostico-title" className="relative isolate overflow-hidden border-t border-line py-20 sm:py-28">
      {/* composição PulsoFinal (Remotion), discreta */}
      <div aria-hidden className="absolute inset-0 -z-10 opacity-25">
        <LazyVideo poster="/media/pulso-final-poster.jpg" sources={[{ src: "/media/pulso-final.mp4" }]} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#090b08_0%,rgba(9,11,8,0.6)_40%,#090b08_100%)]" />
      </div>

      <div className="shell grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
        <div className="lg:col-span-5 lg:pt-4">
          <p data-reveal className="eyebrow text-lime">
            {finalCta.eyebrow}
          </p>
          <h2 id="diagnostico-title" data-reveal className="mt-4 font-display text-[clamp(1.75rem,3.4vw,2.9rem)] font-extrabold uppercase leading-[1.04] tracking-[-0.015em]">
            {finalCta.headline}
          </h2>
          <p data-reveal className="mt-5 text-base leading-relaxed text-mist sm:text-lg">
            {finalCta.sub}
          </p>
          <ul data-reveal className="mt-7 space-y-3">
            {finalCta.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-paper/90">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-lime text-ink">
                  <Check aria-hidden className="size-3" strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal className="rounded-3xl border border-line-strong bg-graphite/90 p-5 backdrop-blur sm:p-8 lg:col-span-7">
          <LeadForm key={lastPlan ?? "none"} delivery={delivery} origin="final" defaults={{ plan: lastPlan }} submitLabel={finalCta.cta} />
        </div>
      </div>
    </section>
  );
}
