import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import eaglePoints from '../../data/eagle_points.json'

/**
 * Eagle3DLogo Component
 * =====================
 * Renders the JIIT Youth Club logo as a 3D background centerpiece.
 * - 3D Particle Cloud mapped to the soaring eagle silhouette
 * - Dynamic wing flap & floating wave animation
 * - Glowing 3D Emblem Disc with the official logo texture
 * - Energy connection lines between key particle nodes
 */
export default function Eagle3DLogo({ mousePosition, scrollProgress }) {
  const pointsRef = useRef()
  const emblemRef = useRef()
  const ringRef = useRef()
  const linesRef = useRef()
  const groupRef = useRef()

  // Load official logo texture for the floating 3D emblem disc
  const logoTexture = useTexture('/logo.png')

  // Prepare particle positions, colors, and initial offsets
  const { positions, colors, originalPositions, linePositions } = useMemo(() => {
    const numPoints = eaglePoints.length
    const pos = new Float32Array(numPoints * 3)
    const origPos = new Float32Array(numPoints * 3)
    const cols = new Float32Array(numPoints * 3)

    // Palette: Gold (#EED79A), Crimson (#8B1E1E), Flame Red (#DC2626), Bright Yellow (#FBBF24)
    const colorPrimary   = new THREE.Color('#EED79A')
    const colorCrimson   = new THREE.Color('#9E1B1B')
    const colorGold      = new THREE.Color('#F59E0B')
    const colorFlame     = new THREE.Color('#EF4444')

    const tempColor = new THREE.Color()

    for (let i = 0; i < numPoints; i++) {
      const [x, y, z] = eaglePoints[i]

      pos[i * 3]     = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z

      origPos[i * 3]     = x
      origPos[i * 3 + 1] = y
      origPos[i * 3 + 2] = z

      // Color variation based on Y height (wings vs body vs tail)
      const heightRatio = (y + 2.5) / 5
      const distFromCenter = Math.abs(x)

      if (distFromCenter < 0.6) {
        // Head / Body - vibrant gold & crimson
        tempColor.copy(colorCrimson).lerp(colorPrimary, 0.4 + Math.random() * 0.4)
      } else if (heightRatio > 0.5) {
        // Wing tips - glowing flame & gold
        tempColor.copy(colorFlame).lerp(colorGold, Math.random())
      } else {
        // Lower wings & tail - deep crimson gold
        tempColor.copy(colorCrimson).lerp(colorGold, 0.3)
      }

      cols[i * 3]     = tempColor.r
      cols[i * 3 + 1] = tempColor.g
      cols[i * 3 + 2] = tempColor.b
    }

    // Build energy constellation lines between nearby wing particles
    const lineCoords = []
    const step = 8 // Sample subset for performance
    for (let i = 0; i < numPoints; i += step) {
      const x1 = eaglePoints[i][0]
      const y1 = eaglePoints[i][1]
      const z1 = eaglePoints[i][2]

      for (let j = i + step; j < Math.min(i + step * 4, numPoints); j += step) {
        const x2 = eaglePoints[j][0]
        const y2 = eaglePoints[j][1]
        const z2 = eaglePoints[j][2]

        const dist = Math.hypot(x2 - x1, y2 - y1, z2 - z1)
        if (dist < 0.45) {
          lineCoords.push(x1, y1, z1, x2, y2, z2)
        }
      }
    }

    return {
      positions: pos,
      originalPositions: origPos,
      colors: cols,
      linePositions: new Float32Array(lineCoords),
    }
  }, [])

  // Create custom circle particle texture for soft glowing points
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.3, 'rgba(245, 158, 11, 0.8)')
    gradient.addColorStop(0.7, 'rgba(158, 27, 27, 0.3)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 64, 64)
    return new THREE.CanvasTexture(canvas)
  }, [])

  // Animation Loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // Smooth Mouse Parallax
    const targetRotX = (mousePosition?.current?.y ?? 0) * 0.35
    const targetRotY = (mousePosition?.current?.x ?? 0) * 0.45

    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY + time * 0.12, 0.05)

      // Scroll effect: scale and push back slightly as user scrolls
      const scrollFactor = scrollProgress?.current ?? 0
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, -scrollFactor * 2, 0.05)
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, Math.sin(time * 1.5) * 0.15 + scrollFactor * 0.5, 0.05)
    }

    // Animate Eagle Wings (Wave Flap effect along X axis)
    if (pointsRef.current) {
      const geom = pointsRef.current.geometry
      const posAttr = geom.attributes.position
      const array = posAttr.array

      for (let i = 0; i < eaglePoints.length; i++) {
        const ox = originalPositions[i * 3]
        const oy = originalPositions[i * 3 + 1]
        const oz = originalPositions[i * 3 + 2]

        const distFromCenter = Math.abs(ox)
        // Wing flapping wave
        const wave = Math.sin(time * 2.5 - distFromCenter * 1.2) * (distFromCenter * 0.12)
        const breathe = Math.sin(time * 1.8 + oy) * 0.04

        array[i * 3 + 1] = oy + wave + breathe
        array[i * 3 + 2] = oz + Math.cos(time * 2 + distFromCenter) * 0.05
      }

      posAttr.needsUpdate = true
    }

    // Rotate 3D Outer Energy Ring
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.2
      ringRef.current.rotation.x = Math.sin(time * 0.5) * 0.15
    }

    // Subtle breathing scale on central emblem disc
    if (emblemRef.current) {
      const pulse = 1 + Math.sin(time * 2) * 0.02
      emblemRef.current.scale.set(pulse * 2.8, pulse * 2.8, pulse * 2.8)
    }
  })

  return (
    <group ref={groupRef} position={[0.8, 0.1, -0.6]}>
      {/* 1. Central 3D Textured Logo Emblem Disc */}
      <mesh ref={emblemRef} position={[0, 0, -0.6]}>
        <circleGeometry args={[1, 64]} />
        <meshStandardMaterial
          map={logoTexture}
          transparent={true}
          opacity={0.58}
          roughness={0.2}
          metalness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 2. Outer Glowing Golden Ring */}
      <group ref={ringRef} position={[0, 0, -0.7]}>
        <mesh>
          <ringGeometry args={[2.85, 2.92, 96]} />
          <meshBasicMaterial color="#EED79A" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
        <mesh>
          <ringGeometry args={[2.98, 3.01, 96]} />
          <meshBasicMaterial color="#9E1B1B" transparent opacity={0.35} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* 3. 3D Eagle Particle System */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          vertexColors={true}
          map={particleTexture}
          transparent={true}
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 4. Energy Constellation Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#F59E0B"
          transparent={true}
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  )
}
