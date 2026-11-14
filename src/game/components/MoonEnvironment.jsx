import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import Terrain from './Terrain'
import { Rocks } from './MarsEnvironment'

// No air on the Moon: black sky, hard shadows, no fog, and Earth hanging in the distance.
export default function MoonEnvironment({ playerRef }) {
  const sun = useRef(), target = useMemo(() => new THREE.Object3D(), [])
  useFrame(() => {
    const p = playerRef.current
    sun.current.position.set(p.x + 40, 40, p.z + 25); target.position.set(p.x, 0, p.z); target.updateMatrixWorld()
  })
  return (
    <>
      <color attach="background" args={['#01020a']} />
      <Stars radius={280} depth={40} count={4000} factor={6} fade speed={0} />
      <mesh position={[-150, 105, -260]}>
        <sphereGeometry args={[24, 40, 28]} />
        <meshStandardMaterial color="#3a78d8" emissive="#0d2a66" emissiveIntensity={0.7} roughness={0.9} />
      </mesh>
      <hemisphereLight args={['#aab4ff', '#202024', 0.22]} />
      <primitive object={target} />
      <directionalLight ref={sun} target={target} intensity={3.2} color="#ffffff" castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-28} shadow-camera-right={28} shadow-camera-top={28} shadow-camera-bottom={-28} shadow-camera-near={1} shadow-camera-far={140} shadow-bias={-0.0004} />
      <Terrain planet="moon" />
      <Rocks colors={['#4a4a4f', '#9c9ca2']} />
    </>
  )
}
