import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  /** Uma ou duas linhas; `accentLine` destaca uma delas em verde-lima. */
  lines: readonly string[];
  accentLine?: number;
  sub?: ReactNode;
  align?: "center" | "left";
  as?: "h2" | "h3";
  id?: string;
  className?: string;
  titleClassName?: string;
};

/** Cabeçalho de seção comercial: eyebrow + título + subtítulo. */
export function SectionHeading({ eyebrow, lines, accentLine, sub, align = "center", as: Tag = "h2", id, className, titleClassName }: Props) {
  const center = align === "center";
  return (
    <header className={cn(center ? "mx-auto max-w-3xl text-center" : "max-w-3xl", className)}>
      {eyebrow && (
        <p data-reveal className={cn("eyebrow mb-4 flex items-center gap-2 text-lime", center && "justify-center")}>
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        data-reveal
        className={cn("font-display text-[clamp(1.75rem,3.6vw,3rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.015em]", titleClassName)}
      >
        {lines.map((line, i) => (
          <span key={line} className={cn("block", i === accentLine && "text-lime")}>
            {line}{" "}
          </span>
        ))}
      </Tag>
      {sub && (
        <p data-reveal className={cn("mt-5 text-base leading-relaxed text-mist sm:text-lg", center && "mx-auto max-w-2xl")}>
          {sub}
        </p>
      )}
    </header>
  );
}

export function IllustrativeBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-orange/40 bg-orange/10 px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-orange",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-orange" />
      {children}
    </span>
  );
}
