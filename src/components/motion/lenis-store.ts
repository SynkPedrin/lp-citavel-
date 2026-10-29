import type Lenis from "lenis";

/** Referência à instância ativa do Lenis (ex.: pausar a rolagem enquanto um modal está aberto). */
let current: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  current = lenis;
};

export const getLenis = () => current;
