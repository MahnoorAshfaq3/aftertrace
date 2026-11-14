import { Suspense, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import MarsEnvironment from './MarsEnvironment'
import MoonEnvironment from './MoonEnvironment'
import DeepSpaceEnvironment from './DeepSpaceEnvironment'
import PlayerController from './PlayerController'
import OpportunityRover, { GLBModel, ProceduralRover } from './OpportunityRover'
import { SojournerModel, LunarRoverModel } from './ProceduralArtifacts'
import InteractionMarker from './InteractionMarker'
import { PROPS } from './ClueProps'
import { heightAt } from '../world'

// Checks every 0.1s which interactive thing (if any) is close enough to press E on.
function InteractionSystem({ playerRef, items, onNearby }) {
  const last = useRef(null), t = useRef(0)
  useFrame((_, dt) => {
    t.current += dt; if (t.current < 0.1) return; t.current = 0
    const p = playerRef.current; let best = null, bd = Infinity
    for (const it of items) { const d = Math.hypot(p.x - it.pos[0], p.z - it.pos[1]); if (d < it.radius && d < bd) { best = it.id; bd = d } }
    if (best !== last.current) { last.current = best; onNearby(best) }
  })
  return null
}

function Artifact({ d }) {
  const R = d.rover, [x, z] = R.pos, pos = [x, heightAt(x, z), z]
  if (R.url) return <group position={pos} rotation-y={R.rotationY}><GLBModel url={R.url} size={R.size || 3.5} fallback={<ProceduralRover />} /></group>
  if (R.model === 'mer') return <OpportunityRover position={pos} rotationY={R.rotationY} size={R.size} url={R.url} />
  if (R.model === 'lrv' || d.id === 'apollo-lrv') return <group position={pos} rotation-y={R.rotationY}><LunarRoverModel size={R.size} /></group>
  if (d.id === 'sojourner') return <group position={pos} rotation-y={R.rotationY}><SojournerModel size={R.size} /></group>
  return <group position={pos} rotation-y={R.rotationY}>
    {d.planet === 'deep' ? (
      <>
        <mesh position-y={0.7} castShadow><boxGeometry args={[1.5, 0.8, 1.2]} /><meshStandardMaterial color="#c7cbd2" metalness={0.75} roughness={0.35} /></mesh>
        {[-1, 1].map((side) => <mesh key={side} position={[side * 1.7, 0.75, 0]}><boxGeometry args={[1.7, 0.06, 1.0]} /><meshStandardMaterial color="#183c79" metalness={0.6} roughness={0.3} /></mesh>)}
        <mesh position-y={1.45}><cylinderGeometry args={[0.04, 0.04, 1.2, 8]} /><meshStandardMaterial color="#bbb" /></mesh>
        <mesh position-y={2.05}><sphereGeometry args={[0.22, 16, 12]} /><meshStandardMaterial color="#d5d5d5" metalness={0.7} /></mesh>
      </>
    ) : (
      <>
        <mesh position-y={0.9} castShadow><boxGeometry args={[1.5, 1.0, 1.4]} /><meshStandardMaterial color="#c7cbd2" metalness={0.65} roughness={0.4} /></mesh>
        {[[-1,-1],[1,-1],[-1,1],[1,1]].map(([x,z]) => <mesh key={`${x}-${z}`} position={[x*0.9,0.45,z*0.9]} rotation={[0,0,x*0.35]}><cylinderGeometry args={[0.045,0.045,1.0,8]} /><meshStandardMaterial color="#aaa" metalness={0.7} /></mesh>)}
        <mesh position={[0,1.65,0]}><cylinderGeometry args={[0.05,0.05,0.8,8]} /><meshStandardMaterial color="#aaa" /></mesh>
        {d.id === 'alsep' && <mesh position={[1.4,0.5,0]} rotation-x={-0.5}><boxGeometry args={[1.5,0.05,0.9]} /><meshStandardMaterial color="#1b3268" metalness={0.5} /></mesh>}
      </>
    )}
  </group>
}

// One scene component for every mission: the mission data decides the planet, artifact, clues and props.
export default function MissionScene({ d, save, playerRef, keysRef, lookRef, activeRef, faceRef, onNearby, onStep, reduced, resetKey }) {
  const R = d.rover
  const Env = d.planet === 'moon' ? MoonEnvironment : d.planet === 'deep' ? DeepSpaceEnvironment : MarsEnvironment
  const items = [{ id: 'rover', pos: R.pos, radius: R.radius }, ...d.clues.map((c) => ({ id: c.id, pos: c.pos, radius: c.radius }))]
  return (
    <>
      <Env playerRef={playerRef} reduced={reduced} />
      <Artifact d={d} />
      <InteractionMarker x={R.pos[0]} z={R.pos[1]} collected={save.rover} reduced={reduced} />
      {d.clues.map((c) => {
        const Prop = PROPS[c.prop]
        return (
          <group key={c.id}>
            <Prop x={c.pos[0] + (c.propOffset?.[0] || 0)} z={c.pos[1] + (c.propOffset?.[1] || 0)} reduced={reduced} />
            <InteractionMarker x={c.pos[0]} z={c.pos[1]} collected={save.clues.includes(c.id)} reduced={reduced} />
          </group>
        )
      })}
      <Suspense fallback={null}>
        <PlayerController key={resetKey} keysRef={keysRef} lookRef={lookRef} activeRef={activeRef} playerRef={playerRef} faceRef={faceRef} onStep={onStep} />
      </Suspense>
      <InteractionSystem playerRef={playerRef} items={items} onNearby={onNearby} />
    </>
  )
}
