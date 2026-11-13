// All mission content lives here so new missions can be added without touching game code.
// Facts: verify against the NASA links in artifacts.js before you publish.

export const MISSIONS = [
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
  rover: { pos: [20, -34], radius: 5.5, rotationY: -0.8, model: 'mer', size: 2.6, collider: 1.9 },
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
  roverFacts: [
    ['Used on', 'Apollo 15, 16 and 17 (1971\u20131972)'], ['Crew', 'Two astronauts'],
    ['Power', 'Electric motors on batteries that could not be recharged'],
    ['Top speed', 'About 13 km/h (8 mph)'],
    ['Why it mattered', 'Let crews travel much farther from the lander than walking allowed'],
    ['Where they are now', 'Still on the Moon, near the Apollo 15, 16 and 17 landing sites'],
  ],
  clues: [
    { id: 'lm', title: 'Clue 1: Folded for the Trip', pos: [26, -16], radius: 3.4, prop: 'lm',
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

export const MISSION_DATA = { opportunity: OPPORTUNITY, spirit: SPIRIT, sojourner: SOJOURNER, 'apollo-lrv': APOLLO }
