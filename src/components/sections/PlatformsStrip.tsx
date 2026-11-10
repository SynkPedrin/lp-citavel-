import Image from "next/image";
import { platformOrder, platforms } from "@/config/plans";
import { platformsStrip } from "@/content/sections";

export function PlatformsStrip() {
  return (
    <section aria-labelledby="plataformas-title" className="t-carvao py-12 sm:py-14">
      <div className="shell flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-14">
        <h2 id="plataformas-title" data-reveal className="t-label max-w-[16rem] shrink-0 text-fg-2">
          {platformsStrip.title}
        </h2>
        <ul data-reveal className="flex flex-1 flex-wrap items-center gap-x-8 gap-y-5 lg:justify-between">
          {platformOrder.map((id) => {
            const p = platforms[id];
            return (
              <li key={id} className="flex items-center gap-2.5">
                <span className={p.wide ? "h-6 w-[6.4rem]" : "size-6"}>
                  <Image src={p.logo} alt={p.wide ? p.name : ""} width={p.w} height={p.h} sizes={p.wide ? "104px" : "24px"} className="h-full w-full object-contain" />
                </span>
                {!p.wide && <span className="text-[15px] font-semibold text-fg">{p.name}</span>}
              </li>
            );
          })}
        </ul>
      </div>
      <p className="shell mt-6 text-xs text-fg-3">{platformsStrip.note}</p>
    </section>
  );
}
