import './Button.css'

/**
 * Button Primitive
 * ================
 * @param {'primary'|'gold'|'ghost'|'text'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {string} href — renders as <a> if provided
 * @param {boolean} external — adds target="_blank" rel attrs
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  className = '',
  ...props
}) {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim()

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
