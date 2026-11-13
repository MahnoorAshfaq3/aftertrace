import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { heightAt } from '../world'

function Place({ x, z, children }) { return <group position={[x, heightAt(x, z), z]}>{children}</group> }

export function SolarPanelProp({ x, z }) {
  return (
    <Place x={x} z={z}>
      <mesh position-y={0.6} castShadow><cylinderGeometry args={[0.06, 0.08, 1.2, 8]} /><meshStandardMaterial color="#9a9a9a" metalness={0.7} roughness={0.4} /></mesh>
      <mesh position-y={1.3} rotation-x={-0.7} castShadow receiveShadow><boxGeometry args={[2.4, 0.08, 1.5]} /><meshStandardMaterial color="#16245a" metalness={0.7} roughness={0.25} /></mesh>
      <mesh position-y={1.33} rotation-x={-0.7}><boxGeometry args={[2.0, 0.02, 1.1]} /><meshStandardMaterial color="#b0804f" transparent opacity={0.45} roughness={1} /></mesh>
    </Place>
  )
}

export function DustProp({ x, z, reduced }) {
  const swirl = useRef()
  useFrame((_, dt) => { if (!reduced && swirl.current) swirl.current.rotation.y += dt * 0.8 })
  return (
    <Place x={x} z={z}>
      <mesh ref={swirl} position-y={3.4}>
        <coneGeometry args={[1.6, 7, 20, 1, true]} />
        <meshStandardMaterial color="#d9a074" transparent opacity={0.35} side={THREE.DoubleSide} depthWrite={false} roughness={1} />
      </mesh>
      <mesh position-y={0.35} castShadow><dodecahedronGeometry args={[0.7]} /><meshStandardMaterial color="#8a4a2b" roughness={1} /></mesh>
    </Place>
  )
}

export function AntennaProp({ x, z }) {
  return (
    <Place x={x} z={z}>
      <mesh position-y={0.9} castShadow><cylinderGeometry args={[0.05, 0.07, 1.8, 8]} /><meshStandardMaterial color="#aaaaaa" metalness={0.8} roughness={0.35} /></mesh>
      <mesh position-y={1.9} rotation={[-0.9, 0, 0]} castShadow><sphereGeometry args={[1.0, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2.2]} /><meshStandardMaterial color="#e6e6e6" metalness={0.5} roughness={0.4} side={THREE.DoubleSide} /></mesh>
      <mesh position={[0, 2.45, -0.45]} rotation-x={-0.9}><cylinderGeometry args={[0.02, 0.02, 0.8, 6]} /><meshStandardMaterial color="#ccc" /></mesh>
    </Place>
  )
}


export function SilicaProp({ x, z }) {
  return (
    <Place x={x} z={z}>
      <mesh position-y={0.25} scale={[1.6, 0.5, 1.3]} castShadow receiveShadow><sphereGeometry args={[1, 20, 12]} /><meshStandardMaterial color="#efe6d2" roughness={1} /></mesh>
      <mesh position={[0.9, 0.18, 0.5]} castShadow><dodecahedronGeometry args={[0.35]} /><meshStandardMaterial color="#d9cdb3" roughness={1} /></mesh>
    </Place>
  )
}
export function SandProp({ x, z }) {
  return (
    <Place x={x} z={z}>
      <mesh position-y={0.2} scale={[2.2, 0.55, 1.8]} receiveShadow><sphereGeometry args={[1, 20, 12]} /><meshStandardMaterial color="#cf9461" roughness={1} /></mesh>
      <mesh position={[0, 0.55, 0]} rotation={[0.5, 0, Math.PI / 2]} castShadow><cylinderGeometry args={[0.4, 0.4, 0.25, 16]} /><meshStandardMaterial color="#333" /></mesh>
    </Place>
  )
}
export function LanderProp({ x, z }) {
  return (
    <Place x={x} z={z}>
      {[0, 1, 2].map((i) => <mesh key={i} position={[Math.cos((i * Math.PI * 2) / 3) * 0.8, 0.3, Math.sin((i * Math.PI * 2) / 3) * 0.8]} rotation={[0.9, (-i * Math.PI * 2) / 3 + Math.PI / 2, 0]} castShadow><boxGeometry args={[1.1, 0.06, 1.2]} /><meshStandardMaterial color="#c9ccd2" metalness={0.6} roughness={0.4} /></mesh>)}
      <mesh position-y={0.5} castShadow><tetrahedronGeometry args={[0.5]} /><meshStandardMaterial color="#d9c27a" metalness={0.7} roughness={0.3} /></mesh>
    </Place>
  )
}
export function BigRockProp({ x, z }) {
  return (
    <Place x={x} z={z}>
      <mesh position-y={0.7} scale={[1.3, 0.9, 1]} castShadow receiveShadow><dodecahedronGeometry args={[1]} /><meshStandardMaterial color="#7d4128" roughness={1} flatShading /></mesh>
    </Place>
  )
}
export function LunarModuleProp({ x, z }) {
  return (
    <Place x={x} z={z}>
      <mesh position-y={1.0} castShadow><boxGeometry args={[2.0, 0.9, 2.0]} /><meshStandardMaterial color="#c9a227" metalness={0.85} roughness={0.3} /></mesh>
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, b]) => <mesh key={`${a}${b}`} position={[a * 1.3, 0.5, b * 1.3]} rotation={[b * 0.45, 0, -a * 0.45]} castShadow><cylinderGeometry args={[0.05, 0.05, 1.6, 6]} /><meshStandardMaterial color="#bbb" metalness={0.7} /></mesh>)}
    </Place>
  )
}
export function BatteryProp({ x, z }) {
  return (
    <Place x={x} z={z}>
      <mesh position={[0, 0.45, 0]} rotation-z={Math.PI / 2} castShadow><cylinderGeometry args={[0.45, 0.45, 0.2, 20, 1, true]} /><meshStandardMaterial color="#8a8a8a" side={THREE.DoubleSide} roughness={0.8} /></mesh>
      <mesh position={[1.1, 0.3, 0]} castShadow><boxGeometry args={[0.8, 0.5, 0.5]} /><meshStandardMaterial color="#d9d9d9" metalness={0.5} roughness={0.5} /></mesh>
    </Place>
  )
}
export function SamplesProp({ x, z }) {
  return (
    <Place x={x} z={z}>
      <mesh position={[0, 0.25, 0]} castShadow><boxGeometry args={[1.2, 0.5, 0.8]} /><meshStandardMaterial color="#cfd3d8" metalness={0.7} roughness={0.35} /></mesh>
      {[[-0.8, 0.15, 0.6], [0.9, 0.2, 0.5], [0.3, 0.12, 0.9]].map((p, i) => <mesh key={i} position={p} castShadow><dodecahedronGeometry args={[0.2 + i * 0.05]} /><meshStandardMaterial color="#6b6b70" roughness={1} flatShading /></mesh>)}
    </Place>
  )
}

export const PROPS = { solar: SolarPanelProp, dust: DustProp, antenna: AntennaProp, silica: SilicaProp, sand: SandProp, lander: LanderProp, rock: BigRockProp, lm: LunarModuleProp, battery: BatteryProp, samples: SamplesProp }
