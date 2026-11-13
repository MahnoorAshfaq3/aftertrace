import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Astronaut from './Astronaut'
import { heightAt, getWorld, WORLD_RADIUS } from '../world'

const WALK = 3.2, RUN = 6.8, RADIUS = 0.45
const CAM_DIST = 5.6, CAM_TARGET_H = 1.5

const lerpAngle = (a, b, t) => { let d = ((b - a + Math.PI) % (Math.PI * 2)) - Math.PI; if (d < -Math.PI) d += Math.PI * 2; return a + d * t }

// Moves the astronaut, keeps it on the ground, blocks it at rocks/equipment, and drives the third-person camera.
export default function PlayerController({ keysRef, lookRef, activeRef, playerRef, faceRef, onStep }) {
  const group = useRef(), anim = useRef('idle')
  const vel = useRef(new THREE.Vector2()), yVel = useRef(0), grounded = useRef(true)
  const rotY = useRef(Math.PI), stepDist = useRef(0)
  const camPos = useRef(null), camLook = useRef(new THREE.Vector3()), tmp = useRef(new THREE.Vector3())

  useFrame(({ camera }, delta) => {
    const dt = Math.min(delta, 0.05), g = group.current, p = playerRef.current
    const k = keysRef.current, look = lookRef.current
    const active = activeRef.current

    let mx = 0, mz = 0, running = false
    if (active) {
      const f = (k.KeyW || k.ArrowUp ? 1 : 0) - (k.KeyS || k.ArrowDown ? 1 : 0)
      const r = (k.KeyD || k.ArrowRight ? 1 : 0) - (k.KeyA || k.ArrowLeft ? 1 : 0)
      const fx = -Math.sin(look.yaw), fz = -Math.cos(look.yaw)
      mx = fx * f - fz * r; mz = fz * f + fx * r
      const len = Math.hypot(mx, mz)
      if (len > 0) { mx /= len; mz /= len }
      running = !!(k.ShiftLeft || k.ShiftRight)
    }
    const speed = running ? RUN : WALK
    vel.current.x = THREE.MathUtils.damp(vel.current.x, mx * speed, 10, dt)
    vel.current.y = THREE.MathUtils.damp(vel.current.y, mz * speed, 10, dt)

    p.x += vel.current.x * dt; p.z += vel.current.y * dt

    // Collision: push the player out of rocks/equipment
    const W = getWorld()
    for (const c of W.colliders) {
      const dx = p.x - c.x, dz = p.z - c.z, d = Math.hypot(dx, dz), min = c.r + RADIUS
      if (d < min && d > 1e-4) { p.x = c.x + (dx / d) * min; p.z = c.z + (dz / d) * min }
    }
    // Keep inside the playable circle
    const rr = Math.hypot(p.x, p.z)
    if (rr > WORLD_RADIUS) { p.x *= WORLD_RADIUS / rr; p.z *= WORLD_RADIUS / rr }

    // Ground + jumping
    const gy = heightAt(p.x, p.z)
    if (active && k.Space && grounded.current) { yVel.current = W.jump; grounded.current = false }
    if (grounded.current && p.y - gy < 0.4 && yVel.current <= 0) { p.y = gy }
    else { yVel.current -= W.gravity * dt; p.y += yVel.current * dt }
    if (p.y <= gy) { p.y = gy; yVel.current = 0; grounded.current = true } else if (p.y - gy > 0.4) grounded.current = false

    // Face the direction of travel
    const moving = Math.hypot(vel.current.x, vel.current.y) > 0.4
    if (moving) rotY.current = lerpAngle(rotY.current, Math.atan2(vel.current.x, vel.current.y), 1 - Math.exp(-12 * dt))
    else if (!active && faceRef?.current) rotY.current = lerpAngle(rotY.current, Math.atan2(faceRef.current[0] - p.x, faceRef.current[1] - p.z), 1 - Math.exp(-6 * dt))
    g.position.copy(p); g.rotation.y = rotY.current

    anim.current = !moving ? 'idle' : running ? 'run' : 'walk'
    if (moving && grounded.current) {
      stepDist.current += Math.hypot(vel.current.x, vel.current.y) * dt
      if (stepDist.current > (running ? 2.3 : 1.7)) { stepDist.current = 0; onStep?.() }
    }

    // Third-person camera: behind and above, never below the ground
    const cp = Math.cos(look.pitch), t = tmp.current
    const target = new THREE.Vector3(p.x, p.y + CAM_TARGET_H, p.z)
    t.set(p.x + Math.sin(look.yaw) * cp * CAM_DIST, target.y + Math.sin(look.pitch) * CAM_DIST, p.z + Math.cos(look.yaw) * cp * CAM_DIST)
    t.y = Math.max(t.y, heightAt(t.x, t.z) + 0.6)
    if (!camPos.current) { camPos.current = t.clone(); camLook.current.copy(target) }
    const a = 1 - Math.exp(-10 * dt)
    camPos.current.lerp(t, a); camLook.current.lerp(target, a)
    camera.position.copy(camPos.current); camera.lookAt(camLook.current)
  })

  return (
    <group ref={group}>
      <AstronautBridge anim={anim} />
    </group>
  )
}
// small wrapper so Astronaut reads the animation state from the ref every frame
function AstronautBridge({ anim }) { return <Astronaut stateRef={anim} /> }
