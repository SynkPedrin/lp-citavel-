/**
 * PULSO Score — fórmula pública da CITÁVEL.
 * PULSO Score = V × 0,40 + C × 0,35 + S × 0,25 (cada dimensão de 0 a 100).
 */
export const PULSO_WEIGHTS = { v: 0.4, c: 0.35, s: 0.25 } as const;

export type PulsoDimensions = {
  /** Visibilidade: a IA encontra a marca e em que posição? */
  v: number;
  /** Citação: a IA cita a fonte ou o domínio próprio? */
  c: number;
  /** Sentimento: com que tom a IA fala da marca? */
  s: number;
};

const clamp = (n: number) => Math.min(100, Math.max(0, n));

export function computePulsoScore({ v, c, s }: PulsoDimensions): number {
  const raw = clamp(v) * PULSO_WEIGHTS.v + clamp(c) * PULSO_WEIGHTS.c + clamp(s) * PULSO_WEIGHTS.s;
  return Math.round(raw * 10) / 10;
}

export const formatScore = (n: number) =>
  new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(n);

export type Measurement = PulsoDimensions & { label: string; period: string };
export type ScoredMeasurement = Measurement & { score: number };

/**
 * DADOS ILUSTRATIVOS — marca fictícia, usados apenas na demonstração conceitual do dashboard.
 * Não representam cliente real nem resultado prometido.
 */
export const demoMeasurements: readonly Measurement[] = [
  { label: "M1", period: "Medição 1", v: 22, c: 14, s: 48 },
  { label: "M2", period: "Medição 2", v: 27, c: 19, s: 52 },
  { label: "M3", period: "Medição 3", v: 31, c: 26, s: 55 },
  { label: "M4", period: "Medição 4", v: 38, c: 30, s: 58 },
  { label: "M5", period: "Medição 5", v: 44, c: 37, s: 61 },
  { label: "M6", period: "Medição 6", v: 51, c: 42, s: 66 },
];

export function scoreMeasurements(list: readonly Measurement[]): ScoredMeasurement[] {
  return list.map((m) => ({ ...m, score: computePulsoScore(m) }));
}
