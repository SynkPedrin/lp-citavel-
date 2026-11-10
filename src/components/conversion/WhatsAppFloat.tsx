"use client";

import { whatsappLink } from "@/content/site";
import { track } from "@/lib/analytics";
import { BrandIcon } from "@/components/brand/BrandIcon";

/** Atalho fixo para o WhatsApp oficial da Citável (lima é ação). */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Olá, quero falar com a CITÁVEL")}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { origin: "flutuante" })}
      aria-label="Falar com a Citável no WhatsApp (abre em nova aba)"
      className="fixed bottom-4 right-4 z-40 flex h-12 items-center gap-2 rounded-full border-2 border-grafite bg-lima pl-3.5 pr-4 text-[14px] font-bold text-grafite transition-transform duration-[160ms] ease-[var(--ease-cit)] hover:-translate-y-0.5 sm:bottom-6 sm:right-6"
    >
      <BrandIcon name="pergunta" className="size-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
