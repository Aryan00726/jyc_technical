# Club Website

Premium website for a college student club. Built with React + Vite + React Three Fiber + GSAP.

## Tech Stack

- **React 19** + **Vite 8** — Core framework + build tool
- **React Three Fiber 9** + **Three.js 0.186** — 3D rendering
- **@react-three/drei 10** — 3D helpers
- **@react-three/postprocessing 3** — Post-processing effects (Bloom)
- **GSAP 3** — Advanced animations + ScrollTrigger
- **react-router-dom 7** — Client-side routing

## Getting Started

```bash
npm install --legacy-peer-deps
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

## Project Structure

```
src/
├── main.jsx          # React entry point
├── App.jsx           # Router + global layout
├── styles/           # Design tokens, global CSS
├── components/       # Reusable components
│   ├── layout/       # Navbar, Footer, PageWrapper
│   └── ui/           # Cards, Buttons, etc.
├── pages/            # Home, Lectures, Team, About
├── three/            # R3F scenes, objects, effects
├── animations/       # GSAP timelines
├── hooks/            # Custom React hooks
├── data/             # Static content (lectures, team, social)
├── utils/            # Utility functions
└── assets/           # Images, icons, textures
```

## Development Status

| Phase | Status | Description |
|---|---|---|
| 1 — Foundation | ✅ Complete | React + R3F wired, git initialized |
| 2 — Design System | 🔲 Next | Tokens, routing, layout shell |
| 3 — 3D Laboratory | 🔲 Pending | Hero knowledge lattice scene |
| 4 — Home Page | 🔲 Pending | Full landing page |
| 5 — Lectures | 🔲 Pending | Lecture archive |
| 6 — Team + About | 🔲 Pending | Team cards + about content |
| 7 — Polish | 🔲 Pending | Responsive, performance |
| 8 — Deployment | 🔲 Pending | Vercel deploy, v1.0.0 |
