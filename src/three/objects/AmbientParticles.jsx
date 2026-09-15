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
  const COUNT = isMobile ? 120 : 400

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    const spd = new Float32Array(COUNT * 3)

    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8

      spd[i * 3]     = (Math.random() - 0.5) * 0.002
      spd[i * 3 + 1] = (Math.random() - 0.5) * 0.003
      spd[i * 3 + 2] = (Math.random() - 0.5) * 0.001
    }

    return { positions: pos, speeds: spd }
  }, [COUNT])

  useEffect(() => {
    return () => ref.current?.geometry?.dispose()
  }, [])

  useFrame(() => {
    const pos = ref.current?.geometry?.attributes?.position
    if (!pos) return

    for (let i = 0; i < COUNT; i++) {
      pos.array[i * 3]     += speeds[i * 3]
      pos.array[i * 3 + 1] += speeds[i * 3 + 1]
      pos.array[i * 3 + 2] += speeds[i * 3 + 2]

      // Wrap around boundary
      if (Math.abs(pos.array[i * 3])     > 6)  pos.array[i * 3]     *= -0.9
      if (Math.abs(pos.array[i * 3 + 1]) > 5)  pos.array[i * 3 + 1] *= -0.9
      if (Math.abs(pos.array[i * 3 + 2]) > 4)  pos.array[i * 3 + 2] *= -0.9
    }

    pos.needsUpdate = true

    if (ref.current) {
      const scrollFade = Math.max(0, 1 - scrollProgress * 4)
      ref.current.material.opacity = scrollFade * 0.35
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
      </bufferGeometry>
      <pointsMaterial
        color="#00D4FF"
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </points>
  )
}
