"use client";

import { AlertTriangle, Globe } from "lucide-react";
import { useId, useState } from "react";
import { hero } from "@/content/sections";
import { track } from "@/lib/analytics";
import { normalizeSite, siteSchema } from "@/lib/lead-schema";
import { Button } from "@/components/ui/Button";
import { useLead } from "@/components/conversion/LeadContext";

/** Etapa 1 do diagnóstico: valida o site e abre a etapa 2 (contatos) com o site preenchido. */
export function HeroUrlForm() {
  const { openLead } = useLead();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const id = useId();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = siteSchema.safeParse(value);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Informe um endereço válido");
      return;
    }
    setError(null);
    track("hero_cta_click", { origin: "hero" });
    openLead({ origin: "hero", site: normalizeSite(parsed.data) });
  };

  return (
    <form onSubmit={submit} noValidate className="mx-auto w-full max-w-2xl" aria-label="Iniciar diagnóstico gratuito">
      <label htmlFor={id} className="sr-only">
        {hero.fieldLabel}
      </label>
      <div className="flex flex-col gap-2 rounded-2xl border border-line-strong bg-graphite/90 p-2 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur transition-[border-color,box-shadow] focus-within:border-lime/60 focus-within:shadow-[0_0_0_4px_rgba(189,245,49,0.1)] sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-3 px-3">
          <Globe aria-hidden className="size-4 shrink-0 text-mist" />
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
            aria-describedby={error ? `${id}-err` : `${id}-hint`}
            className="h-12 w-full min-w-0 bg-transparent text-base text-paper placeholder:text-mist/60 focus:outline-none"
          />
        </div>
        <Button type="submit" size="md" className="h-12 shrink-0 sm:px-6">
          {hero.cta}
        </Button>
      </div>
      {error ? (
        <p id={`${id}-err`} role="alert" className="mt-3 flex items-center justify-center gap-1.5 text-sm text-orange">
          <AlertTriangle aria-hidden className="size-3.5" />
          {error}
        </p>
      ) : (
        <p id={`${id}-hint`} className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-mist">
          {hero.microcopy.map((m, i) => (
            <span key={m} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden className="size-1 rounded-full bg-lime/70" />}
              {m}
            </span>
          ))}
        </p>
      )}
    </form>
  );
}
