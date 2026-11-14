// Copies the Draco decoder (needed by the Opportunity rover model) into /public/draco
// so the game also works offline. Runs automatically after `npm install`.
import { cpSync, existsSync, mkdirSync } from 'node:fs'
const src = 'node_modules/three/examples/jsm/libs/draco/gltf'
if (existsSync(src)) {
  mkdirSync('public/draco', { recursive: true })
  cpSync(src, 'public/draco', { recursive: true })
  console.log('[aftertrace] Draco decoder copied to public/draco')
} else {
  console.warn('[aftertrace] Could not find the Draco decoder. Re-run: npm install')
}
