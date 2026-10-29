import type { FC } from "react";
import { AbsoluteFill, Easing, Img, interpolate, random, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CitavelSymbol } from "../components/Symbol";
import { Grain } from "../components/Grain";
import { clamp, color, dmMono, unit } from "../theme";

/**
 * CitavelHeroFilm — ~10s, 30fps, loop.
 * 0–2s  linhas neon nas bordas + sinal emergindo
 * 2–4s  fragmentos de perguntas em profundidade
 * 4–6s  respostas abstratas e sinais de reputação se organizam
 * 6–8s  linhas convergem para o símbolo Citável
 * 8–10s pulso verde e retorno orgânico ao início
 *
 * Responsivo: a mesma composição é registrada em 16:9 e em retrato (mobile).
 * O texto principal da LP NÃO está no vídeo (fica em HTML acessível).
 */

/** Posições fixas (em u, relativas ao foco) — evitam sobreposição entre perguntas simultâneas. */
const QUESTION_SLOTS: ReadonlyArray<readonly [number, number]> = [
  [-380, -330],
  [240, -230],
  [-520, -120],
  [280, -20],
  [-300, 90],
  [180, 200],
  [-440, 300],
];

const QUESTIONS = [
  "qual a empresa mais confiável da região?",
  "vale a pena contratar…",
  "quem é referência em…",
  "melhor fornecedor perto de mim",
  "o que dizem sobre essa marca?",
  "é seguro comprar de…",
  "quais as opções mais indicadas?",
];

const SIGNALS = ["menção", "citação", "fonte", "sentimento", "contexto", "avaliação", "entidade", "evidência"];

const ease = Easing.bezier(0.16, 1, 0.3, 1);

export const CitavelHeroFilm: FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const u = unit(width, height);
  const portrait = height > width;
  const focus = portrait ? { x: width * 0.5, y: height * 0.7 } : { x: width * 0.7, y: height * 0.52 };
  const cycle = (frame / durationInFrames) * Math.PI * 2;

  // Camadas animadas entram e saem para o último frame casar com o primeiro (loop sem corte).
  const loop = interpolate(frame, [0, 10, durationInFrames - 30, durationInFrames - 1], [0, 1, 1, 0], clamp);

  // ── 0–2s: linhas de borda ───────────────────────────────────────────
  const inset = 36 * u;
  const rw = width - inset * 2;
  const rh = height - inset * 2;
  const perimeter = 2 * (rw + rh);
  const edgeTravel = interpolate(frame, [0, 90], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const edgeOpacity = interpolate(frame, [0, 8, 70, 120], [0, 1, 0.9, 0.25], clamp);

  const signal = interpolate(frame, [15, 60, 150, 200], [0, 0.55, 0.35, 0.2], clamp);

  // ── 4–6s: nós de reputação (posições caóticas → órbita organizada → centro) ──
  const organize = interpolate(frame, [115, 175], [0, 1], { ...clamp, easing: ease });
  const converge = interpolate(frame, [185, 235], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const nodes = SIGNALS.map((label, i) => {
    const angle = (i / SIGNALS.length) * Math.PI * 2 - Math.PI / 2;
    const radius = (portrait ? 300 : 340) * u;
    const ox = focus.x + Math.cos(angle) * radius;
    const oy = focus.y + Math.sin(angle) * radius * 0.82;
    const sx = (random(`nx${i}`) * 0.9 + 0.05) * width;
    const sy = (random(`ny${i}`) * 0.8 + 0.1) * height;
    const x = interpolate(organize, [0, 1], [sx, ox]);
    const y = interpolate(organize, [0, 1], [sy, oy]);
    const inward = 1 - converge * 0.35;
    return {
      label,
      x: focus.x + (x - focus.x) * inward,
      y: focus.y + (y - focus.y) * inward,
      appear: interpolate(frame, [105 + i * 4, 130 + i * 4], [0, 1], clamp),
    };
  });

  const linesDraw = interpolate(frame, [180, 230], [0, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });
  const symbolIn = interpolate(frame, [205, 240], [0, 1], { ...clamp, easing: ease });

  // ── 8–10s: pulso ─────────────────────────────────────────────────────
  const pulses = [0, 14, 28].map((d) => interpolate(frame, [240 + d, 290 + d], [0, 1], clamp));
  const symbolGlow = interpolate(frame, [236, 250, 280], [10, 46, 18], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: color.bg, overflow: "hidden" }}>
      {/* Textura institucional: respiração cíclica (sem corte no loop) */}
      <AbsoluteFill style={{ transform: `scale(${1.06 + Math.sin(cycle) * 0.015})`, opacity: 0.55 }}>
        <Img
          src={staticFile("assets/textures/background-stone.jpg")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at ${(focus.x / width) * 100}% ${(focus.y / height) * 100}%, transparent 0%, ${color.bg}cc 55%, ${color.bg} 100%)`,
        }}
      />

      <AbsoluteFill style={{ opacity: loop }}>
        {/* Sinal luminoso */}
        <div
          style={{
            position: "absolute",
            left: focus.x - 420 * u,
            top: focus.y - 420 * u,
            width: 840 * u,
            height: 840 * u,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${color.lime}55 0%, ${color.lime}10 40%, transparent 70%)`,
            opacity: signal,
            transform: `scale(${0.6 + signal})`,
          }}
        />

        {/* Linhas neon percorrendo as bordas */}
        <svg width={width} height={height} style={{ position: "absolute", inset: 0, opacity: edgeOpacity }}>
          <defs>
            <filter id="neon" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation={4 * u} result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect x={inset} y={inset} width={rw} height={rh} fill="none" stroke={`${color.paper}14`} strokeWidth={1} />
          {[0, 0.5].map((offset) => (
            <rect
              key={offset}
              x={inset}
              y={inset}
              width={rw}
              height={rh}
              fill="none"
              stroke={color.lime}
              strokeWidth={2 * u}
              strokeLinecap="round"
              strokeDasharray={`${perimeter * 0.14} ${perimeter * 0.86}`}
              strokeDashoffset={-perimeter * (edgeTravel + offset)}
              filter="url(#neon)"
            />
          ))}
          {/* marcas técnicas de canto */}
          {[
            [inset, inset, 1, 1],
            [width - inset, inset, -1, 1],
            [inset, height - inset, 1, -1],
            [width - inset, height - inset, -1, -1],
          ].map(([x, y, dx, dy], i) => (
            <path
              key={i}
              d={`M ${x} ${y + dy * 28 * u} L ${x} ${y} L ${x + dx * 28 * u} ${y}`}
              stroke={color.lime}
              strokeWidth={2 * u}
              fill="none"
            />
          ))}
        </svg>

        {/* 2–4s: perguntas em profundidade */}
        <AbsoluteFill style={{ perspective: 1100 * u, perspectiveOrigin: `${focus.x}px ${focus.y}px` }}>
          {QUESTIONS.map((q, i) => {
            const start = 50 + i * 9;
            const p = interpolate(frame, [start, start + 80], [0, 1], clamp);
            if (p <= 0 || p >= 1) return null;
            const z = interpolate(p, [0, 1], [-900, 260]) * u;
            const opacity = interpolate(p, [0, 0.2, 0.7, 1], [0, 0.85, 0.6, 0]);
            const [dx, dy] = QUESTION_SLOTS[i];
            return (
              <div
                key={q}
                style={{
                  position: "absolute",
                  left: focus.x + dx * u * (portrait ? 0.35 : 1),
                  top: focus.y + dy * u * (portrait ? 1.6 : 1),
                  transform: `translate(-50%, -50%) translateZ(${z}px)`,
                  fontFamily: dmMono,
                  fontSize: 26 * u,
                  color: color.paper,
                  opacity,
                  whiteSpace: "nowrap",
                  padding: `${8 * u}px ${14 * u}px`,
                  border: `1px solid ${color.paper}22`,
                  borderRadius: 999,
                  background: `${color.graphite}aa`,
                }}
              >
                <span style={{ color: color.lime }}>›</span> {q}
              </div>
            );
          })}
        </AbsoluteFill>

        {/* 4–8s: sinais + linhas convergentes */}
        <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
          {nodes.map((n, i) => {
            const len = Math.hypot(n.x - focus.x, n.y - focus.y);
            return (
              <line
                key={`l${i}`}
                x1={n.x}
                y1={n.y}
                x2={focus.x}
                y2={focus.y}
                stroke={color.lime}
                strokeOpacity={0.55}
                strokeWidth={1.5 * u}
                strokeDasharray={len}
                strokeDashoffset={len * (1 - linesDraw)}
              />
            );
          })}
          {/* esqueleto de resposta abstrata */}
          {[0.92, 0.7, 0.84, 0.5].map((w, i) => {
            const grow = interpolate(frame, [125 + i * 6, 165 + i * 6], [0, 1], { ...clamp, easing: ease });
            const fade = interpolate(frame, [200, 230], [1, 0], clamp);
            const bw = (portrait ? 520 : 420) * u * w;
            const bx = portrait ? width * 0.5 - 260 * u : focus.x - 210 * u;
            const by = portrait ? height * 0.9 + i * 30 * u : focus.y + 360 * u + i * 30 * u;
            return (
              <rect
                key={`b${i}`}
                x={bx}
                y={by}
                width={bw * grow}
                height={10 * u}
                rx={5 * u}
                fill={i === 0 ? color.lime : color.paper}
                opacity={(i === 0 ? 0.8 : 0.22) * fade}
              />
            );
          })}
        </svg>
        {nodes.map((n, i) => (
          <div
            key={n.label}
            style={{
              position: "absolute",
              left: n.x,
              top: n.y,
              transform: `translate(-50%, -50%) scale(${0.6 + n.appear * 0.4})`,
              opacity: n.appear * (1 - converge * 0.6),
              display: "flex",
              alignItems: "center",
              gap: 8 * u,
              fontFamily: dmMono,
              fontSize: 18 * u,
              color: color.mist,
              letterSpacing: 1 * u,
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 10 * u,
                height: 10 * u,
                borderRadius: 999,
                background: i % 3 === 0 ? color.lime : color.paper,
                boxShadow: `0 0 ${14 * u}px ${color.lime}`,
              }}
            />
            {n.label}
          </div>
        ))}

        {/* Pulsos */}
        {pulses.map((p, i) => (
          <div
            key={`p${i}`}
            style={{
              position: "absolute",
              left: focus.x,
              top: focus.y,
              width: 1000 * u,
              height: 1000 * u,
              marginLeft: -500 * u,
              marginTop: -500 * u,
              borderRadius: "50%",
              border: `${2 * u}px solid ${color.lime}`,
              transform: `scale(${0.08 + p * 0.95})`,
              opacity: p > 0 ? (1 - p) * 0.7 : 0,
            }}
          />
        ))}

        {/* Símbolo */}
        <div
          style={{
            position: "absolute",
            left: focus.x,
            top: focus.y,
            transform: `translate(-50%, -50%) scale(${0.7 + symbolIn * 0.3})`,
            opacity: symbolIn,
          }}
        >
          <CitavelSymbol height={(portrait ? 200 : 230) * u} glow={symbolGlow * u} />
        </div>
      </AbsoluteFill>

      <Grain opacity={0.07} />
    </AbsoluteFill>
  );
};
