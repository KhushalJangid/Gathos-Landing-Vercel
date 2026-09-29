import { SITE_URL } from '../lib/urls.js'
// Shared runtime <head> injection for SEO pages.
//
// SPA + no SSR means Googlebot/Bingbot/OAI-SearchBot execute JS and read
// the head after React mounts. The rules we enforce here:
//   - canonical URL per page (no duplicate-content penalty across slugs)
//   - OG + Twitter tags so links unfurl in Slack/X/LinkedIn
//   - JSON-LD schema blocks are keyed by an id so replacing them on route
//     change is cheap and leaves no stale blobs behind
//
// Every setXxx helper is idempotent: re-mount doesn't accumulate tags.

function stripTags(s) {
  return String(s || '').replace(/<[^>]+>/g, '').trim()
}

export function setMeta(name, content, isProperty = false) {
  if (content == null) return
  const attr = isProperty ? 'property' : 'name'
  let el = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', String(content))
}

export function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function setJsonLd(id, data) {
  removeJsonLd(id)
  const tag = document.createElement('script')
  tag.type = 'application/ld+json'
  tag.id = id
  tag.textContent = JSON.stringify(data)
  document.head.appendChild(tag)
}

export function removeJsonLd(id) {
  const existing = document.getElementById(id)
  if (existing) existing.remove()
}

// Convenience: set the full meta suite (title, description, OG, Twitter,
// canonical) for a page. Returns nothing. Safe to call on every mount.
export function setPageMeta({ title, description, url, image = 'https://assets.vividai.in/og-image.png', type = 'website' }) {
  document.title = stripTags(title)
  setMeta('description', description)
  setMeta('og:title', stripTags(title), true)
  setMeta('og:description', description, true)
  setMeta('og:type', type, true)
  setMeta('og:url', url, true)
  setMeta('og:image', image, true)
  setMeta('twitter:card', 'summary_large_image')
  setMeta('twitter:title', stripTags(title))
  setMeta('twitter:description', description)
  setMeta('twitter:image', image)
  setCanonical(url)
}

// JSON-LD builders.
//
// SoftwareApplication is the right schema for Gathos as a whole. We emit it
// on skill/compare/agent pages so they inherit the product's rich result
// eligibility. Keep offers synced with public pricing: Pro ($18) and
// Creator ($45, adds video).
export function softwareApplicationLd({ name = 'Gathos', description, url = (SITE_URL) } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description,
    url,
    offers: [
      {
        '@type': 'Offer',
        name: 'Pro',
        price: '18',
        priceCurrency: 'USD',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        description: 'Image generation and TTS APIs for AI agents.',
      },
      {
        '@type': 'Offer',
        name: 'Creator',
        price: '45',
        priceCurrency: 'USD',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        description: 'Everything in Pro plus text-to-video with generated audio.',
      },
    ],
    featureList: [
      'AI image generation API with readable text in images',
      'Text-to-speech and zero-shot voice cloning in 600+ languages',
      'Creator text-to-video API with generated audio and async polling',
      'Agent-native REST API for Claude Code, Cursor, Windsurf, Gemini CLI, and other coding agents',
    ],
    publisher: {
      '@type': 'Organization',
      name: 'Gathos',
      url: (SITE_URL),
      logo: 'https://assets.vividai.in/icon-512.png',
    },
  }
}

export function breadcrumbLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  }
}

export function faqLd(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: stripTags(f.q),
      acceptedAnswer: { '@type': 'Answer', text: stripTags(f.a) },
    })),
  }
}

export function articleLd({ title, description, url, datePublished, dateModified }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: stripTags(title),
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    author: { '@type': 'Organization', name: 'Gathos', url: (SITE_URL) },
    publisher: {
      '@type': 'Organization',
      name: 'Gathos',
      logo: { '@type': 'ImageObject', url: 'https://assets.vividai.in/icon-512.png' },
    },
    image: 'https://assets.vividai.in/og-image.png',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }
}
