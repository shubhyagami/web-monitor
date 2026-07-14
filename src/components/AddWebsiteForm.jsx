import { useState } from 'react'

export default function AddWebsiteForm({ onAdd, onCancel }) {
  const [url, setUrl] = useState('')
  const [label, setLabel] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = url.trim()
    if (!trimmed) { setError('Enter a URL'); return }

    let formatted = trimmed
    if (!/^https?:\/\//i.test(formatted)) formatted = 'https://' + formatted
    try { new URL(formatted) } catch { setError('Invalid URL'); return }

    onAdd(formatted, label.trim())
  }

  return (
    <div className="overlay" onClick={onCancel}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>Add Website</h2>
        <form onSubmit={handleSubmit}>
          <label>
            URL
            <input
              type="text"
              placeholder="example.com"
              value={url}
              onChange={e => { setUrl(e.target.value); setError('') }}
              autoFocus
            />
          </label>
          <label>
            Label <span className="optional">(optional)</span>
            <input
              type="text"
              placeholder="My Website"
              value={label}
              onChange={e => setLabel(e.target.value)}
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add Site</button>
          </div>
        </form>
      </div>
    </div>
  )
}
