// Prose primitives for blog post bodies. Keeping them in one file means
// every post inherits consistent typography (EB Garamond serif H2/H3,
// Plus Jakarta body) without needing per-post Tailwind classes.
//
// Each component is intentionally simple — wrap children, apply Clay-tuned
// classes, return. No logic.

import { Link } from 'react-router-dom'

export function Lead({ children }) {
  return (
    <p className="font-editorial text-[1.35rem] sm:text-[1.45rem] leading-[1.45] text-warm-charcoal italic mb-10 text-balance">
      {children}
    </p>
  )
}

export function H2({ children }) {
  return (
    <h2 className="font-editorial text-[1.85rem] sm:text-[2.1rem] tracking-[-0.02em] leading-[1.15] text-black mt-12 mb-4">
      {children}
    </h2>
  )
}

export function H3({ children }) {
  return (
    <h3 className="font-editorial text-[1.35rem] tracking-[-0.015em] leading-[1.2] text-black mt-8 mb-3">
      {children}
    </h3>
  )
}

export function P({ children }) {
  return (
    <p className="text-[1rem] leading-[1.7] text-warm-charcoal mb-5 [&_a]:text-matcha-800 [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-matcha-600/50 [&_a]:font-medium hover:[&_a]:text-black hover:[&_a]:decoration-black/50">
      {children}
    </p>
  )
}

// Inline link — used inside <P> children for contextual internal links
// to /compare/* and /skills/* pages. The Tailwind anchor styling on P
// covers most cases automatically; this component exists for explicit
// imports when the link sits outside a P (e.g. in a Quote attribution).
export function L({ to, children }) {
  return (
    <a href={to} className="text-matcha-800 underline underline-offset-2 decoration-matcha-600/50 font-medium hover:text-black hover:decoration-black/50">
      {children}
    </a>
  )
}

export function UL({ children }) {
  return (
    <ul className="space-y-2 mb-6 ml-1">
      {/* Children are <li> nodes; we wrap them with our marker pattern. */}
      {Array.isArray(children) ? children.map((c, i) =>
        <li key={i} className="flex gap-3 text-[0.98rem] leading-[1.65] text-warm-charcoal">
          <span className="mt-[10px] w-1.5 h-1.5 rounded-full bg-matcha-600 flex-shrink-0" />
          <span className="flex-1">{c.props?.children ?? c}</span>
        </li>
      ) : (
        <li className="flex gap-3 text-[0.98rem] leading-[1.65] text-warm-charcoal">
          <span className="mt-[10px] w-1.5 h-1.5 rounded-full bg-matcha-600 flex-shrink-0" />
          <span className="flex-1">{children.props?.children ?? children}</span>
        </li>
      )}
    </ul>
  )
}

export function Quote({ children }) {
  return (
    <blockquote className="my-8 pl-5 border-l-2 border-matcha-600">
      <p className="font-editorial italic text-[1.2rem] leading-[1.5] text-black">
        {children}
      </p>
    </blockquote>
  )
}

export function Code({ children, inline = false }) {
  if (inline) {
    return (
      <code className="font-mono text-[0.85em] px-1.5 py-0.5 rounded bg-oat-50 border border-oat text-black">
        {children}
      </code>
    )
  }
  return (
    <pre className="my-6 p-5 rounded-2xl bg-[#0E0E1A] border border-black/90 overflow-x-auto">
      <code className="font-mono text-[0.82rem] leading-[1.55] text-[#E8ECF4] whitespace-pre">
        {children}
      </code>
    </pre>
  )
}

export function CompareTable({ headers, rows }) {
  return (
    <div className="my-8 overflow-x-auto rounded-2xl border-2 border-black/90 bg-white">
      <table className="w-full text-[0.9rem] min-w-[640px]">
        <thead>
          <tr className="border-b border-oat">
            {headers.map((h, i) => (
              <th
                key={i}
                className={`text-left px-4 py-3 label-clay text-warm-silver font-semibold ${
                  i === 0 ? 'pl-5' : ''
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            // Highlight the row that mentions Gathos (always the brand row).
            const isUs = row.some((cell) => typeof cell === 'string' && /gathos/i.test(cell))
            return (
              <tr
                key={i}
                className={`${i % 2 ? 'bg-oat-50/30' : ''} ${
                  isUs ? '!bg-matcha-300/15' : ''
                }`}
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-4 py-3.5 text-[0.9rem] ${
                      j === 0
                        ? 'pl-5 font-semibold text-black'
                        : 'text-warm-charcoal'
                    } ${isUs && j === 0 ? 'text-matcha-800' : ''}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/**
 * Inline call-out card linking to a specific skill in the dashboard.
 * Used inside post bodies so readers can jump straight to install.
 */
export function CalloutSkill({ name, description, slug }) {
  return (
    <div className="my-8 p-5 rounded-2xl bg-matcha-300/15 border border-matcha-600/30">
      <div className="flex items-start gap-4 flex-col sm:flex-row">
        <div className="flex-1">
          <div className="text-[0.62rem] uppercase tracking-[0.14em] text-matcha-800 font-semibold mb-1">
            Agent skill
          </div>
          <h4 className="text-[1.05rem] font-semibold text-black mb-1">
            {name}
          </h4>
          <p className="text-sm text-warm-charcoal leading-[1.55]">
            {description}
          </p>
        </div>
        <Link
          to="https://dashboard.gathos.live/login/"
          className="flex-shrink-0 inline-flex items-center gap-1.5 h-9 px-4 rounded-pill bg-black text-white text-sm font-semibold whitespace-nowrap clay-hover"
        >
          Install
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
        </Link>
      </div>
      <div className="mt-3 font-mono text-[0.7rem] text-warm-silver">
        curl -sL https://gathos.com/skills/{slug}.md
      </div>
    </div>
  )
}

/**
 * Statistic callout — pulls a single specific number out of the prose
 * so it reads like an editorial pull-quote. Use for citation-friendly
 * facts that AI engines may surface.
 */
export function Stat({ value, label, source }) {
  return (
    <div className="my-8 p-6 rounded-2xl bg-cream border border-oat text-center">
      <div className="font-editorial text-4xl sm:text-5xl tracking-[-0.025em] text-matcha-800 italic mb-1">
        {value}
      </div>
      <div className="text-[0.92rem] text-warm-charcoal max-w-md mx-auto">
        {label}
      </div>
      {source && (
        <div className="text-[0.7rem] text-warm-silver mt-2 font-mono">
          {source}
        </div>
      )}
    </div>
  )
}

/**
 * FAQ block — renders an accordion-styled list and exposes the same
 * Q/A pairs to BlogPost.jsx via the `__faqs` static field on the body
 * function (set in posts.jsx). The page-level emit becomes FAQPage
 * JSON-LD which makes the post eligible for Google rich results and
 * AI answer-engine citation.
 */
export function FAQ({ items }) {
  return (
    <div className="my-12 not-prose">
      <h2 className="font-editorial text-[1.85rem] tracking-[-0.02em] text-black mb-6">
        Frequently asked questions
      </h2>
      <div className="rounded-2xl border-2 border-black/90 bg-white divide-y divide-oat overflow-hidden">
        {items.map((item, i) => (
          <details key={i} className="group">
            <summary className="cursor-pointer px-5 py-4 flex items-start justify-between gap-4 hover:bg-oat-50/60 transition-colors list-none">
              <span className="font-semibold text-black text-[0.98rem] leading-[1.45]">
                {item.q}
              </span>
              <span className="text-warm-silver mt-0.5 transition-transform group-open:rotate-45 text-xl leading-none">
                +
              </span>
            </summary>
            <div className="px-5 pb-5 text-[0.95rem] text-warm-charcoal leading-[1.65]">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}

/**
 * Closing CTA — same shape across every post so the page feels authored
 * by one hand. Two pills: primary (start trial), secondary (browse blog).
 */
export function CTAFooter() {
  return (
    <div className="mt-16 pt-10 border-t border-oat">
      <div className="text-center">
        <h3 className="font-editorial text-2xl text-black mb-2">
          Try Gathos for <span className="italic text-matcha-800">7 days, free.</span>
        </h3>
        <p className="text-warm-charcoal mb-6 max-w-md mx-auto leading-[1.6]">
          Two APIs, one flat price after the trial. No credit card to start.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <a
            href="https://dashboard.gathos.live/login/"
            className="inline-flex items-center gap-1.5 h-11 px-6 rounded-pill bg-lavender text-black border-2 border-black/90 font-semibold clay-hover clay-hover-bold"
          >
            Start free
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
          </a>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 h-11 px-6 rounded-pill bg-white text-black border-2 border-black/90 font-semibold clay-hover"
          >
            More posts
          </Link>
        </div>
      </div>
    </div>
  )
}
