import { publicFetch } from '../../lib/public-api.js'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { setPageMeta, setJsonLd, removeJsonLd, breadcrumbLd } from '../head.js'

import { compares } from '../compare/data.js'
import { alternatives } from '../alternatives/data.js'
import { industries } from '../industry/data.js'
import { languages } from '../voice/data.js'

// One shared hub-page component renders all 5 listing pages. The shape of
// each cohort's data is slightly different (compare uses .competitor,
// industry uses .industryName, etc.) so HUB_CONFIGS adapts each list to a
// uniform { slug, title, summary, eyebrow } shape that the template renders.
//
// Hub pages exist for the SEO link graph: every page in a cohort gets a
// canonical "parent" URL Google can crawl. Without the hub, Google has to
// piece the cohort together from sitemap entries alone — much weaker
// signal. With the hub, the cohort becomes a clear cluster.

const HUB_CONFIGS = {
  compare: {
    path: '/compare',
    title: 'Compare Gathos · AI Image, TTS + Video API Comparisons · Gathos',
    desc: 'Honest comparisons between Gathos and major AI image, TTS, and video tools including ElevenLabs, Midjourney, Nano Banana Pro, Veo 3, Seedance, Fal.ai, PlayHT, and Murf.',
    h1: 'Honest comparisons across AI image, TTS, and video APIs.',
    intro: "Real prices where public, real feature matrices, no marketing fluff. Each comparison includes a TL;DR, side-by-side workflow or pricing table, a feature matrix, a switcher story, and FAQs. We name what each competitor is best at, not just what Gathos is built to simplify.",
    eyebrowLabel: 'Compare',
    accentClass: 'bg-lemon-400/45 text-lemon-800',
    items: () => compares.map((c) => ({
      slug: c.slug,
      title: `Gathos vs ${c.competitor}`,
      eyebrow: c.category,
      summary: c.summary,
      href: `/compare/${c.slug}`,
    })),
  },
  alternatives: {
    path: '/alternatives',
    title: 'Best Alternatives Roundups · ElevenLabs, Midjourney, Nano Banana Pro, Fal · Gathos',
    desc: 'Honest 6-7 alternative roundups for the major AI image and TTS providers. Gathos ranked #1, others given fair treatment.',
    h1: 'Honest alternative roundups for the major AI APIs.',
    intro: "Each roundup ranks 6-7 real alternatives by job-to-be-done, not by who pays for placement. Gathos is at #1, but every other tool is given honest pros, cons, and a verdict so you can pick the right one for your job.",
    eyebrowLabel: 'Alternatives',
    accentClass: 'bg-pomegranate-400/25 text-pomegranate-400',
    items: () => alternatives.map((a) => ({
      slug: a.slug,
      title: a.h1,
      eyebrow: a.category,
      summary: a.intro,
      href: `/alternatives/${a.slug}`,
    })),
  },
  industry: {
    path: '/industry',
    title: 'Gathos for Your Industry · Audiobooks, Real Estate, Indie Games, Etsy POD · Gathos',
    desc: 'How Gathos solves the image and voice generation needs of audiobook narrators, real estate agents, indie game devs, Etsy print-on-demand sellers, course creators, and restaurant operators.',
    h1: 'Built-for-your-industry workflows.',
    intro: "Six verticals where flat-rate AI image + voice changes the unit economics. Each industry page covers the workflow, the cost-savings vs the traditional approach, and the FAQs we get most often from that segment.",
    eyebrowLabel: 'Industries',
    accentClass: 'bg-slushie-500/25 text-slushie-800',
    items: () => industries.map((i) => ({
      slug: i.slug,
      title: i.h1,
      eyebrow: i.industryName,
      summary: i.summary,
      href: `/industry/${i.slug}`,
    })),
  },
  voice: {
    path: '/voice',
    title: 'Voice Cloning + TTS in 600+ Languages · Gathos',
    desc: 'Native-quality voice cloning and TTS across Hindi, Tamil, Telugu, Brazilian Portuguese, Arabic, and 600+ more languages. Same flat $18/month covers all.',
    h1: 'Native-quality voice cloning across 600+ languages.',
    intro: "First-class language pages with sample scripts, regional accent control, and use-case breakdowns. Same voice clone reads any of these languages — upload one 30-second sample once, ship to multiple language markets.",
    eyebrowLabel: 'Voices',
    accentClass: 'bg-ube-300/45 text-ube-800',
    items: () => languages.map((l) => ({
      slug: l.slug,
      title: l.h1,
      eyebrow: `${l.language} · ${l.nativeName} · ${l.speakers}`,
      summary: `Native ${l.language} TTS and voice cloning with ${l.speakers} speakers across ${l.region}.`,
      href: `/voice/${l.slug}`,
    })),
  },
  tools: {
    path: '/tools',
    title: 'Free AI Pricing Tools · Image, TTS + Creator API Benchmarks · Gathos',
    desc: 'Free tools for benchmarking AI image and TTS API pricing, plus Creator-plan context for teams adding video.',
    h1: 'Free tools for sizing up your AI API spend.',
    intro: "Reference tools for sizing up creative API costs: a calculator that turns monthly image and TTS volume into a real bill, plus a tracker for image and voice providers with Creator-plan context for video workflows.",
    eyebrowLabel: 'Tools',
    accentClass: 'bg-matcha-300/40 text-matcha-800',
    items: () => [
      {
        slug: 'savings-calculator',
        title: 'AI API Savings Calculator',
        eyebrow: 'Interactive',
        summary: 'Plug in your monthly image and TTS volume. See how Pro at $18/month changes the bill before upgrading to Creator for video.',
        href: '/tools/savings-calculator',
      },
      {
        slug: 'ai-pricing-tracker',
        title: 'AI Pricing Tracker',
        eyebrow: 'Reference',
        summary: 'Tracker of AI image and TTS API pricing with Creator-plan context for video stacks, citable as "as of [date]".',
        href: '/tools/ai-pricing-tracker',
      },
    ],
  },
}

// For compare and skill hubs, we also fetch dynamic items authored
// via the admin Content Generator and append them to the static list
// so admin-published pages appear in the index without a deploy.
// Endpoint -> mapper to the uniform { slug, title, eyebrow, summary, href }.
const DYNAMIC_HUB_FETCHERS = {
  compare: {
    endpoint: '/api/compare/dynamic',
    pluck: (j) => j.pages || [],
    map: (c) => ({
      slug: c.slug,
      title: `Gathos vs ${c.competitor}`,
      eyebrow: c.category || 'AI tooling',
      summary: c.summary,
      href: `/compare/${c.slug}`,
    }),
  },
  // Skills hub doesn't currently exist in HUB_CONFIGS (no /skills hub
  // page is wired in App.jsx) but the fetcher is here for when it is.
  skills: {
    endpoint: '/api/skills/dynamic',
    pluck: (j) => j.pages || [],
    map: (s) => ({
      slug: s.slug,
      title: s.h1,
      eyebrow: s.eyebrow || 'Workflow',
      summary: s.summary,
      href: `/skills/${s.slug}`,
    }),
  },
}

export default function HubPage({ kind }) {
  const cfg = HUB_CONFIGS[kind]
  const url = `https://gathos.com${cfg.path}`

  const [dynamicItems, setDynamicItems] = useState([])
  useEffect(() => {
    const fetcher = DYNAMIC_HUB_FETCHERS[kind]
    if (!fetcher) return
    let cancelled = false
    publicFetch(fetcher.endpoint)
      .then((r) => (r.ok ? r.json() : {}))
      .then((j) => {
        if (cancelled) return
        setDynamicItems(fetcher.pluck(j).map(fetcher.map))
      })
      .catch(() => { if (!cancelled) setDynamicItems([]) })
    return () => { cancelled = true }
  }, [kind])

  useEffect(() => {
    setPageMeta({ title: cfg.title, description: cfg.desc, url })
    setJsonLd('gathos-hub-bc-ld', breadcrumbLd([
      { name: 'Home', url: 'https://gathos.com' },
      { name: cfg.eyebrowLabel, url },
    ]))
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => removeJsonLd('gathos-hub-bc-ld')
  }, [kind])

  // Merge static + dynamic. Static slugs win on collision so a manual
  // override always trumps a generated draft with the same slug.
  const staticItems = cfg.items()
  const staticSlugs = new Set(staticItems.map((i) => i.slug))
  const items = [...staticItems, ...dynamicItems.filter((i) => !staticSlugs.has(i.slug))]

  return (
    <div className="bg-cream min-h-screen">
      <Navbar />

      <header className="pt-32 pb-12 md:pt-36">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className={`inline-block px-3 py-1 rounded-pill text-xs font-medium mb-6 ${cfg.accentClass}`}>
            {cfg.eyebrowLabel}
          </div>
          <h1 className="font-editorial text-[clamp(2.4rem,6vw,4rem)] tracking-[-0.025em] leading-[1.04] text-black mb-5 text-balance">
            {cfg.h1}
          </h1>
          <p className="text-warm-charcoal text-[1.05rem] leading-[1.6] max-w-xl mx-auto">
            {cfg.intro}
          </p>
        </div>
      </header>

      <section className="pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {items.map((it) => (
              <Link
                key={it.slug}
                to={it.href}
                className="group h-full p-7 rounded-[28px] bg-white border-2 border-black/90 flex flex-col transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className={`inline-block px-2.5 py-1 rounded text-[0.62rem] font-bold uppercase tracking-[0.12em] ${cfg.accentClass}`}>
                    {it.eyebrow}
                  </span>
                </div>
                <h2 className="font-editorial text-[1.5rem] sm:text-[1.65rem] leading-[1.15] tracking-[-0.018em] text-black mb-3 group-hover:text-matcha-800 transition-colors">
                  {it.title}
                </h2>
                <p className="text-[0.95rem] text-warm-charcoal leading-[1.6] mb-5 flex-1 line-clamp-3">
                  {it.summary}
                </p>
                <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-matcha-800">
                  Read more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
