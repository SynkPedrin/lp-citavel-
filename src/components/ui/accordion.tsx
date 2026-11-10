"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item className={cn("border-t border-line last:border-b", className)} {...props} />;
}

export function AccordionTrigger({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header asChild>
      <h3>
        <AccordionPrimitive.Trigger
          className={cn("group flex w-full items-center justify-between gap-6 py-5 text-left text-[1.15rem] font-bold leading-snug tracking-[-0.02em] sm:text-[1.3rem]", className)}
          {...props}
        >
          {children}
          {/* marcador: pílula a 20° que vira "×" (inclina, não gira) */}
          <span aria-hidden className="relative grid size-9 shrink-0 place-items-center rounded-full bg-grafite text-lima transition-colors duration-[160ms] group-data-[state=open]:bg-lima group-data-[state=open]:text-grafite">
            <span className="absolute h-4 w-[3px] rotate-[20deg] rounded-full bg-current transition-transform duration-[320ms] ease-[var(--ease-cit)] group-data-[state=open]:rotate-[45deg]" />
            <span className="absolute h-4 w-[3px] rotate-[110deg] rounded-full bg-current transition-transform duration-[320ms] ease-[var(--ease-cit)] group-data-[state=open]:rotate-[135deg]" />
          </span>
        </AccordionPrimitive.Trigger>
      </h3>
    </AccordionPrimitive.Header>
  );
}

/** forceMount: a resposta permanece no HTML (indexável); fechada fica com `hidden`. */
export function AccordionContent({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content forceMount className="overflow-hidden data-[state=closed]:hidden data-[state=open]:animate-accordion-down" {...props}>
      <div className={cn("max-w-3xl pb-6 pr-12 text-base leading-relaxed text-fg-2", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
