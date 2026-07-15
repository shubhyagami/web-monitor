import React from 'react'
import { timeAgo } from '../utils/timeAgo'

export default function WebsiteCard({ website, onRemove, onToggle, onCheck, checking }) {
  const isChecking = checking.has(website.id)
  const isUp = website.lastStatus === 'up'
  const hostname = new URL(website.url).hostname

  return (
    <div className={`website-card ${isUp ? 'status-up' : website.lastStatus ? 'status-down' : 'status-unknown'}`}>
      <div className="card-header">
        <div className="status-dot" title={isUp ? 'Up' : website.lastStatus ? 'Down' : 'Unknown'} />
        <div className="card-url">
          <span className="hostname">{hostname}</span>
          <span className="full-url">{website.url}</span>
        </div>
      </div>

      <div className="card-stats">
        {website.lastStatusCode ? (
          <div className="stat">
            <span className="stat-label">Status</span>
            <span className="stat-value">{website.lastStatusCode}</span>
          </div>
        ) : null}
        {website.lastLatency ? (
          <div className="stat">
            <span className="stat-label">Latency</span>
            <span className="stat-value">{website.lastLatency}ms</span>
          </div>
        ) : null}
        <div className="stat">
          <span className="stat-label">Checked</span>
          <span className="stat-value">{timeAgo(website.lastChecked)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Wake-up</span>
          <span className={`stat-value ${website.active ? 'active' : 'paused'}`}>
            {website.active ? 'Active' : 'Paused'}
          </span>
        </div>
      </div>

      <div className="card-actions">
        <button className="btn-toggle" onClick={() => onToggle(website.id)}>
          {website.active ? 'Pause' : 'Resume'}
        </button>
        <button className="btn-check" onClick={() => onCheck(website)} disabled={isChecking}>
          {isChecking ? 'Checking...' : 'Check Now'}
        </button>
        <button className="btn-remove" onClick={() => onRemove(website.id)}>
          Remove
        </button>
      </div>
    </div>
  )
}