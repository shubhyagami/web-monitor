import { useState, useEffect, useRef } from 'react'

export function useActivityTracker(timeoutMs = 10 * 60 * 1000) {
  const [inactive, setInactive] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    const reset = () => {
      setInactive(false)
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setInactive(true), timeoutMs)
    }

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'mousemove']
    events.forEach(e => window.addEventListener(e, reset))
    reset()

    return () => {
      clearTimeout(timerRef.current)
      events.forEach(e => window.removeEventListener(e, reset))
    }
  }, [timeoutMs])

  return inactive
}