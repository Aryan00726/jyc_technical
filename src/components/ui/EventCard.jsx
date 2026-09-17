import React from 'react';
import './EventCard.css';

export function EventCard({ event }) {
  const {
    title,
    category,
    status,
    date,
    time,
    location,
    description,
    image,
    tags,
    registrationUrl
  } = event;

  const isUpcoming = status === 'Upcoming';

  return (
    <div className="event-card">
      <div className="event-card__image-wrap">
        <img src={image} alt={title} className="event-card__image" loading="lazy" />
        <div className="event-card__overlay" />
        <span className={`event-card__status-badge ${isUpcoming ? 'event-card__status-badge--upcoming' : 'event-card__status-badge--past'}`}>
          {status}
        </span>
        <span className="event-card__category">{category}</span>
      </div>

      <div className="event-card__body">
        <h3 className="event-card__title">{title}</h3>
        <p className="event-card__description">{description}</p>

        <div className="event-card__meta">
          <div className="event-card__meta-item">
            <svg className="event-card__meta-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{date} • {time}</span>
          </div>
          <div className="event-card__meta-item">
            <svg className="event-card__meta-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{location}</span>
          </div>
        </div>

        {tags && tags.length > 0 && (
          <div className="event-card__tags">
            {tags.map((tag, idx) => (
              <span key={idx} className="event-card__tag">#{tag}</span>
            ))}
          </div>
        )}
      </div>

      <div className="event-card__footer">
        {isUpcoming && registrationUrl ? (
          <a
            href={registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="event-card__btn event-card__btn--primary"
          >
            Register Now
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        ) : (
          <button className="event-card__btn event-card__btn--disabled" disabled>
            {isUpcoming ? 'Registration Opening Soon' : 'Event Concluded'}
          </button>
        )}
      </div>
    </div>
  );
}
