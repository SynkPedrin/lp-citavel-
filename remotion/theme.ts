import { loadFont as loadArchivo } from "@remotion/google-fonts/Archivo";
import { loadFont as loadMono } from "@remotion/google-fonts/DMMono";

export const { fontFamily: archivo } = loadArchivo("normal", { weights: ["400", "800", "900"], subsets: ["latin"] });
export const { fontFamily: dmMono } = loadMono("normal", { weights: ["400", "500"], subsets: ["latin"] });

export const color = {
  bg: "#060807",
  void: "#000000",
  graphite: "#151715",
  surface: "#1C1F1B",
  lime: "#BDF531",
  paper: "#F5F5F0",
  mist: "#A3A8A0",
} as const;

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Unidade relativa: 1u = 1px em 1080p, escala com a composição. */
export const unit = (width: number, height: number) => Math.min(width, height) / 1080;
