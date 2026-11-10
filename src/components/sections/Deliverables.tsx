import { deliverables } from "@/content/sections";
import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<(typeof deliverables.items)[number]["icon"], BrandIconName> = {
  Radar: "monitoramento",
  MessageSquareText: "pergunta",
  Swords: "alvo",
  FileText: "conteudo",
  Wrench: "reputacao",
  LineChart: "crescimento",
};

export function Deliverables() {
  return (
    <section id="entregas" aria-labelledby="entregas-title" className="t-nevoa py-20 sm:py-28">
      <div className="shell">
        <SectionHeading id="entregas-title" eyebrow={deliverables.eyebrow} lines={deliverables.headline} markLine={1} />
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {deliverables.items.map((item, i) => (
            <li key={item.title} data-reveal className="p-paper flex flex-col rounded-[28px] p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-full bg-grafite text-lima">
                  <BrandIcon name={icons[item.icon]} className="size-5" />
                </span>
                <span className="t-num text-sm text-fg-3">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-8 text-[1.35rem] font-bold leading-tight tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{item.body}</p>
            </li>
          ))}
        </ul>
        <div data-reveal className="mt-10">
          <ButtonLink href="#diagnostico" variant="dark">
            {deliverables.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
