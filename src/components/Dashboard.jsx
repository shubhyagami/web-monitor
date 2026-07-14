import WebsiteCard from './WebsiteCard'

export default function Dashboard({ websites, statuses, offline, onRefresh, onRemove, onAddClick }) {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Uptime Dashboard</h1>
          {offline && <span className="offline-badge">Offline</span>}
        </div>
        <button className="btn btn-primary" onClick={onAddClick}>+ Add Site</button>
      </header>

      {websites.length === 0 ? (
        <div className="empty-state">
          <p>No websites tracked yet.</p>
          <button className="btn btn-primary" onClick={onAddClick}>Add your first site</button>
        </div>
      ) : (
        <div className="card-grid">
          {websites.map(site => (
            <WebsiteCard
              key={site.id}
              site={site}
              status={statuses[site.url] || { status: 'checking', loading: true }}
              offline={offline}
              onRefresh={() => onRefresh(site.url)}
              onRemove={() => onRemove(site.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
