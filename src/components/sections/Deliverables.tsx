import { FileText, LineChart, MessageSquareText, Radar, Swords, Wrench, type LucideIcon } from "lucide-react";
import { deliverables } from "@/content/sections";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<(typeof deliverables.items)[number]["icon"], LucideIcon> = {
  Radar,
  MessageSquareText,
  Swords,
  FileText,
  Wrench,
  LineChart,
};

export function Deliverables() {
  return (
    <section id="entregas" aria-labelledby="entregas-title" className="border-t border-line bg-void/40 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading id="entregas-title" eyebrow={deliverables.eyebrow} lines={deliverables.headline} accentLine={1} />
        <ul className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {deliverables.items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li
                key={item.title}
                data-reveal
                className="group flex gap-4 rounded-2xl border border-line bg-graphite/60 p-6 transition-[border-color,transform] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-lime/40"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line-strong text-lime transition-colors duration-500 group-hover:bg-lime group-hover:text-ink">
                  <Icon aria-hidden className="size-5" strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="font-bold text-paper">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist">{item.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <div data-reveal className="mt-10 flex justify-center">
          <ButtonLink href="#diagnostico" size="lg">
            {deliverables.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
