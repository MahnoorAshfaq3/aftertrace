import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

const URL = '/models/environment/moon-lro-globe.glb' // NASA LRO Moon globe

function Globe({ reduced }) {
  const { scene } = useGLTF(URL)
  const ref = useRef()
  useFrame((_, dt) => { if (!reduced && ref.current) ref.current.rotation.y += dt * 0.08 })
  return <primitive ref={ref} object={scene} />
}

export default function MoonGlobe({ reduced }) {
  return (
    <Canvas camera={{ position: [0, 0, 3.6], fov: 35 }} dpr={[1, 1.5]} gl={{ alpha: true }} style={{ pointerEvents: 'none' }}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 2, 4]} intensity={2.6} />
      <Suspense fallback={null}><Globe reduced={reduced} /></Suspense>
    </Canvas>
  )
}
