const STORAGE_KEY = 'uptime-sites'

export function loadWebsites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveWebsites(sites) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sites))
}
