"use client";

import Image from "next/image";
import { gptAds } from "@/content/sections";
import { whatsappLink } from "@/content/site";
import { track } from "@/lib/analytics";
import { Tag } from "@/components/brand/Graphics";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { LeadButton } from "@/components/conversion/LeadButton";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Novo serviço: preparação da marca para os anúncios dentro do ChatGPT (OpenAI Ads). */
export function GptAds() {
  return (
    <section id="gpt-ads" aria-labelledby="gpt-ads-title" className="t-dark py-20 sm:py-28">
      <div className="shell">
        <SectionHeading id="gpt-ads-title" eyebrow={gptAds.eyebrow} lines={gptAds.headline} markLine={1} sub={gptAds.sub} split />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-14">
          {/* Simulação do anúncio no ChatGPT */}
          <figure data-reveal className="relative m-0 lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <div className="relative mx-auto max-w-md overflow-hidden rounded-[28px] bg-[#eceeea] lg:max-w-none">
                <Image
                  src="/brand/gpt-ads-mockup.jpg"
                  alt={gptAds.imageAlt}
                  width={1122}
                  height={1402}
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 92vw"
                  className="h-auto w-full"
                />
                <Tag tone="dark" className="absolute left-4 top-4">
                  {gptAds.imageNote}
                </Tag>
              </div>
            </div>
          </figure>

          <div className="lg:col-span-7">
            <p data-reveal className="text-[clamp(1.2rem,1.7vw,1.5rem)] font-semibold leading-snug tracking-[-0.01em]">
              {gptAds.intro}
            </p>

            <h3 data-reveal className="t-label mt-12 text-fg-3">
              {gptAds.listTitle}
            </h3>
            <ol className="mt-4 border-b border-line">
              {gptAds.items.map((item, i) => (
                <li key={item.title} data-reveal className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-4 border-t border-line py-6 sm:grid-cols-[4.5rem_minmax(0,1fr)]">
                  <span className="t-display text-[2.6rem] leading-[0.85] text-lima sm:text-[3.2rem]">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h4 className="text-[1.25rem] font-bold leading-tight tracking-[-0.02em]">{item.title}</h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Fechamento */}
        <div data-reveal className="p-carvao mt-14 grid gap-8 rounded-[28px] p-6 sm:p-10 lg:mt-20 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <p className="t-title text-[clamp(1.8rem,3.2vw,2.8rem)] leading-[1.05]">
              {gptAds.closingTitle[0]} <span className="mark">{gptAds.closingTitle[1]}</span>
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-2 sm:text-[17px]">{gptAds.closingBody}</p>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[1.1rem] font-bold leading-snug">{gptAds.signature}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col">
              <ButtonLink
                href={whatsappLink(gptAds.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                variant="lima"
                arrow={false}
                className="lg:w-full"
                onClick={() => track("whatsapp_click", { origin: "gpt-ads" })}
              >
                <WhatsAppIcon className="size-5" />
                {gptAds.cta}
              </ButtonLink>
              <LeadButton origin="gpt-ads" variant="outline" className="lg:w-full">
                {gptAds.secondaryCta}
              </LeadButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
