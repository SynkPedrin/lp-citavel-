import type { FC } from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CitavelSymbol } from "../components/Symbol";
import { Grain } from "../components/Grain";
import { clamp, color, unit } from "../theme";

/**
 * PulsoFinal — ~6s, 30fps, loop.
 * Linhas técnicas se desenham → pulsos de energia percorrem as linhas → símbolo Citável surge → pulso.
 */
const ease = Easing.bezier(0.16, 1, 0.3, 1);

export const PulsoFinal: FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const u = unit(width, height);
  const c = { x: width / 2, y: height / 2 };
  const loop = interpolate(frame, [0, 8, durationInFrames - 22, durationInFrames - 1], [0, 1, 1, 0], clamp);

  const draw = interpolate(frame, [0, 60], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const energy = interpolate(frame, [45, 110], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
  const reveal = interpolate(frame, [100, 140], [0, 1], { ...clamp, easing: ease });
  const ring = interpolate(frame, [130, 175], [0, 1], clamp);
  const glow = interpolate(frame, [100, 135, 175], [0, 50, 20], clamp);

  // Linhas técnicas que apontam para o centro
  const rays = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2 + Math.PI / 12;
    const r1 = 160 * u;
    const r2 = Math.hypot(width, height) * 0.6;
    return {
      x1: c.x + Math.cos(a) * r2,
      y1: c.y + Math.sin(a) * r2,
      x2: c.x + Math.cos(a) * r1,
      y2: c.y + Math.sin(a) * r1,
      len: r2 - r1,
    };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: color.bg }}>
      <AbsoluteFill style={{ opacity: 0.35 }}>
        <Img src={staticFile("assets/textures/background-stone.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 50%, transparent 0%, ${color.bg} 70%)` }} />

      <AbsoluteFill style={{ opacity: loop }}>
        <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
          {/* eixos técnicos */}
          <line x1={0} x2={width * draw} y1={c.y} y2={c.y} stroke={color.paper} strokeOpacity={0.12} />
          <line x1={c.x} x2={c.x} y1={0} y2={height * draw} stroke={color.paper} strokeOpacity={0.12} />
          <circle
            cx={c.x}
            cy={c.y}
            r={220 * u}
            fill="none"
            stroke={color.paper}
            strokeOpacity={0.14}
            strokeDasharray={2 * Math.PI * 220 * u}
            strokeDashoffset={2 * Math.PI * 220 * u * (1 - draw)}
          />
          <circle cx={c.x} cy={c.y} r={300 * u} fill="none" stroke={color.lime} strokeOpacity={0.12} strokeDasharray={`${4 * u} ${10 * u}`} />

          {rays.map((r, i) => (
            <g key={i}>
              <line
                x1={r.x1}
                y1={r.y1}
                x2={r.x2}
                y2={r.y2}
                stroke={color.paper}
                strokeOpacity={0.12}
                strokeDasharray={r.len}
                strokeDashoffset={r.len * (1 - draw)}
              />
              {/* pulso de energia viajando para o centro */}
              <line
                x1={r.x1}
                y1={r.y1}
                x2={r.x2}
                y2={r.y2}
                stroke={color.lime}
                strokeWidth={2.5 * u}
                strokeLinecap="round"
                strokeDasharray={`${90 * u} ${r.len}`}
                strokeDashoffset={-(r.len - 90 * u) * Math.min(1, energy * (1 + (i % 3) * 0.12))}
                opacity={energy > 0 && energy < 1 ? 0.9 : 0}
              />
            </g>
          ))}
        </svg>

        {[0, 0.35].map((d) => {
          const p = Math.max(0, Math.min(1, (ring - d) / (1 - d)));
          return (
            <div
              key={d}
              style={{
                position: "absolute",
                left: c.x - 450 * u,
                top: c.y - 450 * u,
                width: 900 * u,
                height: 900 * u,
                borderRadius: "50%",
                border: `${2 * u}px solid ${color.lime}`,
                transform: `scale(${0.2 + p * 0.8})`,
                opacity: p > 0 ? (1 - p) * 0.8 : 0,
              }}
            />
          );
        })}

        <div
          style={{
            position: "absolute",
            left: c.x,
            top: c.y,
            transform: `translate(-50%, -50%) translateY(${(1 - reveal) * 40 * u}px)`,
            // glow no wrapper externo: não é recortado pelo clip-path da revelação
            filter: `drop-shadow(0 0 ${glow * u}px rgba(189,245,49,0.7))`,
            opacity: reveal,
          }}
        >
          <div style={{ clipPath: `inset(${(1 - reveal) * 100}% -10% -10% -10%)` }}>
            <CitavelSymbol height={240 * u} />
          </div>
        </div>
      </AbsoluteFill>
      <Grain opacity={0.07} />
    </AbsoluteFill>
  );
};
