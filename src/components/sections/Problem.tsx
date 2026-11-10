import Image from "next/image";
import { platforms } from "@/config/plans";
import { problem } from "@/content/sections";
import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";
import { SourceChip } from "@/components/brand/Graphics";
import { LeadButton } from "@/components/conversion/LeadButton";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<(typeof problem.cards)[number]["icon"], BrandIconName> = {
  EyeOff: "nao-citada",
  Users: "fontes",
  CircleHelp: "pergunta",
};

const cited = [
  { name: "Concorrente A", why: "citado em guias do setor e avaliações" },
  { name: "Concorrente B", why: "conteúdo claro sobre serviços e preços" },
  { name: "Concorrente C", why: "presença em listas e imprensa local" },
];

/** Exemplo de resposta de IA (fictício): as marcas citadas e o lugar tracejado que é seu. */
function AnswerExample() {
  return (
    <figure className="p-dark m-0 flex h-full flex-col rounded-[28px] p-5 sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <span className="t-label text-fg-3">Exemplo de resposta de IA</span>
        <span className="inline-flex h-6 items-center rounded-full bg-carvao px-2.5 text-[11px] font-bold uppercase tracking-[0.06em] text-fg-2">Fictício</span>
      </div>

      <div className="mt-6 flex justify-end">
        <p className="max-w-[90%] rounded-[20px] rounded-tr-[6px] bg-papel px-4 py-3 text-[15px] font-semibold text-grafite sm:text-base">
          Qual a melhor empresa de [seu serviço] em [sua cidade]?
        </p>
      </div>

      <div className="mt-5 flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-carvao">
          <Image src={platforms.chatgpt.logo} alt="" width={512} height={512} sizes="20px" className="size-5" />
        </span>
        <p className="text-[15px] leading-relaxed text-fg-2 sm:text-base">Com base no que encontrei, estas são as mais indicadas:</p>
      </div>

      <ol className="mt-4 space-y-2">
        {cited.map((c, i) => (
          <li key={c.name} data-reveal className="flex items-center gap-3 rounded-[16px] bg-carvao px-4 py-3">
            <span className="t-num w-5 text-lima">{i + 1}</span>
            <span className="min-w-0 flex-1">
              <span className="block font-bold">
                {c.name} <SourceChip n={i + 1} className="ml-0.5 bg-lima text-[17px] text-grafite" />
              </span>
              <span className="block text-[13px] text-fg-3">{c.why}</span>
            </span>
          </li>
        ))}
        {/* o lugar tracejado é o seu */}
        <li data-reveal className="flex items-center gap-3 rounded-[16px] border-2 border-dashed border-lima/70 px-4 py-3">
          <span className="t-num w-5 text-fg-3">?</span>
          <span className="min-w-0 flex-1">
            <span className="block font-bold text-lima">Sua empresa</span>
            <span className="block text-[13px] text-fg-3">não aparece nesta resposta</span>
          </span>
          <BrandIcon name="nao-citada" className="size-5 text-lima" />
        </li>
      </ol>

      <figcaption className="mt-auto pt-6 text-[clamp(1.3rem,2vw,1.7rem)] font-bold leading-tight tracking-[-0.03em]">
        Entre tantas respostas, <span className="mark">nenhuma cita você.</span>
      </figcaption>
    </figure>
  );
}

export function Problem() {
  return (
    <section id="problema" aria-labelledby="problema-title" className="t-paper py-20 sm:py-28">
      <div className="shell">
        <SectionHeading id="problema-title" eyebrow={problem.eyebrow} lines={problem.headline} markLine={1} sub={problem.sub} split />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          <div data-reveal className="lg:col-span-7">
            <AnswerExample />
          </div>

          <div className="flex flex-col lg:col-span-5">
            <ol className="border-b-2 border-grafite">
              {problem.cards.map((card, i) => (
                <li key={card.title} data-reveal className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-4 border-t-2 border-grafite py-6">
                  <span className="t-display text-[3.2rem] leading-[0.8]">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="flex items-center gap-2.5 text-[1.3rem] font-bold leading-tight tracking-[-0.02em]">
                      <BrandIcon name={icons[card.icon]} className="size-5 shrink-0" />
                      {card.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{card.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div data-reveal className="mt-8">
              <LeadButton origin="problema" variant="dark" className="w-full sm:w-auto">
                {problem.cta}
              </LeadButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
