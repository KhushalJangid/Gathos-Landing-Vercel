import { SITE_URL } from '../lib/urls.js'
import { publicFetch } from '../lib/public-api.js'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { posts as staticPosts } from '../blog/posts.jsx'

const accentBadge = {
  matcha:      'bg-matcha-300/40 text-matcha-800',
  lemon:       'bg-lemon-400/45 text-lemon-800',
  slushie:     'bg-slushie-500/25 text-slushie-800',
  pomegranate: 'bg-pomegranate-400/25 text-pomegranate-400',
  ube:         'bg-ube-300/45 text-ube-800',
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

/**
 * Blog index — Clay-themed list of all posts. Sets <title> and meta
 * description on mount so this page indexes well even without SSR.
 */
export default function BlogIndex() {
  // Dynamic posts are admin-generated content (see /admin Content
  // Generator tab). Merged with static posts at render. Static posts
  // are bundled in code; dynamic posts come from the API. Static wins
  // any slug collision.
  const [dynamicPosts, setDynamicPosts] = useState([])
  useEffect(() => {
    let cancelled = false
    publicFetch('/api/blog/dynamic')
      .then((r) => (r.ok ? r.json() : { posts: [] }))
      .then((j) => { if (!cancelled) setDynamicPosts(j.posts || []) })
      .catch(() => { if (!cancelled) setDynamicPosts([]) })
    return () => { cancelled = true }
  }, [])

  // Merge: static first (canonical), append dynamic posts whose slug
  // isn't already taken. Sort by publishedAt desc.
  const staticSlugs = new Set(staticPosts.map((p) => p.slug))
  const merged = [
    ...staticPosts,
    ...dynamicPosts.filter((p) => p.slug && !staticSlugs.has(p.slug)),
  ].sort((a, b) => String(b.publishedAt || '').localeCompare(String(a.publishedAt || '')))

  useEffect(() => {
    document.title = 'Gathos · Blog — AI image, voice, and video APIs'
    setMeta('description', 'Use cases and engineering notes from Gathos: AI image generation, zero-shot voice cloning, Creator video generation, and agent skills for Claude Code, Cursor, Windsurf, and Gemini CLI.')
    setMeta('og:title', 'Gathos · Blog', true)
    setMeta('og:description', 'Use cases and engineering notes from the team building agent-native image, TTS, and Creator video APIs.', true)
    setMeta('og:type', 'website', true)
    setMeta('og:url', (SITE_URL + "/blog"), true)
    setCanonical((SITE_URL + "/blog"))
  }, [])

  return (
    <div className="bg-cream min-h-screen">
      <Navbar />

      <header className="pt-32 pb-16 md:pt-36 md:pb-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-block px-3 py-1 rounded-pill bg-white border border-oat text-warm-charcoal text-xs font-medium mb-6">
            Blog
          </div>
          <h1 className="font-editorial text-[clamp(2.4rem,6vw,4rem)] tracking-[-0.025em] leading-[1.04] text-black mb-5">
            Notes from the team building
            <br />
            <span className="italic text-matcha-800">agent-native APIs.</span>
          </h1>
          <p className="text-warm-charcoal text-[1.05rem] leading-[1.6] max-w-xl mx-auto">
            Use-case walkthroughs, comparisons with the alternatives, and the
            engineering choices behind Gathos.
          </p>
        </div>
      </header>

      <section className="pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {merged.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="group h-full p-7 rounded-[28px] bg-white border-2 border-black/90 flex flex-col transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className={`inline-block px-2.5 py-1 rounded text-[0.62rem] font-bold uppercase tracking-[0.12em] ${accentBadge[p.accent] || accentBadge.matcha}`}>
                    {p.eyebrow}
                  </span>
                  <span className="text-[0.72rem] text-warm-silver font-mono">
                    {formatDate(p.publishedAt)} · {p.readMinutes} min
                  </span>
                </div>
                <h2 className="font-editorial text-[1.5rem] sm:text-[1.65rem] leading-[1.15] tracking-[-0.018em] text-black mb-3 group-hover:text-matcha-800 transition-colors">
                  {p.title}
                </h2>
                <p className="text-[0.95rem] text-warm-charcoal leading-[1.6] mb-5 flex-1">
                  {p.summary}
                </p>
                <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-matcha-800">
                  Read post
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

// ─────────────────────────────────────────────────────────────────────────
// helpers — set meta tags imperatively. SPA so we can't use SSR; this
// at least populates head correctly at runtime for crawlers that execute JS
// (Googlebot does; OAI-SearchBot does not — but the static noscript content
// in index.html still serves the brand info those crawlers need).
// ─────────────────────────────────────────────────────────────────────────

function setMeta(name, content, isProperty = false) {
  const attr = isProperty ? 'property' : 'name'
  let el = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}
