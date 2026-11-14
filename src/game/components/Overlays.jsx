import { useState } from 'react'
import { Pause, Settings, Volume2, VolumeX, Play, RotateCcw, Home, Check, Trophy, Star, FileText, ArrowRight, Lightbulb, X } from 'lucide-react'
import { progress } from '../systems/MissionProgress'
import { sfx } from '../systems/audio'

export function ControlsGuide() {
  const rows = [['W A S D', 'Move'], ['Shift', 'Run'], ['Space', 'Jump'], ['Mouse', 'Look around'], ['E', 'Interact / investigate'], ['Esc', 'Pause']]
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
      {rows.map(([k, d]) => <li key={k} className="flex items-center gap-2"><span className="kbd">{k}</span><span className="text-slate-300">{d}</span></li>)}
    </ul>
  )
}

export function LoadingOverlay({ progress: p }) {
  return (
    <div className="absolute inset-0 z-50 grid place-items-center bg-space-950" role="status" aria-live="polite">
      <div className="w-72 text-center">
        <h2 className="mb-4 font-display text-xl tracking-widest">AFTERTRACE</h2>
        <div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-glow transition-all" style={{ width: `${Math.max(5, p)}%` }} /></div>
        <p className="mt-3 text-sm text-slate-400">Preparing the mission… {Math.round(p)}%</p>
      </div>
    </div>
  )
}

export function Briefing({ d, onStart, onBack, onlyExplore }) {
  const small = typeof window !== 'undefined' && window.innerWidth < 900
  return (
    <div className="absolute inset-0 z-40 grid place-items-center overflow-y-auto bg-space-950/80 p-4 backdrop-blur-sm">
      <div className="glass fade-up w-full max-w-3xl p-6 sm:p-8">
        <p className="text-mars-400">{onlyExplore ? 'Free Exploration' : `Mission ${String(d.number).padStart(2, '0')}`}</p>
        <h1 className="font-display text-3xl font-black sm:text-4xl">{onlyExplore ? `Explore ${d.planet === 'moon' ? 'the Moon' : d.planet === 'deep' ? 'Deep Space' : 'Mars'}` : d.shortTitle}</h1>
        {!onlyExplore && <h2 className="mb-3 font-display text-lg text-amber-400">{d.artifactName}</h2>}
        <p className="mb-5 leading-relaxed text-slate-200">{d.briefing}</p>
        {!onlyExplore && (
          <>
            <h3 className="mb-2 font-display text-sm tracking-widest text-glow">OBJECTIVES</h3>
            <ol className="mb-5 list-decimal space-y-1 pl-5 text-slate-200">{d.objectives.map((o) => <li key={o}>{o}</li>)}</ol>
          </>
        )}
        <h3 className="mb-2 font-display text-sm tracking-widest text-glow">CONTROLS</h3>
        <ControlsGuide />
        {small && <p className="mt-4 rounded-lg bg-amber-500/15 p-3 text-sm text-amber-200">The 3D game is designed for a desktop or laptop keyboard. It may not be playable on touch screens.</p>}
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="btn-primary" onClick={onStart}><Play size={18} /> {onlyExplore ? 'Start Exploring' : 'Start Investigation'}</button>
          <button className="btn-ghost" onClick={onBack}>Back</button>
        </div>
      </div>
    </div>
  )
}

export function HUD({ d, ms, freeRoam, onPause, onSettings, muted, onToggleMute, explore }) {
  const n = ms.clues.length
  const objective = explore ? 'Explore freely. Press E near glowing objects.' : freeRoam ? 'Mission complete. Explore freely.' : !ms.rover ? `Locate the ${d.artifactName}` : n < 3 ? `Find the 3 clues about the ${d.artifactName} (${n}/3)` : 'Decode the final transmission'
  return (
    <>
      <div className="glass pointer-events-none absolute left-4 top-4 z-20 max-w-xs p-3">
        <p className="font-display text-xs tracking-widest text-mars-400">{explore ? 'EXPLORE & DISCOVER' : d.title}</p>
        <p className="mt-1 flex items-start gap-2 text-sm"><Star size={16} className="mt-0.5 shrink-0 text-amber-400" />{objective}</p>
        {!explore && <p className="mt-1 text-sm text-slate-300">Clues collected: <b>{n}/3</b> · Artifact {ms.rover ? '✓ found' : 'not found'}</p>}
        {!explore && <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-glow transition-all" style={{ width: `${((n + (ms.rover ? 1 : 0)) / 4) * 100}%` }} /></div>}
      </div>
      <div className="absolute right-4 top-4 z-20 flex gap-2">
        <button aria-label={muted ? 'Unmute' : 'Mute'} className="glass grid h-11 w-11 place-items-center" onClick={onToggleMute}>{muted ? <VolumeX size={20} /> : <Volume2 size={20} />}</button>
        <button aria-label="Settings" className="glass grid h-11 w-11 place-items-center" onClick={onSettings}><Settings size={20} /></button>
        <button aria-label="Pause" className="glass grid h-11 w-11 place-items-center" onClick={onPause}><Pause size={20} /></button>
      </div>
    </>
  )
}

export function BottomBar({ nearby, locked, label }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex flex-col items-center gap-3 px-4">
      {nearby && (
        <div className="glass pop flex items-center gap-3 px-5 py-3 text-lg shadow-[0_0_30px_rgba(57,184,255,.4)]">
          <span className="kbd">E</span> {nearby === 'rover' ? `Inspect the ${label}` : 'Press E to investigate'}
        </div>
      )}
      {!locked && !nearby && <div className="glass px-4 py-2 text-sm text-slate-200">Click the game screen to capture your mouse for camera control</div>}
      <div className="glass hidden gap-4 px-4 py-2 text-xs text-slate-300 sm:flex">
        <span><span className="kbd">WASD</span> Move</span><span><span className="kbd">Shift</span> Run</span><span><span className="kbd">Space</span> Jump</span><span><span className="kbd">E</span> Interact</span><span><span className="kbd">Esc</span> Pause</span>
      </div>
    </div>
  )
}

export function Toast({ text }) {
  if (!text) return null
  return <div className="glass pop absolute left-1/2 top-24 z-30 -translate-x-1/2 border-emerald-400/50 px-6 py-3 font-display text-sm text-emerald-300">{text}</div>
}

export function InfoPanel({ d, id, onClose }) {
  const isRover = id === 'rover'
  const clue = d.clues.find((c) => c.id === id)
  return (
    <div className="absolute inset-0 z-40 grid place-items-center bg-black/55 p-4" role="dialog" aria-modal="true">
      <div className="glass fade-up max-h-[90vh] w-full max-w-2xl overflow-y-auto p-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h2 className="font-display text-2xl">{isRover ? d.artifactName : clue.title}</h2>
          <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm text-emerald-300">{isRover ? 'Artifact discovered' : 'Clue collected'}</span>
        </div>
        {isRover ? (
          <dl className="space-y-2">{d.roverFacts.map(([k, v]) => <div key={k} className="flex flex-col gap-0.5 border-b border-white/10 pb-2 sm:flex-row sm:gap-4"><dt className="w-48 shrink-0 text-mars-400">{k}</dt><dd>{v}</dd></div>)}</dl>
        ) : (
          <>
            <p className="leading-relaxed">{clue.text}</p>
            <p className="mt-4 flex gap-2 rounded-lg bg-glow/10 p-3 text-glow"><Lightbulb className="shrink-0" size={20} />{clue.fact}</p>
          </>
        )}
        <button autoFocus className="btn-primary mt-6" onClick={onClose}>Continue <ArrowRight size={18} /></button>
      </div>
    </div>
  )
}

export function QuizPanel({ d, onSolved }) {
  const q = d.quiz
  const [pick, setPick] = useState(null)
  const answered = pick !== null, right = pick === q.correct
  const choose = (i) => { if (answered) return; setPick(i); const ok = i === q.correct; ok ? sfx.clue() : sfx.wrong(); onSolved(ok, false) }
  return (
    <div className="absolute inset-0 z-40 grid place-items-center overflow-y-auto bg-space-950/85 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="glass fade-up w-full max-w-2xl p-6">
        <p className="font-display text-xs tracking-widest text-mars-400">SOLVE THE MYSTERY</p>
        <h2 className="mb-5 font-display text-2xl">{q.question}</h2>
        <div className="space-y-3">
          {q.options.map((o, i) => {
            const state = !answered ? 'border-white/20 hover:border-glow' : i === q.correct ? 'border-emerald-400 bg-emerald-400/15' : i === pick ? 'border-red-400 bg-red-400/15' : 'border-white/10 opacity-60'
            return <button key={o} onClick={() => choose(i)} disabled={answered} className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition ${state}`}><b className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10">{'ABC'[i]}</b>{o}</button>
          })}
        </div>
        {answered && (
          <div className="fade-up mt-5">
            <p className={`mb-2 font-display ${right ? 'text-emerald-300' : 'text-red-300'}`}>{right ? 'Correct! Here is why:' : 'Not quite. Here is why:'}</p>
            <p className="leading-relaxed text-slate-200">{q.explanation}</p>
            <div className="mt-5 flex gap-3">
              {right ? <button className="btn-primary" onClick={() => onSolved(true, true)}>Complete Mission <ArrowRight size={18} /></button> : <button className="btn-primary" onClick={() => setPick(null)}>Try again</button>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function CompletePanel({ d, ms, points, onContinue, onAtlas }) {
  const [report, setReport] = useState(false)
  return (
    <div className="absolute inset-0 z-40 grid place-items-center overflow-y-auto bg-space-950/85 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="glass fade-up w-full max-w-3xl p-6 text-center sm:p-8">
        <div className="mx-auto mb-3 grid h-28 w-28 place-items-center rounded-full border-4 border-amber-400 bg-gradient-to-b from-amber-500/30 to-transparent shadow-[0_0_50px_rgba(245,158,75,.6)]"><Trophy size={52} className="text-amber-300" /></div>
        <h1 className="font-display text-3xl font-black text-amber-300">MISSION COMPLETE</h1>
        <p className="mt-1 font-display text-lg">{d.badge} badge earned</p>
        <p className="mx-auto mt-3 max-w-xl text-slate-200">You uncovered the story of the {d.artifactName} and learned how its legacy still inspires us.</p>
        <div className="my-5 grid grid-cols-3 gap-3 text-sm">
          <div className="glass p-3"><b className="block text-xl text-glow">{ms.clues.length}/3</b>Clues collected</div>
          <div className="glass p-3"><b className="block text-xl text-amber-300">{points}</b>Knowledge points</div>
          <div className="glass p-3"><b className="block text-xl text-emerald-300">1</b>Badge</div>
        </div>
        {report && (
          <div className="fade-up mb-5 rounded-xl bg-white/5 p-4 text-left">
            <h3 className="mb-2 font-display text-sm tracking-widest text-mars-400">FINAL MISSION REPORT: SCIENTIFIC LEGACY</h3>
            <ul className="list-disc space-y-1 pl-5 text-slate-200">{d.legacy.map((l) => <li key={l}>{l}</li>)}</ul>
            <p className="mt-3 text-sm text-slate-400">{d.finalLine}</p>
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-3">
          <button className="btn-primary" onClick={() => setReport((r) => !r)}><FileText size={18} /> {report ? 'Hide Report' : 'View Report'}</button>
          <button className="btn-ghost" onClick={onContinue}>Continue Exploring <ArrowRight size={18} /></button>
          <button className="btn-ghost" onClick={onAtlas}>Return to Mission Atlas</button>
        </div>
      </div>
    </div>
  )
}

export function PauseMenu({ tab: initial = 'main', onResume, onRestart, onExit, muted, reduced }) {
  const [tab, setTab] = useState(initial)
  return (
    <div className="absolute inset-0 z-40 grid place-items-center bg-black/65 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="glass fade-up w-full max-w-md p-6">
        <h2 className="mb-4 font-display text-2xl">{tab === 'main' ? 'Paused' : tab === 'controls' ? 'Controls' : 'Settings'}</h2>
        {tab === 'main' && (
          <div className="flex flex-col gap-3">
            <button className="btn-primary justify-center" onClick={onResume}><Play size={18} /> Resume</button>
            <button className="btn-ghost justify-center" onClick={onRestart}><RotateCcw size={18} /> Restart mission</button>
            <button className="btn-ghost justify-center" onClick={() => setTab('controls')}>Controls</button>
            <button className="btn-ghost justify-center" onClick={() => setTab('settings')}><Settings size={18} /> Sound &amp; settings</button>
            <button className="btn-ghost justify-center" onClick={onExit}><Home size={18} /> Exit to website</button>
          </div>
        )}
        {tab === 'controls' && <ControlsGuide />}
        {tab === 'settings' && (
          <div className="space-y-3">
            <label className="flex items-center justify-between gap-3"><span>Sound effects &amp; ambience</span>
              <input type="checkbox" className="h-5 w-5" checked={!muted} onChange={(e) => { progress.setSetting('muted', !e.target.checked); sfx.syncMute() }} /></label>
            <label className="flex items-center justify-between gap-3"><span>Reduce motion</span>
              <input type="checkbox" className="h-5 w-5" checked={reduced} onChange={(e) => progress.setSetting('reducedMotion', e.target.checked)} /></label>
          </div>
        )}
        {tab !== 'main' && <button className="btn-ghost mt-5" onClick={() => setTab('main')}>Back</button>}
      </div>
    </div>
  )
}

export function WebGLFallback({ onBack }) {
  return (
    <div className="grid min-h-screen place-items-center p-6 text-center">
      <div className="glass max-w-lg p-8">
        <X className="mx-auto mb-3 text-red-400" size={40} />
        <h1 className="mb-2 font-display text-2xl">The 3D game can't start</h1>
        <p className="mb-5 text-slate-300">Your browser or device doesn't support WebGL, or it was turned off. Try an up-to-date Chrome, Edge or Firefox on a desktop or laptop, and make sure hardware acceleration is enabled.</p>
        <button className="btn-primary" onClick={onBack}>Back to the website</button>
      </div>
    </div>
  )
}
