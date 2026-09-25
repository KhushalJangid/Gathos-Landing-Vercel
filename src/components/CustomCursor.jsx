import { useEffect, useRef, useState } from 'react'

// Custom cursor that morphs over interactive zones:
//   default          → tiny matcha dot following the mouse
//   over a CTA       → larger filled circle + magnetic pull on the target
//   over a video tile → "play" symbol
//   over arrow nav    → chevron
//
// Magnetic pull is implemented by reading data-cursor attributes on the
// hovered element and applying a transform to the target itself, not to
// the cursor. The cursor stays at the real pointer position.
//
// Disabled entirely on touch devices (where there's no cursor to morph)
// and for users who prefer reduced motion.
export default function CustomCursor() {
  const cursorRef = useRef(null)
  const labelRef = useRef(null)
  const [variant, setVariant] = useState('default')
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    // Skip on touch devices and when reduced-motion preferred.
    const isTouch = matchMedia('(pointer: coarse)').matches
    const isReduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || isReduced) return

    const cursor = cursorRef.current
    if (!cursor) return

    let raf
    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let magneticTarget = null

    function onMove(e) {
      mouseX = e.clientX
      mouseY = e.clientY
      if (hidden) setHidden(false)

      // Magnetic pull: if the cursor is within 60px of a magnetic
      // target's center, translate the target toward the cursor.
      if (magneticTarget) {
        const r = magneticTarget.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dx = (mouseX - cx) * 0.25
        const dy = (mouseY - cy) * 0.25
        magneticTarget.style.transform = `translate(${dx}px, ${dy}px)`
      }
    }

    function onOver(e) {
      // Find the closest interactive ancestor with a data-cursor attr.
      const target = e.target.closest('[data-cursor]')
      if (!target) return
      const next = target.dataset.cursor
      setVariant(next)
      if (next === 'magnet') {
        magneticTarget = target
      }
    }

    function onOut(e) {
      const target = e.target.closest('[data-cursor]')
      if (!target) return
      // Reset magnetic target position on leave.
      if (magneticTarget === target) {
        magneticTarget.style.transform = ''
        magneticTarget = null
      }
      // Bail if moving into a child element with the same attr.
      const related = e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('[data-cursor]')
      if (related === target) return
      setVariant('default')
    }

    function tick() {
      // Lerp cursor position toward mouse for a tiny smoothing — 0.18
      // is the snappy-but-not-twitchy sweet spot.
      cursorX += (mouseX - cursorX) * 0.22
      cursorY += (mouseY - cursorY) * 0.22
      cursor.style.transform = `translate3d(${cursorX - 12}px, ${cursorY - 12}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
    }
  }, [hidden])

  // Size + content variants. Wrapper handles the transform; inner
  // .cursor-inner handles size/colour transitions so the wrapper
  // position update stays snappy.
  const variants = {
    default: { size: 8,  bg: '#02492a', mix: 'difference', label: '' },
    magnet:  { size: 28, bg: '#02492a', mix: 'difference', label: '' },
    play:    { size: 48, bg: '#ffffff', mix: 'normal',     label: '▶' },
    drag:    { size: 40, bg: '#ffffff', mix: 'normal',     label: '◅ ▻' },
  }
  const v = variants[variant] || variants.default

  return (
    <div
      ref={cursorRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block"
      style={{ width: 24, height: 24, opacity: hidden ? 0 : 1, transition: 'opacity 0.2s' }}
    >
      <div
        ref={labelRef}
        className="rounded-full flex items-center justify-center text-white font-mono text-[0.65rem]"
        style={{
          width: v.size,
          height: v.size,
          background: v.bg,
          mixBlendMode: v.mix,
          margin: `${(24 - v.size) / 2}px auto`,
          transition: 'width 0.22s cubic-bezier(0.32,0.72,0,1), height 0.22s cubic-bezier(0.32,0.72,0,1), background 0.22s',
        }}
      >
        {v.label}
      </div>
    </div>
  )
}
