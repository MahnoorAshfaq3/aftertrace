import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Home, Compass, Gamepad2, BookOpen, Clock, Trophy, Info, Menu, X } from 'lucide-react'

const LINKS = [['/', 'Home', Home], ['/explore', 'Explore', Compass], ['/play?mission=opportunity', 'Play', Gamepad2], ['/learn', 'Learn', BookOpen], ['/timeline', 'Timeline', Clock], ['/achievements', 'Achievements', Trophy], ['/about', 'About', Info]]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-space-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3" aria-label="AFTERTRACE home">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-blue-700 text-[10px] font-black tracking-wider">NASA</span>
          <span className="hidden leading-tight sm:block"><b className="block font-display tracking-widest">AFTERTRACE</b><span className="text-xs text-slate-400">Space Apps Challenge 2026</span></span>
        </Link>
        <nav className="hidden gap-1 rounded-full border border-white/10 bg-space-800/70 p-1 lg:flex" aria-label="Main">
          {LINKS.map(([to, label, Icon]) => (
            <NavLink key={label} to={to} end={to === '/'} className={({ isActive }) => `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white'}`}>
              <Icon size={16} />{label}
            </NavLink>
          ))}
        </nav>
        <button className="lg:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="glass mx-4 mb-3 flex flex-col p-2 lg:hidden" aria-label="Mobile">
          {LINKS.map(([to, label, Icon]) => <NavLink key={label} to={to} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-white/10"><Icon size={18} />{label}</NavLink>)}
        </nav>
      )}
    </header>
  )
}
