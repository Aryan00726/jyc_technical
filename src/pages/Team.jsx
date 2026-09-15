import { useEffect } from 'react'
import { team } from '../data/team'
import TeamCard from '../components/ui/TeamCard'
import SectionHeader from '../components/ui/SectionHeader'
import { revealOnScroll, killScrollTriggers } from '../animations/gsap.config'
import { useReducedMotion } from '../hooks/useReducedMotion'
import './Team.css'

const faculty     = team.filter((m) => m.tier === 'faculty')
const core        = team.filter((m) => m.tier === 'core')
const coordinators = team.filter((m) => m.tier === 'coordinator')
const volunteers  = team.filter((m) => m.tier === 'volunteer')

export default function Team() {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    revealOnScroll('.team-card',     { stagger: 0.08 })
    revealOnScroll('.team-section-header', { stagger: 0.05 })
    return () => killScrollTriggers()
  }, [prefersReducedMotion])

  return (
    <main id="main-content" className="page team-page">
      <div className="container">
        {/* Page header */}
        <header className="team-page__header">
          <SectionHeader
            eyebrow="The Team"
            title="The people who run it."
            subtitle="Students, volunteers, and faculty who dedicate their time to making the club work."
          />
        </header>

        {/* Privacy notice */}
        <div className="team-privacy-notice" role="note">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          <span>
            Contact links shown are official college email addresses only. No personal information is displayed publicly.
          </span>
        </div>

        {/* Faculty */}
        {faculty.length > 0 && (
          <section className="team-section" aria-label="Faculty advisor">
            <h2 className="team-section-header reveal">Faculty Advisor</h2>
            <div className="team-grid team-grid--faculty">
              {faculty.map((m) => (
                <TeamCard key={m.id} member={m} />
              ))}
            </div>
          </section>
        )}

        {/* Core Team */}
        {core.length > 0 && (
          <section className="team-section" aria-label="Core team">
            <h2 className="team-section-header reveal">Core Team</h2>
            <div className="team-grid team-grid--core">
              {core.map((m) => (
                <TeamCard key={m.id} member={m} />
              ))}
            </div>
          </section>
        )}

        {/* Coordinators */}
        {coordinators.length > 0 && (
          <section className="team-section" aria-label="Coordinators">
            <h2 className="team-section-header reveal">Coordinators</h2>
            <div className="team-grid team-grid--coordinators">
              {coordinators.map((m) => (
                <TeamCard key={m.id} member={m} />
              ))}
            </div>
          </section>
        )}

        {/* Volunteers */}
        {volunteers.length > 0 && (
          <section className="team-section" aria-label="Volunteers">
            <h2 className="team-section-header reveal">Volunteers</h2>
            <div className="team-grid team-grid--volunteers">
              {volunteers.map((m) => (
                <TeamCard key={m.id} member={m} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
