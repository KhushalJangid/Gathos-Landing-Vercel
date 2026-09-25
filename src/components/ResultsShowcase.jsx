import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SectionHeader from './SectionHeader'
import {
  IMAGE_RESULTS,
  FEATURED_IMAGE_ID,
  VOICE_RESULTS,
  VIDEO_RESULTS,
} from '../showcase/data'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// Brand-palette gradient swatches. Used both for placeholder backgrounds
// and small chip accents so placeholders feel intentional instead of dead.
const SWATCH_GRADIENTS = {
  cream:       'linear-gradient(135deg, #f7f3eb 0%, #e9e2d2 100%)',
  oat:         'linear-gradient(135deg, #efe7d6 0%, #d6c8a8 100%)',
  matcha:      'linear-gradient(135deg, #d5e3c4 0%, #6f8d5a 100%)',
  lemon:       'linear-gradient(135deg, #fcf4c9 0%, #e2c84a 100%)',
  slushie:     'linear-gradient(135deg, #d6e7f4 0%, #6b9bd1 100%)',
  ube:         'linear-gradient(135deg, #ddd1ea 0%, #6b4f8f 100%)',
  dragonfruit: 'linear-gradient(135deg, #f5cfdc 0%, #c14b7a 100%)',
}

// Aspect-ratio classes that match the actual image dimensions returned by
// the Gathos image API. Keeping these in sync avoids cropping under
// object-cover. Current T2I showcase assets use 1:1, 3:2, and 2:3.
const ASPECT_CLASS = {
  square:     'aspect-square',
  portrait:   'aspect-[4/5]',
  landscape:  'aspect-[16/9]',
  horizontal: 'aspect-[3/2]',
  vertical:   'aspect-[2/3]',
}

// ─────────────────────────────────────────────────────────────────────────
// PLACEHOLDER TILE — used until `ready: true` and a real asset exists
// ─────────────────────────────────────────────────────────────────────────
function PlaceholderTile({ prompt, swatch = 'cream', feature, badge }) {
  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-5"
      style={{ background: SWATCH_GRADIENTS[swatch] || SWATCH_GRADIENTS.cream }}
    >
      <div className="flex items-center justify-between">
        {feature && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-sm text-[0.7rem] font-medium text-black/80 tracking-tight">
            <span className="w-1 h-1 rounded-full bg-black/60" />
            {feature}
          </span>
        )}
        {badge && (
          <span className="px-2 py-1 rounded-md bg-black/70 text-white text-[0.65rem] font-mono">
            {badge}
          </span>
        )}
      </div>
      <p className="font-editorial italic text-[0.95rem] leading-[1.35] text-black/85 text-balance overflow-hidden">
        “{prompt}”
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// IMAGE TILE — shows real image when ready, placeholder otherwise
// ─────────────────────────────────────────────────────────────────────────
function ImageTile({ item }) {
  const [showImage, setShowImage] = useState(item.ready)

  return (
    <div
      className={`showcase-tile group relative overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-[0_2px_18px_-8px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:-translate-y-1 ${
        ASPECT_CLASS[item.aspect] || 'aspect-square'
      }`}
    >
      {showImage ? (
        <img
          src={item.src}
          alt={item.prompt}
          loading="lazy"
          decoding="async"
          onError={() => setShowImage(false)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <PlaceholderTile
          prompt={item.prompt}
          swatch={item.swatch}
          feature={item.feature}
          badge="generated · gathos"
        />
      )}

      {/* Hover prompt chip — slides up from bottom on hover when a real
          image is showing. No line-clamp so the full prompt is visible;
          the chip caps at 80% of tile height with internal scroll for
          the rare prompt that overflows. */}
      {showImage && (
        <div className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          <div className="px-3 py-2 rounded-xl bg-white/95 backdrop-blur-md text-[0.72rem] leading-snug text-black/85 border border-black/5 max-h-[80%] overflow-y-auto">
            {item.prompt}
          </div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// IMAGE GRID — masonry-ish 12-col grid with one featured (large) tile
// ─────────────────────────────────────────────────────────────────────────
function ImageGrid() {
  const rootRef = useRef(null)
  const featured = IMAGE_RESULTS.find((i) => i.id === FEATURED_IMAGE_ID) || IMAGE_RESULTS[0]
  const others = IMAGE_RESULTS.filter((i) => i.id !== featured.id)
  const ordered = [featured, ...others] // featured renders first → top-left of column 1

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('.showcase-tile', { opacity: 1, y: 0, filter: 'blur(0px)' })
        return
      }
      gsap.set('.showcase-tile', { opacity: 0, y: 24, filter: 'blur(8px)' })
      ScrollTrigger.batch('.showcase-tile', {
        start: 'top 88%',
        once: true,
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.7,
            stagger: 0.06,
            ease: 'power3.out',
          }),
      })
    },
    { scope: rootRef }
  )

  // CSS-columns masonry — each tile keeps its image's natural aspect ratio
  // so portraits, squares, and 16:9 frames all show in full with no
  // cropping. The browser handles vertical packing automatically.
  return (
    <div
      ref={rootRef}
      className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]"
    >
      {ordered.map((item) => (
        <div key={item.id} className="mb-4 break-inside-avoid">
          <ImageTile item={item} />
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// VOICE CARD — animated waveform + play control
// Without a real .mp3 the play button animates the bars in place so the
// section still feels alive.
// ─────────────────────────────────────────────────────────────────────────
function Waveform({ playing }) {
  // 28 bars with deterministic pseudo-random heights so SSR/CSR stay stable
  const bars = Array.from({ length: 28 }, (_, i) => {
    const seed = Math.sin((i + 1) * 12.9898) * 43758.5453
    const h = 30 + (seed - Math.floor(seed)) * 70 // 30 - 100
    return h
  })
  return (
    <div className="flex items-center gap-[3px] h-10 flex-1">
      {bars.map((h, i) => (
        <span
          key={i}
          className="flex-1 rounded-full bg-black/65"
          style={{
            height: `${h}%`,
            animation: playing
              ? `wave-pulse 0.9s ease-in-out ${i * 0.04}s infinite alternate`
              : 'none',
          }}
        />
      ))}
    </div>
  )
}

function VoiceCard({ item, isActive, onActivate, onPlayChange }) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  // Stop this card when another card becomes the active player.
  useEffect(() => {
    if (!isActive && audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause()
    }
  }, [isActive])

  function togglePlay() {
    if (item.ready && audioRef.current) {
      if (audioRef.current.paused) {
        onActivate?.(item.id)
        audioRef.current.play().catch(() => {})
      } else {
        audioRef.current.pause()
      }
    } else {
      // Demo mode without real audio — animate the bars for a few seconds.
      setPlaying((p) => !p)
      onPlayChange?.(true)
      setTimeout(() => { setPlaying(false); onPlayChange?.(false) }, 4500)
    }
  }

  return (
    <div className="showcase-tile flex flex-col gap-4 p-5 rounded-[20px] bg-white border border-black/10 shadow-[0_2px_18px_-8px_rgba(0,0,0,0.15)]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[0.7rem] font-bold text-black/70 shrink-0"
               style={{ background: SWATCH_GRADIENTS[item.kind === 'clone' ? 'ube' : 'matcha'] }}>
            {item.flag}
          </div>
          <div className="min-w-0">
            <p className="text-[0.85rem] font-semibold text-black truncate">{item.language}</p>
            <p className="text-[0.72rem] text-warm-charcoal truncate">{item.voice}</p>
          </div>
        </div>
        {item.kind === 'clone' && (
          <span className="px-2 py-1 rounded-full bg-ube-300/40 text-ube-800 text-[0.65rem] font-mono">
            ZERO-SHOT
          </span>
        )}
      </div>

      <p className="font-editorial italic text-[0.95rem] leading-[1.4] text-black/85 text-balance line-clamp-3">
        “{item.script}”
      </p>

      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          aria-label={playing ? 'Pause' : 'Play sample'}
          className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0 hover:opacity-85 transition-opacity"
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l14 8-14 8z"/></svg>
          )}
        </button>
        <Waveform playing={playing} />
        {item.ready && (
          <audio
            ref={audioRef}
            src={item.src}
            onPlay={() => { setPlaying(true); onPlayChange?.(true) }}
            onPause={() => { setPlaying(false); onPlayChange?.(false) }}
            onEnded={() => { setPlaying(false); onPlayChange?.(false) }}
          />
        )}
      </div>
    </div>
  )
}

function VoiceGrid({ onMediaPlayChange }) {
  const rootRef = useRef(null)
  const [activeId, setActiveId] = useState(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.set('.showcase-tile', { opacity: 0, y: 20, filter: 'blur(6px)' })
      ScrollTrigger.batch('.showcase-tile', {
        start: 'top 90%',
        once: true,
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.55,
            stagger: 0.08,
            ease: 'power3.out',
          }),
      })
    },
    { scope: rootRef }
  )

  return (
    <div ref={rootRef} className="grid sm:grid-cols-2 gap-4">
      {VOICE_RESULTS.map((v) => (
        <VoiceCard
          key={v.id}
          item={v}
          isActive={activeId === v.id}
          onActivate={(id) => setActiveId(id)}
          onPlayChange={(playing) => {
            if (!playing && activeId === v.id) setActiveId(null)
            onMediaPlayChange?.(playing)
          }}
        />
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// VIDEO TILE — videos loop muted by default. Click to hear the
// AI-generated audio (the differentiator vs Veo / Seedance). Only one
// tile can have audio active at a time.
// ─────────────────────────────────────────────────────────────────────────
function VideoTile({ item, isAudible, onRequestAudio, panelActive }) {
  const [showVideo, setShowVideo] = useState(item.ready)
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = !isAudible
    // Some browsers pause muted→unmuted toggles; ensure playback resumes.
    if (isAudible && v.paused) v.play().catch(() => {})
  }, [isAudible])

  // Pause + free the network when the carousel slides off this panel.
  // The video element stays mounted but doesn't preload further; we
  // resume autoplay when the panel comes back into view.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (panelActive) {
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [panelActive])

  return (
    <div className="showcase-tile group relative overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-[0_2px_18px_-8px_rgba(0,0,0,0.18)] aspect-[16/9]">
      {showVideo ? (
        <video
          ref={videoRef}
          src={item.src}
          poster={item.poster || '/showcase/video/product-demo-creator-video-poster.jpg'}
          autoPlay={false}
          muted
          loop
          playsInline
          // metadata = browser fetches ~100KB of headers + thumbnail only
          // until autoplay actually starts. auto = full prefetch. We only
          // want a full prefetch when the Video carousel slide is active.
          preload="none"
          onError={() => setShowVideo(false)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <PlaceholderTile
          prompt={item.prompt}
          swatch={item.swatch}
          feature={item.duration}
          badge="creator · video"
        />
      )}

      {/* Top-right: mute / unmute toggle. Only meaningful when a real
          video is loaded. Click → asks parent to make this tile audible
          (which mutes any other tile). */}
      {showVideo ? (
        <button
          type="button"
          onClick={() => onRequestAudio?.(isAudible ? null : item.id)}
          aria-label={isAudible ? 'Mute' : 'Unmute and hear generated audio'}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/95 backdrop-blur border border-black/10 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-105 transition-transform"
        >
          {isAudible ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
          )}
        </button>
      ) : (
        <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/85 text-white flex items-center justify-center pointer-events-none">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l14 8-14 8z"/></svg>
        </div>
      )}
    </div>
  )
}

function VideoGrid({ onMediaPlayChange, panelActive = true }) {
  const rootRef = useRef(null)
  // Only one tile can be audible at a time. `null` = all muted.
  const [audibleId, setAudibleId] = useState(null)

  function requestAudio(id) {
    setAudibleId(id)
    onMediaPlayChange?.(id !== null)
  }

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.set('.showcase-tile', { opacity: 0, y: 24, filter: 'blur(8px)' })
      ScrollTrigger.batch('.showcase-tile', {
        start: 'top 88%',
        once: true,
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.65,
            stagger: 0.1,
            ease: 'power3.out',
          }),
      })
    },
    { scope: rootRef }
  )
  return (
    <div ref={rootRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {VIDEO_RESULTS.map((v) => (
        <VideoTile
          key={v.id}
          item={v}
          isAudible={audibleId === v.id}
          onRequestAudio={requestAudio}
          panelActive={panelActive}
        />
      ))}
    </div>
  )
}


function TextToImageMarqueeCard({ item }) {
  return (
    <article className="w-[270px] shrink-0 rounded-[24px] border border-black/10 bg-white p-3 shadow-[0_18px_42px_-34px_rgba(0,0,0,0.55)] md:w-[340px]">
      <div className="relative h-[190px] overflow-hidden rounded-[18px] bg-cream md:h-[230px]">
        <img
          src={item.src}
          alt={item.prompt}
          loading="eager"
          decoding="async"
          fetchPriority="low"
          onError={(event) => { event.currentTarget.style.opacity = 0 }}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
        />
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="truncate rounded-full bg-black px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white">
          {item.feature}
        </span>
        <span className="shrink-0 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-warm-silver">t2i</span>
      </div>
      <p className="mt-2 h-[3.2em] overflow-hidden text-[0.78rem] leading-[1.6] text-warm-charcoal">
        {item.prompt}
      </p>
    </article>
  )
}

function TextToImageMarqueeRow({ items, direction = 'left', duration = 52 }) {
  return (
    <div className="relative overflow-hidden py-2" style={{ WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)', maskImage: 'linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)' }}>
      <div
        className="inline-flex w-max gap-4 pl-4 will-change-transform"
        style={{ animation: `t2i-marquee-${direction} ${duration}s linear infinite` }}
      >
        {[...items, ...items].map((item, index) => (
          <TextToImageMarqueeCard key={`${item.id}-${direction}-${index}`} item={item} />
        ))}
      </div>
    </div>
  )
}

function TextToImageMarquee() {
  const rows = IMAGE_RESULTS.reduce(
    (groups, item, index) => {
      groups[index % 3].push(item)
      return groups
    },
    [[], [], []]
  )

  return (
    <div className="mb-16 overflow-hidden rounded-[32px] border border-black/10 bg-[#f8f4ec] py-6 shadow-[0_24px_80px_-58px_rgba(0,0,0,0.55)] md:py-8">
      <div className="mb-5 flex flex-col items-center gap-2 px-6 text-center">
        <div className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-warm-silver">Text-to-Image Results</div>
        <h3 className="text-[1.45rem] font-semibold tracking-[-0.01em] text-black md:text-[1.9rem]">Campaign visuals from prompt to final image</h3>
      </div>
      <div className="space-y-3">
        <TextToImageMarqueeRow items={rows[0]} direction="left" duration={54} />
        <TextToImageMarqueeRow items={[...rows[1]].reverse()} direction="right" duration={60} />
        <TextToImageMarqueeRow items={rows[2]} direction="left" duration={66} />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// TABS
// ─────────────────────────────────────────────────────────────────────────
// Order matters — visitors land on the first tab. Video first because
// it's the strongest differentiator vs Veo / Seedance and the most
// impressive output to lead with.
const TABS = [
  { key: 'video', label: 'Video' },
  { key: 'voice', label: 'TTS' },
]

function TabSwitcher({ value, onChange }) {
  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-pill bg-white border border-black/10 shadow-[0_2px_12px_-6px_rgba(0,0,0,0.15)]">
      {TABS.map((t) => {
        const active = value === t.key
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={`relative px-5 py-2 rounded-pill text-[0.85rem] font-semibold transition-colors ${
              active ? 'text-white' : 'text-warm-charcoal hover:text-black'
            }`}
          >
            {active && (
              <span className="absolute inset-0 rounded-pill bg-black" aria-hidden />
            )}
            <span className="relative">{t.label}</span>
          </button>
        )
      })}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// CAROUSEL — three panels (Image / Voice / Video) on a horizontal track
// that translates left/right when the active tab changes. The carousel
// auto-rotates every AUTOROTATE_MS continuously (no hover pause) so the
// motion is visible from any scroll position. A thin progress bar under
// the carousel shows the time-until-next-slide so the rotation never
// feels random. Container height tracks the active panel so shorter
// content doesn't leave dead space.
// ─────────────────────────────────────────────────────────────────────────
const AUTOROTATE_MS = 6500

function Carousel({ tab, onTabChange }) {
  const idx = Math.max(0, TABS.findIndex((t) => t.key === tab))
  const [progressKey, setProgressKey] = useState(0)
  const [mediaPlaying, setMediaPlaying] = useState(false)
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const autoRotateEnabled = !mediaPlaying && !reducedMotion

  useEffect(() => {
    if (!autoRotateEnabled) return
    const t = setTimeout(() => {
      const next = TABS[(idx + 1) % TABS.length].key
      onTabChange(next)
    }, AUTOROTATE_MS)
    return () => clearTimeout(t)
  }, [idx, autoRotateEnabled, onTabChange])

  useEffect(() => {
    setProgressKey((k) => k + 1)
    setMediaPlaying(false)
    ScrollTrigger.refresh()
  }, [idx])

  function go(delta) {
    const next = TABS[(idx + delta + TABS.length) % TABS.length].key
    onTabChange(next)
  }

  return (
    <div className="relative">
      <div className="relative min-h-[280px]">
        {tab === 'video' && (
          <div key="video" className="results-panel">
            <VideoGrid onMediaPlayChange={setMediaPlaying} panelActive />
          </div>
        )}
        {tab === 'voice' && (
          <div key="voice" className="results-panel">
            <VoiceGrid onMediaPlayChange={setMediaPlaying} />
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous result type"
          className="w-10 h-10 rounded-full bg-white border border-black/10 shadow-[0_4px_18px_-10px_rgba(0,0,0,0.25)] inline-flex items-center justify-center hover:bg-black hover:text-white transition-colors"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <div className="flex items-center justify-center gap-2">
          {TABS.map((t, i) => {
            const active = i === idx
            return (
              <button
                key={t.key}
                onClick={() => onTabChange(t.key)}
                aria-label={`Show ${t.label}`}
                className={`relative h-1.5 rounded-full overflow-hidden transition-[width] duration-300 ${
                  active ? 'w-16 bg-black/15' : 'w-5 bg-black/15 hover:bg-black/35'
                }`}
              >
                {active && (
                  <span
                    key={progressKey}
                    className="absolute inset-y-0 left-0 bg-black rounded-full"
                    style={{
                      animation: autoRotateEnabled
                        ? `carousel-fill ${AUTOROTATE_MS}ms linear forwards`
                        : 'none',
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next result type"
          className="w-10 h-10 rounded-full bg-white border border-black/10 shadow-[0_4px_18px_-10px_rgba(0,0,0,0.25)] inline-flex items-center justify-center hover:bg-black hover:text-white transition-colors"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────────────────────────────────
export default function ResultsShowcase() {
  // Default opens on Video — strongest differentiator + most visually
  // impactful, lands the value prop fastest.
  const [tab, setTab] = useState('video')

  useEffect(() => {
    // Re-evaluate ScrollTrigger positions after a tab switch so the
    // height transition doesn't leave stale measurements behind.
    ScrollTrigger.refresh()
  }, [tab])

  return (
    <section id="results" className="relative py-24 md:py-32 bg-cream/40 border-t border-dashed border-oat overflow-hidden">
      <style>{`
        @keyframes wave-pulse {
          0%   { transform: scaleY(0.4); }
          100% { transform: scaleY(1); }
        }
        @keyframes carousel-fill {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes t2i-marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes t2i-marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          center
          eyebrow="Live API output"
          title={
            <>
              Watch what your<br />
              <span className="italic text-matcha-800">agent ships.</span>
            </>
          }
          subtitle="Every artefact below came from Gathos APIs: text-to-image campaign visuals, voice cloning across 600+ languages, and videos with synced AI audio."
        />

        <TextToImageMarquee />

        <div className="mb-10 flex justify-center">
          <TabSwitcher value={tab} onChange={setTab} />
        </div>

        <Carousel tab={tab} onTabChange={setTab} />

        {/* Closing CTA — strategic placement to capture intent right after
            visitors have just seen real output. The proof is fresh, the
            next click should be available without scrolling further. */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <p className="text-center text-sm md:text-base text-warm-charcoal font-medium max-w-lg text-balance">
            Every artefact above ships from one REST endpoint. Start free and your agent can ship its own in minutes.
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <a
              href="https://dashboard.gathos.live/login/"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-pill bg-black text-white text-[0.9rem] font-semibold hover:opacity-85 transition-opacity clay-hover"
            >
              Start free
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </a>
            <a
              href="#apis"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-pill bg-white border-2 border-black/90 text-black text-[0.9rem] font-semibold hover:bg-black/5 transition-colors"
            >
              See the APIs
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
