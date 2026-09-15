import { Suspense, Component } from 'react'
import { Canvas } from '@react-three/fiber'
import HeroScene from './scenes/HeroScene'
import { useMousePosition } from '../hooks/useMousePosition'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { useReducedMotion } from '../hooks/useReducedMotion'
import './HeroCanvas.css'

/**
 * WebGL Error Boundary
 * ====================
 * If the 3D scene throws (WebGL unsupported, driver issue, etc.),
 * show the CSS fallback rather than crashing the entire page.
 */
class HeroErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <div className="hero-canvas__fallback" aria-hidden="true" />
    }
    return this.props.children
  }
}

/**
 * HeroCanvas
 * ==========
 * The outermost wrapper for the 3D hero experience.
 *
 * Responsibilities:
 * - Detect device capabilities and apply fallback
 * - Wire mouse position and scroll progress to the scene
 * - Manage the Canvas lifecycle with proper cleanup
 * - Provide error boundary around the WebGL context
 */
export default function HeroCanvas() {
  const mousePosition  = useMousePosition()
  const scrollProgress = useScrollProgress()
  const prefersReducedMotion = useReducedMotion()

  const isMobile     = window.innerWidth < 768
  const enableBloom  = !isMobile

  // If user prefers reduced motion: show static CSS gradient fallback
  if (prefersReducedMotion) {
    return <div className="hero-canvas__fallback hero-canvas__fallback--reduced" aria-hidden="true" />
  }

  return (
    <div className="hero-canvas" aria-hidden="true">
      <HeroErrorBoundary>
        <Suspense fallback={<div className="hero-canvas__fallback" />}>
          <Canvas
            camera={{ position: [0, 0, 5.5], fov: 62, near: 0.1, far: 100 }}
            dpr={[1, isMobile ? 1 : 1.5]}
            performance={{ min: 0.5 }}
            gl={{
              antialias: false,
              alpha: true,
              powerPreference: 'high-performance',
            }}
          >
            <HeroScene
              mousePosition={mousePosition}
              scrollProgress={scrollProgress}
              enableBloom={enableBloom}
            />
          </Canvas>
        </Suspense>
      </HeroErrorBoundary>
    </div>
  )
}
