import { continueRender, delayRender, Easing } from "remotion";

/** Paleta e motion do Brand Book CITÁVEL. */
export const color = {
  grafite: "#1C1D1A",
  carvao: "#2A2B27",
  chumbo: "#5B5C55",
  concreto: "#8B8C85",
  nevoa: "#D9D9D2",
  papel: "#F1F0EA",
  gelo: "#D3DCDD",
  lima: "#CFF24A",
  txt2: "#C9CAC3",
} as const;

/** "Sobe, firma e para": curva da marca. Entradas 640 ms, sequência de 80 ms (a 30 fps: 19 e 2,4 frames). */
export const ease = Easing.bezier(0.2, 0.8, 0.2, 1);
export const FPS = 30;
export const ms = (t: number) => (t / 1000) * FPS;
export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const archivo = '"Archivo", "Helvetica Neue", Arial, sans-serif';

/**
 * Archivo variável com eixo de largura (62–125), como no Brand Book.
 * O render espera a fonte carregar para o wordmark (largura 112) e o display (64) saírem corretos.
 */
if (typeof document !== "undefined" && !document.getElementById("cit-archivo")) {
  const handle = delayRender("Carregando Archivo (largura variável)");
  const link = document.createElement("link");
  link.id = "cit-archivo";
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&display=block";
  link.onload = () =>
    Promise.all([document.fonts.load(`800 100px ${archivo}`), document.fonts.load(`700 100px ${archivo}`)])
      .then(() => document.fonts.ready)
      .finally(() => continueRender(handle));
  link.onerror = () => continueRender(handle);
  document.head.appendChild(link);
}
