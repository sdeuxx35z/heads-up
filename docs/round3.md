# Round 3 plan (2026-11-15)

Inputs: docs/research.md (metric definitions A1–A7, curriculum C, scenarios D1–D12), plus three hostile critic reports summarised below. Read docs/CONTEXT.md for the architecture and taste rules.

## Critic findings this round acts on
- **Coach:**
  - Ball-watchers earn stars (68 points without scanning).
  - The final pre-touch scan is unmeasured.
  - A head swing counts as a scan even when you see nothing; snap turns and waggles count too.
  - The free player is always behind you, and pressers mirror you, never tackle, and leave a hole in the shape.
  - Offside uses the highest defender instead of the deepest (rep.js uses Math.min; it must be max x of the second-last opponent).
  - Sideways passes are under-punished. There are no switch or third-man values, and shots ignore the keeper.
  - There is no receiving or body-shape skill.
  - The replay doesn't explain why.
- **VR critic:** foot skating, heading snaps, lockstep teams, a puck-like ball, and no kick or trap animations. Players and the ball are being fixed by the movement agent in players.js/world.js. The user's locomotion is fixed in main.js.
- **Retention critic:**
  - The career is one template, and progress doesn't require the skill.
  - Nothing unlocks and there's no CONTINUE.
  - The tutorial dead-ends.
  - The card doesn't say how to improve and auto-advances.
  - Juice is inverted (a tight pass gets groaned).
  - There are no long-term hooks.
  - The menu is a slide over a screensaver, so it should become a locker room hub.

## File ownership (no two agents touch the same file)
| Owner | Files |
|---|---|
| movement agent (running) | players.js, world.js, players.test.ts |
| scan-metrics agent (S1) | rep.js, eval.js, rep.test.ts (new) |
| scenarios agent (S2) | drills.js, scenarios.js (new), quiz.js, drills.test.ts |
| locker agent (L) | locker.js (new), stadium.js |
| lead (me) | main.js, screens.js, config.js, store.js, ui.js, audio.js, index.html |

## Contract between S1 and S2
- S2's scenarios are classes that `extend Rep` (like RondoDrill). They customise a rep through a hook that S1 adds: `Rep.start()` must call `this.setupScenario?.()` after all players, the ball, pressers, the free mate and the chain are placed, and before `state = 'buildup'`.
- S1 must keep these fields with the same meaning: `world, role, roleKey, diff, F, home, away, mates, opps, userIdx, userBody, carrier, free, pressers, passesLeft, hold, receiver, finalStruck, state, t, scans, events, frames, pending, aimed, options, chosen, result, snapshot, quizWanted, motion, fx`, and the methods `start, update, nextPass, onArrive, enterDecide, endQuiz, takeSnapshot, trackScan, aim, select, execute, lose, finish, record, ballAt, nearestOpp`.
- S1 adds the overridable hooks `scenarioValue(option)` (an extra bonus or malus on an evaluated option; default 0) and `scenarioResult(result)` (lets a scenario add fields; default no-op).
- New result fields from S1, which S2 must keep when it builds results: `timing` (0–100 or null), `badScans`, `critical` ('prime' | 'critical' | 'late' | 'none' | null when not scorable), `info` (0–100), `body` ('HALF-TURN' | 'OPEN' | 'CLOSED'), `scanRate10` (scans per 10 s), `par`, `decisionSpeed` (s), `bestNumber` (shirt number of the best option, or 'SHOT'), `reason` (one short fact string such as 'LANE 2.4 M OPEN' or 'PRESSER 1.2 M').
- `world.snapTurned` (set by main.js on a snap turn) must reset the scan anchor so the turn is never counted as a scan. S1 clears it after reading.
- Game speed: `opts.speed` (0.5–1.2, default 1) scales passing speeds, presser speed and the windows.

## Lead's part: learning career and integration
- **Career:** 4 stages × 6 = 24 lessons, following research C plus the retention critic's stage themes: SEE → JUDGE → REMEMBER → FINISH.
  - Each lesson has one new skill, a drill or scenario, a named objective metric, and a pass mark. Passing the objective unlocks the next lesson. Stars are for mastery.
  - Stage exams unlock Practice options (drills, positions) and a cosmetic.
- **Home:** CONTINUE (next lesson), a daily drill (date-seeded, streak counter), NEW BEST facts, a weak-spot session, and a rating from 0 to 99.
- **Card:** no auto-advance. Name the best pass by shirt number with one reason, show the new metrics, cheer tight passes, add haptics on scans and clean passes, show the needed score mark, and stagger the star reveal.
- **Locker room:** mount Panels onto the locker's boards. CONTINUE is the tunnel door.
