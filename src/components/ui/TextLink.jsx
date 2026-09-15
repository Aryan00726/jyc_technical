import './TextLink.css'

export default function TextLink({
  children,
  href,
  external = false,
  arrow = true,
  className = '',
  ...props
}) {
  const classes = `text-link ${className}`.trim()

  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      <span>{children}</span>
      {arrow && <span className="text-link__arrow" aria-hidden="true">→</span>}
    </a>
  )
}
