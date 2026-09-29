import { API_URL } from '../lib/urls.js'
import { useRef, useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SectionHeader from './SectionHeader'
import RevealOnScroll from './RevealOnScroll'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// Tabbed code snippets — switching mode rewrites the example so
// visitors see the exact contract for image / image-to-image / tts / video. Typewriter
// effect runs once on viewport enter, then loops every 9 seconds with
// a soft erase+retype if the tab is still active.
const CODE_SAMPLES = {
  image: `import requests

# Generate an image. No credits. No meter.
r = requests.post(
  "${API_URL}/api/v1/image-generation",
  headers={"Authorization": f"Bearer {api_key}"},
  json={
    "prompt": "Neon-lit Tokyo alley at midnight",
    "width": 1024,
    "height": 1280
  }
)
job_id = r.json()["job_id"]`,
  image2image: `import requests

# Creator image-to-image. Upload source image to R2 first.
r = requests.post(
  "${API_URL}/api/image2image",
  headers={"X-API-Key": i2i_key},
  json={
    "prompt": "Change the carrier color to dark blue only",
    "image1_path": uploaded_r2_url,
    "width": 896,
    "height": 1152,
    "steps": 8,
    "guidance": 1.5
  }
)
job_id = r.json()["job_id"]`,
  tts: `import requests

# TTS with zero-shot voice cloning.
r = requests.post(
  "${API_URL}/api/v1/tts",
  headers={"Authorization": f"Bearer {tts_key}"},
  json={
    "text": "Welcome back to the channel.",
    "voice": "Sia",   # custom clone uploaded earlier
    "language": "hi"
  }
)`,
  video: `import requests

# Creator: text + image → video with synced audio.
r = requests.post(
  "${API_URL}/api/v1/video-generation",
  headers={"Authorization": f"Bearer {creator_key}"},
  json={
    "run_id": "campaign-2026-08-06",
    "scene_id": "shoe-001",
    "prompt": "Viral shoe ad, sneakers walk out of frame",
    "mode": "ti2av",
    "image_url": "https://example.com/sneaker.png",
    "num_frames": 241
  }
)`,
}

function CodeTabs() {
  const [tab, setTab] = useState('image')
  const [text, setText] = useState('')
  const containerRef = useRef(null)
  const startedRef = useRef(false)

  // Type out the active sample. Triggered on viewport enter (first
  // time) and whenever the tab changes thereafter.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const target = CODE_SAMPLES[tab] || ''
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(target)
      return
    }

    let cancelled = false
    let i = 0
    const speed = 8 // ms per character

    function type() {
      if (cancelled) return
      if (i <= target.length) {
        setText(target.slice(0, i))
        i++
        setTimeout(type, speed)
      }
    }

    // First entry — wait for viewport visibility. Subsequent tab
    // changes start immediately so the user gets feedback on click.
    if (!startedRef.current) {
      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => { startedRef.current = true; type() },
      })
      return () => { cancelled = true; trigger.kill() }
    }
    type()
    return () => { cancelled = true }
  }, [tab])

  const tabs = [
    { key: 'image',       label: 'image-generation', accent: 'matcha-300' },
    { key: 'image2image', label: 'image-to-image',   accent: 'lavender' },
    { key: 'tts',         label: 'tts',              accent: 'cyan' },
    { key: 'video',       label: 'video-generation', accent: 'ube-300' },
  ]

  return (
    <div ref={containerRef} className="rounded-[28px] code-dark overflow-hidden border-2 border-black">
      <div className="flex items-center gap-1 px-5 py-3 border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 font-mono text-xs text-warm-silver">generate.py</span>
        <div className="ml-auto flex gap-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              data-cursor="magnet"
              className={`px-2.5 py-1 rounded-md font-mono text-[0.65rem] transition-colors ${
                tab === t.key
                  ? 'bg-white/15 text-white'
                  : 'text-warm-silver hover:text-white/80'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <pre className="p-6 font-mono text-[0.82rem] leading-[1.8] text-[#e8e8e8] whitespace-pre overflow-x-auto min-h-[260px]">
        {text}
        <span className="inline-block w-[0.5ch] h-[1em] align-baseline ml-0.5 bg-matcha-300 animate-pulse" />
      </pre>
    </div>
  )
}

const apis = [
  {
    swatch: 'matcha',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" />
      </svg>
    ),
    title: 'Image API',
    desc: 'Pixel-perfect images with text that actually reads, built for posters, ads, UI mockups, slides, thumbnails and diagrams.',
    features: [
      'Spelling-exact long text inside generated visuals',
      'Brand layouts, product mockups and editorial styles',
      'Transparent PNG, custom sizes and batch workflows',
      'Async job API with queue ETA and stable JSON responses',
      'Flat-rate usage for agent pipelines',
    ],
  },
  {
    swatch: 'lavender',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 8h.01M12 8h.01M16 8h.01" /><path d="M7 16l3-3 2 2 3-4 2 5" />
      </svg>
    ),
    title: 'Image-to-Image API',
    desc: 'Creator image editing for agents that need to alter source images, combine references, restyle assets and preserve continuity.',
    features: [
      'Edit existing product, character, scene and campaign images',
      'Upload source images to R2, then pass image1_path to the API',
      'Combine references and keep important visual details intact',
      'Dedicated i2i_live keys and Creator-plan access control',
      'Async job polling with hosted result.image_url outputs',
    ],
  },
  {
    swatch: 'slushie',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    ),
    title: 'Voice API',
    desc: 'Zero-shot voice cloning from a short sample, plus natural text-to-speech across 600+ languages and accents.',
    features: [
      'Clone from a short reference sample',
      '600+ languages and accents supported',
      'Streaming-friendly TTS for agents and apps',
      'Upload once, call the voice by name',
      'Consistent narration for long-form pipelines',
    ],
  },
  {
    swatch: 'ube',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 8-6 4 6 4V8Z" />
        <rect x="2" y="6" width="14" height="12" rx="2" />
        <path d="M6 10h4M6 14h2" />
      </svg>
    ),
    title: 'Video API',
    desc: 'Text-to-video and image-to-video for short clips, with styles, generated audio controls and agent-ready polling.',
    features: [
      'Text-to-video and image-to-video request modes',
      'Generated audio on by default, optional video-only output',
      'Friendly styles including Anime, Cinematic, Ghibli and Wool',
      'Queue ETA, status polling and hosted video URLs',
      'Creator includes Pro image and voice access',
    ],
  },
]

const swatchStyles = {
  matcha:   { iconBg: 'bg-matcha-300/40 text-matcha-800', bullet: 'bg-matcha-600' },
  lavender: { iconBg: 'bg-lavender text-ube-800', bullet: 'bg-ube-800' },
  slushie:  { iconBg: 'bg-slushie-500/20 text-slushie-800', bullet: 'bg-slushie-500' },
  ube:      { iconBg: 'bg-ube-300/35 text-ube-800', bullet: 'bg-ube-800' },
}

function ApiCard({ api }) {
  const s = swatchStyles[api.swatch]
  return (
    <div className="h-full p-7 rounded-[28px] bg-white border-2 border-black/90">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${s.iconBg}`}>
        {api.icon}
      </div>
      <h3 className="text-[1.1rem] font-semibold mb-2 text-black tracking-[-0.01em]">{api.title}</h3>
      <p className="text-[0.92rem] text-warm-charcoal leading-[1.6] mb-5">{api.desc}</p>
      <ul className="space-y-2">
        {api.features.map((f) => (
          <li key={f} className="flex items-center gap-2.5 text-[0.85rem] text-warm-charcoal">
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.bullet}`} />
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}

function CodeExample() {
  return (
    <div className="rounded-[28px] code-dark overflow-hidden border-2 border-black">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 font-mono text-xs text-warm-silver">generate.py</span>
      </div>
      <pre className="p-6 overflow-x-auto font-mono text-[0.82rem] leading-[1.8] text-[#e8e8e8] whitespace-pre">
<span className="syn-kw">import</span> requests
{'\n\n'}
<span className="syn-cm"># Generate an image. No credits. No meter.</span>
{'\n'}
response = requests.<span className="syn-fn">post</span>(
{'\n    '}
<span className="syn-str">"{API_URL}/api/v1/image-generation"</span>,
{'\n    '}
headers={'{'}<span className="syn-str">"Authorization"</span>: <span className="syn-str">f"Bearer </span><span className="syn-var">{'{api_key}'}</span><span className="syn-str">"</span>{'}'},
{'\n    '}
json={'{'}
{'\n        '}
<span className="syn-str">"prompt"</span>: <span className="syn-str">"Neon-lit Tokyo alley at midnight, rain-soaked pavement"</span>,
{'\n        '}
<span className="syn-str">"width"</span>: <span className="syn-var">1344</span>,
{'\n        '}
<span className="syn-str">"height"</span>: <span className="syn-var">768</span>
{'\n    '}
{'}'}
{'\n'}
)
{'\n\n'}
job_id = response.<span className="syn-fn">json</span>()[<span className="syn-str">"job_id"</span>]
{'\n'}
<span className="syn-cm"># Poll for result. Ready in seconds.</span>
{'\n\n'}
<span className="syn-cm"># Image-to-image and Creator video use the same async job shape.</span>
{'\n'}
video = requests.<span className="syn-fn">post</span>(
{'\n    '}
<span className="syn-str">"{API_URL}/api/v1/video-generation"</span>,
{'\n    '}
headers={'{'}<span className="syn-str">"Authorization"</span>: <span className="syn-str">f"Bearer </span><span className="syn-var">{'{creator_key}'}</span><span className="syn-str">"</span>{'}'},
{'\n    '}
json={'{'}<span className="syn-str">"run_id"</span>: <span className="syn-str">"demo-run"</span>, <span className="syn-str">"scene_id"</span>: <span className="syn-str">"intro"</span>, <span className="syn-str">"prompt"</span>: <span className="syn-str">"A founder demoing an AI API, warm studio light"</span>{'}'}
{'\n'}
)
      </pre>
    </div>
  )
}

export default function Features() {
  return (
    <section id="apis" className="pt-12 pb-20 md:pt-16 md:pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          center
          eyebrow="The Platform"
          title={<>Four endpoints.<br/><span className="italic text-matcha-800">One creative workflow.</span></>}
          subtitle="Image generation, Creator image-to-image editing, TTS voice cloning, and Creator video with generated audio. Simple async REST endpoints your agent can call directly."
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16 max-w-7xl mx-auto">
          {apis.map((a, i) => (
            <RevealOnScroll key={a.title} delay={i * 0.06}>
              <ApiCard api={a} />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.1}>
          <CodeTabs />
        </RevealOnScroll>
      </div>
    </section>
  )
}
