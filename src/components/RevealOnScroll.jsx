import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Scroll-triggered fade-up reveal — GSAP edition.
 * Smoother orchestration than motion/react's intersection observer, and
 * scrub-friendly if we ever want scroll-linked variants.
 *
 * Uses ScrollTrigger with `once: true` so the animation fires once then frees.
 */
export default function RevealOnScroll({ children, delay = 0, className = '' }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      // Jakub's "materializing" recipe — opacity + translateY + blur,
      // mirroring the hero headline stagger so the whole page reveals with
      // one visual grammar.
      gsap.fromTo(
        el,
        { opacity: 0, y: 8, filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      )
    },
    { scope: ref, dependencies: [delay] }
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
