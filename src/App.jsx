import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Lazy-load pages — only Home loads the heavy 3D bundle
const Home      = lazy(() => import('./pages/Home'))
const Lectures  = lazy(() => import('./pages/Lectures'))
const Team      = lazy(() => import('./pages/Team'))
const About     = lazy(() => import('./pages/About'))
const Preview   = lazy(() => import('./components/ui/StylePreview'))
const NotFound  = lazy(() => import('./pages/NotFound'))

// Simple page fallback while a route chunk loads
function PageFallback() {
  return (
    <div
      style={{
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--jyc-gold)',
          boxShadow: '0 0 16px var(--jyc-gold)',
          animation: 'pulseGlow 1.2s ease-in-out infinite',
        }}
      />
    </div>
  )
}

function AppRoutes() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      <Navbar />

      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/lectures" element={<Lectures />} />
          <Route path="/team"     element={<Team />} />
          <Route path="/about"    element={<About />} />
          <Route path="/preview"  element={<Preview />} />
          <Route path="*"         element={<NotFound />} />
        </Routes>
      </Suspense>

      {/* Footer appears on all pages */}
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
