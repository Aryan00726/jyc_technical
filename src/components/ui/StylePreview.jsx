import Button from './Button'
import TextLink from './TextLink'
import SectionLabel from './SectionLabel'
import SectionHeading from './SectionHeading'
import Divider from './Divider'
import ImageFrame from './ImageFrame'
import './StylePreview.css'

export default function StylePreview() {
  return (
    <div className="style-preview page">
      <div className="container section">
        {/* Header */}
        <SectionHeading
          label="Implementation 01"
          title="JYC Technical Visual System & Brand Tokens"
          subtitle="A production-grade visual foundation derived from the JYC emblem, featuring Gold (#EED79A), Maroon (#7F1E1D), and rich editorial primitives."
        />

        <Divider variant="phoenix" />

        {/* Brand Palette */}
        <section className="preview-block">
          <h3 className="preview-block__title">Primary Brand Palette</h3>
          <div className="swatch-grid">
            <div className="swatch" style={{ background: '#EED79A', color: '#0A0806' }}>
              <span className="swatch__name">Gold (Primary)</span>
              <span className="swatch__hex">#EED79A</span>
            </div>
            <div className="swatch" style={{ background: '#7F1E1D', color: '#F6EBC7' }}>
              <span className="swatch__name">Maroon (Primary)</span>
              <span className="swatch__hex">#7F1E1D</span>
            </div>
            <div className="swatch" style={{ background: '#0A0806', color: '#F6EBC7', border: '1px solid rgba(238,215,154,0.2)' }}>
              <span className="swatch__name">Black Surface</span>
              <span className="swatch__hex">#0A0806</span>
            </div>
            <div className="swatch" style={{ background: '#12100D', color: '#F6EBC7', border: '1px solid rgba(238,215,154,0.2)' }}>
              <span className="swatch__name">Dark Surface</span>
              <span className="swatch__hex">#12100D</span>
            </div>
            <div className="swatch" style={{ background: '#F6EBC7', color: '#0A0806' }}>
              <span className="swatch__name">Cream Body</span>
              <span className="swatch__hex">#F6EBC7</span>
            </div>
          </div>
        </section>

        {/* Section Labels & Badges */}
        <section className="preview-block">
          <h3 className="preview-block__title">Institutional Section Labels</h3>
          <div className="preview-row flex-center" style={{ justifyContent: 'flex-start', gap: '16px' }}>
            <SectionLabel variant="gold">Ready to Soar</SectionLabel>
            <SectionLabel variant="maroon">Technical Society</SectionLabel>
            <SectionLabel variant="muted">Jaypee Institute</SectionLabel>
          </div>
        </section>

        {/* Typography Scale */}
        <section className="preview-block">
          <h3 className="preview-block__title">Typography Hierarchy</h3>
          <div className="type-stack">
            <div className="type-item">
              <span className="type-meta">Hero Title</span>
              <h1 style={{ fontSize: 'var(--text-3xl)', margin: 0 }}>READY TO SOAR</h1>
            </div>
            <div className="type-item">
              <span className="type-meta">Section Heading (h2)</span>
              <h2 style={{ fontSize: 'var(--text-2xl)', margin: 0 }}>A Community Built Around Curiosity</h2>
            </div>
            <div className="type-item">
              <span className="type-meta">Body Text</span>
              <p style={{ margin: 0, maxWidth: '640px' }}>
                JYC Technical is a student-led community dedicated to engineering practice, hands-on workshops, real software projects, and collaborative learning.
              </p>
            </div>
          </div>
        </section>

        {/* Buttons & Links */}
        <section className="preview-block">
          <h3 className="preview-block__title">Button & Link Primitives</h3>
          <div className="preview-row" style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" size="md">Explore Workshops</Button>
            <Button variant="gold" size="md">Join Society</Button>
            <Button variant="ghost" size="md">View Team</Button>
            <TextLink href="#preview">Read Full Story</TextLink>
          </div>
        </section>

        {/* Editorial Image Frame Primitive */}
        <section className="preview-block">
          <h3 className="preview-block__title">Editorial Photography Frame Primitive</h3>
          <div style={{ maxWidth: '800px' }}>
            <ImageFrame
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
              alt="Students collaborating at workshop"
              aspect="16:9"
              caption="Interactive Technical Session — Jaypee Institute of Information Technology"
            />
          </div>
        </section>

      </div>
    </div>
  )
}
