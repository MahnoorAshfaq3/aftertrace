import { useMemo, useState } from 'react'
import { Check, RotateCcw, X } from 'lucide-react'
import { TIMELINE_EVENTS } from '../data/missions'
import { progress, useSave } from '../game/systems/MissionProgress'
import { sfx } from '../game/systems/audio'

// Tap events to place them in order (works with keyboard and touch). Press "Check order" for feedback.
export default function Timeline() {
  const save = useSave()
  const shuffled = useMemo(() => [...TIMELINE_EVENTS].sort(() => Math.random() - 0.5), [])
  const [seq, setSeq] = useState([])
  const [result, setResult] = useState(null)
  const pool = shuffled.filter((e) => !seq.includes(e.id))
  const byId = (id) => TIMELINE_EVENTS.find((e) => e.id === id)

  const check = () => {
    const wrong = seq.map((id, i) => byId(id).order !== i)
    const ok = wrong.every((w) => !w)
    setResult({ ok, wrong })
    if (ok) { progress.solveTimeline(); sfx.complete() } else sfx.wrong()
  }
  const reset = () => { setSeq([]); setResult(null) }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-3xl italic">Build the Timeline</h1>
      <p className="mb-6 text-slate-300">Arrange the key events of the Opportunity Rover mission from earliest to latest. Select an event to add it to the timeline; select a placed event to remove it.</p>
      <div className="glass mb-4 p-4"><h2 className="mb-2 font-display text-sm tracking-widest text-glow">EVENTS</h2>
        <div className="flex flex-wrap gap-2">{pool.map((e) => <button key={e.id} className="btn-ghost" onClick={() => { setResult(null); setSeq([...seq, e.id]); sfx.ui() }}>{e.label}</button>)}{!pool.length && <span className="text-slate-400">All events placed.</span>}</div></div>
      <div className="glass mb-4 p-4"><h2 className="mb-2 font-display text-sm tracking-widest text-amber-300">YOUR TIMELINE (earliest first)</h2>
        <ol className="space-y-2">
          {seq.map((id, i) => { const e = byId(id), w = result?.wrong[i]
            return <li key={id}><button onClick={() => { setResult(null); setSeq(seq.filter((x) => x !== id)) }} className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left ${result ? (w ? 'border-red-400 bg-red-400/10' : 'border-emerald-400 bg-emerald-400/10') : 'border-white/20'}`}>
              <b className="grid h-8 w-8 place-items-center rounded-full bg-white/10">{i + 1}</b><span className="flex-1">{e.label}</span>{result && (w ? <X className="text-red-300" /> : <><span className="text-sm text-slate-300">{e.date}</span><Check className="text-emerald-300" /></>)}</button></li> })}
          {!seq.length && <li className="text-slate-400">Nothing placed yet.</li>}
        </ol></div>
      <div className="flex flex-wrap gap-3">
        <button className="btn-primary disabled:opacity-40" disabled={seq.length !== TIMELINE_EVENTS.length} onClick={check}>Check order</button>
        <button className="btn-ghost" onClick={reset}><RotateCcw size={16} /> Start over</button>
      </div>
      {result && (
        <div className="glass fade-up mt-5 p-5" role="status">
          {result.ok ? <><h2 className="mb-2 font-display text-xl text-emerald-300">Perfect order! +100 knowledge points</h2>
            <ul className="space-y-1 text-slate-200">{TIMELINE_EVENTS.map((e) => <li key={e.id}><b className="text-amber-300">{e.date}:</b> {e.note}</li>)}</ul></>
            : <><h2 className="mb-2 font-display text-xl text-red-300">Not quite. Red events are in the wrong place.</h2><p className="text-slate-200">Hint: the mission needs to launch and land before it can explore, and the dust storm comes before the final signal. Remove the red events and try again.</p></>}
        </div>
      )}
      {save.timeline.solved && !result && <p className="mt-4 text-emerald-300">You've already solved this timeline. Play again for practice.</p>}
    </div>
  )
}
