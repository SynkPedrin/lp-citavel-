import { BadgeCheck, FileSearch, Scale } from "lucide-react";
import { proof } from "@/content/sections";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

const trustIcons = [Scale, FileSearch, BadgeCheck];

export function Proof() {
  return (
    <section id="case" aria-labelledby="case-title" className="border-t border-line py-20 sm:py-28">
      <div className="shell">
        <SectionHeading id="case-title" eyebrow={proof.eyebrow} lines={[proof.headline]} sub={proof.sub} />

        <div data-reveal className="mx-auto mt-12 max-w-6xl overflow-hidden rounded-3xl border border-line-strong bg-void">
          <div className="flex flex-col gap-2 border-b border-line px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-semibold text-paper">Case #0 · Endrigo Almada, fundador da Citável</p>
            <p className="font-mono text-xs uppercase tracking-wider text-mist">Relato da própria Citável</p>
          </div>
          <ol className="grid divide-y divide-line md:grid-cols-4 md:divide-x md:divide-y-0">
            {proof.steps.map((s, i) => (
              <li key={s.label} className="p-6">
                <p className="font-mono text-xs text-lime">
                  {String(i + 1).padStart(2, "0")} · {s.label}
                </p>
                <p className="mt-3 font-mono text-2xl text-paper">{s.value}</p>
                <p className="mt-2 text-sm leading-relaxed text-mist">{s.detail}</p>
              </li>
            ))}
          </ol>
          <div className="flex flex-col gap-4 border-t border-line px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-xs leading-relaxed text-mist">{proof.disclaimer}</p>
            <ButtonLink href={site.links.caseStudy} variant="secondary" size="sm" className="shrink-0">
              {proof.cta}
            </ButtonLink>
          </div>
        </div>

        <ul className="mx-auto mt-6 grid max-w-6xl gap-4 md:grid-cols-3">
          {proof.trust.map((t, i) => {
            const Icon = trustIcons[i];
            return (
              <li key={t.title} data-reveal className="flex gap-4 rounded-2xl border border-line bg-graphite/60 p-5">
                <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-lime" />
                <div>
                  <h3 className="font-bold text-paper">{t.title}</h3>
                  <p className="mt-1 text-sm text-mist">{t.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
