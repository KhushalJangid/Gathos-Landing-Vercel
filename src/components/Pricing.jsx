import { DASHBOARD_URL } from '../lib/urls.js'
import { publicFetch } from '../lib/public-api.js'
import { useState } from 'react'
import SectionHeader from './SectionHeader'
import RevealOnScroll from './RevealOnScroll'
import Button from './Button'

function BusinessCard() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '', website: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      const res = await publicFetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data.ok !== true) { setStatus('error'); setError(data.error || 'Could not send.'); return }
      setStatus('sent')
      setForm({ name: '', email: '', company: '', message: '', website: '' })
    } catch {
      setStatus('error')
      setError('Network error. Email hello@gathos.com directly.')
    }
  }

  const input = "w-full h-10 px-3 rounded-lg bg-cream border-2 border-black/20 text-[0.88rem] text-black placeholder:text-warm-silver focus:outline-none focus:border-black/70 transition-colors"

  return (
    <div className="relative h-full rounded-[28px] bg-white border-2 border-black/90 p-8 flex flex-col">
      <div className="mb-6">
        <div className="inline-block px-2.5 py-1 rounded text-[0.62rem] font-bold uppercase tracking-[0.12em] bg-slushie-500/20 text-slushie-800 mb-4">
          Enterprise
        </div>
        <h3 className="text-2xl font-semibold tracking-[-0.02em] text-black">For Businesses</h3>
        <p className="text-sm text-warm-silver mt-1">Volume, white-label, on-prem, SLA</p>
      </div>

      <p className="text-[0.93rem] text-warm-charcoal leading-[1.6] mb-6">
        Higher rate limits, dedicated support, white-label APIs, private-cloud or on-prem deployment,
        and volume pricing. For teams embedding Gathos into their product.
      </p>

      <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-2 mb-7">
        {['Custom rate limits & SLAs','White-label API + skills','Private-cloud / on-prem','Dedicated Slack channel','Volume & annual pricing','Security review & DPA'].map((f) => (
          <li key={f} className="flex items-start gap-2 text-[0.85rem] text-warm-charcoal">
            <svg className="flex-shrink-0 mt-0.5 text-matcha-600" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            {f}
          </li>
        ))}
      </ul>

      {status === 'sent' ? (
        <div className="p-6 rounded-xl bg-matcha-300/30 border border-matcha-600/30 text-center mt-auto">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#078a52" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2"><polyline points="20 6 9 17 4 12" /></svg>
          <p className="text-matcha-800 font-semibold mb-1">Message sent</p>
          <p className="text-sm text-warm-charcoal">We'll reply within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-3 mt-auto">
          <input type="text" name="website" value={form.website} onChange={onChange} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} />
          <div className="grid sm:grid-cols-2 gap-3">
            <input type="text" name="name" value={form.name} onChange={onChange} required placeholder="Your name" className={input} />
            <input type="email" name="email" value={form.email} onChange={onChange} required placeholder="Work email" className={input} />
          </div>
          <input type="text" name="company" value={form.company} onChange={onChange} placeholder="Company (optional)" className={input} />
          <textarea name="message" value={form.message} onChange={onChange} required rows={3} placeholder="Use case, volume, timeline." className={`${input} h-auto py-2.5 resize-none`} />
          {status === 'error' && error && <p className="text-xs text-pomegranate-400 px-1">{error}</p>}
          <Button type="submit" disabled={status === 'sending'} className="w-full">
            {status === 'sending' ? 'Sending…' : 'Send enquiry'}
          </Button>
        </form>
      )}
    </div>
  )
}

export default function Pricing() {

  return (
    <section id="pricing" className="py-24 md:py-32 bg-oat-50/50 border-y border-oat">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          center
          eyebrow="Pricing"
          title={<>Stop paying per pixel.<br/><span className="italic text-ube-800">Stop paying per syllable.</span></>}
          subtitle="Start with a 7-day no-card trial for image + TTS. Creator adds image-to-image editing and video, with a 3-day Creator trial after Dodo mandate and limited-time $45/mo pricing if you keep it. No credits, no per-image fees; fair-use windows keep queues stable."
        />

        {/* 3-card grid. Identical content structure across all three:
              eyebrow → price/title → tagline → bullets → value chip → CTA
            All cards share the same flex-column rhythm so item-stretch
            produces a clean shared baseline. Creator gets the Clay-style
            ube-800 (lighter than ube-900) background + a top accent strip
            instead of an inflated scale — physical-toy depth comes from
            the offset Clay shadow on hover, not a transform. */}
        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">

          {/* ─── Pro $18 — entry / anchor (LEFT) ─────────────────────────── */}
          <RevealOnScroll className="h-full">
            <div className="relative h-full rounded-clay-feature bg-white border-2 border-black/90 shadow-clay p-8 flex flex-col">
              <div className="absolute top-6 right-6 px-2.5 py-1 rounded text-[0.62rem] font-bold uppercase tracking-[0.12em] bg-lemon-400 text-lemon-800">
                7-day free trial
              </div>

              <div className="mb-7">
                <div className="label-clay text-warm-silver mb-3">Pro</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[3.5rem] font-semibold tracking-tightest leading-none text-black">$18</span>
                  <span className="text-sm text-warm-silver">/month</span>
                </div>
                <div className="mt-2 text-[0.88rem] text-warm-charcoal">
                  Unlimited image &amp; TTS. <span className="text-warm-silver">Cancel anytime.</span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-6">
                {[
                  'Unlimited image generations',
                  'Pixel-perfect long text in images',
                  'Unlimited TTS · 600+ languages',
                  'Zero-shot voice cloning',
                  'Full REST API + agent skills',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[0.88rem] text-warm-charcoal">
                    <svg className="flex-shrink-0 mt-0.5 text-matcha-600" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Value chip — mirrors the Creator chip's structure so the two
                  cards share a visual rhythm. Filled-out emptiness wasn't the
                  problem — content imbalance was. */}
              <div className="mt-auto p-3.5 rounded-xl bg-cream border border-dashed border-oat flex items-start gap-2 mb-5">
                <span className="text-lg flex-shrink-0">⚡</span>
                <div className="text-[0.78rem] text-warm-charcoal leading-relaxed">
                  Replaces Nano Banana Pro + ElevenLabs — <span className="text-matcha-600 font-semibold">save $150–$220/mo</span> at equivalent usage.
                </div>
              </div>

              <button
                href={(DASHBOARD_URL + "/login/")}
                className="w-full h-11 inline-flex items-center justify-center gap-1.5 rounded-pill bg-white border-2 border-black text-black text-[0.92rem] font-semibold clay-hover"
              >
                Start free
              </button>
            </div>
          </RevealOnScroll>

          {/* ─── Creator $45 — RECOMMENDED (MIDDLE) ──────────────────────── */}
          <RevealOnScroll delay={0.06} className="h-full">
            <div
              id="pro_plus"
              className="relative h-full rounded-clay-feature bg-[#1a0a3d] text-white border-2 border-black shadow-clay p-8 flex flex-col overflow-hidden"
            >
              {/* Subtle inner highlight along the top edge — Clay's signature
                  inset-highlight shadow approach. Single tone (matcha at low
                  alpha), respects the rounded corners since it lives inside
                  the card's overflow-hidden bounds, not as a separate strip. */}
              <div className="absolute top-0 left-0 right-0 h-px bg-matcha-300/30" />

              <div className="absolute top-6 right-6 px-2.5 py-1 rounded text-[0.62rem] font-bold uppercase tracking-[0.12em] bg-matcha-300 text-matcha-800">
                Limited-time
              </div>

              <div className="mb-7">
                <div className="label-clay text-ube-300 mb-3">Creator</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[3.75rem] font-semibold tracking-tightest leading-none">$45</span>
                  <span className="text-sm text-ube-300">/month</span>
                </div>
                <div className="mt-2 text-[0.92rem] text-white">
                  Image editing + video <span className="text-ube-300">then limited-time $45/mo for full creative automation.</span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-6">
                {[
                  'Dedicated image-to-image editing API',
                  'Edit, combine, restyle, and refine source images',
                  'Unlimited text-to-video and image-to-video generation',
                  'Generated audio controls for video workflows',
                  'Unlimited AI image generation',
                  'Unlimited voice cloning and text-to-speech',
                  'Dedicated i2i_live and vid_live API keys',
                  'Automated agent workflows',
                  'Agent skills for repeat creative tasks',
                  'One platform for image editing, video, image, voice, and AI automation',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[0.9rem] text-white leading-snug">
                    <svg className="flex-shrink-0 mt-0.5 text-matcha-300" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-auto p-3.5 rounded-xl bg-white/[0.06] border border-dashed border-white/20 flex items-start gap-2 mb-5">
                <span className="text-lg flex-shrink-0">⚡</span>
                <div className="text-[0.78rem] text-ube-300 leading-relaxed">
                  Replace separate image editors, Veo 3, Seedance, ElevenLabs, Higgsfield, Gemini, image generators, voice tools, and agent workflow apps — <span className="text-matcha-300 font-semibold">all in one creator platform.</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  href={(DASHBOARD_URL + "/login/")}
                  className="w-full h-12 inline-flex items-center justify-center gap-1.5 rounded-pill bg-matcha-300 text-matcha-800 text-[0.95rem] font-bold clay-hover"
                >
                  Start Creator trial
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </button>
                <button
                  href={(DASHBOARD_URL + "/login/")}
                  className="w-full h-10 inline-flex items-center justify-center rounded-pill border border-white/25 bg-white/10 text-white text-[0.86rem] font-semibold hover:bg-white/15 transition-colors"
                >
                  Subscribe now — limited-time $45/mo
                </button>
              </div>
            </div>
          </RevealOnScroll>

          {/* ─── Enterprise — right ──────────────────────────────────────── */}
          <RevealOnScroll delay={0.12} className="h-full">
            <div className="h-full"><BusinessCard /></div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={0.15}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
            {[
              { service: 'Nano Banana Pro · 1,000 images', cost: '$134–$240', kind: 'out', detail: 'Metered by Gemini API ($0.134–$0.24/img)' },
              { service: 'Gathos · 1,000 images',           cost: '$18/mo',    kind: 'us',  detail: 'Unlimited. Generate 10,000 if you want.' },
              { service: 'ElevenLabs TTS + Cloning',        cost: '$22–$99',   kind: 'out', detail: 'Metered by character · 70+ languages' },
              { service: 'Gathos TTS + Cloning',            cost: '$18/mo',    kind: 'us',  detail: 'Unlimited · zero-shot · 600+ languages' },
              { service: 'Veo 3 / Seedance video stack',        cost: 'Usage-based', kind: 'out', detail: 'Separate video API, plus separate image and voice tools' },
              { service: 'Gathos Creator · image editing + video', cost: '$45/mo', kind: 'us', detail: 'Limited-time Creator pricing · i2i + video + Pro APIs' },
            ].map((c) => (
              <div key={c.service} className={`p-5 rounded-[24px] border-2 text-center ${c.kind === 'us' ? 'bg-white border-matcha-600' : 'bg-white border-black/90'}`}>
                <div className="label-clay text-warm-silver mb-2">{c.service}</div>
                <div className={`text-2xl font-semibold tracking-[-0.02em] ${c.kind === 'us' ? 'text-matcha-600' : 'text-pomegranate-400'}`}>{c.cost}</div>
                <div className="text-[0.72rem] text-warm-silver mt-1">{c.detail}</div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
