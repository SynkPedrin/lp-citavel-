import { CircleHelp, EyeOff, Users, type LucideIcon } from "lucide-react";
import { problem } from "@/content/sections";
import { LeadButton } from "@/components/conversion/LeadButton";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<(typeof problem.cards)[number]["icon"], LucideIcon> = { EyeOff, Users, CircleHelp };

export function Problem() {
  return (
    <section id="problema" aria-labelledby="problema-title" className="py-20 sm:py-28">
      <div className="shell">
        <SectionHeading id="problema-title" eyebrow={problem.eyebrow} lines={problem.headline} accentLine={1} sub={problem.sub} />
        <ul className="mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-3">
          {problem.cards.map((card) => {
            const Icon = icons[card.icon];
            return (
              <li
                key={card.title}
                data-reveal
                className="group rounded-2xl border border-line bg-graphite/60 p-6 transition-[border-color,transform] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-orange/40 sm:p-7"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-orange/10 text-orange transition-transform duration-500 group-hover:scale-110">
                  <Icon aria-hidden className="size-5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-paper">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{card.body}</p>
              </li>
            );
          })}
        </ul>
        <div data-reveal className="mt-10 flex justify-center">
          <LeadButton origin="problema" size="lg">
            {problem.cta}
          </LeadButton>
        </div>
      </div>
    </section>
  );
}
