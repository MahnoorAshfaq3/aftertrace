import { Suspense, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import MarsEnvironment from './MarsEnvironment'
import MoonEnvironment from './MoonEnvironment'
import PlayerController from './PlayerController'
import OpportunityRover from './OpportunityRover'
import { SojournerModel, LunarRoverModel } from './ProceduralArtifacts'
import MysteryArtifact from './MysteryArtifact'
import ResourceDeposit from './ResourceDeposit'
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
  if (R.model === 'mer') return <OpportunityRover position={pos} rotationY={R.rotationY} size={R.size} />
  const Model = R.model === 'lrv' ? LunarRoverModel : SojournerModel
  return <group position={pos} rotation-y={R.rotationY}><Model size={R.size} /></group>
}

// One scene component for every mission: the mission data decides the planet, artifact, clues and props.
export default function MissionScene({ d, save, playerRef, keysRef, lookRef, activeRef, faceRef, onNearby, onStep, reduced, resetKey }) {
  const R = d.rover
  const Env = d.planet === 'moon' ? MoonEnvironment : MarsEnvironment
  const M = d.mysteryArtifact
  const resources = d.resources || []
  const availableResources = resources.filter((resource) => !save.resources?.[resource.type]?.includes(resource.id))
  const items = [
    { id: 'rover', pos: R.pos, radius: R.radius },
    ...d.clues.map((c) => ({ id: c.id, pos: c.pos, radius: c.radius })),
    ...(M ? [{ id: M.id, pos: M.pos, radius: M.radius }] : []),
    ...availableResources.map((resource) => ({ id: resource.id, pos: resource.pos, radius: resource.radius })),
  ]
  return (
    <>
      <Env playerRef={playerRef} reduced={reduced} />
      <Artifact d={d} />
      <InteractionMarker x={R.pos[0]} z={R.pos[1]} collected={save.rover} reduced={reduced} />
      {M && (
        <>
          <MysteryArtifact x={M.pos[0]} z={M.pos[1]} reduced={reduced} />
          <InteractionMarker x={M.pos[0]} z={M.pos[1]} collected={save.mysteryArtifactFound} reduced={reduced} />
        </>
      )}
      {availableResources.map((resource) => (
        <group key={resource.id}>
          <ResourceDeposit resource={resource} />
          <InteractionMarker x={resource.pos[0]} z={resource.pos[1]} collected={false} reduced={reduced} />
        </group>
      ))}
      {d.clues.map((c) => {
        const Prop = PROPS[c.prop]
        return (
          <group key={c.id}>
            <Prop x={c.pos[0]} z={c.pos[1]} reduced={reduced} />
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
