import { publicFetch } from '../lib/public-api.js'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const STORAGE_KEY = 'gathos_newsletter_v1'

export default function NewsletterPopup() {
  const [visible, setVisible]   = useState(false)
  const [email, setEmail]       = useState('')
  const [status, setStatus]     = useState('idle') // idle | loading | success | error
  const [errMsg, setErrMsg]     = useState('')
  const timerRef                = useRef(null)
  const scrollListenerRef       = useRef(null)

  useEffect(() => {
    // Don't show if already subscribed or dismissed in this browser
    if (localStorage.getItem(STORAGE_KEY)) return

    const show = () => {
      if (visible) return
      setVisible(true)
      cleanup()
    }

    const cleanup = () => {
      clearTimeout(timerRef.current)
      if (scrollListenerRef.current) {
        window.removeEventListener('scroll', scrollListenerRef.current)
      }
    }

    // Trigger 1: 10-second timer
    timerRef.current = setTimeout(show, 10_000)

    // Trigger 2: user scrolls past 50% of the page
    scrollListenerRef.current = () => {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      if (scrolled >= 0.5) show()
    }
    window.addEventListener('scroll', scrollListenerRef.current, { passive: true })

    return cleanup
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, 'dismissed')
    setVisible(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrMsg('')
    try {
      const res = await publicFetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'popup' }),
      })
      const data = await res.json()
      if (!res.ok || data.ok !== true) {
        setErrMsg(data.error || 'Something went wrong.')
        setStatus('error')
        return
      }
      setStatus('success')
      localStorage.setItem(STORAGE_KEY, 'subscribed')
      setTimeout(() => setVisible(false), 2800)
    } catch {
      setErrMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[900]"
            onClick={dismiss}
          />

          {/* Card — flex wrapper handles centering + mobile side padding */}
          <div className="fixed inset-0 z-[901] flex items-center justify-center px-4 pointer-events-none">
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md pointer-events-auto"
          >
            <div className="relative bg-white border-2 border-black/90 rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9)]">
              {/* Close */}
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-warm-charcoal hover:bg-oat transition-colors"
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>

              {status === 'success' ? (
                <div className="text-center py-4">
                  <div className="w-12 h-12 rounded-full bg-matcha-100 flex items-center justify-center mx-auto mb-4">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-matcha-700">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <p className="font-editorial text-xl text-black mb-1">You&rsquo;re in!</p>
                  <p className="text-sm text-warm-charcoal">We&rsquo;ll keep you posted on new features and updates.</p>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-lavender border border-black/10 text-xs font-medium text-warm-charcoal mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-matcha-600" style={{ animation: 'pulse-dot 2s ease-in-out infinite' }} />
                      Newsletter
                    </div>
                    <h2 className="font-editorial text-2xl text-black leading-tight mb-2">
                      Stay ahead of the curve
                    </h2>
                    <p className="text-sm text-warm-charcoal leading-relaxed">
                      Get tips on AI agent workflows, new API features, and early access to what&rsquo;s shipping next at Gathos — straight to your inbox.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    {/* Honeypot */}
                    <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      disabled={status === 'loading'}
                      className="h-11 px-4 rounded-xl border-2 border-black/20 bg-oat/40 text-sm text-black placeholder:text-warm-silver focus:outline-none focus:border-black/70 transition-colors disabled:opacity-60"
                    />

                    {errMsg && (
                      <p className="text-xs text-red-600">{errMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="h-11 px-6 rounded-xl bg-lavender text-black border-2 border-black/90 text-sm font-medium clay-hover disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
                    >
                      {status === 'loading' ? 'Subscribing…' : 'Subscribe — it\'s free'}
                    </button>

                    <p className="text-center text-[0.7rem] text-warm-silver">
                      No spam, ever. Unsubscribe anytime.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
