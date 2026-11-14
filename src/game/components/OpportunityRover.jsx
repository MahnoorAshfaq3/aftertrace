import { Suspense, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import AssetBoundary from './AssetBoundary'

export const ROVER_URL = '/models/rovers/opportunity.glb'
const DRACO = '/draco/' // copied here by `npm install` (scripts/copy-draco.mjs)

// Loads any GLB, scales it so its footprint is `size` metres, centres it and puts it on the ground.
function GLBInner({ url, size }) {
  const { scene } = useGLTF(url, DRACO)
  const model = useMemo(() => {
    const obj = scene.clone(true)
    obj.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true } })
    obj.updateMatrixWorld(true)
    const box = new THREE.Box3().setFromObject(obj)
    const sz = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3())
    return { obj, scale: size / Math.max(sz.x, sz.z), offset: [-c.x, -box.min.y, -c.z] }
  }, [scene, size])
  return (
    <group scale={model.scale}>
      <primitive object={model.obj} position={model.offset} />
    </group>
  )
}

// Safe wrapper: if the file is missing/broken, `fallback` is shown instead of crashing the game.
export function GLBModel({ url, size = 2.6, fallback = null }) {
  return (
    <AssetBoundary fallback={fallback}>
      <Suspense fallback={null}><GLBInner url={url} size={size} /></Suspense>
    </AssetBoundary>
  )
}

// Simple stand-in used only if the real GLB can't be loaded.
export function ProceduralRover() {
  const wheel = [[-0.9, 0.3, -0.7], [-0.9, 0.3, 0], [-0.9, 0.3, 0.7], [0.9, 0.3, -0.7], [0.9, 0.3, 0], [0.9, 0.3, 0.7]]
  return (
    <group>
      <mesh position={[0, 0.8, 0]} castShadow><boxGeometry args={[1.2, 0.5, 1.6]} /><meshStandardMaterial color="#c9c9c9" metalness={0.5} roughness={0.5} /></mesh>
      <mesh position={[0, 1.15, 0]} rotation-x={-0.2} castShadow><boxGeometry args={[1.9, 0.05, 1.5]} /><meshStandardMaterial color="#1c2b5e" metalness={0.6} roughness={0.3} /></mesh>
      <mesh position={[0, 1.5, 0.6]} castShadow><cylinderGeometry args={[0.04, 0.04, 0.9]} /><meshStandardMaterial color="#aaa" /></mesh>
      {wheel.map((p, i) => <mesh key={i} position={p} rotation-z={Math.PI / 2} castShadow><cylinderGeometry args={[0.3, 0.3, 0.25, 16]} /><meshStandardMaterial color="#333" /></mesh>)}
    </group>
  )
}

export default function OpportunityRover({ position = [0, 0, 0], rotationY = 0, size = 2.6, url = ROVER_URL }) {
  return (
    <group position={position} rotation-y={rotationY}>
      <GLBModel url={url} size={size} fallback={<ProceduralRover />} />
    </group>
  )
}

useGLTF.preload(ROVER_URL, DRACO)
