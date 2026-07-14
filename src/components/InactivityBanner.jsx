export default function InactivityBanner({ isInactive }) {
  if (!isInactive) return null
  return (
    <div className="inactivity-banner">
      You've been inactive &mdash; monitoring continues in the background
    </div>
  )
}
