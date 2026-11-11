"use client";

import { whatsappLink } from "@/content/site";
import { track } from "@/lib/analytics";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";

/** Atalho fixo para o WhatsApp oficial da Citável (lima é ação). */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Olá, quero falar com a CITÁVEL")}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { origin: "flutuante" })}
      aria-label="Falar com a Citável no WhatsApp (abre em nova aba)"
      className="fixed bottom-3 right-3 z-40 grid size-12 place-items-center rounded-full border-2 border-grafite bg-lima text-grafite shadow-[0_6px_20px_rgb(0_0_0/0.25)] transition-transform duration-[160ms] ease-[var(--ease-cit)] hover:-translate-y-0.5 sm:bottom-6 sm:right-6 sm:flex sm:h-12 sm:w-auto sm:gap-2 sm:pl-3.5 sm:pr-4 sm:text-[14px] sm:font-bold"
    >
      <WhatsAppIcon className="size-6 sm:size-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
