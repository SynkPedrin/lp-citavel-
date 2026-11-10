import type { FC } from "react";
import { Composition, Still } from "remotion";
import { Assinatura } from "./compositions/Assinatura";
import { LogoLockup, OgCard } from "./compositions/OgCard";
import { FPS } from "./theme";

export const RemotionRoot: FC = () => (
  <>
    {/* Assinatura animada da marca (16:9 e 9:16 para stories) */}
    <Composition id="Assinatura" component={Assinatura} durationInFrames={5 * FPS} fps={FPS} width={1920} height={1080} />
    <Composition id="AssinaturaVertical" component={Assinatura} durationInFrames={5 * FPS} fps={FPS} width={1080} height={1920} />
    <Still id="OgCard" component={OgCard} width={1200} height={630} />
    <Still id="LogoLockup" component={LogoLockup} width={1200} height={360} />
  </>
);
