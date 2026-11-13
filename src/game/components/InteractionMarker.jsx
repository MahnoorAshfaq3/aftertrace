import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { heightAt } from '../world'

// Glowing ring + light beam + floating gem. Blue = not collected yet, green = collected.
export default function InteractionMarker({ x, z, collected, reduced, beam = true }) {
  const y = heightAt(x, z), ring = useRef(), light = useRef(), gem = useRef()
  const color = collected ? '#3dff9a' : '#39b8ff'
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (!reduced) {
      ring.current.scale.setScalar(1 + Math.sin(t * 2.5) * 0.08)
      if (light.current) light.current.material.opacity = 0.22 + Math.sin(t * 3) * 0.06
      gem.current.rotation.y = t * 1.5; gem.current.position.y = 2.6 + Math.sin(t * 2) * 0.2
    }
  })
  return (
    <group position={[x, y, z]}>
      <mesh ref={ring} rotation-x={-Math.PI / 2} position-y={0.12}>
        <ringGeometry args={[1.6, 1.9, 48]} />
        <meshBasicMaterial color={color} toneMapped={false} transparent opacity={0.9} side={THREE.DoubleSide} />
      </mesh>
      {beam && (
        <mesh ref={light} position-y={4}>
          <cylinderGeometry args={[1.5, 1.5, 8, 24, 1, true]} />
          <meshBasicMaterial color={color} transparent opacity={0.25} depthWrite={false} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
      )}
      <mesh ref={gem} position-y={2.6}>
        <octahedronGeometry args={[0.3]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  )
}
