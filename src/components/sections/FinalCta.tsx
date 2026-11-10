"use client";

import { finalCta } from "@/content/sections";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { Recorte } from "@/components/brand/Graphics";
import { LeadForm } from "@/components/conversion/LeadForm";
import { useLead } from "@/components/conversion/LeadContext";

export function FinalCta() {
  const { delivery, lastPlan } = useLead();

  return (
    <section id="diagnostico" aria-labelledby="diagnostico-title" className="t-carvao relative isolate overflow-hidden py-20 sm:py-28">
      {/* Recorte em canto: a pílula sai do quadro por duas bordas */}
      <Recorte className="-right-[8%] top-0 hidden h-[70%] w-[44%] lg:block" color="var(--color-grafite)" variant="duas" />

      <div className="shell relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
        <div className="lg:pt-2">
          <p data-reveal className="t-label text-lima">
            {finalCta.eyebrow}
          </p>
          <h2 id="diagnostico-title" data-reveal className="t-title mt-4 text-[clamp(2.1rem,4vw,3.9rem)]">
            Descubra o que as IAs estão dizendo <span className="mark">sobre sua empresa.</span>
          </h2>
          <p data-reveal className="mt-5 max-w-lg text-[clamp(1rem,1.3vw,1.2rem)] leading-relaxed text-fg-2">
            {finalCta.sub}
          </p>
          <ul data-reveal className="mt-8 max-w-lg">
            {finalCta.bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 border-t border-line py-3.5">
                <BrandIcon name="citada" className="size-5 text-lima" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal className="p-paper rounded-[28px] p-5 sm:p-8">
          <LeadForm key={lastPlan ?? "none"} delivery={delivery} origin="final" defaults={{ plan: lastPlan }} submitLabel={finalCta.cta} />
        </div>
      </div>
    </section>
  );
}
