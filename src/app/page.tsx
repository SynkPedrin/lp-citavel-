import { getLeadDelivery } from "@/lib/env";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { MotionDirector } from "@/components/motion/MotionDirector";
import { JsonLd } from "@/components/seo/JsonLd";
import { LeadProvider } from "@/components/conversion/LeadContext";
import { WhatsAppFloat } from "@/components/conversion/WhatsAppFloat";
import { Hero } from "@/components/sections/hero/Hero";
import { PlatformsStrip } from "@/components/sections/PlatformsStrip";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/solution/Solution";
import { Deliverables } from "@/components/sections/Deliverables";
import { Plans } from "@/components/sections/pricing/Plans";
import { CompareTable } from "@/components/sections/pricing/CompareTable";
import { Method } from "@/components/sections/Method";
import { Proof } from "@/components/sections/Proof";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

/**
 * Jornada comercial: Hero → Problema → Solução → Entregas → Planos → Comparativo
 * → Método → Prova → FAQ → Conversão final.
 */
export default function Home() {
  return (
    <LeadProvider delivery={getLeadDelivery()}>
      <JsonLd />
      <SmoothScroll />
      <ScrollProgress />
      <SiteHeader />

      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <PlatformsStrip />
        <Problem />
        <Solution />
        <Deliverables />
        <Plans />
        <CompareTable />
        <Method />
        <Proof />
        <Faq />
        <FinalCta />
      </main>

      <SiteFooter />
      <WhatsAppFloat />

      {/* por último: os triggers genéricos são criados depois dos das seções */}
      <MotionDirector />
    </LeadProvider>
  );
}
