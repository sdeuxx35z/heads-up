# Heads Up research, round 2 (2026-11-15)

Tags: **[S]** sourced, URL in E. **[D]** design default chosen here, tune in playtest. Attack direction is +x. Copy stays labels and facts.

## A. Definitions and benchmark numbers

**A1 Scan.** [S] An active head movement that turns the face temporarily away from the ball, to gather information for the next action (Jordet 2020). Eye-tracking of 869 scans (Aksum 2021): mean 0.40 s, median 0.34 s, 90% between 0.02 and 0.66 s; 0.45 s with the ball in the air vs 0.38 s on the ground; 2.3% contain a fixation. [D] Keep the rep.js detector (58 deg on, 35 deg off, 40 deg from anchor, min 0.18 s). Log per scan: start, peak time, peak yaw, side, duration, ball state, overlapped touches.

**A2 Scan rate.** [S] Count scans in the 10 s before reception; if possession was won inside the window it starts there; set plays start 2 s before the ball is in play (Jordet 2020). Normalise to scans per 10 s and ignore windows under 3 s.

| Benchmark | /s | /10 s |
|---|---|---|
| Jordet's bands: little / some / much | 0-0.20 / 0.21-0.40 / 0.41-1.80 | 0-2 / 2-4 / 4-18 |
| One PL club, 9,574 possessions | 0.44 | 3.0 |
| Be Your Best (BYB) user average | 0.36 | 3.6 |
| Lampard 0.62, Gerrard 0.61, Xavi about 0.83 | 0.6-0.8 | 6-8 |

[S] Jordet calls over 0.50 "very high"; Wenger and Fabregas say very good players scan 6-8 times per 10 s, normal ones 3-4. By position (Jordet 2020 Fig. 2, read off the chart, about +/-0.03): CM 0.52, CB 0.44, wing 0.41, full-back 0.35, forward 0.29. By zone: above 0.6 around their own box, under 0.3 in the attacking third. By pressure: lowest with the nearest opponent at 0-1 m, flat from 4 m. By action: pass 0.45, dribble 0.39, receive only 0.35, shot 0.27. Possession kept 0.46 vs lost 0.37. No published GK or CDM/CAM numbers. The effect is small but positive (Jordet 2020); Sky reports pass completion of 64 / 68 / 81% across scan groups (2013 study).
[D] Par per 10 s: CM, CDM 5; CB 4.5; W, CAM 4; FB 3.5; ST 3; GK as CB. Elite = par + 2, capped at 8.

**A3 Scan timing.** [S] Jordet's rule: eyes on the ball whenever a teammate touches it; look away between touches and immediately after one. BYB Scan Timing Score = good scans / all scans (user average 64%); a scan is bad if a pass is played or received during it. [D] Touch event = every kick and every reception by any player on the user's team, plus the user's own. A scan is BAD if it overlaps [touch - 0.10 s, touch + 0.15 s]. Opponent touches do not count.

**A4 Critical scan.** BYB's own term, in their metrics page, BYBCAT sheet, blog and a Right to Dream case study. I found no paper or Jordet publication using it; Jordet counts every scan in the 10 s window and never isolates the last one. [S] BYB's definition: "a scan that is made as the ball is travelling towards you". Critical Scan Score = critical scans / all ball receivals (user average 18%). BYBCAT counts scans made while the ball travels toward the player. Their scanning page says the last such scan. A blog adds a final check about 0.5 s before reception, uncited. Right to Dream figures (+21% vs +3% control, n = 6) are company-reported.
[D] Per receival of a teammate pass with flight of 0.9 s or more (shorter ones leave the denominator):
- CRITICAL = at least one scan with start >= release + 0.15 s and end <= arrival - 0.25 s.
- PRIME = a critical scan whose peak lands 0.35-0.80 s before arrival, centred on BYB's 0.5 s.
- LATE EYES = any scan overlapping the last 0.25 s. It cancels CRITICAL for that receival.
- Score = critical / scorable receivals. Grade bands: 50% good, 70% elite.

**A5 Scan quality.** [S] Scans pick up colour, movement and space, not detail; players see more opponents than teammates (Aksum 2021). BYB: find where pressure comes from, find open space, weigh risk. Jordet: frequency alone misleads, timing and perception matter. [D] INFORMATION 0-100 at first touch:
- 35: nearest presser inside 48 deg of gaze within 1.5 s of touch (code uses 2.5 s, and 4 s for the free player).
- 30: best exit teammate seen within 1.5 s.
- 20: blind side (more than 120 deg off facing) seen within the last 3 s.
- 15: both sides scanned in the window.
SYMMETRY = mean side, -1 left to +1 right (BYB); 0 is not always optimal.

**A6 Body shape.** [S] BYB: set the hips for the widest view before the ball arrives. FIFA Training Centre: open posture, half-turn on the back foot, see at least three corners of the grid. Pressure strongly changes body orientation (Pokolm 2022). [D] There is no hip tracking, so facing = head yaw smoothed over 0.5 s before first touch. Let a = angle between facing and the passer, g = angle between facing and the attack direction.
- HALF-TURN (100): a 40-70 deg toward the open side and g <= 90.
- OPEN (70): a >= 30 and g <= 90.
- CLOSED (30): a < 20 (square on to the ball) or g > 110 (back to goal).

**A7 Decision, awareness, composite.** [S] Decision: experts rank every option, best = 100%, user average 45%. Pass Progression = opponents between ball and goal before the pass (B) minus after (A). Awareness = % correct on tests (shirt colours; hidden silhouettes labelled from memory), average 55%. Inhibition: an audio cue mid-action withholds the pass and slows time; metrics are correct, false pass, repeated, average delay. BYB IQ = mean(scan rate, timing, critical, awareness, decision) x Difficulty Factor 0.1-1.45, set by game speed (50-120%), mode and score count.

## B. Prioritised feature list

**BYB inventory, for parity.**
- Modes: Bootcamp (required first; scan rate, timing, awareness, passing basics, decision; unlocks features and metrics). Practice (800+ pro-based scenarios; choose position, speed, count; exact position since Aug 2025). Challenges (weekly, medals, per-challenge boards, some locked behind Career; monthly real-story challenge; False 9 and inverted full-back concepts). Career (Bronze to Champions League, rating, relegation risk, speed and targets rise). MatchPlay (11v11 AI, request the ball, tackle; multiplayer coming).
- Tools: replay from any angle, slowed, bird's-eye; in-game audio and visual feedback; stats hub; 3 PIN profiles; Excel team reports; casting; companion app with boards; club portal. Hand signals can be traps.

**Rival mechanics worth borrowing (no names or branding).**
- Rezzil: colour-called balls with rising pace, timed finishing rounds, a multi-mode pentathlon, a league of curated levels, coach-built drills. Index drill names Pressure Pass, Rondo Scan, Shoulder Sums came from a search snippet; mechanics unverified.
- CleanSheet: endless wave mode with rising speed, set-play anticipation with feedback, a custom drill creator, AI-recommended drills, trophy-room achievements.
- Sense Arena (hockey): goalie program of 3 focus areas x 8 levels x 3 days, 6-8 drills of 8-10 min, easy/medium/hard; a skater series built on scanning, anticipation and decisions.
- SensiBallVR: 96-day plan (one stimulus, dual-task, both feet, tactics) with re-tests at days 1, 24, 48, 72, 96; peripheral colour targets while the ball travels; a 400 ms pass-or-shoot window.
- Reflexion: a virtual coach picks drills by position; streak feedback.
- Beyond Sport: coach-authored first-person scenarios from real data; Arsenal's 2017 trial hit motion sickness.
- Evidence: 8 weeks of VR beat video on passing decisions (n = 26).

**MUST**
1. Scan Timing score and bad-scan marking, with touch events logged (A3).
2. Critical scan per receival, plus LATE EYES (A4). Pass flights must reach 1.2 s or more on the lessons that test it.
3. Scans per 10 s against role par replaces raw counts (A2). The current scanTarget values of 2-4 over a variable buildup are not tied to any measured rate.
4. INFORMATION score replaces count as the main scan component (A5).
5. Body-shape grade at first touch (A6).
6. Replay timeline from above: scan arcs, touch pings, green or red timing.
7. Lesson-gated curriculum that introduces one metric at a time (C).
8. Rank-based Decision score and Pass Progression.
9. Game speed scalar 50-120% as a difficulty lever.

**SHOULD**
10. Scan Symmetry.
11. Awareness variants: shirt colours, silhouette recall, pattern recognition.
12. Inhibition test (D8).
13. Local medals and personal bests per challenge, weekly rotation.
14. Per-role start; GK build-up and box-defending reps.
15. Rating with a Difficulty Factor and a session report.
16. Wave mode, speed rises until the first loss.

**NICE**
17. Ghost scan trace of a par or elite scanner over the replay.
18. Coach CSV export.
19. Global boards (needs a backend).
20. Open match mode; multiplayer.
21. Custom scenario builder.

## C. Learning career curriculum

Coaching order [S]: awareness that scanning exists, then frequency (verbal cues raise pre-reception scans about 30%; a 30-min block 1-2 times a week for 5 weeks took scans per situation from 0.88 to 1.44, not significant against control), then timing, then what to look for, then body shape, then forward or switch, then third-man runs, then pressure. Jordet says doubling frequency is easy, perception takes longer. Formats: rondo ladder 4v1, 3v1 moving, 5v2, 2v2+2, 4v4+3; 4v4+3 with neutrals between lines; 4v4 with six small goals; the Aksum drill (shoulder check, one-touch to the runner, then 2v2); end-zone or gate games drew more scans than a plain small-sided game (10.1 s vs 11.3 s per scan, n = 7); colour-call warm-ups.

| # | Lesson | Drill | Pass mark |
|---|---|---|---|
| 1 | Look away | Single pass, no presser, 5 reps | 2 or more scans per 10 s in 3 of 5 reps |
| 2 | Rate | RondoDrill 5v2 | scans per 10 s at role par |
| 3 | Timing | Triangle passing, touch pings on | Timing 70% or more, under 1 bad scan per rep |
| 4 | Critical scan | Long diagonal, 1.2-1.8 s flight | Critical 60% or more, LATE EYES 0 |
| 5 | What to look for | Blind-side presser rep plus blackout quiz | INFORMATION 70 or more, awareness 70% or more |
| 6 | Body shape | Receive-and-turn (D6) | HALF-TURN or OPEN on 75% of receivals |
| 7 | Forward or switch | D2, D11 | Pass Progression above 0, decision 70% or more |
| 8 | Third man | D3 | Runner seen and used on 50% of reps |
| 9 | Pressure | Two pressers, speed 80 to 100%, D8 | Rating 70 or more at 100% with timing 70% and critical 50% |
| 10 | Match exam | 12 mixed reps at 110% | Composite against par; promotes the stage |

Lessons 1-4 need two passes at the mark to unlock the next; 5-10 run alongside role reps.

## D. Scenarios

| # | Setup | Must notice | Correct logic | Score |
|---|---|---|---|---|
| D1 Blind-side press (CM) | CB pass, 1.3 s flight; presser 7 m behind-left closing at 5.4-7.5 m/s; right-back free rear-right | Presser side and distance | Presser under 3.5 m at arrival: one-touch to the free player. Else half-turn away, play forward | INFORMATION, critical, touch side, decision rank |
| D2 Weak-side switch (FB, W) | 3 opponents on the ball side; far winger free 35 m away, 1.8 s flight | Far-side space | Switch if lane margin is 1.5 m or more, else recycle to CM | Both-sides scan, Pass Progression 0 or more, switch distance bonus |
| D3 Third-man wall (CAM, ST) | CB passes to user; marker behind; CM runs beyond the marker; direct CB to CM lane blocked | Runner starts during the ball's flight | One-touch lay-off into the runner's path, not to feet | Runner seen in flight, touch within 0.6 s, pass lands within 2 m of the path |
| D4 Hand-signal trap | Covered teammate waves, opponent 1.5 m away; a quiet teammate is free | Wave versus real space | Ignore the wave | Decision rank; the waver scores 0 |
| D5 Colour call | Three bibs; a colour is called while the ball is in flight | All three positions | First-time pass to the called colour | Correct within 1.0 s of arrival, scans in flight |
| D6 Receive-and-turn (CDM) | Back to goal, presser 4 m behind, free mid 10 m ahead | Presser behind (shoulder scan over 100 deg) | Half-turn on the back foot, touch forward and away. No scan: one-touch back | Shoulder scan, A6 grade, touch direction |
| D7 GK build-up | Two pressers jump when CB receives; third option is long | Which CB is pressed | Pass to the unpressed side, or go long if both are pressed | Scan before kick, Pass Progression |
| D8 Inhibition | User aims at a free teammate; 0.4-0.9 s later a tone sounds and an opponent steps into the lane; time slows | Lane closing | Switch within 0.8 s; do not repeat | BYBCAT categories, average delay |
| D9 Rondo quota | 5v2 or 6v2, two touches | Gaps between touches | Scan in the gaps | Timing 70% or more, rate at par; passes under 0.9 s skip critical |
| D10 Box defending (CB, FB) | Winger's heavy touch leaves the ball 3-4 m from his feet; three attackers arrive | Back-post runner | Scan during the gap, then close down | All 3 located; a scan at the strike is BAD |
| D11 Line steps up (W, ST) | Opposing full-back steps up, space behind | Line height and gap | Through ball within 1 s, else dribble inside | Pass Progression 2 or more, weight inside 1.5 m of the run |
| D12 Sandwich | Pressers close from both sides, one lane between them | Both pressers | One-touch back to CB | INFORMATION presser 35, one-touch, possession kept |

## E. Sources

Science
- Jordet 2020, PL scanning study: https://pmc.ncbi.nlm.nih.gov/articles/PMC7573254 (Fig. 2: https://cdn.ncbi.nlm.nih.gov/pmc/blobs/d00d/7573254/0a83fdad68b4/fpsyg-11-553813-g002.jpg)
- Jordet 2013, Sloan: https://www.sloansportsconference.com/research-papers/the-hidden-foundation-of-field-vision-in-english-premier-league-epl-soccer-players
- Sky Sports (0.62 / 0.61 / 0.83, 64 / 68 / 81%): https://www.skysports.com/football/news/11096/11119387/what-gave-xavi-hernandez-and-andrea-pirlo-an-edge-on-the-rest-the-secret-to-his-vision
- Mojo (bands, Wenger, Fabregas): https://mojo.sport/coachs-corner/what-is-scanning
- Jordet on timing: http://archive.trainingground.guru/articles/geir-jordet-why-scanning-is-about-more-than-just-frequency
- Aksum 2021: https://pmc.ncbi.nlm.nih.gov/articles/PMC8378692
- Pokolm 2022: https://research.vu.nl/en/publications/modeling-players-scanning-activity-in-football/
- Hintermann 2025, Heads Up Girls: https://pmc.ncbi.nlm.nih.gov/articles/PMC12245709/
- Verbal cue study: https://www.ehsm.admin.ch/en/scanning-in-football-the-more-frequent-the-more-successful
- FIFA TC, scanning drill: http://www.fifatrainingcentre.com/en/environment/science-explained/high-performance/play/karl-aksum-scanning.php
- FIFA TC, Peacock session: https://www.fifatrainingcentre.com/en/practice/elite-sessions/in-possession/john-peacock-passing-and-receiving.php
- Small-sided conditions: https://eprints.chi.ac.uk/id/eprint/8276/
- Third-man progressions: https://www.sportsessionplanner.com/s/CA0X/Third-man-run.html
- Rondo ladder: https://www.sportsessionplanner.com/s/5qbTh/YSC_Rondos.html
- VR vs video: https://doi.org/10.1371/journal.pone.0230042

Be Your Best
- Metrics: https://beyourbest.com/metrics-definitions
- BYBCAT: https://beyourbest.com/bybcat-metrics-definitions
- Scanning: https://beyourbest.com/scanning-metrics
- User hub: https://beyourbest.com/user-hub
- 0.5 s claim: https://beyourbest.com/insight/how-to-beat-the-press-the-habits-of-elite-midfielders
- Career: https://beyourbest.com/career
- Challenges: https://beyourbest.com/insight/new-challenges-training-mode-released
- Practice: https://beyourbest.com/practice
- MatchPlay: https://beyourbest.com/matchplay
- Companion: https://beyourbest.com/companion-app
- Aug 2025 update: https://beyourbest.com/insight/be-your-best-vr-update-aug-2025
- Right to Dream: https://beyourbest.com/insight/how-vr-training-improved-scanning-at-right-to-dream
- Gameplay: https://beyourbest.com/insight/be-your-best-the-vr-football-game-to-make-you-a-better-player
- Box defending: https://www.beyourbest.com/story/4-tips-on-how-to-scan-when-defending-the-box

Rivals
- Rezzil: https://store.steampowered.com/app/1370130/Rezzil_Player_21/ and https://rezzil.com/wp-content/uploads/2020/07/rezzil-strategic-partner.pdf
- CleanSheet: https://uploadvr.com/cleansheet-soccer-football-vr-goalkeeper-app and https://uploadvr.com/goalkeeping-sim-cleansheet-soccer-2-kicks-off-on-playstation-vr2/
- Sense Arena: https://hockey.sensearena.com/resources/off-ice-drills/cognitive-drills/how-progressive-training-works-article
- SensiBallVR: https://sensiballvr.com/platform/cognitive-training/
- Reflexion: https://reflexion.co/reflexion-go-vr-soccer-training/
- Beyond Sport: https://thenextweb.com/news/vr-brain-training-football-cognitive-skills

Gaps: Fig. 2 values read by eye; BYB's 0.5 s is uncited and its own pages disagree (0.4-0.6/s vs 6-8 per 10 s); vendor results are company-reported.
