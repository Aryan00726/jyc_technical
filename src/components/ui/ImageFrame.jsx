import { useState } from 'react'
import './ImageFrame.css'

/**
 * ImageFrame Primitive
 * ====================
 * Reusable photography frame supporting editorial aspect ratios, responsive crops,
 * optional subtle gold/maroon border accent, and captions.
 *
 * @param {string} src — image source URL
 * @param {string} alt — image accessibility text
 * @param {'16:9'|'4:5'|'3:2'|'21:9'|'auto'} aspect — ratio
 * @param {string} caption — optional caption text
 * @param {string} objectPosition — CSS object-position (default 'center')
 * @param {boolean} bordered — subtle gold border frame accent
 */
export default function ImageFrame({
  src,
  alt = '',
  aspect = '16:9',
  caption,
  objectPosition = 'center center',
  bordered = true,
  className = '',
  ...props
}) {
  const [loaded, setLoaded] = useState(false)

  const aspectClass = aspect !== 'auto' ? `image-frame--aspect-${aspect.replace(':', '-')}` : ''

  return (
    <figure className={`image-frame ${aspectClass} ${bordered ? 'image-frame--bordered' : ''} ${className}`.trim()} {...props}>
      <div className="image-frame__container">
        {!loaded && <div className="image-frame__skeleton" aria-hidden="true" />}
        <img
          src={src}
          alt={alt}
          className={`image-frame__img ${loaded ? 'image-frame__img--loaded' : ''}`}
          style={{ objectPosition }}
          onLoad={() => setLoaded(true)}
          loading="lazy"
        />
        <div className="image-frame__overlay" aria-hidden="true" />
      </div>
      {caption && (
        <figcaption className="image-frame__caption">
          <span className="image-frame__caption-mark">╱</span>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
