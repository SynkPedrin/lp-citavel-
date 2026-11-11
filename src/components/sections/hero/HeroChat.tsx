"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { platformOrder, platforms } from "@/config/plans";
import { hero } from "@/content/sections";
import { whatsappLink } from "@/content/site";
import { track } from "@/lib/analytics";
import { normalizeSite, siteSchema } from "@/lib/lead-schema";
import { BrandSymbol } from "@/components/brand/Logo";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { ButtonLink } from "@/components/ui/Button";
import { useLead } from "@/components/conversion/LeadContext";
import { cn } from "@/lib/utils";

/**
 * Entrada do diagnóstico em formato de chat.
 * 1) a pessoa cola o site; 2) animação de busca mostra o pedido sendo preparado
 * (sem simular resultados: a análise real é feita pela equipe); 3) botão para receber pelo WhatsApp.
 */

type Stage = "idle" | "searching" | "ready";

const STEPS = ["Lendo o endereço do site", "Separando as perguntas que seus clientes fazem", "Listando as IAs que vamos consultar"];
const ENGINES = platformOrder.slice(0, 4);

function Avatar() {
  return (
    <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-grafite text-lima">
      <BrandSymbol className="size-[18px]" />
    </span>
  );
}

function Bubble({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("max-w-[92%] rounded-[20px] rounded-tl-[6px] bg-white px-4 py-3 text-[15px] leading-relaxed text-grafite sm:text-base", className)}>{children}</div>;
}

export function HeroChat() {
  const { openLead } = useLead();
  const [stage, setStage] = useState<Stage>("idle");
  const [site, setSite] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const id = useId();
  const log = useRef<HTMLDivElement>(null);

  // Animação de busca: três etapas em sequência; com movimento reduzido, vai direto ao fim.
  const timers = useRef<number[]>([]);
  const clearTimers = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  const runSearch = () => {
    clearTimers();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(STEPS.length);
      setStage("ready");
      return;
    }
    setStep(0);
    setStage("searching");
    STEPS.forEach((_, i) => timers.current.push(window.setTimeout(() => setStep(i + 1), 850 * (i + 1))));
    timers.current.push(window.setTimeout(() => setStage("ready"), 850 * STEPS.length + 450));
  };

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" });
  }, [stage, step]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = siteSchema.safeParse(value);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Informe um endereço válido");
      return;
    }
    setError(null);
    setSite(normalizeSite(parsed.data));
    setValue("");
    track("hero_cta_click", { origin: "hero" });
    runSearch();
  };

  const reset = () => {
    clearTimers();
    setStage("idle");
    setSite("");
    setStep(0);
  };

  const host = site.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const waHref = whatsappLink(`Olá! Quero o diagnóstico gratuito da CITÁVEL.\n\nSite: ${site}`);

  return (
    <div className="p-paper mx-auto w-full max-w-2xl overflow-hidden rounded-[28px] text-left">
      {/* conversa */}
      <div ref={log} aria-live="polite" className="max-h-[26rem] space-y-4 overflow-y-auto p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <Avatar />
          <Bubble>{hero.chatGreeting}</Bubble>
        </div>

        {site && (
          <div className="flex justify-end motion-safe:animate-[fade-up_0.32s_var(--ease-cit)_both]">
            <div className="max-w-[85%] rounded-[20px] rounded-tr-[6px] bg-grafite px-4 py-3 text-[15px] font-semibold text-papel sm:text-base">{host}</div>
          </div>
        )}

        {stage === "searching" && (
          <div className="flex items-start gap-3 motion-safe:animate-[fade-up_0.32s_var(--ease-cit)_both]">
            <Avatar />
            <Bubble className="w-full">
              <p className="t-label text-chumbo">Preparando seu pedido</p>
              <ul className="mt-3 space-y-2">
                {STEPS.map((s, i) => (
                  <li key={s} className={cn("flex items-center gap-2.5 text-[14px] transition-opacity duration-[320ms]", i <= step ? "opacity-100" : "opacity-35")}>
                    <span
                      aria-hidden
                      className={cn(
                        "h-3.5 w-2 shrink-0 rotate-[20deg] rounded-full transition-colors duration-[320ms]",
                        i < step ? "bg-grafite" : i === step ? "bg-lima motion-safe:animate-pulse" : "bg-app-line",
                      )}
                    />
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {ENGINES.map((e, i) => {
                  const p = platforms[e];
                  const on = step >= 2;
                  return (
                    <span
                      key={e}
                      style={{ transitionDelay: on ? `${i * 160}ms` : "0ms" }}
                      className={cn(
                        "flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-[12px] font-semibold transition-colors duration-[320ms]",
                        on ? "border-grafite bg-grafite text-papel" : "border-app-line text-chumbo",
                      )}
                    >
                      {!p.wide && <Image src={p.logo} alt="" width={p.w} height={p.h} sizes="14px" className="size-3.5 object-contain" />}
                      {p.name}
                    </span>
                  );
                })}
              </div>
            </Bubble>
          </div>
        )}

        {stage === "ready" && (
          <div className="flex items-start gap-3 motion-safe:animate-[fade-up_0.64s_var(--ease-cit)_both]">
            <Avatar />
            <Bubble className="w-full">
              <p>
                Tudo pronto para começar. Nossa equipe testa <b>{host}</b> no ChatGPT, Gemini e outras IAs e envia o diagnóstico gratuito pelo
                WhatsApp.
              </p>
              <ButtonLink href={waHref} variant="lima" className="mt-4 w-full sm:w-auto" onClick={() => track("whatsapp_click", { origin: "hero" })} arrow={false}>
                <WhatsAppIcon className="size-5" />
                {hero.chatCta}
              </ButtonLink>
              <p className="mt-3 text-[13px] text-chumbo">
                A análise é feita pela nossa equipe depois que você enviar a mensagem.{" "}
                <button type="button" onClick={() => openLead({ origin: "hero-chat", site })} className="font-semibold text-grafite underline underline-offset-4">
                  Prefiro preencher um formulário
                </button>
              </p>
            </Bubble>
          </div>
        )}
      </div>

      {/* campo do chat */}
      <form onSubmit={submit} noValidate aria-label="Iniciar diagnóstico gratuito" className="border-t border-app-line p-3 sm:p-4">
        {stage === "idle" ? (
          <>
            <label htmlFor={id} className="sr-only">
              {hero.fieldLabel}
            </label>
            <div className="flex items-center gap-2 rounded-full bg-white p-1.5 pl-5 outline-offset-2 focus-within:outline focus-within:outline-3 focus-within:outline-lima">
              <input
                id={id}
                type="url"
                inputMode="url"
                autoComplete="url"
                placeholder={hero.placeholder}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  if (error) setError(null);
                }}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-err` : undefined}
                className="h-11 min-w-0 flex-1 bg-transparent text-base text-grafite placeholder:text-chumbo/80 focus:outline-none"
              />
              <button type="submit" aria-label={hero.cta} className="grid size-11 shrink-0 place-items-center rounded-full bg-grafite text-lima transition-transform duration-[160ms] hover:-translate-y-0.5">
                <span aria-hidden className="text-lg font-bold">
                  →
                </span>
              </button>
            </div>
            {error && (
              <p id={`${id}-err`} role="alert" className="mt-2 px-2 text-[13px] font-semibold text-[#a8341c]">
                {error}
              </p>
            )}
          </>
        ) : (
          <div className="flex items-center justify-between gap-3 px-2 text-[13px] text-chumbo">
            <span>{stage === "searching" ? "Preparando…" : "Pedido pronto."}</span>
            <button type="button" onClick={reset} className="font-semibold text-grafite underline underline-offset-4">
              Trocar site
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
