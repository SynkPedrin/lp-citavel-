"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Source = { src: string; media?: string };

type Props = {
  sources: Source[];
  /** Poster único; omita quando um <picture> responsivo é renderizado por trás do vídeo. */
  poster?: string;
  className?: string;
  /** Carregar já após o `load` da página (vídeo do primeiro viewport). Demais: sob demanda. */
  eager?: boolean;
  /** Só reproduz quando a media query corresponde (ex.: somente desktop). */
  media?: string;
};

/**
 * Vídeo decorativo pré-renderizado (Remotion):
 *  - não compete com o conteúdo principal: o src só é atribuído após `load`/proximidade;
 *  - pausa fora da área visível;
 *  - não reproduz com prefers-reduced-motion ou Save-Data (fica o poster estático);
 *  - aparece com fade só quando realmente está tocando.
 */
export function LazyVideo({ sources, poster, className, eager = false, media }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduced || saveData || (media && !window.matchMedia(media).matches)) return;

    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      setActive(true);
    };

    let visible = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) load();
        if (!loaded) return;
        if (visible) video.play().catch(() => undefined);
        else video.pause();
      },
      { rootMargin: eager ? "0px" : "300px 0px" },
    );

    const startObserving = () => io.observe(video);
    if (eager && document.readyState !== "complete") {
      window.addEventListener("load", startObserving, { once: true });
    } else {
      startObserving();
    }

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else if (visible && loaded) video.play().catch(() => undefined);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      window.removeEventListener("load", startObserving);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [eager, media]);

  useEffect(() => {
    const video = ref.current;
    if (!active || !video) return;
    // <source> inserido após a montagem: é preciso recarregar o elemento.
    video.load();
    video.play().catch(() => undefined);
  }, [active]);

  return (
    <video
      ref={ref}
      aria-hidden
      tabIndex={-1}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      onPlaying={() => setPlaying(true)}
      className={cn("transition-opacity duration-1000", playing ? "opacity-100" : poster ? "opacity-90" : "opacity-0", className)}
    >
      {active && sources.map((s) => <source key={s.src} src={s.src} media={s.media} type="video/mp4" />)}
    </video>
  );
}
