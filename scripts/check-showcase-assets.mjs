import { access, readdir, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { loadEnv } from 'vite'
import { assetUrl, DEFAULT_ASSET_BASE_URL } from '../src/lib/assets.js'
import { IMAGE_RESULTS, VOICE_RESULTS, VIDEO_RESULTS } from '../src/showcase/data.js'

const root = new URL('../', import.meta.url)
const env = { ...loadEnv(process.env.NODE_ENV || 'production', fileURLToPath(root), ''), ...process.env }
const assetBase = (env.VITE_ASSET_BASE_URL || DEFAULT_ASSET_BASE_URL).replace(/\/+$/, '')
for (const base of [assetBase].filter(Boolean)) {
  if (!/^https?:\/\//.test(base)) throw new Error('Asset base URLs must be public HTTP(S) URLs.')
}
const assets = new Map()
const external = new Set()
const add = (path, owner) => {
  if (assetBase) {
    external.add(assetUrl(path, assetBase))
    return
  }
  if (!assets.has(path)) assets.set(path, new Set())
  assets.get(path).add(owner)
}

for (const item of [...IMAGE_RESULTS, ...VOICE_RESULTS, ...VIDEO_RESULTS]) {
  if (!item.ready) continue
  for (const path of [item.src, item.poster]) {
    if (path?.startsWith('/')) add(path, item.id)
  }
}

// Include hero, use-case cards, and inline media elsewhere in the frontend.
// The data module above handles entries marked ready; don't scan its comments.
async function scan(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const url = new URL(entry.name, directory)
    if (entry.isDirectory()) {
      await scan(new URL(`${entry.name}/`, directory))
    } else if (/\.(jsx|js)$/.test(entry.name) && !url.pathname.endsWith('/showcase/data.js')) {
      const source = await readFile(url, 'utf8')
      for (const match of source.matchAll(/["'`](\/showcase\/[^"'`\s]+\.(?:webp|avif|png|jpe?g|svg|mp4|webm|mp3|wav))["'`]/g)) {
        add(match[1], entry.name)
      }
      for (const match of source.matchAll(/usecaseAsset\(['"]([^'"]+)['"]\)/g)) {
        add(`/showcase/usecases/${match[1]}`, entry.name)
      }
    }
  }
}
await scan(new URL('src/', root))

const missing = []
for (const [path, owners] of assets) {
  try {
    await access(new URL(`public${path}`, root))
  } catch {
    missing.push(`${path} (${[...owners].join(', ')})`)
  }
}
if (external.size) {
  console.log(`${external.size} showcase assets use the configured CDN; remote availability is not checked.`)
}
if (missing.length) {
  throw new Error(`${missing.length} showcase assets missing from public/:\n${missing.join('\n')}`)
}
console.log(`All ${assets.size} local showcase media files exist, including hero and use-case media.`)
