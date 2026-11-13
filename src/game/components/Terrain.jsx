import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { heightAt, hash2, smooth } from '../world'

const PALETTES = {
  mars: ['#8a3f24', '#b8683d', '#d6935f', '#5c2b1a'],
  moon: ['#55565a', '#8d8e92', '#c2c3c7', '#2e2f35'],
}

export default function Terrain({ size = 280, segments = 160, planet = 'mars' }) {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(size, size, segments, segments)
    g.rotateX(-Math.PI / 2)
    const pos = g.attributes.position, col = new Float32Array(pos.count * 3), c = new THREE.Color()
    const [lo, mi, hi, da] = PALETTES[planet] || PALETTES.mars
    const low = new THREE.Color(lo), mid = new THREE.Color(mi), high = new THREE.Color(hi), dark = new THREE.Color(da)
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i), h = heightAt(x, z)
      pos.setY(i, h)
      c.copy(low).lerp(mid, smooth(-3, 6, h)).lerp(high, smooth(8, 45, h) * 0.8).lerp(dark, hash2(x * 0.9, z * 0.9) * 0.35)
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b
    }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3))
    g.computeVertexNormals()
    return g
  }, [size, segments, planet])
  useEffect(() => () => geo.dispose(), [geo])
  return (
    <mesh geometry={geo} receiveShadow>
      <meshStandardMaterial vertexColors roughness={1} metalness={0} />
    </mesh>
  )
}
