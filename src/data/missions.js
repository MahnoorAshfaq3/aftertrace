// All mission content lives here so new missions can be added without touching game code.
// Facts: verify against the NASA links in artifacts.js before you publish.

const CORE_MISSIONS = [
  { id: 'opportunity', number: 1, title: 'The Last Signal', artifact: 'Opportunity Rover', planet: 'mars', years: '2004–2019', launched: '2003', ended: '2019', playable: true,
    blurb: 'A rover that kept going, even when conditions were against it. Discover its journey, scientific findings, and the reason behind its final silence.',
    discovery: 'Evidence of ancient water on Mars.', tagline: 'A remarkable journey.' },
  { id: 'spirit', number: 2, title: 'The Survivor', artifact: 'Spirit Rover', planet: 'mars', years: '2004–2011', launched: '2003', ended: '2011', playable: true,
    blurb: "Explore Spirit's mission, its scientific discoveries, and its final location.", discovery: 'Signs of ancient hot-spring activity.', tagline: 'A survivor of harsh terrain.' },
  { id: 'sojourner', number: 3, title: 'First Tracks', artifact: 'Sojourner Rover', planet: 'mars', years: '1997', launched: '1996', ended: '1997', playable: true,
    blurb: 'Meet the first successful Mars rover and the Pathfinder mission that carried it.', discovery: 'Proved small rovers could work on Mars.', tagline: 'The first rover on Mars.' },
  { id: 'apollo-lrv', number: 4, title: 'Wheels on the Moon', artifact: 'Apollo Lunar Roving Vehicle', planet: 'moon', years: '1971–1972', launched: '1971', ended: '1972', playable: true,
    blurb: 'Discover the lunar rovers of Apollo 15, 16 and 17 and why they were left behind.', discovery: 'Let astronauts travel farther from the lander.', tagline: 'Exploring the Moon.' },
]

// World positions are [x, z] on the Mars map. The player spawns at [0, 6].
export const OPPORTUNITY = {
  id: 'opportunity',
  title: 'MISSION 01: THE LAST SIGNAL',
  briefing: 'A NASA rover once explored the surface of Mars, searching for evidence of ancient water. Its mission lasted far longer than expected. But one day, communication stopped. Your mission is to investigate what happened and uncover the legacy it left behind.',
  objectives: ['Explore the Martian surface and locate the Opportunity Rover', 'Collect all three clues', 'Solve the mystery of the final silence'],
  rover: { pos: [-6, -26], radius: 5.5, rotationY: 0.6 },
  roverFacts: [
    ['Launched', 'July 2003'],
    ['Landed on Mars', 'January 2004 (Meridiani Planum)'],
    ['Purpose', 'Investigate Martian rocks and soil for clues about past water'],
    ['Big discovery', 'Evidence that liquid water had affected ancient Martian environments'],
    ['Mission length', 'Nearly 15 years (it was designed for about 90 days)'],
    ['Final communication', 'June 2018'],
    ['Mission declared complete', 'February 2019'],
  ],
  clues: [
    { id: 'solar', title: 'Clue 1: Solar Panels', pos: [24, -14], radius: 3.4, prop: 'solar',
      text: "Opportunity had no engine that burned fuel. Its solar panels turned sunlight into electricity, which charged rechargeable batteries. That power ran its cameras, instruments, motors and heaters, and kept it warm through freezing Martian nights.",
      fact: 'Sunlight was Opportunity\'s only source of power. No sunlight, no power.' },
    { id: 'dust', title: 'Clue 2: The Dust Storm', pos: [-36, -30], radius: 3.4, prop: 'dust',
      text: "In late May 2018 a dust storm on Mars grew until it wrapped around the whole planet. Opportunity was working in Perseverance Valley when the sky above it turned dark. The thick dust blocked sunlight, so the solar panels could no longer make enough power.",
      fact: 'Dust in the air = less sunlight on the panels = less electricity.' },
    { id: 'signal', title: 'Clue 3: Final Communication', pos: [8, -52], radius: 3.4, prop: 'antenna',
      text: "Opportunity sent its last message to Earth in June 2018. When the dust cleared, NASA kept listening and sent more than a thousand commands, hoping the rover would wake up. It never answered. In February 2019 NASA declared the mission complete.",
      fact: 'The team never found a fault in the rover. It simply never woke up.' },
  ],
  quiz: {
    question: 'Why did Opportunity stop communicating with Earth?',
    options: ['Its wheels stopped working.', 'A massive dust storm blocked sunlight from reaching its solar panels.', 'It ran out of fuel.'],
    correct: 1,
    explanation: "Opportunity ran on sunlight, not fuel, so option C can't be right. Its wheels were still capable of driving, so A doesn't fit the evidence either. In 2018 a planet-wide dust storm blocked the sunlight its solar panels needed. Without power, it could not keep its batteries charged or talk to Earth, and it did not wake up again after the storm cleared.",
  },
  legacy: [
    'Found evidence that liquid water once shaped ancient Martian environments.',
    'Worked for nearly 15 years on a mission planned for about 90 days.',
    'Drove roughly 45 kilometers (28 miles) across another planet.',
    'Its discoveries helped guide later missions that search for signs of past life.',
  ],
}


// Build the Timeline game (Opportunity)
export const TIMELINE_EVENTS = [
  { id: 'launch', label: 'Launch from Earth', date: 'July 2003', order: 0, note: 'Opportunity launched toward Mars in 2003.' },
  { id: 'landing', label: 'Landing on Mars', date: 'January 2004', order: 1, note: 'It landed in January 2004 for a mission planned to last about 90 days.' },
  { id: 'crater', label: 'Exploring Endurance Crater', date: '2004', order: 2, note: 'Opportunity drove into a crater to study layered rock.' },
  { id: 'endeavour', label: 'Reaching Endeavour Crater', date: '2011', order: 3, note: 'After years of driving, it reached the rim of a much bigger crater.' },
  { id: 'storm', label: 'Global dust storm', date: 'Late May 2018', order: 4, note: 'A growing storm darkened the sky above the rover.' },
  { id: 'signal', label: 'Last signal received', date: 'June 2018', order: 5, note: 'The last communication arrived in June 2018.' },
  { id: 'end', label: 'Mission declared complete', date: 'February 2019', order: 6, note: 'After recovery attempts failed, NASA ended the mission.' },
]

// ---------- Shared fields so every mission uses the same engine ----------
Object.assign(OPPORTUNITY, {
  number: 1, planet: 'mars', shortTitle: 'The Last Signal', artifactName: 'Opportunity Rover', badge: 'Mars Investigator',
  finalLine: 'Final contact: June 2018 · Declared complete: February 2019',
})
OPPORTUNITY.rover = { ...OPPORTUNITY.rover, model: 'mer', size: 2.6, collider: 1.9 }

export const SPIRIT = {
  id: 'spirit', number: 2, planet: 'mars', title: 'MISSION 02: THE SURVIVOR', shortTitle: 'The Survivor', artifactName: 'Spirit Rover', badge: 'Gusev Survivor',
  finalLine: 'Last communication: March 2010 · Recovery efforts ended: May 2011',
  briefing: 'Spirit and its twin Opportunity landed on opposite sides of Mars in January 2004, planning to work for about three months. Spirit kept going for years, through a broken wheel and soft sand, until it fell silent. Your mission is to find out what finally stopped it.',
  objectives: ['Locate Spirit in Gusev Crater', 'Collect all three clues', 'Solve the mystery of Spirit\u2019s silence'],
  rover: { pos: [20, -34], radius: 5.5, rotationY: -0.8, model: 'mer', url: '/models/rovers/spirit-mer.glb', size: 2.6, collider: 1.9 },
  roverFacts: [
    ['Launched', 'June 2003'], ['Landed on Mars', 'January 2004, in Gusev Crater'],
    ['Purpose', 'Look for evidence that water once shaped the Gusev Crater area'],
    ['Big discovery', 'Bright silica-rich soil, a sign of past hot springs or steam vents'],
    ['Mission length', 'More than six years (it was designed for about 90 days)'],
    ['Last communication', 'March 2010'], ['Recovery efforts ended', 'May 2011'],
  ],
  clues: [
    { id: 'silica', title: 'Clue 1: Bright Soil', pos: [-22, -18], radius: 3.4, prop: 'silica',
      text: 'One of Spirit\u2019s wheels stopped turning in 2006, so the rover dragged it behind. In 2007 that dragging wheel dug up bright, almost pure silica. On Earth, deposits like this form around hot springs and steam vents, so the discovery hinted that ancient Mars had hot, wet places.',
      fact: 'A broken wheel turned into a digging tool.' },
    { id: 'sand', title: 'Clue 2: Stuck in the Sand', pos: [40, -8], radius: 3.4, prop: 'sand',
      text: 'In 2009 Spirit drove into soft sand at a spot nicknamed Troy and became stuck. Engineers on Earth spent months testing a copy of the rover to find a way out, but Spirit could not be freed.',
      fact: 'Stuck, Spirit kept working as a stationary science station.' },
    { id: 'antenna', title: 'Clue 3: The Silent Winter', pos: [-30, -55], radius: 3.4, prop: 'antenna',
      text: 'Stuck in the wrong position, Spirit could not tilt its solar panels toward the Sun for the Martian winter. Its last communication reached Earth in March 2010. NASA kept listening for more than a year and ended its recovery efforts in May 2011.',
      fact: 'NASA believes Spirit ran low on power and went into a deep sleep it never woke from.' },
  ],
  quiz: {
    question: 'Why did Spirit stop communicating with Earth?',
    options: ['It drove off a cliff.', 'It was stuck in sand and, without enough sunlight in winter, lost power and went silent.', 'A planet-wide dust storm covered it.'],
    correct: 1,
    explanation: 'Spirit was trapped in soft sand and could not angle its solar panels toward the Sun as winter came. Without enough power, it most likely went into a low-power sleep and never woke. The dust-storm story belongs to its twin, Opportunity, in 2018.',
  },
  legacy: ['Found evidence that water and volcanic heat once shaped parts of Gusev Crater.', 'Worked for years beyond a mission planned for about 90 days.', 'Kept doing science even after it became stuck.', 'Showed engineers how rovers can survive harsh terrain, helping design later missions.'],
}

export const SOJOURNER = {
  id: 'sojourner', number: 3, planet: 'mars', title: 'MISSION 03: FIRST TRACKS', shortTitle: 'First Tracks', artifactName: 'Sojourner Rover', badge: 'Pathfinder',
  finalLine: 'Last Pathfinder data transmission: September 1997',
  briefing: 'In July 1997 a spacecraft bounced across Mars inside giant airbags. Out rolled Sojourner, a robot about the size of a microwave oven. It was the first successful rover on Mars. Your mission is to find it and learn why it fell silent.',
  objectives: ['Locate Sojourner near the Pathfinder lander', 'Collect all three clues', 'Solve the mystery of the silence'],
  rover: { pos: [-24, -20], radius: 4.5, rotationY: 0.5, model: 'sojourner', size: 1.6, collider: 1.2 },
  roverFacts: [
    ['Mission', 'Mars Pathfinder, launched December 1996'], ['Landed on Mars', 'July 4, 1997, in Ares Vallis'],
    ['Size', 'About 10.5 kilograms (shown larger than life in this game)'],
    ['Purpose', 'Prove that a small, low-cost rover could drive on Mars and study rocks'],
    ['Mission length', 'Planned for about 7 Martian days; it worked for about 83'],
    ['Last data transmission', 'September 1997'],
  ],
  clues: [
    { id: 'lander', title: 'Clue 1: The Bouncing Landing', pos: [14, -30], radius: 3.4, prop: 'lander',
      text: 'Pathfinder landed on July 4, 1997 by bouncing across the surface inside giant airbags. When it stopped, the lander opened like flower petals and Sojourner rolled down a ramp onto Mars.',
      fact: 'It was the first time airbags were used to land on Mars.' },
    { id: 'rock', title: 'Clue 2: Rock Detective', pos: [36, -12], radius: 3.4, prop: 'rock',
      text: 'Sojourner crept toward rocks scientists nicknamed Barnacle Bill and Yogi. It pressed an instrument called an alpha proton X-ray spectrometer against them to learn what they were made of. It moved at only about one centimeter per second.',
      fact: 'Slow and steady: small rovers could do real science.' },
    { id: 'antenna', title: 'Clue 3: The Last Transmission', pos: [-40, -48], radius: 3.4, prop: 'antenna',
      text: 'Sojourner could only talk to Earth through the Pathfinder lander. The lander sent its final data transmission in September 1997, and soon after, contact was lost. The whole mission lasted far longer than planned.',
      fact: 'The rover depended on the lander to reach Earth.' },
  ],
  quiz: {
    question: 'Why did Sojourner stop sending data to Earth?',
    options: ['A giant dust storm covered it.', 'It relied on the Pathfinder lander to relay messages, and the lander stopped communicating.', 'Its wheels fell off.'],
    correct: 1,
    explanation: 'Sojourner could not call Earth directly; every message went through the Pathfinder lander. When the lander stopped communicating after its last transmission in September 1997, the rover went silent too. Engineers think the lander most likely lost power.',
  },
  legacy: ['Showed that a small, low-cost rover could work on Mars.', 'Analyzed Martian rocks up close for the first time with a rover.', 'Proved the airbag landing method that later missions reused.', 'Paved the way for Spirit, Opportunity, Curiosity and Perseverance.'],
}

export const APOLLO = {
  id: 'apollo-lrv', number: 4, planet: 'moon', title: 'MISSION 04: WHEELS ON THE MOON', shortTitle: 'Wheels on the Moon', artifactName: 'Apollo Lunar Roving Vehicle', badge: 'Lunar Driver',
  finalLine: 'Used on Apollo 15, 16 and 17 (1971\u20131972) and left on the Moon',
  briefing: 'Between 1971 and 1972, three Apollo crews drove across the Moon. When they left, they parked their vehicles for good. Your mission is to find a Lunar Roving Vehicle and discover why it was left behind.',
  objectives: ['Locate the Lunar Roving Vehicle', 'Collect all three clues', 'Solve the mystery of why it stayed'],
  rover: { pos: [-10, -24], radius: 5.5, rotationY: 0.4, model: 'lrv', size: 3.2, collider: 1.9 },
  mysteryArtifact: {
    id: 'mystery-artifact',
    name: 'Unidentified Lunar Artifact',
    pos: [42, -60],
    radius: 3.4,
    collider: 1,
    description: 'You found a strange, unmarked object on the lunar surface. No mission record in this experience identifies it. Its origin is left unexplained for you to consider.',
    note: 'This is a fictional discovery created for AFTERTRACE, not a historical NASA artifact.',
  },
  resources: [
    { id: 'resource-rock-01', type: 'rock', name: 'Lunar Rock Sample', pos: [55, 18], radius: 3.2, collider: 0.7 },
    { id: 'resource-regolith-01', type: 'regolith', name: 'Lunar Regolith Sample', pos: [-58, 18], radius: 3.2, collider: 0.7 },
    { id: 'resource-water-ice-01', type: 'waterIce', name: 'Water Ice Sample', pos: [62, -39], radius: 3.2, collider: 0.7 },
  ],
  roverFacts: [
    ['Used on', 'Apollo 15, 16 and 17 (1971\u20131972)'], ['Crew', 'Two astronauts'],
    ['Power', 'Electric motors on batteries that could not be recharged'],
    ['Top speed', 'About 13 km/h (8 mph)'],
    ['Why it mattered', 'Let crews travel much farther from the lander than walking allowed'],
    ['Where they are now', 'Still on the Moon, near the Apollo 15, 16 and 17 landing sites'],
  ],
  clues: [
    { id: 'lm', title: 'Clue 1: Folded for the Trip', pos: [26, -16], radius: 3.4, prop: 'lm', propOffset: [0, -5.5], collider: 3.3,
      text: 'The rover traveled to the Moon folded flat in the side of the lunar module. After landing, the astronauts pulled cords and it unfolded, ready to drive.',
      fact: 'A whole car, folded up inside a spacecraft.' },
    { id: 'battery', title: 'Clue 2: Mesh Wheels and Batteries', pos: [-38, -34], radius: 3.4, prop: 'battery',
      text: 'Each wheel had its own electric motor. The batteries could not be recharged. With no air on the Moon, the wheels used woven wire mesh instead of rubber tires.',
      fact: 'No fuel, no air, so no engine and no rubber tires.' },
    { id: 'samples', title: 'Clue 3: Room for Rocks', pos: [10, -54], radius: 3.4, prop: 'samples',
      text: 'The lunar module had strict weight limits for lifting off the Moon. Leaving the rovers behind helped make room for the most valuable cargo: rocks and soil collected for scientists on Earth.',
      fact: 'Every kilogram counted on the way home.' },
  ],
  quiz: {
    question: 'Why were the Apollo lunar rovers left on the Moon?',
    options: ['Meteorites destroyed them.', 'The trip home had weight limits, and leaving them made room for lunar samples.', 'NASA planned to reuse them on the next mission.'],
    correct: 1,
    explanation: 'The lunar module that carried astronauts home could only lift a limited weight. Leaving the rovers behind helped make room for rock and soil samples. Each rover was built for one mission, so none were reused.',
  },
  legacy: ['Let astronauts explore kilometers from their lander.', 'Helped crews collect samples from many different locations.', 'Showed that people can drive on another world, inspiring future lunar rovers.', 'All three vehicles remain on the Moon today.'],
}



// Additional playable investigations. Models without supplied GLBs use the game's procedural scene props.
const EXPANDED_MISSIONS = [
  {
    id: 'apollo-lm', number: 5, title: 'Apollo Lunar Module Descent Stage', shortTitle: 'Apollo Lunar Module Descent Stage', artifact: 'Apollo Lunar Module Descent Stage', planet: 'moon', years: '1969–1972', launched: '1969', ended: '1972', playable: true,
    blurb: 'Apollo 11, 12, 14, 15, 16 and 17 descent stages remain where crews left them.', discovery: 'Apollo 11, 12, 14, 15, 16 and 17 descent stages remain where crews left them.', tagline: 'A trace left behind.',
  },
  {
    id: 'alsep', number: 6, title: 'Apollo Lunar Surface Experiments Package (ALSEP)', shortTitle: 'Apollo Lunar Surface Experiments Package (ALSEP)', artifact: 'Apollo Lunar Surface Experiments Package (ALSEP)', planet: 'moon', years: '1969–1972', launched: '1969', ended: '1977', playable: true,
    blurb: 'Apollo crews deployed long-running instruments that measured moonquakes, heat flow and the lunar environment.', discovery: 'Apollo crews deployed long-running instruments that measured moonquakes, heat flow and the lunar environment.', tagline: 'A trace left behind.',
  },
  {
    id: 'surveyor', number: 7, title: 'Surveyor Lunar Lander', shortTitle: 'Surveyor Lunar Lander', artifact: 'Surveyor Lunar Lander', planet: 'moon', years: '1966–1968', launched: '1966', ended: '1968', playable: true,
    blurb: 'Robotic Surveyor landers tested the lunar surface before crewed Apollo landings.', discovery: 'Robotic Surveyor landers tested the lunar surface before crewed Apollo landings.', tagline: 'A trace left behind.',
  },
  {
    id: 'viking-1', number: 8, title: 'Viking 1 Lander', shortTitle: 'Viking 1 Lander', artifact: 'Viking 1 Lander', planet: 'mars', years: '1975–1982', launched: '1975', ended: '1982', playable: true,
    blurb: 'Viking 1 made the first successful US landing on Mars and performed surface experiments.', discovery: 'Viking 1 made the first successful US landing on Mars and performed surface experiments.', tagline: 'A trace left behind.',
  },
  {
    id: 'viking-2', number: 9, title: 'Viking 2 Lander', shortTitle: 'Viking 2 Lander', artifact: 'Viking 2 Lander', planet: 'mars', years: '1975–1980', launched: '1975', ended: '1980', playable: true,
    blurb: 'Viking 2 studied the Martian plains of Utopia Planitia after landing in September 1976.', discovery: 'Viking 2 studied the Martian plains of Utopia Planitia after landing in September 1976.', tagline: 'A trace left behind.',
  },
  {
    id: 'phoenix', number: 10, title: 'Phoenix Mars Lander', shortTitle: 'Phoenix Mars Lander', artifact: 'Phoenix Mars Lander', planet: 'mars', years: '2007–2008', launched: '2007', ended: '2008', playable: true,
    blurb: 'Phoenix dug into northern Martian soil and confirmed water ice beneath the surface.', discovery: 'Phoenix dug into northern Martian soil and confirmed water ice beneath the surface.', tagline: 'A trace left behind.',
  },
  {
    id: 'insight', number: 11, title: 'InSight Mars Lander', shortTitle: 'InSight Mars Lander', artifact: 'InSight Mars Lander', planet: 'mars', years: '2018–2022', launched: '2018', ended: '2022', playable: true,
    blurb: 'InSight listened for marsquakes and studied the planet interior using a seismometer and heat-flow experiment.', discovery: 'InSight listened for marsquakes and studied the planet interior using a seismometer and heat-flow experiment.', tagline: 'A trace left behind.',
  },
  {
    id: 'ingenuity', number: 12, title: 'Ingenuity Mars Helicopter', shortTitle: 'Ingenuity Mars Helicopter', artifact: 'Ingenuity Mars Helicopter', planet: 'mars', years: '2021–2024', launched: '2020', ended: '2024', playable: true,
    blurb: 'Ingenuity became the first aircraft to make powered, controlled flights on another planet.', discovery: 'Ingenuity became the first aircraft to make powered, controlled flights on another planet.', tagline: 'A trace left behind.',
  },
  {
    id: 'dawn', number: 13, title: 'Dawn Spacecraft', shortTitle: 'Dawn Spacecraft', artifact: 'Dawn Spacecraft', planet: 'deep', years: '2007–2018', launched: '2007', ended: '2018', playable: true,
    blurb: 'Dawn explored Vesta and Ceres, becoming the first spacecraft to orbit two extraterrestrial bodies.', discovery: 'Dawn explored Vesta and Ceres, becoming the first spacecraft to orbit two extraterrestrial bodies.', tagline: 'A trace left behind.',
  },
  {
    id: 'near-shoemaker', number: 14, title: 'NEAR Shoemaker', shortTitle: 'NEAR Shoemaker', artifact: 'NEAR Shoemaker', planet: 'deep', years: '1996–2001', launched: '1996', ended: '2001', playable: true,
    blurb: 'NEAR Shoemaker studied asteroid Eros and made a successful controlled touchdown in 2001.', discovery: 'NEAR Shoemaker studied asteroid Eros and made a successful controlled touchdown in 2001.', tagline: 'A trace left behind.',
  },
  {
    id: 'pioneer-10', number: 15, title: 'Pioneer 10', shortTitle: 'Pioneer 10', artifact: 'Pioneer 10', planet: 'deep', years: '1972–2003', launched: '1972', ended: '2003', playable: true,
    blurb: 'Pioneer 10 was the first spacecraft to travel through the asteroid belt and make close observations of Jupiter.', discovery: 'Pioneer 10 was the first spacecraft to travel through the asteroid belt and make close observations of Jupiter.', tagline: 'A trace left behind.',
  },
  {
    id: 'pioneer-11', number: 16, title: 'Pioneer 11', shortTitle: 'Pioneer 11', artifact: 'Pioneer 11', planet: 'deep', years: '1973–1995', launched: '1973', ended: '1995', playable: true,
    blurb: 'Pioneer 11 flew past Jupiter and Saturn and sent the first close-up observations of Saturn.', discovery: 'Pioneer 11 flew past Jupiter and Saturn and sent the first close-up observations of Saturn.', tagline: 'A trace left behind.',
  },
  {
    id: 'kepler', number: 17, title: 'Kepler Space Telescope', shortTitle: 'Kepler Space Telescope', artifact: 'Kepler Space Telescope', planet: 'deep', years: '2009–2018', launched: '2009', ended: '2018', playable: true,
    blurb: 'Kepler discovered thousands of exoplanet candidates by watching stars for tiny dips in brightness.', discovery: 'Kepler discovered thousands of exoplanet candidates by watching stars for tiny dips in brightness.', tagline: 'A trace left behind.',
  }
]

const EXPANDED_MISSION_DATA = {
  'apollo-lm': {
    id: 'apollo-lm', number: 5, title: 'MISSION 05: APOLLO LUNAR MODULE DESCENT STAGE', shortTitle: 'Apollo Lunar Module Descent Stage', artifactName: 'Apollo Lunar Module Descent Stage', planet: 'moon', briefing: 'Apollo 11, 12, 14, 15, 16 and 17 descent stages remain where crews left them.',
    objectives: ['Locate the Apollo Lunar Module Descent Stage', 'Collect all three evidence clues', 'Uncover why this mission became part of space history'],
    rover: { pos: [-15, -50], radius: 5, rotationY: 0.4, size: 4.2, collider: 2.2, url: '/models/spacecraft/apollo-lunar-module.glb', },
    roverFacts: [['Mission', 'Apollo Lunar Module Descent Stage'], ['Era', '1969–1972'], ['Launch', '1969'], ['Mission end', '1972'], ['Legacy', 'The descent stage carried astronauts from lunar orbit to the surface and stayed behind when the ascent stage lifted off.']],
    clues: [
      { id: 'site', title: 'Clue 1: The Landing Site', pos: [3, -62], radius: 3.6, prop: 'lm', text: 'Apollo 11, 12, 14, 15, 16 and 17 descent stages remain where crews left them.', fact: 'The location and landing method shaped what scientists could investigate.' },
      { id: 'instrument', title: 'Clue 2: Science at Work', pos: [-35, -72], radius: 3.6, prop: 'battery', text: 'The descent stage carried astronauts from lunar orbit to the surface and stayed behind when the ascent stage lifted off.', fact: 'Scientific instruments turn a distant world into a place we can study.' },
      { id: 'legacy', title: 'Clue 3: The Lasting Trace', pos: [-5, -86], radius: 3.6, prop: 'samples', text: 'Even after a mission ends, its hardware and discoveries remain part of the story. Apollo 11, 12, 14, 15, 16 and 17 descent stages remain where crews left them.', fact: 'A mission can end while its scientific legacy continues.' }
    ],
    quiz: { question: 'What is an important part of the Apollo Lunar Module Descent Stage story?', options: ['Its mission and scientific work left evidence for future exploration.', 'It was recovered and reused on Earth.', 'It never reached its destination.'], correct: 0, explanation: 'The descent stage carried astronauts from lunar orbit to the surface and stayed behind when the ascent stage lifted off.' },
    legacy: ['Its hardware remains a record of exploration.', 'Its observations helped scientists understand another world.', 'Its mission informs the design of future exploration.']
  },
  'alsep': {
    id: 'alsep', number: 6, title: 'MISSION 06: APOLLO LUNAR SURFACE EXPERIMENTS PACKAGE (ALSEP)', shortTitle: 'Apollo Lunar Surface Experiments Package (ALSEP)', artifactName: 'Apollo Lunar Surface Experiments Package (ALSEP)', planet: 'moon', briefing: 'Apollo crews deployed long-running instruments that measured moonquakes, heat flow and the lunar environment.',
    objectives: ['Locate the Apollo Lunar Surface Experiments Package (ALSEP)', 'Collect all three evidence clues', 'Uncover why this mission became part of space history'],
    rover: { pos: [2, -63], radius: 5, rotationY: 0.4, size: 4.2, collider: 2.2, },
    roverFacts: [['Mission', 'Apollo Lunar Surface Experiments Package (ALSEP)'], ['Era', '1969–1972'], ['Launch', '1969'], ['Mission end', '1977'], ['Legacy', 'ALSEP stations returned scientific data for years; Apollo 11 deployed the earlier EASEP package instead.']],
    clues: [
      { id: 'site', title: 'Clue 1: The Landing Site', pos: [20, -75], radius: 3.6, prop: 'solar', text: 'Apollo crews deployed long-running instruments that measured moonquakes, heat flow and the lunar environment.', fact: 'The location and landing method shaped what scientists could investigate.' },
      { id: 'instrument', title: 'Clue 2: Science at Work', pos: [-18, -85], radius: 3.6, prop: 'battery', text: 'ALSEP stations returned scientific data for years; Apollo 11 deployed the earlier EASEP package instead.', fact: 'Scientific instruments turn a distant world into a place we can study.' },
      { id: 'legacy', title: 'Clue 3: The Lasting Trace', pos: [12, -99], radius: 3.6, prop: 'samples', text: 'Even after a mission ends, its hardware and discoveries remain part of the story. Apollo crews deployed long-running instruments that measured moonquakes, heat flow and the lunar environment.', fact: 'A mission can end while its scientific legacy continues.' }
    ],
    quiz: { question: 'What is an important part of the Apollo Lunar Surface Experiments Package (ALSEP) story?', options: ['Its mission and scientific work left evidence for future exploration.', 'It was recovered and reused on Earth.', 'It never reached its destination.'], correct: 0, explanation: 'ALSEP stations returned scientific data for years; Apollo 11 deployed the earlier EASEP package instead.' },
    legacy: ['Its hardware remains a record of exploration.', 'Its observations helped scientists understand another world.', 'Its mission informs the design of future exploration.']
  },
  'surveyor': {
    id: 'surveyor', number: 7, title: 'MISSION 07: SURVEYOR LUNAR LANDER', shortTitle: 'Surveyor Lunar Lander', artifactName: 'Surveyor Lunar Lander', planet: 'moon', briefing: 'Robotic Surveyor landers tested the lunar surface before crewed Apollo landings.',
    objectives: ['Locate the Surveyor Lunar Lander', 'Collect all three evidence clues', 'Uncover why this mission became part of space history'],
    rover: { pos: [19, -36], radius: 5, rotationY: 0.4, size: 4.2, collider: 2.2, },
    roverFacts: [['Mission', 'Surveyor Lunar Lander'], ['Era', '1966–1968'], ['Launch', '1966'], ['Mission end', '1968'], ['Legacy', 'Surveyor 3 was later visited by Apollo 12 astronauts, who examined parts of the spacecraft.']],
    clues: [
      { id: 'site', title: 'Clue 1: The Landing Site', pos: [37, -48], radius: 3.6, prop: 'lander', text: 'Robotic Surveyor landers tested the lunar surface before crewed Apollo landings.', fact: 'The location and landing method shaped what scientists could investigate.' },
      { id: 'instrument', title: 'Clue 2: Science at Work', pos: [-1, -58], radius: 3.6, prop: 'battery', text: 'Surveyor 3 was later visited by Apollo 12 astronauts, who examined parts of the spacecraft.', fact: 'Scientific instruments turn a distant world into a place we can study.' },
      { id: 'legacy', title: 'Clue 3: The Lasting Trace', pos: [29, -72], radius: 3.6, prop: 'samples', text: 'Even after a mission ends, its hardware and discoveries remain part of the story. Robotic Surveyor landers tested the lunar surface before crewed Apollo landings.', fact: 'A mission can end while its scientific legacy continues.' }
    ],
    quiz: { question: 'What is an important part of the Surveyor Lunar Lander story?', options: ['Its mission and scientific work left evidence for future exploration.', 'It was recovered and reused on Earth.', 'It never reached its destination.'], correct: 0, explanation: 'Surveyor 3 was later visited by Apollo 12 astronauts, who examined parts of the spacecraft.' },
    legacy: ['Its hardware remains a record of exploration.', 'Its observations helped scientists understand another world.', 'Its mission informs the design of future exploration.']
  },
  'viking-1': {
    id: 'viking-1', number: 8, title: 'MISSION 08: VIKING 1 LANDER', shortTitle: 'Viking 1 Lander', artifactName: 'Viking 1 Lander', planet: 'mars', briefing: 'Viking 1 made the first successful US landing on Mars and performed surface experiments.',
    objectives: ['Locate the Viking 1 Lander', 'Collect all three evidence clues', 'Uncover why this mission became part of space history'],
    rover: { pos: [-29, -49], radius: 5, rotationY: 0.4, size: 4.2, collider: 2.2, url: '/models/spacecraft/viking-lander.glb', },
    roverFacts: [['Mission', 'Viking 1 Lander'], ['Era', '1975–1982'], ['Launch', '1975'], ['Mission end', '1982'], ['Legacy', 'Viking 1 landed in Chryse Planitia in July 1976 and operated on the surface until 1982.']],
    clues: [
      { id: 'site', title: 'Clue 1: The Landing Site', pos: [-11, -61], radius: 3.6, prop: 'lander', text: 'Viking 1 made the first successful US landing on Mars and performed surface experiments.', fact: 'The location and landing method shaped what scientists could investigate.' },
      { id: 'instrument', title: 'Clue 2: Science at Work', pos: [-49, -71], radius: 3.6, prop: 'battery', text: 'Viking 1 landed in Chryse Planitia in July 1976 and operated on the surface until 1982.', fact: 'Scientific instruments turn a distant world into a place we can study.' },
      { id: 'legacy', title: 'Clue 3: The Lasting Trace', pos: [-19, -85], radius: 3.6, prop: 'samples', text: 'Even after a mission ends, its hardware and discoveries remain part of the story. Viking 1 made the first successful US landing on Mars and performed surface experiments.', fact: 'A mission can end while its scientific legacy continues.' }
    ],
    quiz: { question: 'What is an important part of the Viking 1 Lander story?', options: ['Its mission and scientific work left evidence for future exploration.', 'It was recovered and reused on Earth.', 'It never reached its destination.'], correct: 0, explanation: 'Viking 1 landed in Chryse Planitia in July 1976 and operated on the surface until 1982.' },
    legacy: ['Its hardware remains a record of exploration.', 'Its observations helped scientists understand another world.', 'Its mission informs the design of future exploration.']
  },
  'viking-2': {
    id: 'viking-2', number: 9, title: 'MISSION 09: VIKING 2 LANDER', shortTitle: 'Viking 2 Lander', artifactName: 'Viking 2 Lander', planet: 'mars', briefing: 'Viking 2 studied the Martian plains of Utopia Planitia after landing in September 1976.',
    objectives: ['Locate the Viking 2 Lander', 'Collect all three evidence clues', 'Uncover why this mission became part of space history'],
    rover: { pos: [-12, -62], radius: 5, rotationY: 0.4, size: 4.2, collider: 2.2, url: '/models/spacecraft/viking-lander.glb', },
    roverFacts: [['Mission', 'Viking 2 Lander'], ['Era', '1975–1980'], ['Launch', '1975'], ['Mission end', '1980'], ['Legacy', 'Viking 2 returned images and science data from the Martian surface until 1980.']],
    clues: [
      { id: 'site', title: 'Clue 1: The Landing Site', pos: [6, -74], radius: 3.6, prop: 'lander', text: 'Viking 2 studied the Martian plains of Utopia Planitia after landing in September 1976.', fact: 'The location and landing method shaped what scientists could investigate.' },
      { id: 'instrument', title: 'Clue 2: Science at Work', pos: [-32, -84], radius: 3.6, prop: 'battery', text: 'Viking 2 returned images and science data from the Martian surface until 1980.', fact: 'Scientific instruments turn a distant world into a place we can study.' },
      { id: 'legacy', title: 'Clue 3: The Lasting Trace', pos: [-2, -98], radius: 3.6, prop: 'samples', text: 'Even after a mission ends, its hardware and discoveries remain part of the story. Viking 2 studied the Martian plains of Utopia Planitia after landing in September 1976.', fact: 'A mission can end while its scientific legacy continues.' }
    ],
    quiz: { question: 'What is an important part of the Viking 2 Lander story?', options: ['Its mission and scientific work left evidence for future exploration.', 'It was recovered and reused on Earth.', 'It never reached its destination.'], correct: 0, explanation: 'Viking 2 returned images and science data from the Martian surface until 1980.' },
    legacy: ['Its hardware remains a record of exploration.', 'Its observations helped scientists understand another world.', 'Its mission informs the design of future exploration.']
  },
  'phoenix': {
    id: 'phoenix', number: 10, title: 'MISSION 10: PHOENIX MARS LANDER', shortTitle: 'Phoenix Mars Lander', artifactName: 'Phoenix Mars Lander', planet: 'mars', briefing: 'Phoenix dug into northern Martian soil and confirmed water ice beneath the surface.',
    objectives: ['Locate the Phoenix Mars Lander', 'Collect all three evidence clues', 'Uncover why this mission became part of space history'],
    rover: { pos: [5, -35], radius: 5, rotationY: 0.4, size: 4.2, collider: 2.2, },
    roverFacts: [['Mission', 'Phoenix Mars Lander'], ['Era', '2007–2008'], ['Launch', '2007'], ['Mission end', '2008'], ['Legacy', 'Phoenix landed in the Martian arctic in May 2008 and completed its mission as seasonal darkness and cold arrived.']],
    clues: [
      { id: 'site', title: 'Clue 1: The Landing Site', pos: [23, -47], radius: 3.6, prop: 'solar', text: 'Phoenix dug into northern Martian soil and confirmed water ice beneath the surface.', fact: 'The location and landing method shaped what scientists could investigate.' },
      { id: 'instrument', title: 'Clue 2: Science at Work', pos: [-15, -57], radius: 3.6, prop: 'battery', text: 'Phoenix landed in the Martian arctic in May 2008 and completed its mission as seasonal darkness and cold arrived.', fact: 'Scientific instruments turn a distant world into a place we can study.' },
      { id: 'legacy', title: 'Clue 3: The Lasting Trace', pos: [15, -71], radius: 3.6, prop: 'samples', text: 'Even after a mission ends, its hardware and discoveries remain part of the story. Phoenix dug into northern Martian soil and confirmed water ice beneath the surface.', fact: 'A mission can end while its scientific legacy continues.' }
    ],
    quiz: { question: 'What is an important part of the Phoenix Mars Lander story?', options: ['Its mission and scientific work left evidence for future exploration.', 'It was recovered and reused on Earth.', 'It never reached its destination.'], correct: 0, explanation: 'Phoenix landed in the Martian arctic in May 2008 and completed its mission as seasonal darkness and cold arrived.' },
    legacy: ['Its hardware remains a record of exploration.', 'Its observations helped scientists understand another world.', 'Its mission informs the design of future exploration.']
  },
  'insight': {
    id: 'insight', number: 11, title: 'MISSION 11: INSIGHT MARS LANDER', shortTitle: 'InSight Mars Lander', artifactName: 'InSight Mars Lander', planet: 'mars', briefing: 'InSight listened for marsquakes and studied the planet interior using a seismometer and heat-flow experiment.',
    objectives: ['Locate the InSight Mars Lander', 'Collect all three evidence clues', 'Uncover why this mission became part of space history'],
    rover: { pos: [22, -48], radius: 5, rotationY: 0.4, size: 4.2, collider: 2.2, },
    roverFacts: [['Mission', 'InSight Mars Lander'], ['Era', '2018–2022'], ['Launch', '2018'], ['Mission end', '2022'], ['Legacy', 'Dust accumulation on its solar panels reduced power; NASA ended the mission after it stopped communicating in December 2022.']],
    clues: [
      { id: 'site', title: 'Clue 1: The Landing Site', pos: [40, -60], radius: 3.6, prop: 'solar', text: 'InSight listened for marsquakes and studied the planet interior using a seismometer and heat-flow experiment.', fact: 'The location and landing method shaped what scientists could investigate.' },
      { id: 'instrument', title: 'Clue 2: Science at Work', pos: [2, -70], radius: 3.6, prop: 'battery', text: 'Dust accumulation on its solar panels reduced power; NASA ended the mission after it stopped communicating in December 2022.', fact: 'Scientific instruments turn a distant world into a place we can study.' },
      { id: 'legacy', title: 'Clue 3: The Lasting Trace', pos: [32, -84], radius: 3.6, prop: 'samples', text: 'Even after a mission ends, its hardware and discoveries remain part of the story. InSight listened for marsquakes and studied the planet interior using a seismometer and heat-flow experiment.', fact: 'A mission can end while its scientific legacy continues.' }
    ],
    quiz: { question: 'What is an important part of the InSight Mars Lander story?', options: ['Its mission and scientific work left evidence for future exploration.', 'It was recovered and reused on Earth.', 'It never reached its destination.'], correct: 0, explanation: 'Dust accumulation on its solar panels reduced power; NASA ended the mission after it stopped communicating in December 2022.' },
    legacy: ['Its hardware remains a record of exploration.', 'Its observations helped scientists understand another world.', 'Its mission informs the design of future exploration.']
  },
  'ingenuity': {
    id: 'ingenuity', number: 12, title: 'MISSION 12: INGENUITY MARS HELICOPTER', shortTitle: 'Ingenuity Mars Helicopter', artifactName: 'Ingenuity Mars Helicopter', planet: 'mars', briefing: 'Ingenuity became the first aircraft to make powered, controlled flights on another planet.',
    objectives: ['Locate the Ingenuity Mars Helicopter', 'Collect all three evidence clues', 'Uncover why this mission became part of space history'],
    rover: { pos: [-26, -61], radius: 5, rotationY: 0.4, size: 4.2, collider: 2.2, url: '/models/spacecraft/ingenuity-helicopter.glb', },
    roverFacts: [['Mission', 'Ingenuity Mars Helicopter'], ['Era', '2021–2024'], ['Launch', '2020'], ['Mission end', '2024'], ['Legacy', 'Its rotor blades were damaged during its 72nd flight in January 2024, ending flight operations.']],
    clues: [
      { id: 'site', title: 'Clue 1: The Landing Site', pos: [-8, -73], radius: 3.6, prop: 'antenna', text: 'Ingenuity became the first aircraft to make powered, controlled flights on another planet.', fact: 'The location and landing method shaped what scientists could investigate.' },
      { id: 'instrument', title: 'Clue 2: Science at Work', pos: [-46, -83], radius: 3.6, prop: 'battery', text: 'Its rotor blades were damaged during its 72nd flight in January 2024, ending flight operations.', fact: 'Scientific instruments turn a distant world into a place we can study.' },
      { id: 'legacy', title: 'Clue 3: The Lasting Trace', pos: [-16, -97], radius: 3.6, prop: 'samples', text: 'Even after a mission ends, its hardware and discoveries remain part of the story. Ingenuity became the first aircraft to make powered, controlled flights on another planet.', fact: 'A mission can end while its scientific legacy continues.' }
    ],
    quiz: { question: 'What is an important part of the Ingenuity Mars Helicopter story?', options: ['Its mission and scientific work left evidence for future exploration.', 'It was recovered and reused on Earth.', 'It never reached its destination.'], correct: 0, explanation: 'Its rotor blades were damaged during its 72nd flight in January 2024, ending flight operations.' },
    legacy: ['Its hardware remains a record of exploration.', 'Its observations helped scientists understand another world.', 'Its mission informs the design of future exploration.']
  },
  'dawn': {
    id: 'dawn', number: 13, title: 'MISSION 13: DAWN SPACECRAFT', shortTitle: 'Dawn Spacecraft', artifactName: 'Dawn Spacecraft', planet: 'deep', briefing: 'Dawn explored Vesta and Ceres, becoming the first spacecraft to orbit two extraterrestrial bodies.',
    objectives: ['Locate the Dawn Spacecraft', 'Collect all three evidence clues', 'Uncover why this mission became part of space history'],
    rover: { pos: [-9, -34], radius: 5, rotationY: 0.4, size: 4.2, collider: 2.2, },
    roverFacts: [['Mission', 'Dawn Spacecraft'], ['Era', '2007–2018'], ['Launch', '2007'], ['Mission end', '2018'], ['Legacy', 'Dawn ran out of hydrazine in 2018 and remains in orbit around dwarf planet Ceres.']],
    clues: [
      { id: 'site', title: 'Clue 1: The Landing Site', pos: [9, -46], radius: 3.6, prop: 'antenna', text: 'Dawn explored Vesta and Ceres, becoming the first spacecraft to orbit two extraterrestrial bodies.', fact: 'The location and landing method shaped what scientists could investigate.' },
      { id: 'instrument', title: 'Clue 2: Science at Work', pos: [-29, -56], radius: 3.6, prop: 'battery', text: 'Dawn ran out of hydrazine in 2018 and remains in orbit around dwarf planet Ceres.', fact: 'Scientific instruments turn a distant world into a place we can study.' },
      { id: 'legacy', title: 'Clue 3: The Lasting Trace', pos: [1, -70], radius: 3.6, prop: 'samples', text: 'Even after a mission ends, its hardware and discoveries remain part of the story. Dawn explored Vesta and Ceres, becoming the first spacecraft to orbit two extraterrestrial bodies.', fact: 'A mission can end while its scientific legacy continues.' }
    ],
    quiz: { question: 'What is an important part of the Dawn Spacecraft story?', options: ['Its mission and scientific work left evidence for future exploration.', 'It was recovered and reused on Earth.', 'It never reached its destination.'], correct: 0, explanation: 'Dawn ran out of hydrazine in 2018 and remains in orbit around dwarf planet Ceres.' },
    legacy: ['Its hardware remains a record of exploration.', 'Its observations helped scientists understand another world.', 'Its mission informs the design of future exploration.']
  },
  'near-shoemaker': {
    id: 'near-shoemaker', number: 14, title: 'MISSION 14: NEAR SHOEMAKER', shortTitle: 'NEAR Shoemaker', artifactName: 'NEAR Shoemaker', planet: 'deep', briefing: 'NEAR Shoemaker studied asteroid Eros and made a successful controlled touchdown in 2001.',
    objectives: ['Locate the NEAR Shoemaker', 'Collect all three evidence clues', 'Uncover why this mission became part of space history'],
    rover: { pos: [8, -47], radius: 5, rotationY: 0.4, size: 4.2, collider: 2.2, },
    roverFacts: [['Mission', 'NEAR Shoemaker'], ['Era', '1996–2001'], ['Launch', '1996'], ['Mission end', '2001'], ['Legacy', 'Designed as an orbiter, NEAR Shoemaker survived its landing on Eros and returned data from the surface.']],
    clues: [
      { id: 'site', title: 'Clue 1: The Landing Site', pos: [26, -59], radius: 3.6, prop: 'samples', text: 'NEAR Shoemaker studied asteroid Eros and made a successful controlled touchdown in 2001.', fact: 'The location and landing method shaped what scientists could investigate.' },
      { id: 'instrument', title: 'Clue 2: Science at Work', pos: [-12, -69], radius: 3.6, prop: 'battery', text: 'Designed as an orbiter, NEAR Shoemaker survived its landing on Eros and returned data from the surface.', fact: 'Scientific instruments turn a distant world into a place we can study.' },
      { id: 'legacy', title: 'Clue 3: The Lasting Trace', pos: [18, -83], radius: 3.6, prop: 'samples', text: 'Even after a mission ends, its hardware and discoveries remain part of the story. NEAR Shoemaker studied asteroid Eros and made a successful controlled touchdown in 2001.', fact: 'A mission can end while its scientific legacy continues.' }
    ],
    quiz: { question: 'What is an important part of the NEAR Shoemaker story?', options: ['Its mission and scientific work left evidence for future exploration.', 'It was recovered and reused on Earth.', 'It never reached its destination.'], correct: 0, explanation: 'Designed as an orbiter, NEAR Shoemaker survived its landing on Eros and returned data from the surface.' },
    legacy: ['Its hardware remains a record of exploration.', 'Its observations helped scientists understand another world.', 'Its mission informs the design of future exploration.']
  },
  'pioneer-10': {
    id: 'pioneer-10', number: 15, title: 'MISSION 15: PIONEER 10', shortTitle: 'Pioneer 10', artifactName: 'Pioneer 10', planet: 'deep', briefing: 'Pioneer 10 was the first spacecraft to travel through the asteroid belt and make close observations of Jupiter.',
    objectives: ['Locate the Pioneer 10', 'Collect all three evidence clues', 'Uncover why this mission became part of space history'],
    rover: { pos: [25, -60], radius: 5, rotationY: 0.4, size: 4.2, collider: 2.2, },
    roverFacts: [['Mission', 'Pioneer 10'], ['Era', '1972–2003'], ['Launch', '1972'], ['Mission end', '2003'], ['Legacy', 'Its last signal reached Earth in January 2003; it continues on a trajectory away from the Sun.']],
    clues: [
      { id: 'site', title: 'Clue 1: The Landing Site', pos: [43, -72], radius: 3.6, prop: 'antenna', text: 'Pioneer 10 was the first spacecraft to travel through the asteroid belt and make close observations of Jupiter.', fact: 'The location and landing method shaped what scientists could investigate.' },
      { id: 'instrument', title: 'Clue 2: Science at Work', pos: [5, -82], radius: 3.6, prop: 'battery', text: 'Its last signal reached Earth in January 2003; it continues on a trajectory away from the Sun.', fact: 'Scientific instruments turn a distant world into a place we can study.' },
      { id: 'legacy', title: 'Clue 3: The Lasting Trace', pos: [35, -96], radius: 3.6, prop: 'samples', text: 'Even after a mission ends, its hardware and discoveries remain part of the story. Pioneer 10 was the first spacecraft to travel through the asteroid belt and make close observations of Jupiter.', fact: 'A mission can end while its scientific legacy continues.' }
    ],
    quiz: { question: 'What is an important part of the Pioneer 10 story?', options: ['Its mission and scientific work left evidence for future exploration.', 'It was recovered and reused on Earth.', 'It never reached its destination.'], correct: 0, explanation: 'Its last signal reached Earth in January 2003; it continues on a trajectory away from the Sun.' },
    legacy: ['Its hardware remains a record of exploration.', 'Its observations helped scientists understand another world.', 'Its mission informs the design of future exploration.']
  },
  'pioneer-11': {
    id: 'pioneer-11', number: 16, title: 'MISSION 16: PIONEER 11', shortTitle: 'Pioneer 11', artifactName: 'Pioneer 11', planet: 'deep', briefing: 'Pioneer 11 flew past Jupiter and Saturn and sent the first close-up observations of Saturn.',
    objectives: ['Locate the Pioneer 11', 'Collect all three evidence clues', 'Uncover why this mission became part of space history'],
    rover: { pos: [-23, -33], radius: 5, rotationY: 0.4, size: 4.2, collider: 2.2, },
    roverFacts: [['Mission', 'Pioneer 11'], ['Era', '1973–1995'], ['Launch', '1973'], ['Mission end', '1995'], ['Legacy', 'The last contact was in September 1995; the spacecraft continues outward on its solar-system escape trajectory.']],
    clues: [
      { id: 'site', title: 'Clue 1: The Landing Site', pos: [-5, -45], radius: 3.6, prop: 'antenna', text: 'Pioneer 11 flew past Jupiter and Saturn and sent the first close-up observations of Saturn.', fact: 'The location and landing method shaped what scientists could investigate.' },
      { id: 'instrument', title: 'Clue 2: Science at Work', pos: [-43, -55], radius: 3.6, prop: 'battery', text: 'The last contact was in September 1995; the spacecraft continues outward on its solar-system escape trajectory.', fact: 'Scientific instruments turn a distant world into a place we can study.' },
      { id: 'legacy', title: 'Clue 3: The Lasting Trace', pos: [-13, -69], radius: 3.6, prop: 'samples', text: 'Even after a mission ends, its hardware and discoveries remain part of the story. Pioneer 11 flew past Jupiter and Saturn and sent the first close-up observations of Saturn.', fact: 'A mission can end while its scientific legacy continues.' }
    ],
    quiz: { question: 'What is an important part of the Pioneer 11 story?', options: ['Its mission and scientific work left evidence for future exploration.', 'It was recovered and reused on Earth.', 'It never reached its destination.'], correct: 0, explanation: 'The last contact was in September 1995; the spacecraft continues outward on its solar-system escape trajectory.' },
    legacy: ['Its hardware remains a record of exploration.', 'Its observations helped scientists understand another world.', 'Its mission informs the design of future exploration.']
  },
  'kepler': {
    id: 'kepler', number: 17, title: 'MISSION 17: KEPLER SPACE TELESCOPE', shortTitle: 'Kepler Space Telescope', artifactName: 'Kepler Space Telescope', planet: 'deep', briefing: 'Kepler discovered thousands of exoplanet candidates by watching stars for tiny dips in brightness.',
    objectives: ['Locate the Kepler Space Telescope', 'Collect all three evidence clues', 'Uncover why this mission became part of space history'],
    rover: { pos: [-6, -46], radius: 5, rotationY: 0.4, size: 4.2, collider: 2.2, },
    roverFacts: [['Mission', 'Kepler Space Telescope'], ['Era', '2009–2018'], ['Launch', '2009'], ['Mission end', '2018'], ['Legacy', 'NASA retired Kepler in 2018 after it ran out of fuel. It follows an Earth-trailing orbit around the Sun.']],
    clues: [
      { id: 'site', title: 'Clue 1: The Landing Site', pos: [12, -58], radius: 3.6, prop: 'solar', text: 'Kepler discovered thousands of exoplanet candidates by watching stars for tiny dips in brightness.', fact: 'The location and landing method shaped what scientists could investigate.' },
      { id: 'instrument', title: 'Clue 2: Science at Work', pos: [-26, -68], radius: 3.6, prop: 'battery', text: 'NASA retired Kepler in 2018 after it ran out of fuel. It follows an Earth-trailing orbit around the Sun.', fact: 'Scientific instruments turn a distant world into a place we can study.' },
      { id: 'legacy', title: 'Clue 3: The Lasting Trace', pos: [4, -82], radius: 3.6, prop: 'samples', text: 'Even after a mission ends, its hardware and discoveries remain part of the story. Kepler discovered thousands of exoplanet candidates by watching stars for tiny dips in brightness.', fact: 'A mission can end while its scientific legacy continues.' }
    ],
    quiz: { question: 'What is an important part of the Kepler Space Telescope story?', options: ['Its mission and scientific work left evidence for future exploration.', 'It was recovered and reused on Earth.', 'It never reached its destination.'], correct: 0, explanation: 'NASA retired Kepler in 2018 after it ran out of fuel. It follows an Earth-trailing orbit around the Sun.' },
    legacy: ['Its hardware remains a record of exploration.', 'Its observations helped scientists understand another world.', 'Its mission informs the design of future exploration.']
  }
}

export const MISSIONS = [...CORE_MISSIONS, ...EXPANDED_MISSIONS]
export const MISSION_DATA = { opportunity: OPPORTUNITY, spirit: SPIRIT, sojourner: SOJOURNER, 'apollo-lrv': APOLLO, ...EXPANDED_MISSION_DATA }
