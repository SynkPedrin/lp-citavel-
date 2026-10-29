"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item className={cn("border-b border-line", className)} {...props} />;
}

export function AccordionTrigger({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header asChild>
      <h3>
        <AccordionPrimitive.Trigger
          className={cn(
            "group flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-semibold leading-snug text-paper transition-colors hover:text-lime sm:text-xl",
            className,
          )}
          {...props}
        >
          {children}
          <span
            aria-hidden
            className="grid size-9 shrink-0 place-items-center rounded-full border border-line-strong transition-[transform,background-color,border-color,color] duration-500 ease-[var(--ease-out-expo)] group-hover:border-lime group-data-[state=open]:rotate-45 group-data-[state=open]:border-lime group-data-[state=open]:bg-lime group-data-[state=open]:text-ink"
          >
            <Plus className="size-4" />
          </span>
        </AccordionPrimitive.Trigger>
      </h3>
    </AccordionPrimitive.Header>
  );
}

/** forceMount: a resposta permanece no HTML (indexável); fechada fica com `hidden`. */
export function AccordionContent({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      forceMount
      className="overflow-hidden data-[state=closed]:hidden data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("max-w-3xl pb-7 pr-12 text-base leading-relaxed text-mist", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
