import { DASHBOARD_HOST, DASHBOARD_URL, SITE_HOST } from '../lib/urls.js'
import { publicFetch } from '../lib/public-api.js'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const EMAIL = 'privacy@gathos.com'

function PageShell({ title, children }) {
  return (
    <div className="min-h-screen relative z-1 bg-cream text-black">
      <header className="border-b border-oat bg-white">
        <div className="max-w-[900px] mx-auto px-6 py-5 flex items-center justify-between">
          <a href="/" className="font-logo text-2xl tracking-[-0.03em] italic text-black">Gathos</a>
          <a href="/" className="text-sm text-warm-charcoal hover:text-black transition-colors">Back to home</a>
        </div>
      </header>
      <main className="max-w-[900px] mx-auto px-6 py-12">
        <h1 className="font-logo text-[2.5rem] leading-tight text-black mb-2">{title}</h1>
        {children}
      </main>
    </div>
  )
}

// /data-deletion — public instructions page submitted to Meta as the
// "User Data Deletion Instructions URL". Reviewers visit it directly,
// must reach 200 unauthenticated, and must clearly explain how a user
// can have their Meta-related data removed.
export default function DataDeletion() {
  return (
    <PageShell title="User Data Deletion">
      <p className="text-warm-charcoal text-base leading-relaxed mb-8">
        Gathos ({SITE_HOST} and social.gathos.com) lets you connect your
        Facebook Pages and Instagram Business accounts so that posts
        you create in our platform can be published on your behalf.
        This page explains exactly what data we store from those
        connections and how to remove it.
      </p>

      <section className="rounded-xl border border-oat bg-white p-6 mb-8">
        <h2 className="text-xl font-semibold mb-3">What we store from Meta</h2>
        <ul className="list-disc list-inside space-y-2 text-warm-charcoal">
          <li>Your Meta user ID (so we know which connected account belongs to you)</li>
          <li>Encrypted access tokens for the Facebook Pages and Instagram Business accounts you authorize</li>
          <li>Cached Page IDs, Instagram Business account IDs, and account display names</li>
          <li>Posts you scheduled or published through Gathos (caption, generated image, target account, status)</li>
        </ul>
        <p className="text-warm-charcoal mt-4">
          We do not store your Meta password, your friend list, your audience, or any data Meta does not return through the Pages API and Instagram Graph API scopes you grant us.
        </p>
      </section>

      <section className="rounded-xl border border-oat bg-white p-6 mb-8">
        <h2 className="text-xl font-semibold mb-3">Option 1 — Disconnect from inside Gathos</h2>
        <ol className="list-decimal list-inside space-y-2 text-warm-charcoal">
          <li>Sign in at <a href="https://social.gathos.com" className="text-black underline">social.gathos.com</a></li>
          <li>Go to <strong>Settings → Connected accounts</strong></li>
          <li>Click <strong>Disconnect</strong> next to Facebook and/or Instagram</li>
        </ol>
        <p className="text-warm-charcoal mt-4">
          Disconnecting immediately revokes the access token with Meta and deletes the encrypted token, cached Page/IG IDs, and account metadata from our database. Posts you already published remain on your social accounts (we do not control those once published) but are removed from your Gathos history.
        </p>
      </section>

      <section className="rounded-xl border border-oat bg-white p-6 mb-8">
        <h2 className="text-xl font-semibold mb-3">Option 2 — Remove the app from Facebook</h2>
        <ol className="list-decimal list-inside space-y-2 text-warm-charcoal">
          <li>Open <a href="https://www.facebook.com/settings?tab=business_tools" className="text-black underline" target="_blank" rel="noopener noreferrer">facebook.com/settings → Business Integrations</a></li>
          <li>Find <strong>Gathos</strong> in the list</li>
          <li>Click <strong>Remove</strong></li>
        </ol>
        <p className="text-warm-charcoal mt-4">
          Facebook will notify our servers automatically. We delete the corresponding Meta access tokens and connected-account records from our database and return a confirmation code you can verify at <a href="/data-deletion/status" className="text-black underline">/data-deletion/status</a>.
        </p>
      </section>

      <section className="rounded-xl border border-oat bg-white p-6 mb-8">
        <h2 className="text-xl font-semibold mb-3">Option 3 — Delete your entire Gathos account</h2>
        <ol className="list-decimal list-inside space-y-2 text-warm-charcoal">
          <li>Sign in at <a href={(DASHBOARD_URL + "/")} className="text-black underline">{DASHBOARD_HOST}</a> or <a href="https://social.gathos.com" className="text-black underline">social.gathos.com</a></li>
          <li>Go to <strong>Settings → Account → Delete account</strong></li>
          <li>Or email <a href={`mailto:${EMAIL}`} className="text-black underline">{EMAIL}</a> from the address on your account</li>
        </ol>
        <p className="text-warm-charcoal mt-4">
          We delete all account data — including any Meta tokens, connected accounts, generated content, and billing records we are not legally required to retain — within seven days.
        </p>
      </section>

      <section className="rounded-xl border border-oat bg-white p-6 mb-8">
        <h2 className="text-xl font-semibold mb-3">Retention</h2>
        <ul className="list-disc list-inside space-y-2 text-warm-charcoal">
          <li>Meta access tokens and connected-account rows: deleted immediately on disconnect or app removal</li>
          <li>Generated images stored in our object storage: deleted immediately on disconnect</li>
          <li>Application logs that may include a Meta user ID: rotated out within 30 days</li>
          <li>Billing records (legal requirement): retained for the period required by Indian tax law, then deleted</li>
        </ul>
      </section>

      <section className="rounded-xl border border-oat bg-white p-6 mb-8">
        <h2 className="text-xl font-semibold mb-3">Contact</h2>
        <p className="text-warm-charcoal">
          Questions or proof-of-deletion requests: <a href={`mailto:${EMAIL}`} className="text-black underline">{EMAIL}</a>. We respond within two business days.
        </p>
      </section>

      <p className="text-sm text-warm-silver">
        This page is the user data deletion instructions URL referenced in our Meta App Review submission. See also our <a href="/legal?tab=privacy" className="underline">Privacy Policy</a> and <a href="/legal?tab=terms" className="underline">Terms of Service</a>.
      </p>
    </PageShell>
  )
}

// /data-deletion/status — confirmation page that Meta's deletion callback
// returns to the user. Looks up the row by code via the Express endpoint
// and reports pending / completed / failed.
export function DataDeletionStatus() {
  const [params] = useSearchParams()
  const code = params.get('code')
  const [state, setState] = useState({ kind: code ? 'loading' : 'no-code' })

  useEffect(() => {
    if (!code) return
    let cancelled = false
    publicFetch(`/api/meta/data-deletion/status?code=${encodeURIComponent(code)}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(r.status === 404 ? 'not-found' : 'error')
        return r.json()
      })
      .then((data) => { if (!cancelled) setState({ kind: 'ok', data }) })
      .catch((err) => { if (!cancelled) setState({ kind: 'error', message: err.message }) })
    return () => { cancelled = true }
  }, [code])

  return (
    <PageShell title="Data deletion status">
      {state.kind === 'no-code' && (
        <div className="rounded-xl border border-oat bg-white p-6">
          <p className="text-warm-charcoal">
            This page confirms a data deletion request after Meta sends us a removal callback. You'll usually arrive here with a confirmation code in the URL. If you want to start a new deletion, see the <a href="/data-deletion" className="text-black underline">User Data Deletion</a> page.
          </p>
        </div>
      )}

      {state.kind === 'loading' && (
        <div className="rounded-xl border border-oat bg-white p-6 text-warm-charcoal">
          Looking up your request…
        </div>
      )}

      {state.kind === 'error' && (
        <div className="rounded-xl border border-oat bg-white p-6">
          <p className="text-warm-charcoal mb-2">
            {state.message === 'not-found'
              ? 'We could not find a deletion request with that confirmation code.'
              : 'Something went wrong looking up your request.'}
          </p>
          <p className="text-warm-charcoal">
            If you believe this is an error, email <a href={`mailto:${EMAIL}`} className="text-black underline">{EMAIL}</a> with your confirmation code.
          </p>
        </div>
      )}

      {state.kind === 'ok' && (
        <div className="rounded-xl border border-oat bg-white p-6 space-y-3">
          <Field label="Confirmation code" value={state.data.confirmation_code} mono />
          <Field label="Status" value={renderStatus(state.data.status)} />
          <Field label="Requested" value={fmt(state.data.requested_at)} />
          {state.data.completed_at && (
            <Field label="Completed" value={fmt(state.data.completed_at)} />
          )}
          <p className="text-sm text-warm-silver pt-3">
            {state.data.status === 'completed' && 'All Meta-related data linked to this account has been removed from our systems.'}
            {state.data.status === 'pending' && 'We have received your request and the deletion is in progress. This page will reflect completion once finished — typically within a few minutes.'}
            {state.data.status === 'failed' && (
              <>The automated deletion did not finish cleanly. We have been notified and will complete it manually. Email <a href={`mailto:${EMAIL}`} className="underline">{EMAIL}</a> for an immediate update.</>
            )}
          </p>
        </div>
      )}
    </PageShell>
  )
}

function Field({ label, value, mono }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
      <span className="text-sm text-warm-silver sm:w-40 shrink-0">{label}</span>
      <span className={`text-sm text-black ${mono ? 'font-mono break-all' : ''}`}>{value}</span>
    </div>
  )
}

function renderStatus(s) {
  if (s === 'completed') return 'Completed'
  if (s === 'pending') return 'Pending'
  if (s === 'failed') return 'Failed (manual follow-up)'
  return s
}

function fmt(iso) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' })
  } catch { return iso }
}
