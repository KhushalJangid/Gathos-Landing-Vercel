import { usecaseAsset } from '../lib/assets.js'
import { useState } from 'react'
import SectionHeader from './SectionHeader'
import RevealOnScroll from './RevealOnScroll'



const VIDEOS = [
  {
    title: 'Podcast-style creator clip',
    label: 'Podcast workflow',
    duration: '30s',
    meta: '1344x768 · audio',
    poster: usecaseAsset('final_podcast.jpg'),
    src: usecaseAsset('videos/final_podcast.mp4'),
    description: 'A finished short-form clip with narration-ready pacing and an exported audio track.',
  },
  {
    title: 'One-minute social video',
    label: '60s output',
    duration: '60s',
    meta: '1280x704 · audio',
    poster: usecaseAsset('final_60s.jpg'),
    src: usecaseAsset('videos/final_60s.mp4'),
    description: 'A longer creator run showing how users are stitching image, voice and video into publishable assets.',
  },
  {
    title: 'Long-form pipeline segment',
    label: 'Creator video',
    duration: '59s',
    meta: '1280x704 · audio',
    poster: usecaseAsset('final_17.jpg'),
    src: usecaseAsset('videos/final_17.mp4'),
    description: 'A user-generated scene segment from a longer automated content workflow.',
  },
  {
    title: 'Narrated explainer scene',
    label: 'Use case',
    duration: '57s',
    meta: '1280x704 · audio',
    poster: usecaseAsset('final_18.jpg'),
    src: usecaseAsset('videos/final_18.mp4'),
  },
  {
    title: 'Creator video draft',
    label: 'Use case',
    duration: '58s',
    meta: '1280x704 · audio',
    poster: usecaseAsset('final_16.jpg'),
    src: usecaseAsset('videos/final_16.mp4'),
  },
  {
    title: 'Short story clip',
    label: 'Use case',
    duration: '27s',
    meta: '1344x768 · audio',
    poster: usecaseAsset('final_15.jpg'),
    src: usecaseAsset('videos/final_15.mp4'),
  },
  {
    title: 'Multi-scene video run',
    label: 'Use case',
    duration: '49s',
    meta: '1280x704 · audio',
    poster: usecaseAsset('final_10.jpg'),
    src: usecaseAsset('videos/final_10.mp4'),
  },
  {
    title: 'Agent-generated scene',
    label: 'Use case',
    duration: '41s',
    meta: '1280x704 · audio',
    poster: usecaseAsset('final_8.jpg'),
    src: usecaseAsset('videos/final_8.mp4'),
  },
  {
    title: 'Creator workflow output',
    label: 'Use case',
    duration: '59s',
    meta: '1280x704 · audio',
    poster: usecaseAsset('final_3.jpg'),
    src: usecaseAsset('videos/final_3.mp4'),
  },
]

function ShowcaseVideo({ item, compact = false }) {
  const [active, setActive] = useState(false)

  if (active) {
    return (
      <video
        src={item.src}
        poster={item.poster}
        controls
        autoPlay
        preload="none"
        playsInline
        controlsList="nodownload"
        className="h-full w-full object-cover"
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className="group/video absolute inset-0 block h-full w-full cursor-pointer overflow-hidden bg-black text-left"
      aria-label={'Play ' + item.title}
    >
      <img
        src={item.poster}
        alt=""
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition duration-500 group-hover/video:scale-[1.025]"
      />
      <span className={'absolute grid place-items-center rounded-full bg-white text-black shadow-[0_12px_36px_-18px_rgba(0,0,0,0.7)] transition group-hover/video:scale-105 ' + (compact ? 'right-3 bottom-3 h-10 w-10' : 'right-4 top-4 h-14 w-14')}>
        <svg width={compact ? 16 : 18} height={compact ? 16 : 18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  )
}
function FeaturedCard({ item, index }) {
  return (
    <RevealOnScroll delay={index * 0.07} className="h-full">
      <div className="group flex h-full flex-col overflow-hidden rounded-[28px] border-2 border-black bg-white shadow-[0_22px_80px_-58px_rgba(0,0,0,0.65)]">
        <div className="relative aspect-video overflow-hidden bg-black">
          <ShowcaseVideo item={item} />
          <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-black backdrop-blur">
            {item.label}
          </div>
          <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-white">
            <div>
              <div className="font-editorial text-[1.65rem] italic leading-none">{item.duration}</div>
              <div className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/70">{item.meta}</div>
            </div>
            <span className="rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs font-semibold backdrop-blur">Play inline</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5 text-left">
          <h3 className="text-[1rem] font-semibold tracking-[-0.01em] text-black">{item.title}</h3>
          <p className="mt-2 text-[0.86rem] leading-[1.55] text-warm-charcoal">{item.description}</p>
        </div>
      </div>
    </RevealOnScroll>
  )
}

function CompactCard({ item, index }) {
  return (
    <RevealOnScroll delay={0.12 + index * 0.04} className="h-full">
      <div className="group h-full overflow-hidden rounded-[22px] border border-oat bg-white text-left transition hover:border-black/60 hover:shadow-[0_16px_50px_-42px_rgba(0,0,0,0.7)]">
        <div className="relative aspect-video overflow-hidden bg-black">
          <ShowcaseVideo item={item} compact />
          <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/92 px-2.5 py-1 font-mono text-[0.54rem] uppercase tracking-[0.14em] text-black backdrop-blur">
            {item.duration}
          </div>
        </div>
        <div className="p-4">
          <div className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-warm-silver">{item.label}</div>
          <div className="mt-1 truncate text-[0.94rem] font-semibold text-black">{item.title}</div>
          <div className="mt-1 text-[0.76rem] text-warm-charcoal/75">{item.meta}</div>
        </div>
      </div>
    </RevealOnScroll>
  )
}

export default function UserVideoShowcase() {
  const featured = VIDEOS.slice(0, 3)
  const compact = VIDEOS.slice(3)

  return (
    <section id="user-videos" className="relative overflow-hidden bg-cream py-24 md:py-30">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          center
          eyebrow="Built With Gathos"
          title={
            <>
              Real creator outputs,<br />
              <span className="italic text-matcha-800">not staged demos.</span>
            </>
          }
          subtitle="Users are already pushing Gathos into YouTube pipelines, narrated clips, podcasts and short-form video workflows. The videos below play directly from Gathos-hosted assets, so visitors can watch the results without leaving the page."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {featured.map((item, index) => (
            <FeaturedCard key={item.title} item={item} index={index} />
          ))}
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {compact.map((item, index) => (
            <CompactCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
