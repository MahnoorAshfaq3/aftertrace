import { heightAt } from '../world'

function RockSample() {
  return (
    <group>
      <mesh position={[-0.22, 0.3, 0]} rotation={[0.2, 0.4, 0.1]} castShadow>
        <dodecahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial color="#aaa9a4" roughness={1} flatShading />
      </mesh>
      <mesh position={[0.28, 0.2, 0.12]} rotation={[0.3, 0.8, 0.2]} castShadow>
        <dodecahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial color="#77777b" roughness={1} flatShading />
      </mesh>
    </group>
  )
}

function RegolithSample() {
  return (
    <group>
      <mesh position-y={0.18} scale={[0.8, 0.3, 0.65]} receiveShadow>
        <sphereGeometry args={[0.65, 10, 6]} />
        <meshStandardMaterial color="#aaa9a4" roughness={1} />
      </mesh>
      {[-0.32, 0.08, 0.34].map((x, i) => (
        <mesh key={x} position={[x, 0.37 + (i % 2) * 0.08, i === 1 ? 0.24 : -0.18]} castShadow>
          <dodecahedronGeometry args={[0.1, 0]} />
          <meshStandardMaterial color="#76767a" roughness={1} flatShading />
        </mesh>
      ))}
    </group>
  )
}

function WaterIceSample() {
  return (
    <group>
      <mesh position-y={0.42} rotation={[0.15, 0.3, 0.2]} castShadow>
        <octahedronGeometry args={[0.48, 0]} />
        <meshStandardMaterial color="#9bdcf2" emissive="#17485c" emissiveIntensity={0.65} metalness={0.25} roughness={0.2} />
      </mesh>
      <mesh position={[-0.27, 0.25, 0.16]} rotation={[0.2, 0, -0.35]} castShadow>
        <octahedronGeometry args={[0.24, 0]} />
        <meshStandardMaterial color="#d5f5ff" emissive="#24566b" emissiveIntensity={0.4} metalness={0.2} roughness={0.25} />
      </mesh>
    </group>
  )
}

const MODELS = { rock: RockSample, regolith: RegolithSample, waterIce: WaterIceSample }

export default function ResourceDeposit({ resource }) {
  const Model = MODELS[resource.type]
  if (!Model) return null

  return (
    <group position={[resource.pos[0], heightAt(resource.pos[0], resource.pos[1]), resource.pos[1]]}>
      <Model />
    </group>
  )
}
