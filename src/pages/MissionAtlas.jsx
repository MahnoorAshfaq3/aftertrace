import { lazy, Suspense, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Compass, Star, Lock, Check, MapPin, ArrowRight, BookOpen } from 'lucide-react'
import { MISSIONS } from '../data/missions'
import { ARTIFACTS } from '../data/artifacts'
import { useSave, totals } from '../game/systems/MissionProgress'
import { webglAvailable } from '../game/webgl'

const MoonGlobe = lazy(() => import('../components/MoonGlobe'))
const GL = webglAvailable()

// Marker positions are % across/down the schematic planet map (decorative layout, not real coordinates).
const MARKERS = { opportunity: [64, 38], spirit: [28, 62], sojourner: [48, 22], 'apollo-lrv': [40, 55] }

export default function MissionAtlas() {
  const [params, setParams] = useSearchParams()
  const planet = params.get('planet') || 'mars'
  const [sel, setSel] = useState(planet === 'mars' ? 'opportunity' : 'apollo-lrv')
  const save = useSave(), t = totals(save)
  const list = MISSIONS.filter((m) => planet === 'deep' ? m.planet === 'deep' : m.planet === planet)
  const m = MISSIONS.find((x) => x.id === sel) || list[0]
  const choose = (p) => { setParams({ planet: p }); setSel(p === 'mars' ? 'opportunity' : p === 'moon' ? 'apollo-lrv' : (MISSIONS.find((m) => m.planet === 'deep')?.id || 'dawn')) }
  const done = (id) => !!save.missions[id]?.completed

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4"><Compass size={48} className="text-glow" /><div><h1 className="font-display text-3xl italic">Mission Atlas</h1><p className="text-slate-300">Choose a planet and discover its forgotten equipment.</p></div></div>
        <div className="glass flex items-center gap-3 px-5 py-3"><Star className="text-amber-400" /><div><div className="text-xs text-slate-400">Your Progress</div><b className="font-display text-lg">{t.missionsDone} / {t.totalMissions}</b></div></div>
      </div>

      <div className="mb-6 flex gap-3" role="tablist" aria-label="Planet">
        {[['moon', 'The Moon', 'Explore Lunar Missions'], ['mars', 'Mars', 'Discover the Red Planet'], ['deep', 'Deep Space', 'Asteroids & spacecraft']].map(([id, n, d]) => (
          <button key={id} role="tab" aria-selected={planet === id} onClick={() => choose(id)} className={`glass flex-1 p-4 text-left transition sm:flex-none sm:min-w-64 ${planet === id ? 'border-glow shadow-[0_0_24px_rgba(57,184,255,.35)]' : ''}`}>
            <b className="font-display text-xl">{n}</b><div className="text-sm text-slate-300">{d}</div>
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className={`glass relative aspect-[4/3] overflow-hidden ${planet === 'mars' ? 'bg-gradient-to-br from-orange-700/60 via-red-900/50 to-space-900' : planet === 'deep' ? 'bg-gradient-to-br from-indigo-950 via-slate-900 to-black' : 'bg-gradient-to-br from-slate-400/40 via-slate-700/50 to-space-900'}`} role="group" aria-label={`${planet} map`}>
          <div className="absolute inset-6 rounded-full border border-white/10" /><div className="absolute inset-16 rounded-full border border-white/10" />
          {planet === 'moon' && GL ? <div className="absolute left-1/2 top-1/2 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2"><Suspense fallback={null}><MoonGlobe reduced={save.settings.reducedMotion} /></Suspense></div> : <div className={`absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full ${planet === 'mars' ? 'bg-[radial-gradient(circle_at_35%_30%,#e9895a,#a8402a_55%,#4a1a12)]' : planet === 'deep' ? 'bg-[radial-gradient(circle_at_35%_30%,#64748b,#1e1b4b_55%,#050510)]' : 'bg-[radial-gradient(circle_at_35%_30%,#e5e5e5,#8d8d8d_55%,#2a2a30)]'} shadow-[0_0_60px_rgba(255,160,100,.25)]`} />}
          {list.map((x) => {
            const [l, tp] = MARKERS[x.id] || [18 + ((x.number * 19) % 68), 18 + ((x.number * 23) % 65)]
            return (
              <button key={x.id} onClick={() => setSel(x.id)} aria-label={`${x.artifact}${x.playable ? '' : ' (coming soon)'}`} style={{ left: `${l}%`, top: `${tp}%` }} className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-2 ${sel === x.id ? 'bg-glow/40 ring-2 ring-glow' : 'bg-black/40 hover:bg-glow/30'}`}>
                {done(x.id) ? <Check className="text-emerald-300" size={22} /> : x.playable ? <MapPin className="text-amber-300" size={22} /> : <Lock className="text-slate-300" size={20} />}
              </button>
            )
          })}
          <p className="absolute bottom-3 left-4 text-xs text-slate-300">Schematic map · select a marker</p>
        </div>

        <aside className="glass p-6" aria-live="polite">
          {m && <>
            <p className="text-mars-400">Mission {String(m.number).padStart(2, '0')}</p>
            <h2 className="font-display text-2xl italic">{m.title}</h2>
            <h3 className="mb-3 font-display text-lg italic text-amber-400">{m.artifact}</h3>
            <p className="mb-4 text-slate-200">{m.blurb}</p>
            <dl className="mb-5 grid grid-cols-3 gap-2 text-sm"><div className="rounded-lg bg-white/5 p-2"><dt className="text-slate-400">Launched</dt><dd className="font-bold">{m.launched}</dd></div><div className="rounded-lg bg-white/5 p-2"><dt className="text-slate-400">Where</dt><dd className="font-bold">{m.planet === 'mars' ? 'Mars' : m.planet === 'deep' ? 'Deep Space' : 'Moon'}</dd></div><div className="rounded-lg bg-white/5 p-2"><dt className="text-slate-400">Ended</dt><dd className="font-bold">{m.ended}</dd></div></dl>
            <p className="mb-5 rounded-lg bg-white/5 p-3 text-sm"><b className="text-amber-300">Key discovery:</b> {m.discovery}</p>
            <div className="flex flex-wrap gap-3">
              {m.playable ? <Link to={`/play?mission=${m.id}`} className="btn-primary">{done(m.id) ? 'Replay Mission' : 'Start Investigation'} <ArrowRight size={18} /></Link>
                : <span className="btn-ghost opacity-70"><Lock size={16} /> Mission locked</span>}
              {ARTIFACTS.some((a) => a.id === m.id) && <Link to={`/learn/${m.id}`} className="btn-ghost"><BookOpen size={16} /> Read the dossier</Link>}
            </div>
            {m.playable && <p className="mt-4 text-sm text-slate-400">Or <Link className="text-glow underline" to={`/play?mission=${m.id}&mode=explore`}>explore {planet === 'mars' ? 'Mars' : planet === 'deep' ? 'deep space' : 'the Moon'} freely</Link>.</p>}
          </>}
        </aside>
      </div>
    </div>
  )
}
