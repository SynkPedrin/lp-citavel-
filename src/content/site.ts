/**
 * Dados institucionais da CITÁVEL™.
 * Fonte: site oficial https://citavel.ai (dados estruturados e páginas públicas).
 * Não adicione contatos, números ou endereços que não estejam publicados oficialmente.
 */

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://citavel.ai").replace(/\/$/, "");

export const site = {
  name: "CITÁVEL™",
  plainName: "CITÁVEL",
  url: siteUrl,
  title: "CITÁVEL™ · Reputação de marcas em inteligência artificial",
  description:
    "Descubra se sua empresa aparece quando alguém pede uma recomendação ao ChatGPT, Gemini e outras IAs. A Citável analisa as respostas, identifica oportunidades e executa melhorias todo mês. Planos a partir de R$ 497/mês.",
  shortDescription:
    "Reputação de marcas em inteligência artificial. Monitoramos como sua empresa aparece nas respostas das IAs e executamos melhorias todo mês.",
  locale: "pt_BR",
  company: {
    name: "Desigual IA Labs",
    legalContext: "Uma operação da desigual",
    url: "https://agenciadesigual.com.br/",
  },
  address: {
    street: "Av. Youssef Ismail Mansour, 265 - Sala C",
    city: "Birigui",
    region: "SP",
    regionName: "São Paulo",
    postalCode: "16202-484",
    country: "BR",
  },
  contact: {
    /** WhatsApp oficial publicado em citavel.ai. Pode ser sobrescrito por NEXT_PUBLIC_WHATSAPP_NUMBER. */
    whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5518991976211").replace(/\D/g, ""),
    whatsappDisplay: "(18) 99197-6211",
  },
  links: {
    officialSite: "https://citavel.ai",
    caseStudy: "https://citavel.ai/case.html",
    method: "https://citavel.ai/metodo.html",
    privacy: "https://citavel.ai/privacidade.html",
    contact: "https://citavel.ai/contato.html",
    linkedin: "https://www.linkedin.com/company/citavel",
    wikidata: "https://www.wikidata.org/wiki/Q140536113",
  },
  sameAs: ["https://www.linkedin.com/company/citavel", "https://www.wikidata.org/wiki/Q140536113"],
} as const;

export const nav = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#entregas", label: "O que fazemos" },
  { href: "#metodo", label: "Método PULSO" },
  { href: "#planos", label: "Planos" },
  { href: "#faq", label: "Dúvidas" },
] as const;

export const primaryCta = { href: "#diagnostico", label: "Diagnóstico grátis" } as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
