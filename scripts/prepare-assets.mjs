/**
 * Gera cópias otimizadas dos assets originais (pasta `assets/`, nunca alterada) em `public/assets/`.
 *
 * - Marca: recorte do espaço transparente excedente (sem redesenho).
 * - Texturas: renomeadas pela COR real (os nomes originais dos planos não correspondem às cores).
 * - Logos de IA: Google AI e Grok vêm com fundo branco opaco; removemos o fundo
 *   (color-to-alpha) e usamos a variante clara oficial para fundo escuro.
 *
 * Uso: npm run assets
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const src = (f) => path.join(root, "assets", f);
const out = (f) => path.join(root, "public", "assets", f);

await Promise.all(["brand", "textures", "ai"].map((d) => mkdir(out(d), { recursive: true })));

// ── Marca ────────────────────────────────────────────────────────────────
await sharp(src("LOGO CITAVEL.png")).trim({ threshold: 1 }).png({ compressionLevel: 9 }).toFile(out("brand/logo-citavel.png"));
await sharp(src("ICONE CITAVEL.png")).trim({ threshold: 1 }).png({ compressionLevel: 9 }).toFile(out("brand/icon-citavel.png"));

// ── Texturas (JPEG progressivo de alta qualidade; next/image ainda otimiza por viewport) ──
const textures = [
  ["WALLPAPER CITAVEL.png", "wallpaper-lime.jpg"],
  ["background.png", "background-stone.jpg"],
  ["plano incial.png", "texture-emerald.jpg"],
  ["plano profissional.png", "texture-cyan.jpg"],
  ["plano completo.png", "texture-orange.jpg"],
];
for (const [from, to] of textures) {
  await sharp(src(from)).jpeg({ quality: 86, progressive: true, mozjpeg: true }).toFile(out(`textures/${to}`));
}

// ── Logos de IA ────────────────────────────────────────────────────────────
const copies = [
  ["icon-gpt.webp", "chatgpt.webp", 512],
  ["gemini-logo.png", "gemini.png"],
  ["claude-logo.webp", "claude.webp"],
  ["perplexity-ai-icon.webp", "perplexity.webp"],
  ["microsoft-copilot.webp", "copilot.webp"],
  ["icon-ollama.png", "ollama.png", 512],
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
    const min = Math.min(r, g, b);
    const alpha = 1 - min / 255;
    if (alpha <= 0.02) {
      data[i + 3] = 0;
      continue;
    }
    // cor original "des-misturada" do branco
    let nr = (r - 255 * (1 - alpha)) / alpha;
    let ng = (g - 255 * (1 - alpha)) / alpha;
    let nb = (b - 255 * (1 - alpha)) / alpha;
    const sat = Math.max(nr, ng, nb) - Math.min(nr, ng, nb);
    if (recolorNeutral && sat < 40) {
      // tipografia/forma neutra (cinza/preto) → tom claro para fundo escuro
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

// Google AI: texto cinza → #E8EAED (tom usado pelo Google em superfícies escuras); pontos coloridos preservados.
await (await whiteToAlpha("Google_AI.png", { recolorNeutral: [232, 234, 237], neutralAlphaBoost: 1.6 })).toFile(out("ai/google-ai.png"));
// Grok: marca monocromática preta → branca (variante para fundo escuro).
await (await whiteToAlpha("LOGO- GROK.png", { recolorNeutral: [245, 245, 240] })).resize(512, 512, { fit: "inside" }).toFile(out("ai/grok.png"));

// ── Ícones do app ─────────────────────────────────────────────────────────
const icon = await sharp(src("ICONE CITAVEL.png")).trim({ threshold: 1 }).resize(340, 340, { fit: "inside" }).toBuffer();
const tile = (size, radius) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#060807"/></svg>`);
await sharp(tile(512, 112)).composite([{ input: icon, gravity: "center" }]).png().toFile(path.join(root, "src/app/icon.png"));
const appleTile = await sharp(tile(512, 0)).composite([{ input: icon, gravity: "center" }]).png().toBuffer();
await sharp(appleTile).resize(180, 180).png().toFile(path.join(root, "src/app/apple-icon.png"));

// Relatório de dimensões para conferência
for (const f of ["brand/logo-citavel.png", "brand/icon-citavel.png", "ai/google-ai.png", "ai/grok.png"]) {
  const m = await sharp(out(f)).metadata();
  console.log(f.padEnd(28), `${m.width}x${m.height}`);
}
// Cor média das texturas de capítulo (referência para os tokens cyan/laranja)
for (const f of ["texture-cyan.jpg", "texture-orange.jpg", "texture-emerald.jpg"]) {
  const { dominant } = await sharp(out(`textures/${f}`)).stats();
  console.log(f.padEnd(28), "dominant", dominant);
}
console.log("assets ok");
