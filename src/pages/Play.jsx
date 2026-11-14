import { Component, useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { useProgress as useAssetProgress } from '@react-three/drei'
import * as THREE from 'three'
import MissionScene from '../game/components/MissionScene'
import { Briefing, HUD, BottomBar, Toast, InfoPanel, QuizPanel, CompletePanel, PauseMenu, LoadingOverlay, WebGLFallback } from '../game/components/Overlays'
import { progress, useSave, totals } from '../game/systems/MissionProgress'
import { sfx, narrate } from '../game/systems/audio'
import { webglAvailable } from '../game/webgl'
import { MISSIONS, MISSION_DATA } from '../data/missions'
import { heightAt, setWorld } from '../game/world'

class CanvasBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

const SPAWN = () => new THREE.Vector3(0, heightAt(0, 6), 6)

// The key makes React rebuild the whole game when the mission changes.
export default function Play() {
  const [p] = useSearchParams()
  return <PlayInner key={`${p.get('mission') || 'opportunity'}-${p.get('mode') || ''}`} />
}

function PlayInner() {
  const nav = useNavigate()
  const [params] = useSearchParams()
  const missionId = params.get('mission') || 'opportunity'
  const explore = params.get('mode') === 'explore'
  const mission = MISSIONS.find((m) => m.id === missionId)
  const d = MISSION_DATA[missionId]
  if (d) setWorld(d) // builds the right planet before anything renders
  const save = useSave()
  const ms = progress.mission(missionId)
  const t = totals(save)

  const [ui, setUi] = useState('briefing') // briefing | play | panel | quiz | complete | pause
  const [panelId, setPanelId] = useState(null)
  const [pauseTab, setPauseTab] = useState('main')
  const [nearby, setNearby] = useState(null)
  const [toast, setToast] = useState('')
  const [locked, setLocked] = useState(false)
  const [freeRoam, setFreeRoam] = useState(false)
  const [resetKey, setResetKey] = useState(0)
  const [ready, setReady] = useState(false)
  const gl = useRef(webglAvailable()).current

  const face = useRef(null)
  const wrap = useRef(), keys = useRef({}), look = useRef({ yaw: 0, pitch: 0.35 }), player = useRef(SPAWN())
  const active = useRef(false), uiRef = useRef(ui), nearRef = useRef(null), msRef = useRef(ms), freeRef = useRef(false)
  uiRef.current = ui; nearRef.current = nearby; msRef.current = ms; freeRef.current = freeRoam
  active.current = ui === 'play'

  const { progress: loadPct, active: loading } = useAssetProgress()
  useEffect(() => { if (!loading && loadPct >= 100) setReady(true) }, [loading, loadPct])
  // never get stuck on the loading screen if nothing needed loading
  useEffect(() => { const id = setTimeout(() => setReady(true), 20000); return () => clearTimeout(id) }, [])

  const lock = useCallback(() => { const c = wrap.current?.querySelector('canvas'); try { const r = c?.requestPointerLock?.(); r?.catch?.(() => {}) } catch { /* ignore */ } }, [])
  const unlock = () => { try { document.exitPointerLock?.() } catch { /* ignore */ } }
  const say = (txt) => { setToast(txt); setTimeout(() => setToast(''), 2600) }

  const closePanel = useCallback(() => {
    sfx.ui()
    const m = progress.mission(missionId)
    if (!explore && !freeRef.current && m.rover && m.clues.length >= 3 && !m.quizCorrect) { setUi('quiz') } else { setUi('play'); lock() }
    setPanelId(null)
  }, [missionId, explore, lock])

  const interact = useCallback(() => {
    const id = nearRef.current
    if (uiRef.current !== 'play' || !id) return
    face.current = id === 'rover' ? d.rover.pos : d.clues.find((c) => c.id === id)?.pos || null
    if (id === 'rover') { progress.discoverRover(missionId); sfx.discover(); say(`${d.artifactName} discovered!`); narrate(`${d.artifactName}. ${d.briefing} ${d.roverFacts?.map(([k, v]) => `${k}: ${v}`).join('. ') || ''}`) }
    else {
      const had = progress.mission(missionId).clues.includes(id)
      progress.collectClue(missionId, id); sfx.clue()
      if (!had) { say(`Clue collected (${progress.mission(missionId).clues.length}/3)`); const clue = d.clues.find((c) => c.id === id); if (clue) narrate(`${clue.title}. ${clue.text} ${clue.fact || ''}`) }
    }
    uiRef.current = 'panel'; setPanelId(id); setUi('panel'); unlock()
  }, [missionId, d])

  useEffect(() => {
    if (!gl) return
    const down = (e) => {
      keys.current[e.code] = true
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code) && uiRef.current === 'play') e.preventDefault()
      if (e.code === 'KeyE' && !e.repeat) interact()
      if (e.code === 'Escape') {
        if (uiRef.current === 'panel') closePanel()
        else if (uiRef.current === 'play' && !document.pointerLockElement) { setPauseTab('main'); setUi('pause') }
      }
    }
    const up = (e) => { keys.current[e.code] = false }
    const move = (e) => {
      const locked = !!document.pointerLockElement
      if (uiRef.current !== 'play' || (!locked && !(e.buttons & 1))) return
      look.current.yaw -= e.movementX * 0.0025
      look.current.pitch = Math.min(1.2, Math.max(0.02, look.current.pitch + e.movementY * 0.0022))
    }
    const lockChange = () => {
      const l = !!document.pointerLockElement; setLocked(l)
      if (!l && uiRef.current === 'play') { setPauseTab('main'); setUi('pause') }
    }
    const blur = () => { keys.current = {} }
    const canvasClick = (e) => { if (uiRef.current === 'play' && !document.pointerLockElement && e.target.tagName === 'CANVAS') lock() }
    window.addEventListener('keydown', down); window.addEventListener('keyup', up); window.addEventListener('mousemove', move); window.addEventListener('blur', blur)
    document.addEventListener('pointerlockchange', lockChange); document.addEventListener('click', canvasClick)
    return () => {
      window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); window.removeEventListener('mousemove', move); window.removeEventListener('blur', blur)
      document.removeEventListener('pointerlockchange', lockChange); document.removeEventListener('click', canvasClick)
      unlock(); sfx.stopAmbient(); if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    }
  }, [gl, interact, closePanel, lock])

  const start = () => { sfx.ui(); sfx.startAmbient(); setUi('play'); lock() }
  const resume = () => { sfx.ui(); setUi('play'); lock() }
  const restart = () => { progress.resetMission(missionId); player.current.copy(SPAWN()); look.current = { yaw: 0, pitch: 0.35 }; setResetKey((k) => k + 1); setFreeRoam(false); setUi('briefing') }
  const solved = (ok, finish) => {
    if (!finish) { progress.answerQuiz(missionId, ok); return }
    progress.completeMission(missionId); sfx.complete(); setUi('complete')
  }

  if (!mission || !mission.playable) {
    return <div className="grid min-h-screen place-items-center p-6 text-center"><div className="glass max-w-md p-8"><h1 className="mb-2 font-display text-2xl">Mission not found</h1><p className="mb-5 text-slate-300">We couldn't find that mission.</p><button className="btn-primary" onClick={() => nav('/explore')}>Back to Mission Atlas</button></div></div>
  }
  if (!gl) return <WebGLFallback onBack={() => nav('/')} />

  return (
    <div ref={wrap} className="fixed inset-0 select-none overflow-hidden bg-space-950">
      <CanvasBoundary fallback={<WebGLFallback onBack={() => nav('/')} />}>
        <Canvas shadows dpr={[1, 1.75]} camera={{ fov: 55, near: 0.1, far: 500, position: [0, 4, 12] }} gl={{ antialias: true, powerPreference: 'high-performance' }}>
          <MissionScene d={d} faceRef={face} save={ms} playerRef={player} keysRef={keys} lookRef={look} activeRef={active} onNearby={setNearby} onStep={sfx.step} reduced={save.settings.reducedMotion} resetKey={resetKey} />
        </Canvas>
      </CanvasBoundary>

      {!ready && <LoadingOverlay progress={loadPct} />}
      {ready && ui !== 'briefing' && ui !== 'complete' && <HUD d={d} ms={ms} explore={explore} freeRoam={freeRoam} muted={save.settings.muted} onToggleMute={() => { progress.setSetting('muted', !save.settings.muted); sfx.syncMute() }} onPause={() => { uiRef.current = 'pause'; unlock(); setPauseTab('main'); setUi('pause') }} onSettings={() => { uiRef.current = 'pause'; unlock(); setPauseTab('settings'); setUi('pause') }} />}
      {ready && ui === 'play' && <BottomBar nearby={nearby} locked={locked} label={nearby === 'rover' ? d.artifactName : ''} />}
      <Toast text={toast} />
      {ready && ui === 'briefing' && <Briefing d={d} onlyExplore={explore} onStart={start} onBack={() => nav('/explore')} />}
      {ui === 'panel' && <InfoPanel d={d} id={panelId} onClose={closePanel} />}
      {ui === 'quiz' && <QuizPanel d={d} onSolved={solved} />}
      {ui === 'complete' && <CompletePanel d={d} ms={ms} points={t.points} onContinue={() => { setFreeRoam(true); setUi('play'); lock() }} onAtlas={() => nav('/explore')} />}
      {ui === 'pause' && <PauseMenu key={pauseTab} tab={pauseTab} muted={save.settings.muted} reduced={save.settings.reducedMotion} onResume={resume} onRestart={restart} onExit={() => nav('/')} />}
    </div>
  )
}
