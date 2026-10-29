"use client";

import Image from "next/image";
import { Check, Minus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { platforms, type PlatformId } from "@/config/plans";
import { computePulsoScore, formatScore } from "@/lib/pulso";
import { cn } from "@/lib/utils";

/**
 * Preview de relatório Citável — DEMONSTRAÇÃO com marca e números fictícios.
 * Não representa resultado real nem painel automatizado disponível ao cliente.
 */

const tabs = ["Visão geral", "Perguntas", "Concorrentes", "Oportunidades"] as const;
type Tab = (typeof tabs)[number];

const dims = { v: 46, c: 38, s: 64 };
const score = computePulsoScore(dims);

const presence: { id: PlatformId; pct: number }[] = [
  { id: "chatgpt", pct: 40 },
  { id: "gemini", pct: 33 },
  { id: "perplexity", pct: 27 },
  { id: "google-ai", pct: 47 },
];

const questions: { q: string; ai: PlatformId; status: "citada" | "ausente" | "parcial"; who: string }[] = [
  { q: "Qual a melhor clínica odontológica de Araçatuba?", ai: "chatgpt", status: "ausente", who: "Concorrente A, Concorrente B" },
  { q: "Clínica de implante dentário com bom atendimento perto de mim", ai: "gemini", status: "citada", who: "Marca Exemplo (2ª)" },
  { q: "Quanto custa clareamento dental em Araçatuba?", ai: "perplexity", status: "parcial", who: "Citada sem link do site" },
  { q: "Dentista que atende convênio no centro de Araçatuba", ai: "google-ai", status: "ausente", who: "Concorrente C" },
];

const competitors = [
  { name: "Concorrente A", pct: 58 },
  { name: "Marca Exemplo", pct: 40, you: true },
  { name: "Concorrente B", pct: 35 },
  { name: "Concorrente C", pct: 22 },
];

const opportunities = [
  { title: "Criar página de perguntas frequentes sobre implantes", type: "Conteúdo", priority: "Alta", status: "Em produção" },
  { title: "Padronizar endereço e telefone nos perfis da clínica", type: "Informações", priority: "Alta", status: "Concluído" },
  { title: "Revisar página de serviços com preços e convênios", type: "Página", priority: "Média", status: "Planejado" },
  { title: "Buscar citação em guia regional de saúde", type: "Autoridade", priority: "Média", status: "Planejado" },
];

function Logo({ id, size = 18 }: { id: PlatformId; size?: number }) {
  const p = platforms[id];
  return (
    <span className="grid shrink-0 place-items-center" style={{ width: p.wide ? size * 2.6 : size, height: size }}>
      <Image src={p.logo} alt="" width={p.w} height={p.h} sizes="48px" className="h-full w-full object-contain" />
    </span>
  );
}

function Bar({ pct, tone = "lime", delay = 0 }: { pct: number; tone?: "lime" | "mist"; delay?: number }) {
  return (
    <span className="block h-1.5 w-full overflow-hidden rounded-full bg-line">
      <span
        className={cn("block h-full origin-left rounded-full motion-safe:animate-[grow-x_0.9s_var(--ease-out-expo)_both]", tone === "lime" ? "bg-lime" : "bg-paper/30")}
        style={{ width: `${pct}%`, animationDelay: `${delay}ms` }}
      />
    </span>
  );
}

function Overview() {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div className="grid gap-3 sm:grid-cols-[13rem_1fr]">
      <div className="rounded-xl border border-line bg-ink/60 p-4">
        <p className="text-xs text-mist">PULSO Score</p>
        <div className="mt-3 flex items-center gap-4">
          <svg viewBox="0 0 80 80" className="size-20 -rotate-90" aria-hidden>
            <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(245,245,240,0.08)" strokeWidth="7" />
            <circle
              cx="40"
              cy="40"
              r={r}
              fill="none"
              stroke="#bdf531"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c * (1 - score / 100)}
              className="motion-safe:animate-[gauge_1.4s_var(--ease-out-expo)_both]"
              style={{ ["--gauge-from" as string]: c }}
            />
          </svg>
          <div>
            <p className="font-mono text-3xl font-medium tabular-nums text-paper">{formatScore(score)}</p>
            <p className="text-xs text-mist">de 100</p>
          </div>
        </div>
        <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-3 text-center">
          {(
            [
              ["V", dims.v],
              ["C", dims.c],
              ["S", dims.s],
            ] as const
          ).map(([k, v]) => (
            <div key={k}>
              <dt className="font-mono text-[0.65rem] text-lime">{k}</dt>
              <dd className="font-mono text-sm text-paper">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="grid gap-3">
        <div className="grid grid-cols-3 gap-3">
          {[
            ["30", "perguntas analisadas"],
            ["3", "concorrentes citados"],
            ["8", "oportunidades"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-xl border border-line bg-ink/60 p-3">
              <p className="font-mono text-2xl text-paper">{n}</p>
              <p className="text-[0.7rem] leading-tight text-mist">{l}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-line bg-ink/60 p-4">
          <p className="text-xs text-mist">Presença por IA · % das perguntas em que a marca aparece</p>
          <ul className="mt-3 space-y-2.5">
            {presence.map((p, i) => (
              <li key={p.id} className="grid grid-cols-[5.5rem_1fr_2.5rem] items-center gap-3 text-xs">
                <span className="flex items-center gap-2 truncate text-paper/90">
                  {!platforms[p.id].wide && <Logo id={p.id} size={14} />}
                  {platforms[p.id].name}
                </span>
                <Bar pct={p.pct} delay={i * 90} />
                <span className="text-right font-mono text-paper">{p.pct}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Questions() {
  const status = {
    citada: { label: "Citada", icon: Check, cls: "text-lime bg-lime/10" },
    parcial: { label: "Parcial", icon: Minus, cls: "text-orange bg-orange/10" },
    ausente: { label: "Não citada", icon: X, cls: "text-paper/70 bg-paper/10" },
  } as const;
  return (
    <ul className="divide-y divide-line rounded-xl border border-line bg-ink/60">
      {questions.map((q, i) => {
        const s = status[q.status];
        return (
          <li key={q.q} className="grid gap-2 p-3 motion-safe:animate-[fade-up_0.5s_var(--ease-out-expo)_both] sm:grid-cols-[1fr_auto] sm:items-center" style={{ animationDelay: `${i * 70}ms` }}>
            <div className="flex min-w-0 items-start gap-3">
              <span className="mt-0.5">{platforms[q.ai].wide ? <Logo id={q.ai} size={12} /> : <Logo id={q.ai} size={16} />}</span>
              <div className="min-w-0">
                <p className="truncate text-sm text-paper">“{q.q}”</p>
                <p className="text-xs text-mist">{q.who}</p>
              </div>
            </div>
            <span className={cn("inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium", s.cls)}>
              <s.icon aria-hidden className="size-3" />
              {s.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function Competitors() {
  return (
    <div className="rounded-xl border border-line bg-ink/60 p-4">
      <p className="text-xs text-mist">Participação nas respostas · 30 perguntas · 4 IAs</p>
      <ol className="mt-4 space-y-3">
        {competitors.map((c, i) => (
          <li key={c.name} className="grid grid-cols-[1.5rem_8rem_1fr_2.5rem] items-center gap-3 text-sm">
            <span className="font-mono text-xs text-mist">{i + 1}º</span>
            <span className={cn("truncate", c.you ? "font-semibold text-lime" : "text-paper/90")}>
              {c.name}
              {c.you && <span className="ml-1 text-[0.65rem] font-normal text-mist">(você)</span>}
            </span>
            <Bar pct={c.pct} tone={c.you ? "lime" : "mist"} delay={i * 90} />
            <span className="text-right font-mono text-xs text-paper">{c.pct}%</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Opportunities() {
  return (
    <ul className="grid gap-2">
      {opportunities.map((o, i) => (
        <li
          key={o.title}
          className="grid gap-2 rounded-xl border border-line bg-ink/60 p-3 motion-safe:animate-[fade-up_0.5s_var(--ease-out-expo)_both] sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-4"
          style={{ animationDelay: `${i * 70}ms` }}
        >
          <div>
            <p className="text-sm text-paper">{o.title}</p>
            <p className="text-xs text-mist">{o.type}</p>
          </div>
          <span className={cn("w-fit rounded-full px-2.5 py-1 text-xs", o.priority === "Alta" ? "bg-orange/15 text-orange" : "bg-paper/10 text-paper/80")}>
            Prioridade {o.priority.toLowerCase()}
          </span>
          <span className={cn("w-fit rounded-full px-2.5 py-1 text-xs", o.status === "Concluído" ? "bg-lime/15 text-lime" : "bg-paper/10 text-mist")}>
            {o.status}
          </span>
        </li>
      ))}
    </ul>
  );
}

const panels: Record<Tab, () => React.JSX.Element> = {
  "Visão geral": Overview,
  Perguntas: Questions,
  Concorrentes: Competitors,
  Oportunidades: Opportunities,
};

export function HeroDashboard() {
  const [active, setActive] = useState<Tab>("Visão geral");
  const interacted = useRef(false);
  const root = useRef<HTMLDivElement>(null);

  // Troca automática e discreta de abas até a primeira interação (desligada com movimento reduzido).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (el) io.observe(el);
    const t = window.setInterval(() => {
      if (interacted.current || !visible || document.hidden) return;
      setActive((cur) => tabs[(tabs.indexOf(cur) + 1) % tabs.length]);
    }, 5200);
    return () => {
      window.clearInterval(t);
      io.disconnect();
    };
  }, []);

  const Panel = panels[active];

  return (
    <div ref={root} className="overflow-hidden rounded-[1.4rem] border border-line-strong bg-graphite/95 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95),0_0_0_1px_rgba(189,245,49,0.04)]">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div className="flex items-center gap-2" aria-hidden>
          <span className="size-2.5 rounded-full bg-paper/15" />
          <span className="size-2.5 rounded-full bg-paper/15" />
          <span className="size-2.5 rounded-full bg-paper/15" />
        </div>
        <p className="truncate text-xs text-mist">Relatório Citável · Marca Exemplo</p>
        <span className="shrink-0 rounded-full border border-orange/40 bg-orange/10 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-orange">
          Ilustrativo
        </span>
      </div>

      <div className="flex flex-col gap-0 sm:flex-row">
        <div role="tablist" aria-label="Seções do relatório de exemplo" className="flex gap-1 overflow-x-auto border-b border-line p-2 sm:w-44 sm:shrink-0 sm:flex-col sm:border-b-0 sm:border-r">
          {tabs.map((t) => (
            <button
              key={t}
              role="tab"
              type="button"
              id={`tab-${t}`}
              aria-selected={active === t}
              aria-controls="hero-dash-panel"
              onClick={() => {
                interacted.current = true;
                setActive(t);
              }}
              className={cn(
                "whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm transition-colors",
                active === t ? "bg-lime/10 font-medium text-lime" : "text-mist hover:bg-paper/5 hover:text-paper",
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <div id="hero-dash-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="min-w-0 flex-1 p-3 sm:p-4">
          <div key={active} className="motion-safe:animate-[fade-in_0.4s_ease-out_both]">
            <Panel />
          </div>
          <p className="mt-3 text-[0.68rem] text-mist/70">
            Exemplo com marca e números fictícios. O diagnóstico real traz as respostas das IAs na íntegra.
          </p>
        </div>
      </div>
    </div>
  );
}
