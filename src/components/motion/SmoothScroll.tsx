"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";
import { setLenis } from "./lenis-store";

/**
 * Lenis sincronizado com o ticker do GSAP (uma única fonte de rAF → sem conflito com ScrollTrigger).
 * Desativado com prefers-reduced-motion: a rolagem volta a ser 100% nativa.
 * Âncoras internas: rolagem suave + foco no destino (acessibilidade por teclado/leitor de tela).
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    const start = () => {
      lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, smoothWheel: true, syncTouch: false });
      lenis.on("scroll", ScrollTrigger.update);
      setLenis(lenis);
      tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    };
    const stop = () => {
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
      setLenis(null);
      tick = null;
    };

    if (!reduced.matches) start();
    const onChange = () => {
      stop();
      if (!reduced.matches) start();
      ScrollTrigger.refresh();
    };
    reduced.addEventListener("change", onChange);

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const id = decodeURIComponent(anchor.getAttribute("href")!.slice(1));
      const target = id ? document.getElementById(id) : document.body;
      if (!target) return;
      event.preventDefault();
      const focusTarget = () => {
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      };
      if (lenis) {
        // o deslocamento do header vem do scroll-margin-top (Lenis o respeita)
        lenis.scrollTo(id ? target : 0, { duration: 1.4, onComplete: focusTarget });
      } else {
        target.scrollIntoView({ behavior: reduced.matches ? "auto" : "smooth", block: "start" });
        focusTarget();
      }
      history.pushState(null, "", id ? `#${id}` : location.pathname);
    };
    document.addEventListener("click", onClick);

    // Recalcula triggers quando fontes e imagens terminam de carregar (evita offsets errados).
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      reduced.removeEventListener("change", onChange);
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      stop();
    };
  }, []);

  return null;
}
