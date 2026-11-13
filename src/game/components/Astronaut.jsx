import { useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js'

export const ASTRONAUT_URL = '/models/astronaut/astronaut-in-spacesuit-rigged.glb'

// ---- Things you may want to tune (see README) ----
const TARGET_HEIGHT = 1.8     // metres. The model is scaled so the astronaut is this tall.
const YAW_OFFSET = 0          // if the astronaut walks sideways/backwards, try Math.PI or Math.PI / 2
const IDLE_FRACTION = 0.25    // which moment of the WALK clip is frozen to make a standing pose (0 to 1)
const RUN_TIME_SCALE = 1.0

// Your GLB only has "walk" and "run". Until a real Idle clip is added, a frozen frame of
// the walk clip is used as the standing pose. Drop in a Mixamo idle (see README) and name it "idle".
export default function Astronaut({ stateRef }) {
  const gltf = useGLTF(ASTRONAUT_URL)

  const built = useMemo(() => {
    const root = cloneSkinned(gltf.scene)
    root.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.frustumCulled = false } })
    const mixer = new THREE.AnimationMixer(root)
    const find = (n) => gltf.animations.find((a) => a.name.toLowerCase() === n)
    const walk = find('walk') || gltf.animations[0]
    const run = find('run') || walk
    const idleClip = find('idle')

    // Stop the hips from drifting away from the player (removes sideways/forward root motion).
    const prep = (clip, name) => {
      const c = clip.clone(); c.name = name
      c.tracks.forEach((t) => {
        if (/hips\.position$/i.test(t.name)) { const v = t.values; for (let i = 3; i < v.length; i += 3) { v[i] = v[0]; v[i + 2] = v[2] } }
      })
      return c
    }
    const actions = {}
    if (idleClip) { actions.idle = mixer.clipAction(prep(idleClip, 'idle')) }
    else { actions.idle = mixer.clipAction(prep(walk, 'idle')); actions.idle.play(); actions.idle.time = walk.duration * IDLE_FRACTION; actions.idle.paused = true }
    actions.walk = mixer.clipAction(prep(walk, 'walk'))
    actions.run = mixer.clipAction(prep(run, 'run')); actions.run.timeScale = RUN_TIME_SCALE
    Object.values(actions).forEach((a) => { a.play(); a.weight = 0 })
    actions.idle.weight = 1
    mixer.update(0)

    // Measure the real posed size so scale and ground offset are correct whatever units the file uses.
    root.updateMatrixWorld(true)
    const box = new THREE.Box3().setFromObject(root, true)
    const h = box.max.y - box.min.y
    const ok = Number.isFinite(h) && h > 0.0001
    const bones = { spine: root.getObjectByName('Spine01'), head: root.getObjectByName('Head') }
    return { root, mixer, actions, bones, scale: ok ? TARGET_HEIGHT / h : 1, lift: ok ? -box.min.y : 0 }
  }, [gltf])

  useEffect(() => () => { built.mixer.stopAllAction(); built.mixer.uncacheRoot(built.root) }, [built])

  useFrame((_, dt) => {
    const want = stateRef?.current || 'idle'
    const { actions, mixer } = built
    const names = ['idle', 'walk', 'run']
    const w = names.map((n) => THREE.MathUtils.damp(actions[n].weight, n === want ? 1 : 0, 9, dt))
    const sum = w.reduce((a, b) => a + b, 0) || 1
    names.forEach((n, i) => { actions[n].weight = w[i] / sum })
    mixer.update(Math.min(dt, 0.05))
    // Procedural idle: a gentle breathing motion layered on the standing pose (only while standing still)
    const { spine, head } = built.bones, k = Math.sin(performance.now() / 1000 * 1.7) * 0.014 * actions.idle.weight
    if (spine) spine.rotation.x += k
    if (head) head.rotation.x -= k * 0.6
  })

  return (
    <group rotation-y={YAW_OFFSET}>
      <group scale={built.scale}>
        <primitive object={built.root} position={[0, built.lift, 0]} />
      </group>
    </group>
  )
}

useGLTF.preload(ASTRONAUT_URL)
