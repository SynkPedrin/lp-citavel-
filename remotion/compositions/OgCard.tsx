import type { FC } from "react";
import { AbsoluteFill } from "remotion";
import { CitavelSymbol, Wordmark } from "../components/Symbol";
import { archivo, color } from "../theme";

/** Imagem Open Graph (1200×630) no sistema da marca: grafite é base, lima é ação, recorte a 20°. */
export const OgCard: FC = () => (
  <AbsoluteFill style={{ background: color.grafite, fontFamily: archivo, color: color.papel, overflow: "hidden" }}>
    {/* Recorte: pílula ampliada atravessa o quadro, pontas de fora */}
    <div style={{ position: "absolute", width: 260, height: 1100, left: 930, top: -230, borderRadius: 999, background: color.lima, transform: "rotate(20deg)" }} />
    <div style={{ position: "absolute", width: 260, height: 760, left: 1140, top: -380, borderRadius: 999, background: color.carvao, transform: "rotate(20deg)" }} />

    <div style={{ position: "absolute", left: 72, top: 64, display: "flex", alignItems: "center", gap: 14 }}>
      <CitavelSymbol size={52} fill={color.lima} />
      <Wordmark size={38} color={color.papel} accentColor={color.lima} />
    </div>

    <div style={{ position: "absolute", left: 72, bottom: 96, width: 860, fontSize: 60, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.04 }}>
      {/* título em até 4 linhas, quebra manual (Brand Book · Social/Pôsteres) */}
      <div>Seu cliente pergunta</div>
      <div>para a IA.</div>
      <div style={{ marginTop: 8 }}>
        <span style={{ background: color.lima, color: color.grafite, padding: "0 0.08em" }}>Sua empresa aparece</span>
      </div>
      <div>
        <span style={{ background: color.lima, color: color.grafite, padding: "0 0.08em" }}>na resposta?</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 72, bottom: 44, fontSize: 18, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: color.txt2 }}>
      citavel.ai · Reputação de marcas em IA
    </div>
  </AbsoluteFill>
);

/** Lockup positivo (grafite sobre branco) para dados estruturados e usos externos. */
export const LogoLockup: FC = () => (
  <AbsoluteFill style={{ background: "#FFFFFF", alignItems: "center", justifyContent: "center" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 0.32 * 120 }}>
      <CitavelSymbol size={1.36 * 120 * 1.1} fill={color.grafite} />
      <Wordmark size={120} color={color.grafite} accentColor={color.grafite} />
    </div>
  </AbsoluteFill>
);
