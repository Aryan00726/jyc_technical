import React from 'react';

export function WhoWeAreSection() {
  const PILLARS = [
    {
      icon: (
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: 'Technical Excellence',
      description: 'Fostering cutting-edge engineering skills across Web Architecture, AI/ML, Cloud Computing, Cyber Security, and Competitive Coding.'
    },
    {
      icon: (
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'National Hackathons',
      description: 'Host of flagship hackathons including Hack-a-Sol and Murious, uniting 1,000+ developers to build solutions for real-world impact.'
    },
    {
      icon: (
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Student Peer Doubts & Q&A',
      description: 'A vibrant community platform where students get instant technical answers, project guidance, and 1-on-1 mentorship from senior members.'
    },
    {
      icon: (
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: 'Workshops & Industry Talks',
      description: 'Regular interactive sessions, hands-on bootcamps, and keynotes led by industry engineers and university tech alumni.'
    }
  ];

  return (
    <section className="section" id="what-we-do" style={{ padding: 'clamp(36px, 5vw, 56px) 0', position: 'relative', zIndex: 5 }}>
      <div className="container">
        <div style={{ textTransform: 'uppercase', color: 'var(--color-accent)', fontSize: 'var(--text-xs)', fontWeight: '600', letterSpacing: 'var(--tracking-widest)', marginBottom: '8px' }}>
          ✦ WHAT WE DO ✦
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', color: 'var(--color-text)', marginBottom: '16px' }}>
          Empowering the Next Generation of Engineers
        </h2>
        <p style={{ color: 'var(--color-text-dim)', fontSize: 'var(--text-base)', maxWidth: '720px', lineHeight: 'var(--leading-loose)', marginBottom: '48px' }}>
          JYC Technical is the premier student tech community of Jaypee University. We bridge the gap between academic theory and real-world engineering through hackathons, peer Q&A, open-source projects, and technical workshops.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(18, 16, 13, 0.75)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                transition: 'all 250ms cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--color-border-bright)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.6), 0 0 20px var(--color-accent-glow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(238, 215, 154, 0.08)',
                border: '1px solid rgba(238, 215, 154, 0.2)',
                color: 'var(--color-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {pillar.icon}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', color: 'var(--color-text)', margin: 0 }}>
                {pillar.title}
              </h3>
              <p style={{ color: 'var(--color-text-dim)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', margin: 0 }}>
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
