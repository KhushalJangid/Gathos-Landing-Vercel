import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SectionHeader from './SectionHeader'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const INSTALL_CMD = 'curl -sL https://gathos.com/install.sh | bash'

const SESSION = [
  { type: 'cmd',  text: '$ gathos init --agent claude-code' },
  { type: 'ok',   text: 'workspace linked · vid_live_BXVOVS1fSHerA1aNd1IdGMtAd0Mv7Rgr' },
  { type: 'gap'  },
  { type: 'cmd',  text: '$ gathos video.create \\' },
  { type: 'cont', text: '    --prompt "claymation launch reel, warm studio, crisp product UI" \\' },
  { type: 'cont', text: '    --style Clay --frames 121 --generate-audio true' },
  { type: 'api',  text: 'POST /api/v1/video-generation' },
  { type: 'json', text: '{ mode: "t2av", style: "Clay", num_frames: 121, generate_audio: true }' },
  { type: 'ok',   text: 'job_id   40fb4cf1-5cb4-4b91-92a0-2c816adfc757' },
  { type: 'gap'  },
  { type: 'cmd',  text: '$ gathos jobs.watch 40fb4cf1 --eta' },
  { type: 'wait', text: 'queued       position 1       eta about 60s' },
  { type: 'wait', text: 'processing   [####......]     42% · composing frames' },
  { type: 'wait', text: 'processing   [########..]     86% · mixing generated audio' },
  { type: 'ok',   text: 'completed    [##########]     100%' },
  { type: 'ok',   text: 'artifact     video/mp4 · 1280x736 · seed 11592765897146170322' },
]

const RESULT_STAGES = [
  { className: 'result-stage-queued', label: 'Queued', value: '1 ahead' },
  { className: 'result-stage-render', label: 'Rendering', value: 'frames + motion' },
  { className: 'result-stage-audio', label: 'Audio', value: 'generated' },
  { className: 'result-stage-done', label: 'Ready', value: 'video/mp4' },
]

function Line({ type, text }) {
  if (type === 'gap') return <div className="term-line h-2.5" aria-hidden />

  const colour =
    type === 'cmd'  ? 'text-cream'
    : type === 'cont' ? 'text-cream/70 pl-4'
    : type === 'api'  ? 'text-slushie-500'
    : type === 'json' ? 'text-ube-300'
    : type === 'ok'   ? 'text-matcha-300'
    : type === 'wait' ? 'text-lemon-400'
                      : 'text-cream/80'

  const prefix =
    type === 'ok'   ? <span className="text-matcha-300 mr-3 shrink-0">✓</span>
    : type === 'wait' ? <span className="text-lemon-400 mr-3 shrink-0">⏳</span>
    : type === 'api' ? <span className="text-slushie-500 mr-3 shrink-0">→</span>
    : null

  return (
    <div className={`term-line flex font-mono text-[0.76rem] sm:text-[0.82rem] leading-[1.58] ${colour}`}>
      {prefix}
      <span className="whitespace-pre-wrap break-words">{text}</span>
    </div>
  )
}

function ResultPanel() {
  return (
    <div className="result-preview h-full rounded-[22px] border border-white/10 bg-white/[0.04] p-3.5 md:p-4 flex flex-col">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div>
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-warm-silver">Live result</div>
          <div className="font-body text-sm font-semibold text-cream mt-0.5">Creator video job</div>
        </div>
        <span className="rounded-full bg-matcha-300/20 text-matcha-300 border border-matcha-300/30 px-2.5 py-1 font-mono text-[0.62rem] uppercase">
          t2av
        </span>
      </div>

      <div className="relative overflow-hidden rounded-[18px] border border-white/10 bg-black aspect-[16/9]">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/showcase/video/product-demo-creator-video-poster.jpg"
          alt="Creator video result preview"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/82 via-black/30 to-transparent">
          <div className="result-ready-overlay flex items-center justify-between gap-2 text-cream">
            <span className="font-mono text-[0.68rem] uppercase tracking-wide">output.mp4</span>
            <span className="font-mono text-[0.62rem] text-matcha-300">audio on · 121 frames</span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {RESULT_STAGES.map((stage) => (
          <div
            key={stage.label}
            className={`result-stage ${stage.className} rounded-xl border border-white/10 bg-black/30 p-3`}
          >
            <div className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-warm-silver">{stage.label}</div>
            <div className="mt-1 text-[0.72rem] leading-snug text-cream/85">{stage.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-full h-1.5 bg-white/10 overflow-hidden">
        <div className="result-progress-fill h-full w-full rounded-full bg-matcha-300" />
      </div>

      <div className="mt-4 rounded-xl bg-black/35 border border-white/10 p-3 text-left">
        <div className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-warm-silver mb-1">Prompt</div>
        <p className="font-editorial italic text-[0.92rem] leading-snug text-cream/90">
          Claymation launch reel, warm studio light, crisp product UI, gentle camera push-in.
        </p>
      </div>
    </div>
  )
}

export default function HowItWorks() {
  const sectionRef = useRef(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard?.writeText(INSTALL_CMD).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  useGSAP(
    () => {
      const lines = gsap.utils.toArray('.term-line')
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(lines, { opacity: 1, y: 0, filter: 'blur(0px)' })
        gsap.set('.result-preview', { opacity: 1, y: 0, filter: 'blur(0px)' })
        gsap.set('.result-stage', { opacity: 1 })
        gsap.set('.result-progress-fill', { scaleX: 1, transformOrigin: 'left center' })
        gsap.set('.result-ready-overlay', { opacity: 1, y: 0 })
        return
      }

      gsap.set(lines, { opacity: 0, y: 10, filter: 'blur(4px)' })
      gsap.set('.result-preview', { opacity: 0, y: 16, filter: 'blur(6px)' })
      gsap.set('.result-stage', { opacity: 0.36 })
      gsap.set('.result-progress-fill', { scaleX: 0, transformOrigin: 'left center' })
      gsap.set('.result-ready-overlay', { opacity: 0, y: 6 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.terminal-card',
          start: 'top 82%',
          end: 'top 24%',
          scrub: 0.42,
          invalidateOnRefresh: true,

        },
      })

      tl.to('.result-preview', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.46,
        ease: 'power2.out',
      }, 0)

      lines.forEach((line, index) => {
        tl.to(line, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.5,
          ease: 'power2.out',
        }, 0.08 + index * 0.105)
      })

      tl.to('.result-stage-queued', { opacity: 1, duration: 0.24 }, 0.18)
        .to('.result-progress-fill', { scaleX: 0.18, duration: 0.22, ease: 'power2.out' }, 0.2)
        .to('.result-stage-render', { opacity: 1, duration: 0.24 }, 0.78)
        .to('.result-progress-fill', { scaleX: 0.48, duration: 0.34, ease: 'power2.out' }, 0.8)
        .to('.result-stage-audio', { opacity: 1, duration: 0.24 }, 1.22)
        .to('.result-progress-fill', { scaleX: 0.86, duration: 0.36, ease: 'power2.out' }, 1.22)
        .to('.result-stage-done', { opacity: 1, duration: 0.24 }, 1.68)
        .to('.result-progress-fill', { scaleX: 1, duration: 0.34, ease: 'power2.out' }, 1.7)
        .to('.result-ready-overlay', { opacity: 1, y: 0, duration: 0.34, ease: 'power2.out' }, 1.76)
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="relative bg-cream py-20 md:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          center
          eyebrow="How it works"
          title={
            <>
              Watch the job move<br />
              <span className="italic text-matcha-800">from prompt to MP4.</span>
            </>
          }
          subtitle="A single agent-friendly API call submits the job, returns queue and ETA data, then resolves into a video file your workflow can use immediately."
        />

        <div className="terminal-card mt-12 rounded-[28px] overflow-hidden border-2 border-black bg-[#090909] shadow-[0_26px_80px_-36px_rgba(0,0,0,0.62)]">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-black/70">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-xs text-warm-silver">gathos · creator video session</span>
            <span className="ml-auto hidden sm:inline font-mono text-[0.65rem] text-matcha-300">live scroll replay</span>
          </div>

          <div className="grid lg:grid-cols-[1.02fr_0.98fr]">
            <div className="p-5 md:p-8 space-y-1.5 overflow-x-auto">
              {SESSION.map((line, i) => <Line key={i} type={line.type} text={line.text} />)}
            </div>
            <div className="border-t lg:border-t-0 lg:border-l border-white/10 p-4 md:p-5 bg-white/[0.025]">
              <ResultPanel />
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="label-clay text-warm-silver mb-4">Or install the agent skill</div>
          <div className="inline-flex max-w-full items-center gap-2 px-4 py-3 rounded-xl bg-black text-cream font-mono text-[0.78rem] sm:text-[0.85rem] overflow-x-auto">
            <span className="text-matcha-300">$</span>
            <span className="whitespace-nowrap">{INSTALL_CMD}</span>
            <button
              onClick={handleCopy}
              data-cursor="magnet"
              className="ml-2 px-3 py-1 rounded-md text-[0.7rem] font-semibold bg-white/10 hover:bg-white/20 transition-colors shrink-0"
            >
              {copied ? 'copied' : 'copy'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
