# Expanded Aftertrace missions

This build expands the playable Mission Atlas from 4 to 17 investigations.

## Mission groups
- Moon: Apollo Lunar Roving Vehicle, Apollo Lunar Module descent stages, ALSEP, Surveyor
- Mars: Sojourner, Spirit, Opportunity, Viking 1, Viking 2, Phoenix, InSight, Ingenuity
- Deep Space: Dawn, NEAR Shoemaker, Pioneer 10, Pioneer 11, Kepler

## Models and stand-ins
The project uses the supplied GLB files for the Apollo Lunar Module, Viking lander, Ingenuity helicopter, Spirit rover and Opportunity rover. The Lunar Roving Vehicle and Sojourner use the project's procedural models. Other missions use simple procedural lander/spacecraft stand-ins until dedicated, licensed models are added.

## Audio and narration
Ambient audio and interaction effects are synthesized in the browser. When a player discovers an artifact or clue, the browser's built-in Speech Synthesis voice reads the briefing or clue aloud. Voice availability and sound quality depend on the browser and installed system voices; no external audio files or API key are required.

## Run locally
1. Install Node.js (LTS).
2. Open this project folder in a terminal.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local Vite URL shown in the terminal.

## Before public release
The expanded mission descriptions are starter archive content. Verify historical wording and add primary NASA references and model licenses/credits for every mission before publishing or submitting the final build.
