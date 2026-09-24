import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import boundaryData from '../../data/logo_boundaries.json'

/**
 * Boundary3DEagleLogo Component
 * =============================
 * Renders ONLY the 3D boundary outline of the soaring Eagle.
 * - Glowing Eagle Outline Particles & Animated Wave Lines
 * - Interactive Mouse Parallax & Scroll Elevation
 */
export default function Boundary3DEagleLogo({ mousePosition, scrollProgress }) {
  const groupRef = useRef()
  const eaglePointsRef = useRef()
  const eagleLinesRef = useRef()

  const { eagle } = boundaryData

  // Prepare Eagle Boundary Geometry & Colors
  const eagleData = useMemo(() => {
    const count = eagle.length
    const pos = new Float32Array(count * 3)
    const origPos = new Float32Array(count * 3)
    const cols = new Float32Array(count * 3)

    const colorGold    = new THREE.Color('#EED79A')
    const colorCrimson = new THREE.Color('#EF4444')
    const colorAmber   = new THREE.Color('#F59E0B')
    const tempCol      = new THREE.Color()

    for (let i = 0; i < count; i++) {
      const [x, y, z] = eagle[i]
      pos[i * 3]     = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z

      origPos[i * 3]     = x
      origPos[i * 3 + 1] = y
      origPos[i * 3 + 2] = z

      const dist = Math.abs(x)

      // Unified Fire Particle Color Palette (matching body perfectly)
      if (dist < 0.5) {
        tempCol.copy(colorCrimson).lerp(colorGold, 0.4)
      } else {
        tempCol.copy(colorAmber).lerp(colorCrimson, (dist - 0.5) / 2.0)
      }

      cols[i * 3]     = tempCol.r
      cols[i * 3 + 1] = tempCol.g
      cols[i * 3 + 2] = tempCol.b
    }

    // Connect nearby boundary points with crisp laser wireframe lines
    const linePositions = []
    const step = 5
    for (let i = 0; i < count; i += step) {
      const x1 = eagle[i][0]
      const y1 = eagle[i][1]
      const z1 = eagle[i][2]

      for (let j = i + step; j < Math.min(i + step * 3, count); j += step) {
        const x2 = eagle[j][0]
        const y2 = eagle[j][1]
        const z2 = eagle[j][2]
        const dist = Math.hypot(x2 - x1, y2 - y1, z2 - z1)

        if (dist < 0.35) {
          linePositions.push(x1, y1, z1, x2, y2, z2)
        }
      }
    }

    return {
      positions: pos,
      originalPositions: origPos,
      colors: cols,
      linePositions: new Float32Array(linePositions),
      count,
    }
  }, [eagle])

  // Particle Glow Texture
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
    grad.addColorStop(0.35, 'rgba(245, 158, 11, 0.9)')
    grad.addColorStop(0.7, 'rgba(239, 68, 68, 0.45)')
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 64, 64)
    return new THREE.CanvasTexture(canvas)
  }, [])

  // Animation Loop — Full-Page Scroll Motion
  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // Parallax mouse rotation & scroll factor
    const targetRotX = (mousePosition?.current?.y ?? 0) * 0.35
    const targetRotY = (mousePosition?.current?.x ?? 0) * 0.45
    const scrollFactor = scrollProgress?.current ?? 0

    if (groupRef.current) {
      // Rotate 3D eagle smoothly as user scrolls top to bottom
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX + Math.sin(scrollFactor * Math.PI) * 0.2,
        0.05
      )
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY + time * 0.12 + scrollFactor * Math.PI * 1.8,
        0.05
      )

      // Swoop across screen width and depth as page scrolls
      const targetX = 0.65 - Math.sin(scrollFactor * Math.PI) * 1.2
      const targetY = Math.sin(time * 1.5) * 0.15 + (0.1 - scrollFactor * 0.5)
      const targetZ = -0.2 + Math.sin(scrollFactor * Math.PI * 2) * 0.4

      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05)
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05)
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.05)
    }

    // Animate Eagle Wings Boundary Wave
    if (eaglePointsRef.current) {
      const geom = eaglePointsRef.current.geometry
      const posAttr = geom.attributes.position
      const arr = posAttr.array

      for (let i = 0; i < eagleData.count; i++) {
        const ox = eagleData.originalPositions[i * 3]
        const oy = eagleData.originalPositions[i * 3 + 1]
        const oz = eagleData.originalPositions[i * 3 + 2]

        const dist = Math.abs(ox)
        const wave = Math.sin(time * 2.8 - dist * 1.4) * (dist * 0.12)
        const pulseZ = Math.cos(time * 2.0 + ox * 2) * 0.05

        arr[i * 3 + 1] = oy + wave
        arr[i * 3 + 2] = oz + pulseZ
      }

      posAttr.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef} position={[0.7, -0.1, -0.2]} scale={[2.15, 2.15, 2.15]}>
      {/* 1. Eagle 3D Boundary Points */}
      <points ref={eaglePointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[eagleData.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[eagleData.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.085}
          vertexColors={true}
          map={particleTexture}
          transparent={true}
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 2. Eagle Boundary Laser Wireframe Lines */}
      <lineSegments ref={eagleLinesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[eagleData.linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#EF4444"
          transparent={true}
          opacity={0.45}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  )
}
