import React, { useState } from 'react'

export default function AddWebsiteForm({ onAdd }) {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = url.trim()
    if (!trimmed) {
      setError('Please enter a URL')
      return
    }
    let finalUrl = trimmed
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = 'https://' + finalUrl
    }
    try {
      new URL(finalUrl)
    } catch {
      setError('Invalid URL')
      return
    }
    setError('')
    onAdd(finalUrl)
    setUrl('')
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter website URL (e.g. example.com)"
        value={url}
        onChange={(e) => { setUrl(e.target.value); setError('') }}
        className={error ? 'input-error' : ''}
      />
      <button type="submit">Add Website</button>
      {error && <span className="form-error">{error}</span>}
    </form>
  )
}