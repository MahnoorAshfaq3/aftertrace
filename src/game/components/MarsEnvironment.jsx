import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Terrain from './Terrain'
import { heightAt, getWorld } from '../world'

function Sky() {
  const mat = useMemo(() => new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { top: { value: new THREE.Color('#6d4a52') }, bottom: { value: new THREE.Color('#e0a373') } },
    vertexShader: 'varying vec3 p; void main(){ p = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: 'varying vec3 p; uniform vec3 top; uniform vec3 bottom; void main(){ float h = clamp(p.y*1.6+0.1,0.0,1.0); gl_FragColor = vec4(mix(bottom, top, pow(h,0.7)),1.0); }',
  }), [])
  useEffect(() => () => mat.dispose(), [mat])
  return <mesh scale={300} renderOrder={-1}><sphereGeometry args={[1, 24, 16]} /><primitive object={mat} attach="material" /></mesh>
}

export function Rocks({ colors = ['#6e3a24', '#a45a36'] }) {
  const ref = useRef()
  const rocks = getWorld().rocks
  useLayoutEffect(() => {
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), c = new THREE.Color(), e = new THREE.Euler()
    rocks.forEach((r, i) => {
      q.setFromEuler(e.set(0, r.ry, 0))
      m.compose(new THREE.Vector3(r.x, heightAt(r.x, r.z) + r.s * r.squash * 0.25, r.z), q, new THREE.Vector3(r.s, r.s * r.squash, r.s))
      ref.current.setMatrixAt(i, m)
      ref.current.setColorAt(i, c.set(colors[0]).lerp(new THREE.Color(colors[1]), r.tint))
    })
    ref.current.instanceMatrix.needsUpdate = true
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true
  }, [])
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, rocks.length]} castShadow receiveShadow>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial roughness={1} flatShading />
    </instancedMesh>
  )
}

function Dust({ reduced }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const a = new Float32Array(700 * 3)
    for (let i = 0; i < 700; i++) { a[i * 3] = (Math.random() - 0.5) * 200; a[i * 3 + 1] = 0.5 + Math.random() * 9; a[i * 3 + 2] = (Math.random() - 0.5) * 200 }
    return a
  }, [])
  useFrame((_, dt) => {
    if (reduced) return
    const a = ref.current.geometry.attributes.position.array
    for (let i = 0; i < 700; i++) { a[i * 3] += dt * 1.8; if (a[i * 3] > 100) a[i * 3] = -100 }
    ref.current.geometry.attributes.position.needsUpdate = true
  })
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" array={positions} count={700} itemSize={3} /></bufferGeometry>
      <pointsMaterial color="#e3b08a" size={0.16} transparent opacity={0.45} depthWrite={false} />
    </points>
  )
}

export default function MarsEnvironment({ playerRef, reduced }) {
  const sun = useRef(), target = useMemo(() => new THREE.Object3D(), [])
  useFrame(() => {
    const p = playerRef.current
    sun.current.position.set(p.x + 30, 45, p.z + 20); target.position.set(p.x, 0, p.z); target.updateMatrixWorld()
  })
  return (
    <>
      <color attach="background" args={['#c58660']} />
      <fog attach="fog" args={['#c58a66', 45, 190]} />
      <Sky />
      <hemisphereLight args={['#ffd8b5', '#6b3a26', 0.9]} />
      <primitive object={target} />
      <directionalLight ref={sun} target={target} intensity={2.3} color="#ffe2c4" castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-28} shadow-camera-right={28} shadow-camera-top={28} shadow-camera-bottom={-28} shadow-camera-near={1} shadow-camera-far={140} shadow-bias={-0.0004} />
      <Terrain planet="mars" />
      <Rocks />
      <Dust reduced={reduced} />
    </>
  )
}
