import { faq } from "@/content/faq";
import { site, whatsappLink } from "@/content/site";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="t-paper py-20 sm:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:self-start">
          <SectionHeading
            id="faq-title"
            eyebrow="Dúvidas"
            lines={["Perguntas", "frequentes."]}
            markLine={1}
            sub={
              <>
                Respostas diretas sobre o serviço, os planos e a contratação. Ainda com dúvida?{" "}
                <a href={whatsappLink("Olá, tenho uma dúvida sobre a CITÁVEL")} target="_blank" rel="noopener noreferrer" className="font-semibold text-fg underline underline-offset-4">
                  Fale no WhatsApp {site.contact.whatsappDisplay}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
                .
              </>
            }
          />
        </div>
        <div data-reveal>
          <Accordion type="single" collapsible>
            {faq.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`}>
                <AccordionTrigger>
                  <span className="flex gap-4">
                    <span className="t-num mt-1 text-sm text-fg-3">{String(i + 1).padStart(2, "0")}</span>
                    {item.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pl-9">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
