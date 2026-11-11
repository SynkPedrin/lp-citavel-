"use client";

import { useState } from "react";
import { compareRows, formatNumber, plans, publicationNote, type CompareValue, type PlanId } from "@/config/plans";
import { compare } from "@/content/sections";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { LeadButton } from "@/components/conversion/LeadButton";
import { InfoTip } from "@/components/ui/InfoTip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/** Incluído: ícone "citada". Não incluído: pílula cinza a 20° (sem travessão). */
function Value({ v, align = "center" }: { v: CompareValue; align?: "center" | "end" }) {
  const box = align === "center" ? "mx-auto" : "ml-auto";
  if (v === true)
    return (
      <>
        <BrandIcon name="citada" className={cn("block size-5 text-grafite", box)} />
        <span className="sr-only">Incluído</span>
      </>
    );
  if (v === false)
    return (
      <>
        <span aria-hidden className={cn("block h-3.5 w-1.5 rotate-[20deg] rounded-full bg-grafite/20", box)} />
        <span className="sr-only">Não incluído</span>
      </>
    );
  return <span className="text-[14px] font-semibold text-grafite">{v}</span>;
}

function RowLabel({ row }: { row: (typeof compareRows)[number] }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {row.label}
      {row.tip && <InfoTip label={row.label} text={row.tip} />}
    </span>
  );
}

export function CompareTable() {
  const [active, setActive] = useState<PlanId>(plans.find((p) => p.tag)?.id ?? plans[0].id);
  const plan = plans.find((p) => p.id === active)!;

  return (
    <section id="comparativo" aria-labelledby="comparativo-title" className="t-paper py-20 sm:py-28">
      <div className="shell">
        <SectionHeading id="comparativo-title" eyebrow="Comparativo" lines={[compare.headline]} sub={compare.sub} split />

        {/* Desktop: uma tabela curta, sem grupos */}
        <div data-reveal className="p-white mt-12 hidden overflow-hidden rounded-[28px] md:block">
          <table className="w-full border-separate border-spacing-0 text-left">
            <caption className="sr-only">Comparativo dos planos Essencial, Profissional e Completo</caption>
            <thead>
              <tr>
                <th scope="col" className="w-[34%] border-b border-app-line p-5 align-bottom">
                  <span className="t-label text-app-text-2">O que entra</span>
                </th>
                {plans.map((p) => (
                  <th key={p.id} scope="col" className={cn("border-b border-app-line p-5 text-center align-bottom", p.tag && "bg-lima")}>
                    <span className="block text-[1.15rem] font-bold tracking-[-0.02em]">{p.name}</span>
                    <span className="t-num mt-1 block text-[1.05rem]">
                      R$ {formatNumber(p.monthlyPrice)}
                      <span className="text-[12px] font-normal text-app-text-2">/mês</span>
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="border-b border-app-line px-5 py-3.5 text-[15px] font-normal">
                    <RowLabel row={row} />
                  </th>
                  {plans.map((p) => (
                    <td key={p.id} className={cn("border-b border-app-line px-5 py-3.5 text-center", p.tag && "bg-lima/25")}>
                      <Value v={row.values[p.id]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="p-5" />
                {plans.map((p) => (
                  <td key={p.id} className={cn("p-5", p.tag && "bg-lima/25")}>
                    <LeadButton origin={`comparativo-${p.id}`} plan={p.id} size="md" variant={p.tag ? "dark" : "outline"} className="w-full" arrow={false}>
                      {compare.cta}
                      <span className="sr-only"> {p.name}</span>
                    </LeadButton>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Mobile: um plano por vez, em abas */}
        <div data-reveal className="mt-10 md:hidden">
          <div role="tablist" aria-label="Escolha um plano para ver o que entra" className="grid grid-cols-3 gap-1 rounded-full bg-white p-1">
            {plans.map((p) => {
              const on = p.id === active;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  id={`cmp-tab-${p.id}`}
                  aria-selected={on}
                  aria-controls="cmp-panel"
                  onClick={() => setActive(p.id)}
                  className={cn(
                    "min-h-11 rounded-full px-1 text-[14px] font-bold transition-colors duration-[160ms]",
                    on ? (p.tag ? "bg-lima text-grafite" : "bg-grafite text-papel") : "text-chumbo",
                  )}
                >
                  {p.name}
                </button>
              );
            })}
          </div>

          <div id="cmp-panel" role="tabpanel" aria-labelledby={`cmp-tab-${active}`} className="mt-3 rounded-[24px] bg-white p-5">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[1.25rem] font-bold tracking-[-0.02em]">{plan.name}</p>
              <p className="t-num text-[1.15rem]">
                R$ {formatNumber(plan.monthlyPrice)}
                <span className="text-[12px] font-normal text-app-text-2">/mês</span>
              </p>
            </div>
            <ul className="mt-3 divide-y divide-app-line">
              {compareRows.map((row) => {
                const v = row.values[active];
                return (
                  <li key={row.label} className={cn("flex min-h-12 items-center justify-between gap-4 py-2.5 text-[15px]", v === false && "text-app-text-2")}>
                    <RowLabel row={row} />
                    <span className="shrink-0 text-right">
                      <Value v={v} align="end" />
                    </span>
                  </li>
                );
              })}
            </ul>
            <LeadButton origin={`comparativo-${plan.id}`} plan={plan.id} variant="dark" className="mt-4 w-full">
              {compare.cta} {plan.name}
            </LeadButton>
          </div>
        </div>

        <p className="mt-6 text-xs text-fg-3">{publicationNote}</p>
      </div>
    </section>
  );
}
