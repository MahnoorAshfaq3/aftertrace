# AfterTrace — Product Requirements Document

**Document status:** Repository-based baseline; requires stakeholder review
**Product name:** AFTERTRACE
**Evidence cutoff:** Current repository contents
**Audience:** Product, design, engineering, QA, and stakeholder reviewers


## Evidence and status convention

This PRD describes behavior present in the repository, not a promise that every path has passed browser QA. “Implemented” means that code and content for the behavior exist. The README says the author has not browser-tested this phase and specifically calls out the Moon scene and Missions 02–04 as untested. Unless noted otherwise, runtime behavior should therefore be treated as **implemented in source; browser verification pending**.

- **Implemented:** present in source and connected to the application.
- **Partial / placeholder:** a user-facing surface exists, but content, assets, attribution, or validation is incomplete.
- **Suggested:** a potential future enhancement, not an existing commitment.
- **Requires Product Clarification:** the repository does not establish a product decision, target, or requirement.

Source references are relative to the repository root. Mission facts and asset ownership are described as repository content; this PRD does not independently fact-check historical claims or licenses.

---

## 1. Product Overview

### Product name
**AFTERTRACE: The Mission Ends. The Story Doesn't.**

### Product vision
Help people connect with the stories and scientific legacy of human and robotic exploration by letting them investigate the equipment left on the Moon and Mars. The vision is expressed in the landing-page tagline and the educational-purpose copy in [About.jsx](./src/pages/About.jsx).

### Product purpose
AFTERTRACE is a browser-based educational experience. Users explore stylized 3D planetary environments, find mission artifacts and evidence, answer a mission-specific question, and read mission dossiers. A separate timeline activity reinforces the Opportunity rover’s chronology.

### Problem statement
The product’s stated premise is that mission histories are often encountered as lists of facts, which can make the stories and significance of retired equipment less engaging. The project proposes an interactive investigation as an alternative. This is the product’s stated rationale, not a repository-validated user-research finding.

### Proposed solution
A React single-page application combining:

1. A branded landing page and planet/mission navigation.
2. Four playable, keyboard-and-mouse 3D investigations on Mars and the Moon.
3. Clue and artifact discovery, educational overlays, and a multiple-choice mission quiz.
4. Mission dossiers, an Opportunity timeline puzzle, and locally saved achievements.

The application identifies itself as an independent educational project created for the NASA Space Apps Challenge 2026 and says it is not affiliated with or endorsed by NASA ([About.jsx](./src/pages/About.jsx), [Footer.jsx](./src/components/Footer.jsx)).

---

## 2. Goals and Objectives

### Primary goals evidenced by the product
- Make stories about retired exploration equipment interactive.
- Present mission facts, discoveries, final communications, and legacy in context.
- Let a visitor play through mission investigations on Mars and the Moon.
- Encourage continued exploration through progress, points, and badges.

These are inferred from the implemented experience and product copy; no formal business plan or approved product objectives are included in the repository.

### Business objectives
**Requires Product Clarification.** No revenue model, adoption target, retention objective, stakeholder commitments, or business KPI is defined in the repository. The NASA Space Apps Challenge 2026 attribution describes the project context, not a commercial objective.

### User objectives
- Discover the available missions and choose a planet or rover.
- Explore the environment and understand mission evidence.
- Solve the reason a mission or artifact went silent or was left behind.
- Learn additional historical and scientific context.
- See progress retained in the current browser.

### Success metrics (KPIs)
No analytics, telemetry, user research, baseline, or target values are implemented or documented. The following are **candidate measures for product discussion only**, not current requirements:

| Candidate KPI | Possible definition | Status |
|---|---|---|
| Mission start rate | Mission starts / Mission Atlas visits | Requires Product Clarification; no analytics |
| Mission completion rate | Completed missions / Started missions | Completion exists locally; no aggregate service |
| Learning activity completion | Correct quiz or timeline completions / starts | Events are stored locally only |
| Return engagement | Returning browsers with a new mission or activity | No user identity or analytics |
| Experience quality | Usability/accessibility/performance evaluation results | No acceptance target or test report |

Any targets, collection consent, analytics platform, and privacy treatment require Product Clarification.

---

## 3. Target Audience

### Target users
The repository supports a broad educational audience interested in space exploration. It does not specify age range, grade level, classroom use, educator workflows, or accessibility needs.

### Provisional personas
These are **hypotheses based on product utility**, not research-backed personas:

1. **Curious learner:** wants an engaging way to understand rover and lunar exploration history.
2. **Space enthusiast:** wants mission details, discoveries, and the story behind inactive equipment.
3. **Educator or group facilitator:** may use the dossiers and puzzle as supplementary educational material; no classroom management or educator tools are present.

Audience priority, reading level, supported languages, and whether the experience is intended for formal instruction are **Requires Product Clarification**.

### User needs and pain points addressed
- A clear entry point to select a mission.
- Simple controls and discoverable interaction prompts.
- Explanations attached to artifacts and clues rather than facts alone.
- A way to resume or review progress after leaving the page.
- Context and sources to continue learning.

The extent to which these needs are validated with users is unknown.

---

## 4. Functional Requirements

All implemented behaviors below are source-supported. Browser acceptance remains pending where the README says the experience is untested.

### FR-1: Landing page and navigation — Implemented
- Render the AFTERTRACE brand, tagline, educational introduction, and 3D hero scene where WebGL is available. The hero 3D component is lazy-loaded ([Home.jsx](./src/pages/Home.jsx), [HeroScene.jsx](./src/components/HeroScene.jsx)).
- “Start Your Journey” opens the Mission Atlas.
- Offer Moon and Mars shortcuts, featured mission cards, progress summary, and links to the archive, activities, and achievements.
- Provide a “Watch Trailer” dialog. The trailer URL is currently an empty string, so the implemented state displays a “Trailer coming soon” message and a Mission 01 shortcut. A published trailer is **not implemented** ([config.js](./src/data/config.js)).
- On small screens, provide a collapsible navigation menu ([Navbar.jsx](./src/components/Navbar.jsx)).

### FR-2: Mission Atlas — Implemented
- Default to Mars and select Opportunity; Moon selection defaults to Apollo LRV.
- Filter the four mission records by planet and display schematic markers, mission facts, progress, and a dossier link.
- Allow marker selection and offer “Start Investigation” or replay for playable missions. All four records are currently flagged playable in [missions.js](./src/data/missions.js).
- Offer free exploration through the `mode=explore` query parameter.
- The map is explicitly schematic; marker positions are UI layout percentages, not real coordinates ([MissionAtlas.jsx](./src/pages/MissionAtlas.jsx)).

### FR-3: 3D mission gameplay — Implemented in source
- Support four investigations:
  - **01 — The Last Signal:** Opportunity rover, Mars.
  - **02 — The Survivor:** Spirit rover, Mars.
  - **03 — First Tracks:** Sojourner rover, Mars.
  - **04 — Wheels on the Moon:** Apollo Lunar Roving Vehicle, Moon.
- Show mission briefing, objectives, and controls before play.
- Use a third-person astronaut controller with WASD/arrow movement, Shift to run, Space to jump, mouse to look, E to investigate, and Escape/pause controls ([Play.jsx](./src/pages/Play.jsx), [PlayerController.jsx](./src/game/components/PlayerController.jsx)).
- Detect nearby interactive objects, highlight them with animated markers, and show an E-key prompt. The nearest eligible item is selected by distance within its configured interaction radius ([MissionScene.jsx](./src/game/components/MissionScene.jsx), [InteractionMarker.jsx](./src/game/components/InteractionMarker.jsx)).
- Display artifact facts or clue explanations in an information panel. Mission clue and quiz content is data-driven in [missions.js](./src/data/missions.js).
- Show loading progress and a fallback when WebGL is unavailable or the scene fails ([Overlays.jsx](./src/game/components/Overlays.jsx), [webgl.js](./src/game/webgl.js)).
- **Asset status:** Opportunity and Spirit reuse the Opportunity rover GLB; Sojourner and the LRV are procedural stand-ins. Clue props are also procedural ([OpportunityRover.jsx](./src/game/components/OpportunityRover.jsx), [ProceduralArtifacts.jsx](./src/game/components/ProceduralArtifacts.jsx), [ClueProps.jsx](./src/game/components/ClueProps.jsx)).

### FR-4: Investigation progression, quiz, and completion — Implemented
- Each mission has one rover/artifact and three clues. Discovery is recorded when the player presses E nearby; collected clues and found rover persist by mission ID.
- In mission mode, after the rover and all three clues have been recorded, closing the relevant information panel opens the mission quiz unless it has already been answered correctly. Free exploration does not trigger the quiz.
- The quiz offers three options, explains correct and incorrect answers, permits retry after an incorrect answer, and allows completion after a correct answer.
- Completion records the mission and presents a badge label, clue count, points, and an expandable scientific legacy report; users can continue exploring or return to the Atlas ([Play.jsx](./src/pages/Play.jsx), [Overlays.jsx](./src/game/components/Overlays.jsx)).
- Restart resets progress for the current mission and returns to the briefing. It does not reset all browser progress.

### FR-5: Free exploration — Implemented
- `mode=explore` starts a mission environment with an exploration briefing and a free-roam HUD; it omits the investigation objectives and mission quiz.
- Users can still interact with the rover and clues. The repository does not define a separate free-roam score or progression policy.

### FR-6: Mission archive and dossiers — Implemented
- `/learn` lists the four artifact dossiers.
- `/learn/:id` renders launch/landing information, purpose, instruments, discoveries, mission timeline, ending, current status, significance, references, credits, and a link to play when available ([Learn.jsx](./src/pages/Learn.jsx), [artifacts.js](./src/data/artifacts.js)).
- Several model credit strings explicitly remain placeholders; references and facts require editorial/licensing verification.

### FR-7: Opportunity timeline activity — Implemented
- Show seven Opportunity events in randomized order.
- Users add events to a sequence by selecting them, remove a placed event by selecting it again, and submit only when all seven are placed.
- Identify incorrect positions and show a hint; on a perfect order, reveal event dates/notes and record the solved state.
- The activity awards 100 knowledge points on successful completion, derived from the saved timeline flag ([Timeline.jsx](./src/pages/Timeline.jsx), [missions.js](./src/data/missions.js)).

### FR-8: Achievements and progress — Implemented
- Display total completed missions, collected clues, earned badges, knowledge points, and a completion percentage based on four missions.
- Show seven dynamically evaluated badges and per-mission status.
- Offer mission start/continue/replay links and a confirmation before resetting all saved progress.
- Points are derived, not independently accumulated: 50 per clue, 50 for finding a rover, 100 for a correct quiz, 100 for mission completion, and 100 for solving the timeline. Badge criteria are defined in [MissionProgress.js](./src/game/systems/MissionProgress.js) and [achievements.js](./src/data/achievements.js).

### FR-9: Settings and audio — Implemented with limitations
- Persist sound mute and reduced-motion preferences.
- Generate UI tones, discovery/clue/completion/wrong-answer sounds, footsteps, and ambient noise with the browser Web Audio API. The audio directories contain placeholders only; supplied audio files are not used ([audio.js](./src/game/systems/audio.js)).
- No audio captions, separate volume sliders, or platform-wide settings are evidenced.

### FR-10: About, credits, and project disclosures — Implemented, content partial
- Explain educational purpose, project context, non-affiliation, team, and sources on About.
- Team names and some model credits are placeholders. Completion of credits is a release dependency ([About.jsx](./src/pages/About.jsx), [config.js](./src/data/config.js)).

### Business rules and data handling
- Progress key: `aftertrace.progress.v1` in browser `localStorage`; data is browser-local and has no account/cloud sync.
- Badges and knowledge-point totals are derived from mission/timeline state.
- Mission completion is reachable only after a correct quiz answer in mission mode.
- The Atlas’s four mission count and overall percentage are fixed at four.
- Clearing all progress preserves the current settings.
- A private-mode/storage exception may prevent persistence; the code catches storage errors without an in-product warning. Corrupt saved JSON falls back to default progress ([MissionProgress.js](./src/game/systems/MissionProgress.js)).
- No backend database, authentication, payment flow, user profile, or network API is implemented. External links are references to NASA pages; Google Fonts are loaded externally. An iframe is only used if a trailer URL is configured.

---

## 5. User Stories

1. As a first-time visitor, I want to understand the product and see available planets, so that I can choose where to begin.
2. As a learner, I want to filter missions by Moon or Mars, so that I can find a topic that interests me.
3. As a player, I want a briefing and visible controls before play, so that I know the investigation objective and how to move.
4. As a player, I want to explore a 3D terrain and investigate marked objects, so that I can discover mission evidence.
5. As a learner, I want each clue to explain its historical significance, so that I understand why it matters.
6. As a player, I want to answer a mission question after gathering evidence, so that I can test my understanding.
7. As a returning visitor, I want my mission progress retained in this browser, so that I can see what I have completed.
8. As a learner, I want to read a detailed dossier and references, so that I can continue learning outside the game.
9. As a player, I want to arrange Opportunity events chronologically and receive feedback, so that I can practice mission chronology.
10. As a visitor, I want to mute sound or reduce motion, so that I can adjust the experience to my preference.
11. As a visitor without WebGL, I want an explanatory fallback, so that I know why the 3D game cannot start.
12. As an educator or group facilitator, I may want classroom-oriented features; audience, workflow, and requirements are **Requires Product Clarification**.

---

## 6. Acceptance Criteria

The criteria below characterize source-supported behavior. They are not a claim that browser QA has passed.

### AC-1: Landing and navigation
- **Given** a visitor opens `/`, **when** the page renders, **then** the page shows the AFTERTRACE introduction, mission/planet entry points, featured missions, and progress summary.
- **Given** the trailer URL remains empty, **when** the visitor selects “Watch Trailer,” **then** the dialog shows the coming-soon message and a link to Mission 01.
- **Given** a narrow viewport, **when** the navigation toggle is activated, **then** the mobile navigation opens and its link selection closes it.

### AC-2: Mission selection
- **Given** the Atlas opens without a planet parameter, **then** Mars and Opportunity are selected.
- **Given** the visitor selects Moon or Mars, **then** the displayed mission list is filtered to that planet and its default mission is selected.
- **Given** any of the four current mission records is selected, **then** its dossier and investigation entry points are available because each record is flagged playable.

### AC-3: Gameplay controls and interaction
- **Given** WebGL is available and a mission has loaded, **when** the user starts the briefing, **then** the 3D scene, HUD, and documented desktop controls are available.
- **Given** the player is within the configured interaction radius of an artifact or clue, **when** the proximity system updates, **then** an E interaction prompt appears for the nearest eligible item.
- **Given** the player presses E while eligible and playing, **then** the correct artifact/clue information panel opens and the associated discovery state is recorded.
- **Given** WebGL is unavailable, **then** a WebGL fallback explains the issue and offers a way back to the site.

### AC-4: Mission quiz and completion
- **Given** a mission-mode player has found the rover and all three clues, **when** the final applicable information panel is closed, **then** the mission quiz opens unless a correct answer was already recorded.
- **Given** the user chooses an incorrect option, **then** the interface explains the evidence and offers a retry without completing the mission.
- **Given** the user chooses the correct option, **then** the explanation is shown and “Complete Mission” records completion and opens the completion panel.
- **Given** the user selects restart, **then** only that mission’s progress is reset and the mission briefing returns.

### AC-5: Persistence, points, and badges
- **Given** mission or timeline progress changes and browser storage is available, **when** the user reloads the same browser profile, **then** the stored state is loaded.
- **Given** saved state is displayed, **then** the point total equals the implemented derivation: 50 per clue + 50 per rover + 100 per correct quiz + 100 per completed mission + 100 for solved timeline.
- **Given** mission completion changes, **then** the overall completion percentage equals completed missions divided by four, rounded to the nearest integer.
- **Given** the user confirms the reset-all prompt, **then** mission/timeline progress returns to defaults while settings remain unchanged.

### AC-6: Archive and timeline
- **Given** the visitor opens `/learn`, **then** four dossier entries are available.
- **Given** a valid dossier ID is opened, **then** the dossier displays its available content fields and references.
- **Given** the timeline is incomplete, **when** fewer than seven events are placed, **then** “Check order” is disabled.
- **Given** all seven events are placed in chronological order, **when** the user checks the order, **then** success feedback, dated notes, and solved progress are shown.
- **Given** an incorrect order is checked, **then** incorrect positions are marked and a retry hint is shown.

### AC-7: Settings and accessibility affordances
- **Given** the user changes mute or reduced-motion settings, **when** the setting is changed, **then** the preference is saved locally and applied by the relevant audio/visual behavior.
- **Given** a keyboard user navigates the timeline, **then** its native buttons can add/remove events and submit the answer.
- **Given** a user navigates common site controls, **then** visible keyboard focus styling is present. Conformance to a formal WCAG level is **Requires Product Clarification and audit**.

---

## 7. User Flows

### A. Start a mission investigation
1. Open the home page.
2. Select “Start Your Journey,” a featured mission, or a planet shortcut.
3. In the Atlas, select a planet and mission.
4. Open the mission briefing and review the objective and controls.
5. Start the investigation; allow the scene to load and click the canvas if mouse capture is not active.
6. Move around the terrain, approach glowing markers, and press E to inspect the rover and three clues.
7. Read each information panel and continue.
8. After both the rover and all clues have been found, close the final panel to open the quiz.
9. Answer correctly; review the completion screen and optional legacy report.
10. Continue exploring or return to the Atlas. Progress appears on the achievements page and is stored locally.

### B. Explore freely
1. Open the Mission Atlas and choose a mission.
2. Select the “explore freely” link, which adds `mode=explore`.
3. Review the free-exploration briefing and controls.
4. Start and investigate environment objects. The mission quiz is bypassed.
5. Exit via the pause menu or site navigation.

### C. Read a mission dossier
1. Select “Learn” or “Read the dossier.”
2. Choose one of the four artifact entries.
3. Review purpose, instruments, discoveries, timeline, end state, status, significance, references, and credits.
4. For playable content, select the link to start the investigation.

### D. Solve the Opportunity timeline
1. Open “Timeline” from navigation or the home-page game mode.
2. Select events from the shuffled event pool to add them to the timeline.
3. Select a placed event to remove it and revise the order.
4. Once all seven events are placed, check the order.
5. Review success notes or incorrect-position feedback and retry as needed.
6. The solved state contributes 100 knowledge points and appears in achievements.

### E. Review and manage progress
1. Open Achievements from navigation or the home progress panel.
2. Review totals, badges, and per-mission status.
3. Start/continue/replay a mission from its row.
4. To clear progress, activate Reset all progress and confirm the browser prompt.

---

## 8. UI/UX Requirements

### Layout and navigation
- Use a dark, space-themed visual system with a sticky header, desktop navigation, responsive mobile menu, and footer on non-game pages.
- Keep `/play` full-screen and omit the global header/footer while playing.
- Maintain clear entry points to Explore, Learn, Timeline, Achievements, and About.
- Use informative empty, loading, completion, pause, and WebGL-unavailable states.

### Components
- Landing hero with optional WebGL 3D scene, planet cards, game-mode links, progress panel, and mission cards.
- Planet tabs, schematic map, mission detail panel, dossier, interactive game HUD/briefing/panels/quiz/pause/completion overlays, timeline event pool/order, and achievement cards.

### Responsive behavior
- Site layout uses responsive Tailwind breakpoints and a mobile navigation menu.
- The briefing explicitly warns that gameplay is designed for desktop/laptop keyboard input and may not be playable on touch screens.
- No touch controls are implemented. Mobile gameplay support is **not an existing capability**.

### Accessibility
- Existing affordances include semantic headings/links/buttons, selected tab state, labels/roles on several interactive regions, live/status regions, visible `:focus-visible` styling, keyboard-operated timeline buttons, a reduced-motion preference, and a system reduced-motion CSS rule.
- The 3D game depends on keyboard plus mouse/pointer lock, and some game information is rendered over a canvas. Screen-reader parity, focus trapping/return, contrast measurements, captions/transcripts, and WCAG conformance are not established. Formal accessibility target and remediation requirements are **Requires Product Clarification**.

### Visual consistency
- Preserve the Orbitron/Rajdhani typography, space/Mars/glow color palette, glass-style panels, consistent primary/secondary buttons, and consistent motion treatment as shown in [index.css](./src/styles/index.css), [tailwind.config.js](./tailwind.config.js), and [index.html](./index.html).

---

## 9. Non-Functional Requirements

| Area | Repository evidence / baseline | Requirement status |
|---|---|---|
| Performance | The 3D Play route and home hero are lazy-loaded; terrain and rocks are procedural/instanced; canvas device pixel ratio is capped. README identifies the astronaut GLB as approximately 14 MB. | No load-time, frame-rate, memory, or network budget is defined; Requires Product Clarification. |
| Security / privacy | No server, authentication, or account data is present. Progress/preferences are stored in browser `localStorage`. External dossier links use `target="_blank"` with `rel="noreferrer"`. | No security assessment, privacy notice, retention policy, or formal threat model is present; Requires Product Clarification. |
| Reliability | Asset and canvas error boundaries/fallbacks exist. A 20-second loading timeout reveals the game UI. Storage read/write exceptions are caught. | Storage failure is silent; no service-level or recovery targets are defined. |
| Scalability | Mission data and scene components are reusable across four missions. | No traffic, hosting, content growth, or concurrent-user targets are defined. |
| Compatibility | README recommends current Chrome, Edge, or Firefox on a laptop/desktop and the game requires WebGL. | Browser/version/device test matrix and support policy are Requires Product Clarification; README reports browser testing has not been completed. |
| Maintainability | Vite/React modules separate pages, components, mission data, game systems, and styles. README describes adding missions through data plus scene/content work. | No test suite, CI workflow, lint script, or maintenance SLA is evidenced in `package.json`. |
| Accessibility | Reduced-motion setting and browser preference support exist; keyboard focus styling is defined. | No conformance target or completed audit is evidenced. |

---

## 10. Technical Requirements

### Frontend architecture
- Vite 5 SPA with React 18 and React DOM.
- React Router 6 with routes `/`, `/explore`, `/play`, `/learn`, `/learn/:id`, `/timeline`, `/achievements`, and `/about`; unknown routes fall back to Home ([App.jsx](./src/App.jsx)).
- React Three Fiber 8, Drei 9, and Three.js 0.169 power the 3D canvas, GLTF loading, animation, and scene composition.
- GSAP animates the landing-page intro; Lucide React provides icons.
- Tailwind CSS 3, PostCSS, and Autoprefixer provide styling. Google Fonts (Orbitron and Rajdhani) are referenced externally.

### Backend and database
- No backend or database exists in the repository.
- Progress is a small local state store exposed to React through `useSyncExternalStore`; persistence uses `localStorage`.
- Application content is bundled in JavaScript data modules; terrain, rocks, and several artifact/prop meshes are generated at runtime.

### APIs and integrations
- No application API, analytics SDK, WebSocket, or third-party authentication integration is evidenced.
- Dossier references link to NASA web pages; the source links are static content and are not fetched as runtime APIs.
- Optional trailer embedding is configured by `TRAILER_URL`, which is currently blank.
- Web Audio API generates sounds in-browser.
- Draco decoder files under `public/draco` are used for compressed model loading. `postinstall` runs `scripts/copy-draco.mjs` to copy the decoder from Three.js dependencies.

### Third-party dependencies
Declared runtime packages: `react`, `react-dom`, `react-router-dom`, `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`, `lucide-react`. Declared build/style packages: Vite, `@vitejs/plugin-react`, Tailwind CSS, PostCSS, and Autoprefixer. Versions/ranges are listed in [package.json](./package.json).

### Repository structure and assets
- `src/pages`: Home, Mission Atlas, Play, Learn, Timeline, Achievements, About.
- `src/components`: navigation, footer, mission cards, progress panel, 3D hero.
- `src/data`: mission/game content, dossier content, badges, and small app configuration.
- `src/game/components`: environments, terrain, player controller, artifact/clue visuals, overlays, and asset fallback.
- `src/game/systems`: mission progress and generated audio.
- `public/models`: astronaut GLB and Opportunity rover GLB; other model folders are placeholders.
- `public/draco`: Draco decoder files.
- `public/audio` and `public/textures`: placeholder directories; no usable audio/texture files are supplied there.
- `docs/reference`: two reference PNGs; not wired into the runtime UI.
- Root configuration includes Vite, Tailwind, PostCSS, HTML entry, and `scripts/copy-draco.mjs`.

---

## 11. Scope

### In scope (current repository)
- Landing page and responsive site navigation.
- Moon/Mars Atlas with four currently playable mission entries.
- Four mission scenes, clue/artifact investigation, quizzes, completion, and optional post-completion roaming.
- Educational archive/dossiers, Opportunity timeline puzzle, achievements/progress, local settings, and About/credits surfaces.

### Not implemented in the repository
These are observations about current code, not final product decisions:
- Accounts, cloud saves, backend/database, multiplayer, leaderboards, analytics, or content management.
- Touchscreen game controls, localization, classroom/teacher tools, or formal assessment/reporting.
- Published trailer (configuration is empty).
- Real Sojourner and Lunar Roving Vehicle GLB models.
- Separate Spirit rover GLB; it reuses the Opportunity model.
- Real astronaut idle animation; the code freezes a walk frame and applies procedural breathing.
- Supplied sound effects/music files; sound is synthesized.
- Complete model attribution/licensing information.

Whether any are intended roadmap items is **Requires Product Clarification**.

### Existing limitations and readiness
- README states browser testing has not been completed; Moon and Missions 02–04 are called out as new and untested.
- Touch screens may not be playable; no touch control scheme is present.
- Mission history facts and links need verification, as called out in source comments/README.
- Model author/source/license information is incomplete.
- The astronaut asset is large (approximately 14 MB per README).
- The trailer is unpublished/unconfigured; team names are placeholders.
- Some fallback and persistence errors are not surfaced to the user.

---

## 12. Assumptions and Dependencies

### Assumptions supported by code or repository documentation
- Users have a modern desktop/laptop browser with WebGL and keyboard/mouse support for gameplay.
- The game can use browser pointer lock and Web Audio after a user gesture.
- Local progress is acceptable for the current project stage; it is tied to a browser profile/device.
- NASA pages are intended as educational references, but the accuracy and completeness of citations have not been independently reviewed.

### Dependencies
- Browser support for WebGL, Web Audio, pointer lock, and `localStorage`.
- Static hosting that serves the SPA route fallback correctly for direct route loads (hosting configuration is not included).
- `postinstall` access to the installed Three.js Draco decoder when dependencies are installed.
- External Google Fonts availability for the preferred fonts; local/system fallbacks exist.
- Completed mission fact review and asset license/credit confirmation before public release.

Questions about audience, supported devices, offline expectations, analytics, hosting, content governance, and ownership are **Requires Product Clarification**.

---

## 13. Risks and Constraints

| Risk / constraint | Impact | Evidence or mitigation needed |
|---|---|---|
| Browser runtime unverified | Possible rendering, controls, or loading defects across missions | Execute a browser/device QA pass; README explicitly flags untested work. |
| Performance on lower-end devices | Large astronaut file, procedural terrain, shadows, and real-time 3D may affect responsiveness | Establish device profile and measurable frame/load budgets; profile before release. |
| Accessibility gap in 3D controls | Keyboard/mouse-only exploration excludes touch users and may not meet assistive-technology needs | Decide target conformance and provide an alternative interaction path if required. |
| Content accuracy and source quality | Incorrect or weakly sourced mission history could undermine educational trust | Fact-check all mission content, citations, dates, and uncertainty statements. |
| Missing asset credits/licenses | Attribution or usage rights may be unclear | Confirm rights and publish model author/source/license credits. |
| Local-only persistence | Progress is lost across browsers/devices and may fail in restricted storage contexts | Clarify whether portability is needed; surface storage failures if product requires. |
| External font/reference availability | Some resources may not load offline or under network restrictions | Decide offline support and assess local/self-hosting requirements. |
| Incomplete operational requirements | Hosting, support, analytics, privacy, and performance targets are not specified | Product/stakeholder decisions required before production acceptance. |

---

## 14. Future Enhancements

The repository contains no approved roadmap. The following are **suggestions only**, based on observed gaps:

1. Complete cross-browser, mission-by-mission QA, including WebGL fallback and direct-route hosting tests.
2. Fact-check mission narratives, use robust primary references, and add full model/source/license credits.
3. Optimize large GLB assets and define measurable loading/frame-rate budgets for target devices.
4. Evaluate touch/mobile controls and offer a non-3D or accessible equivalent if supported audiences require it.
5. Establish an accessibility target, then audit keyboard flow, screen-reader support, dialog focus management, reduced motion, contrast, and alternatives to visual-only information.
6. Decide whether local-only saves are sufficient or whether accounts/cloud synchronization are needed; assess privacy before adding telemetry.
7. Publish the trailer and replace the team-name placeholder if these are intended launch content.
8. Add automated unit/integration/e2e coverage and build/CI quality gates; no test or lint scripts are declared in the current package manifest.
9. Expand the educational activities, mission catalog, language support, or educator resources only after audience and learning objectives are clarified.

---

## Repository evidence index

Core evidence is in [App.jsx](./src/App.jsx), [Home.jsx](./src/pages/Home.jsx), [MissionAtlas.jsx](./src/pages/MissionAtlas.jsx), [Play.jsx](./src/pages/Play.jsx), [missions.js](./src/data/missions.js), [artifacts.js](./src/data/artifacts.js), [Timeline.jsx](./src/pages/Timeline.jsx), [Achievements.jsx](./src/pages/Achievements.jsx), [MissionProgress.js](./src/game/systems/MissionProgress.js), [Overlays.jsx](./src/game/components/Overlays.jsx), [MissionScene.jsx](./src/game/components/MissionScene.jsx), [README.md](./README.md), and [package.json](./package.json).
