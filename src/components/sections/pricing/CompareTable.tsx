"use client";

import { Check, Minus } from "lucide-react";
import { compareGroups, formatNumber, plans, publicationNote, type CompareValue } from "@/config/plans";
import { compare } from "@/content/sections";
import { LeadButton } from "@/components/conversion/LeadButton";
import { InfoTip } from "@/components/ui/InfoTip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { planTheme } from "./Plans";

function Value({ v, theme }: { v: CompareValue; theme: string }) {
  if (v === true)
    return (
      <>
        <Check aria-hidden className={cn("mx-auto size-4", theme)} strokeWidth={2.5} />
        <span className="sr-only">Incluído</span>
      </>
    );
  if (v === false)
    return (
      <>
        <Minus aria-hidden className="mx-auto size-4 text-mist/40" />
        <span className="sr-only">Não incluído</span>
      </>
    );
  return <span className="text-sm text-paper/90">{v}</span>;
}

export function CompareTable() {
  return (
    <section id="comparativo" aria-labelledby="comparativo-title" className="border-t border-line py-20 sm:py-28">
      <div className="shell">
        <SectionHeading id="comparativo-title" lines={[compare.headline]} sub={compare.sub} />

        {/* Desktop: tabela completa */}
        <div data-reveal className="mx-auto mt-12 hidden max-w-6xl md:block">
          <table className="w-full border-separate border-spacing-0 text-left">
            <caption className="sr-only">Comparativo dos planos Essencial, Profissional e Completo</caption>
            <thead className="sticky top-[var(--header-h)] z-10">
              <tr>
                <th scope="col" className="w-[34%] border-b border-line bg-ink/95 p-4 align-bottom text-sm font-medium text-mist backdrop-blur">
                  Recurso
                </th>
                {plans.map((p) => {
                  const t = planTheme[p.theme];
                  return (
                    <th key={p.id} scope="col" className={cn("border-b border-line bg-ink/95 p-4 text-center align-bottom backdrop-blur", p.tag && "bg-graphite")}>
                      <span className="flex items-center justify-center gap-2">
                        <span className={cn("size-2 rounded-full", t.bg)} aria-hidden />
                        <span className="font-display text-lg font-extrabold uppercase">{p.name}</span>
                      </span>
                      <span className="mt-1 block font-mono text-base text-paper">
                        R$ {formatNumber(p.monthlyPrice)}
                        <span className="text-xs text-mist">/mês</span>
                      </span>
                      <LeadButton origin={`comparativo-${p.id}`} plan={p.id} size="sm" variant={p.tag ? "primary" : "secondary"} className={cn("mt-3 w-full", p.tag && t.button)} icon={false}>
                        {compare.cta}
                        <span className="sr-only"> {p.name}</span>
                      </LeadButton>
                    </th>
                  );
                })}
              </tr>
            </thead>
            {compareGroups.map((g) => (
              <tbody key={g.title}>
                <tr>
                  <th colSpan={4} scope="colgroup" className="border-b border-line bg-graphite/50 px-4 pb-3 pt-6 text-left">
                    <span className="block font-semibold text-paper">{g.title}</span>
                    <span className="block text-xs font-normal text-mist">{g.description}</span>
                  </th>
                </tr>
                {g.rows.map((row) => (
                  <tr key={row.label} className="transition-colors hover:bg-paper/[0.02]">
                    <th scope="row" className="border-b border-line px-4 py-3.5 text-sm font-normal text-paper/90">
                      <span className="inline-flex items-center gap-1.5">
                        {row.label}
                        {row.tip && <InfoTip label={row.label} text={row.tip} />}
                      </span>
                    </th>
                    {plans.map((p) => (
                      <td key={p.id} className={cn("border-b border-line px-4 py-3.5 text-center", p.tag && "bg-graphite/40")}>
                        <Value v={row.values[p.id]} theme={planTheme[p.theme].text} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>

        {/* Mobile: comparação por recurso, em linhas legíveis */}
        <div className="mt-10 md:hidden">
          <div className="sticky top-[var(--header-h)] z-10 grid grid-cols-3 gap-2 border-b border-line bg-ink/95 py-3 text-center backdrop-blur">
            {plans.map((p) => (
              <div key={p.id}>
                <p className={cn("text-xs font-bold uppercase", planTheme[p.theme].text)}>{p.name}</p>
                <p className="font-mono text-sm text-paper">R$ {formatNumber(p.monthlyPrice)}</p>
              </div>
            ))}
          </div>
          {compareGroups.map((g) => (
            <div key={g.title} className="mt-6">
              <p className="font-semibold text-paper">{g.title}</p>
              <ul className="mt-2 divide-y divide-line rounded-2xl border border-line bg-graphite/50">
                {g.rows.map((row) => (
                  <li key={row.label} className="p-3.5">
                    <p className="flex items-center gap-1.5 text-sm text-paper/90">
                      {row.label}
                      {row.tip && <InfoTip label={row.label} text={row.tip} />}
                    </p>
                    <dl className="mt-2 grid grid-cols-3 gap-2 text-center">
                      {plans.map((p) => (
                        <div key={p.id} className="rounded-lg bg-ink/60 px-1.5 py-2 text-[0.8rem] leading-snug">
                          <dt className="sr-only">{p.name}</dt>
                          <dd>
                            <Value v={row.values[p.id]} theme={planTheme[p.theme].text} />
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="mt-6 grid gap-2">
            {plans.map((p) => (
              <LeadButton key={p.id} origin={`comparativo-${p.id}`} plan={p.id} variant={p.tag ? "primary" : "secondary"} className={cn("w-full", p.tag && planTheme[p.theme].button)}>
                {compare.cta} {p.name}
              </LeadButton>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-6xl text-xs text-mist/80">{publicationNote}</p>
      </div>
    </section>
  );
}
