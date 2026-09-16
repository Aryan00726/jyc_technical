import Boundary3DEagleLogo from '../objects/Boundary3DEagleLogo'
import AmbientParticles from '../objects/AmbientParticles'
import BloomEffect from '../effects/BloomEffect'

/**
 * HeroScene
 * =========
 * Composes the 3D hero scene featuring the JIIT Youth Club 3D Eagle & Text boundary animation.
 */
export default function HeroScene({ mousePosition, scrollProgress, enableBloom }) {
  return (
    <>
      {/* Lights — Warm Gold & Crimson Accent Lighting */}
      <ambientLight intensity={0.8} color="#FFF8E7" />
      <pointLight
        position={[4, 5, 4]}
        color="#F59E0B"
        intensity={3.5}
        distance={14}
      />
      <pointLight
        position={[-5, -3, 2]}
        color="#EF4444"
        intensity={3.0}
        distance={12}
      />
      <directionalLight
        position={[0, 2, 5]}
        intensity={1.2}
        color="#FFFFFF"
      />

      {/* Core 3D Eagle & Text Boundary Outline Object */}
      <Boundary3DEagleLogo
        mousePosition={mousePosition}
        scrollProgress={scrollProgress}
      />

      {/* Atmospheric background particles */}
      <AmbientParticles scrollProgress={scrollProgress} />

      {/* Post-processing — Bloom glow */}
      <BloomEffect enabled={enableBloom} />
    </>
  )
}
