import ParticleLattice from '../objects/ParticleLattice'
import AmbientParticles from '../objects/AmbientParticles'
import BloomEffect from '../effects/BloomEffect'

/**
 * HeroScene
 * =========
 * Composes the complete 3D hero scene.
 * Receives mouse position and scroll progress from parent (HeroCanvas).
 *
 * Scene contains:
 *  - Minimal lighting
 *  - Knowledge Lattice (nodes + connections)
 *  - Ambient background particles
 *  - Bloom post-processing
 */
export default function HeroScene({ mousePosition, scrollProgress, enableBloom }) {
  return (
    <>
      {/* Lights — minimal. PointsMaterial is unlit but other materials may use them. */}
      <ambientLight intensity={0.3} />
      <pointLight
        position={[3, 4, 3]}
        color="#6C63FF"
        intensity={3}
        distance={10}
      />
      <pointLight
        position={[-4, -2, -2]}
        color="#00D4FF"
        intensity={1.5}
        distance={8}
      />

      {/* Core hero object */}
      <ParticleLattice
        mousePosition={mousePosition}
        scrollProgress={scrollProgress}
      />

      {/* Atmospheric background */}
      <AmbientParticles scrollProgress={scrollProgress} />

      {/* Post-processing — Bloom glow */}
      <BloomEffect enabled={enableBloom} />
    </>
  )
}
