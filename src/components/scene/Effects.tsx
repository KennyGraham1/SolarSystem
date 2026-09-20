"use client";

import { EffectComposer, Bloom, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";

/**
 * Subtle bloom that only catches HDR (>1) pixels — i.e. the boosted Sun —
 * followed by ACES tone mapping, which the composer otherwise skips.
 */
export function Effects() {
  return (
    <EffectComposer multisampling={4}>
      <Bloom luminanceThreshold={1} luminanceSmoothing={0.3} mipmapBlur intensity={0.55} radius={0.6} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
