import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight } from "lucide-react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-mono text-[0.78rem] font-medium uppercase tracking-[0.12em] transition-[transform,background-color,color,box-shadow,border-color] duration-500 ease-[var(--ease-out-expo)] focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-lime text-ink shadow-[0_0_0_0_rgba(189,245,49,0)] hover:shadow-[0_0_40px_-4px_rgba(189,245,49,0.65)] hover:-translate-y-0.5",
        secondary: "border border-line-strong text-paper hover:border-lime hover:text-lime",
        ghost: "text-paper hover:text-lime",
      },
      size: {
        md: "h-12 px-6",
        lg: "h-14 px-7 sm:h-16 sm:px-9 text-[0.8rem]",
        sm: "h-10 px-5 text-[0.7rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Variants = VariantProps<typeof buttonVariants>;

function Inner({ children, icon = true }: { children: ReactNode; icon?: boolean }) {
  return (
    <>
      {/* varredura de luz no hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-full"
      />
      <span className="relative">{children}</span>
      {icon && (
        <ArrowUpRight
          aria-hidden
          className="relative size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
        />
      )}
    </>
  );
}

export function ButtonLink({
  className,
  variant,
  size,
  icon,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & Variants & { icon?: boolean }) {
  const external = props.href?.startsWith("http");
  return (
    <a
      className={cn(buttonVariants({ variant, size }), className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      <Inner icon={icon}>{children}</Inner>
      {external && <span className="sr-only"> (abre em nova aba)</span>}
    </a>
  );
}

export function Button({
  className,
  variant,
  size,
  icon,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & Variants & { icon?: boolean }) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      <Inner icon={icon}>{children}</Inner>
    </button>
  );
}
