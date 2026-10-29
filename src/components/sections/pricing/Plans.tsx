"use client";

import Image from "next/image";
import { Check, Gift } from "lucide-react";
import { useEffect, useRef } from "react";
import { commercialConditions, formatNumber, plans, platforms, publicationNote, type Plan, type PlanTheme } from "@/config/plans";
import { pricing } from "@/content/sections";
import { track } from "@/lib/analytics";
import { LeadButton } from "@/components/conversion/LeadButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export const planTheme: Record<PlanTheme, { text: string; bg: string; border: string; soft: string; button: string; glow: string }> = {
  lime: {
    text: "text-lime",
    bg: "bg-lime",
    border: "hover:border-lime/50",
    soft: "bg-lime/10",
    button: "",
    glow: "hover:shadow-[0_30px_80px_-40px_rgba(189,245,49,0.5)]",
  },
  orange: {
    text: "text-orange",
    bg: "bg-orange",
    border: "border-orange/60",
    soft: "bg-orange/10",
    button: "bg-orange hover:shadow-[0_0_40px_-4px_rgba(255,138,30,0.7)]",
    glow: "shadow-[0_40px_120px_-50px_rgba(255,138,30,0.6)]",
  },
  cyan: {
    text: "text-cyan",
    bg: "bg-cyan",
    border: "hover:border-cyan/50",
    soft: "bg-cyan/10",
    button: "bg-cyan hover:shadow-[0_0_40px_-4px_rgba(46,211,202,0.7)]",
    glow: "hover:shadow-[0_30px_80px_-40px_rgba(46,211,202,0.5)]",
  },
};

function PlanCard({ plan }: { plan: Plan }) {
  const t = planTheme[plan.theme];
  const featured = !!plan.tag;
  return (
    <li
      data-reveal
      className={cn(
        "relative flex flex-col overflow-hidden rounded-3xl border bg-graphite transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1",
        featured ? cn("border-2", t.border, t.glow, "lg:-my-4") : cn("border-line", t.border, t.glow),
      )}
    >
      {/* textura do plano, controlada no topo */}
      <div aria-hidden className="relative h-20 overflow-hidden">
        <Image src={plan.texture} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-graphite/10 to-graphite" />
      </div>

      <div className="-mt-6 flex flex-1 flex-col p-6 pt-0 sm:p-7 sm:pt-0">
        <div className="relative flex items-center justify-between gap-3">
          <h3 className="font-display text-2xl font-extrabold uppercase">{plan.name}</h3>
          {plan.tag && <span className={cn("whitespace-nowrap rounded-full px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ink", t.bg)}>{plan.tag}</span>}
        </div>
        <p className="mt-2 text-sm leading-snug text-mist lg:min-h-[4rem]">{plan.audience}</p>

        <p className="mt-5 flex items-baseline gap-1.5">
          <span className="font-mono text-xl text-paper/80">R$</span>
          <span className="font-mono text-[2.75rem] font-medium leading-none tracking-tight text-paper">{formatNumber(plan.monthlyPrice)}</span>
          <span className="text-sm text-mist">/mês</span>
        </p>

        <LeadButton origin={`plano-${plan.id}`} plan={plan.id} className={cn("mt-6 w-full", t.button)} size="md">
          {plan.cta}
        </LeadButton>

        {/* números-chave */}
        <dl className="mt-6 grid grid-cols-3 gap-2 rounded-2xl border border-line bg-ink/50 p-3 text-center">
          {[
            [String(plan.platforms.length), plan.platforms.length === 1 ? "IA" : "IAs"],
            [String(plan.monthlyQuestions), "perguntas/mês"],
            [String(plan.monthlyContent), "conteúdos/mês"],
          ].map(([n, l]) => (
            <div key={l}>
              <dt className="sr-only">{l}</dt>
              <dd>
                <span className={cn("block font-mono text-2xl", t.text)}>{n}</span>
                <span className="text-[0.7rem] leading-tight text-mist">{l}</span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-mist">IAs analisadas</p>
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {plan.platforms.map((id) => {
              const p = platforms[id];
              return (
                <li key={id} className="flex items-center gap-1.5 rounded-full border border-line bg-ink/60 px-2.5 py-1 text-xs text-paper/90">
                  {!p.wide && <Image src={p.logo} alt="" width={p.w} height={p.h} sizes="14px" className="size-3.5 object-contain" />}
                  {p.name}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-mist">Todo mês</p>
          <ul className="mt-2.5 space-y-2 text-sm">
            {plan.inherits && <li className="text-paper/70">{plan.inherits}</li>}
            {[
              `${plan.monthlyQuestions} perguntas de compra testadas`,
              `${plan.monthlyContent} ${plan.monthlyContentNote}`,
              ...plan.monthlyExtras,
            ].map((f) => (
              <li key={f} className="flex gap-2.5 text-paper/90">
                <Check aria-hidden className={cn("mt-0.5 size-4 shrink-0", t.text)} />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 border-t border-line pt-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-mist">No primeiro mês</p>
          <ul className="mt-2.5 space-y-2 text-sm">
            {plan.firstMonth.map((f) => (
              <li key={f} className="flex gap-2.5 text-paper/80">
                <span aria-hidden className={cn("mt-2 size-1.5 shrink-0 rounded-full", t.bg)} />
                {f}
              </li>
            ))}
          </ul>
        </div>
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
    <section ref={ref} id="planos" aria-labelledby="planos-title" className="relative isolate border-t border-line py-20 sm:py-28">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(ellipse_at_50%_0%,rgba(189,245,49,0.07),transparent_65%)]" />
      <div className="shell">
        <SectionHeading id="planos-title" eyebrow={pricing.eyebrow} lines={[pricing.headline]} sub={pricing.sub} />

        <div data-reveal className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          <span className="inline-flex items-center gap-2 rounded-full border border-lime/40 bg-lime/10 px-4 py-1.5 text-lime">
            <Gift aria-hidden className="size-4" />
            {pricing.diagnosticNote}
          </span>
          {commercialConditions.announceNoSetupFee && (
            <span className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-1.5 text-paper/90">{pricing.noSetupFeeNote}</span>
          )}
        </div>

        <ul className="mx-auto mt-14 grid max-w-6xl gap-5 lg:grid-cols-3 lg:items-start">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </ul>
        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-mist/80">
          {publicationNote} “Mais indicado” é uma recomendação de posicionamento da Citável, não um dado de vendas.
        </p>
      </div>
    </section>
  );
}
