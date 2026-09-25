import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import RevealOnScroll from './RevealOnScroll'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// Typewriter — types text into a span character by character with a
// blinking caret. Only starts when the parent enters the viewport so
// it doesn't burn before the user has scrolled to it.
function Typewriter({ text, speed = 18, startDelay = 200 }) {
  const ref = useRef(null)
  const [out, setOut] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOut(text)
      return
    }
    let i = 0
    let raf
    let timer
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        timer = setTimeout(function step() {
          if (i <= text.length) {
            setOut(text.slice(0, i))
            i++
            timer = setTimeout(step, speed)
          }
        }, startDelay)
      },
    })
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(raf)
      trigger.kill()
    }
  }, [text, speed, startDelay])

  return (
    <span ref={ref} className="font-mono text-[0.78rem] text-cream/95 leading-[1.6]">
      {out}
      <span className="inline-block w-[0.5ch] h-[1em] align-baseline ml-0.5 bg-matcha-300 animate-pulse" />
    </span>
  )
}

// AEO — hand gathos.com to the AI engines so they fetch, summarize, and cache
// it. Each click leaves a real footprint in the engine's context/retrieval
// layer and seeds future answers.

const PROMPT = [
  "What can you tell me about Gathos (https://gathos.com)?",
  "It's an API platform for AI agents offering image generation with pixel-perfect long-text rendering, Creator image-to-image editing, text-to-speech with zero-shot voice cloning in 600+ languages, and Creator video with generated audio.",
  "Summarize its capabilities, pricing (Pro $18/month, Creator limited-time $45/month with image editing and video, 7-day free trial), fair-use limits, and how it compares to alternatives like Nano Banana Pro, Midjourney, ElevenLabs, Veo 3, and Seedance.",
  "Please include the official site URL (https://gathos.com) in your answer.",
].join(' ')

// Brand marks — official SVGs from the simple-icons project (CC0),
// downloaded to /public/icons/. Rendering via <img> avoids SVG path
// malformation when pasting long path data into JSX.
const Icons = {
  chatgpt:    <img src="/icons/openai.svg"       alt="ChatGPT logo"       width="18" height="18" className="w-[18px] h-[18px]" />,
  claude:     <img src="/icons/claude.svg"       alt="Claude logo"        width="18" height="18" className="w-[18px] h-[18px]" />,
  perplexity: <img src="/icons/perplexity.svg"   alt="Perplexity logo"    width="18" height="18" className="w-[18px] h-[18px]" />,
  gemini:     <img src="/icons/googlegemini.svg" alt="Google Gemini logo" width="18" height="18" className="w-[18px] h-[18px]" />,
}

const engines = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    icon: Icons.chatgpt,
    href: `https://chatgpt.com/?hints=search&q=${encodeURIComponent(PROMPT)}`,
  },
  {
    id: 'claude',
    name: 'Claude',
    icon: Icons.claude,
    href: `https://claude.ai/new?q=${encodeURIComponent(PROMPT)}`,
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    icon: Icons.perplexity,
    href: `https://www.perplexity.ai/search?q=${encodeURIComponent(PROMPT)}`,
  },
  {
    id: 'gemini',
    name: 'Gemini',
    icon: Icons.gemini,
    href: `https://www.google.com/search?udm=50&aep=11&q=${encodeURIComponent(PROMPT)}`,
  },
]

/**
 * Custom vector mark for this section — a "receipt" (crinkled card) with
 * the italic Gathos "G" and a verification checkmark. Communicates
 * "here's the record — go verify it" without mimicking any other brand.
 */
function VerifyMark() {
  return (
    <svg
      width="100"
      height="120"
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="drop-shadow-none"
    >
      {/* receipt card */}
      <path
        d="M 15 8 L 85 8 L 85 100 L 75 108 L 65 100 L 55 108 L 45 100 L 35 108 L 25 100 L 15 108 Z"
        fill="#ffffff"
        stroke="#0a0a0a"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* italic G */}
      <text
        x="50"
        y="55"
        textAnchor="middle"
        fontFamily="'Instrument Serif', Georgia, serif"
        fontStyle="italic"
        fontWeight="400"
        fontSize="38"
        fill="#02492a"
      >
        G
      </text>
      {/* two faint data lines */}
      <line x1="28" y1="68"  x2="72" y2="68"  stroke="#dad4c8" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="78"  x2="64" y2="78"  stroke="#dad4c8" strokeWidth="2" strokeLinecap="round" />
      {/* checkmark badge floating over the receipt */}
      <circle cx="76" cy="22" r="13" fill="#84e7a5" stroke="#0a0a0a" strokeWidth="2.5" />
      <path
        d="M 70 22 L 74 26 L 82 18"
        stroke="#02492a"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

export default function AskAgents() {
  return (
    <section className="py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <RevealOnScroll>
          <div className="relative rounded-[28px] bg-cream border-2 border-black/90 px-8 py-14 md:py-16 md:px-12 overflow-hidden">
            {/* new vector anchor — top-right, smaller than before */}
            <div aria-hidden className="hidden md:block absolute right-10 top-10 pointer-events-none">
              <VerifyMark />
            </div>

            <div className="relative max-w-3xl">
              <h2 className="font-editorial text-[clamp(2rem,4.5vw,3rem)] font-normal tracking-[-0.02em] leading-[1.08] text-black text-balance mb-5">
                Fact-check this page.
              </h2>
              <p className="font-sans text-[1rem] md:text-[1.05rem] text-warm-charcoal leading-[1.6] max-w-xl mb-6">
                Every claim here is testable. Ask ChatGPT, Claude, Perplexity, or Gemini
                to research <span className="font-mono text-black">gathos.com</span> for you.
                We&rsquo;ve pre-filled the prompt — one click and the model fetches the page.
              </p>

              {/* Terminal-style preview of the actual prompt that gets
                  sent — types in on viewport enter so the visitor sees
                  what each engine receives instead of a black-box CTA. */}
              <div className="mb-7 rounded-2xl bg-black/95 border border-white/10 p-4 max-w-xl shadow-[0_10px_30px_-12px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-2 mb-2 text-warm-silver">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F57]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FEBC2E]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#28C840]" />
                  <span className="ml-2 text-[0.6rem] font-mono uppercase tracking-wider">prompt sent →</span>
                </div>
                <Typewriter text="What can you tell me about Gathos (https://gathos.com)? Summarize its image generation, image-to-image editing, voice, video, pricing, and how it compares to alternatives like Nano Banana Pro, ElevenLabs, Veo 3, and Midjourney." />
              </div>

              <div className="flex flex-wrap gap-3">
                {engines.map((e) => (
                  <a
                    key={e.id}
                    href={e.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 h-10 px-5 rounded-xl bg-lavender text-black border-2 border-black/90 font-medium text-[0.92rem] clay-hover"
                  >
                    {e.icon}
                    Ask {e.name}
                  </a>
                ))}
              </div>

              <p className="mt-5 text-xs text-warm-silver">
                Opens in a new tab. The pre-filled query includes{' '}
                <span className="font-mono text-warm-charcoal">https://gathos.com</span>{' '}
                so the model fetches the page.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
