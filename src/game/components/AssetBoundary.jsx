import { Component } from 'react'
// If a 3D file is missing or broken, show a substitute instead of crashing the whole game.
export default class AssetBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(err) { console.warn('[AFTERTRACE] 3D asset failed to load:', err?.message || err) }
  render() { return this.state.failed ? this.props.fallback ?? null : this.props.children }
}
