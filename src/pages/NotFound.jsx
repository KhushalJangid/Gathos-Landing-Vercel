import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { setPageMeta } from '../seo/head.js'

/**
 * 404 page.
 *
 * SEO note: we set a <meta name="robots" content="noindex"> so Google does
 * not index the 404 body. We also signal 404 status to client-side tooling
 * via <meta name="prerender-status-code" content="404">, which static-site
 * renderers (react-snap, prerender.io) pick up to tag the page correctly.
 *
 * We do NOT hard-redirect — sending a 200 with useful content inside the
 * 404 layout keeps users on the site (the MEDIUM issue the SEO report
 * flagged). Links below are the top destinations from the failing URL.
 */
export default function NotFound() {
  useEffect(() => {
    setPageMeta({
      title: 'Page not found · Gathos',
      description: 'The page you were looking for does not exist. Browse skills, comparisons, or start your 7-day free trial of Gathos.',
      url: 'https://gathos.com/404',
    })
    let robots = document.head.querySelector('meta[name="robots"]')
    const prev = robots?.getAttribute('content') || null
    if (!robots) {
      robots = document.createElement('meta')
      robots.setAttribute('name', 'robots')
      document.head.appendChild(robots)
    }
    robots.setAttribute('content', 'noindex, follow')

    let status = document.head.querySelector('meta[name="prerender-status-code"]')
    if (!status) {
      status = document.createElement('meta')
      status.setAttribute('name', 'prerender-status-code')
      document.head.appendChild(status)
    }
    status.setAttribute('content', '404')

    return () => {
      // Restore index,follow when user navigates away
      if (robots) robots.setAttribute('content', prev || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
      status?.remove()
    }
  }, [])

  const popular = [
    { label: 'Start 7-day free trial', href: 'https://dashboard.gathos.live/login/', accent: 'bg-lavender' },
    { label: 'Gathos vs ElevenLabs', href: '/compare/gathos-vs-elevenlabs', accent: 'bg-white' },
    { label: 'Gathos vs Midjourney', href: '/compare/gathos-vs-midjourney-api', accent: 'bg-white' },
    { label: 'For Claude Code', href: '/for/claude-code', accent: 'bg-white' },
    { label: 'Read the blog', href: '/blog', accent: 'bg-white' },
  ]

  return (
    <div className="bg-cream min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <div className="font-editorial text-[clamp(5rem,16vw,9rem)] italic text-matcha-800 leading-none mb-4 tracking-[-0.03em]">
            404
          </div>
          <h1 className="font-editorial text-[clamp(1.8rem,4vw,2.6rem)] tracking-[-0.025em] text-black mb-4">
            This page went for a walk and didn't come back.
          </h1>
          <p className="text-warm-charcoal text-[1.05rem] leading-[1.6] max-w-[48ch] mx-auto mb-10">
            The URL is probably misspelled, moved, or part of something we haven't shipped yet. Here's where most people go next.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap mb-10">
            {popular.map((p) => (
              <Link
                key={p.href}
                to={p.href}
                className={`inline-flex items-center gap-1.5 h-11 px-5 rounded-pill ${p.accent} text-black border-2 border-black/90 font-semibold clay-hover ${p.accent === 'bg-lavender' ? 'clay-hover-bold' : ''}`}
              >
                {p.label}
              </Link>
            ))}
          </div>

          <div className="text-sm text-warm-silver">
            Or go back to <Link to="/" className="text-matcha-800 font-semibold hover:underline">the homepage</Link>.
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
