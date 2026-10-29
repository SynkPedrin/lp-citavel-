"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { site, whatsappLink } from "@/content/site";
import { track } from "@/lib/analytics";
import type { LeadDelivery } from "@/lib/env";
import {
  formatBRPhone,
  leadSchema,
  leadToWhatsappMessage,
  PLAN_INTEREST,
  PLAN_INTEREST_LABEL,
  type Lead,
  type LeadInput,
  type PlanInterest,
} from "@/lib/lead-schema";
import { Button, ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "sent" }
  | { kind: "whatsapp"; href: string }
  | { kind: "error"; message: string; fallbackHref: string };

const inputBase =
  "h-12 w-full rounded-xl border border-line-strong bg-ink/80 px-4 text-base text-paper placeholder:text-mist/50 transition-[border-color,box-shadow] duration-300 focus:border-lime focus:shadow-[0_0_0_4px_rgba(189,245,49,0.12)] focus:outline-none aria-[invalid=true]:border-orange sm:h-[3.25rem]";

type Ids = { id: string; describedBy?: string };

function Field({
  label,
  hint,
  error,
  className,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: (ids: Ids) => ReactNode;
}) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between gap-3 text-sm font-medium text-paper/90">
        {label}
        {hint && <span className="text-xs font-normal text-mist/70">{hint}</span>}
      </label>
      {children({ id, describedBy: error ? errId : undefined })}
      {error && (
        <p id={errId} className="mt-1.5 flex items-center gap-1.5 text-sm text-orange">
          <AlertTriangle aria-hidden className="size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function TextInput({
  reg,
  ids,
  invalid,
  ...rest
}: { reg: UseFormRegisterReturn; ids: Ids; invalid: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <input id={ids.id} aria-describedby={ids.describedBy} aria-invalid={invalid} className={inputBase} {...rest} {...reg} />;
}

type Props = {
  delivery: LeadDelivery;
  /** Origem do CTA (hero, header, plano-profissional…) — enviada ao CRM e ao analytics. */
  origin: string;
  defaults?: { site?: string; plan?: PlanInterest };
  compact?: boolean;
  autoFocus?: boolean;
  submitLabel?: string;
};

export function LeadForm({ delivery, origin, defaults, compact, autoFocus, submitLabel = "Solicitar diagnóstico gratuito" }: Props) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const startedAt = useRef(0);
  const started = useRef(false);
  const utm = useRef<Record<string, string>>({});
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const plan = defaults?.plan ?? "indefinido";

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<LeadInput, unknown, Lead>({
    resolver: zodResolver(leadSchema),
    mode: "onTouched",
    defaultValues: { site: defaults?.site ?? "", nome: "", empresa: "", whatsapp: "", email: "", plano: plan },
  });

  useEffect(() => {
    startedAt.current = Date.now();
    new URLSearchParams(window.location.search).forEach((value, key) => {
      if (key.startsWith("utm_")) utm.current[key] = value.slice(0, 200);
    });
    if (autoFocus) setFocus(defaults?.site ? "nome" : "site");
  }, [autoFocus, defaults?.site, setFocus]);

  useEffect(() => {
    if (status.kind !== "idle" && status.kind !== "submitting") statusRef.current?.focus();
  }, [status]);

  const onFirstFocus = () => {
    if (started.current) return;
    started.current = true;
    track("diagnostico_form_start", { origin });
  };

  // Máscara: o RHF atualiza o valor do input registrado via setValue.
  const whatsappReg = register("whatsapp", {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const masked = formatBRPhone(e.target.value);
      if (masked !== e.target.value) setValue("whatsapp", masked, { shouldValidate: !!errors.whatsapp });
    },
  });

  const onSubmit = async (lead: Lead) => {
    track("diagnostico_form_submit", { origin, plan: lead.plano, delivery });
    const waHref = whatsappLink(leadToWhatsappMessage(lead));

    if (delivery === "whatsapp") {
      // Sem backend de captação: envio explícito pelo WhatsApp oficial (nada é armazenado por esta página).
      track("whatsapp_click", { origin, plan: lead.plano });
      window.open(waHref, "_blank", "noopener,noreferrer");
      setStatus({ kind: "whatsapp", href: waHref });
      return;
    }

    setStatus({ kind: "submitting" });
    const honeypot = formRef.current?.querySelector<HTMLInputElement>("[name=website_url]")?.value ?? "";
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, origem: origin, website_url: honeypot, startedAt: startedAt.current, utm: utm.current }),
      });
      if (res.ok) {
        // Conversão registrada somente após confirmação real do servidor.
        track("lead_submit_success", { origin, plan: lead.plano });
        setStatus({ kind: "sent" });
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      const message =
        data.error === "too_fast"
          ? "Envio muito rápido. Revise os dados e tente novamente em alguns segundos."
          : data.error === "rate_limited"
            ? "Recebemos muitas tentativas deste dispositivo. Tente mais tarde ou fale pelo WhatsApp."
            : "Não conseguimos registrar seu pedido agora. Seus dados não foram enviados.";
      setStatus({ kind: "error", message, fallbackHref: waHref });
    } catch {
      setStatus({ kind: "error", message: "Falha de conexão. Seus dados não foram enviados.", fallbackHref: waHref });
    }
  };

  if (status.kind === "sent" || status.kind === "whatsapp") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-2xl border border-lime/40 bg-lime/[0.06] p-6 outline-none sm:p-8">
        {status.kind === "sent" ? (
          <>
            <CheckCircle2 aria-hidden className="size-9 text-lime" />
            <h3 className="mt-4 font-display text-2xl font-extrabold">Pedido recebido.</h3>
            <p className="mt-2 text-base leading-relaxed text-mist">
              Seus dados chegaram à equipe da Citável. Vamos entrar em contato pelo WhatsApp ou e-mail informados para dar
              continuidade ao diagnóstico.
            </p>
          </>
        ) : (
          <>
            <MessageCircle aria-hidden className="size-9 text-lime" />
            <h3 className="mt-4 font-display text-2xl font-extrabold">Falta só enviar no WhatsApp.</h3>
            <p className="mt-2 text-base leading-relaxed text-mist">
              Abrimos o WhatsApp oficial da Citável com sua mensagem pronta. O pedido só chega à nossa equipe quando você tocar
              em enviar.
            </p>
            <ButtonLink href={status.href} className="mt-5" onClick={() => track("whatsapp_click", { origin })}>
              Abrir o WhatsApp
            </ButtonLink>
          </>
        )}
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-5 block text-sm text-mist underline-offset-4 hover:text-paper hover:underline"
        >
          Voltar ao formulário
        </button>
      </div>
    );
  }

  const submitting = status.kind === "submitting";

  return (
    <form ref={formRef} noValidate onSubmit={(e) => void handleSubmit(onSubmit)(e)} onFocus={onFirstFocus} aria-label="Solicitar diagnóstico gratuito">
      <fieldset disabled={submitting} className={cn("grid gap-4 sm:grid-cols-2", compact ? "sm:gap-x-4 sm:gap-y-4" : "sm:gap-5")}>
        <legend className="sr-only">Dados para o diagnóstico gratuito</legend>

        <Field label="Site da empresa" hint="se ainda não tiver, deixe em branco" error={errors.site?.message} className="sm:col-span-2">
          {(ids) => <TextInput ids={ids} reg={register("site")} invalid={!!errors.site} type="url" inputMode="url" autoComplete="url" placeholder="https://suaempresa.com.br" />}
        </Field>
        <Field label="Nome" error={errors.nome?.message}>
          {(ids) => <TextInput ids={ids} reg={register("nome")} invalid={!!errors.nome} autoComplete="name" placeholder="Seu nome" />}
        </Field>
        <Field label="Empresa" error={errors.empresa?.message}>
          {(ids) => <TextInput ids={ids} reg={register("empresa")} invalid={!!errors.empresa} autoComplete="organization" placeholder="Nome da empresa" />}
        </Field>
        <Field label="WhatsApp" error={errors.whatsapp?.message}>
          {(ids) => (
            <TextInput ids={ids} reg={whatsappReg} invalid={!!errors.whatsapp} type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(00) 00000-0000" maxLength={16} />
          )}
        </Field>
        <Field label="E-mail" error={errors.email?.message}>
          {(ids) => <TextInput ids={ids} reg={register("email")} invalid={!!errors.email} type="email" inputMode="email" autoComplete="email" placeholder="voce@empresa.com.br" />}
        </Field>
        <Field label="Plano de interesse" hint="opcional" error={errors.plano?.message} className="sm:col-span-2">
          {(ids) => (
            <select id={ids.id} aria-describedby={ids.describedBy} className={cn(inputBase, "select-chevron pr-10")} {...register("plano")}>
              {PLAN_INTEREST.map((p) => (
                <option key={p} value={p}>
                  {PLAN_INTEREST_LABEL[p]}
                </option>
              ))}
            </select>
          )}
        </Field>

        {/* honeypot anti-spam: invisível para pessoas e tecnologias assistivas */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Não preencha este campo
            <input name="website_url" type="text" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer gap-3 text-sm leading-relaxed text-mist">
            <input
              type="checkbox"
              className="check-input mt-0.5"
              aria-invalid={!!errors.consentimento}
              aria-describedby={errors.consentimento ? `consent-err-${origin}` : undefined}
              {...register("consentimento")}
            />
            <span>
              Autorizo a Citável a usar estes dados para realizar o diagnóstico e entrar em contato, conforme a{" "}
              <a href={site.links.privacy} target="_blank" rel="noopener noreferrer" className="text-paper underline underline-offset-4 hover:text-lime">
                Política de Privacidade
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
              .
            </span>
          </label>
          {errors.consentimento && (
            <p id={`consent-err-${origin}`} className="mt-1.5 flex items-center gap-1.5 text-sm text-orange">
              <AlertTriangle aria-hidden className="size-3.5" />
              {errors.consentimento.message}
            </p>
          )}
        </div>

        {status.kind === "error" && (
          <div ref={statusRef} tabIndex={-1} role="alert" className="rounded-xl border border-orange/50 bg-orange/10 p-4 text-sm text-paper outline-none sm:col-span-2">
            <p className="flex items-start gap-2">
              <AlertTriangle aria-hidden className="mt-0.5 size-4 shrink-0 text-orange" />
              {status.message}
            </p>
            <a
              href={status.fallbackHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { origin })}
              className="mt-2 inline-block font-medium text-lime underline-offset-4 hover:underline"
            >
              Enviar pelo WhatsApp oficial
            </a>
          </div>
        )}

        <div className="sm:col-span-2">
          <Button type="submit" size="lg" className="w-full" icon={!submitting}>
            {submitting ? (
              <span className="flex items-center gap-2">
                <Loader2 aria-hidden className="size-4 animate-spin" /> Enviando…
              </span>
            ) : delivery === "whatsapp" ? (
              `${submitLabel} pelo WhatsApp`
            ) : (
              submitLabel
            )}
          </Button>
          <p className="mt-3 text-center text-xs leading-relaxed text-mist/80">
            {delivery === "whatsapp"
              ? "Abrimos o WhatsApp oficial da Citável com seus dados preenchidos. Nada é enviado antes da sua confirmação."
              : "Sem compromisso. Nossa equipe entra em contato para dar continuidade à análise."}
          </p>
        </div>
      </fieldset>
    </form>
  );
}
