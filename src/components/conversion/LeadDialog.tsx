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
      className="m-auto max-h-[calc(100svh-1.5rem)] w-[min(40rem,calc(100vw-1.5rem))] overflow-y-auto rounded-3xl border border-line-strong bg-graphite p-0 text-paper shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)] backdrop:bg-black/70 backdrop:backdrop-blur-sm open:animate-[dialog-in_0.35s_var(--ease-out-expo)]"
    >
      {prefill && (
        <div className="p-5 sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-lime">
                {planLabel ? `Plano ${planLabel} · próximo passo` : "Diagnóstico gratuito · etapa 2 de 2"}
              </p>
              <h2 id="lead-dialog-title" className="mt-2 font-display text-2xl font-extrabold leading-tight sm:text-3xl">
                {planLabel ? `Vamos conversar sobre o plano ${planLabel}` : "Para onde enviamos seu diagnóstico?"}
              </h2>
              <p className="mt-2 text-sm text-mist">
                {planLabel
                  ? "Começamos pelo diagnóstico gratuito da sua marca e apresentamos a proposta do plano escolhido."
                  : "Nossa equipe analisa como sua empresa aparece nas IAs e retorna com o que encontrou."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Fechar"
              className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-mist transition-colors hover:border-lime hover:text-lime"
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
