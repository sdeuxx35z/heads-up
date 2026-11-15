# Heads Up — context for agents

Heads Up is a free WebXR soccer **scanning trainer** for Meta Quest 3. It's an original take on the paid Quest app "Be Your Best": you stand in a match as one player, the ball is worked around, head tracking counts your scans (looking away from the ball to gather information), then you point a controller and pull the trigger to pass or shoot.

- Live at https://sdeuxx35z.github.io/heads-up/ (opened in the Quest browser, then a tap enters VR).
- Repo: ~/lookup. Vanilla three.js 0.170, bundled with Bun.
  - `bun build.ts` builds to dist/.
  - `bun server.ts` serves the dev build on :7820.
  - `bun test` runs src/*.test.ts.
- The owner, Sammy, plays it on a Quest 3 standing up. He has confirmed VR works.

## Files
- `main.js`: the App class. Renderer/XR setup, input (controllers, thumbstick run/sprint on the left stick, snap turn on the right, WASD on desktop), screens and flow (menu → session → rep → card → replay → summary), tutorial, quiz flow, replay, attack-direction markers, vignette.
  - Test hook: `app.frame(dt)` / `app.step(sec)` advance the game without a visible window (rAF stalls when the preview pane is hidden).
- `rep.js`: the `Rep` class, one "match situation" repetition. Its states are `buildup → incoming → (quiz) → decide → outcome → done`. It covers formations, pressers in the blind spot, a free teammate behind, scan tracking (`trackScan`), `aim()/select()/execute()`, scoring in `finish()`, and replay `frames`/`events`.
- `drills.js`: `RondoDrill` (5v2) and `AwarenessDrill` (a colour cue flashes behind you, and you're asked about it later). Both extend Rep. `DRILLS`, `DRILL_NAMES`.
- `eval.js`: pass/shot option scoring (lane margins, space, progression, lines broken, keeper weights, rondo).
- `world.js`: the World. Player sets, ball, viewer placement (`placeUser`, `moveUser`, `userPos`, `headYaw`), replay overlays.
- `players.js`: the Player capsule-humanoid (procedural run animation, celebrate/dejected moods) and the Ball.
- `stadium.js`: night stadium, pitch texture, stands with an instanced crowd, floodlights, boards.
- `ui.js`: Panel (canvas-2D drawn onto a plane, glassmorphism kit: bg/text/button/hit/card), Pointer raycasts.
- `screens.js`: home, career, practice, stats, settings, pause, repCard, summary.
- `quiz.js`: blackout memory quizzes (nearest opponent on a map, count within 10 m, who had most space, cue colour).
- `audio.js`: all synthesised sound (crowd, chants, applause, kicks panned by position, footsteps, whistle, scan tick).
- `store.js`: localStorage profiles, career stars, sessions, settings.
- `config.js`: pitch, kits, formations, ROLES (CB FB CDM CM CAM W ST GK), DIFFICULTY, CAREER (24 levels), UI colours.

## Taste rules (Sammy rejects "AI-looking" work)
- No blue or purple gradients or glows. No subheader lines (grey description text under headings, kickers or eyebrows, section labels). No fake 3D bevels. No talking-to-the-player copy. Labels and facts only, like "SCANS 2 / 3", not "Great job! Try to scan more".
- Glassmorphism UI: smoked neutral glass, kit orange #ff7a1a as the accent, Barlow Condensed type.
- Learn by doing: no text walls. The first 60 seconds decide whether a player stays.
- Quest 3 performance matters: keep draw calls and per-frame allocations low, and don't re-upload canvas textures every frame.
