import { useState, useEffect, useCallback, useRef } from 'react'
import { getWebsites, addWebsite, removeWebsite, toggleWebsite, updateWebsiteStatus } from '../utils/storage'

export function useWebsiteMonitor() {
  const [websites, setWebsites] = useState(() => getWebsites())
  const [checking, setChecking] = useState(new Set())
  const intervalRef = useRef(null)

  const refresh = useCallback(() => {
    setWebsites(getWebsites())
  }, [])

  const add = useCallback((url) => {
    const updated = addWebsite(url)
    setWebsites([...updated])
  }, [])

  const remove = useCallback((id) => {
    const updated = removeWebsite(id)
    setWebsites([...updated])
  }, [])

  const toggle = useCallback((id) => {
    const updated = toggleWebsite(id)
    setWebsites([...updated])
  }, [])

  const checkWebsite = useCallback(async (website) => {
    setChecking(prev => new Set(prev).add(website.id))
    try {
      const res = await fetch(`/api/check?url=${encodeURIComponent(website.url)}`)
      const data = await res.json()
      updateWebsiteStatus(website.id, data)
    } catch {
      updateWebsiteStatus(website.id, {
        status: 'down', statusCode: 0, latency: 0, timestamp: new Date().toISOString()
      })
    }
    setChecking(prev => {
      const next = new Set(prev)
      next.delete(website.id)
      return next
    })
    refresh()
  }, [refresh])

  const checkAll = useCallback(async () => {
    const active = getWebsites().filter(w => w.active)
    for (const website of active) {
      await checkWebsite(website)
    }
  }, [checkWebsite])

  useEffect(() => {
    checkAll()
    intervalRef.current = setInterval(checkAll, 5 * 60 * 1000)
    return () => clearInterval(intervalRef.current)
  }, [checkAll])

  return { websites, checking, add, remove, toggle, checkWebsite, checkAll, refresh }
}