import { useState, useEffect, useRef, useCallback } from 'react'

export function useWebsiteMonitor(websites) {
  const [statuses, setStatuses] = useState({})
  const [offline, setOffline] = useState(!navigator.onLine)
  const websitesRef = useRef(websites)
  const checkedRef = useRef(new Set())
  websitesRef.current = websites

  useEffect(() => {
    const goOnline = () => setOffline(false)
    const goOffline = () => setOffline(true)
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  const checkSite = useCallback(async (url) => {
    try {
      const res = await fetch(`/api/check?url=${encodeURIComponent(url)}`)
      const data = await res.json()
      const isUp = data.statusCode >= 200 && data.statusCode < 400
      setStatuses(prev => ({
        ...prev,
        [url]: {
          status: data.statusCode ? (isUp ? 'up' : 'down') : 'unreachable',
          statusCode: data.statusCode,
          responseTimeMs: data.responseTimeMs,
          lastChecked: Date.now(),
          loading: false,
        },
      }))
    } catch {
      setStatuses(prev => ({
        ...prev,
        [url]: {
          status: 'unreachable',
          statusCode: null,
          responseTimeMs: null,
          lastChecked: Date.now(),
          loading: false,
        },
      }))
    }
  }, [])

  useEffect(() => {
    const urls = websites.map(w => w.url)

    urls.forEach(url => {
      if (!checkedRef.current.has(url)) {
        checkedRef.current.add(url)
        setStatuses(prev => ({ ...prev, [url]: { status: 'checking', loading: true } }))
        checkSite(url)
      }
    })

    for (const url of checkedRef.current) {
      if (!urls.includes(url)) checkedRef.current.delete(url)
    }

    setStatuses(prev => {
      const next = {}
      for (const [k, v] of Object.entries(prev)) {
        if (urls.includes(k)) next[k] = v
      }
      return next
    })
  }, [websites, checkSite])

  useEffect(() => {
    if (websites.length === 0) return
    const id = setInterval(() => {
      websitesRef.current.forEach(w => checkSite(w.url))
    }, 5 * 60 * 1000)
    return () => clearInterval(id)
  }, [checkSite, websites.length])

  const refreshSite = useCallback((url) => {
    setStatuses(prev => ({ ...prev, [url]: { ...prev[url], loading: true } }))
    checkSite(url)
  }, [checkSite])

  return { statuses, refreshSite, offline }
}
