import { TEAM } from '../data/config'
export default function About() {
  return (
    <div className="mx-auto max-w-3xl space-y-5 px-4 py-10">
      <h1 className="font-display text-3xl italic">About AFTERTRACE</h1>
      <p className="text-xl text-amber-300">Every machine left behind has a story worth discovering.</p>
      <section className="glass p-5"><h2 className="mb-2 font-display text-sm tracking-widest text-glow">EDUCATIONAL PURPOSE</h2><p>AFTERTRACE turns the stories of retired NASA machines into an investigation. Instead of reading a list of facts, you explore, collect evidence, solve a mystery, and learn why these missions mattered.</p></section>
      <section className="glass p-5"><h2 className="mb-2 font-display text-sm tracking-widest text-glow">NASA SPACE APPS CHALLENGE 2026</h2><p>This project was created for the NASA Space Apps Challenge. It is an independent project and is not affiliated with or endorsed by NASA.</p></section>
      <section className="glass p-5"><h2 className="mb-2 font-display text-sm tracking-widest text-glow">TEAM</h2><ul className="list-disc pl-5">{TEAM.map((t) => <li key={t}>{t}</li>)}</ul></section>
      <section className="glass p-5"><h2 className="mb-2 font-display text-sm tracking-widest text-glow">SOURCES & CREDITS</h2>
        <ul className="list-disc space-y-1 pl-5"><li>Mission facts: NASA. See the reference links on each <a className="text-glow underline" href="/learn">Learn</a> page.</li><li>3D models (astronaut, Opportunity Rover): add each model's author, source link and license here.</li><li>Sounds are generated in the browser. Terrain is generated procedurally.</li></ul></section>
    </div>
  )
}
