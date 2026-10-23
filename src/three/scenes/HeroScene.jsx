import Boundary3DEagleLogo from '../objects/Boundary3DEagleLogo'
import BloomEffect from '../effects/BloomEffect'

/**
 * HeroScene
 * =========
 * Composes the 3D hero scene featuring the JIIT Youth Club 3D Eagle & Text boundary animation.
 */
export default function HeroScene({ mousePosition, scrollProgress, enableBloom, isDark = true }) {
  return (
    <>
      {/* Lights — Adaptive Lighting */}
      <ambientLight intensity={isDark ? 0.8 : 1.2} color={isDark ? '#FFF8E7' : '#FFFFFF'} />
      <pointLight
        position={[4, 5, 4]}
        color={isDark ? '#F59E0B' : '#C28220'}
        intensity={isDark ? 3.5 : 2.5}
        distance={14}
      />
      <pointLight
        position={[-5, -3, 2]}
        color={isDark ? '#EF4444' : '#7F1E1D'}
        intensity={isDark ? 3.0 : 2.0}
        distance={12}
      />
      <directionalLight
        position={[0, 2, 5]}
        intensity={isDark ? 1.2 : 1.6}
        color={isDark ? '#FFFFFF' : '#FAF7EE'}
      />

      {/* Core 3D Eagle Outline Object */}
      <Boundary3DEagleLogo
        mousePosition={mousePosition}
        scrollProgress={scrollProgress}
        isDark={isDark}
      />

      {/* Post-processing — Bloom glow (active in dark mode) */}
      <BloomEffect enabled={enableBloom} />
    </>
  )
}
