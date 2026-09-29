import { DASHBOARD_URL } from '../lib/urls.js'
import { assetUrl, usecaseAsset } from '../lib/assets.js'
import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Button from './Button'
import HeroBackground from './HeroBackground'

gsap.registerPlugin(useGSAP)

const AGENT_ROWS = [
  {
    direction: 'agent-marquee-left',
    duration: 46,
    items: [
      { name: 'Perplexity', img: '/icons/perplexity.svg', color: '#20808d' },
      { name: 'Mistral', mark: 'M', color: '#ff7000' },
      { name: 'Claude', img: '/icons/claude.svg', color: '#cc785c' },
      { name: 'Cursor', mark: '◆', color: '#121212' },
      { name: 'Gemini', img: '/icons/googlegemini.svg', color: '#4285f4' },
      { name: 'Grok', mark: 'X', color: '#121212' },
      { name: 'ChatGPT', img: '/icons/openai.svg', color: '#121212' },
      { name: 'Lovable', mark: 'LV', color: '#ff4f8b' },
    ],
  },
  {
    direction: 'agent-marquee-right',
    duration: 54,
    items: [
      { name: 'n8n', mark: 'n8n', color: '#ea4b71' },
      { name: 'Windsurf', mark: 'W', color: '#0bab9b' },
      { name: 'GitHub Copilot', mark: 'GH', color: '#121212' },
      { name: 'Replit', mark: '▦', color: '#f26207' },
      { name: 'Vercel', mark: '▲', color: '#121212' },
      { name: 'Meta AI', mark: '∞', color: '#0084ff' },
      { name: 'Bolt', mark: 'B', color: '#f6c84c' },
      { name: 'Devin', mark: 'D', color: '#54c7ec' },
    ],
  },
  {
    direction: 'agent-marquee-left',
    duration: 62,
    items: [
      { name: 'Claude Code', mark: 'CC', color: '#cc785c' },
      { name: 'LangChain', mark: 'LC', color: '#1c8f5a' },
      { name: 'OpenAI', img: '/icons/openai.svg', color: '#121212' },
      { name: 'CrewAI', mark: 'CA', color: '#16a34a' },
      { name: 'Aider', mark: 'A', color: '#121212' },
      { name: 'Hugging Face', mark: 'HF', color: '#eab308' },
      { name: 'Zapier', mark: 'zap', color: '#ff4a00' },
      { name: 'Make', mark: 'M', color: '#8b2cff' },
    ],
  },
  {
    direction: 'agent-marquee-right',
    duration: 58,
    items: [
      { name: 'v0', mark: 'v0', color: '#121212' },
      { name: 'Cline', mark: 'CL', color: '#7c3aed' },
      { name: 'Roo Code', mark: 'RC', color: '#22c55e' },
      { name: 'Continue', mark: 'CN', color: '#2563eb' },
      { name: 'AutoGen', mark: 'AG', color: '#ef4444' },
      { name: 'LangGraph', mark: 'LG', color: '#0f9f6e' },
      { name: 'LlamaIndex', mark: 'LI', color: '#f97316' },
      { name: 'OpenRouter', mark: 'OR', color: '#7c3aed' },
    ],
  },
]

const EDGE_FADE = 'linear-gradient(90deg, transparent, #000 3%, #000 97%, transparent)'



const HERO_MODES = [
  {
    key: 'image',
    label: 'Image',
    endpoint: '/api/v1/image-generation',
    prompt: "generate a launch poster: 'Gathos 2.0 - now with sound'",
    title: 'Text that actually reads.',
    copy: 'Posters, ads, thumbnails, diagrams and product mockups with clean typography your agents can ship.',
    chip: '99% readable text',
    tint: 'bg-matcha-300/45 text-matcha-800',
  },
  {
    key: 'edit',
    label: 'Edit',
    endpoint: '/api/image2image',
    prompt: 'use this portrait as the avatar reference and generate a polished spokesperson frame',
    title: 'Consistent avatar frames.',
    copy: 'Creator image-to-image keeps a real face reference consistent as agents build avatar, spokesperson, and video-ready creative assets.',
    chip: 'Creator image-to-image',
    tint: 'bg-lavender text-ube-800',
  },
  {
    key: 'voice',
    label: 'Voice',
    endpoint: '/api/v1/tts',
    prompt: 'clone this voice, then say it in Japanese and Swahili',
    title: 'A voice layer for every agent.',
    copy: 'Zero-shot voice cloning from a short sample, with natural TTS across 600+ languages and accents.',
    chip: '600+ languages',
    tint: 'bg-slushie-500/20 text-slushie-800',
  },
  {
    key: 'video',
    label: 'Video',
    endpoint: '/api/v1/video-generation',
    prompt: '8s product reveal with matching ambient audio',
    title: 'Creator video in one call.',
    copy: 'Text-to-video and image-to-video workflows with styles, queue ETA, and optional generated audio.',
    chip: 'style + audio',
    tint: 'bg-ube-300/40 text-ube-800',
  },
]

const WAVE_BARS = Array.from({ length: 28 }, (_, i) => {
  const seed = Math.sin((i + 1) * 12.9898) * 43758.5453
  return 22 + (seed - Math.floor(seed)) * 64
})


function AgentLogoPill({ agent, tone = 'light' }) {
  const dark = tone === 'dark'
  const markColor = dark && agent.color === '#121212' ? '#f5f3ef' : agent.color || (dark ? '#f5f3ef' : '#1d1d1b')

  return (
    <span
      className={`inline-flex h-[58px] items-center gap-3 rounded-full border px-5 text-[1rem] font-semibold backdrop-blur-[3px] transition-colors md:h-16 md:px-7 md:text-[1.18rem] ${
        dark
          ? 'border-white/14 bg-white/[0.075] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:bg-white/[0.13]'
          : 'border-black/[0.07] bg-white/75 text-[#1d1d1b] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-white/90'
      }`}
    >
      <span className="flex h-7 min-w-7 shrink-0 items-center justify-center text-[1.05rem] font-extrabold leading-none md:text-[1.22rem]" style={{ color: markColor }}>
        {agent.img ? (
          <img
            src={assetUrl(agent.img)}
            alt=""
            aria-hidden="true"
            className={`h-6 w-6 object-contain ${dark ? 'invert' : ''}`}
            loading="lazy"
            decoding="async"
          />
        ) : agent.mark}
      </span>
      <span className="whitespace-nowrap">{agent.name}</span>
    </span>
  )
}

function AgentMarqueeRows({ tone }) {
  return (
    <div className="flex flex-col gap-4 md:gap-[26px]">
      {AGENT_ROWS.map((row, index) => (
        <div
          key={`${tone}-${index}`}
          className="relative h-[58px] overflow-hidden md:h-16"
          style={{ WebkitMaskImage: EDGE_FADE, maskImage: EDGE_FADE }}
        >
          <div
            className="inline-flex w-max gap-[14px] pl-[14px] will-change-transform md:gap-[18px] md:pl-[18px]"
            style={{ animation: `${row.direction} ${row.duration}s linear infinite` }}
          >
            {[...row.items, ...row.items].map((agent, itemIndex) => (
              <AgentLogoPill key={`${agent.name}-${itemIndex}`} agent={agent} tone={tone} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function AgentLogoWall() {
  return (
    <div className="hero-marq relative left-1/2 mt-14 w-screen -translate-x-1/2 overflow-hidden rounded-[34px] border border-white/10 bg-[#171717] px-0 py-8 shadow-[0_28px_70px_-48px_rgba(0,0,0,0.75)] md:py-10">
      <style>{`
        @keyframes agent-marquee-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes agent-marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#151515_0%,#222_50%,#151515_100%)]" />
        <div className="absolute left-[-12%] top-[-35%] h-[270px] w-[420px] rounded-full bg-matcha-300/10 blur-3xl" />
        <div className="absolute bottom-[-40%] right-[-10%] h-[300px] w-[460px] rounded-full bg-lavender/14 blur-3xl" />
        <div className="absolute inset-x-8 top-[86px] h-px bg-white/10" />
      </div>

      <div className="relative z-[3] mb-7 text-center font-mono text-[0.72rem] font-bold uppercase tracking-[0.28em] text-white md:text-[0.82rem]">
        Works with every agent
      </div>

      <div className="relative z-[2]">
        <AgentMarqueeRows tone="dark" />
      </div>
    </div>
  )
}


function SplitChars({ children, className = '' }) {
  const words = String(children).split(/(\s+)/)
  let charIdx = 0
  return (
    <>
      {words.map((w, wi) => {
        if (/^\s+$/.test(w)) return <span key={`s${wi}`}>{w}</span>
        return (
          <span key={`w${wi}`} className="inline-block whitespace-nowrap">
            {Array.from(w).map((ch) => (
              <span
                key={`c${charIdx++}`}
                className={`hero-char inline-block ${className}`}
                style={{ willChange: 'transform, opacity' }}
              >
                {ch}
              </span>
            ))}
          </span>
        )
      })}
    </>
  )
}

function Waveform({ dark = false }) {
  return (
    <div className="flex h-16 flex-1 items-center gap-[5px]">
      {WAVE_BARS.map((h, i) => (
        <span
          key={i}
          className={`flex-1 origin-center rounded-full ${dark ? 'bg-white/75' : 'bg-black/60'}`}
          style={{
            height: `${h}%`,
            animation: `hero-bar ${0.72 + (i % 5) * 0.13}s ease-in-out ${i * 0.04}s infinite alternate`,
          }}
        />
      ))}
    </div>
  )
}

function ProductPreview({ mode }) {
  if (mode.key === 'edit') {
    return (
      <div className="grid min-h-[390px] gap-4 rounded-[26px] border-2 border-black bg-white p-4 text-left shadow-[0_18px_50px_-34px_rgba(0,0,0,0.45)] sm:grid-cols-2">
        <div className="relative overflow-hidden rounded-[20px] bg-cream">
          <img
            src={usecaseAsset('face-voice-video/before-portrait.webp')}
            alt="Source portrait input for the Gathos avatar spokesperson workflow"
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-black">source portrait</div>
          <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/92 px-4 py-3 backdrop-blur">
            <div className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-warm-silver">uploaded reference</div>
            <div className="text-sm font-semibold text-black">Face identity locked</div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[20px] bg-black">
          <img
            src={usecaseAsset('face-voice-video/final-poster.jpg')}
            alt="First frame of the generated Gathos avatar spokesperson video"
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
          <div className="absolute left-4 top-4 rounded-full bg-matcha-300 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-matcha-800">first frame</div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="font-editorial text-[1.8rem] italic leading-none">Generated frame</div>
            <div className="mt-1 text-xs text-white/72">same face reference carried into the final video</div>
          </div>
        </div>
      </div>
    )
  }

  if (mode.key === 'voice') {
    return (
      <div className="flex min-h-[390px] flex-col justify-between rounded-[26px] border-2 border-black bg-white p-6 text-left shadow-[0_18px_50px_-34px_rgba(0,0,0,0.45)]">
        <div>
          <div className="mb-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M6 4l14 8-14 8z" /></svg>
              </span>
              <div>
                <div className="text-base font-semibold text-black">Sia - multilingual clone</div>
                <div className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-warm-silver">zero-shot voice</div>
              </div>
            </div>
            <span className="rounded-full bg-lavender px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-black">live</span>
          </div>
          <p className="mb-7 font-editorial text-[1.55rem] italic leading-tight text-black/80">
            "Your voice, carried into every language."
          </p>
          <Waveform />
        </div>
        <div className="mt-8 grid grid-cols-3 gap-2">
          {['Hindi', 'Swahili', 'Japanese'].map((lang) => (
            <span key={lang} className="rounded-full border border-dashed border-oat bg-cream px-3 py-2 text-center text-xs font-medium text-warm-charcoal">
              {lang}
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (mode.key === 'video') {
    return (
      <div className="relative min-h-[390px] overflow-hidden rounded-[26px] border-2 border-black bg-black shadow-[0_18px_50px_-34px_rgba(0,0,0,0.45)]">
        <img
          src={assetUrl('/showcase/video/product-demo-creator-video-poster.jpg')}
          alt="Creator video preview poster"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-black/20" />
        <div className="absolute left-5 right-5 top-5 flex items-start justify-between gap-3">
          <div className="rounded-3xl bg-white/92 px-4 py-3 text-left text-black shadow-sm backdrop-blur">
            <div className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-warm-silver">video</div>
            <div className="font-editorial text-[1.75rem] italic leading-none">Creator video</div>
          </div>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-[0_16px_38px_-24px_rgba(0,0,0,0.7)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M6 4l14 8-14 8z" /></svg>
          </span>
        </div>
        <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2.5">
          {[
            ['style', 'Realistic'],
            ['frames', '121'],
            ['audio', 'on'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/15 bg-black/60 px-3 py-2 text-left text-white backdrop-blur">
              <div className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-white/55">{label}</div>
              <div className="truncate text-sm font-semibold">{value}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="grid min-h-[390px] gap-4 rounded-[26px] border-2 border-black bg-white p-4 text-left shadow-[0_18px_50px_-34px_rgba(0,0,0,0.45)] sm:grid-cols-[1fr_0.78fr]">
      <div className="relative overflow-hidden rounded-[20px] bg-black">
        <img
          src={assetUrl('/showcase/images/gathos-t2i-luxury-serum-square.webp')}
          alt="Text-to-image luxury skincare product campaign generated with Gathos"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
        <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-black">image</div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="font-editorial text-[1.8rem] italic leading-none">Text-to-image</div>
          <div className="mt-1 text-xs text-white/72">product ads, packaging, campaigns</div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {[
          ['long text', 'keeps headlines, prices, captions and labels legible'],
          ['batch ready', 'consistent visual systems across many generated assets'],
          ['agent native', 'async jobs with predictable JSON responses'],
        ].map(([label, value]) => (
          <div key={label} className="flex-1 rounded-[18px] border border-dashed border-oat bg-cream px-4 py-4">
            <div className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-warm-silver">{label}</div>
            <div className="mt-2 text-sm font-medium leading-snug text-black">{value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function HeroProductSurface() {
  const [active, setActive] = useState(0)
  const mode = HERO_MODES[active]

  useEffect(() => {
    const timer = setInterval(() => setActive((i) => (i + 1) % HERO_MODES.length), 8200)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="hero-demo mx-auto w-full max-w-6xl">
      <style>{`
        @keyframes hero-bar { from { transform: scaleY(0.42); } to { transform: scaleY(1); } }
      `}</style>
      <div className="rounded-[30px] border-2 border-black bg-[#f8f4ec] p-3 shadow-[0_24px_86px_-58px_rgba(0,0,0,0.65)] md:p-4">
        <div className="mb-3 flex flex-wrap items-center gap-3 px-1 md:px-2">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-dragonfruit-500" />
            <span className="h-3 w-3 rounded-full bg-lemon-400" />
            <span className="h-3 w-3 rounded-full bg-matcha-600" />
          </div>
          <div className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-warm-silver">creative API deck</div>
          <div className="ml-auto flex rounded-full border border-black/10 bg-white p-1">
            {HERO_MODES.map((item, i) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setActive(i)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${active === i ? 'bg-black text-white' : 'text-warm-charcoal hover:bg-cream'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch">
          <div className="rounded-[24px] border-2 border-black bg-white p-5 text-left md:p-6">
            <div className={`mb-5 inline-flex rounded-full px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] ${mode.tint}`}>
              {mode.chip}
            </div>
            <div className="mb-4 rounded-[18px] border border-dashed border-oat bg-cream p-4">
              <div className="mb-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-warm-silver">agent prompt</div>
              <p className="font-editorial text-[1.55rem] italic leading-tight text-black">{mode.prompt}</p>
            </div>
            <h3 className="mb-2 text-[1.15rem] font-semibold tracking-[-0.01em] text-black">{mode.title}</h3>
            <p className="mb-5 text-[0.92rem] leading-[1.6] text-warm-charcoal">{mode.copy}</p>
            <div className="rounded-[16px] bg-black px-4 py-3 text-left text-white">
              <div className="mb-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/50">request</div>
              <div className="truncate font-mono text-[0.76rem] text-white/90">POST {mode.endpoint}</div>
            </div>
          </div>

          <ProductPreview mode={mode} />
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const rootRef = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.hero-badge', { y: 12, opacity: 0, duration: 0.5 })
        .from(
          '.hero-char',
          {
            y: -36,
            rotateX: -90,
            opacity: 0,
            duration: 0.7,
            stagger: 0.018,
            ease: 'back.out(1.6)',
            transformOrigin: '50% 50% -20px',
          },
          '-=0.2'
        )
        .from('.hero-sub', { y: 12, opacity: 0, duration: 0.55 }, '-=0.6')
        .from('.hero-ctas', { y: 14, opacity: 0, duration: 0.55 }, '-=0.4')
        .from('.hero-demo', { y: 24, opacity: 0, scale: 0.975, duration: 0.72, ease: 'power3.out' }, '-=0.4')
        .from('.hero-marq', { opacity: 0, duration: 0.5 }, '-=0.3')
    },
    { scope: rootRef }
  )

  return (
    <section ref={rootRef} className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-32">
      <HeroBackground />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <div className="hero-badge mb-8 inline-flex items-center gap-2 rounded-pill border-2 border-black/90 bg-white px-4 py-1.5 text-xs font-medium text-warm-charcoal">
          <span className="h-1.5 w-1.5 rounded-full bg-ube-800" style={{ animation: 'pulse-dot 2s ease-in-out infinite' }} />
          Creator image editing + video APIs now live
        </div>

        <h1 className="mb-7 font-editorial text-[clamp(2.8rem,7.5vw,5.5rem)] font-normal leading-[1.02] tracking-[-0.025em] text-balance text-black">
          <span className="block"><SplitChars>Your agent's</SplitChars></span>
          <span className="block italic chromatic-breath"><SplitChars>creative engine.</SplitChars></span>
        </h1>

        <p className="hero-sub mx-auto mb-9 max-w-[680px] text-[1.05rem] leading-[1.55] text-warm-charcoal text-balance md:text-[1.15rem]">
          Image generation, image editing, voice, and video APIs <span className="font-medium text-black">built for AI agents.</span>
          <br className="hidden sm:block" />
          One platform. Four creative endpoints. Outputs your pipeline can ship.
        </p>

        <div className="hero-ctas mb-10 flex flex-wrap items-center justify-center gap-3">
          <Button href={(DASHBOARD_URL + "/login/")} variant="lavender" size="lg">
            Start free
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 5l7 7-7 7" /></svg>
          </Button>
          <Button href="#apis" variant="ghost" size="lg">
            See the APIs
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 5v14M5 12l7 7 7-7" /></svg>
          </Button>
        </div>

        <HeroProductSurface />
      </div>

      <AgentLogoWall />
    </section>
  )
}
