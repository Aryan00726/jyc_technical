import React from 'react';
import { GoogleFormButton } from './GoogleFormButton';
import './RoleCard.css';

export function RoleCard({ role }) {
  const {
    title,
    wing,
    badge,
    summary,
    skills,
    responsibilities
  } = role;

  return (
    <div className="role-card">
      <div className="role-card__header">
        <div className="role-card__title-wrap">
          <span className="role-card__wing">{wing}</span>
          <h3 className="role-card__title">{title}</h3>
        </div>
        {badge && <span className="role-card__badge">{badge}</span>}
      </div>

      <p className="role-card__summary">{summary}</p>

      <div>
        <span className="role-card__section-title">Required Skills & Tools</span>
        <div className="role-card__skills" style={{ marginTop: '6px' }}>
          {skills.map((skill, idx) => (
            <span key={idx} className="role-card__skill-chip">{skill}</span>
          ))}
        </div>
      </div>

      <div>
        <span className="role-card__section-title">Key Responsibilities</span>
        <ul className="role-card__responsibilities" style={{ marginTop: '6px' }}>
          {responsibilities.map((resp, idx) => (
            <li key={idx} className="role-card__resp-item">
              <span className="role-card__bullet">❖</span>
              <span>{resp}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="role-card__footer">
        <GoogleFormButton roleTitle={title} />
      </div>
    </div>
  );
}
