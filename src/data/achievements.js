export const BADGES = [
  { id: 'first-clue', name: 'First Clue', desc: 'Collect your first clue.', test: (s) => Object.values(s.missions).some((m) => m.clues?.length > 0) },
  { id: 'rover-found', name: 'Rover Finder', desc: 'Discover the Opportunity Rover.', test: (s) => !!s.missions.opportunity?.rover },
  { id: 'mars-investigator', name: 'Mars Investigator', desc: 'Complete Mission 01: The Last Signal.', test: (s) => !!s.missions.opportunity?.completed },
  { id: 'timekeeper', name: 'Timekeeper', desc: 'Put the mission timeline in order.', test: (s) => !!s.timeline.solved },
  { id: 'spirit-done', name: 'Gusev Survivor', desc: 'Complete Mission 02: The Survivor.', test: (s) => !!s.missions.spirit?.completed },
  { id: 'soj-done', name: 'Pathfinder', desc: 'Complete Mission 03: First Tracks.', test: (s) => !!s.missions.sojourner?.completed },
  { id: 'lrv-done', name: 'Lunar Driver', desc: 'Complete Mission 04: Wheels on the Moon.', test: (s) => !!s.missions['apollo-lrv']?.completed },
]
