import React, { useState } from 'react';

export function GoogleFormButton({ roleTitle = 'Technical Team Member' }) {
  const formUrl = import.meta.env.VITE_HIRING_GOOGLE_FORM_URL;
  const isConfigured = Boolean(
    formUrl && 
    formUrl !== 'https://forms.gle/your-google-form-id' &&
    !formUrl.includes('placeholder')
  );

  const [showModal, setShowModal] = useState(false);
  const [applicant, setApplicant] = useState({
    name: '',
    email: '',
    year: '2nd Year',
    branch: 'CSE',
    github: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleClick = (e) => {
    if (isConfigured) {
      window.open(formUrl, '_blank', 'noopener,noreferrer');
    } else {
      setShowModal(true);
    }
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('jyc_hiring_applications') || '[]');
    existing.push({
      role: roleTitle,
      ...applicant,
      appliedAt: new Date().toISOString()
    });
    localStorage.setItem('jyc_hiring_applications', JSON.stringify(existing));
    setSubmitted(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="event-card__btn event-card__btn--primary"
        style={{ width: '100%' }}
      >
        <span>Apply for {roleTitle.split(' ')[0]} Role</span>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </button>

      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          zIndex: 400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border-bright)',
            borderRadius: 'var(--radius-xl)',
            maxWidth: '520px',
            width: '100%',
            padding: '28px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.9), 0 0 30px var(--color-accent-glow)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)', fontSize: 'var(--text-lg)', margin: 0 }}>
                Join JYC Technical — {roleTitle}
              </h3>
              <button
                onClick={() => { setShowModal(false); setSubmitted(false); }}
                style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '20px' }}
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(46, 139, 87, 0.2)', border: '1px solid #5cdb95', color: '#5cdb95', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: '24px' }}>
                  ✓
                </div>
                <h4 style={{ color: 'var(--color-text)', margin: 0 }}>Application Registered!</h4>
                <p style={{ color: 'var(--color-text-dim)', fontSize: 'var(--text-sm)', margin: 0 }}>
                  Thank you for applying. The JYC Technical recruitment lead will review your profile and reach out shortly.
                </p>
                <button
                  onClick={() => { setShowModal(false); setSubmitted(false); }}
                  className="doubt-form__submit-btn"
                  style={{ marginTop: '12px' }}
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ background: 'rgba(238, 215, 154, 0.06)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '10px 14px', fontSize: 'var(--text-xs)', color: 'var(--color-text-dim)' }}>
                  💡 <strong>Tip for Leads:</strong> Set <code>VITE_HIRING_GOOGLE_FORM_URL</code> in your <code>.env</code> file to redirect applicants directly to your official Google Form.
                </div>

                <div className="doubt-form__group">
                  <label className="doubt-form__label">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={applicant.name}
                    onChange={(e) => setApplicant({ ...applicant, name: e.target.value })}
                    placeholder="e.g. Anirudh Tandon"
                    className="doubt-form__input"
                  />
                </div>

                <div className="doubt-form__row">
                  <div className="doubt-form__group">
                    <label className="doubt-form__label">College Email *</label>
                    <input
                      type="email"
                      required
                      value={applicant.email}
                      onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                      placeholder="student@juet.ac.in"
                      className="doubt-form__input"
                    />
                  </div>
                  <div className="doubt-form__group">
                    <label className="doubt-form__label">Academic Year *</label>
                    <select
                      value={applicant.year}
                      onChange={(e) => setApplicant({ ...applicant, year: e.target.value })}
                      className="doubt-form__select"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                    </select>
                  </div>
                </div>

                <div className="doubt-form__group">
                  <label className="doubt-form__label">GitHub / Portfolio / LinkedIn Link</label>
                  <input
                    type="url"
                    value={applicant.github}
                    onChange={(e) => setApplicant({ ...applicant, github: e.target.value })}
                    placeholder="https://github.com/yourhandle"
                    className="doubt-form__input"
                  />
                </div>

                <button type="submit" className="doubt-form__submit-btn" style={{ marginTop: '8px' }}>
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
