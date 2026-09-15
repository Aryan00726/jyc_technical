import { useState, useEffect } from 'react'

/**
 * useScrollProgress
 * =================
 * Returns a value in [0, 1] representing scroll progress
 * through the entire document. Useful for driving 3D transitions.
 *
 * @returns {number} progress — 0 at top, 1 at bottom
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let rafId

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement
        const scrollable = scrollHeight - clientHeight
        setProgress(scrollable > 0 ? scrollTop / scrollable : 0)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return progress
}

/**
 * useElementScrollProgress
 * ========================
 * Returns [0, 1] scroll progress relative to a specific element.
 * 0 = element top at viewport bottom, 1 = element bottom at viewport top.
 *
 * @param {React.RefObject} ref
 * @returns {number}
 */
export function useElementScrollProgress(ref) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let rafId

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const vh = window.innerHeight
        const start = vh
        const end = -rect.height
        const current = rect.top
        const p = Math.max(0, Math.min(1, (start - current) / (start - end)))
        setProgress(p)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [ref])

  return progress
}
