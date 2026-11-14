import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { heightAt } from '../world'

export default function MysteryArtifact({ x, z, reduced }) {
  const relic = useRef()

  useFrame(({ clock }) => {
    if (reduced || !relic.current) return
    relic.current.rotation.y = clock.elapsedTime * 0.35
    relic.current.position.y = heightAt(x, z) + 1.1 + Math.sin(clock.elapsedTime * 1.4) * 0.12
  })

  return (
    <group ref={relic} position={[x, heightAt(x, z) + 1.1, z]}>
      <mesh rotation={[0.35, 0, 0.55]} castShadow>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial color="#8f63d8" emissive="#32165e" emissiveIntensity={0.8} metalness={0.65} roughness={0.25} />
      </mesh>
      <mesh rotation-x={Math.PI / 2}>
        <torusGeometry args={[1.05, 0.045, 6, 24]} />
        <meshStandardMaterial color="#d5bd85" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh rotation={[0.7, 0.4, 0.2]}>
        <torusGeometry args={[0.9, 0.025, 5, 20]} />
        <meshStandardMaterial color="#39b8ff" emissive="#123b55" emissiveIntensity={0.7} metalness={0.7} roughness={0.25} />
      </mesh>
    </group>
  )
}
