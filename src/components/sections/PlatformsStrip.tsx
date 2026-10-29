import Image from "next/image";
import { platformOrder, platforms } from "@/config/plans";
import { platformsStrip } from "@/content/sections";

export function PlatformsStrip() {
  return (
    <section aria-labelledby="plataformas-title" className="border-y border-line bg-void/40 py-14 sm:py-16">
      <div className="shell">
        <h2 id="plataformas-title" data-reveal className="text-center font-mono text-xs uppercase tracking-[0.18em] text-mist">
          {platformsStrip.title}
        </h2>
        <ul data-reveal className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-12">
          {platformOrder.map((id) => {
            const p = platforms[id];
            return (
              <li key={id} className="group flex items-center gap-2.5 opacity-80 transition-opacity duration-300 hover:opacity-100">
                <span className={p.wide ? "h-7 w-[7.4rem]" : "size-7"}>
                  <Image src={p.logo} alt={p.wide ? p.name : ""} width={p.w} height={p.h} sizes={p.wide ? "120px" : "28px"} className="h-full w-full object-contain" />
                </span>
                {!p.wide && <span className="text-base font-semibold text-paper/90">{p.name}</span>}
              </li>
            );
          })}
        </ul>
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-mist/70">{platformsStrip.note}</p>
      </div>
    </section>
  );
}
