import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * AmbientParticles
 * ================
 * Background floating micro-particles for atmospheric depth.
 * Separate from the lattice — these drift slowly and fade on scroll.
 */
export default function AmbientParticles({ scrollProgress }) {
  const ref = useRef()
  const isMobile = window.innerWidth < 768
  const COUNT = isMobile ? 400 : 1200

  const { positions, speeds, colors } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    const spd = new Float32Array(COUNT * 3)
    const cols = new Float32Array(COUNT * 3)

    const colorGold  = new THREE.Color('#EED79A')
    const colorCyan  = new THREE.Color('#00D4FF')
    const colorWhite = new THREE.Color('#FFFFFF')
    const colorAmber = new THREE.Color('#F59E0B')
    const tempCol    = new THREE.Color()

    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 22
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12

      spd[i * 3]     = (Math.random() - 0.5) * 0.003
      spd[i * 3 + 1] = (Math.random() - 0.5) * 0.004
      spd[i * 3 + 2] = (Math.random() - 0.5) * 0.002

      const rand = Math.random()
      if (rand < 0.4) tempCol.copy(colorWhite)
      else if (rand < 0.7) tempCol.copy(colorGold)
      else if (rand < 0.9) tempCol.copy(colorAmber)
      else tempCol.copy(colorCyan)

      cols[i * 3]     = tempCol.r
      cols[i * 3 + 1] = tempCol.g
      cols[i * 3 + 2] = tempCol.b
    }

    return { positions: pos, speeds: spd, colors: cols }
  }, [COUNT])

  useEffect(() => {
    return () => ref.current?.geometry?.dispose()
  }, [])

  useFrame((state) => {
    const pos = ref.current?.geometry?.attributes?.position
    if (!pos) return
    const time = state.clock.getElapsedTime()

    for (let i = 0; i < COUNT; i++) {
      pos.array[i * 3]     += speeds[i * 3]
      pos.array[i * 3 + 1] += speeds[i * 3 + 1]
      pos.array[i * 3 + 2] += speeds[i * 3 + 2]

      // Wrap around boundary for infinite space floating
      if (Math.abs(pos.array[i * 3])     > 11) pos.array[i * 3]     *= -0.95
      if (Math.abs(pos.array[i * 3 + 1]) > 10) pos.array[i * 3 + 1] *= -0.95
      if (Math.abs(pos.array[i * 3 + 2]) > 6)  pos.array[i * 3 + 2] *= -0.95
    }

    pos.needsUpdate = true

    if (ref.current) {
      // Twinkling pulse without scroll fadeout
      ref.current.material.opacity = 0.55 + Math.sin(time * 2.0) * 0.15
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={COUNT}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={COUNT}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.032}
        vertexColors={true}
        sizeAttenuation
        transparent
        opacity={0.65}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
