import Image from "next/image";
import { nav, site, whatsappLink } from "@/content/site";
import { FooterSignature } from "./FooterSignature";
import { CurrentYear } from "./CurrentYear";

const linkClass = "text-sm text-mist transition-colors hover:text-lime";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink pt-20">
      <div className="shell grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Image src="/assets/brand/logo-citavel.png" alt="CITÁVEL" width={1880} height={409} sizes="180px" className="h-8 w-auto" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist">{site.shortDescription}</p>
          <p className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-paper">
            Método PULSO™ · PULSO Score
          </p>
        </div>

        <nav aria-label="Rodapé" className="md:col-span-3">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-mist/70">Navegação</p>
          <ul className="mt-5 space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#diagnostico" className={linkClass}>
                Diagnóstico gratuito
              </a>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-mist/70">Contato</p>
          <ul className="mt-5 space-y-3">
            <li>
              <a href={whatsappLink("Olá, quero falar com a CITÁVEL")} target="_blank" rel="noopener noreferrer" className={linkClass}>
                WhatsApp {site.contact.whatsappDisplay}
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </li>
            <li>
              <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                LinkedIn
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </li>
            <li>
              <a href={site.links.privacy} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Política de privacidade
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </li>
          </ul>
          <address className="mt-6 text-sm not-italic leading-relaxed text-mist">
            {site.company.name}
            <br />
            {site.address.city}, {site.address.regionName}
          </address>
        </div>
      </div>

      <FooterSignature />

      <div className="shell flex flex-col gap-3 border-t border-line py-6 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-mist/70 sm:flex-row sm:justify-between">
        <p>
          © <CurrentYear /> {site.name} · {site.company.name}
        </p>
        <p>Birigui · SP · Brasil</p>
      </div>
    </footer>
  );
}
