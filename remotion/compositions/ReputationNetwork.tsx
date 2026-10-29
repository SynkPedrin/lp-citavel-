import type { FC } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Grain } from "../components/Grain";
import { clamp, color, dmMono, unit } from "../theme";

/**
 * ReputationNetwork — ~8s, 30fps, loop perfeito (todos os ciclos são múltiplos da duração).
 * Rede abstrata: fontes públicas → síntese → respostas geradas.
 * Puramente conceitual: não representa integração nem medição real.
 */

const SOURCES = ["site oficial", "imprensa", "youtube", "enciclopédias", "fóruns", "avaliações"];
const ANSWERS = 3;

type Pt = { x: number; y: number };

const bezier = (a: Pt, b: Pt, t: number): Pt => {
  // cúbica horizontal suave entre a e b
  const c1 = { x: a.x + (b.x - a.x) * 0.5, y: a.y };
  const c2 = { x: a.x + (b.x - a.x) * 0.5, y: b.y };
  const mt = 1 - t;
  return {
    x: mt ** 3 * a.x + 3 * mt ** 2 * t * c1.x + 3 * mt * t ** 2 * c2.x + t ** 3 * b.x,
    y: mt ** 3 * a.y + 3 * mt ** 2 * t * c1.y + 3 * mt * t ** 2 * c2.y + t ** 3 * b.y,
  };
};

const pathD = (a: Pt, b: Pt) => {
  const mx = a.x + (b.x - a.x) * 0.5;
  return `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
};

export const ReputationNetwork: FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const u = unit(width, height);
  const T = frame / durationInFrames; // 0..1, cíclico

  const hub: Pt = { x: width * 0.5, y: height * 0.5 };
  const sources: Pt[] = SOURCES.map((_, i) => ({
    x: width * 0.16,
    y: height * (0.18 + (i / (SOURCES.length - 1)) * 0.64),
  }));
  const answers: Pt[] = Array.from({ length: ANSWERS }, (_, i) => ({
    x: width * 0.8,
    y: height * (0.3 + i * 0.2),
  }));

  const hubRotation = T * 360;
  const breathe = 1 + Math.sin(T * Math.PI * 4) * 0.04;

  return (
    <AbsoluteFill style={{ backgroundColor: color.bg }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${color.lime}14 0%, transparent 55%)`,
        }}
      />
      {/* grade técnica */}
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        {Array.from({ length: 13 }, (_, i) => (
          <line
            key={`v${i}`}
            x1={(width / 12) * i}
            x2={(width / 12) * i}
            y1={0}
            y2={height}
            stroke={color.paper}
            strokeOpacity={0.035}
          />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <line
            key={`h${i}`}
            y1={(height / 7) * i}
            y2={(height / 7) * i}
            x1={0}
            x2={width}
            stroke={color.paper}
            strokeOpacity={0.035}
          />
        ))}

        {sources.map((s, i) => (
          <path key={`s${i}`} d={pathD(s, hub)} stroke={color.paper} strokeOpacity={0.16} strokeWidth={1.5 * u} fill="none" />
        ))}
        {answers.map((a, i) => (
          <path key={`a${i}`} d={pathD(hub, a)} stroke={color.lime} strokeOpacity={0.35} strokeWidth={1.5 * u} fill="none" />
        ))}

        {/* pulsos de informação — fontes → síntese */}
        {sources.flatMap((s, i) =>
          [0, 0.5].map((off) => {
            const t = (T * 2 + off + i * 0.13) % 1;
            const p = bezier(s, hub, t);
            const o = interpolate(t, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);
            return <circle key={`ps${i}-${off}`} cx={p.x} cy={p.y} r={4 * u} fill={color.paper} opacity={o * 0.9} />;
          }),
        )}
        {/* síntese → respostas */}
        {answers.map((a, i) => {
          const t = (T * 3 + i * 0.27) % 1;
          const p = bezier(hub, a, t);
          const o = interpolate(t, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);
          return <circle key={`pa${i}`} cx={p.x} cy={p.y} r={5 * u} fill={color.lime} opacity={o} />;
        })}

        {/* hub de síntese */}
        <g transform={`translate(${hub.x} ${hub.y}) scale(${breathe})`}>
          <circle r={96 * u} fill="none" stroke={color.lime} strokeOpacity={0.25} strokeWidth={1 * u} />
          <circle
            r={74 * u}
            fill="none"
            stroke={color.lime}
            strokeWidth={2 * u}
            strokeDasharray={`${10 * u} ${14 * u}`}
            transform={`rotate(${hubRotation})`}
          />
          <circle r={46 * u} fill={color.graphite} stroke={color.paper} strokeOpacity={0.2} />
          <circle r={8 * u} fill={color.lime} />
        </g>
      </svg>

      {/* rótulos das fontes */}
      {sources.map((s, i) => (
        <div
          key={SOURCES[i]}
          style={{
            position: "absolute",
            left: s.x - 16 * u,
            top: s.y,
            transform: "translate(-100%, -50%)",
            fontFamily: dmMono,
            fontSize: 20 * u,
            color: color.mist,
            textTransform: "uppercase",
            letterSpacing: 2 * u,
            display: "flex",
            alignItems: "center",
            gap: 12 * u,
          }}
        >
          {SOURCES[i]}
          <span style={{ width: 12 * u, height: 12 * u, borderRadius: 3 * u, border: `1.5px solid ${color.paper}88` }} />
        </div>
      ))}

      {/* respostas abstratas */}
      {answers.map((a, i) => {
        const glow = interpolate((T * 3 + i * 0.27 + 0.05) % 1, [0.85, 0.95, 1], [0, 1, 0.3], clamp);
        return (
          <div
            key={`ans${i}`}
            style={{
              position: "absolute",
              left: a.x + 14 * u,
              top: a.y,
              transform: "translateY(-50%)",
              width: 260 * u,
              padding: 16 * u,
              borderRadius: 14 * u,
              border: `1px solid ${color.lime}${glow > 0.2 ? "88" : "33"}`,
              background: `${color.surface}cc`,
              boxShadow: `0 0 ${30 * glow * u}px ${color.lime}44`,
            }}
          >
            <div style={{ fontFamily: dmMono, fontSize: 14 * u, color: color.lime, letterSpacing: 2 * u, marginBottom: 10 * u }}>
              RESPOSTA GERADA
            </div>
            {[1, 0.8, 0.6].map((w, j) => (
              <div
                key={j}
                style={{
                  height: 7 * u,
                  width: `${w * 100}%`,
                  borderRadius: 4 * u,
                  background: color.paper,
                  opacity: 0.18,
                  marginTop: j ? 7 * u : 0,
                }}
              />
            ))}
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: hub.x,
          top: hub.y + 120 * u,
          transform: "translateX(-50%)",
          fontFamily: dmMono,
          fontSize: 16 * u,
          color: color.mist,
          letterSpacing: 3 * u,
        }}
      >
        SÍNTESE DO MODELO
      </div>

      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
