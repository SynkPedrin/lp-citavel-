import type { FC } from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { archivo, color, dmMono } from "../theme";

/** Imagem Open Graph (still 1200×630) gerada pela mesma direção visual dos filmes. */
export const OgCard: FC = () => (
  <AbsoluteFill style={{ backgroundColor: color.bg, fontFamily: archivo }}>
    <Img
      src={staticFile("assets/textures/wallpaper-lime.jpg")}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }}
    />
    <AbsoluteFill style={{ background: `linear-gradient(90deg, ${color.bg} 0%, ${color.bg}ee 45%, ${color.bg}55 100%)` }} />
    <div style={{ position: "absolute", left: 72, top: 64 }}>
      <Img src={staticFile("assets/brand/logo-citavel.png")} style={{ height: 52 }} />
    </div>
    <div style={{ position: "absolute", left: 72, bottom: 72, right: 120 }}>
      <div style={{ fontFamily: dmMono, color: color.lime, fontSize: 20, letterSpacing: 3, marginBottom: 22 }}>
        REPUTAÇÃO EM INTELIGÊNCIA ARTIFICIAL
      </div>
      <div style={{ color: color.paper, fontWeight: 900, fontSize: 62, lineHeight: 0.96, textTransform: "uppercase" }}>
        Seu cliente pergunta
        <br />
        para a IA.
      </div>
      <div style={{ color: color.lime, fontWeight: 900, fontSize: 62, lineHeight: 0.96, textTransform: "uppercase", marginTop: 10 }}>
        Sua empresa aparece
        <br />
        na resposta?
      </div>
    </div>
  </AbsoluteFill>
);
