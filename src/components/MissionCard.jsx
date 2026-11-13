import { Link } from 'react-router-dom'
import { ArrowRight, Lock } from 'lucide-react'
export default function MissionCard({ m, done }) {
  const to = m.playable ? `/play?mission=${m.id}` : `/learn/${m.id}`
  return (
    <div className="glass flex flex-col gap-1 p-4">
      <div className="flex items-center justify-between"><h3 className="font-display text-base">{m.artifact}</h3>{!m.playable && <Lock size={16} className="text-slate-400" aria-label="Coming soon" />}</div>
      <p className="text-sm text-slate-400">{m.planet === 'mars' ? 'Mars' : 'Moon'} • {m.years}</p>
      <p className="mb-2 text-slate-200">{m.tagline}</p>
      <Link to={to} className="btn-ghost mt-auto w-fit text-sm">{m.playable ? (done ? 'Replay Mission' : 'Explore Mission') : 'Read Dossier'} <ArrowRight size={16} /></Link>
    </div>
  )
}
