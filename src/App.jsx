import { useState, useCallback } from 'react'
import Dashboard from './components/Dashboard'
import AddWebsiteForm from './components/AddWebsiteForm'
import InactivityBanner from './components/InactivityBanner'
import { useWebsiteMonitor } from './hooks/useWebsiteMonitor'
import { useActivityTracker } from './hooks/useActivityTracker'
import { loadWebsites, saveWebsites } from './utils/storage'

let nextId = 1

export default function App() {
  const [websites, setWebsites] = useState(() => {
    const saved = loadWebsites()
    nextId = (saved.reduce((m, s) => Math.max(m, s.id || 0), 0) || 0) + 1
    return saved
  })
  const [showForm, setShowForm] = useState(false)
  const { statuses, refreshSite, offline } = useWebsiteMonitor(websites)
  const { isInactive } = useActivityTracker()

  const addSite = useCallback((url, label) => {
    const site = { id: nextId++, url, label }
    setWebsites(prev => {
      const next = [...prev, site]
      saveWebsites(next)
      return next
    })
    setShowForm(false)
  }, [])

  const removeSite = useCallback((id) => {
    setWebsites(prev => {
      const next = prev.filter(s => s.id !== id)
      saveWebsites(next)
      return next
    })
  }, [])

  return (
    <>
      <InactivityBanner isInactive={isInactive} />
      <Dashboard
        websites={websites}
        statuses={statuses}
        offline={offline}
        onRefresh={refreshSite}
        onRemove={removeSite}
        onAddClick={() => setShowForm(true)}
      />
      {showForm && (
        <AddWebsiteForm onAdd={addSite} onCancel={() => setShowForm(false)} />
      )}
    </>
  )
}
