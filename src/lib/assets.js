// Public media retains its original path within the R2 bucket.
export const DEFAULT_ASSET_BASE_URL = 'https://assets.vividai.in'

export function assetUrl(path, base = import.meta.env?.VITE_ASSET_BASE_URL || DEFAULT_ASSET_BASE_URL) {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return path
  return `${base.replace(/\/+$/, '')}${path}`
}

export function usecaseAsset(path) {
  const clean = path.replace(/^\/+/, '').replace(/^showcase\/usecases\//, '')
  return assetUrl(`/showcase/usecases/${clean}`)
}
