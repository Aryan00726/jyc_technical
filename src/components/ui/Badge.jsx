import './Badge.css'

/**
 * Badge / Tag
 * ===========
 * Used for lecture categories and team tiers.
 */
export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span className={`badge badge--${variant} ${className}`.trim()}>
      {children}
    </span>
  )
}
