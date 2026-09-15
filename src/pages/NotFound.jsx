import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import './NotFound.css'

export default function NotFound() {
  return (
    <main id="main-content" className="not-found">
      <div className="not-found__inner">
        <div className="not-found__glow" aria-hidden="true" />
        <span className="not-found__code" aria-hidden="true">404</span>
        <h1 className="not-found__title">Page not found.</h1>
        <p className="not-found__desc">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button href="/" variant="primary">
          Back to Home
        </Button>
      </div>
    </main>
  )
}
