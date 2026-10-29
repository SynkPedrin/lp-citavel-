import { faq } from "@/content/faq";
import { plans } from "@/config/plans";
import { site } from "@/content/site";

/**
 * Dados estruturados apenas com fatos verificáveis (citavel.ai) e a tabela de planos vigente
 * (src/config/plans.ts — fonte única de preços).
 */
export function JsonLd() {
  const org = {
    "@type": "Organization",
    "@id": `${site.url}/#org`,
    name: site.plainName,
    alternateName: site.name,
    url: site.url,
    logo: `${site.url}/assets/brand/logo-citavel.png`,
    description: site.shortDescription,
    parentOrganization: { "@type": "Organization", name: site.company.name, url: site.company.url },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    contactPoint: { "@type": "ContactPoint", telephone: `+${site.contact.whatsapp}`, contactType: "sales", availableLanguage: "Portuguese" },
    sameAs: site.sameAs,
  };

  const service = {
    "@type": "Service",
    serviceType: "Reputação de marca em inteligência artificial (GEO / AEO)",
    provider: { "@id": `${site.url}/#org` },
    areaServed: "BR",
    description:
      "Monitoramento de como a marca aparece nas respostas de inteligências artificiais, identificação de oportunidades e execução mensal de conteúdos e otimizações, pelo Método PULSO.",
    offers: [
      { "@type": "Offer", name: "Diagnóstico gratuito", price: "0", priceCurrency: "BRL" },
      ...plans.map((p) => ({
        "@type": "Offer",
        name: `Plano ${p.name}`,
        price: String(p.monthlyPrice),
        priceCurrency: "BRL",
        description: `Mensal. ${p.platforms.length} IAs analisadas, ${p.monthlyQuestions} perguntas de compra testadas e ${p.monthlyContent} conteúdos por mês.`,
      })),
    ],
  };

  const faqPage = {
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  const website = { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, inLanguage: "pt-BR", publisher: { "@id": `${site.url}/#org` } };

  const graph = { "@context": "https://schema.org", "@graph": [org, website, service, faqPage] };

  return (
    <script
      type="application/ld+json"
      // conteúdo 100% estático gerado a partir da configuração do projeto
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
