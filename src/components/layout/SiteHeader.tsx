"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { nav, primaryCta } from "@/content/site";
import { LeadButton } from "@/components/conversion/LeadButton";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu mobile: Esc fecha, foco preso no painel, rolagem do fundo bloqueada.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>("a, button");
    focusables?.[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && focusables && focusables.length) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open ? "border-b border-line bg-ink/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <div className="shell flex h-[var(--header-h)] items-center justify-between gap-3 sm:gap-6">
        <a href="#top" className="relative z-10 shrink-0" aria-label="CITÁVEL — voltar ao início">
          <Image
            src="/assets/brand/logo-citavel.png"
            alt="CITÁVEL"
            width={1880}
            height={409}
            loading="eager"
            sizes="140px"
            className="h-5 w-auto xs:h-6 sm:h-7"
          />
        </a>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm font-medium text-mist transition-colors hover:text-paper"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LeadButton origin="header" size="sm" icon={false} className="whitespace-nowrap px-3 text-[0.62rem] tracking-[0.08em] xs:px-4 sm:px-5 sm:text-[0.7rem] sm:tracking-[0.12em]">
            {primaryCta.label}
          </LeadButton>
          <button
            ref={toggleRef}
            type="button"
            className="relative z-10 grid size-11 place-items-center rounded-full border border-line-strong text-paper lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        ref={panelRef}
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="fixed inset-x-0 bottom-0 top-[var(--header-h)] overflow-y-auto bg-ink/97 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Navegação mobile" className="shell flex h-full flex-col justify-between pb-10 pt-8">
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-line py-4 text-paper"
                >
                  <span className="font-mono text-xs text-lime">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-3xl">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <LeadButton origin="menu-mobile" size="lg" className="mt-10 w-full" onClick={() => setOpen(false)}>
            Quero meu diagnóstico gratuito
          </LeadButton>
        </nav>
      </div>
    </header>
  );
}
