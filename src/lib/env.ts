export type SiteEnv = "production" | "preview" | "development";
export type LeadDelivery = "webhook" | "whatsapp";

export function getSiteEnv(): SiteEnv {
  const value = process.env.NEXT_PUBLIC_SITE_ENV;
  if (value === "preview" || value === "development") return value;
  return "production";
}

/** Server-only: há backend real de captação configurado? */
export function getLeadDelivery(): LeadDelivery {
  return process.env.LEAD_WEBHOOK_URL ? "webhook" : "whatsapp";
}
