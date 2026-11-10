import { cn } from "@/lib/utils";

/**
 * Grafismos CITÁVEL (Brand Book · Linguagem). Tudo deriva da pílula a 20°.
 * Combine no máximo dois por peça.
 */

/** Onda PULSO: o sinal da reputação, em dados e aberturas. Determinística (sem random no render). */
export function Onda({ bars = 56, height = 120, lit = [], className, color }: { bars?: number; height?: number; lit?: number[]; className?: string; color?: string }) {
  const items = Array.from({ length: bars }, (_, i) => {
    const wave = Math.sin(i * 0.42) * 0.32 + Math.sin(i * 0.13 + 1.2) * 0.38 + 0.55;
    const h = Math.round(Math.max(0.14, Math.min(1, wave)) * height);
    const d = -((i * 37) % 23) / 10;
    return { h, d };
  });
  return (
    <div aria-hidden className={cn("onda gap-[clamp(3px,0.7vw,10px)]", className)} style={{ height, ...(color ? ({ "--onda-c": color } as React.CSSProperties) : {}) }}>
      {items.map((b, i) => (
        <span key={i} className={lit.includes(i) ? "on" : undefined} style={{ "--h": `${b.h}px`, "--d": `${b.d}s` } as React.CSSProperties} />
      ))}
    </div>
  );
}

/** Símbolo construído em pílulas (capa do brand book): cresce da base, curta e longa. */
export function GrowingSymbol({ className, color = "var(--color-lima)" }: { className?: string; color?: string }) {
  return (
    <div aria-hidden className={cn("relative aspect-square", className)}>
      {[
        { left: "14%", top: "8%", h: "54%", delay: "0s" },
        { left: "52%", top: "8%", h: "84%", delay: "0.18s" },
      ].map((p) => (
        <span
          key={p.left}
          className="absolute overflow-hidden rounded-full"
          style={{ left: p.left, top: p.top, width: "24%", height: p.h, transform: "rotate(20deg)" }}
        >
          <i
            className="absolute inset-0 rounded-[inherit] origin-bottom motion-safe:animate-[grow-y_1.2s_var(--ease-cit)_both]"
            style={{ background: color, animationDelay: p.delay }}
          />
        </span>
      ))}
    </div>
  );
}

/** Recorte: o símbolo ampliado vira paisagem; pílula atravessa o quadro e as pontas ficam de fora. */
export function Recorte({ className, color = "var(--color-lima)", variant = "faixa" }: { className?: string; color?: string; variant?: "faixa" | "duas" }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute overflow-hidden", className)}>
      <span className="absolute rounded-full" style={{ background: color, width: "34%", height: "190%", left: "46%", top: "-45%", transform: "rotate(20deg)" }} />
      {variant === "duas" && (
        <span className="absolute rounded-full" style={{ background: color, width: "34%", height: "120%", left: "4%", top: "-60%", transform: "rotate(20deg)" }} />
      )}
    </div>
  );
}

/** Chip de fonte: a nota numerada que a IA mostra quando cita. */
export function SourceChip({ n, className }: { n: number | string; className?: string }) {
  return (
    <span className={cn("src-chip", className)} aria-label={`fonte ${n}`}>
      <span>{n}</span>
    </span>
  );
}

/** Etiqueta em pílula com marcador a 20°. */
export function Tag({ children, tone = "lima", className }: { children: React.ReactNode; tone?: "lima" | "dark" | "paper" | "line"; className?: string }) {
  const tones = {
    lima: "bg-lima text-grafite",
    dark: "bg-grafite text-papel",
    paper: "bg-papel text-grafite",
    line: "border border-line text-fg",
  } as const;
  return (
    <span className={cn("inline-flex min-h-8 items-center gap-2 rounded-[16px] px-3.5 py-1 text-[13px] font-semibold leading-tight sm:whitespace-nowrap", tones[tone], className)}>
      <span className="tag-dot" aria-hidden />
      {children}
    </span>
  );
}
