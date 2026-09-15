import { Suspense, lazy, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { lectures } from '../data/lectures'
import { team } from '../data/team'
import { socialLinks } from '../data/social'
import LectureCard from '../components/ui/LectureCard'
import TeamCard from '../components/ui/TeamCard'
import Button from '../components/ui/Button'
import SectionHeader from '../components/ui/SectionHeader'
import LoadingScreen from '../components/ui/LoadingScreen'
import { heroEntrance, revealOnScroll, killScrollTriggers } from '../animations/gsap.config'
import { useReducedMotion } from '../hooks/useReducedMotion'
import './Home.css'

// Lazy-load heavy 3D canvas — Three.js only loads for Home page
const HeroCanvas = lazy(() => import('../three/HeroCanvas'))

const featuredLectures = lectures.filter((l) => l.featured).slice(0, 3)
const coreTeam = team.filter((m) => m.tier === 'core').slice(0, 4)

export default function Home() {
  const heroRef    = useRef()
  const eyebrowRef = useRef()
  const titleRef   = useRef()
  const subtitleRef = useRef()
  const ctaRef     = useRef()
  const prefersReducedMotion = useReducedMotion()

  // Hero entrance animation
  useEffect(() => {
    if (prefersReducedMotion) {
      // Skip animation, jump to final state
      ;[eyebrowRef, titleRef, subtitleRef, ctaRef].forEach((r) => {
        if (r.current) {
          r.current.style.opacity = 1
          r.current.style.transform = 'none'
        }
      })
      return
    }

    const tl = heroEntrance(
      [eyebrowRef.current, titleRef.current, subtitleRef.current, ctaRef.current],
      { delay: 0.8 }
    )

    return () => tl.kill()
  }, [prefersReducedMotion])

  // Section scroll reveals
  useEffect(() => {
    if (prefersReducedMotion) return

    const triggers = []

    // Stats
    triggers.push(
      revealOnScroll('.home-stat', { stagger: 0.08, start: 'top 85%' })
    )
    // Activities
    triggers.push(
      revealOnScroll('.home-activity-card', { stagger: 0.12 })
    )
    // Section headers
    triggers.push(
      revealOnScroll('.section-header', { stagger: 0.05 })
    )

    return () => killScrollTriggers()
  }, [prefersReducedMotion])

  return (
    <div className="page home-page">
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="home-hero" ref={heroRef} aria-label="Hero">
        {/* 3D background — lazy loaded */}
        <Suspense fallback={<div className="home-hero__canvas-fallback" aria-hidden="true" />}>
          <HeroCanvas />
        </Suspense>

        {/* Text content — always above the 3D */}
        <div className="home-hero__content container">
          <span
            ref={eyebrowRef}
            className="home-hero__eyebrow"
            style={{ opacity: 0 }}
          >
            {site.college}
          </span>

          <h1
            ref={titleRef}
            className="home-hero__title"
            style={{ opacity: 0 }}
          >
            {site.tagline}
          </h1>

          <p
            ref={subtitleRef}
            className="home-hero__subtitle"
            style={{ opacity: 0 }}
          >
            {site.description}
          </p>

          <div
            ref={ctaRef}
            className="home-hero__cta"
            style={{ opacity: 0 }}
          >
            <Button href="/lectures" variant="primary" size="lg">
              Explore Lectures
            </Button>
            <Button href="/about" variant="ghost" size="lg">
              About the Club
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="home-hero__scroll-indicator" aria-hidden="true">
          <span />
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────── */}
      <section className="home-stats section--sm" aria-label="Club statistics">
        <div className="container">
          <div className="home-stats__grid">
            {site.stats.map((stat) => (
              <div key={stat.label} className="home-stat reveal">
                <span className="home-stat__value">{stat.value}</span>
                <span className="home-stat__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ───────────────────────────────────────────────── */}
      <section className="section home-activities" aria-label="What we do">
        <div className="container">
          <SectionHeader
            eyebrow="What We Do"
            title="Engineering runs deeper here."
            subtitle="We don't just talk about technology. We build, experiment, teach, and ship."
          />
          <div className="home-activities__grid">
            {site.activities.map((activity) => (
              <div key={activity.title} className="home-activity-card">
                <div className="home-activity-card__icon" aria-hidden="true">
                  {activity.icon}
                </div>
                <h3 className="home-activity-card__title">{activity.title}</h3>
                <p className="home-activity-card__desc">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED LECTURES ────────────────────────────────────────── */}
      <section className="section home-lectures" aria-label="Featured lectures">
        <div className="container">
          <div className="home-lectures__header">
            <SectionHeader
              eyebrow="From the Archive"
              title="Recent lectures."
              subtitle="A sample from our growing library of technical talks."
              align="left"
            />
            <Button href="/lectures" variant="ghost">
              View All Lectures
            </Button>
          </div>

          <div className="home-lectures__grid">
            {featuredLectures.map((lecture) => (
              <LectureCard key={lecture.id} lecture={lecture} className="reveal" />
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM PREVIEW ─────────────────────────────────────────────── */}
      <section className="section home-team" aria-label="Core team preview">
        <div className="container">
          <SectionHeader
            eyebrow="The Team"
            title="Built by students, run by students."
            subtitle="Meet the core team behind the club's events, content, and community."
          />

          <div className="home-team__grid">
            {coreTeam.map((member) => (
              <TeamCard key={member.id} member={member} className="reveal" />
            ))}
          </div>

          <div className="home-team__cta">
            <Button href="/team" variant="ghost">
              Meet Everyone
            </Button>
          </div>
        </div>
      </section>

      {/* ── CONNECT CTA ──────────────────────────────────────────────── */}
      <section className="section home-connect" aria-label="Connect with us">
        <div className="container">
          <div className="home-connect__inner reveal">
            {/* Ambient glow */}
            <div className="home-connect__glow" aria-hidden="true" />

            <span className="home-connect__eyebrow">Follow the Journey</span>
            <h2 className="home-connect__title">Stay in the loop.</h2>
            <p className="home-connect__desc">
              Lectures, events, project drops, and club news — across every platform.
            </p>

            <div className="home-connect__links">
              {socialLinks.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-connect__social"
                  aria-label={s.label}
                >
                  {s.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
