import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import Terrain from '../game/components/Terrain'
import Astronaut from '../game/components/Astronaut'
import OpportunityRover from '../game/components/OpportunityRover'
import AssetBoundary from '../game/components/AssetBoundary'
import { heightAt, setWorld } from '../game/world'
import { MISSION_DATA } from '../data/missions'

function Rig({ reduced }) {
  useFrame(({ camera, pointer }) => {
    if (!reduced) camera.position.x += (pointer.x * 0.8 - camera.position.x) * 0.03
    camera.lookAt(1.6, 2.2, -6)
  })
  return null
}

export default function HeroScene({ reduced }) {
  setWorld(MISSION_DATA.opportunity)
  const idle = useRef('idle')
  return (
    <Canvas dpr={[1, 1.5]} camera={{ fov: 42, position: [0, 1.7, 7] }} gl={{ antialias: true, alpha: true }} style={{ position: 'absolute', inset: 0 }}>
      <fog attach="fog" args={['#2a1a22', 25, 120]} />
      <hemisphereLight args={['#ffcfa6', '#3a2030', 1.0]} />
      <directionalLight position={[-6, 10, 8]} intensity={2.4} color="#ffd9b8" />
      <Stars radius={150} depth={40} count={2500} factor={5} fade speed={reduced ? 0 : 0.4} />
      <mesh position={[26, 22, -60]}><sphereGeometry args={[16, 48, 32]} /><meshStandardMaterial color="#b5553a" roughness={1} emissive="#4a1a10" /></mesh>
      <mesh position={[-4, 17, -60]}><sphereGeometry args={[3, 32, 24]} /><meshStandardMaterial color="#2f6fd0" roughness={0.8} emissive="#0a2350" /></mesh>
      <group position={[0, -heightAt(0, 0) - 0, 0]}>
        <Terrain size={260} segments={110} />
        <group position={[-1.4, heightAt(-1.4, 0), 0]} rotation-y={Math.PI + 0.25}>
          <Suspense fallback={null}><AssetBoundary><Astronaut stateRef={idle} /></AssetBoundary></Suspense>
        </group>
        <OpportunityRover position={[5.5, heightAt(5.5, -6), -6]} rotationY={-0.7} size={4.2} />
      </group>
      <Rig reduced={reduced} />
    </Canvas>
  )
}
