import { z } from "zod";

export const PLAN_INTEREST = ["indefinido", "essencial", "profissional", "completo"] as const;
export type PlanInterest = (typeof PLAN_INTEREST)[number];

export const PLAN_INTEREST_LABEL: Record<PlanInterest, string> = {
  indefinido: "Ainda não sei",
  essencial: "Essencial",
  profissional: "Profissional",
  completo: "Completo",
};

export const onlyDigits = (v: string) => v.replace(/\D/g, "");

/** Máscara progressiva de telefone brasileiro: (18) 99197-6211 / (18) 3642-1234. */
export function formatBRPhone(value: string) {
  const d = onlyDigits(value).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const URL_RE = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(:\d+)?([/?#].*)?$/i;

export const isValidSite = (v: string) => URL_RE.test(v.trim());

/** Normaliza o site para https://dominio… (aceita com ou sem protocolo). */
export function normalizeSite(v: string) {
  const t = v.trim();
  if (!t) return "";
  return /^https?:\/\//i.test(t) ? t : `https://${t}`;
}

export const siteSchema = z
  .string()
  .trim()
  .min(1, "Informe o site da empresa")
  .max(200, "Endereço muito longo")
  .refine(isValidSite, "Informe um endereço válido, ex.: suaempresa.com.br");

export const leadSchema = z.object({
  site: z
    .string()
    .trim()
    .max(200, "Endereço muito longo")
    .refine((v) => !v || isValidSite(v), "Informe um endereço válido, ex.: suaempresa.com.br"),
  nome: z.string().trim().min(2, "Informe seu nome").max(80, "Nome muito longo"),
  empresa: z.string().trim().min(2, "Informe o nome da empresa").max(120, "Nome muito longo"),
  whatsapp: z
    .string()
    .trim()
    .refine((v) => {
      const d = onlyDigits(v);
      const ddd = Number(d.slice(0, 2));
      return (d.length === 10 || (d.length === 11 && d[2] === "9")) && ddd >= 11 && ddd <= 99;
    }, "Informe DDD + número, ex.: (18) 99999-9999"),
  email: z.email("Informe um e-mail válido").max(160),
  plano: z.enum(PLAN_INTEREST),
  consentimento: z.literal(true, { error: "É preciso autorizar o contato para continuar" }),
});

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;

/** Payload enviado ao servidor: lead + origem do CTA + metadados anti-spam. */
export const leadPayloadSchema = leadSchema.extend({
  origem: z.string().max(40),
  /** honeypot — humanos não veem o campo; se vier preenchido, o servidor descarta em silêncio */
  website_url: z.string().max(500).optional(),
  startedAt: z.number().int().positive(),
  utm: z.record(z.string(), z.string().max(200)).optional(),
});

export type LeadPayload = z.infer<typeof leadPayloadSchema>;

export function leadToWhatsappMessage(lead: Lead) {
  return [
    "Olá! Quero o diagnóstico gratuito da CITÁVEL.",
    "",
    `Nome: ${lead.nome}`,
    `Empresa: ${lead.empresa}`,
    lead.site ? `Site: ${normalizeSite(lead.site)}` : "Site: ainda não tenho",
    `WhatsApp: ${formatBRPhone(lead.whatsapp)}`,
    `E-mail: ${lead.email}`,
    `Plano de interesse: ${PLAN_INTEREST_LABEL[lead.plano]}`,
  ].join("\n");
}
