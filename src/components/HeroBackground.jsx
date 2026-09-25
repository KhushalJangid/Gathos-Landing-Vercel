import { useRef, useEffect } from 'react'

// Interactive AI-feel background for the hero. Two layers:
//
//   1. A soft animated gradient mesh (CSS) that drifts behind everything
//      and tints the cream surface with subtle matcha + ube hues.
//
//   2. A canvas constellation of "neuron" particles. Each particle
//      drifts slowly; nearby particles are connected by hairline strokes
//      whose opacity drops with distance. The mouse becomes a node too —
//      lines connect from cursor to nearby particles, so it reads as
//      "your thought talking to the network".
//
// Reads as AI/neural without being a stock-graphic cliche. Respects
// prefers-reduced-motion (renders one static frame and stops).
export default function HeroBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf
    let particles = []
    let mouse = { x: -9999, y: -9999, active: false }
    let width = 0
    let height = 0

    // Constants — tuned for laptop screens.
    const DENSITY = 0.00009       // particles per pixel; ~80 on a 1440x720 canvas
    const MAX_PARTICLES = 110
    const LINK_DISTANCE = 130     // px — particles within this distance connect
    const MOUSE_LINK_DISTANCE = 180
    const SPEED = 0.18            // base drift speed

    function fit() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width  = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const target = Math.min(MAX_PARTICLES, Math.max(40, Math.floor(width * height * DENSITY)))
      // Re-spawn particles whenever size changes so density stays even.
      particles = Array.from({ length: target }, () => spawn())
    }

    function spawn() {
      const angle = Math.random() * Math.PI * 2
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * SPEED * (0.5 + Math.random()),
        vy: Math.sin(angle) * SPEED * (0.5 + Math.random()),
        r: 1 + Math.random() * 1.4,
        // Slight hue variation per particle — most are matcha, a few ube
        // and dragonfruit. Stored as the final rgba string so we don't
        // recompute per frame.
        color: pickColor(),
      }
    }

    function pickColor() {
      const roll = Math.random()
      if (roll < 0.7)  return 'rgba(2, 73, 42, 0.55)'    // matcha (primary)
      if (roll < 0.88) return 'rgba(107, 79, 143, 0.55)' // ube
      return 'rgba(193, 75, 122, 0.55)'                  // dragonfruit
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)

      // Update + draw particles
      for (const p of particles) {
        // Slight mouse repulsion — makes the network feel responsive
        // without making it feel like a game.
        if (mouse.active) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < 9000) {
            const d = Math.sqrt(d2) || 1
            const force = (1 - d / 95) * 0.6
            p.vx += (dx / d) * force * 0.12
            p.vy += (dy / d) * force * 0.12
          }
        }

        // Damping
        p.vx *= 0.985
        p.vy *= 0.985
        // Maintain a baseline drift so the field never goes still
        const sp = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (sp < SPEED * 0.6) {
          const a = Math.random() * Math.PI * 2
          p.vx += Math.cos(a) * 0.03
          p.vy += Math.sin(a) * 0.03
        }

        p.x += p.vx
        p.y += p.vy

        // Wrap around edges so particles stay in view
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      }

      // Particle-to-particle links
      ctx.lineWidth = 0.6
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 > LINK_DISTANCE * LINK_DISTANCE) continue
          const d = Math.sqrt(d2)
          const alpha = (1 - d / LINK_DISTANCE) * 0.22
          ctx.strokeStyle = `rgba(2, 73, 42, ${alpha})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      // Mouse-to-particle links — stronger and matcha-tinted so the
      // cursor feels like the source.
      if (mouse.active) {
        for (const p of particles) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 > MOUSE_LINK_DISTANCE * MOUSE_LINK_DISTANCE) continue
          const d = Math.sqrt(d2)
          const alpha = (1 - d / MOUSE_LINK_DISTANCE) * 0.5
          ctx.strokeStyle = `rgba(2, 73, 42, ${alpha})`
          ctx.lineWidth = 0.9
          ctx.beginPath()
          ctx.moveTo(mouse.x, mouse.y)
          ctx.lineTo(p.x, p.y)
          ctx.stroke()
        }
        // Cursor node itself
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(2, 73, 42, 0.85)'
        ctx.fill()
      }

      if (!reduceMotion) raf = requestAnimationFrame(draw)
    }

    fit()
    if (!reduceMotion) raf = requestAnimationFrame(draw)
    else draw() // render one frame

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = mouse.x >= 0 && mouse.x <= width && mouse.y >= 0 && mouse.y <= height
    }
    const onLeave = () => { mouse.active = false }
    const onResize = () => fit()

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Slow drifting gradient mesh behind the network — gives the
          cream surface a faint colour temperature shift without ever
          feeling like a flat background. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 18% 28%, rgba(2,73,42,0.10) 0%, transparent 60%),' +
            'radial-gradient(50% 45% at 85% 18%, rgba(107,79,143,0.08) 0%, transparent 65%),' +
            'radial-gradient(55% 50% at 72% 90%, rgba(193,75,122,0.07) 0%, transparent 65%),' +
            'radial-gradient(40% 40% at 12% 88%, rgba(226,200,74,0.07) 0%, transparent 65%)',
          animation: 'hero-mesh 28s ease-in-out infinite alternate',
        }}
      />
      <style>{`
        @keyframes hero-mesh {
          0%   { transform: translate(0,0) scale(1); }
          50%  { transform: translate(20px, -10px) scale(1.04); }
          100% { transform: translate(-15px, 12px) scale(1.02); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-hero-mesh] { animation: none !important; }
        }
      `}</style>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}
