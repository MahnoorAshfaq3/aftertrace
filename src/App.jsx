import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import MissionAtlas from './pages/MissionAtlas'
import Learn from './pages/Learn'
import Timeline from './pages/Timeline'
import Achievements from './pages/Achievements'
import About from './pages/About'

const Play = lazy(() => import('./pages/Play')) // the 3D game only downloads when needed

export default function App() {
  const { pathname } = useLocation()
  const fullscreen = pathname.startsWith('/play')
  return (
    <div className="flex min-h-screen flex-col bg-space-950">
      {!fullscreen && <Navbar />}
      <main className="flex-1">
        <Suspense fallback={<div className="grid min-h-screen place-items-center">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<MissionAtlas />} />
            <Route path="/play" element={<Play />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/:id" element={<Learn />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      {!fullscreen && <Footer />}
    </div>
  )
}
