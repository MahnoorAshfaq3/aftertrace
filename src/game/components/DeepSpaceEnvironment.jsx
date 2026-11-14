import { Stars } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Terrain from './Terrain'
import { Rocks } from './MarsEnvironment'

export default function DeepSpaceEnvironment({ playerRef }) {
  const light = useRef()
  const target = useMemo(() => new THREE.Object3D(), [])
  useFrame(() => {
    const p = playerRef.current
    if (light.current && p) light.current.position.set(p.x + 24, 38, p.z + 18)
    target.position.set(p?.x || 0, 0, p?.z || 0)
    target.updateMatrixWorld()
  })
  return (
    <>
      <color attach="background" args={['#030611']} />
      <fog attach="fog" args={['#030611', 65, 220]} />
      <Stars radius={180} depth={80} count={1800} factor={3} saturation={0.2} fade speed={0.15} />
      <ambientLight intensity={0.35} color="#9aa9d2" />
      <primitive object={target} />
      <directionalLight ref={light} target={target} intensity={1.6} color="#dce5ff" />
      <Terrain planet="moon" />
      <Rocks colors={['#555967', '#969bad']} />
    </>
  )
}
