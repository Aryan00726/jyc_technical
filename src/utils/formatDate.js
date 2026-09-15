/**
 * formatDate
 * ==========
 * Format an ISO date string for display.
 * e.g., '2025-08-10' → 'August 10, 2025'
 *
 * @param {string} isoDate — 'YYYY-MM-DD'
 * @param {'full'|'short'|'month-year'} style
 * @returns {string}
 */
export function formatDate(isoDate, style = 'full') {
  if (!isoDate) return ''
  const date = new Date(isoDate + 'T00:00:00') // avoid timezone offset shifting date

  const formats = {
    full:       { year: 'numeric', month: 'long',  day: 'numeric' },
    short:      { year: 'numeric', month: 'short', day: 'numeric' },
    'month-year': { year: 'numeric', month: 'long' },
  }

  return date.toLocaleDateString('en-IN', formats[style] ?? formats.full)
}

/**
 * timeAgo
 * =======
 * Return a human-friendly relative time string.
 * e.g., '3 months ago', 'yesterday', '2 years ago'
 *
 * @param {string} isoDate
 * @returns {string}
 */
export function timeAgo(isoDate) {
  const date = new Date(isoDate + 'T00:00:00')
  const now = new Date()
  const diffMs = now - date
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays < 1)   return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 30)  return `${diffDays} days ago`

  const diffMonths = Math.floor(diffDays / 30)
  if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`

  const diffYears = Math.floor(diffDays / 365)
  return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`
}
