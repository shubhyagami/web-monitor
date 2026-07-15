const WEBSITES_KEY = 'websites'
const HISTORY_KEY = 'history'

export function getWebsites() {
  try {
    return JSON.parse(localStorage.getItem(WEBSITES_KEY) || '[]')
  } catch {
    return []
  }
}

export function setWebsites(websites) {
  localStorage.setItem(WEBSITES_KEY, JSON.stringify(websites))
}

export function addWebsite(url) {
  const websites = getWebsites()
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
  websites.push({ id, url, active: true, addedAt: new Date().toISOString() })
  setWebsites(websites)
  return websites
}

export function removeWebsite(id) {
  const websites = getWebsites().filter(w => w.id !== id)
  setWebsites(websites)
  return websites
}

export function toggleWebsite(id) {
  const websites = getWebsites().map(w =>
    w.id === id ? { ...w, active: !w.active } : w
  )
  setWebsites(websites)
  return websites
}

export function updateWebsiteStatus(id, statusData) {
  const websites = getWebsites().map(w =>
    w.id === id
      ? { ...w, lastStatus: statusData.status, lastStatusCode: statusData.statusCode, lastLatency: statusData.latency, lastChecked: statusData.timestamp }
      : w
  )
  setWebsites(websites)

  const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
  history.push({ websiteId: id, ...statusData })
  if (history.length > 1000) history.splice(0, history.length - 1000)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))

  return websites
}

export function getHistory(websiteId, limit = 50) {
  const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
  return history.filter(h => h.websiteId === websiteId).slice(-limit)
}