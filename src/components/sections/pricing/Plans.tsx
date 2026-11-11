"use client";

import { useEffect, useRef, useState } from "react";
import { commercialConditions, formatNumber, plans, publicationNote, type Plan, type PlanTheme } from "@/config/plans";
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
    <li data-reveal data-plan-card className={cn("relative flex w-[86%] shrink-0 snap-start flex-col rounded-[28px] p-6 sm:w-[62%] sm:p-8 md:w-[46%] lg:w-auto", t.panel)}>
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

      <ul className="mt-6 space-y-3 text-[15px] leading-snug">
        {plan.highlights.map((f) => (
          <li key={f} className="flex gap-2.5">
            <BrandIcon name="citada" className={cn("mt-px size-[18px] shrink-0", t.check)} />
            {f}
          </li>
        ))}
      </ul>
    </li>
  );
}

export function Plans() {
  const ref = useRef<HTMLElement>(null);
  const rail = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const cards = () => [...(rail.current?.querySelectorAll<HTMLElement>("[data-plan-card]") ?? [])];
  const onScroll = () => {
    const el = rail.current;
    if (!el) return;
    const x = el.scrollLeft;
    const list = cards();
    let best = 0;
    list.forEach((c, i) => {
      if (Math.abs(c.offsetLeft - el.offsetLeft - x) < Math.abs(list[best].offsetLeft - el.offsetLeft - x)) best = i;
    });
    // no fim da rolagem o último card pode não alinhar ao início
    if (x + el.clientWidth >= el.scrollWidth - 4) best = list.length - 1;
    setActive(best);
  };
  const goTo = (i: number) => {
    const el = rail.current;
    const c = cards()[i];
    if (!el || !c) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: c.offsetLeft - el.offsetLeft - parseFloat(getComputedStyle(el).scrollPaddingLeft || "0"), behavior: smooth ? "smooth" : "auto" });
  };

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

        {/* Mobile e tablet: os planos lado a lado, arrastando para o lado (sem rolar três cards gigantes). Desktop: grade. */}
        <ul
          ref={rail}
          onScroll={onScroll}
          aria-label="Planos"
          className="no-scrollbar relative -mx-4 mt-10 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 min-[900px]:-mx-14 min-[900px]:scroll-px-14 min-[900px]:px-14 lg:mx-0 lg:grid lg:grid-cols-3 lg:items-stretch lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-center gap-1 lg:hidden">
          {plans.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ver plano ${p.name}`}
              aria-current={i === active ? "true" : undefined}
              className="grid size-8 place-items-center"
            >
              <span
                aria-hidden
                className={cn(
                  "h-3 rounded-full transition-all duration-[320ms] ease-[var(--ease-cit)]",
                  i === active ? "w-6 bg-lima" : "w-1.5 rotate-[20deg] bg-fg-3",
                )}
              />
            </button>
          ))}
        </div>
        <p data-reveal className="mt-8 text-center">
          <a href="#comparativo" className="inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-lima decoration-2 underline-offset-[6px] hover:text-lima">
            Ver tudo que está incluso em cada plano <span aria-hidden>→</span>
          </a>
        </p>
        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-fg-3">
          {publicationNote} “Mais indicado” é uma recomendação de posicionamento da Citável, não um dado de vendas.
        </p>
      </div>
    </section>
  );
}
