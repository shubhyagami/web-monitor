import React from 'react'

export default function InactivityBanner({ inactive }) {
  if (!inactive) return null
  return (
    <div className="inactivity-banner">
      You've been inactive for a while — monitoring paused. Interact to resume.
    </div>
  )
}