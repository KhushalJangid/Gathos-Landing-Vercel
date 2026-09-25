const apiOrigin = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')

export function publicFetch(path, options) {
  return fetch(`${apiOrigin}${path}`, options)
}
