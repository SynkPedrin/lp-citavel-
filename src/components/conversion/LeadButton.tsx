"use client";

import type { ComponentProps } from "react";
import { track } from "@/lib/analytics";
import type { PlanInterest } from "@/lib/lead-schema";
import { Button } from "@/components/ui/Button";
import { useLead } from "./LeadContext";

/** CTA que abre o formulário de diagnóstico preservando a origem (e o plano, quando houver). */
export function LeadButton({
  origin,
  plan,
  onClick,
  ...props
}: Omit<ComponentProps<typeof Button>, "type"> & { origin: string; plan?: PlanInterest }) {
  const { openLead } = useLead();
  return (
    <Button
      type="button"
      onClick={(e) => {
        onClick?.(e);
        if (plan) track("plan_selected", { origin, plan });
        openLead({ origin, plan });
      }}
      {...props}
    />
  );
}
