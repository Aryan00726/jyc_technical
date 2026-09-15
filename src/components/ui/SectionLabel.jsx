import './SectionLabel.css'

/**
 * SectionLabel
 * ============
 * Institutional badge / category tag derived from JYC emblem styling.
 * @param {'gold'|'maroon'|'muted'} variant
 */
export default function SectionLabel({
  children,
  variant = 'gold',
  icon,
  className = '',
  ...props
}) {
  return (
    <div className={`section-label section-label--${variant} ${className}`.trim()} {...props}>
      {icon && <span className="section-label__icon">{icon}</span>}
      <span className="section-label__text">{children}</span>
    </div>
  )
}
