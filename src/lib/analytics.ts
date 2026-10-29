/**
 * Camada de analytics agnóstica. O projeto ainda não tem ferramenta instalada:
 *  - empurra o evento para `window.dataLayer` (Google Tag Manager / GA4, se configurados);
 *  - dispara `CustomEvent("citavel:track")` para qualquer outra integração.
 * Nunca envie dados pessoais (nome, e-mail, telefone, site) nos parâmetros.
 */

export type TrackEvent =
  | "hero_cta_click"
  | "diagnostico_form_start"
  | "diagnostico_form_submit"
  | "lead_submit_success"
  | "pricing_view"
  | "plan_selected"
  | "whatsapp_click";

export type TrackParams = {
  origin?: string;
  plan?: string;
  delivery?: "webhook" | "whatsapp";
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: TrackEvent, params: TrackParams = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event, ...params });
  window.dispatchEvent(new CustomEvent("citavel:track", { detail: { event, ...params } }));
}
