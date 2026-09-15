import './SectionHeading.css'
import SectionLabel from './SectionLabel'

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'left',
  className = '',
  ...props
}) {
  return (
    <div className={`section-heading section-heading--${align} ${className}`.trim()} {...props}>
      {label && <SectionLabel className="section-heading__label">{label}</SectionLabel>}
      {title && <h2 className="section-heading__title">{title}</h2>}
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </div>
  )
}
