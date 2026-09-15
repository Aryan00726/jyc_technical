import { useState, useEffect } from 'react'

/**
 * useReducedMotion
 * ================
 * Returns true if the user prefers reduced motion.
 * Use this to skip GSAP timelines and 3D animation.
 *
 * @returns {boolean}
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e) => setPrefersReducedMotion(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return prefersReducedMotion
}
