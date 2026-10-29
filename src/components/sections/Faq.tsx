import { faq } from "@/content/faq";
import { site, whatsappLink } from "@/content/site";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-line bg-void/40 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          id="faq-title"
          eyebrow="Dúvidas"
          lines={["Perguntas frequentes"]}
          sub={
            <>
              Respostas diretas sobre o serviço, os planos e a contratação. Ainda com dúvida?{" "}
              <a
                href={whatsappLink("Olá, tenho uma dúvida sobre a CITÁVEL")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper underline underline-offset-4 hover:text-lime"
              >
                Fale no WhatsApp {site.contact.whatsappDisplay}
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
              .
            </>
          }
        />
        <div data-reveal className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faq.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`} className="rounded-2xl border border-line bg-graphite/60 px-5 data-[state=open]:border-line-strong">
                <AccordionTrigger className="py-5 text-base sm:text-lg">{item.q}</AccordionTrigger>
                <AccordionContent className="pb-5 pr-2 text-sm sm:text-base">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
