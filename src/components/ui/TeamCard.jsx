import './TeamCard.css'

/**
 * TeamCard
 * ========
 * Displays a team member with photo, name, role, and contact.
 * Contact is always official college email or LinkedIn — never personal phone.
 */
export default function TeamCard({ member, className = '' }) {
  const {
    name,
    role,
    tier,
    department,
    photo,
    bio,
    contact,
    contactType,
    linkedin,
  } = member

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <article className={`team-card team-card--${tier} ${className}`.trim()}>
      {/* Photo / Avatar */}
      <div className="team-card__photo" aria-hidden="true">
        {photo ? (
          <img
            src={photo}
            alt={`Photo of ${name}`}
            loading="lazy"
            className="team-card__photo-img"
          />
        ) : (
          <span className="team-card__photo-initials">{initials}</span>
        )}
      </div>

      {/* Info */}
      <div className="team-card__info">
        <h3 className="team-card__name">{name}</h3>
        <span className="team-card__role">{role}</span>
        {department && (
          <span className="team-card__dept">{department}</span>
        )}
        {bio && <p className="team-card__bio">{bio}</p>}
      </div>

      {/* Contact */}
      {(contact || linkedin) && (
        <div className="team-card__contact">
          {contact && contactType === 'email' && (
            <a
              href={`mailto:${contact}`}
              className="team-card__contact-link"
              aria-label={`Email ${name}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Email
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="team-card__contact-link"
              aria-label={`${name} on LinkedIn`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
          )}
        </div>
      )}
    </article>
  )
}
