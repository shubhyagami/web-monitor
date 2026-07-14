import { timeAgo } from '../utils/timeAgo'

export default function WebsiteCard({ site, status, offline, onRefresh, onRemove }) {
  const { status: state, statusCode, responseTimeMs, lastChecked, loading } = status
  const isUp = state === 'up'
  const isDown = state === 'down' || state === 'unreachable'
  const isChecking = state === 'checking' || loading
  const statusClass = offline
    ? 'status-unknown'
    : isUp
      ? 'status-up'
      : isDown
        ? 'status-down'
        : 'status-checking'

  return (
    <div className={`card ${statusClass}`}>
      <div className="card-top">
        <div className="card-indicator">
          <div className={`status-dot ${statusClass} ${isChecking ? 'pulse' : ''}`}>
            {isUp && !offline && <>&#10003;</>}
            {isDown && !offline && <>&#10005;</>}
            {offline && <>&#8212;</>}
          </div>
        </div>
        <div className="card-info">
          <span className="card-label">{site.label || site.url}</span>
          {site.label && <span className="card-url">{site.url}</span>}
        </div>
        <div className="card-actions">
          <button className="icon-btn" onClick={onRefresh} disabled={isChecking} title="Check now">&#8635;</button>
          <button className="icon-btn delete-btn" onClick={onRemove} title="Remove site">&#10005;</button>
        </div>
      </div>

      {isChecking && (
        <div className="card-bottom">
          <span className="card-meta">Checking...</span>
        </div>
      )}

      {!isChecking && offline && (
        <div className="card-bottom">
          <span className="card-meta">Browser offline</span>
        </div>
      )}

      {!isChecking && !offline && (
        <div className="card-bottom">
          {statusCode && <span className="badge">{statusCode}</span>}
          {responseTimeMs != null && <span className="card-meta">{responseTimeMs}ms</span>}
          {lastChecked && <span className="card-meta">{timeAgo(lastChecked)}</span>}
        </div>
      )}
    </div>
  )
}
