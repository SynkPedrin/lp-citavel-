/**
 * Gera os assets públicos a partir dos originais (pasta `assets/`, nunca alterada) e do símbolo vetorial
 * do Brand Book.
 *
 * - Logos de IA: Google AI e Grok vêm com fundo branco opaco; removemos o fundo
 *   (color-to-alpha) e usamos a variante clara para fundo escuro.
 * - Ícones do app: símbolo lima sobre grafite ocupando 62% da área (Brand Book · Aplicativo).
 *
 * Uso: npm run assets
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const src = (f) => path.join(root, "assets", f);
const out = (f) => path.join(root, "public", "assets", f);

const GRAFITE = "#1C1D1A";
const LIMA = "#CFF24A";

await mkdir(out("ai"), { recursive: true });

// ── Logos de IA ────────────────────────────────────────────────────────────
const copies = [
  ["icon-gpt.webp", "chatgpt.webp", 512],
  ["gemini-logo.png", "gemini.png"],
  ["claude-logo.webp", "claude.webp"],
  ["perplexity-ai-icon.webp", "perplexity.webp"],
  ["microsoft-copilot.webp", "copilot.webp"],
];
for (const [from, to, size] of copies) {
  let img = sharp(src(from));
  if (size) img = img.resize(size, size, { fit: "inside" });
  await img.toFile(out(`ai/${to}`));
}

/** Remove fundo branco preservando antialias e cores (algoritmo color-to-alpha contra branco). */
async function whiteToAlpha(file, { recolorNeutral, neutralAlphaBoost = 1 } = {}) {
  const { data, info } = await sharp(src(file)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const alpha = 1 - Math.min(r, g, b) / 255;
    if (alpha <= 0.02) {
      data[i + 3] = 0;
      continue;
    }
    let nr = (r - 255 * (1 - alpha)) / alpha;
    let ng = (g - 255 * (1 - alpha)) / alpha;
    let nb = (b - 255 * (1 - alpha)) / alpha;
    const sat = Math.max(nr, ng, nb) - Math.min(nr, ng, nb);
    if (recolorNeutral && sat < 40) {
      [nr, ng, nb] = recolorNeutral;
      data[i + 3] = Math.round(Math.min(1, alpha * neutralAlphaBoost) * 255);
    } else {
      data[i + 3] = Math.round(alpha * 255);
    }
    data[i] = Math.round(nr);
    data[i + 1] = Math.round(ng);
    data[i + 2] = Math.round(nb);
  }
  return sharp(data, { raw: info }).trim({ threshold: 1 }).png({ compressionLevel: 9 });
}

await (await whiteToAlpha("Google_AI.png", { recolorNeutral: [241, 240, 234], neutralAlphaBoost: 1.6 })).toFile(out("ai/google-ai.png"));
await (await whiteToAlpha("LOGO- GROK.png", { recolorNeutral: [241, 240, 234] })).resize(512, 512, { fit: "inside" }).toFile(out("ai/grok.png"));

// ── Ícones do app a partir do símbolo vetorial ─────────────────────────────
/** Símbolo do Brand Book (viewBox 100), centralizado ocupando `area` do quadro. */
function iconSvg(size, { radius, area = 0.62, bg = GRAFITE, fg = LIMA }) {
  const s = size * area;
  const o = (size - s) / 2;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${radius}" fill="${bg}"/>
  <g transform="translate(${o} ${o}) scale(${s / 100})" fill="${fg}">
    <rect x="14" y="8" width="24" height="54" rx="12" transform="rotate(20 26 35)"/>
    <rect x="52" y="8" width="24" height="84" rx="12" transform="rotate(20 64 50)"/>
  </g>
</svg>`);
}

await sharp(iconSvg(512, { radius: 112 })).png().toFile(path.join(root, "src/app/icon.png"));
await sharp(iconSvg(180, { radius: 0 })).png().toFile(path.join(root, "src/app/apple-icon.png"));

for (const f of ["ai/google-ai.png", "ai/grok.png"]) {
  const m = await sharp(out(f)).metadata();
  console.log(f.padEnd(24), `${m.width}x${m.height}`);
}
console.log("assets ok");
