"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { commercialConditions, formatNumber, plans, platforms, publicationNote, type Plan, type PlanTheme } from "@/config/plans";
import { pricing } from "@/content/sections";
import { track } from "@/lib/analytics";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { Tag } from "@/components/brand/Graphics";
import { LeadButton } from "@/components/conversion/LeadButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/** Cada plano é um painel da paleta oficial; o botão segue a regra "lima é ação" (no painel lima, grafite). */
export const planTheme: Record<PlanTheme, { panel: string; button: "lima" | "dark"; check: string; dot: string }> = {
  carvao: { panel: "p-carvao", button: "lima", check: "text-lima", dot: "bg-lima" },
  lima: { panel: "p-lima", button: "dark", check: "text-grafite", dot: "bg-grafite" },
  papel: { panel: "p-paper", button: "dark", check: "text-grafite", dot: "bg-grafite" },
};

function PlanCard({ plan }: { plan: Plan }) {
  const t = planTheme[plan.theme];
  return (
    <li data-reveal className={cn("flex flex-col rounded-[28px] p-6 sm:p-8", t.panel)}>
      <div className="flex min-h-8 items-center justify-between gap-3">
        <h3 className="text-[1.6rem] font-bold tracking-[-0.03em]">{plan.name}</h3>
        {plan.tag && <Tag tone="dark">{plan.tag}</Tag>}
      </div>
      <p className="mt-2 text-[15px] leading-snug text-fg-2 lg:min-h-[4.1rem]">{plan.audience}</p>

      <p className="mt-6 flex items-baseline gap-1.5">
        <span className="t-num text-xl">R$</span>
        <span className="t-num text-[3.6rem] leading-none tracking-[-0.03em]">
          {formatNumber(plan.monthlyPrice)}
        </span>
        <span className="text-[15px] text-fg-2">/mês</span>
      </p>

      <LeadButton origin={`plano-${plan.id}`} plan={plan.id} variant={t.button} className="mt-6 w-full">
        {plan.cta}
      </LeadButton>

      <dl className="mt-6 grid grid-cols-3 border-y border-line">
        {[
          [plan.platforms.length, "IAs"],
          [plan.monthlyQuestions, "perguntas/mês"],
          [plan.monthlyContent, "conteúdos/mês"],
        ].map(([n, l], i) => (
          <div key={l} className={cn("py-4", i > 0 && "border-l border-line pl-3")}>
            <dt className="sr-only">{l}</dt>
            <dd>
              <span className="t-num block text-[2rem] leading-none">{n}</span>
              <span className="mt-1 block text-[12px] text-fg-3">{l}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-6">
        <p className="t-label text-fg-3">IAs analisadas</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {plan.platforms.map((id) => {
            const p = platforms[id];
            return (
              <li key={id} className="flex h-7 items-center gap-1.5 rounded-full border border-line px-2.5 text-[12px] font-semibold">
                {!p.wide && <Image src={p.logo} alt="" width={p.w} height={p.h} sizes="14px" className={cn("size-3.5 object-contain", p.mono && plan.theme !== "carvao" && "invert")} />}
                {p.name}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-6">
        <p className="t-label text-fg-3">Todo mês</p>
        <ul className="mt-3 space-y-2.5 text-[15px]">
          {plan.inherits && <li className="text-fg-2">{plan.inherits}</li>}
          {[`${plan.monthlyQuestions} perguntas de compra testadas`, `${plan.monthlyContent} ${plan.monthlyContentNote}`, ...plan.monthlyExtras].map((f) => (
            <li key={f} className="flex gap-2.5">
              <BrandIcon name="citada" className={cn("mt-0.5 size-[18px]", t.check)} />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 border-t border-line pt-5">
        <p className="t-label text-fg-3">No primeiro mês</p>
        <ul className="mt-3 space-y-2 text-[14px] text-fg-2">
          {plan.firstMonth.map((f) => (
            <li key={f} className="flex gap-2.5">
              <span aria-hidden className={cn("mt-1.5 h-3 w-1.5 shrink-0 rotate-[20deg] rounded-full", t.dot)} />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function Plans() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          track("pricing_view");
          io.disconnect();
        }
      },
      // seção mais alta que a tela no mobile: dispara quando o topo entra no terço central
      { rootMargin: "0px 0px -60% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="planos" aria-labelledby="planos-title" className="t-dark py-20 sm:py-28">
      <div className="shell">
        <SectionHeading id="planos-title" eyebrow={pricing.eyebrow} lines={[pricing.headline]} sub={pricing.sub} split />

        <div data-reveal className="mt-8 flex flex-wrap gap-2">
          <Tag tone="lima">{pricing.diagnosticNote}</Tag>
          {commercialConditions.announceNoSetupFee && <Tag tone="line">{pricing.noSetupFeeNote}</Tag>}
        </div>

        <ul className="mt-10 grid gap-3 lg:grid-cols-3 lg:items-start">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-fg-3">
          {publicationNote} “Mais indicado” é uma recomendação de posicionamento da Citável, não um dado de vendas.
        </p>
      </div>
    </section>
  );
}
