import { useEffect } from 'react'
import { site } from '../data/site'
import Button from '../components/ui/Button'
import SectionHeader from '../components/ui/SectionHeader'
import { revealOnScroll, killScrollTriggers } from '../animations/gsap.config'
import { useReducedMotion } from '../hooks/useReducedMotion'
import './About.css'

export default function About() {
  const { about } = site
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    revealOnScroll('.about-reveal', { stagger: 0.1 })
    revealOnScroll('.about-value-card', { stagger: 0.1 })
    revealOnScroll('.about-achievement', { stagger: 0.06 })
    return () => killScrollTriggers()
  }, [prefersReducedMotion])

  return (
    <main id="main-content" className="page about-page">
      <div className="container">
        {/* Page header */}
        <header className="about-page__header">
          <SectionHeader
            eyebrow="About CodeCraft"
            title="We build engineers, not just graduates."
            subtitle={about.mission}
          />
        </header>

        {/* Story */}
        <section className="about-section" aria-label="Our story">
          <div className="about-two-col">
            <div className="about-two-col__label about-reveal">
              <span className="about-eyebrow">The Story</span>
            </div>
            <div className="about-two-col__content">
              <p className="about-body about-reveal">{about.story}</p>
              <p className="about-body about-reveal">
                Founded in <strong>{about.founded}</strong> — we've grown every semester, adding more lectures, more projects, and more members from every department across campus.
              </p>
            </div>
          </div>
        </section>

        {/* Mission + Vision */}
        <section className="about-section about-mv" aria-label="Mission and vision">
          <div className="about-mv__grid">
            <div className="about-mv__card about-reveal">
              <span className="about-mv__label">Mission</span>
              <p className="about-mv__text">{about.mission}</p>
            </div>
            <div className="about-mv__card about-reveal">
              <span className="about-mv__label">Vision</span>
              <p className="about-mv__text">{about.vision}</p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="about-section" aria-label="Values">
          <SectionHeader
            eyebrow="What We Believe"
            title="Values that guide everything."
            align="left"
          />
          <div className="about-values-grid">
            {about.values.map((v, i) => (
              <div key={i} className="about-value-card">
                <h3 className="about-value-card__title">{v.title}</h3>
                <p className="about-value-card__body">{v.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="about-section" aria-label="Achievements">
          <SectionHeader
            eyebrow="Track Record"
            title="What we've built."
            align="left"
          />
          <ul className="about-achievements" role="list">
            {about.achievements.map((a, i) => (
              <li key={i} className="about-achievement">
                <span className="about-achievement__dot" aria-hidden="true" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Opportunities */}
        <section className="about-section" aria-label="Student opportunities">
          <SectionHeader
            eyebrow="Why Join"
            title="What you get as a member."
            align="left"
          />
          <ul className="about-opportunities" role="list">
            {about.opportunities.map((opp, i) => (
              <li key={i} className="about-opportunity about-reveal">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{opp}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="about-cta about-reveal" aria-label="Join the club">
          <div className="about-cta__inner">
            <div className="about-cta__glow" aria-hidden="true" />
            <h2 className="about-cta__title">Ready to build something?</h2>
            <p className="about-cta__desc">
              Start by exploring our lecture archive or reach out to the team directly.
            </p>
            <div className="about-cta__actions">
              <Button href="/lectures" variant="primary" size="lg">Browse Lectures</Button>
              <Button href="/team" variant="ghost" size="lg">Meet the Team</Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
