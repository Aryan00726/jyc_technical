import './SectionHeader.css'

/**
 * SectionHeader
 * =============
 * Consistent section heading used across all pages.
 *
 * @param {string} eyebrow — small label above the heading
 * @param {string} title — main heading text
 * @param {string} subtitle — optional subtitle/description
 * @param {'left'|'center'} align
 */
export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}) {
  return (
    <div className={`section-header section-header--${align} ${className}`.trim()}>
      {eyebrow && (
        <span className="section-header__eyebrow reveal">{eyebrow}</span>
      )}
      <h2 className="section-header__title reveal">{title}</h2>
      {subtitle && (
        <p className="section-header__subtitle reveal">{subtitle}</p>
      )}
    </div>
  )
}
