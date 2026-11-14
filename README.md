# AFTERTRACE: The Mission Ends. The Story Doesn't.

All 4 missions playable: 01 Opportunity (Mars), 02 Spirit (Mars), 03 Sojourner (Mars), 04 Apollo Lunar Roving Vehicle (Moon).

## Run it
```bash
npm install     # also copies the Draco decoder into public/draco (needed by the rover model)
npm run dev     # open the http://localhost:5173 link it prints
```
Use Chrome, Edge or Firefox on a laptop/desktop. Stop the server with Ctrl+C.

## Test checklist
1. Home: 3D hero loads; "Start Your Journey" opens the Mission Atlas.
2. Atlas: Mars tab -> Opportunity -> Start Investigation.
3. Briefing -> Start Investigation. Click the screen if the mouse isn't captured.
4. WASD, Shift, Space, mouse. Walk to the glowing rings. Press E.
5. Find the rover + 3 clues -> the quiz appears automatically -> Complete Mission.
6. Achievements page shows saved progress. Reload the page: it persists.
7. Esc pauses. Pause menu: Resume / Restart / Controls / Sound / Exit.
8. Timeline page: put the 7 events in order.

## Things you may need to tune (top of src/game/components/Astronaut.jsx)
- `YAW_OFFSET`: if the astronaut walks sideways or backwards, try `Math.PI` or `Math.PI / 2`.
- `IDLE_FRACTION`: which frame of the walk clip is frozen as the standing pose.
- Rover direction: `rover.rotationY` in src/data/missions.js. Rover size: `size` prop in OpportunityRover.jsx.

## Idle animation (missing from your GLB)
Your astronaut only has `walk` and `run`. Right now the standing pose is a frozen frame of `walk`.
To add a real one: upload the astronaut to mixamo.com (or use a Mixamo "Idle" with the same skeleton, no skin),
download it as FBX/GLB, then in Blender (or gltf-transform) copy the clip into a NEW file
`public/models/astronaut/astronaut-idle.glb`. Then load that clip's animation in Astronaut.jsx and name it `idle`.
Keep your original GLB untouched.

## Adding a mission
1. Add content to `src/data/missions.js` (MISSIONS + a mission data object) and `artifacts.js`.
2. Copy `MarsScene.jsx` / props for the new scene and point Play.jsx at it.

## Models used per mission
- Opportunity and Spirit: your Opportunity GLB (the two rovers are identical twins).
- Sojourner and Apollo LRV: simple procedural stand-ins (no GLB supplied). Sojourner is drawn larger than life.
  To use real models: put the GLB in `public/models/rovers/` or `public/models/lunar-equipment/` and swap it in `MissionScene.jsx` (`Artifact`).
- Clue props (solar panel, lander, etc.) are also simple shapes in `ClueProps.jsx`.

## Models in public/models (from your Team Asset Library)
Used in the game:
- `rovers/opportunity.glb` (Opportunity), `rovers/spirit-mer.glb` (Spirit, 24883_MER_static, ~12 MB)
- `spacecraft/apollo-lunar-module.glb` (Apollo clue 1)
- `environment/moon-lro-globe.glb` (3D Moon in the Mission Atlas)
Stored for future missions, not used yet:
- `spacecraft/viking-lander.glb`, `spacecraft/ingenuity-helicopter.glb`, `rovers/perseverance.glb`, `astronaut/emu-suit.glb`
Not copied (large, unused): Curiosity_static.glb, Z2 Spacesuit.glb. They stay in your library zip.
The "Animations (Idle _ Walking)" astronaut file is identical to the original: it only has walk and run, so no real Idle clip yet.

## Known limitations
- Untested in a browser by the author of this phase (no internet/browser in the build sandbox). Expect small fixes.
- Terrain is procedural. The Moon scene and Missions 02-04 are new and equally untested in a browser.
- Idle is a breathing motion on a frozen walk frame, not a real Idle clip. Investigation: the astronaut turns to face the object. No cheer animation.
- Footsteps/UI sounds are synthesised in the browser (no audio files supplied).
- Astronaut GLB is ~14 MB (large textures). Compress later with `npx @gltf-transform/cli optimize`.
- Verify all mission facts and add model licence credits in About.jsx / artifacts.js.
