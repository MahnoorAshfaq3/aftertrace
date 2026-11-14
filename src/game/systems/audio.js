// Synthesised sound effects (no audio files needed). Nothing plays until the player
// has clicked something, because browsers block autoplay.
import { progress } from './MissionProgress'

let ctx = null, master = null, ambient = null
const muted = () => progress.get().settings.muted

function ac() {
  if (!ctx) {
    const C = window.AudioContext || window.webkitAudioContext
    if (!C) return null
    ctx = new C(); master = ctx.createGain(); master.gain.value = 0.6; master.connect(ctx.destination)
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}
function tone(f1, f2, dur, type = 'sine', vol = 0.18, delay = 0) {
  const c = ac(); if (!c || muted()) return
  const t = c.currentTime + delay, o = c.createOscillator(), g = c.createGain()
  o.type = type; o.frequency.setValueAtTime(f1, t); o.frequency.exponentialRampToValueAtTime(f2, t + dur)
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  o.connect(g); g.connect(master); o.start(t); o.stop(t + dur)
}
function noiseBuffer(c, secs) {
  const b = c.createBuffer(1, c.sampleRate * secs, c.sampleRate), d = b.getChannelData(0)
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  return b
}

// Browser text-to-speech narration: no external audio files or API key required.
export function narrate(text) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window) || !text) return
  try {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.94
    utterance.pitch = 0.92
    utterance.volume = muted() ? 0 : 0.9
    const voices = window.speechSynthesis.getVoices()
    const preferred = voices.find((v) => /^en(-|_)/i.test(v.lang) && /natural|google|microsoft/i.test(v.name))
      || voices.find((v) => /^en(-|_)/i.test(v.lang))
    if (preferred) utterance.voice = preferred
    window.speechSynthesis.speak(utterance)
  } catch { /* narration is optional; gameplay must continue */ }
}

export const sfx = {
  ui: () => tone(660, 880, 0.08, 'triangle', 0.1),
  discover: () => { tone(440, 660, 0.25, 'sine', 0.18); tone(660, 990, 0.3, 'sine', 0.14, 0.12) },
  clue: () => { tone(520, 780, 0.15, 'triangle', 0.16); tone(780, 1170, 0.2, 'triangle', 0.14, 0.12); tone(1040, 1560, 0.3, 'sine', 0.12, 0.25) },
  complete: () => [0, 0.15, 0.3, 0.5].forEach((d, i) => tone(392 * [1, 1.25, 1.5, 2][i], 392 * [1, 1.25, 1.5, 2][i] * 1.01, 0.5, 'triangle', 0.16, d)),
  wrong: () => tone(220, 150, 0.3, 'sawtooth', 0.1),
  step: () => {
    const c = ac(); if (!c || muted()) return
    const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain()
    s.buffer = noiseBuffer(c, 0.12); f.type = 'lowpass'; f.frequency.value = 500
    g.gain.setValueAtTime(0.16, c.currentTime); g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.1)
    s.connect(f); f.connect(g); g.connect(master); s.start()
  },
  startAmbient() {
    const c = ac(); if (!c || ambient) return
    const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain()
    s.buffer = noiseBuffer(c, 4); s.loop = true; f.type = 'lowpass'; f.frequency.value = 220
    g.gain.value = muted() ? 0 : 0.07
    s.connect(f); f.connect(g); g.connect(master); s.start()
    const padGain = c.createGain(); padGain.gain.value = muted() ? 0 : 0.018; padGain.connect(master)
    const padA = c.createOscillator(), padB = c.createOscillator()
    padA.type = 'sine'; padA.frequency.value = 110
    padB.type = 'triangle'; padB.frequency.value = 164.81
    padA.connect(padGain); padB.connect(padGain); padA.start(); padB.start()
    ambient = { s, g, padA, padB, padGain }
  },
  stopAmbient() { if (ambient) { try { ambient.s.stop(); ambient.padA.stop(); ambient.padB.stop() } catch { /* already stopped */ } ambient = null } },
  syncMute() { if (ambient) { ambient.g.gain.value = muted() ? 0 : 0.07; ambient.padGain.gain.value = muted() ? 0 : 0.018 } },
}
