# Gathos landing

Standalone React/Vite project extracted from `../gathos`. Includes the marketing
homepage, blog, SEO pages, calculators, legal pages, and showcase assets. Sign-in,
free-trial, and paid-plan CTAs go to https://dashboard.gathos.live/login/.
Legacy `/login`, `/signup`, `/dashboard`, and `/business/checkout` paths also redirect
there. Authentication and billing are owned by the separate dashboard project.

## Development

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Vite serves the site on port 5173 and proxies `/api` to the existing Python backend
on port 8000. Override `API_PROXY_TARGET` to use another backend.

```sh
npm run lint
npm run build
npm run preview
```

## Deployment

Build from this directory and publish `dist/`. Configure the static host to serve
`index.html` for frontend routes (including nested blog and SEO URLs). Route `/api/*`
to the backend before the SPA fallback: newsletter, contact, dynamic content, and
data-deletion status use these public endpoints. The frontend does not need the
legacy `gathos/server` or Supabase/auth environment variables.

Alternatively set `VITE_API_BASE_URL` to the public backend origin at build time
and allow the landing origin in backend CORS. The Vite proxy is development-only;
`npm run preview` also requires a reachable `VITE_API_BASE_URL` for API features.
For an up-to-date sitemap including generated content, proxy `/sitemap.xml` to the
backend; a static sitemap is included as a fallback.

Public images, posters, audio, and videos use `https://assets.vividai.in` by
default, preserving paths such as `/showcase/usecases/videos/final_podcast.mp4`.
The hero deck, use-case cards, results gallery, logos, favicons, and social preview
images all use this host. No R2 credentials are exposed to the frontend.
`VITE_ASSET_BASE_URL` optionally overrides the runtime media base at build time;
static favicon, manifest icon, and social-preview URLs use the production host.
The manifest, service worker, and application bundles remain on the site origin.

## Public forms and affiliates

- Newsletter: `POST /api/newsletter/subscribe` saves the address through the
  backend's audience service in the `newsletter` program. This endpoint captures
  subscriptions; it does not itself send a newsletter.
- Business enquiry: `POST /api/contact/` validates the message and emails
  `CONTACT_INBOX` (default `hello@gathos.com`) with the sender as Reply-To.
  The backend needs working SMTP settings. This endpoint does not store an enquiry
  record or start checkout.
- Affiliates: the partner CTA links to `https://affiliate.gathos.com`, which must
  be hosted separately. This landing project does not include the affiliate portal
  or capture `?ref=` attribution. The backend has affiliate endpoints and reads a
  `gathos_ref` cookie during signup, but cross-domain referral handoff to
  `dashboard.gathos.live` is not implemented here. A cookie on `gathos.com` cannot
  provide that handoff to `gathos.live`.

The forms require the production API routing described above; deploying only the
static files does not deploy these services. Both forms require an explicit
`{ "ok": true }` backend response before displaying success.

`npm run check:assets` inventories the showcase media. CDN files do not need to
exist locally; remote availability is checked separately from the build. The old
`VITE_SHOWCASE_CDN_BASE_URL` setting is no longer used.
