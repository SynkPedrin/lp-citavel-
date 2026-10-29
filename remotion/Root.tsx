import type { FC } from "react";
import { Composition, Still } from "remotion";
import { CitavelHeroFilm } from "./compositions/CitavelHeroFilm";
import { ReputationNetwork } from "./compositions/ReputationNetwork";
import { PulsoFinal } from "./compositions/PulsoFinal";
import { OgCard } from "./compositions/OgCard";

const FPS = 30;

export const RemotionRoot: FC = () => (
  <>
    <Composition id="CitavelHeroFilm" component={CitavelHeroFilm} durationInFrames={10 * FPS} fps={FPS} width={1920} height={1080} />
    {/* Mesmo filme, enquadramento vertical para mobile (não é um crop do 16:9). */}
    <Composition id="CitavelHeroFilmPortrait" component={CitavelHeroFilm} durationInFrames={10 * FPS} fps={FPS} width={1080} height={1920} />
    <Composition id="ReputationNetwork" component={ReputationNetwork} durationInFrames={8 * FPS} fps={FPS} width={1920} height={1080} />
    <Composition id="PulsoFinal" component={PulsoFinal} durationInFrames={6 * FPS} fps={FPS} width={1920} height={1080} />
    <Still id="OgCard" component={OgCard} width={1200} height={630} />
  </>
);
