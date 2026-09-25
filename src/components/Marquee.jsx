import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP)

/**
 * Infinite horizontal marquee — GSAP powered.
 * Renders multiple identical item sets and translates by one exact set width.
 * This avoids the empty-gap/stopped look on wide screens when one item set is
 * shorter than the viewport.
 *
 * `speed` = pixels per second (higher is faster).
 */
export default function Marquee({ children, speed = 40, className = '', itemClassName = '', fadeClassName = 'from-cream' }) {
  const trackRef = useRef(null)
  const rootRef = useRef(null)
  const items = Array.isArray(children) ? children : [children]
  const copyCount = 8

  useGSAP(
    () => {
      const track = trackRef.current
      if (!track) return

      const firstSet = track.querySelector('[data-marquee-set]')
      const setWidth = firstSet?.offsetWidth || 0
      if (!setWidth) return

      const absSpeed = Math.max(1, Math.abs(speed))
      const duration = setWidth / absSpeed
      const reverse = speed < 0

      gsap.set(track, { x: reverse ? -setWidth : 0 })

      const tween = gsap.to(track, {
        x: reverse ? 0 : -setWidth,
        duration,
        ease: 'none',
        repeat: -1,
        force3D: true,
      })

      return () => {
        tween.kill()
      }
    },
    { scope: rootRef }
  )

  return (
    <div ref={rootRef} className={`relative overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex will-change-transform" style={{ width: 'max-content' }}>
        {Array.from({ length: copyCount }).map((_, copyIndex) => (
          <div key={copyIndex} data-marquee-set className="flex shrink-0 gap-3 pr-3">
            {items.map((child, itemIndex) => (
              <span key={`${copyIndex}-${itemIndex}`} className={itemClassName}>{child}</span>
            ))}
          </div>
        ))}
      </div>
      <div className={`absolute left-0 top-0 bottom-0 w-20 pointer-events-none bg-gradient-to-r ${fadeClassName} to-transparent`} />
      <div className={`absolute right-0 top-0 bottom-0 w-20 pointer-events-none bg-gradient-to-l ${fadeClassName} to-transparent`} />
    </div>
  )
}
