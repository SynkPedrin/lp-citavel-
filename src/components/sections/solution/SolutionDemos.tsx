import Image from "next/image";
import { platforms } from "@/config/plans";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { SourceChip } from "@/components/brand/Graphics";
import { cn } from "@/lib/utils";

/** Mini-telas da plataforma (papel para ler). Dados fictícios. */

function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[24px] bg-grafite p-2">
      <div className="rounded-[18px] bg-app-bg p-4 text-grafite sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="truncate text-[14px] font-bold">{title}</p>
          <span className="inline-flex h-6 shrink-0 items-center rounded-full bg-info px-2.5 text-[11px] font-bold uppercase tracking-[0.06em]">Exemplo</span>
        </div>
        {children}
      </div>
    </div>
  );
}

const chip = "inline-flex h-6 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 text-[12px] font-semibold";
const pill = <span aria-hidden className="h-2.5 w-1.5 rotate-[20deg] rounded-full bg-current opacity-70" />;

export function AnalysisDemo() {
  const mentions = [
    { name: "Concorrente A", pos: "1º", cited: true },
    { name: "Concorrente B", pos: "2º", cited: true },
    { name: "Sua marca", pos: "—", cited: false, you: true },
  ];
  return (
    <Frame title="Resposta analisada · ChatGPT">
      <div data-demo-item className="rounded-[16px] border border-app-line bg-white p-4">
        <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] text-app-text-2">
          <Image src={platforms.chatgpt.logo} alt="" width={512} height={512} className="size-4" />
          Pergunta testada
        </p>
        <p className="mt-2 text-[15px] font-semibold leading-snug">“Qual a melhor empresa de [seu serviço] em [sua cidade]?”</p>
        <p className="mt-3 text-[14px] leading-relaxed text-app-text-2">
          …com base no que encontrei, recomendo a <b className="text-grafite">Concorrente A</b> <SourceChip n={1} className="text-[19px]" /> e a{" "}
          <b className="text-grafite">Concorrente B</b> <SourceChip n={2} className="text-[19px]" />.
        </p>
      </div>
      <ul className="mt-3 divide-y divide-app-line rounded-[16px] border border-app-line bg-white">
        {mentions.map((m) => (
          <li key={m.name} data-demo-item className="flex items-center justify-between gap-3 px-4 py-3 text-[14px]">
            <span className={m.you ? "font-bold" : undefined}>{m.name}</span>
            <span className="flex items-center gap-3">
              <span className="t-num text-app-text-2">{m.pos}</span>
              {m.cited ? (
                <span className={cn(chip, "bg-app-line text-app-text-2")}>{pill}Citada</span>
              ) : (
                <span className={cn(chip, "bg-danger-bg text-[#9b2f19]")}>{pill}Não citada</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

export function OpportunitiesDemo() {
  const rows = [
    { phase: "U", title: "Padronizar endereço e telefone nos perfis", priority: "Alta", status: "Concluída" },
    { phase: "L", title: "Criar FAQ sobre o serviço principal", priority: "Alta", status: "Em produção" },
    { phase: "L", title: "Revisar a página de serviços", priority: "Média", status: "Planejada" },
    { phase: "S", title: "Buscar citação em guia do setor", priority: "Média", status: "Planejada" },
  ];
  return (
    <Frame title="Oportunidades identificadas · 4 de 8">
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.title} data-demo-item className="flex flex-wrap items-center gap-3 rounded-[14px] border border-app-line bg-white px-3 py-2.5 sm:flex-nowrap">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-grafite text-[12px] font-extrabold text-papel">{r.phase}</span>
            <span className="min-w-0 flex-1 text-[14px]">{r.title}</span>
            <span className={cn(chip, r.priority === "Alta" ? "bg-[#fbecd6] text-[#8a5410]" : "bg-app-line text-app-text-2")}>{r.priority}</span>
            <span
              className={cn(
                chip,
                r.status === "Concluída" ? "bg-grafite text-papel" : r.status === "Em produção" ? "bg-lima text-grafite" : "bg-app-line text-app-text-2",
              )}
            >
              {pill}
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
          ["Revisão", "dia 05"],
        ].map(([k, v]) => (
          <div key={k} data-demo-item className="rounded-[14px] border border-app-line bg-white p-3">
            <dt className="text-[11px] font-bold uppercase tracking-[0.06em] text-app-text-2">{k}</dt>
            <dd className="t-num mt-1 text-[22px] leading-none">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_11rem]">
        <ul className="space-y-2 rounded-[14px] border border-app-line bg-white p-3">
          {delivered.map((d) => (
            <li key={d.label} data-demo-item className="flex items-center gap-2.5 text-[14px]">
              <span className={cn("grid size-5 shrink-0 place-items-center rounded-full", d.done ? "bg-lima text-grafite" : "border border-app-line text-app-text-2")}>
                <BrandIcon name={d.done ? "citada" : "monitoramento"} className="size-3" />
              </span>
              <span className={d.done ? undefined : "text-app-text-2"}>{d.label}</span>
            </li>
          ))}
        </ul>
        <div data-demo-item className="rounded-[14px] border border-app-line bg-white p-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.06em] text-app-text-2">Presença</p>
          <svg viewBox="0 0 120 50" className="mt-2 h-14 w-full overflow-visible" role="img" aria-label="Evolução ilustrativa da presença: de 18% para 38% em seis medições">
            <polyline
              points={trend.map((v, i) => `${(i * 120) / (trend.length - 1)},${50 - (v / max) * 50}`).join(" ")}
              fill="none"
              stroke="#1c1d1a"
              strokeWidth="2.2"
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray="1"
              data-demo-line
            />
            <circle cx="120" cy={50 - (38 / max) * 50} r="4" fill="#cff24a" stroke="#1c1d1a" strokeWidth="1.6" />
          </svg>
          <p className="t-num mt-1 text-[15px]">18% → 38%</p>
        </div>
      </div>
    </Frame>
  );
}
