import { cn } from "@/lib/utils";

/**
 * Identidade CITÁVEL (Brand Book · Identidade).
 * Símbolo: duas aspas a 20°, mesma largura, topos alinhados (pílula curta 2,25x · longa 3,5x).
 * Wordmark: Archivo ExtraBold, largura 112, entreletra +10; o acento do Á é uma pílula do símbolo.
 * Lockup: símbolo com 1,36 vez a altura das maiúsculas.
 */

export function BrandSymbol({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={cn("inline-block size-[1em] shrink-0", className)} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <rect x="14" y="8" width="24" height="54" rx="12" fill="currentColor" transform="rotate(20 26 35)" />
      <rect x="52" y="8" width="24" height="84" rx="12" fill="currentColor" transform="rotate(20 64 50)" />
    </svg>
  );
}

/** Texto CITÁVEL com o acento-pílula. `accent` define a cor do acento (lima sobre escuros). */
export function Wordmark({ accent, className }: { accent?: string; className?: string }) {
  return (
    <span className={cn("wm", className)} style={accent ? ({ "--acc": accent } as React.CSSProperties) : undefined} role="img" aria-label="CITÁVEL">
      <span aria-hidden>CIT</span>
      <span className="a" aria-hidden>
        A
      </span>
      <span aria-hidden>VEL</span>
    </span>
  );
}

type Tone = "principal" | "positiva" | "mono-claro" | "mono-escuro";

const tones: Record<Tone, { sym: string; wm: string; acc: string }> = {
  /* Principal: sobre grafite/carvão */
  principal: { sym: "text-lima", wm: "text-papel", acc: "var(--color-lima)" },
  /* Positiva: sobre papel, névoa, gelo, concreto e lima */
  positiva: { sym: "text-grafite", wm: "text-grafite", acc: "var(--color-grafite)" },
  "mono-claro": { sym: "text-papel", wm: "text-papel", acc: "var(--color-papel)" },
  "mono-escuro": { sym: "text-grafite", wm: "text-grafite", acc: "var(--color-grafite)" },
};

export function Lockup({ tone = "principal", className, vertical = false }: { tone?: Tone; className?: string; vertical?: boolean }) {
  const t = tones[tone];
  return (
    <span className={cn("inline-flex items-center", vertical ? "flex-col gap-[0.5em]" : "gap-[0.32em]", className)}>
      <BrandSymbol className={cn(vertical ? "size-[2em]" : "size-[1.36em]", t.sym)} />
      <Wordmark className={t.wm} accent={t.acc} />
    </span>
  );
}
