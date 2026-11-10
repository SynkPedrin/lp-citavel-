"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { LeadDelivery } from "@/lib/env";
import { PLAN_INTEREST_LABEL } from "@/lib/lead-schema";
import { getLenis } from "@/components/motion/lenis-store";
import type { LeadPrefill } from "./LeadContext";
import { LeadForm } from "./LeadForm";

/**
 * Modal do diagnóstico com <dialog> nativo: foco preso, Esc fecha, fundo inerte.
 * A rolagem suave é pausada enquanto o modal está aberto.
 */
export function LeadDialog({
  prefill,
  delivery,
  onClose,
}: {
  prefill: (LeadPrefill & { nonce: number }) | null;
  delivery: LeadDelivery;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = prefill !== null;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      getLenis()?.stop();
      document.documentElement.style.overflow = "hidden";
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const handleClose = () => {
    getLenis()?.start();
    document.documentElement.style.overflow = "";
    onClose();
  };

  const planLabel = prefill?.plan && prefill.plan !== "indefinido" ? PLAN_INTEREST_LABEL[prefill.plan] : null;

  return (
    <dialog
      ref={ref}
      onClose={handleClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      aria-labelledby="lead-dialog-title"
      data-lenis-prevent
      className="p-paper m-auto max-h-[calc(100svh-1.5rem)] w-[min(40rem,calc(100vw-1.5rem))] overflow-y-auto rounded-[28px] p-0 shadow-[0_24px_48px_rgba(28,29,26,0.12)] backdrop:bg-grafite/80 open:animate-[dialog-in_0.64s_var(--ease-cit)]"
    >
      {prefill && (
        <div className="p-5 sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="t-label text-chumbo">
                {planLabel ? `Plano ${planLabel} · próximo passo` : "Diagnóstico gratuito · etapa 2 de 2"}
              </p>
              <h2 id="lead-dialog-title" className="t-title mt-2 text-[clamp(1.7rem,4vw,2.3rem)]">
                {planLabel ? `Vamos conversar sobre o plano ${planLabel}` : "Para onde enviamos seu diagnóstico?"}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-chumbo">
                {planLabel
                  ? "Começamos pelo diagnóstico gratuito da sua marca e apresentamos a proposta do plano escolhido."
                  : "Nossa equipe analisa como sua empresa aparece nas IAs e retorna com o que encontrou."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Fechar"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-grafite text-papel transition-colors hover:bg-carvao"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
          <LeadForm
            key={prefill.nonce}
            delivery={delivery}
            origin={prefill.origin}
            defaults={{ site: prefill.site, plan: prefill.plan }}
            compact
            autoFocus
          />
        </div>
      )}
    </dialog>
  );
}
