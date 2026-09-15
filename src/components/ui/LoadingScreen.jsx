import './LoadingScreen.css'

/**
 * LoadingScreen
 * =============
 * Shown while the 3D scene and assets load.
 * Fades out when the scene is ready.
 */
export default function LoadingScreen({ isVisible = true }) {
  return (
    <div
      className={`loading-screen ${isVisible ? 'loading-screen--visible' : 'loading-screen--hidden'}`}
      aria-hidden={!isVisible}
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="loading-screen__inner">
        {/* Logo mark */}
        <div className="loading-screen__mark" aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <polygon
              points="20,2 38,11 38,29 20,38 2,29 2,11"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              opacity="0.4"
            />
            <polygon
              points="20,8 32,14 32,26 20,32 8,26 8,14"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              opacity="0.7"
            />
            <circle cx="20" cy="20" r="4" fill="var(--color-accent)" />
          </svg>
        </div>

        {/* Loading bar */}
        <div className="loading-screen__bar" aria-hidden="true">
          <div className="loading-screen__bar-fill" />
        </div>

        <p className="loading-screen__label">Initializing</p>
      </div>
    </div>
  )
}
