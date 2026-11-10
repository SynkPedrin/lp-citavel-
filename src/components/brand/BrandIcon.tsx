import { cn } from "@/lib/utils";

/**
 * Iconografia CITÁVEL (Brand Book · Linguagem): grade de 24 px, traço de 2 px, sem preenchimento,
 * pontas arredondadas; toda diagonal segue o ângulo de 20° do símbolo.
 */
const paths = {
  busca: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="M15 15l5 5" />
    </>
  ),
  citacao: (
    <>
      <rect x="5" y="4" width="4.5" height="10" rx="2.25" transform="rotate(20 7.25 9)" />
      <rect x="12.5" y="4" width="4.5" height="15" rx="2.25" transform="rotate(20 14.75 11.5)" />
    </>
  ),
  pergunta: (
    <>
      <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H10l-5 4v-4H6a2 2 0 0 1-2-2z" />
      <path d="M9 10h6" />
    </>
  ),
  score: (
    <>
      <path d="M6 20l2-7M12 20l3.5-11M18 20l2-6" />
      <path d="M3 20h18" />
    </>
  ),
  alvo: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 12l6.5-6.5" />
    </>
  ),
  praca: (
    <>
      <path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </>
  ),
  relatorio: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
      <path d="M9 13h6M9 17h4" />
    </>
  ),
  reputacao: (
    <>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  crescimento: (
    <>
      <path d="M5 19L17.5 5" />
      <path d="M9 5h8.5v8.5" />
    </>
  ),
  pulso: <path d="M3 12h4l2.5-6 4 12 2.5-6h5" />,
  monitoramento: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  fontes: (
    <>
      <circle cx="7" cy="12" r="3" />
      <circle cx="17" cy="6" r="3" />
      <circle cx="17" cy="18" r="3" />
      <path d="M9.6 10.5l4.8-3M9.6 13.5l4.8 3" />
    </>
  ),
  destaque: <path d="M12 4l2.4 5 5.6.8-4 3.9 1 5.5-5-2.7-5 2.7 1-5.5-4-3.9 5.6-.8z" />,
  conteudo: (
    <>
      <path d="M4 7h10M4 12h16M4 17h7" />
      <rect x="16" y="4" width="3" height="6" rx="1.5" transform="rotate(20 17.5 7)" />
    </>
  ),
  citada: <path d="M5 12l4.5 4.5L19 7" />,
  "nao-citada": (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M9.5 15.5l5-7" />
    </>
  ),
} as const;

export type BrandIconName = keyof typeof paths;

export function BrandIcon({ name, className, title }: { name: BrandIconName; className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-6 shrink-0", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {paths[name]}
    </svg>
  );
}
