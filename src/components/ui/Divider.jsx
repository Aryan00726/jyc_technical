import './Divider.css'

export default function Divider({ variant = 'line', className = '' }) {
  if (variant === 'phoenix') {
    return (
      <div className={`divider-phoenix ${className}`.trim()} aria-hidden="true">
        <span className="divider-phoenix__line" />
        <span className="divider-phoenix__emblem">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
          </svg>
        </span>
        <span className="divider-phoenix__line" />
      </div>
    )
  }

  return <hr className={`divider ${className}`.trim()} />
}
