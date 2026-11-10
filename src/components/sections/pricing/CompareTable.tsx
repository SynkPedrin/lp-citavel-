"use client";

import { compareGroups, formatNumber, plans, publicationNote, type CompareValue } from "@/config/plans";
import { compare } from "@/content/sections";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { LeadButton } from "@/components/conversion/LeadButton";
import { InfoTip } from "@/components/ui/InfoTip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

function Value({ v }: { v: CompareValue }) {
  if (v === true)
    return (
      <>
        <BrandIcon name="citada" className="mx-auto size-5 text-grafite" />
        <span className="sr-only">Incluído</span>
      </>
    );
  if (v === false)
    return (
      <>
        <span aria-hidden className="text-app-text-2">—</span>
        <span className="sr-only">Não incluído</span>
      </>
    );
  return <span className="text-[14px] text-grafite">{v}</span>;
}

const featured = (id: string) => plans.find((p) => p.id === id)?.tag;

export function CompareTable() {
  return (
    <section id="comparativo" aria-labelledby="comparativo-title" className="t-paper py-20 sm:py-28">
      <div className="shell">
        <SectionHeading id="comparativo-title" eyebrow="Comparativo" lines={[compare.headline]} sub={compare.sub} split />

        {/* Desktop: tabela completa */}
        <div data-reveal className="p-white mt-12 hidden overflow-hidden rounded-[28px] md:block">
          <table className="w-full border-separate border-spacing-0 text-left">
            <caption className="sr-only">Comparativo dos planos Essencial, Profissional e Completo</caption>
            <thead className="sticky top-[var(--header-h)] z-10">
              <tr>
                <th scope="col" className="w-[34%] border-b border-app-line bg-white p-5 align-bottom">
                  <span className="t-label text-app-text-2">Recurso</span>
                </th>
                {plans.map((p) => (
                  <th key={p.id} scope="col" className={cn("border-b border-app-line p-5 text-center align-bottom", p.tag ? "bg-lima" : "bg-white")}>
                    <span className="block text-[1.15rem] font-bold tracking-[-0.02em]">{p.name}</span>
                    <span className="t-num mt-1 block text-[1.05rem]">
                      R$ {formatNumber(p.monthlyPrice)}
                      <span className="text-[12px] font-normal text-app-text-2">/mês</span>
                    </span>
                    <LeadButton origin={`comparativo-${p.id}`} plan={p.id} size="md" variant={p.tag ? "dark" : "outline"} className="mt-3 w-full" arrow={false}>
                      {compare.cta}
                      <span className="sr-only"> {p.name}</span>
                    </LeadButton>
                  </th>
                ))}
              </tr>
            </thead>
            {compareGroups.map((g) => (
              <tbody key={g.title}>
                <tr>
                  <th colSpan={4} scope="colgroup" className="border-b border-app-line bg-app-bg px-5 pb-3 pt-6 text-left">
                    <span className="block text-[15px] font-bold">{g.title}</span>
                    <span className="block text-[13px] font-normal text-app-text-2">{g.description}</span>
                  </th>
                </tr>
                {g.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="border-b border-app-line px-5 py-3.5 text-[14px] font-normal">
                      <span className="inline-flex items-center gap-1.5">
                        {row.label}
                        {row.tip && <InfoTip label={row.label} text={row.tip} />}
                      </span>
                    </th>
                    {plans.map((p) => (
                      <td key={p.id} className={cn("border-b border-app-line px-5 py-3.5 text-center", featured(p.id) && "bg-lima/25")}>
                        <Value v={row.values[p.id]} />
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
          <div className="sticky top-[var(--header-h)] z-10 grid grid-cols-3 gap-2 border-b border-line bg-papel py-3 text-center">
            {plans.map((p) => (
              <div key={p.id} className={cn("rounded-[12px] py-1.5", p.tag && "bg-lima")}>
                <p className="text-[13px] font-bold">{p.name}</p>
                <p className="t-num text-[13px]">R$ {formatNumber(p.monthlyPrice)}</p>
              </div>
            ))}
          </div>
          {compareGroups.map((g) => (
            <div key={g.title} className="mt-6">
              <p className="font-bold">{g.title}</p>
              <ul className="mt-2 divide-y divide-app-line rounded-[20px] bg-white">
                {g.rows.map((row) => (
                  <li key={row.label} className="p-3.5">
                    <p className="flex items-center gap-1.5 text-[14px]">
                      {row.label}
                      {row.tip && <InfoTip label={row.label} text={row.tip} />}
                    </p>
                    <dl className="mt-2 grid grid-cols-3 gap-2 text-center">
                      {plans.map((p) => (
                        <div key={p.id} className={cn("rounded-[10px] px-1.5 py-2 text-[13px] leading-snug", p.tag ? "bg-lima/40" : "bg-app-bg")}>
                          <dt className="sr-only">{p.name}</dt>
                          <dd>
                            <Value v={row.values[p.id]} />
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
              <LeadButton key={p.id} origin={`comparativo-${p.id}`} plan={p.id} variant={p.tag ? "dark" : "outline"} className="w-full">
                {compare.cta} {p.name}
              </LeadButton>
            ))}
          </div>
        </div>

        <p className="mt-6 text-xs text-fg-3">{publicationNote}</p>
      </div>
    </section>
  );
}
