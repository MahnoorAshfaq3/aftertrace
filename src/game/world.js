// Each mission gets its own world (Mars or Moon) generated from math, so no terrain file is needed.
// setWorld(missionData) must run before the 3D scene renders. heightAt(x,z) is the ground height anywhere.
import { MISSION_DATA } from '../data/missions'

const sm = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }
export const smooth = sm
export const hash2 = (x, z) => { const s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453; return s - Math.floor(s) }
export const WORLD_RADIUS = 95

function rng(seed) { let a = seed; return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 } }

function crater(x, z, [cx, cz, R, D]) {
  const d = Math.hypot(x - cx, z - cz)
  if (d < R) return -D * (1 - (d / R) ** 2)
  if (d < R * 1.4) return D * 0.25 * Math.exp(-(((d - R) / (R * 0.2)) ** 2))
  return 0
}

const MARS_CRATERS = [[30, 20, 14, 3.2], [-48, 10, 18, 4], [-10, -70, 16, 3.5], [55, -40, 12, 2.8]]
function marsHeight(x, z) {
  const r = Math.hypot(x, z)
  let h = Math.sin(x * 0.045) * Math.cos(z * 0.04) * 2.6 + Math.sin(x * 0.11 + z * 0.07) * 0.8 + Math.cos(z * 0.13 - x * 0.05) * 0.5 + Math.sin((x + z) * 0.02) * 3
  h *= 0.35 + 0.65 * sm(8, 40, r)
  for (const c of MARS_CRATERS) h += crater(x, z, c)
  h += 60 * Math.pow(sm(75, 140, r), 1.4) * (0.7 + 0.3 * Math.sin(Math.atan2(z, x) * 6 + 1))
  return h
}

function makeMoonCraters(keySpots) {
  const rand = rng(777), out = []
  let guard = 0
  while (out.length < 16 && guard++ < 500) {
    const a = rand() * Math.PI * 2, d = 18 + rand() * 68, R = 5 + rand() * 10
    const x = Math.cos(a) * d, z = Math.sin(a) * d
    if (keySpots.some(([kx, kz]) => Math.hypot(x - kx, z - kz) < R * 1.5 + 3)) continue
    out.push([x, z, R, 0.5 + R * 0.22])
  }
  return out
}
const moonHeightFor = (craters) => (x, z) => {
  const r = Math.hypot(x, z)
  let h = Math.sin(x * 0.03) * Math.cos(z * 0.035) * 1.4 + Math.sin(x * 0.09 + z * 0.05) * 0.4
  h *= 0.3 + 0.7 * sm(8, 40, r)
  for (const c of craters) h += crater(x, z, c)
  h += 38 * Math.pow(sm(78, 140, r), 1.5) * (0.7 + 0.3 * Math.sin(Math.atan2(z, x) * 5 + 2))
  return h
}

function makeRocks(keySpots, count, seed) {
  const rand = rng(seed), out = []
  while (out.length < count) {
    const a = rand() * Math.PI * 2, d = 6 + rand() * 82
    const x = Math.cos(a) * d, z = Math.sin(a) * d
    if (keySpots.some(([kx, kz]) => Math.hypot(x - kx, z - kz) < 7)) continue
    out.push({ x, z, s: 0.4 + Math.pow(rand(), 2.2) * 2.4, ry: rand() * 6.28, squash: 0.55 + rand() * 0.4, tint: rand() })
  }
  return out
}

let cur = null
export function setWorld(data) {
  if (cur && cur.id === data.id) return cur
  const keySpots = [
    [0, 6], data.rover.pos, ...data.clues.map((c) => c.pos),
    ...(data.mysteryArtifact ? [data.mysteryArtifact.pos] : []),
    ...(data.resources || []).map((r) => r.pos),
  ]
  const moon = data.planet === 'moon'
  const rocks = makeRocks(keySpots, moon ? 170 : 150, moon ? 99 : 1234)
  cur = {
    id: data.id, planet: data.planet, rocks,
    fn: moon ? moonHeightFor(makeMoonCraters(keySpots)) : marsHeight,
    gravity: moon ? 4.6 : 9, jump: moon ? 3.8 : 4.2,
    colliders: [
      { x: data.rover.pos[0], z: data.rover.pos[1], r: data.rover.collider },
      ...data.clues.map((c) => ({ x: c.pos[0], z: c.pos[1], r: 1.1 })),
      ...(data.mysteryArtifact ? [{ x: data.mysteryArtifact.pos[0], z: data.mysteryArtifact.pos[1], r: data.mysteryArtifact.collider }] : []),
      ...(data.resources || []).map((r) => ({ x: r.pos[0], z: r.pos[1], r: r.collider })),
      ...rocks.filter((r) => r.s > 1.0).map((r) => ({ x: r.x, z: r.z, r: r.s * 0.85 })),
    ],
  }
  return cur
}
export const getWorld = () => cur
export const heightAt = (x, z) => cur.fn(x, z)

setWorld(MISSION_DATA.opportunity) // default so the landing page works before any mission is chosen
