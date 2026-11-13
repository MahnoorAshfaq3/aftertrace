import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { Rocket, Play, ArrowRight, Search, Puzzle, Clock, Star, Globe, X } from 'lucide-react'
import { MISSIONS } from '../data/missions'
import MissionCard from '../components/MissionCard'
import ProgressPanel from '../components/ProgressPanel'
import { useSave } from '../game/systems/MissionProgress'
import { webglAvailable } from '../game/webgl'
import { TRAILER_URL } from '../data/config'

const HeroScene = lazy(() => import('../components/HeroScene'))

export default function Home() {
  const nav = useNavigate(), save = useSave(), root = useRef()
  const [trailer, setTrailer] = useState(false)
  const reduced = save.settings.reducedMotion || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const gl = useRef(webglAvailable()).current

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => { gsap.from('.hero-in', { y: 26, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out' }) }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <div ref={root}>
      <section className="relative min-h-[88vh] overflow-hidden bg-gradient-to-b from-space-950 via-[#1b1030] to-[#4a2418]">
        {gl && <Suspense fallback={null}><HeroScene reduced={reduced} /></Suspense>}
        <div className="pointer-events-none relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-start px-4 pt-14">
          <h1 className="hero-in font-display text-5xl font-black italic tracking-wider drop-shadow-[0_0_30px_rgba(57,184,255,.5)] sm:text-7xl">AFTERTRACE</h1>
          <p className="hero-in mt-1 font-display text-lg italic text-glow sm:text-2xl">The Mission Ends. The Story Doesn't.</p>
          <p className="hero-in mt-5 max-w-md text-lg text-slate-100">Explore the <b className="text-amber-400">Moon</b> and <b className="text-amber-400">Mars</b>, discover NASA's abandoned equipment, and uncover the <b className="text-amber-400">incredible</b> stories behind their missions.</p>
          <div className="hero-in pointer-events-auto mt-6 flex flex-wrap items-center gap-4">
            <button className="btn-primary" onClick={() => nav('/explore')}><Rocket size={20} /> Start Your Journey <ArrowRight size={18} /></button>
            <button className="flex items-center gap-2 font-semibold hover:text-glow" onClick={() => setTrailer(true)}><span className="grid h-10 w-10 place-items-center rounded-full border border-purple-400 bg-purple-500/30"><Play size={16} /></span> Watch Trailer</button>
          </div>
          <p className="hero-in absolute bottom-24 right-6 hidden -rotate-6 font-serif text-xl italic text-white/90 md:block">Every machine left behind has a story…</p>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-16 grid max-w-7xl gap-5 px-4 lg:grid-cols-[1.2fr_1fr_.9fr]">
        <section className="glass p-5" aria-label="Choose your planet">
          <h2 className="mb-3 flex items-center gap-2 font-display text-lg"><Globe className="text-glow" /> Choose Your Planet</h2>
          <div className="grid grid-cols-2 gap-3">
            {[['moon', 'The Moon', 'Discover lunar relics', 'from-slate-300 to-slate-700 border-glow'], ['mars', 'Mars', "Uncover the Red Planet's secrets", 'from-orange-500 to-red-900 border-amber-400']].map(([id, n, d, c]) => (
              <Link key={id} to={`/explore?planet=${id}`} className={`group relative flex h-40 flex-col justify-end overflow-hidden rounded-xl border-2 bg-gradient-to-br p-3 ${c}`}>
                <span className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/20 blur-md" />
                <b className="font-display text-xl">{n}</b><span className="text-sm">{d}</span><ArrowRight className="absolute bottom-3 right-3 transition group-hover:translate-x-1" size={18} />
              </Link>
            ))}
          </div>
        </section>
        <section className="glass p-5" aria-label="Game modes">
          <h2 className="mb-3 font-display text-lg">Game Modes</h2>
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            {[[Search, 'Explore & Discover', 'Find and learn about the missions.', '/play?mission=opportunity&mode=explore', 'from-blue-600/60'], [Puzzle, 'Mission Detective', 'Solve puzzles & find clues.', '/play?mission=opportunity', 'from-purple-600/60'], [Clock, 'Build the Timeline', 'Arrange events correctly.', '/timeline', 'from-emerald-600/60']].map(([I, t, d, to, c]) => (
              <Link key={t} to={to} className={`flex flex-col items-center gap-1 rounded-xl border border-white/15 bg-gradient-to-b ${c} to-transparent p-3 transition hover:-translate-y-1`}><I size={28} /><b className="font-display text-xs">{t}</b><span className="text-xs text-slate-300">{d}</span></Link>
            ))}
          </div>
        </section>
        <ProgressPanel />
      </div>

      <section className="mx-auto mt-8 max-w-7xl px-4" aria-label="Featured missions">
        <div className="mb-3 flex items-center justify-between"><h2 className="flex items-center gap-2 font-display text-lg"><Star className="text-amber-400" /> Featured Missions</h2><Link to="/learn" className="text-sm text-glow hover:underline">Explore Real NASA Missions →</Link></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MISSIONS.map((m) => <MissionCard key={m.id} m={m} done={!!save.missions[m.id]?.completed} />)}
        </div>
      </section>
      <p className="py-12 text-center font-serif text-xl italic text-slate-300">Because exploration never truly ends…</p>

      {trailer && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4" role="dialog" aria-modal="true" aria-label="Trailer">
          <div className="glass relative w-full max-w-3xl p-5">
            <button className="absolute right-3 top-3" aria-label="Close" onClick={() => setTrailer(false)}><X /></button>
            {TRAILER_URL ? <div className="aspect-video"><iframe className="h-full w-full rounded-lg" src={TRAILER_URL} title="AFTERTRACE trailer" allowFullScreen /></div> : (
              <div className="p-6 text-center"><h2 className="mb-2 font-display text-2xl">Trailer coming soon</h2><p className="mb-5 text-slate-300">The team hasn't published a trailer yet. You can jump straight into Mission 01 instead.</p><button className="btn-primary" onClick={() => nav('/play?mission=opportunity')}>Play Mission 01</button></div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
