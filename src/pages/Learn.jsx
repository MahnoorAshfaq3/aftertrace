import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Gamepad2 } from 'lucide-react'
import { ARTIFACTS } from '../data/artifacts'

function Section({ title, children }) { return <section className="glass p-5"><h2 className="mb-2 font-display text-sm tracking-widest text-glow">{title}</h2>{children}</section> }

export default function Learn() {
  const { id } = useParams()
  const a = ARTIFACTS.find((x) => x.id === id)
  if (!a) return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-display text-3xl italic">Mission Archive</h1><p className="mb-6 text-slate-300">The real story behind every machine left behind.</p>
      <div className="grid gap-4 sm:grid-cols-2">{ARTIFACTS.map((x) => (
        <Link key={x.id} to={`/learn/${x.id}`} className="glass p-5 transition hover:-translate-y-1 hover:border-glow">
          <p className="text-sm text-mars-400">{x.planet} · {x.mission}</p><h2 className="font-display text-xl">{x.name}</h2><p className="mt-2 text-slate-300">{x.purpose}</p>
        </Link>))}
      </div>
    </div>
  )
  return (
    <article className="mx-auto max-w-4xl space-y-4 px-4 py-10">
      <Link to="/learn" className="flex items-center gap-2 text-glow"><ArrowLeft size={16} /> Mission Archive</Link>
      <header><p className="text-mars-400">{a.planet} · {a.mission}</p><h1 className="font-display text-3xl italic">{a.name}</h1>
        <p className="mt-2 text-slate-300">Launch: <b>{a.launch}</b> · Landing: <b>{a.landing}</b></p></header>
      <Section title="MISSION PURPOSE"><p>{a.purpose}</p></Section>
      <Section title="SCIENTIFIC INSTRUMENTS"><ul className="list-disc pl-5">{a.instruments.map((i) => <li key={i}>{i}</li>)}</ul></Section>
      <Section title="SCIENTIFIC DISCOVERIES"><ul className="list-disc pl-5">{a.discoveries.map((i) => <li key={i}>{i}</li>)}</ul></Section>
      <Section title="MISSION TIMELINE"><ol className="space-y-1">{a.timeline.map(([d, e]) => <li key={d + e}><b className="text-amber-300">{d}</b> — {e}</li>)}</ol></Section>
      <Section title="WHAT HAPPENED AT THE END?"><p>{a.ending}</p></Section>
      <Section title="CURRENT STATUS"><p>{a.status}</p></Section>
      <Section title="WHY IT MATTERS TODAY"><p>{a.why}</p></Section>
      <Section title="REFERENCES & CREDITS">
        <ul className="space-y-1">{a.refs.map(([l, u]) => <li key={u}><a className="inline-flex items-center gap-1 text-glow underline" href={u} target="_blank" rel="noreferrer">{l} <ExternalLink size={14} /></a></li>)}</ul>
        <p className="mt-2 text-sm text-slate-400">{a.credits}</p>
      </Section>
      {a.playable && <Link to={`/play?mission=${a.id}`} className="btn-primary w-fit"><Gamepad2 size={18} /> Play this mission</Link>}
    </article>
  )
}
