"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { LeadDelivery } from "@/lib/env";
import type { PlanInterest } from "@/lib/lead-schema";
import { LeadDialog } from "./LeadDialog";

export type LeadPrefill = { origin: string; site?: string; plan?: PlanInterest };

type LeadContextValue = {
  delivery: LeadDelivery;
  /** Abre o formulário de diagnóstico (modal) preservando origem, site e plano. */
  openLead: (prefill: LeadPrefill) => void;
  /** Último plano escolhido na página — pré-preenche o formulário final. */
  lastPlan?: PlanInterest;
};

const LeadContext = createContext<LeadContextValue | null>(null);

export function LeadProvider({ delivery, children }: { delivery: LeadDelivery; children: ReactNode }) {
  const [prefill, setPrefill] = useState<(LeadPrefill & { nonce: number }) | null>(null);
  const [lastPlan, setLastPlan] = useState<PlanInterest>();

  const openLead = useCallback((p: LeadPrefill) => {
    if (p.plan && p.plan !== "indefinido") setLastPlan(p.plan);
    setPrefill({ ...p, nonce: Date.now() });
  }, []);

  const value = useMemo(() => ({ delivery, openLead, lastPlan }), [delivery, openLead, lastPlan]);

  return (
    <LeadContext.Provider value={value}>
      {children}
      <LeadDialog prefill={prefill} delivery={delivery} onClose={() => setPrefill(null)} />
    </LeadContext.Provider>
  );
}

export function useLead() {
  const ctx = useContext(LeadContext);
  if (!ctx) throw new Error("useLead precisa estar dentro de <LeadProvider>");
  return ctx;
}
