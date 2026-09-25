import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Marquee from './Marquee'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const STATS = [
  { value: 600, suffix: '+', label: 'Languages and accents', sub: 'Natural TTS and voice cloning coverage' },
  { value: 99, suffix: '%', label: 'Readable text accuracy', sub: 'Built for posters, slides, ads and UI assets' },
  { value: 1200000, suffix: '+', label: 'Assets shipped', sub: 'Across agent-led creative pipelines' },
  { value: 40, suffix: '+', label: 'Output formats', sub: 'Images, voice, video styles and sizes' },
]

const AGENTS = ['Claude Code', 'Cursor', 'Windsurf', 'Gemini CLI', 'Replit', 'n8n', 'Raycast', 'Zapier', 'OpenClaw', 'Aider']

function formatValue(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
  return Math.round(n).toString()
}

function CountUp({ value, suffix }) {
  const elRef = useRef(null)
  const [display, setDisplay] = useState('0')

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setDisplay(formatValue(value))
        return
      }

      const obj = { n: 0 }
      ScrollTrigger.create({
        trigger: elRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            n: value,
            duration: 1.8,
            ease: 'power3.out',
            onUpdate: () => setDisplay(formatValue(obj.n)),
          })
        },
      })
    },
    { scope: elRef }
  )

  return (
    <span ref={elRef} className="tabular-nums">
      {display}
      <span className="text-matcha-800">{suffix}</span>
    </span>
  )
}

export default function TrustBar() {
  return (
    <section className="relative overflow-hidden border-y border-dashed border-oat bg-cream/60">
      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-14 grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 md:gap-7">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="mb-3 font-editorial text-[clamp(3.1rem,8vw,5.8rem)] italic leading-none tracking-[-0.035em] text-black">
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <div className="label-clay mb-1 text-warm-silver">{s.label}</div>
              <div className="mx-auto max-w-[210px] text-[0.78rem] leading-snug text-warm-charcoal/70">
                {s.sub}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-dashed border-oat pt-8">
          <div className="label-clay mb-4 text-center text-warm-silver">Trusted by agents builders run every day</div>
          <Marquee speed={45} itemClassName="font-mono px-4 py-2 rounded-lg bg-white border border-dashed border-oat text-[0.78rem] text-warm-charcoal whitespace-nowrap">
            {AGENTS}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
