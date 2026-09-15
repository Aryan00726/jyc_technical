import { EffectComposer, Bloom } from '@react-three/postprocessing'

/**
 * BloomEffect
 * ===========
 * Adds luminous bloom glow to the lattice particles.
 * Disabled on mobile / low-end devices for performance.
 */
export default function BloomEffect({ enabled = true }) {
  if (!enabled) return null

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={1.4}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
        radius={0.6}
      />
    </EffectComposer>
  )
}
