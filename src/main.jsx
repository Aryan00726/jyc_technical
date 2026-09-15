import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Styles — order matters: tokens → reset → global → animations
import './styles/tokens.css'
import './styles/reset.css'
import './styles/global.css'
import './styles/animations.css'

import App from './App.jsx'

createRoot(document.getElementById('app')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
