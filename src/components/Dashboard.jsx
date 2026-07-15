import React from 'react'
import WebsiteCard from './WebsiteCard'
import AddWebsiteForm from './AddWebsiteForm'
import InactivityBanner from './InactivityBanner'
import { useWebsiteMonitor } from '../hooks/useWebsiteMonitor'
import { useActivityTracker } from '../hooks/useActivityTracker'

export default function Dashboard() {
  const { websites, checking, add, remove, toggle, checkWebsite, checkAll } = useWebsiteMonitor()
  const inactive = useActivityTracker()

  const upCount = websites.filter(w => w.lastStatus === 'up').length

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Ping Monitor</h1>
        <p className="subtitle">
          {websites.length === 0
            ? 'Add a website to start monitoring'
            : `${upCount}/${websites.length} websites up — auto-checks every 5 min`
          }
        </p>
      </header>

      <InactivityBanner inactive={inactive} />

      <AddWebsiteForm onAdd={add} />

      {websites.length > 0 && (
        <div className="dashboard-actions">
          <button className="btn-check-all" onClick={checkAll}>
            Check All Now
          </button>
        </div>
      )}

      <div className="website-grid">
        {websites.map(website => (
          <WebsiteCard
            key={website.id}
            website={website}
            onRemove={remove}
            onToggle={toggle}
            onCheck={checkWebsite}
            checking={checking}
          />
        ))}
      </div>

      {websites.length === 0 && (
        <div className="empty-state">
          No websites being monitored. Add one above to get started.
        </div>
      )}
    </div>
  )
}