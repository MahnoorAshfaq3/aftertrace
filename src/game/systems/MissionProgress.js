import { MISSIONS } from '../../data/missions.js'
import { useSyncExternalStore } from 'react'
import { BADGES } from '../../data/achievements'

const KEY = 'aftertrace.progress.v1'
const DEFAULT = { missions: {}, timeline: { solved: false }, settings: { muted: false, reducedMotion: false } }
const EMPTY_MISSION = { clues: [], rover: false, quizCorrect: false, completed: false }

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '{}')
    return { ...DEFAULT, ...raw, settings: { ...DEFAULT.settings, ...(raw.settings || {}) } }
  } catch { return { ...DEFAULT } }
}

let state = load()
const subs = new Set()
function set(next) {
  state = next
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* private mode etc. */ }
  applyMotionClass()
  subs.forEach((f) => f())
}
function applyMotionClass() {
  if (typeof document !== 'undefined') document.documentElement.classList.toggle('reduce-motion', !!state.settings.reducedMotion)
}
applyMotionClass()

const mission = (id) => ({ ...EMPTY_MISSION, ...(state.missions[id] || {}) })
const patch = (id, p) => set({ ...state, missions: { ...state.missions, [id]: { ...mission(id), ...p } } })

export const progress = {
  get: () => state,
  subscribe: (f) => { subs.add(f); return () => subs.delete(f) },
  mission,
  collectClue(id, clueId) { const m = mission(id); if (!m.clues.includes(clueId)) patch(id, { clues: [...m.clues, clueId] }) },
  discoverRover(id) { if (!mission(id).rover) patch(id, { rover: true }) },
  answerQuiz(id, correct) { if (correct) patch(id, { quizCorrect: true }) },
  completeMission(id) { patch(id, { completed: true }) },
  resetMission(id) { set({ ...state, missions: { ...state.missions, [id]: { ...EMPTY_MISSION } } }) },
  solveTimeline() { set({ ...state, timeline: { solved: true } }) },
  setSetting(key, value) { set({ ...state, settings: { ...state.settings, [key]: value } }) },
  resetAll() { set({ ...DEFAULT, settings: state.settings }) },
}

export function useSave() { return useSyncExternalStore(progress.subscribe, progress.get) }

// Points are DERIVED from what you've done, so they can never be double counted.
export function totals(s) {
  let points = 0, clues = 0, missionsDone = 0
  for (const m of Object.values(s.missions)) {
    clues += m.clues?.length || 0
    points += (m.clues?.length || 0) * 50 + (m.rover ? 50 : 0) + (m.quizCorrect ? 100 : 0) + (m.completed ? 100 : 0)
    if (m.completed) missionsDone++
  }
  if (s.timeline.solved) points += 100
  const badges = BADGES.filter((b) => b.test(s))
  const totalMissions = MISSIONS.length
  return { points, clues, missionsDone, badges, totalMissions, percent: Math.round((missionsDone / totalMissions) * 100) }
}
