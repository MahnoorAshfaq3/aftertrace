import { Trophy, Star, Search, Lock, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BADGES } from '../data/achievements'
import { MISSIONS } from '../data/missions'
import { progress, useSave, totals } from '../game/systems/MissionProgress'

export default function Achievements() {
  const save = useSave(), t = totals(save)
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-display text-3xl italic">Achievements</h1>
      <p className="mb-6 text-slate-300">Your saved progress. It is stored in this browser only.</p>
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[[Trophy, `${t.missionsDone}/${t.totalMissions}`, 'Missions completed'], [Search, t.clues, 'Clues collected'], [Star, t.badges.length, 'Badges earned'], [Star, t.points, 'Knowledge points']].map(([I, v, l]) => <div key={l} className="glass p-4 text-center"><I className="mx-auto mb-1 text-amber-400" /><b className="font-display text-2xl">{v}</b><div className="text-sm text-slate-300">{l}</div></div>)}
      </div>
      <div className="glass mb-6 p-4"><div className="mb-1 flex justify-between text-sm"><span>Overall exploration</span><b>{t.percent}%</b></div><div className="h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-gradient-to-r from-glow to-amber-400" style={{ width: `${t.percent}%` }} /></div></div>
      <h2 className="mb-3 font-display text-lg">Badges</h2>
      <div className="mb-8 grid gap-3 sm:grid-cols-2">
        {BADGES.map((b) => { const got = b.test(save); return <div key={b.id} className={`glass flex items-center gap-4 p-4 ${got ? 'border-amber-400/60' : 'opacity-60'}`}>{got ? <Trophy className="text-amber-300" size={32} /> : <Lock size={28} />}<div><b className="font-display">{b.name}</b><p className="text-sm text-slate-300">{b.desc}</p></div></div> })}
      </div>
      <h2 className="mb-3 font-display text-lg">Missions</h2>
      <ul className="mb-8 space-y-2">{MISSIONS.map((m) => { const s = save.missions[m.id]; return <li key={m.id} className="glass flex items-center justify-between gap-3 p-4"><div><b>{m.artifact}</b><span className="ml-2 text-sm text-slate-400">{s?.completed ? 'Completed' : m.playable ? `${s?.clues?.length || 0}/3 clues` : 'Coming soon'}</span></div>{s?.completed ? <Check className="text-emerald-300" /> : m.playable ? <Link className="btn-ghost text-sm" to={`/play?mission=${m.id}`}>{s ? 'Continue' : 'Start'}</Link> : <Lock size={18} className="text-slate-400" />}</li> })}</ul>
      <button className="btn-ghost text-sm" onClick={() => { if (confirm('Erase all saved progress?')) progress.resetAll() }}>Reset all progress</button>
    </div>
  )
}
