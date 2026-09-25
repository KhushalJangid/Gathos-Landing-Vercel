import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import {
  setPageMeta,
  setJsonLd,
  removeJsonLd,
  softwareApplicationLd,
  breadcrumbLd,
} from '../head.js'

// Pricing snapshot · kept inline so the page works offline. Update quarterly
// when the AI Pricing Tracker is updated; the two pages share the same data.
//
// All numbers are public, as of April 2026. Sources cited on the tracker
// page so the calculator's claims are auditable.
const COMPETITOR_PRICING = {
  image: [
    { name: 'Midjourney (Pro)',         perUnit: 0.030,  unit: 'image', tier: 'Pro $60/mo', notes: '2,000 images included; overages metered' },
    { name: 'Nano Banana Pro (Gemini)', perUnit: 0.134,  unit: 'image', tier: 'Per-call API',  notes: '1K-2K resolution; $0.24 at 4K' },
    { name: 'GPT-Image-2',              perUnit: 0.040,  unit: 'image', tier: 'Per-call API',  notes: '1024×1024 baseline' },
    { name: 'Fal.ai (FLUX-dev)',        perUnit: 0.025,  unit: 'image', tier: 'Per-second',   notes: 'Average 1-2s per image' },
    { name: 'Replicate (FLUX-dev)',     perUnit: 0.030,  unit: 'image', tier: 'Per-second',   notes: 'Per-GPU-second metering' },
  ],
  tts: [
    { name: 'ElevenLabs (Pro)',  perUnit: 0.000200, unit: 'character', tier: 'Pro $99/mo', notes: '500k chars included; overages metered' },
    { name: 'PlayHT (Premium)',  perUnit: 0.000066, unit: 'character', tier: 'Premium $99/mo', notes: '1.5M chars included' },
    { name: 'Cartesia (Pro)',    perUnit: 0.000150, unit: 'character', tier: 'Pro $50/mo', notes: 'Optimized for real-time' },
    { name: 'OpenAI TTS',        perUnit: 0.000015, unit: 'character', tier: 'Per-call API', notes: 'No voice cloning' },
    { name: 'Murf (Business)',   perUnit: 0.000800, unit: 'minute',    tier: '$49/mo per user', notes: '~3 hours of audio per seat' },
  ],
}

const GATHOS_PRICE_PER_MONTH = 18

function fmt(n, decimals = 2) {
  if (n == null || isNaN(n)) return '$0.00'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n)
}

function fmtInt(n) {
  return new Intl.NumberFormat('en-US').format(Math.round(n))
}

export default function SavingsCalculator() {
  const url = 'https://gathos.com/tools/savings-calculator'
  useEffect(() => {
    setPageMeta({
      title: 'AI API Savings Calculator · Gathos vs Everyone Else',
      description: "Plug in your monthly image and TTS volume. See exactly how much you'd save switching to Gathos at $18/month flat. Updated April 2026.",
      url,
    })
    setJsonLd('gathos-calc-app-ld', softwareApplicationLd({ description: 'AI API savings calculator', url }))
    setJsonLd('gathos-calc-bc-ld', breadcrumbLd([
      { name: 'Home', url: 'https://gathos.com' },
      { name: 'Tools', url: 'https://gathos.com/tools' },
      { name: 'Savings calculator', url },
    ]))
    return () => {
      removeJsonLd('gathos-calc-app-ld')
      removeJsonLd('gathos-calc-bc-ld')
    }
  }, [])

  const [imagesPerMonth, setImagesPerMonth] = useState(500)
  const [ttsCharsPerMonth, setTtsCharsPerMonth] = useState(100000)

  const imageCosts = useMemo(() => {
    return COMPETITOR_PRICING.image.map((c) => ({
      ...c,
      monthlyCost: imagesPerMonth * c.perUnit,
    }))
  }, [imagesPerMonth])

  const ttsCosts = useMemo(() => {
    return COMPETITOR_PRICING.tts.map((c) => {
      const cost = c.unit === 'minute'
        ? (ttsCharsPerMonth / 1000) * c.perUnit  // rough: 1k chars ~ 1 minute
        : ttsCharsPerMonth * c.perUnit
      return { ...c, monthlyCost: cost }
    })
  }, [ttsCharsPerMonth])

  const cheapestImage = imageCosts.reduce((min, c) => c.monthlyCost < min.monthlyCost ? c : min, imageCosts[0])
  const cheapestTts = ttsCosts.reduce((min, c) => c.monthlyCost < min.monthlyCost ? c : min, ttsCosts[0])
  const totalCheapestStack = (cheapestImage?.monthlyCost || 0) + (cheapestTts?.monthlyCost || 0)
  const savings = Math.max(0, totalCheapestStack - GATHOS_PRICE_PER_MONTH)
  const savingsPct = totalCheapestStack > 0 ? (savings / totalCheapestStack) * 100 : 0

  return (
    <div className="bg-cream min-h-screen">
      <Navbar />

      <header className="pt-32 pb-10 md:pt-36">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-block px-2.5 py-1 rounded text-[0.62rem] font-bold uppercase tracking-[0.12em] bg-matcha-300/40 text-matcha-800 mb-5">
            Tool · Updated April 2026
          </div>
          <h1 className="font-editorial text-[clamp(2.2rem,5.5vw,3.6rem)] tracking-[-0.025em] leading-[1.08] text-black mb-5 text-balance">
            How much would you save with Gathos?
          </h1>
          <p className="text-warm-charcoal text-[1.1rem] leading-[1.6] max-w-[60ch] text-balance">
            Tell us how many images and how many TTS characters you generate per month. We'll calculate your bill on every major API and compare to Gathos at flat $18/month.
          </p>
        </div>
      </header>

      {/* Inputs */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="p-5 rounded-2xl bg-white border-2 border-black/90 block">
              <div className="text-[0.62rem] uppercase tracking-[0.14em] text-warm-silver font-semibold mb-2">
                Images per month
              </div>
              <input
                type="number"
                value={imagesPerMonth}
                onChange={(e) => setImagesPerMonth(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full text-[2rem] font-editorial italic text-matcha-800 bg-transparent focus:outline-none tabular-nums"
                min="0"
                step="50"
              />
              <input
                type="range"
                min="0"
                max="20000"
                step="50"
                value={imagesPerMonth}
                onChange={(e) => setImagesPerMonth(parseInt(e.target.value))}
                className="w-full mt-2"
              />
              <div className="text-[0.78rem] text-warm-silver mt-1">
                Drag to {fmtInt(imagesPerMonth)} or type any number.
              </div>
            </label>

            <label className="p-5 rounded-2xl bg-white border-2 border-black/90 block">
              <div className="text-[0.62rem] uppercase tracking-[0.14em] text-warm-silver font-semibold mb-2">
                TTS characters per month
              </div>
              <input
                type="number"
                value={ttsCharsPerMonth}
                onChange={(e) => setTtsCharsPerMonth(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full text-[2rem] font-editorial italic text-matcha-800 bg-transparent focus:outline-none tabular-nums"
                min="0"
                step="10000"
              />
              <input
                type="range"
                min="0"
                max="2000000"
                step="10000"
                value={ttsCharsPerMonth}
                onChange={(e) => setTtsCharsPerMonth(parseInt(e.target.value))}
                className="w-full mt-2"
              />
              <div className="text-[0.78rem] text-warm-silver mt-1">
                {fmtInt(ttsCharsPerMonth)} chars (~{fmtInt(ttsCharsPerMonth / 1000)} minutes of audio).
              </div>
            </label>
          </div>
        </div>
      </section>

      {/* Headline savings */}
      <section className="py-6">
        <div className="max-w-3xl mx-auto px-6">
          <div className="p-7 rounded-2xl bg-matcha-300/15 border-2 border-matcha-600/50 text-center">
            <div className="text-[0.62rem] uppercase tracking-[0.14em] text-matcha-800 font-semibold mb-2">
              Your potential savings
            </div>
            <div className="font-editorial text-[clamp(2.5rem,7vw,4.5rem)] italic text-matcha-800 leading-none mb-2 tabular-nums">
              {fmt(savings)} / month
            </div>
            <div className="text-[0.95rem] text-warm-charcoal mb-1">
              {savingsPct > 0
                ? `That's ${savingsPct.toFixed(0)}% cheaper than the next-best stack.`
                : 'Your volume is small enough that per-call pricing wins. Save Gathos for the moment you scale.'}
            </div>
            <div className="text-[0.78rem] text-warm-silver">
              Compared to a stack of {cheapestImage?.name} + {cheapestTts?.name} at {fmt(totalCheapestStack)} / month.
            </div>
          </div>
        </div>
      </section>

      {/* Image breakdown */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-editorial text-[clamp(1.7rem,3.5vw,2.3rem)] tracking-[-0.02em] text-black mb-2">
            Image generation: bills compared
          </h2>
          <p className="text-[0.88rem] text-warm-silver mb-6">
            For {fmtInt(imagesPerMonth)} images per month at standard resolution. Per-image rates as of April 2026.
          </p>
          <div className="overflow-x-auto rounded-2xl border-2 border-black/90 bg-white">
            <table className="w-full text-[0.95rem]">
              <thead>
                <tr className="border-b border-oat">
                  <th className="text-left px-5 py-3.5 text-[0.62rem] uppercase tracking-[0.12em] text-warm-silver font-semibold">Provider</th>
                  <th className="text-right px-5 py-3.5 text-[0.62rem] uppercase tracking-[0.12em] text-warm-silver font-semibold">Per image</th>
                  <th className="text-right px-5 py-3.5 text-[0.62rem] uppercase tracking-[0.12em] text-warm-silver font-semibold">Monthly bill</th>
                  <th className="text-right px-5 py-3.5 text-[0.62rem] uppercase tracking-[0.12em] text-warm-silver font-semibold">vs Gathos</th>
                </tr>
              </thead>
              <tbody>
                <tr className="!bg-matcha-300/15">
                  <td className="px-5 py-3.5 font-semibold text-matcha-800">Gathos (Pro, includes TTS)</td>
                  <td className="text-right px-5 py-3.5 text-warm-charcoal tabular-nums">${(GATHOS_PRICE_PER_MONTH / Math.max(1, imagesPerMonth)).toFixed(4)}</td>
                  <td className="text-right px-5 py-3.5 text-matcha-800 font-semibold tabular-nums">{fmt(GATHOS_PRICE_PER_MONTH)}</td>
                  <td className="text-right px-5 py-3.5 text-warm-silver">, </td>
                </tr>
                {imageCosts.map((c, i) => (
                  <tr key={c.name} className={i % 2 ? 'bg-oat-50/30' : ''}>
                    <td className="px-5 py-3.5 font-semibold text-black">{c.name}</td>
                    <td className="text-right px-5 py-3.5 text-warm-charcoal tabular-nums">{fmt(c.perUnit, 3)}</td>
                    <td className="text-right px-5 py-3.5 text-warm-charcoal tabular-nums">{fmt(c.monthlyCost)}</td>
                    <td className="text-right px-5 py-3.5 tabular-nums">
                      <span className={c.monthlyCost > GATHOS_PRICE_PER_MONTH ? 'text-matcha-800 font-semibold' : 'text-warm-silver'}>
                        {c.monthlyCost > GATHOS_PRICE_PER_MONTH
                          ? `+${fmt(c.monthlyCost - GATHOS_PRICE_PER_MONTH)}`
                          : `-${fmt(GATHOS_PRICE_PER_MONTH - c.monthlyCost)}`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* TTS breakdown */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-editorial text-[clamp(1.7rem,3.5vw,2.3rem)] tracking-[-0.02em] text-black mb-2">
            TTS: bills compared
          </h2>
          <p className="text-[0.88rem] text-warm-silver mb-6">
            For {fmtInt(ttsCharsPerMonth)} characters per month. Per-character rates as of April 2026.
          </p>
          <div className="overflow-x-auto rounded-2xl border-2 border-black/90 bg-white">
            <table className="w-full text-[0.95rem]">
              <thead>
                <tr className="border-b border-oat">
                  <th className="text-left px-5 py-3.5 text-[0.62rem] uppercase tracking-[0.12em] text-warm-silver font-semibold">Provider</th>
                  <th className="text-right px-5 py-3.5 text-[0.62rem] uppercase tracking-[0.12em] text-warm-silver font-semibold">Per char/min</th>
                  <th className="text-right px-5 py-3.5 text-[0.62rem] uppercase tracking-[0.12em] text-warm-silver font-semibold">Monthly bill</th>
                  <th className="text-right px-5 py-3.5 text-[0.62rem] uppercase tracking-[0.12em] text-warm-silver font-semibold">vs Gathos</th>
                </tr>
              </thead>
              <tbody>
                <tr className="!bg-matcha-300/15">
                  <td className="px-5 py-3.5 font-semibold text-matcha-800">Gathos (Pro, includes images)</td>
                  <td className="text-right px-5 py-3.5 text-warm-charcoal">flat</td>
                  <td className="text-right px-5 py-3.5 text-matcha-800 font-semibold tabular-nums">{fmt(GATHOS_PRICE_PER_MONTH)}</td>
                  <td className="text-right px-5 py-3.5 text-warm-silver">, </td>
                </tr>
                {ttsCosts.map((c, i) => (
                  <tr key={c.name} className={i % 2 ? 'bg-oat-50/30' : ''}>
                    <td className="px-5 py-3.5 font-semibold text-black">{c.name}</td>
                    <td className="text-right px-5 py-3.5 text-warm-charcoal tabular-nums">${c.perUnit.toFixed(6)}/{c.unit}</td>
                    <td className="text-right px-5 py-3.5 text-warm-charcoal tabular-nums">{fmt(c.monthlyCost)}</td>
                    <td className="text-right px-5 py-3.5 tabular-nums">
                      <span className={c.monthlyCost > GATHOS_PRICE_PER_MONTH ? 'text-matcha-800 font-semibold' : 'text-warm-silver'}>
                        {c.monthlyCost > GATHOS_PRICE_PER_MONTH
                          ? `+${fmt(c.monthlyCost - GATHOS_PRICE_PER_MONTH)}`
                          : `-${fmt(GATHOS_PRICE_PER_MONTH - c.monthlyCost)}`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Methodology note */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-6">
          <div className="p-5 rounded-2xl bg-oat-50/40 border border-oat text-[0.88rem] text-warm-charcoal leading-[1.6]">
            <strong className="text-black">How we calculate.</strong> Each provider's per-unit rate is pulled from their public pricing page as of April 2026. Tier-bundle pricing (e.g., ElevenLabs Pro includes 500k chars) is averaged into the per-character cost. For minute-billed providers (Murf), we estimate 1,000 characters ≈ 1 minute of audio. We compare against the cheapest provider per category, not against worst-case stacks. The Gathos $18 covers both image and TTS together, so we list it once per category and let the math speak.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-editorial text-[clamp(1.8rem,4vw,2.5rem)] text-black mb-3">
            Stop watching meters. <span className="italic text-matcha-800">Try Gathos free for 7 days.</span>
          </h2>
          <p className="text-warm-charcoal mb-6 max-w-md mx-auto leading-[1.6]">
            Flat $18/month, unlimited image and TTS, no per-call cost.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a
              href="https://dashboard.gathos.live/login/"
              className="inline-flex items-center gap-1.5 h-11 px-6 rounded-pill bg-lavender text-black border-2 border-black/90 font-semibold clay-hover clay-hover-bold"
            >
              Start free
            </a>
            <Link
              to="/tools/ai-pricing-tracker"
              className="inline-flex items-center gap-1.5 h-11 px-6 rounded-pill bg-white text-black border-2 border-black/90 font-semibold clay-hover"
            >
              See live pricing tracker
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
