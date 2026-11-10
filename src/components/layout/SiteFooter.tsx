import { nav, site, whatsappLink } from "@/content/site";
import { Lockup } from "@/components/brand/Logo";
import { CurrentYear } from "./CurrentYear";
import { FooterSignature } from "./FooterSignature";

const linkClass = "text-[15px] text-fg-2 transition-colors duration-[160ms] hover:text-lima";

export function SiteFooter() {
  return (
    <footer>
      <FooterSignature />
      <div className="t-dark pt-16">
        <div className="shell grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="text-[22px]">
              <Lockup />
            </span>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-fg-2">{site.shortDescription}</p>
            <p className="t-label mt-6 text-fg-3">Método PULSO™ · PULSO Score</p>
          </div>

          <nav aria-label="Rodapé" className="md:col-span-3">
            <p className="t-label text-fg-3">Navegação</p>
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
                  Diagnóstico grátis
                </a>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="t-label text-fg-3">Contato</p>
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
            <address className="mt-6 text-[15px] not-italic leading-relaxed text-fg-2">
              {site.company.name}
              <br />
              {site.address.city}, {site.address.regionName}
            </address>
          </div>
        </div>

        <div className="shell mt-14 flex flex-col gap-3 border-t border-line py-6 text-[13px] text-fg-3 sm:flex-row sm:justify-between">
          <p>
            © <CurrentYear /> {site.name} · {site.company.name}
          </p>
          <p>citavel.ai · Birigui, SP</p>
        </div>
      </div>
    </footer>
  );
}
