import { DASHBOARD_URL } from '../lib/urls.js'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SectionHeader from './SectionHeader'
import RevealOnScroll from './RevealOnScroll'
import Button from './Button'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const skills = [
  {
    title: 'Idea-to-Presentation',
    desc: 'Say an idea, get a designed .pptx plus a narrated .mp4. Full design system per deck: palette, typography, visual motifs, all generated on the fly.',
    output: '.pptx + .mp4 with AI voiceover',
    swatch: 'matcha',
  },
  {
    title: 'YouTube Video Factory',
    desc: "Clone any channel's style. Generate scripts, visuals, voiceover, and thumbnails. Upload-ready 1080p videos from a single prompt.",
    output: '1920×1080 .mp4 + thumbnail .png',
    swatch: 'slushie',
  },
  {
    title: 'Script-to-Reel',
    desc: 'Turn narration scripts into vertical 9:16 reels with split-screen visuals, dissolve transitions, and cloned voiceover. Instagram- and TikTok-ready.',
    output: '1080×1920 vertical .mp4',
    swatch: 'pomegranate',
  },
]

const badgeStyles = {
  matcha:      'bg-matcha-300/30 text-matcha-300',
  slushie:     'bg-slushie-500/25 text-slushie-200',
  pomegranate: 'bg-pomegranate-400/25 text-pomegranate-200',
}

// Dark inversion section — only section on the page with ink black
// background, cream text. Visual rhythm break that signals "this is
// the different thing" (open-source skills). Scroll-into-view fades
// the background colour from cream to ink so the transition feels
// intentional, not abrupt.
export default function OpenSource() {
  const sectionRef = useRef(null)
  const ctaHref = (DASHBOARD_URL + "/login/")

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      // Fade background from neutral to ink as the section crosses the
      // viewport top. Scrub locks the fade to wheel position so reverse
      // scroll restores the cream tone cleanly.
      gsap.fromTo(
        sectionRef.current,
        { backgroundColor: '#faf7f1' },
        {
          backgroundColor: '#0a0a0a',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 md:py-32 text-cream relative"
      style={{ backgroundColor: '#faf7f1' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 flex flex-col items-center text-center">
          <RevealOnScroll>
            <div className="label-clay text-matcha-300 mb-6">Open-source skills</div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.05}>
            <h2 className="font-editorial text-[clamp(2.2rem,5vw,3.25rem)] font-normal tracking-[-0.025em] leading-[1.1] text-cream text-balance max-w-3xl">
              Skills that<br />
              <span className="italic text-matcha-300">ship real output.</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="font-sans text-[1.05rem] text-cream/70 max-w-2xl leading-[1.6] mt-5 text-balance">
              Pre-built agent skills powered by the Gathos APIs. One install command, production-quality creative output. No glue code. No prompt engineering.
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {skills.map((s, i) => (
            <RevealOnScroll key={s.title} delay={i * 0.06}>
              <div className="h-full p-7 rounded-[28px] bg-white/[0.03] border border-white/10 flex flex-col backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/20 transition-colors">
                <span className={`self-start inline-block px-2.5 py-1 rounded text-[0.62rem] font-bold uppercase tracking-[0.12em] mb-4 ${badgeStyles[s.swatch]}`}>
                  Agent Skill
                </span>
                <h3 className="text-[1.15rem] font-semibold mb-2 text-cream tracking-[-0.01em]">{s.title}</h3>
                <p className="text-[0.92rem] text-cream/70 leading-[1.6] mb-5">{s.desc}</p>
                <div className="mt-auto">
                  <div className="px-3.5 py-2.5 rounded-lg bg-black/40 border border-dashed border-white/15 font-mono text-[0.72rem] text-cream/70">
                    Output: <span className="text-cream">{s.output}</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.2}>
          <div className="flex flex-col items-center gap-3">
            <a
              href={ctaHref}
              data-cursor="magnet"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-pill bg-cream text-black border-2 border-cream font-semibold text-[0.95rem] hover:bg-transparent hover:text-cream transition-colors"
            >
              Sign in to install Skills
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </a>
            <p className="text-xs text-cream/60">
              Skills install from the dashboard with a single command, scoped to your Gathos API key.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
