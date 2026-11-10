"use client";

import { useEffect, useId, useRef, useState } from "react";

/** Dica (Brand Book · componentes): balão grafite. Abre com hover, foco ou toque; Esc fecha. */
export function InfoTip({ label, text }: { label: string; text: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <span ref={ref} className="relative inline-flex align-middle" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-label={`O que é: ${label}`}
        aria-describedby={open ? id : undefined}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="grid size-5 place-items-center rounded-full border border-current text-[11px] font-bold leading-none opacity-60 transition-opacity hover:opacity-100"
      >
        i
      </button>
      {open && (
        <span
          id={id}
          role="tooltip"
          className="absolute bottom-full left-1/2 z-30 mb-2 w-64 -translate-x-1/2 rounded-[12px] bg-grafite px-3 py-2.5 text-left text-[13px] font-normal normal-case leading-relaxed tracking-normal text-papel"
        >
          {text}
        </span>
      )}
    </span>
  );
}
