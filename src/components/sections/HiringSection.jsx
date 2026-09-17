import React from 'react';
import { Link } from 'react-router-dom';
import { HIRING_ROLES } from '../../data/roles';
import { RoleCard } from '../ui/RoleCard';

export function HiringSection() {
  // Show first 3 featured roles on landing page
  const featuredRoles = HIRING_ROLES.slice(0, 3);

  return (
    <section className="section" id="hiring-section" style={{ padding: 'clamp(36px, 5vw, 56px) 0', position: 'relative', zIndex: 5 }}>
      <div className="container">
        <div style={{ textTransform: 'uppercase', color: 'var(--color-accent)', fontSize: 'var(--text-xs)', fontWeight: '600', letterSpacing: 'var(--tracking-widest)', marginBottom: '8px' }}>
          ✦ RECRUITMENT 2026 ✦
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', color: 'var(--color-text)', margin: 0 }}>
              Join Our Technical & Creative Team
            </h2>
            <p style={{ color: 'var(--color-text-dim)', fontSize: 'var(--text-sm)', marginTop: '8px', maxWidth: '640px' }}>
              We are recruiting passionate student developers, AI enthusiasts, UI designers, and event managers to build next-generation projects.
            </p>
          </div>

          <Link
            to="/join"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--color-accent)',
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--weight-semibold)',
              textDecoration: 'none'
            }}
          >
            View All Open Roles ({HIRING_ROLES.length})
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
          {featuredRoles.map(role => (
            <RoleCard key={role.id} role={role} />
          ))}
        </div>
      </div>
    </section>
  );
}
