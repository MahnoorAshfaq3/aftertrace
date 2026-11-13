import { Link } from 'react-router-dom'
import { Trophy, Star, BookOpen, ArrowRight } from 'lucide-react'
import { useSave, totals } from '../game/systems/MissionProgress'
export default function ProgressPanel() {
  const t = totals(useSave())
  const C = 2 * Math.PI * 42
  return (
    <section className="glass p-5" aria-label="Your progress">
      <h2 className="mb-4 flex items-center gap-2 font-display text-lg"><Star className="text-amber-400" /> Your Progress</h2>
      <div className="flex items-center gap-5">
        <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90" role="img" aria-label={`${t.percent}% complete`}>
          <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,.12)" strokeWidth="9" fill="none" />
          <circle cx="50" cy="50" r="42" stroke="#f59e4b" strokeWidth="9" fill="none" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - t.percent / 100)} />
          <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" transform="rotate(90 50 50)" fill="#fff" fontSize="20" fontWeight="700">{t.percent}%</text>
        </svg>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2"><Trophy size={18} className="text-amber-400" /> Missions Completed {t.missionsDone}/{t.totalMissions}</li>
          <li className="flex items-center gap-2"><Star size={18} className="text-amber-400" /> Badges Earned {t.badges.length}</li>
          <li className="flex items-center gap-2"><BookOpen size={18} className="text-slate-300" /> Knowledge Points {t.points} pts</li>
        </ul>
      </div>
      <Link to="/achievements" className="btn-ghost mt-4 w-fit text-sm"><Trophy size={16} /> View Achievements <ArrowRight size={16} /></Link>
    </section>
  )
}
