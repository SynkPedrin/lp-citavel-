import Image from "next/image";
import { Check, CircleDashed, Clock3, X } from "lucide-react";
import { platforms } from "@/config/plans";
import { IllustrativeBadge } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/** Mini-interfaces demonstrativas (dados fictícios) das três etapas do trabalho. */

function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-graphite shadow-[0_40px_100px_-50px_rgba(0,0,0,0.95)]">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <p className="truncate text-xs font-medium text-paper/80">{title}</p>
        <IllustrativeBadge>Ilustrativo</IllustrativeBadge>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

export function AnalysisDemo() {
  const mentions = [
    { name: "Concorrente A", cited: true, pos: "1º" },
    { name: "Concorrente B", cited: true, pos: "2º" },
    { name: "Sua marca", cited: false, pos: "—", you: true },
  ];
  return (
    <Frame title="Análise de resposta · ChatGPT">
      <div data-demo-item className="flex items-center gap-2 text-xs text-mist">
        <Image src={platforms.chatgpt.logo} alt="" width={512} height={512} className="size-4" />
        Plataforma analisada: ChatGPT
      </div>
      <p data-demo-item className="mt-3 rounded-xl bg-ink/70 px-4 py-3 text-sm text-paper">
        <span className="text-mist">Pergunta testada: </span>“Qual a melhor empresa de [seu serviço] em [sua cidade]?”
      </p>
      <p data-demo-item className="mt-4 text-xs text-mist">Marcas mencionadas na resposta</p>
      <ul className="mt-2 space-y-2">
        {mentions.map((m) => (
          <li key={m.name} data-demo-item className={cn("flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm", m.you ? "border-orange/40 bg-orange/5" : "border-line bg-ink/50")}>
            <span className={m.you ? "font-semibold text-paper" : "text-paper/90"}>{m.name}</span>
            <span className="flex items-center gap-3">
              <span className="font-mono text-xs text-mist">{m.pos}</span>
              {m.cited ? (
                <span className="inline-flex items-center gap-1 text-xs text-paper/80">
                  <Check aria-hidden className="size-3.5 text-lime" /> Citada
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-orange">
                  <X aria-hidden className="size-3.5" /> Não citada
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
      <dl data-demo-item className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-4 text-center">
        {[
          ["Menções", "2 de 3"],
          ["Sua posição", "—"],
          ["Fonte citada", "Concorrente"],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-[0.68rem] text-mist">{k}</dt>
            <dd className="mt-0.5 font-mono text-sm text-paper">{v}</dd>
          </div>
        ))}
      </dl>
    </Frame>
  );
}

export function OpportunitiesDemo() {
  const rows = [
    { title: "Criar FAQ sobre o serviço principal", area: "Conteúdo", priority: "Alta", status: "Em produção" },
    { title: "Padronizar endereço e telefone nos perfis", area: "Informações", priority: "Alta", status: "Concluído" },
    { title: "Revisar a página de serviços", area: "Página", priority: "Média", status: "Planejado" },
    { title: "Buscar citação em guia do setor", area: "Autoridade", priority: "Média", status: "Planejado" },
  ];
  return (
    <Frame title="Oportunidades identificadas · 4 de 8">
      <div className="hidden grid-cols-[1fr_5.5rem_6rem] gap-3 px-3 pb-2 text-[0.68rem] uppercase tracking-wider text-mist sm:grid">
        <span>Ação sugerida</span>
        <span>Prioridade</span>
        <span>Status</span>
      </div>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.title} data-demo-item className="grid gap-2 rounded-xl border border-line bg-ink/50 px-3 py-3 sm:grid-cols-[1fr_5rem_7.5rem] sm:items-center sm:gap-3">
            <div>
              <p className="text-sm text-paper">{r.title}</p>
              <p className="text-xs text-mist">{r.area}</p>
            </div>
            <span className={cn("w-fit rounded-full px-2.5 py-0.5 text-xs", r.priority === "Alta" ? "bg-orange/15 text-orange" : "bg-paper/10 text-paper/80")}>{r.priority}</span>
            <span className={cn("inline-flex w-fit items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs", r.status === "Concluído" ? "bg-lime/15 text-lime" : "bg-paper/10 text-mist")}>
              {r.status === "Concluído" ? <Check aria-hidden className="size-3" /> : r.status === "Em produção" ? <Clock3 aria-hidden className="size-3" /> : <CircleDashed aria-hidden className="size-3" />}
              {r.status}
            </span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

export function ExecutionDemo() {
  const delivered = [
    { label: "FAQ: dúvidas sobre o serviço principal", done: true },
    { label: "Artigo: como escolher um fornecedor na região", done: true },
    { label: "Perfil da Empresa no Google atualizado", done: true },
    { label: "Página de serviço revisada", done: false },
  ];
  const trend = [18, 22, 21, 29, 33, 38];
  const max = 45;
  return (
    <Frame title="Mês 3 · acompanhamento">
      <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          ["Conteúdos", "4/4"],
          ["Ajustes", "6"],
          ["Perguntas", "30"],
          ["Próxima revisão", "dia 05"],
        ].map(([k, v]) => (
          <div key={k} data-demo-item className="rounded-xl border border-line bg-ink/50 p-3">
            <dt className="text-[0.68rem] text-mist">{k}</dt>
            <dd className="mt-1 font-mono text-lg text-paper">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_11rem]">
        <ul className="space-y-1.5">
          {delivered.map((d) => (
            <li key={d.label} data-demo-item className="flex items-center gap-2.5 text-sm">
              <span className={cn("grid size-5 shrink-0 place-items-center rounded-full", d.done ? "bg-lime text-ink" : "border border-line-strong text-mist")}>
                {d.done ? <Check aria-hidden className="size-3" strokeWidth={3} /> : <Clock3 aria-hidden className="size-3" />}
              </span>
              <span className={d.done ? "text-paper/90" : "text-mist"}>{d.label}</span>
            </li>
          ))}
        </ul>
        <div data-demo-item className="rounded-xl border border-line bg-ink/50 p-3">
          <p className="text-[0.68rem] text-mist">Presença nas respostas</p>
          <svg viewBox="0 0 120 50" className="mt-2 h-14 w-full overflow-visible" role="img" aria-label="Evolução ilustrativa da presença: de 18% para 38% em seis medições">
            <polyline
              points={trend.map((v, i) => `${(i * 120) / (trend.length - 1)},${50 - (v / max) * 50}`).join(" ")}
              fill="none"
              stroke="#bdf531"
              strokeWidth="2"
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray="1"
              data-demo-line
            />
          </svg>
          <p className="mt-1 font-mono text-xs text-paper">18% → 38%</p>
        </div>
      </div>
    </Frame>
  );
}
