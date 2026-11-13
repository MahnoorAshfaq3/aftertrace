// Stand-in 3D models built from simple shapes for artifacts we don't have GLB files for yet.
// To replace one with a real model: add the GLB under public/models/... and swap it in MissionScene.jsx.
import * as THREE from 'three'

const M = (c, extra = {}) => <meshStandardMaterial color={c} roughness={0.5} metalness={0.4} {...extra} />

// Real size is about 65 cm long. MissionScene scales it up so it is easy to find.
export function SojournerModel({ size = 1.6 }) {
  const s = size / 0.65
  const wheels = [-0.22, 0, 0.22]
  return (
    <group scale={s}>
      <mesh position-y={0.2} castShadow><boxGeometry args={[0.48, 0.16, 0.65]} />{M('#c8c8c8')}</mesh>
      <mesh position-y={0.3} rotation-x={-0.05} castShadow><boxGeometry args={[0.46, 0.02, 0.6]} />{M('#1c2b66', { metalness: 0.7, roughness: 0.3 })}</mesh>
      {[-1, 1].map((side) => wheels.map((z) => (
        <mesh key={`${side}${z}`} position={[side * 0.27, 0.13, z]} rotation-z={Math.PI / 2} castShadow><cylinderGeometry args={[0.13, 0.13, 0.08, 16]} />{M('#333', { metalness: 0.2 })}</mesh>
      )))}
      <mesh position={[0, 0.38, -0.2]} castShadow><cylinderGeometry args={[0.012, 0.012, 0.2, 6]} />{M('#bbb')}</mesh>
    </group>
  )
}

// Apollo Lunar Roving Vehicle (about 3 m long, 2.3 m wide). Simplified.
export function LunarRoverModel({ size = 3.2 }) {
  const s = size / 3.0
  const wheel = (x, z) => (
    <group key={`${x}${z}`} position={[x, 0.41, z]}>
      <mesh rotation-z={Math.PI / 2} castShadow><cylinderGeometry args={[0.41, 0.41, 0.23, 20, 1, true]} />{M('#8a8a8a', { side: THREE.DoubleSide, roughness: 0.8 })}</mesh>
      <mesh rotation-z={Math.PI / 2}><cylinderGeometry args={[0.12, 0.12, 0.26, 10]} />{M('#444')}</mesh>
    </group>
  )
  return (
    <group scale={s}>
      <mesh position-y={0.62} castShadow><boxGeometry args={[1.3, 0.1, 2.5]} />{M('#d9d9d9')}</mesh>
      {[-0.35, 0.35].map((x) => <group key={x} position={[x, 0.95, 0.1]}><mesh castShadow><boxGeometry args={[0.45, 0.08, 0.5]} />{M('#e4e4e4', { roughness: 0.9 })}</mesh><mesh position={[0, 0.3, -0.25]} castShadow><boxGeometry args={[0.45, 0.55, 0.07]} />{M('#e4e4e4', { roughness: 0.9 })}</mesh></group>)}
      <mesh position={[0, 0.95, 0.95]} castShadow><boxGeometry args={[0.7, 0.35, 0.5]} />{M('#c9a227', { metalness: 0.8, roughness: 0.3 })}</mesh>
      <mesh position={[0, 1.15, 1.0]} castShadow><cylinderGeometry args={[0.03, 0.03, 0.7, 8]} />{M('#aaa')}</mesh>
      <mesh position={[0, 1.6, 1.0]} rotation-x={-0.6} castShadow><sphereGeometry args={[0.38, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2.2]} />{M('#e8e8e8', { side: THREE.DoubleSide })}</mesh>
      {[[-1.0, -0.95], [1.0, -0.95], [-1.0, 0.95], [1.0, 0.95]].map(([x, z]) => wheel(x, z))}
    </group>
  )
}
