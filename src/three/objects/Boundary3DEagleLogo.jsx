import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import boundaryData from '../../data/logo_boundaries.json'

/**
 * Boundary3DEagleLogo Component
 * =============================
 * Renders the 3D boundary outline of the soaring Eagle.
 * - Glowing Eagle Outline Particles & Animated Wave Lines
 * - Interactive Mouse Parallax & Uniform Right-Side Position Across Scroll
 */
export default function Boundary3DEagleLogo({ mousePosition, scrollProgress }) {
  const groupRef = useRef()
  const eaglePointsRef = useRef()
  const eagleLinesRef = useRef()

  const { eagle } = boundaryData

  // Prepare Eagle Boundary Geometry & Original Fire Colors
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

      // Exact Original Fire Particle Color Palette
      if (dist < 0.5) {
        tempCol.copy(colorCrimson).lerp(colorGold, 0.4)
      } else {
        tempCol.copy(colorAmber).lerp(colorCrimson, (dist - 0.5) / 2.0)
      }

      cols[i * 3]     = tempCol.r
      cols[i * 3 + 1] = tempCol.g
      cols[i * 3 + 2] = tempCol.b
    }

    // Connect nearby boundary points into laser wireframe lines
    const lineIndices = []
    const grid = new Map()
    const cellSize = 0.16

    for (let i = 0; i < count; i++) {
      const [x, y, z] = eagle[i]
      const key = `${Math.floor(x / cellSize)},${Math.floor(y / cellSize)},${Math.floor(z / cellSize)}`
      if (!grid.has(key)) grid.set(key, [])
      grid.get(key).push({ idx: i, x, y, z })
    }

    const step = 6
    for (let i = 0; i < count; i += step) {
      const [x1, y1, z1] = eagle[i]
      const gx = Math.floor(x1 / cellSize)
      const gy = Math.floor(y1 / cellSize)
      const gz = Math.floor(z1 / cellSize)

      let conn = 0
      for (let dx = -1; dx <= 1 && conn < 1; dx++) {
        for (let dy = -1; dy <= 1 && conn < 1; dy++) {
          for (let dz = -1; dz <= 1 && conn < 1; dz++) {
            const cell = grid.get(`${gx + dx},${gy + dy},${gz + dz}`)
            if (!cell) continue
            for (const pt of cell) {
              if (pt.idx <= i) continue
              const d = Math.hypot(pt.x - x1, pt.y - y1, pt.z - z1)
              if (d > 0.05 && d < 0.15) {
                lineIndices.push(i, pt.idx)
                conn++
                break
              }
            }
          }
        }
      }
    }

    const linePositions = new Float32Array(lineIndices.length * 3)

    return {
      positions: pos,
      originalPositions: origPos,
      colors: cols,
      lineIndices,
      linePositions,
      count,
    }
  }, [eagle])

  // Particle Glow Texture — Authentic Fire Amber Glow
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

  // Animation Loop — Persistent Uniform Right-Side Positioning with Controlled Scroll Rotation
  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // Parallax mouse rotation & scroll factor
    const targetRotX = (mousePosition?.current?.y ?? 0) * 0.30
    const targetRotY = (mousePosition?.current?.x ?? 0) * 0.40
    const scrollFactor = scrollProgress?.current ?? 0

    if (groupRef.current) {
      // Gentle, elegant 3D tilt on scroll (keeps eagle facing forward on right side)
      const scrollRotX = Math.sin(scrollFactor * Math.PI * 0.5) * 0.18
      const scrollRotY = scrollFactor * 0.35

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX + scrollRotX + Math.sin(time * 0.5) * 0.04,
        0.05
      )
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY + scrollRotY + Math.sin(time * 0.8) * 0.10,
        0.05
      )

      // Lock Eagle to right column beside page text across ALL scroll positions
      const isDesktop = window.innerWidth >= 992
      const baseRightX = isDesktop ? 2.05 : 0.0
      const baseScale  = isDesktop ? 1.75 : 1.25
      const basePosY   = isDesktop ? -0.05 : -0.2

      const targetX = baseRightX + Math.sin(time * 0.7) * 0.05
      const targetY = basePosY + Math.sin(time * 1.1) * 0.08
      const targetZ = Math.sin(time * 0.9) * 0.06

      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05)
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05)
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.05)
      groupRef.current.scale.setScalar(baseScale)
    }

    // Animate Eagle Wings Boundary Wave
    if (eaglePointsRef.current) {
      const posAttr = eaglePointsRef.current.geometry.attributes.position
      const arr = posAttr.array

      for (let i = 0; i < eagleData.count; i++) {
        const ox = eagleData.originalPositions[i * 3]
        const oy = eagleData.originalPositions[i * 3 + 1]
        const oz = eagleData.originalPositions[i * 3 + 2]

        const dist = Math.abs(ox)
        const wave = Math.sin(time * 2.8 - dist * 1.4) * (dist * 0.12)
        const pulseZ = Math.cos(time * 2.0 + ox * 2) * 0.05

        arr[i * 3]     = ox
        arr[i * 3 + 1] = oy + wave
        arr[i * 3 + 2] = oz + pulseZ
      }
      posAttr.needsUpdate = true

      // Dynamically update laser wireframe lines to follow flapping particles
      if (eagleLinesRef.current && eagleData.lineIndices.length > 0) {
        const linePosAttr = eagleLinesRef.current.geometry.attributes.position
        const lineArr = linePosAttr.array
        const indices = eagleData.lineIndices

        for (let k = 0; k < indices.length; k += 2) {
          const idxA = indices[k]
          const idxB = indices[k + 1]

          lineArr[k * 3]     = arr[idxA * 3]
          lineArr[k * 3 + 1] = arr[idxA * 3 + 1]
          lineArr[k * 3 + 2] = arr[idxA * 3 + 2]

          lineArr[(k + 1) * 3]     = arr[idxB * 3]
          lineArr[(k + 1) * 3 + 1] = arr[idxB * 3 + 1]
          lineArr[(k + 1) * 3 + 2] = arr[idxB * 3 + 2]
        }
        linePosAttr.needsUpdate = true
      }
    }
  })

  return (
    <group ref={groupRef} position={[1.95, -0.05, 0]} scale={[1.8, 1.8, 1.8]}>
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
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  )
}

