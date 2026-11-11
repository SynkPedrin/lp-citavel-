"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { nav, primaryCta } from "@/content/site";
import { Lockup } from "@/components/brand/Logo";
import { LeadButton } from "@/components/conversion/LeadButton";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

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
    <header className="t-dark fixed inset-x-0 top-0 z-50 border-b border-line !bg-grafite/95 backdrop-blur-md">
      <div className="shell flex h-[var(--header-h)] items-center justify-between gap-2 sm:gap-4">
        <a href="#top" className="relative z-10 flex shrink-0 items-center text-[15px] leading-none sm:text-[19px]" aria-label="CITÁVEL, voltar ao início">
          <Lockup />
        </a>

        <nav aria-label="Navegação principal" className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="whitespace-nowrap text-[15px] font-medium text-fg-2 transition-colors duration-[160ms] hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <LeadButton origin="header" size="md" className="h-9 min-h-0 gap-2 whitespace-nowrap px-3.5 text-[13px] sm:h-10 sm:gap-3 sm:px-5 sm:text-[14px] [&>span:last-child]:hidden sm:[&>span:last-child]:inline">
            {primaryCta.label}
          </LeadButton>
          <button
            ref={toggleRef}
            type="button"
            className="relative z-10 grid size-10 place-items-center rounded-full border border-line text-fg transition-colors hover:border-lima xl:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <div id="menu-mobile" ref={panelRef} hidden={!open} role="dialog" aria-modal="true" aria-label="Menu" className="t-dark fixed inset-x-0 bottom-0 top-[var(--header-h)] overflow-y-auto xl:hidden">
        <nav aria-label="Navegação mobile" className="shell flex h-full flex-col justify-between pb-10 pt-6">
          <ul>
            {nav.map((item, i) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)} className="grid grid-cols-[2.5rem_1fr] items-baseline border-t border-line py-4">
                  <span className="t-num text-sm text-lima">{String(i + 1).padStart(2, "0")}</span>
                  <span className="t-title text-3xl">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <LeadButton origin="menu-mobile" className="mt-10 w-full" onClick={() => setOpen(false)}>
            Quero meu diagnóstico grátis
          </LeadButton>
        </nav>
      </div>
    </header>
  );
}
