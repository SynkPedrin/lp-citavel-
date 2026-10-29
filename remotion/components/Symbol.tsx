import type { FC } from "react";
import { Img, staticFile } from "remotion";
import type { CSSProperties } from "react";

/** Símbolo Citável original (asset real, sem redesenho). Proporção 618×740. */
export const CitavelSymbol: FC<{ height: number; style?: CSSProperties; glow?: number }> = ({
  height,
  style,
  glow = 0,
}) => (
  <Img
    src={staticFile("assets/brand/icon-citavel.png")}
    style={{
      height,
      width: (height * 618) / 740,
      filter: glow > 0 ? `drop-shadow(0 0 ${glow}px rgba(189,245,49,0.75))` : undefined,
      ...style,
    }}
  />
);
