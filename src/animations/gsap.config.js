import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugins once at app startup
gsap.registerPlugin(ScrollTrigger)

// Global GSAP defaults
gsap.defaults({
  ease: 'power3.out',
  duration: 0.7,
})

// Default ScrollTrigger settings
ScrollTrigger.config({
  ignoreMobileResize: true,
})

export { gsap, ScrollTrigger }

/**
 * revealOnScroll
 * ==============
 * Standard section/element reveal animation.
 * Elements start hidden (opacity:0, y:32px) and reveal on scroll.
 * Always add class 'reveal' to target elements in their initial state.
 *
 * @param {string|Element|Element[]} target — CSS selector or DOM element(s)
 * @param {object} options
 * @param {string} options.trigger — trigger element (defaults to first target)
 * @param {string} options.start — ScrollTrigger start (default: 'top 82%')
 * @param {number} options.stagger — stagger between elements (default: 0.1)
 * @param {number} options.duration — animation duration (default: 0.8)
 */
export function revealOnScroll(target, options = {}) {
  const {
    trigger,
    start = 'top 82%',
    stagger = 0.1,
    duration = 0.8,
    y = 32,
    delay = 0,
  } = options

  return gsap.fromTo(
    target,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: trigger ?? (Array.isArray(target) ? target[0] : target),
        start,
        once: true,
      },
    }
  )
}

/**
 * heroEntrance
 * ============
 * GSAP timeline for hero text staggered entrance.
 * Elements animate in from opacity 0 + y offset.
 *
 * @param {string[]} selectors — ordered list of CSS selectors
 * @param {object} options
 * @returns {gsap.core.Timeline}
 */
export function heroEntrance(selectors, options = {}) {
  const { delay = 0.6, stagger = 0.15 } = options

  const tl = gsap.timeline({ delay })

  selectors.forEach((selector, i) => {
    tl.fromTo(
      selector,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      i === 0 ? '>' : `-=${0.55 - stagger}`
    )
  })

  return tl
}

/**
 * killScrollTriggers
 * ==================
 * Clean up all ScrollTrigger instances.
 * Call in useEffect cleanup to prevent memory leaks on route change.
 */
export function killScrollTriggers() {
  ScrollTrigger.getAll().forEach((st) => st.kill())
}
