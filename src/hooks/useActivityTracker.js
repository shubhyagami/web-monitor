import { useState, useEffect, useRef, useCallback } from 'react'

export function useActivityTracker(timeoutMs = 10 * 60 * 1000) {
  const [lastActiveTime, setLastActiveTime] = useState(Date.now())
  const [isInactive, setIsInactive] = useState(false)
  const lastRef = useRef(Date.now())

  const handler = useCallback(() => {
    const now = Date.now()
    lastRef.current = now
    setLastActiveTime(now)
    if (isInactive) setIsInactive(false)
  }, [isInactive])

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'scroll', 'touchstart', 'click']
    events.forEach(e => document.addEventListener(e, handler, { passive: true }))

    const id = setInterval(() => {
      if (Date.now() - lastRef.current > timeoutMs) {
        setIsInactive(true)
      }
    }, 1000)

    return () => {
      events.forEach(e => document.removeEventListener(e, handler))
      clearInterval(id)
    }
  }, [handler, timeoutMs])

  return { isInactive, lastActiveTime }
}
