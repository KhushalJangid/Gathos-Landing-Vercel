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

`VITE_SHOWCASE_CDN_BASE_URL` optionally serves showcase media from a CDN. Local
assets are bundled in `public/showcase` by default. The original `gathos` project
remains available during migration; deploy this directory for the public site.
