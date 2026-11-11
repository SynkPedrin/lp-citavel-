import { proof } from "@/content/sections";
import { site } from "@/content/site";
import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";
import { SourceChip } from "@/components/brand/Graphics";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

const trustIcons: BrandIconName[] = ["score", "relatorio", "conteudo"];

export function Proof() {
  return (
    <section id="case" aria-labelledby="case-title" className="t-dark py-20 sm:py-28">
      <div className="shell">
        <SectionHeading id="case-title" eyebrow={proof.eyebrow} lines={[proof.headline]} sub={proof.sub} split />

        <div data-reveal className="p-carvao mt-12 overflow-hidden rounded-[28px] lg:mt-16">
          <div className="flex flex-col gap-2 border-b border-line px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="text-[1.1rem] font-bold tracking-[-0.02em]">Case #0 · Endrigo Almada, fundador da Citável</p>
            <p className="t-label text-fg-3">Relato da própria Citável</p>
          </div>
          <ol className="grid gap-px bg-line md:grid-cols-2 xl:grid-cols-4">
            {proof.steps.map((s, i) => (
              <li key={s.label} className="bg-carvao p-6 sm:p-8">
                <p className="t-label text-lima">
                  {String(i + 1).padStart(2, "0")} · {s.label}
                </p>
                <p className="t-num mt-4 text-[clamp(1.7rem,2.3vw,2.2rem)] leading-none">
                  {s.value}
                  {i === 3 && (
                    <>
                      {" "}
                      <SourceChip n={1} className="text-[0.7em]" />
                    </>
                  )}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-fg-2">{s.detail}</p>
              </li>
            ))}
          </ol>
          <div className="flex flex-col gap-4 border-t border-line px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="max-w-2xl text-[13px] leading-relaxed text-fg-3">{proof.disclaimer}</p>
            <ButtonLink href={site.links.caseStudy} variant="outline" size="md" className="shrink-0">
              {proof.cta}
            </ButtonLink>
          </div>
        </div>

        <ul className="mt-3 grid gap-3 md:grid-cols-3">
          {proof.trust.map((t, i) => (
            <li key={t.title} data-reveal className="flex gap-4 rounded-[28px] border border-line p-6">
              <BrandIcon name={trustIcons[i]} className="mt-0.5 size-6 text-lima" />
              <div>
                <h3 className="font-bold">{t.title}</h3>
                <p className="mt-1 text-[15px] text-fg-2">{t.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
