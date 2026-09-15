import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * ParticleLattice
 * ===============
 * The core hero 3D scene — a glowing knowledge network.
 *
 * Nodes:          glowing particles placed in a sphere volume
 * Connections:    thin lines between nearby nodes
 * Assembly:       on load, nodes rush from random offsets to their final positions
 * Mouse parallax: camera rotates subtly toward the cursor
 * Breathing:      slow positional drift on each node, making the lattice feel alive
 */
export default function ParticleLattice({ mousePosition, scrollProgress }) {
  const { camera } = useThree()
  const pointsRef = useRef()
  const linesRef = useRef()
  const initRef = useRef({ time: 0, assembled: false })

  // Number of nodes — reduced on mobile
  const isMobile = window.innerWidth < 768
  const COUNT = isMobile ? 80 : 180
  const CONNECTION_DIST = isMobile ? 1.0 : 1.4
  const SPHERE_RADIUS = 3.2

  // Generate node positions on a sphere + randomized interior
  const { nodePositions, linePositions, originalPositions, startPositions } = useMemo(() => {
    const nodePos = new Float32Array(COUNT * 3)
    const origPos = new Float32Array(COUNT * 3)
    const startPos = new Float32Array(COUNT * 3)

    // Place nodes randomly within a sphere
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos((Math.random() * 2) - 1)
      const r     = Math.cbrt(Math.random()) * SPHERE_RADIUS // cube-root for uniform sphere distribution

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)

      origPos[i * 3]     = x
      origPos[i * 3 + 1] = y
      origPos[i * 3 + 2] = z

      nodePos[i * 3]     = x
      nodePos[i * 3 + 1] = y
      nodePos[i * 3 + 2] = z

      // Assembly start positions: scattered far from final position
      startPos[i * 3]     = (Math.random() - 0.5) * 16
      startPos[i * 3 + 1] = (Math.random() - 0.5) * 16
      startPos[i * 3 + 2] = (Math.random() - 0.5) * 16
    }

    // Build connection line segments
    const lineArr = []
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = origPos[i * 3]     - origPos[j * 3]
        const dy = origPos[i * 3 + 1] - origPos[j * 3 + 1]
        const dz = origPos[i * 3 + 2] - origPos[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < CONNECTION_DIST) {
          // Push both endpoints
          lineArr.push(
            origPos[i * 3], origPos[i * 3 + 1], origPos[i * 3 + 2],
            origPos[j * 3], origPos[j * 3 + 1], origPos[j * 3 + 2]
          )
        }
      }
    }

    return {
      nodePositions:   nodePos,
      linePositions:   new Float32Array(lineArr),
      originalPositions: origPos,
      startPositions:  startPos,
    }
  }, [COUNT, CONNECTION_DIST])

  // Dispose geometries on unmount
  useEffect(() => {
    return () => {
      pointsRef.current?.geometry?.dispose()
      linesRef.current?.geometry?.dispose()
    }
  }, [])

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime()
    initRef.current.time = elapsed

    // ── Assembly animation (first 1.8s) ────────────────────────────────
    const ASSEMBLE_DURATION = 1.8
    const progress = Math.min(elapsed / ASSEMBLE_DURATION, 1)
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3)

    // ── Breathing offset ────────────────────────────────────────────────
    // Very subtle per-node drift using noise-like offsets from sine waves
    const positions = pointsRef.current?.geometry?.attributes?.position
    if (positions) {
      for (let i = 0; i < COUNT; i++) {
        const ox = originalPositions[i * 3]
        const oy = originalPositions[i * 3 + 1]
        const oz = originalPositions[i * 3 + 2]

        const sx = startPositions[i * 3]
        const sy = startPositions[i * 3 + 1]
        const sz = startPositions[i * 3 + 2]

        // Assembled position with subtle breathing
        const breathX = Math.sin(elapsed * 0.3 + i * 0.5) * 0.03
        const breathY = Math.cos(elapsed * 0.2 + i * 0.7) * 0.03
        const breathZ = Math.sin(elapsed * 0.25 + i * 0.9) * 0.02

        positions.array[i * 3]     = sx + (ox + breathX - sx) * eased
        positions.array[i * 3 + 1] = sy + (oy + breathY - sy) * eased
        positions.array[i * 3 + 2] = sz + (oz + breathZ - sz) * eased
      }
      positions.needsUpdate = true
    }

    // ── Camera mouse parallax ───────────────────────────────────────────
    if (mousePosition) {
      camera.rotation.y = THREE.MathUtils.lerp(
        camera.rotation.y,
        mousePosition.x * 0.12,
        0.025
      )
      camera.rotation.x = THREE.MathUtils.lerp(
        camera.rotation.x,
        mousePosition.y * 0.07,
        0.025
      )
    }

    // ── Scroll fade (whole group) ───────────────────────────────────────
    if (pointsRef.current && linesRef.current) {
      // Fade out as user scrolls past the hero (first 30% of page scroll)
      const scrollFade = Math.max(0, 1 - scrollProgress * 4)
      pointsRef.current.material.opacity = scrollFade * 0.9
      linesRef.current.material.opacity  = scrollFade * 0.18
    }
  })

  return (
    <group>
      {/* Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
            count={COUNT}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#6C63FF"
          size={isMobile ? 0.05 : 0.04}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </points>

      {/* Connection lines */}
      {linePositions.length > 0 && (
        <lineSegments ref={linesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[linePositions, 3]}
              count={linePositions.length / 3}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#6C63FF"
            transparent
            opacity={0.18}
            depthWrite={false}
          />
        </lineSegments>
      )}
    </group>
  )
}
