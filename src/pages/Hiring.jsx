import React, { useState } from 'react';
import { HIRING_ROLES } from '../data/roles';
import { RoleCard } from '../components/ui/RoleCard';
import SectionHeader from '../components/ui/SectionHeader';
import './Events.css';
import './Hiring.css';

export default function Hiring() {
  const [selectedWing, setSelectedWing] = useState('All');

  const WINGS = ['All', 'Technical Wing', 'Creative Wing', 'Operations Wing', 'Outreach Wing'];

  const filteredRoles = selectedWing === 'All'
    ? HIRING_ROLES
    : HIRING_ROLES.filter(r => r.wing === selectedWing);

  return (
    <div className="page hiring-page">
      <div className="container">
        <div className="hiring-page__header">
          <SectionHeader
            eyebrow="Recruitment 2026"
            title="Join JYC Technical Team"
            subtitle="Build real software, host national hackathons, organize tech fests, and lead student peer mentorship."
            align="left"
          />
        </div>

        {/* Hero Recruitment Box */}
        <div className="hiring-page__hero-box">
          <div style={{ textTransform: 'uppercase', color: 'var(--color-accent)', fontSize: 'var(--text-xs)', fontWeight: '600', letterSpacing: 'var(--tracking-widest)' }}>
            ✦ RECRUITMENT PROCESS ✦
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--color-text)', margin: 0 }}>
            3 Simple Steps to Get Onboard
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '12px' }}>
            <div style={{ background: 'rgba(238, 215, 154, 0.05)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
              <div style={{ color: 'var(--color-accent)', fontWeight: 'bold', fontSize: 'var(--text-sm)', marginBottom: '4px' }}>
                Step 1: Choose Role
              </div>
              <p style={{ color: 'var(--color-text-dim)', fontSize: 'var(--text-xs)', margin: 0, lineHeight: 'var(--leading-normal)' }}>
                Review open domain positions and find the team wing that aligns with your passions.
              </p>
            </div>

            <div style={{ background: 'rgba(238, 215, 154, 0.05)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
              <div style={{ color: 'var(--color-accent)', fontWeight: 'bold', fontSize: 'var(--text-sm)', marginBottom: '4px' }}>
                Step 2: Submit Application
              </div>
              <p style={{ color: 'var(--color-text-dim)', fontSize: 'var(--text-xs)', margin: 0, lineHeight: 'var(--leading-normal)' }}>
                Click "Apply Now" to submit your application via the official recruitment form.
              </p>
            </div>

            <div style={{ background: 'rgba(238, 215, 154, 0.05)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
              <div style={{ color: 'var(--color-accent)', fontWeight: 'bold', fontSize: 'var(--text-sm)', marginBottom: '4px' }}>
                Step 3: Peer Discussion
              </div>
              <p style={{ color: 'var(--color-text-dim)', fontSize: 'var(--text-xs)', margin: 0, lineHeight: 'var(--leading-normal)' }}>
                Attend a short informal peer interaction session with club leads to discuss your interests.
              </p>
            </div>
          </div>
        </div>

        {/* Wing Filters */}
        <div className="events-page__controls">
          <div className="events-page__tabs">
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', marginRight: '4px' }}>
              Filter Wing:
            </span>
            {WINGS.map(wing => (
              <button
                key={wing}
                onClick={() => setSelectedWing(wing)}
                className={`events-page__tab ${selectedWing === wing ? 'events-page__tab--active' : ''}`}
              >
                {wing}
              </button>
            ))}
          </div>
        </div>

        {/* Open Roles Grid */}
        <div className="hiring-page__grid">
          {filteredRoles.map(role => (
            <RoleCard key={role.id} role={role} />
          ))}
        </div>
      </div>
    </div>
  );
}
