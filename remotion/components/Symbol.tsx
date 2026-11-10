import type { CSSProperties, FC } from "react";
import { archivo } from "../theme";

/** Símbolo CITÁVEL vetorial (duas aspas a 20°). `grow` (0–1) faz cada pílula crescer da base. */
export const CitavelSymbol: FC<{ size: number; fill: string; grow?: [number, number]; style?: CSSProperties }> = ({ size, fill, grow = [1, 1], style }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={style}>
    {/* scaleY a partir da base de cada pílula, antes da rotação de 20° */}
    <g transform="rotate(20 26 35)">
      <rect x="14" y={8 + 54 * (1 - grow[0])} width="24" height={Math.max(24, 54 * grow[0])} rx="12" fill={fill} opacity={grow[0] > 0.02 ? 1 : 0} />
    </g>
    <g transform="rotate(20 64 50)">
      <rect x="52" y={8 + 84 * (1 - grow[1])} width="24" height={Math.max(24, 84 * grow[1])} rx="12" fill={fill} opacity={grow[1] > 0.02 ? 1 : 0} />
    </g>
  </svg>
);

/**
 * Wordmark: Archivo ExtraBold, largura 112, entreletra +10; o acento do Á é uma pílula a 20°.
 * `rise[i]` (0–1) sobe cada letra de dentro da máscara; `accent` (0–1) faz o acento aparecer.
 */
export const Wordmark: FC<{ size: number; color: string; accentColor: string; rise?: number[]; accent?: number }> = ({ size, color, accentColor, rise, accent = 1 }) => {
  const letters = ["C", "I", "T", "A", "V", "E", "L"];
  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", fontFamily: archivo, fontWeight: 800, fontStretch: "112%", letterSpacing: "0.01em", fontSize: size, lineHeight: 1, color }}>
      {letters.map((l, i) => {
        const r = rise ? rise[i] : 1;
        return (
          <span key={i} style={{ display: "inline-block", overflow: "hidden", paddingTop: size * 0.4, marginTop: -size * 0.4, position: "relative" }}>
            <span style={{ display: "inline-block", transform: `translateY(${(1 - r) * 105}%)` }}>{l}</span>
            {l === "A" && (
              <span
                style={{
                  position: "absolute",
                  left: "44%",
                  bottom: "0.94em",
                  width: "0.13em",
                  height: "0.3em",
                  borderRadius: "1em",
                  background: accentColor,
                  transform: `rotate(20deg) translateY(${(1 - accent) * -0.4}em)`,
                  opacity: accent,
                }}
              />
            )}
          </span>
        );
      })}
    </span>
  );
};
