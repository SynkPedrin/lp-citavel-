import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  /** Linhas do título (caixa normal, −4%). */
  lines: readonly string[];
  /** Linha com marca-texto lima (uma expressão por bloco). */
  markLine?: number;
  sub?: ReactNode;
  align?: "center" | "left";
  /** Layout do brand book: título à esquerda, texto de apoio à direita. */
  split?: boolean;
  as?: "h2" | "h3";
  id?: string;
  className?: string;
  titleClassName?: string;
};

/** Cabeçalho de capítulo no padrão do Brand Book: rótulo · título · lede. */
export function SectionHeading({ eyebrow, lines, markLine, sub, align = "left", split = false, as: Tag = "h2", id, className, titleClassName }: Props) {
  const center = align === "center";
  return (
    <header
      className={cn(
        split ? "grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end lg:gap-16" : center ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      )}
    >
      <div>
        {eyebrow && (
          <p data-reveal className="t-label mb-4 text-fg-3">
            {eyebrow}
          </p>
        )}
        <Tag id={id} data-reveal className={cn("t-title text-[clamp(2.1rem,4.6vw,4.4rem)]", titleClassName)}>
          {lines.map((line, i) => (
            <span key={line} className="block">
              {i === markLine ? <span className="mark">{line}</span> : line}{" "}
            </span>
          ))}
        </Tag>
      </div>
      {sub && (
        <p data-reveal className={cn("text-[clamp(1rem,1.3vw,1.2rem)] leading-relaxed text-fg-2", center && !split && "mx-auto mt-5 max-w-2xl", !center && !split && "mt-5 max-w-2xl")}>
          {sub}
        </p>
      )}
    </header>
  );
}

export function IllustrativeBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex h-6 items-center gap-1.5 whitespace-nowrap rounded-full bg-info px-2.5 text-[11px] font-bold uppercase tracking-[0.06em] text-grafite", className)}>
      <span aria-hidden className="h-2.5 w-1.5 rotate-[20deg] rounded-full bg-grafite/60" />
      {children}
    </span>
  );
}
