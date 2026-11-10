import type { FC } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { CitavelSymbol, Wordmark } from "../components/Symbol";
import { archivo, clamp, color, ease, ms } from "../theme";

/**
 * Assinatura animada (Brand Book · Logotipo / Motion): "sobe, firma e para".
 * 1. As pílulas crescem da base (curta, depois longa).
 * 2. As letras sobem em sequência de 80 ms.
 * 3. O acento-pílula pousa no Á.
 * 4. "Seja a resposta." entra e o marca-texto lima cresce atrás de "resposta."
 * 5. A Onda PULSO respira em loop de 1200 ms. Nada gira, nada quica.
 */
export const Assinatura: FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const u = Math.min(width, height) / 1080;

  const grow = (start: number) => interpolate(frame, [start, start + ms(1200)], [0, 1], { ...clamp, easing: ease });
  const pills: [number, number] = [grow(6), grow(6 + ms(180))];
  const rise = Array.from({ length: 7 }, (_, i) => interpolate(frame, [26 + i * ms(80), 26 + i * ms(80) + ms(640)], [0, 1], { ...clamp, easing: ease }));
  const accent = interpolate(frame, [26 + 7 * ms(80) + 4, 26 + 7 * ms(80) + 4 + ms(640)], [0, 1], { ...clamp, easing: ease });
  const tagIn = interpolate(frame, [70, 70 + ms(640)], [0, 1], { ...clamp, easing: ease });
  const markIn = interpolate(frame, [86, 86 + ms(900)], [0, 1], { ...clamp, easing: ease });

  const bars = 48;
  return (
    <AbsoluteFill style={{ background: color.grafite, fontFamily: archivo, alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 0.32 * 150 * u }}>
        <CitavelSymbol size={1.36 * 150 * u * 1.1} fill={color.lima} grow={pills} />
        <Wordmark size={150 * u} color={color.papel} accentColor={color.lima} rise={rise} accent={accent} />
      </div>

      <div
        style={{
          marginTop: 70 * u,
          fontSize: 64 * u,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          color: color.papel,
          transform: `translateY(${(1 - tagIn) * 28 * u}px)`,
          opacity: tagIn,
        }}
      >
        Seja a{" "}
        <span
          style={{
            backgroundImage: `linear-gradient(${color.lima}, ${color.lima})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${markIn * 100}% 100%`,
            color: markIn > 0.5 ? color.grafite : color.papel,
            padding: "0 0.08em",
          }}
        >
          resposta.
        </span>
      </div>

      {/* Onda PULSO */}
      <div style={{ position: "absolute", left: 120 * u, right: 120 * u, bottom: 90 * u, height: 120 * u, display: "flex", alignItems: "flex-end", gap: 9 * u }}>
        {Array.from({ length: bars }, (_, i) => {
          const base = Math.sin(i * 0.42) * 0.32 + Math.sin(i * 0.13 + 1.2) * 0.38 + 0.55;
          const h = Math.max(0.14, Math.min(1, base));
          const cycle = ((frame + i * 3.1) % 72) / 72;
          const breathe = 0.35 + 0.65 * (0.5 - 0.5 * Math.cos(cycle * Math.PI * 2));
          const appear = interpolate(frame, [i * 0.8, i * 0.8 + ms(640)], [0, 1], { ...clamp, easing: ease });
          return (
            <span
              key={i}
              style={{
                flex: 1,
                height: h * breathe * appear * 120 * u,
                borderRadius: 999,
                background: i === 11 || i === 33 ? color.lima : color.carvao,
                transform: "rotate(20deg)",
                transformOrigin: "50% 100%",
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
