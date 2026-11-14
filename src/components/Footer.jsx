import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-space-950 px-4 py-8 text-sm text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p><b className="font-display tracking-widest text-white">AFTERTRACE</b> · Built for NASA Space Apps Challenge 2026</p>
        <p className="text-center">An independent educational project. Not affiliated with or endorsed by NASA.</p>
        <nav className="flex gap-4"><Link to="/learn" className="hover:text-white">Learn</Link><Link to="/about" className="hover:text-white">About &amp; sources</Link></nav>
      </div>
    </footer>
  )
}
