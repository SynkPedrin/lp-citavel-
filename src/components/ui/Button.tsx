import { cva, type VariantProps } from "class-variance-authority";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Botões CITÁVEL: pílula, Archivo 700, caixa normal.
 * Um primário por tela. Lima só para a ação principal. Hover: sobe 2 px (nada gira, nada brilha).
 */
export const buttonVariants = cva(
  "group/btn inline-flex max-w-full items-center justify-center gap-3 rounded-full text-center font-bold leading-tight sm:shrink-0 sm:whitespace-nowrap transition-[transform,background-color,color,border-color] duration-[160ms] ease-[var(--ease-cit)] hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        lima: "bg-lima text-grafite",
        dark: "bg-grafite text-papel",
        paper: "bg-papel text-grafite",
        outline: "border border-current bg-transparent text-fg",
        text: "bg-transparent px-0 text-fg hover:translate-y-0 hover:underline underline-offset-4",
      },
      size: {
        lg: "min-h-[52px] px-6 py-3 text-base",
        md: "min-h-10 px-5 py-2 text-[15px]",
        sm: "min-h-8 px-4 py-1.5 text-[13px]",
      },
    },
    defaultVariants: { variant: "lima", size: "lg" },
  },
);

type Variants = VariantProps<typeof buttonVariants>;

function Inner({ children, arrow = true }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      <span className="inline-flex min-w-0 items-center justify-center gap-2">{children}</span>
      {arrow && (
        <span aria-hidden className="transition-transform duration-[320ms] ease-[var(--ease-cit)] group-hover/btn:translate-x-0.5">
          →
        </span>
      )}
    </>
  );
}

export function ButtonLink({
  className,
  variant,
  size,
  arrow,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & Variants & { arrow?: boolean }) {
  const external = props.href?.startsWith("http");
  return (
    <a className={cn(buttonVariants({ variant, size }), className)} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...props}>
      <Inner arrow={arrow}>{children}</Inner>
      {external && <span className="sr-only"> (abre em nova aba)</span>}
    </a>
  );
}

export function Button({
  className,
  variant,
  size,
  arrow,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & Variants & { arrow?: boolean }) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}
