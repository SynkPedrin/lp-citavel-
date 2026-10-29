"use client";

import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/content/site";
import { track } from "@/lib/analytics";

/** Atalho fixo para o WhatsApp oficial da Citável. */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Olá, quero falar com a CITÁVEL")}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { origin: "flutuante" })}
      aria-label="Falar com a Citável no WhatsApp (abre em nova aba)"
      className="fixed bottom-4 right-4 z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_30px_-8px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:scale-105 sm:bottom-6 sm:right-6"
    >
      <MessageCircle aria-hidden className="size-6" strokeWidth={2.2} />
    </a>
  );
}
