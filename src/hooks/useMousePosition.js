import { useState, useEffect, useRef } from 'react'

/**
 * useMousePosition
 * ================
 * Returns normalized mouse position in the range [-1, 1]
 * for both X and Y axes. Used to drive 3D camera parallax.
 *
 * @returns {{ x: number, y: number }}
 */
export function useMousePosition() {
  const positionRef = useRef({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let rafId

    const onMouseMove = (e) => {
      // Normalize to [-1, 1]
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -((e.clientY / window.innerHeight) * 2 - 1)

      positionRef.current = { x, y }

      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        setPosition({ ...positionRef.current })
      })
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return position
}
