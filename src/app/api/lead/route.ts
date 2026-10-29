import { NextResponse } from "next/server";
import { leadPayloadSchema, normalizeSite, onlyDigits, PLAN_INTEREST_LABEL } from "@/lib/lead-schema";

/**
 * Recebe o pedido de diagnóstico gratuito e o encaminha para o CRM/automação via webhook.
 * Persistência real depende de LEAD_WEBHOOK_URL. Sem ela, responde 503 e a página usa o fluxo de WhatsApp.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MIN_FILL_MS = 3000;
// Limitação best-effort por instância (em serverless não é global; use um rate limiter dedicado se necessário).
const hits = new Map<string, number[]>();

function rateLimited(key: string, now: number) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ ok: false, error: "unconfigured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = leadPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation", issues: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const { website_url, startedAt, utm, consentimento, origem, ...lead } = parsed.data;
  const now = Date.now();

  // Honeypot preenchido: responde OK sem encaminhar (não revela o filtro ao bot).
  if (website_url) return NextResponse.json({ ok: true });
  if (now - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: false, error: "too_fast" }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip, now)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_SECRET ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_SECRET}` } : {}),
      },
      body: JSON.stringify({
        ...lead,
        site: normalizeSite(lead.site),
        whatsapp: onlyDigits(lead.whatsapp),
        planoInteresse: PLAN_INTEREST_LABEL[lead.plano],
        origemCta: origem,
        consentimento,
        consentimentoEm: new Date(now).toISOString(),
        origem: "lp-citavel",
        oferta: "Diagnóstico gratuito",
        utm: utm ?? {},
        userAgent: request.headers.get("user-agent") ?? undefined,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
