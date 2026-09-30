---
format: 1920x1080
duration: 204s
message: "RoundOne's NVIDIA Nemotron agent on Nebius checks every hackathon project, so human judges can focus on the ideas."
arc: Hook → Problem → Reveal → Mechanism (intake, agent, stack) → Humans decide → Audit → Rounds to winners → Tour of the app (setup → the agent → judging → results) → CTA
audience: Companies and DevRel teams that run hackathons, and the organizers and judges who run them
mode: autonomous
music: none
bpm: 120
beat_grid: "4/4 at 120 BPM — beat 0.5s, bar 2s; every frame starts on a bar line"
---

# RoundOne launch film — storyboard

Built silent, then scored: the user's track and an ElevenLabs voiceover ride on top (kit/add-overlays.mjs, kit/carve-music.mjs). Frames 1–12 are the story (0:00–1:06); frames 13–30 are the app tour (1:06–3:24), narrated from VOICEOVER.md. Every frame starts on a bar line of a 120 BPM grid so music can be laid in later; hits land on beats.

## Video direction

- **Look:** `frame.md` — clean Notion-style product film (paper ground, floating white cards, big confident Geist Pixel headlines, generous margins) with a retro-arcade play layer (pixel icons, pixel cursor, segmented health-bar meters, 8-bit buttons, stepped sprite motion, pixel confetti, dither wipes). Violet = the agent, magenta = humans, everywhere.
- **Grounds by frame:** art (retro-footer — solid, no white fade) 1, 4, 12, 30 · paper 2, 3, 5, 6, 8, 9, 10, 11 and the tour frames 13–16, 18–29 · night 7, 17 (16 ends on night for the hand-off).
- **Motion grammar:** UI moves smoothly (`power3.out`, small rises); retro elements move in steps. Reveals land on the beat grid (0.5s beats, eighths allowed for pickups) and keep arriving across the whole frame; the last beat of each frame is a readable hold. No bounce on UI, no lazy breathing, no drift on content (the art backdrops may creep in scale very slightly).
- **Headline position (paper frames):** a consistent title band — eyebrow at x=120, y≈104; headline top at y≈140. Frame 8 centers its headline. Art/night frames center their type.
- **Held beats:** frame 4's lockup (last 2.5s), frame 8's split (last 1.5s) and frame 12's end card (last 2s) are deliberate holds.
- **Transitions (assembler-owned, not built in frames):** 1→2 push-slide UP (the sky scrolls away into the page) · 2→3, 8→9, 10→11 push-slide LEFT · 5→6, 9→10 zoom-through · 3→4, 4→5, 6→7, 7→8, 11→12 a **pixel-dither wipe**: an overlay covers the outgoing frame in night-purple Bayer tiles over its last 0.35s, then the incoming frame reveals itself from full night-purple tiles over its first 0.4s (frames 4, 5, 7, 8, 12 build that reveal themselves — see each block).
- **Negative list:** no "AI" purple-blue glow blobs or bokeh, no emoji, no invented metrics/testimonials, no scrollbars or browser chrome except the winners page's minimal header, no everything-at-once slide dumps, no floating screensaver motion.

## Tour direction (frames 13–30)

- **The real app, in a browser window.** `assets/tour-kit.js` (TK) puts a 1440×900 app screenshot (captured at 2×, `assets/tour/raw/`) in a window at x 240, y 196, scale 1 — so the app shows at its native size — with the landing tour's callouts (`assets/tour/shots.js`: ring + numbered dark card + connector). A camera pushes in on each callout as it lands, then rests. Rebuilt screens (the /new page, the not-started Progress page) go in the same window as HTML. The app's real emails (`assets/tour/email-*.png`, rendered from src/emails) sit in a TK mail window.
- **Reference implementation:** `compositions/frames/14-schema.html` — every tour frame follows its structure (paper ground clip, stage clip, `TK.window` + `TK.header`, build inside `TK.ready(root).then(…)`, register the timeline at the end of that callback).
- **Header band:** eyebrow `Chapter › Screen` + a Geist Pixel 58px title top-left, and a chapter stepper top-right — Setup · The agent · Judging · Results — with the current chapter filled. It rides on a paper fade the camera slides under.
- **Keep-out:** the app window may run off the bottom edge of the frame (a device-shot bleed); every piece of text the film adds (header, callout cards, film cards, tags) stays above y=900.
- **Chapters and wipes:** a pixel-dither wipe marks each chapter change — into 16 (The agent), 18 (back to paper), 20 (Judging), 26 (Results) and 30 (end card); the rest of the tour moves by push-slides LEFT (a page turn through the app) and zoom-throughs where a click leads somewhere (12→13, 20→21, 28→29).
- **Pacing:** camera moves 0.8–0.9s `power3.inOut`; callouts pop on beats; each frame ends on a readable hold. Frame lengths are whole bars (2s) so the music stays on the grid.

## Frame 1 — Hook

> Revised: the ground is now `assets/retro-footer.png` (solid neon-floor city) instead of `assets/retro-hero.png`, whose bottom third fades to white.

- scene: Night-sky pixel art; a question types in, then "Run a hackathon." slams in with three +pickup chips
- voiceover: ""
- duration: 4s
- transition_in: cut
- status: animated
- src: compositions/frames/01-hook.html
- type: hook
- persuasion: Direct address to the buyer's desire
- beat: curiosity → desire
- blueprint: typewriter-reveal (Adapt)
- asset_candidates: assets/retro-hero.png — landing hero pixel art, night sky over clouds (bottom third fades to white)
- focal: assets/retro-hero.png
- roles: retro-hero = background (full-bleed, not dimmed; a radial night scrim sits behind the type)
- sfx: none

narrativeRole: Speak to the person who runs hackathons, in their outcome language, before any problem.
keyMessage: Hackathons are how you get people building on your product.

**On-screen copy (render verbatim):**
- Line 1 (typed): `Want builders on your product?`
- Line 2 (slam): `Run a hackathon.`
- Chips: `+ Adoption` · `+ Use cases` · `+ Excitement`

**Build notes:**
- Ground: `assets/retro-hero.png` full-bleed (`object-fit: cover`), a creeping push 1.00→1.04 across the whole 4s (linear, on an inner wrapper). Over it, the landing's radial night scrim centered at 50% 34% (`radial-gradient(ellipse 50% 42% at 50% 34%, rgba(24,8,48,0.78), rgba(24,8,48,0.45) 55%, transparent 82%)`). The art's bottom ~35% is white clouds; keep all type above y=620 so it sits on the dark sky. The white bottom matters: the next frame pushes up from below like scrolling down the page.
- Five pixel sparkles in the sky (5×5 plus-shaped pixel stars, 6px squares, `#FFFFFF` and `#FCD34D`) at scattered points above y=500 and outside the text block; each switches on/off in steps on the beat grid (e.g. on at 0.5/1.5/2.5, off a quarter-beat later), different phase per sparkle.
- Line 1: Geist Pixel Square 84px, `on-dark`, centered horizontally, top at y≈190. Typed with `RK.type` (cps ≈ 56 so it completes by 0.55s) with the block caret. To keep a centered line from shifting while it types, stack a hidden full-text ghost and the typed span in the same CSS grid cell (`display:inline-grid`, both children `grid-area:1/1`, ghost `visibility:hidden`, typed span left-aligned).
- Line 2: Geist Pixel Square 140px, `rk-sunset-text` with the landing hero glow (`filter: drop-shadow(0 2px 10px rgba(24,8,48,.85)) drop-shadow(0 0 2px rgba(24,8,48,.6))`), centered, top at y≈320.
- Chips: a centered row at y≈520, 20px gaps. Each is `rk-glass` but with a darker fill for contrast on the pink clouds (`background: rgba(21,12,46,0.55)`), 26px text, a 22px pixel icon first: coin → `+ Adoption`, code → `+ Use cases`, spark → `+ Excitement`.
- Put everything that shakes inside one stage wrapper (not the ground).

Scene 1 (0.0–1.0s): the sky is already there, pushing in; line 1 types from 0.0 and completes by 0.55s, caret blinking — the everyday question. Sparkles start blinking on the beat.
Scene 2 (1.0–2.0s): line 1 holds for reading; at 1.5s it eases up 60px and dims to 75% opacity (`power3.out`, 0.4s), making room.
Scene 3 (2.0–2.5s): on the downbeat of bar 2 (2.0s) `Run a hackathon.` slams in — scale 1.3→1 and opacity 0→1 in `steps(4)` over 0.16s, the kinetic-beat-slam feel — and `RK.shake` hits the stage wrapper at 2.0s (amp 10, 0.3s).
Scene 4 (2.5–4.0s): the three chips pop in on eighths at 2.5 / 2.75 / 3.0s with `RK.pop` plus a 16px rise, then everything holds still and readable to the end.

## Frame 2 — Building got cheap

- scene: A tidy 100-pixel grid gets dwarfed by a 1,000-pixel sunset flood; the math lands on 400 judge-hours
- voiceover: ""
- duration: 6s
- transition_in: push-slide UP 0.6s
- status: animated
- src: compositions/frames/02-flood.html
- type: pain_point
- persuasion: Statistical proof
- beat: tension
- blueprint: dataviz-countup (Adapt)
- asset_candidates:
- focal: the 40×25 sunset pixel field
- roles: typography + kit pixel fields only (no image assets)
- sfx: none

narrativeRole: Name the shift — AI multiplied the pile, the panel didn't grow.
keyMessage: Building got cheap. Judging didn't.

**On-screen copy (render verbatim):**
- Eyebrow: `THE NEW NORMAL`
- Headline A: `AI lets everyone build.`
- Headline B (replaces A): `Building got cheap.` / `Judging didn't.` (two lines; `Judging didn't.` in `rk-dusk-text`)
- Small grid label: `~100` and `hand-coded, before coding agents`
- Big field label: `1,000+` and `agent-assisted, now. Nearly all of them run.`
- Math: `1,000 projects × 3 judges × 8 min` then `before anyone clones a repo`
- Stat: `400` and `judge-hours`

**Build notes:**
- Ground: paper + `rk-dotgrid` (its own clip layer).
- Title band: eyebrow `rk-eyebrow` at (120, 104); headline Geist Pixel Square 92px ink, top y=140, max-width 1300. Headline B is two lines (y 140–340).
- Small grid: `RK.pixelField` 10×10, cell 20, gap 4, violet palette `["#C4B5FD","#A78BFA","#8B5CF6","#7C3AED"]`, placed at x=120, y=520 (≈236×236). Under it: `~100` Geist Pixel 56px ink at y=776, the caption `ui-sm` muted (max-width 300) under that.
- Big field: `RK.pixelField` 40×25, cell 18, gap 4, sunset palette `["#FCD34D","#FB923C","#F43F5E","#E11D8F","#A21CAF"]`, placed at x=420, y=400 (≈716×446). To its right at x=1180: `1,000+` Geist Pixel 72px in `rk-dusk-text` (top y=400), caption `ui-sm` muted max-width 520 beneath.
- Math block at x=1180, y≈600: mono 26px muted `1,000 projects × 3 judges × 8 min`, then mono 22px `faint` `before anyone clones a repo`, then `400` Geist Pixel 150px ink with `judge-hours` (ui 27px muted) baseline-aligned to its right. Everything ends above y=900.
- Reveal the fields with a stepped `clip-path: inset(0 X% 0 0)` tween on each svg (small grid: rows top→bottom in `steps(10)` via `inset(0 0 X% 0)`; big field: columns left→right in `steps(40)`).
- The frame pushes up from below during its first 0.6s (assembler); start reveals at ≥0.25s.

Scene 1 (0.0–1.5s): eyebrow at 0.25s, headline A rises in word by word on eighths from 0.5s (settled by 1.0s). The small violet grid fills row by row 0.5–1.4s while `~100` counts up with `RK.count` (0→100, steps 10) and its caption fades up at 1.0s.
Scene 2 (1.5–3.0s): on the beat at 1.5s the big sunset field floods in column by column (1.5–2.6s, `steps(40)`), dwarfing the small grid, while `1,000+` counts up (`RK.count` 0→1000, steps 20, suffix "+") and its caption lands at 2.5s.
Scene 3 (3.0–4.5s): at 3.0s headline A lifts out (0.25s) and headline B rises in — `Building got cheap.` then `Judging didn't.` on 3.25s. The math line types in with `RK.type` from 3.5s (mono, no caret after it completes); `before anyone clones a repo` fades up at 4.0s.
Scene 4 (4.5–6.0s): `400` counts up 0→400 (`RK.count`, steps 16, 4.5–5.0s) — a value-scaled beat in the counting-dynamic-scale spirit: it lands at 5.0s with a tiny stepped scale 1.08→1 — and `judge-hours` pops at 5.0s. Hold still to the end.

## Frame 3 — Buried in AI slop

- scene: The judge portal's queue scrolls forever, turns gray, and one bright project sinks under the pile
- voiceover: ""
- duration: 6s
- transition_in: push-slide LEFT 0.5s
- status: animated
- src: compositions/frames/03-buried.html
- type: pain_point
- persuasion: Pain agitation
- beat: overwhelm → frustration
- blueprint: overwhelm-surround (Adapt)
- asset_candidates:
- focal: the judge queue card (rebuilt JudgeQueue UI)
- roles: typography + rebuilt UI only (no image assets)
- sfx: none

narrativeRole: Make the viewer feel the judge on project forty — fatigue, sameness, the best idea lost.
keyMessage: Human creativity is getting buried in AI slop.

Adapt: keep the accumulation that closes in and swamps; the "surroundings" are an endless queue of look-alike projects, and the buried thing is one bright project, not the viewer's avatar.

**On-screen copy (render verbatim):**
- Headline A (two lines): `Tired judges.` / `Endless queues.`
- Headline B (replaces A, two lines): `Human creativity,` / `buried in AI slop.` — `Human creativity,` in `rk-dusk-text`
- Card copy (JudgeQueue, exact): header `Global AI Hackathon`, meter label `4/12`, avatar initials `GH`; eyebrow `ROUND 1 · DAY 2 OF 5`; title `Welcome, Grace`; line `4 of 12 done today, 8 to go. 36 more open over the coming days.`; button `Keep going →`; note `About 32 minutes · each score saves when you submit it`; list heading `Your projects today`; rows: `#118 Tidewatch 7.5 ✓`, `#042 Repo Whisperer 8.0 ✓`, `#207 Quiet Hours 6.5 ✓`, `#033 Pantry Pilot 7.0 ✓`, `#251 Signal Garden` (tag `next`), `#096 Loom Lens`
- Look-alike rows that stream in after them (texture): `#312 AI chat assistant`, `#318 AI chat assistant`, `#327 AI meeting notes`, `#341 AI chat assistant`, `#356 AI email writer`, `#362 AI chat assistant`, `#377 AI meeting notes`, `#389 AI chat assistant`, `#394 AI chat assistant`, `#408 AI email writer` (repeat the pattern as needed)

**Build notes:**
- Ground: paper + `rk-dotgrid`.
- Headline block on the left: x=120, top y=300, Geist Pixel Square 92px ink, max-width 820, two lines.
- Card on the right: `rk-mock`, x=1000, y=96, width 800, height 790, overflow hidden (the list scrolls inside it). Header strip (74px): `rk-mark` 44px "AI", `Global AI Hackathon` ui 600, right side a 12-segment `rk-meter` (160px wide) filled to 4, `4/12` Geist Pixel 22px, and a `rk-face rk-face--1` 44px "GH". Body padding 40px: eyebrow, `Welcome, Grace` Geist Pixel 56px, the line (ui-sm muted), a row with `rk-pill rk-pill--dark` (24px) `Keep going →` (arrow as the pixel arrow-right icon) and the note (ui-sm faint), then `Your projects today` (ui 600) and the list. Rows: 64px tall, 1px `line-soft` border, 14px radius, 12px gap; mono `faint` number, name (ui), then a pass-green pixel check + score in Geist Pixel. `#251 Signal Garden` has a 2px violet border, a `0 0 0 5px #EDE5FF` ring and an `rk-tag rk-tag--agent` `next`.
- Look-alike rows use the same row style but every color gray: name in `faint`, no score, a neutral tag `AI` — the sameness is the point.
- The list is one tall column inside a mask; scrolling = translating the column up (a single `y` tween with an accelerating ease, `power2.in`), never height tweens.
- A pixel cursor (`RK.cursor`) rests near `Keep going →` early, then drifts down with the list.
- Headline swap: A lifts out (0.25s) as B rises in.

Scene 1 (0.0–1.5s): the card rises into place (0.25s, `power3.out`); headline A lands on beats — `Tired judges.` at 0.5s, `Endless queues.` at 1.0s. The cursor glides in and settles on `Keep going →` by 1.25s.
Scene 2 (1.5–3.5s): on 1.5s the list starts scrolling up and accelerates; the six real rows pass and the look-alike gray rows keep streaming in, faster and faster. `#251 Signal Garden` (the one bright row) rides up, then gets overtaken: from 2.5s the gray rows slide in above it and it is pushed down the stack. The meter drains segment by segment from 4 to 1 (`RK.fillMeter` 2.0–3.4s) like a health bar running out.
Scene 3 (3.5–6.0s): at 3.5s headline A lifts out and headline B rises in (`Human creativity,` then `buried in AI slop.` on 4.0s). Signal Garden's row, now low in the card, dims to 35% and a gray row covers it at 4.5s — buried. Everything settles; hold to the end.

## Frame 4 — ROUND 1

> Revised: the ground is now `assets/retro-footer.png` (solid neon-floor city) instead of `assets/retro-hero.png`, whose bottom third fades to white.

- scene: Arcade "ROUND 1" slams onto the pixel sky, condenses into the R1 logo, and the promise lands
- voiceover: ""
- duration: 6s
- transition_in: cut
- status: animated
- src: compositions/frames/04-round-one.html
- type: product_intro
- persuasion: Pattern interrupt, then the brand promise
- beat: excitement → clarity
- blueprint: compose
- asset_candidates: assets/retro-hero.png — landing hero pixel art sky; assets/roundone-r1-logo.png — RoundOne R1 app-icon logo
- focal: assets/roundone-r1-logo.png
- roles: retro-hero = background (full-bleed; the night scrim behind the type) · roundone-r1-logo = cutout (the lockup mark)
- sfx: none

narrativeRole: The drop. The product name is an arcade callout — play it, then turn it into the brand and its promise.
keyMessage: Agents check the code. Humans judge the idea.

**On-screen copy (render verbatim):**
- Slam: `ROUND 1`
- Lockup wordmark: `RoundOne`
- Headline line 1: `Agents check the code.`
- Headline line 2: `Humans judge the idea.` (in `rk-sunset-text` with the hero glow)
- Pill: `Open source · Self-hosted` (with the pixel lock icon)

**Build notes:**
- Layers bottom→top: (1) ground clip: `assets/retro-hero.png` full-bleed with the landing night scrim, creeping push 1.00→1.04 over 6s; (2) a full-bleed `<canvas width=1920 height=1080>` running `RK.dither(clock, canvas, {start: 0, dur: 0.4, mode: "reveal", color: "#150C2E", angle: "center"})` — the frame opens fully covered in night-purple tiles (matching the wipe that covered the previous frame) and the tiles clear from the center out; (3) the stage with all type, above the tiles.
- `ROUND 1`: Geist Pixel Square ~230px, sunset gradient face, with a chunky 3D extrusion behind it built per the 3d-text-depth-layers recipe (6 stacked copies offset 5px right + 5px down each, colors stepping `#E11D8F` → `#7A1655` → `#2E1658` → `#150C2E`), centered at y≈430. Build it from per-letter inline-blocks with a fixed advance (≈0.62em each, text-align center inside each) so the letters can move without measuring: R O U N D ␠ 1.
- The condense (a card-morph-anchor style handoff): O U N D and the space collapse (`scaleX` 1→0, `steps(3)`) while R slides right and 1 slides left by the same number of advances until they meet centered as `R1`; then the `R1` group scales down and flies up to the logo's position while `assets/roundone-r1-logo.png` (148px, radius 32px) pops in there and the text fades out under it.
- Lockup: logo + `RoundOne` (Geist Sans 700, 76px, `on-dark`), 28px gap, the pair centered, top y≈150.
- Headline: Geist Pixel Square 104px, centered, lines at top y≈380 and y≈500. Line 2 sunset gradient + glow.
- Pill: `rk-glass` with a darker fill (`rgba(21,12,46,0.55)`), centered at y≈660, pixel lock icon 22px.
- Keep a few pixel sparkles (as in frame 1) blinking on beats in the upper sky.

Scene 1 (0.0–1.5s): tiles clear 0.0–0.4s. `ROUND 1` slams exactly on the downbeat (0.0s): scale 1.7→1, opacity 0→1, `steps(4)` over 0.2s; `RK.shake` on the stage wrapper at 0.2s (amp 16, 0.35s). It holds, big and loud, for a beat and a half.
Scene 2 (1.5–2.0s): the condense — on 1.5s the middle letters collapse and R/1 slide together (0.25s, stepped); on 1.75s `R1` shrinks and flies up to the lockup spot (`power3.inOut`, 0.25s).
Scene 3 (2.0–3.5s): on 2.0s the logo pops (`RK.pop`) exactly where `R1` arrived and `RoundOne` wipes in to its right (clip reveal left→right, 0.3s). `Agents check the code.` rises in on 2.5s; `Humans judge the idea.` on 3.0s.
Scene 4 (3.5–6.0s): the pill rises in on 3.5s. Then a deliberate hold — the promise reads still (only the sparkles blink).

## Frame 5 — Shaped to your rubric

- scene: Submission fields snap into a schema card, criteria stack up beside it, and dusk connectors wire fields to what they're judged on
- voiceover: ""
- duration: 6s
- transition_in: cut
- status: animated
- src: compositions/frames/05-intake.html
- type: feature_showcase
- persuasion: Show-don't-tell proof of structure
- beat: clarity → control
- blueprint: grid-card-assemble (Adapt)
- asset_candidates:
- focal: the two setup cards (Schema and Criteria) and the connectors between them
- roles: rebuilt UI only (no image assets)
- sfx: none

narrativeRole: Show the intake: projects arrive in the organizer's own schema, and every field feeds a criterion.
keyMessage: Projects come in shaped to your rubric.

Adapt: keep the staggered self-assembly of rows into two lists; the payoff is the connectors that draw between them, then the agent/judges tags.

**On-screen copy (render verbatim):**
- Eyebrow: `SETUP`
- Headline (two lines): `Projects come in` / `shaped to your rubric.` — `your rubric.` in `rk-dusk-text`
- Schema card: header `Setup › Schema` + tags `Form` and `Intake API`; rows (icon · name · type chip): `text` · `Project name` · `Text`; `paragraph` · `Pitch` · `Long text`; `branch` · `Repo` · `Repo`; `play` · `Demo video` · `Video`; `link` · `Live demo` · `URL`; `users` · `Team` · `Team`
- Criteria card: header `Setup › Criteria`; rows: `Quality of the idea` `25%` chip `Human only` → tag `Judges`; `Technological implementation` `25%` chips `Sandbox run` `Code scraper` → tag `Agent`; `Uses an NVIDIA open model` tag `must pass` chip `Code scraper` → tag `Agent`; `Demo video, 3 minutes or less` tag `must pass` chip `Video reviewer` → tag `Agent`

**Build notes:**
- Layers: ground clip (paper + `rk-dotgrid`) → stage (cards, connectors, headline) → a full-bleed canvas ON TOP running `RK.dither(clock, canvas, {start: 0, dur: 0.4, mode: "reveal", color: "#150C2E", angle: "diagonal"})` (the frame opens under night-purple tiles; start content at ≥0.25s).
- Title band: eyebrow (120, 104), headline Geist Pixel 84px ink, top y=140, two lines.
- Schema card: `rk-mock` x=120, y=380, width 620; header row (title ui 600 + the two tags `rk-tag--neutral` right). Rows 66px: `rk-tile` 44px with the pixel icon, name (ui), type chip right (`rk-tag--neutral`). A 6px grip dots column at the far left of each row (the pixel `grip` icon, `faint`) for the Notion block feel.
- Criteria card: `rk-mock` x=1000, y=380, width 800. Rows 104px: title (ui 600) + weight in Geist Pixel 20px `faint` or a `rk-tag--gate` `must pass`; mechanism chips beneath (small `rk-tag--neutral` with pixel icons: gear = Sandbox run, search = Code scraper, play = Video reviewer, user = Human only); the side tag on the right (`rk-tag--agent` with spark icon for Agent, `rk-tag--flag` with user icon for Judges). The `Quality of the idea` row has a faint pink tint (`#FFF5FA`).
- Connectors: an SVG layer spanning both cards, 4 smooth cubic curves (3px, the dusk gradient as the stroke via a linearGradient, round caps, small 10px square pixel nodes at both ends) from the right edge of a schema row to the left edge of a criteria row: Pitch → Quality of the idea; Repo → Technological implementation; Repo → Uses an NVIDIA open model; Demo video → Demo video, 3 minutes or less. Draw each with the svg-path-draw recipe.

Scene 1 (0.0–1.0s): tiles clear 0.0–0.4s. The headline rises in on 0.5s (`Projects come in`) and 0.75s (`shaped to your rubric.`). The empty schema card frame rises at 0.5s.
Scene 2 (1.0–2.5s): schema rows snap in one per eighth from 1.0s to 2.25s (drop 12px + opacity, `steps(2)` — a block landing), the two header tags pop at 1.0s.
Scene 3 (2.5–4.0s): the criteria card slides in from the right on 2.5s (`power3.out`); its four rows cascade on 2.75 / 3.0 / 3.25 / 3.5s, side tags hidden for now.
Scene 4 (4.0–6.0s): on 4.0s the four connectors draw from field to criterion in quick succession (4.0 / 4.25 / 4.5 / 4.75s, 0.3s each), pixel nodes popping at each end as the line arrives; the side tags pop on 5.0s (Agent ×3) and 5.25s (Judges). Hold.

## Frame 6 — The agent reviews every project

- scene: The agent's review card checks off gate after gate with a live trace, while the headline swaps builds / watches / visits
- voiceover: ""
- duration: 6s
- transition_in: zoom-through 0.4s
- status: animated
- src: compositions/frames/06-agent-review.html
- type: feature_showcase
- persuasion: Show-don't-tell proof
- beat: power → trust
- blueprint: agent-progress-theater (Adapt)
- asset_candidates:
- focal: the agent review card (rebuilt HeroReview UI) with the trace panel
- roles: rebuilt UI only (no image assets)
- sfx: none

narrativeRole: The centerpiece — the first-round agent visibly doing the work humans never had time for.
keyMessage: It builds every repo, watches every demo and visits every live site.

Adapt: keep the working-state theater → receipt cascade (rows arrive, check off, a final receipt flips to done); the theater is a live trace panel beside the checklist, and the headline above does an in-place token swap.

**On-screen copy (render verbatim):**
- Eyebrow: `ROUND ONE · THE AGENT`
- Headline, one line, three states swapped in place (`every` never moves): `Builds every repo.` → `Tests every build.` → `Checks every claim.` (changed from Watches every demo / Visits every live site: the agent reads transcripts, it doesn't watch videos)
- Card header: mark `RW`, `Repo Whisperer`, `Project #042 · Coding and Agentic Engineering`, status tag `Agent reviewing` (with a stepped pixel spinner) → `Agent review done` (spark icon)
- List header: `The agent checks` (spark icon) and mono `nemotron-3-super`
- Rows (icon · title · gate tag · via → result):
  1. gear · `Builds from the README` · `gate` · `Sandbox run` → `Pass`
  2. search · `Runs on Nebius Token Factory` · `gate` · `Code scraper` → `Pass`
  3. search · `Uses an NVIDIA open model` · `gate` · `Code scraper · Nemotron found` → `Pass`
  4. play · `Demo video, 3 min or less` · `gate` · `Video reviewer · 2:41` → `Pass`
  5. globe · `Live demo visited` · `Web scraper · 5 pages` → `Pass`
  6. gear · `Technological implementation` · `Sandbox run · 42 of 42 tests pass` → `8.5` with a 10-segment meter
- Trace panel lines (mono, appear in order): `▸ sandbox  nebius · fork of image` · `$ git clone repo-whisperer` · `$ pnpm install` · `$ pnpm build  ✓` · `▸ code  grep tokenfactory.nebius.com  ✓` · `▸ code  grep nemotron  ✓ found` · `▸ video  2:41 · transcript read  ✓` · `▸ web  crawl live demo · 5 pages  ✓` · `$ pnpm test  ✓ 42 passed` · `▸ nemotron-3-super · score 8.5`

**Build notes:**
- Ground: paper + `rk-dotgrid`.
- Title band: eyebrow (120, 104); headline Geist Pixel 84px ink at top y=140. Split the headline into three spans: [verb] `every` [object]. Verb and object swap by hard cut with a 2-step pixel flicker (opacity 1→0.3→1 in steps) at each swap; `every` stays put. The verb slot right-aligns to a fixed width so `every` never moves (size the slot to the widest verb, `Watches`); the object slot is left-aligned.
- Card: `rk-mock` x=120, y=250, width 1680, height 630. Header row 96px (mark 56px, title 36px 600, subline ui-sm muted, status tag right). Below, two columns: left 1000px checklist, right the trace panel.
- Checklist: header row (spark icon violet, `The agent checks` ui 600, mono `nemotron-3-super` faint right). Rows 76px with `rk-row` dividers: `rk-tile` 48px icon, title (ui 500) + `rk-tag--gate` `gate` inline, via line (ui-sm muted) below, result slot on the right. A row arrives showing a small stepped pixel spinner in its result slot, then on its beat the spinner is replaced by `rk-tag--pass` with a check icon (`RK.pop`). Row 6's result is `8.5` in Geist Pixel 40px over a 10-segment `rk-meter` (160px) that fills to 9 segments via `RK.fillMeter` while the number counts up (`RK.count` 0→8.5, 1 decimal, steps 17).
- Trace panel: rounded 20px, `#150C2E` fill, padding 28px, inside the card's right column (x≈1150–1770, y≈360–850). Mono 21px; `▸` + tool names in `#F0ABFC`, commands in `#F7F2FF`, `✓` in `#FCD34D`, other text in `#B9ABD9`. Lines appear one by one (hard set, no fade), newest at the bottom with a block caret on the active line; older lines stay.
- Spinner: a 3×3 square pixel spinner (8px cells) whose lit cell steps around the ring every 0.125s.

Scene 1 (0.0–2.0s): card is in place as the zoom lands; eyebrow at 0.1s; headline state 1 `Builds every repo.` rises in at 0.25s. Row 1 arrives at 0.5s (spinner); trace lines 1–4 appear at 0.4 / 0.6 / 0.8 / 0.95s; row 1 flips to Pass on 1.0s. Row 2 arrives 1.1s; trace line 5 at 1.3s; row 2 Pass on 1.5s.
Scene 2 (2.0–4.0s): on 2.0s the headline swaps to `Watches every demo.`. Row 3 arrives 2.1s; trace line 6 at 2.3s; Pass on 2.5s. Row 4 arrives 2.6s; trace line 7 at 2.8s; Pass on 3.0s.
Scene 3 (4.0–6.0s): on 4.0s the headline swaps to `Visits every live site.`. Row 5 arrives 4.1s; trace line 8 at 4.3s; Pass on 4.5s. Row 6 arrives 4.6s; trace line 9 at 4.7s; its meter fills and the score counts to 8.5 from 4.75 to 5.0s; trace line 10 at 5.0s. On 5.5s the status tag flips from `Agent reviewing` to `Agent review done` (`RK.pop`). Hold.

## Frame 7 — Open stack

- scene: Night sky; NVIDIA Nemotron power tiers fill like character stats, then Nebius Token Factory and Tavily cards rise
- voiceover: ""
- duration: 6s
- transition_in: cut
- status: animated
- src: compositions/frames/07-open-stack.html
- type: feature_showcase
- persuasion: Authority by association
- beat: awe → confidence
- blueprint: grid-card-assemble (Adapt)
- asset_candidates: assets/nvidia-logo-white.svg — NVIDIA eye + white wordmark for night; assets/nebius-logo.svg — Nebius lime pill wordmark
- focal: the Nemotron tier card
- roles: nvidia-logo-white = supporting (card title mark) · nebius-logo = supporting (card title mark)
- sfx: none

narrativeRole: Hype the engine: open NVIDIA models served on Nebius, sandboxes for every repo, the live web for originality.
keyMessage: Open models, on infrastructure you own.

Adapt: keep the staggered cascade of cards into a grid; inside the Nemotron card the three tier rows assemble like a game's character-select stats, power bars filling in steps.

**On-screen copy (render verbatim):**
- Eyebrow: `OPEN STACK`
- Headline (two lines): `Open models, on` / `infrastructure you own.` — `you own.` in `rk-sunset-text`
- Nemotron card: [NVIDIA mark] `Nemotron`, role `EVERY VERDICT`; tier rows: `QUICK` `Nemotron 3.5 Lightning`; `BALANCED` `Nemotron 3 Super 120B`; `IN-DEPTH` `Nemotron 3 Ultra 550B`; footer line `Unsure? A bigger Nemotron double-checks.` (refresh icon)
- Nebius card: [Nebius mark] `Token Factory`, role `INFERENCE AND SANDBOXES`; body `Every model call. Every repo built in a VM-isolated Nebius Sandbox.`; fork diagram labels `image` → `fork` `fork` `fork`
- Tavily card: `Tavily`, role `THE LIVE WEB`; chips `Extract` `Crawl` `Search prior art`

**Build notes:**
- Layers: ground clip = the night ground (`gradients.night-glow` from frame.md) + `rk-stars`; then a full-bleed canvas running `RK.dither(clock, canvas, {start: 0, dur: 0.4, mode: "reveal", color: "#150C2E", angle: "center"})` (invisible against the night ground except where stars/glow show — fine); then the stage.
- Title band: `rk-eyebrow rk-eyebrow--dark` at (120, 104); headline Geist Pixel 80px `on-dark`, top y=140, two lines.
- Nemotron card: `rk-night-card` x=120, y=380, width 860, height 500, padding 36px. Title row: `nvidia-logo-white.svg` 34px tall + `Nemotron` Geist Pixel 52px `on-dark`; role mono 18px 0.18em `on-dark-muted` above the title. Three tier rows (86px each, white 5% fill, 16px radius): tier label mono 18px 0.12em `#F0ABFC` (left, 180px column), model name ui 600 `on-dark`, and on the right a 10-segment power meter (`rk-meter`, 220px, colors sunset `["#FCD34D", "#E11D8F"]`) filling to 3 / 6 / 10 segments. The IN-DEPTH row gets a soft sunset glow behind it when it maxes out (a radial `rgba(251,122,60,0.35)` layer fading in, no pulsing). Footer line ui-sm `on-dark-muted` with the pixel refresh icon in `#F0ABFC`.
- Right column x=1040–1800: Nebius card (`rk-night-card`, y=380, height 290): role mono, `nebius-logo.svg` 40px tall + `Token Factory` Geist Pixel 46px, body ui-sm `on-dark-muted` (max-width 600), and a tiny pixel fork diagram (bottom-right of the card): a 26px square labeled `image` feeding three 20px squares labeled `fork` via stepped pixel lines (the branch idea; mono 16px labels). Tavily card (`rk-night-card`, y=690, height 190): role mono, `Tavily` Geist Pixel 46px, and three `rk-pill rk-pill--glass` chips (20px text) with pixel icons (search, globe, search).

Scene 1 (0.0–1.0s): tiles clear 0.0–0.4s; the eyebrow and headline land on the downbeat (headline rises 0.0–0.5s; `you own.` flicks to its gradient at 0.5s).
Scene 2 (1.0–3.0s): the Nemotron card rises on 1.0s; tier rows land on 1.25 / 1.75 / 2.25s and each power meter fills in steps right after (`RK.fillMeter`, 0.3s): 3, 6, then all 10 — the IN-DEPTH glow blooms in at 2.6s. The footer line types in with `RK.type` from 2.75s.
Scene 3 (3.0–5.0s): the Nebius card rises on 3.0s; the fork diagram draws in steps 3.5–4.0s (image square, then the three forks one per eighth). The Tavily card rises on 4.0s; its chips pop on 4.25 / 4.5 / 4.75s.
Scene 4 (5.0–6.0s): hold, still.

## Frame 8 — Let the machine check the machine

- scene: Two cards open like a book — what the agent checks vs what humans judge — each earning a badge
- voiceover: ""
- duration: 4s
- transition_in: cut
- status: animated
- src: compositions/frames/08-split.html
- type: feature_showcase
- persuasion: Negative contrast (split of labor)
- beat: relief → control
- blueprint: comparison-split (Reproduce)
- asset_candidates:
- focal: the two split cards
- roles: typography + rebuilt UI only (no image assets)
- sfx: none

narrativeRole: The philosophy in one picture: machines verify, people decide.
keyMessage: Let the machine check the machine. People make the call.

**On-screen copy (render verbatim):**
- Headline (one line, centered): `Let the machine check the machine.`
- Left card: title `The agent checks` (spark icon); items `Does it build and pass its tests?` · `Does it use the sponsor tech?` · `Does the demo match the claims?` · `Did it follow the rules?`; badge `does the homework`
- Right card: title `Humans judge` (users icon); items `Is the idea new?` · `Would it matter to anyone?` · `Is it made with taste?` · `Would you use it?`; badge `makes the call`

**Build notes:**
- Layers: ground clip (paper + `rk-dotgrid`) → stage → a full-bleed canvas ON TOP running `RK.dither(clock, canvas, {start: 0, dur: 0.4, mode: "reveal", color: "#150C2E", angle: "diagonal"})`.
- Headline: Geist Pixel 84px ink, centered, top y=130.
- Cards (split-tilt-cards recipe for the mirrored entrance): left x=160, right x=1000, both y=300, width 760, height 540, gap between them 80px. Left: `rk-mock` with a violet-tint top half feel (`background: #FBF9FF`), title row with `rk-tile` (spark) + `The agent checks` Geist Pixel 44px. Right: white `rk-mock` with the landing's dusk hairline across its top edge (2px dusk gradient, inset 36px) and a magenta-tinted shadow (`0 32px 86px -32px rgba(232,49,143,.35)`), title row with a dusk-gradient 56px tile (users icon, white) + `Humans judge`. Items ui 27px with 44px row spacing: left items get a violet pixel check, right items a magenta pixel arrow-right.
- Badges: pill badges that spring-pop on each card's INNER edge (left card's right edge, right card's left edge) at the vertical middle, overlapping the edge: left `rk-tag rk-tag--agent` (spark) `does the homework`, right `rk-tag rk-tag--flag` (user) `makes the call`, both scaled up to 24px text.

Scene 1 (0.0–1.0s): tiles clear 0.0–0.4s; the headline rises in on 0.5s. On 0.75s both cards enter from opposite wings with mirrored rotateY tilts (left from −14°, right from +14°, x ±120px) settling flat by 1.25s (`power3.out`).
Scene 2 (1.0–2.5s): items tick in on eighths — left items at 1.25 / 1.5 / 1.75 / 2.0s, right items at 1.5 / 1.75 / 2.0 / 2.25s (check / arrow icons `RK.pop`, text rises 10px).
Scene 3 (2.5–4.0s): badges spring-pop on 2.5s (left) and 3.0s (right) with `RK.pop`. Hold.

## Frame 9 — Nothing goes unreviewed

- scene: A gate failure waits in the inbox with the agent's evidence; a person puts it back in the pool, and the audit trail stamps every call
- voiceover: ""
- duration: 6s
- transition_in: push-slide LEFT 0.5s
- status: animated
- src: compositions/frames/09-on-the-record.html
- type: benefit_highlight
- persuasion: Risk reversal (a human rules on every agent failure)
- beat: trust → peace of mind
- blueprint: cursor-ui-demo (Adapt)
- asset_candidates:
- focal: the gate inbox card, then the audit trail
- roles: rebuilt UI only (no image assets)
- sfx: none

narrativeRole: Nobody gets silently dropped: the agent flags, a person decides, and the whole trail is kept.
keyMessage: Nothing goes unreviewed. Every call is on the record.

Adapt: keep the custom cursor driving a reconstructed UI through one click that changes state; after the click the stage extends to a second surface (the audit trail) instead of the camera chasing.

**On-screen copy (render verbatim):**
- Headline A: `Nothing goes unreviewed.` → Headline B (replaces A): `Every call is on the record.`
- Inbox card: header `Inbox` (inbox icon) + tag `2 to decide` (changes to `1 to decide` after the click); mark `PP`; `#033 Pantry Pilot`; `Failed a gate: Uses an NVIDIA open model`; evidence `Agent: No NVIDIA model found in the repo. The README says inference runs through a hosted API, but no model id is set in the code.`; meta `Code scraper · confidence: low`; buttons `Keep it out` and `Back in the pool`; after the click a pass tag `Back in the pool` replaces the buttons row
- Audit trail card: header `Audit trail` + `newest first`; entries (title · detail · time): `Back in the pool` · `by the organizer` · `2:14 PM`; `Agent failed a gate` · `Uses an NVIDIA open model · confidence low` · `1:58 PM`; `Agent review done` · `5 steps · nemotron-3-super` · `1:57 PM`; `Submitted` · `via the submission form` · `9:03 AM`

**Build notes:**
- Ground: paper + `rk-dotgrid`. The frame pushes in from the right during its first 0.5s (assembler); start reveals at ≥0.25s.
- Title band: headline Geist Pixel 84px ink at (120, 120), one line; swap A→B by lift-out/rise-in.
- Inbox card: `rk-mock` x=120, y=260, width 780, height 600, padding 36px. Header row (inbox icon, `Inbox` ui 600, gate tag right). Project row: `rk-mark` 56px `PP`, name ui 600, failure line ui-sm in `warn`. Evidence box: tint fill (`rgba(109,40,217,0.045)`), 16px radius, 24px padding, ui-sm muted with `Agent:` bold ink, then meta mono 18px `faint` with the search icon. Buttons: `rk-pill rk-pill--ghost` and `rk-pill rk-pill--dark` (24px text).
- Audit trail card: `rk-mock` x=980, y=260, width 820, height 600. A vertical 2px `line-soft` rule at x+48; each entry has a 16px square dot (2px border, 3px radius) on the rule: green filled for `Back in the pool`, magenta for `Agent failed a gate`, violet outline for the other two. Entry: title ui 600, detail ui-sm muted, time mono 18px `faint` right-aligned. Entries 110px apart.
- Cursor: `RK.cursor` enters from (1500, 980) (off the bottom) and travels to the `Back in the pool` button's center; click with `RK.click` (violet ripple); the button presses (a 0.1s scale 0.96 dip on the button).

Scene 1 (0.0–2.0s): headline A rises in on 0.25s. The inbox card rises on 0.5s; the project row and failure line on 0.75s; the evidence box on 1.0s (text lines appear top to bottom 1.0–1.3s); the meta line and buttons on 1.5s. The cursor glides in from 1.0s and settles on `Back in the pool` by 1.9s.
Scene 2 (2.0–3.0s): click on 2.0s. The buttons row is replaced by the pass tag `Back in the pool` (`RK.pop`, 2.25s) and the header tag steps from `2 to decide` to `1 to decide` (2.25s). The cursor eases away down-right.
Scene 3 (3.0–6.0s): on 3.0s headline A lifts out and B rises in. The audit trail card slides in from the right on 3.0s; its entries stamp in newest-first on 3.5 / 3.75 / 4.0 / 4.25s — each square dot pops (`RK.pop`) and its text rises 8px. Hold.

## Frame 10 — Rounds that run themselves

- scene: The phase funnel fills in pixels stage by stage, then batch, winner and thank-you emails fly out of it
- voiceover: ""
- duration: 6s
- transition_in: zoom-through 0.4s
- status: animated
- src: compositions/frames/10-rounds-emails.html
- type: benefit_highlight
- persuasion: Friction reduction
- beat: ease → belonging
- blueprint: compose
- asset_candidates:
- focal: the pixel phase funnel
- roles: rebuilt UI only (no image assets)
- sfx: none

narrativeRole: The logistics disappear — rounds advance, batches go out, and every entrant hears back.
keyMessage: Rounds that run themselves. Every entrant hears back.

**On-screen copy (render verbatim):**
- Headline A: `Rounds that run themselves.` → Headline B (replaces A): `Emails go out at every stage.` (changed from Every entrant hears back: the thank-you email is optional)
- Funnel card: header `Judging › Progress`; stages (name · count · note): `Submitted` `186` `all projects`; `Screening` `142` `passed the gates`; `Round 1` `40` `64% reviewed` + a `live` badge; `Finals` `12` `top 12 planned` + trophy icon (faded)
- Email 1: mail icon · `Judge batch` · subject `Today's batch is open: 8 new projects` · button `Open today's batch →`
- Email 2: trophy icon · `Winner` · subject `Repo Whisperer won 1st place` · line `Here's what you won`
- Email 3: gift icon · `Thank you` · subject `Thanks for building Signal Garden` · line `Reached round 2 of 2 · reviewed by 3 judges`

**Build notes:**
- Ground: paper + `rk-dotgrid`.
- Title band: headline Geist Pixel 84px ink at (120, 120), one line.
- Funnel card: `rk-mock` x=120, y=250, width 1060, height 620, overflow hidden. Header row (ui 600 `Judging › Progress`). Four equal columns (1px `line-soft` separators): each with a 12px square color chip + stage name (ui-sm muted), the count Geist Pixel 64px ink (Finals in `faint`), the note ui-sm muted; Round 1 has the `live` badge (`rk-tag--agent` with a violet dot that steps on/off every 0.5s). The pixel funnel (`RK.funnel`) fills the bottom of the card: width 1060, height 320, cell 16, bands `[{color:"#7c3aed",count:186},{color:"#c026d3",count:142},{color:"#f43f5e",count:40,live:true},{color:"#fb923c",count:12,faded:true}]`.
- Email cards: three `rk-mock` cards (width 560, height 150, radius 22px, padding 24px) stacked at x=1240, y=260 / 440 / 620. Each: a 52px icon tile (mail = violet tile, trophy = sunset-gradient tile with dark icon, gift = magenta-soft tile), a small label (mono 16px uppercase `faint`), the subject (ui 600, 25px), the second line (ui-sm muted) or for email 1 a small `rk-pill rk-pill--dark` (18px text) button.

Scene 1 (0.0–2.5s): headline A rises in on 0.25s. The funnel card is present from 0.25s; its stage columns land on beats 0.5 / 1.0 / 1.5 / 2.0s — each column's count counts up (`RK.count`, steps 8, 0.35s) as the pixel funnel sweeps in left→right to that column's edge (stepped `clip-path: inset(0 X% 0 0)` on the svg). The Round 1 live dot starts blinking at 1.5s.
Scene 2 (2.5–6.0s): the emails fly out of the funnel's right edge — each card starts small (scale 0.6) at the Round 1 column and travels right into its slot (`power3.out`, 0.5s): email 1 on 2.5s, email 2 on 3.0s, email 3 on 3.5s. On 3.0s headline A lifts out and B rises in. Hold from 4.0s.

## Frame 11 — Winners, announced

- scene: The public winners page: podium blocks rise in pixels, confetti bursts, the share button gets clicked
- voiceover: ""
- duration: 4s
- transition_in: push-slide LEFT 0.5s
- status: animated
- src: compositions/frames/11-winners.html
- type: benefit_highlight
- persuasion: Status seeking (public celebration)
- beat: triumph
- blueprint: compose
- asset_candidates:
- focal: the podium on the winners page
- roles: rebuilt UI only (no image assets)
- sfx: none

narrativeRole: The payoff for everyone: rewards handled, winners celebrated in public.
keyMessage: Winners, announced.

**On-screen copy (render verbatim):**
- Headline: `Winners, announced.`
- Page header: mark `AI` + `Global AI Hackathon` + `Winners`; button `Share` (link icon); after the click a pass tag `Link copied`
- Podium (left to right): 2nd — mark `NS`, `Nightshift`, `Overnight agent that fixes flaky tests`, tag `2nd place`; 1st — mark `RW`, `Repo Whisperer`, `Ask any codebase anything`, tag `1st place`, pixel crown above the mark; 3rd — mark `LE`, `Ledgerly`, `Agentic bookkeeping for indie devs`, tag `3rd place`
- Prize tags under the podium: `Cash` · `Credits` · `Swag`

**Build notes:**
- Ground: paper + `rk-dotgrid`. The frame pushes in from the right during its first 0.5s.
- Title band: headline Geist Pixel 84px ink at (120, 120).
- Winners page card: `rk-mock` x=120, y=250, width 1680, height 630, overflow hidden. A 76px header strip: `rk-mark` 44px `AI`, `Global AI Hackathon` ui 600, `Winners` ui muted, `Share` as `rk-pill rk-pill--ghost` (22px) at the right with the link icon.
- Podium: three blocks centered in the card — 2nd (x center 560, height 190), 1st (center 840, height 260), 3rd (center 1120, height 150), each 250px wide, bottoms flush at the card's y≈840. Faces: the sunset stripe fill of the 8-bit button (`gradients.sun-button`), a 5px `#1D0B2E` pixel outline and a hard 10px bottom edge in `#8B1D5C` — podium blocks as 8-bit bricks — with the place number in Geist Pixel 72px `#22091F`. On top of each block: `rk-mark` 72px with initials, name (ui 600), pitch (ui-sm muted, max-width 300, centered), and the place tag (`rk-tag--agent` for 1st with a crown icon, `rk-tag--neutral` for 2nd and 3rd). A pixel crown (the crown icon, 44px, `#FBBF24`) floats above 1st's mark.
- Prize tags: a small row under the header on the right side of the card (x≈1300–1740, y≈360): three `rk-tag--neutral` tags with pixel icons coin / ticket / gift.
- Confetti: `RK.confetti(clock, stage, {x: 960, y: 520, start: 1.5, count: 38, size: 14})` in stage coordinates (burst from above the 1st-place block).
- Cursor: `RK.cursor` enters from the bottom right at 2.0s and clicks `Share` on 3.0s (`RK.click`, violet); `Link copied` pops next to the button at 3.25s.

Scene 1 (0.0–1.0s): headline rises on 0.25s; the page card is present; blocks rise from the card floor in `steps(5)` — 2nd on 0.5s, 1st on 0.75s, 3rd on 1.0s.
Scene 2 (1.0–2.0s): marks drop onto the blocks with `RK.pop` (1.0 / 1.25 / 1.25s), names and pitches rise in; on 1.5s the crown pops over 1st and the confetti bursts; prize tags pop on 1.75s.
Scene 3 (2.0–4.0s): the cursor travels to `Share` and clicks on 3.0s; `Link copied` pops at 3.25s. Hold while the confetti settles.

## Frame 12 — Take the tour

- scene: Neon-floor pixel city; "the part only people can do" lands, the R1 lockup, then an 8-bit "Take the tour" button gets pressed — the hand-off from the story into the app tour
- voiceover: "Let your judges do the part only people can do. … Let's take a tour of the RoundOne app."
- duration: 6s
- transition_in: cut
- status: animated
- src: compositions/frames/12-tour.html
- type: cta
- persuasion: A pause on the promise, then an invitation
- beat: resolve → curiosity
- blueprint: cta-morph-press (Adapt)
- asset_candidates: assets/retro-footer.png — landing footer neon-floor pixel city; assets/roundone-r1-logo.png — RoundOne R1 app-icon logo
- focal: the arcade button
- roles: retro-footer = background (full-bleed; night scrim behind the type) · roundone-r1-logo = cutout (lockup mark)
- sfx: none

narrativeRole: Close the story on the stance, then turn it into an invitation to see the real app.
keyMessage: Let judges do the part only people can do. Now, the tour.

**Start from `.hyperframes/carve/12-outro.orig.html`** (the film's old end card, same art, lockup and button). Keep its ground, scrim, dither reveal, sparkles, lockup and press mechanics; change the copy and timing as below. Rename every `f12-` id to `f12t-` so it can't collide with the old file. No `roundone.dev` and no credit line here — both move to the final frame.

**On-screen copy (render verbatim):**
- Headline (two lines, centered): `Let judges do the part` / `only people can do.` — line 2 in `rk-sunset-text` with the hero glow
- Lockup: [R1 logo] `RoundOne`
- Button: `Take the tour` (8-bit `rk-arcade` + arrow-right icon)

**Build notes:** headline Geist Pixel 92px `on-dark`, centered, line tops y≈150 and y≈256. Lockup centered, top y≈420 (logo 96px, radius 22px; `RoundOne` Geist Sans 700 56px). Button wrapper centered at y≈610. Cursor `RK.cursor` from (1500, 1000).

Scene 1 (0.0–1.5s): tiles clear 0.0–0.4s. Line 1 rises on 0.5s, line 2 on 1.0s (flicks to its gradient at 1.1s).
Scene 2 (1.5–3.0s): the logo pops on 1.5s and `RoundOne` wipes in beside it. Hold — the narrator is finishing the line.
Scene 3 (3.0–4.5s): the `Take the tour` button rises in on 3.0s (40px, `power3.out`); the cursor glides from the bottom right to the button's right half by 4.25s (`power3.inOut`).
Scene 4 (4.5–6.0s): press on 4.5s (`RK.press` + `RK.click` with color `#FCD34D`). Hold, pressed-and-released, to the end — the next frame zooms through from here.

## Frame 13 — Start a hackathon

- scene: The app's "Start a hackathon" page in a browser window: a name types in and the preview card updates live, a tagline, the dates; a callout says to host it anywhere (Devpost is our pick); then "Create & set up" gets clicked
- voiceover: "First, create your hackathon: give it a name and the dates. Host it wherever you like — we like Devpost — and RoundOne runs the judging."
- duration: 8s
- transition_in: zoom-through 0.4s
- status: animated
- src: compositions/frames/13-create.html
- type: feature_showcase
- persuasion: Show how little it takes to begin
- beat: curiosity → ease
- blueprint: compose
- asset_candidates: assets/tour/raw/schema.png — reference only, for the app's look (fonts, borders, the R1 logo in the nav); assets/roundone-r1-logo.png — the nav logo
- focal: the form and its live preview card
- roles: rebuilt app UI (the /new page) inside a tour-kit window · a tour-kit callout card
- sfx: none

narrativeRole: The tour starts where an organizer does — naming the event.
keyMessage: Create it in a minute; run it anywhere.

**On-screen copy (render verbatim):**
- Header (TK.header, chapter 0): eyebrow `Setup <b>›</b> New hackathon` · title `Start a hackathon.`
- Page (rebuilt at 1440×900 page px, url `roundone.dev/new`): nav — R1 logo 32px · `/` · `Hackathons` (muted) · `/` · `New` ; h1 `Start a hackathon` ; field `Name` → types `Agent Hacks 2026` ; field `Tagline` + hint `optional` → types `Build agents that ship real work.` ; field `Dates` → `Oct 1, 2026` → `Oct 5, 2026` ; buttons `Create & set up` (+ arrow) and `Cancel` ; right column: `PREVIEW` label and the preview card: pixel cover, mark `AH`, name, `Oct 1 – 5, 2026 · setup`
- Callout card (orange accent, number 1): title `Host it anywhere` · body `Run it on Devpost — our pick — or anywhere else. Projects come in by form or API.`

**Build notes:**
- Rebuild the page faithfully to the app (src/app/new/new-hackathon.tsx): Geist Sans, page ground `#F9F9FB`, white inputs 44px tall with 1px `#E6E1F0` borders and 10px radius, 15px labels, the primary button dark ink (`#1A1530`, white text, 10px radius), ghost `Cancel`. Two columns: form 1fr (from page x 160) and a 320px preview column at page x≈930. The nav strip across the top 64px (white, hairline bottom).
- The preview card: 320px wide, 1px border, 18px radius; a pixel cover 176px tall — build it with `RK.pixelField` in violet shades (`#7C3AED` family, seed 7) — holding a 40px rounded-square mark with the initials; below it the name in Geist Pixel 20px and the dates line in muted 14px.
- The callout: build it with the kit's card markup (a `.tk-card` + `.tk-num`, `--tk-accent:#EA6A2C`) in the window's `layer` at page (960, 560), no ring — it's advice, not a pointer. Pop it with the same stepped pop `TK.showCallout` uses (or call `TK.showCallout` on a `{ring, card}` pair with a zero-size hidden ring).
- Typing: `RK.type` into the name input (cps ≈ 20) and mirror the same text into the preview name with `RK.states` on each character step (or a second `RK.type` with the same timing and no caret). The initials mark pops when the name completes.

Scene 1 (0.0–1.0s): header rises (TK.showHeader at 0.05); the window rises at 0.2s.
Scene 2 (1.0–2.5s): camera pushes gently into the form (TK.focus on the form + preview, max 1.25) at 0.9s. `Agent Hacks 2026` types 1.0–1.8s; the preview name follows; the `AH` mark pops on 2.0s and the pixel cover re-seeds with a 4-step flicker.
Scene 3 (2.5–4.5s): the tagline types 2.5–3.4s. On 4.0s the start date fills (`Oct 1, 2026`), on 4.25s the end date (`Oct 5, 2026`); the preview's dates line swaps from `Dates TBD · setup` to `Oct 1 – 5, 2026 · setup` on 4.5s.
Scene 4 (4.5–6.0s): the callout card pops on 5.0s beside the preview.
Scene 5 (6.0–8.0s): the page cursor (RK.cursor in the window's layer) glides to `Create & set up` by 6.4s and clicks on 6.5s (`RK.click`); the button label steps to `Creating…` on 6.6s. Hold.

## Frame 14 — Shape every submission

- scene: The Project Schema screen; a block-type menu pops open (Text, Long text, Number, URL, Video, Repo, File, Select, Image, Team) and "Repo" flies onto the GitHub row; callouts on typed blocks, what entrants see, and what guides the agent
- voiceover: "Then shape what teams submit. Every field has a type — a link, a repo, a video, files — so the agent knows how to check it."
- duration: 8s
- transition_in: push-slide LEFT 0.5s
- status: animated
- src: compositions/frames/14-schema.html
- type: feature_showcase
- blueprint: compose
- asset_candidates: assets/tour/raw/schema.png — the Project Schema screen (GitHub block drawer open)
- focal: the schema list and its typed blocks
- roles: screenshot in a tour-kit window · kit callouts 1–3 from shots.js (schema)
- sfx: none

narrativeRole: The rubric starts with what teams hand in.
keyMessage: Typed blocks, so every field goes to the right check.

Built (the tour kit's pilot frame; its file is the reference implementation for every other tour frame). Scene beats: header 0.05 · window 0.2 · push to the list 0.9 · block menu 1.25–2.6 · Repo lights 2.75 and flies to the GitHub row 3.0–3.65 · callout 2 on 3.5 · over to the drawer 4.4 · callout 1 on 5.0, callout 3 on 5.75 · pull back 6.5 · hold.

## Frame 15 — Set the rules once

- scene: The rest of setup dealt like cards: Criteria, the agent's settings, Phases, Distribution and the Judge portal slide in one after another, each landing with its one key callout
- voiceover: "Set your criteria and how each one is checked, pick how much model to use, plan the rounds, share out the work, and write what your judges see."
- duration: 10s
- transition_in: push-slide LEFT 0.5s
- status: animated
- src: compositions/frames/15-setup.html
- type: feature_showcase
- blueprint: compose
- asset_candidates: assets/tour/raw/criteria-inputs.png · assets/tour/raw/criteria-agent.png · assets/tour/raw/phases.png · assets/tour/raw/distribution.png · assets/tour/raw/judge-portal.png
- focal: the top card of the stack
- roles: five screenshots in tour-kit windows, stacked · one kit callout each
- sfx: none

narrativeRole: Setup, at a glance — it's thorough, and it's done once.
keyMessage: Criteria, the model, rounds, fair queues and the judge portal, set once.

**On-screen copy (render verbatim):**
- Header (chapter 0): title `Set the rules once.` (fixed). Eyebrow steps with each card (`RK.states`): `Setup <b>›</b> Criteria` → `Setup <b>›</b> The agent` → `Setup <b>›</b> Phases` → `Setup <b>›</b> Distribution` → `Setup <b>›</b> Judge portal`
- Callouts (from shots.js; number each `1`): criteria-inputs callout 2 `Choose how it's checked` with the body overridden to `Build it in a Nebius sandbox, scrape the code or demo, read the video transcript, or leave it to judges.` · criteria-agent callout 1 `How much model` · phases callout 2 `Only the best move on` · distribution callout 2 `Fair queues` · judge-portal callout 1 `A private link each`

**Build notes:**
- Five `TK.window`s, each at width 1300 (scale 0.9028), x 310, y 200, built in order (later = on top). A card enters from the right: fromTo `x: +260, opacity: 0` → `x: 0, opacity: 1` on its `enter` wrapper (0.55s, `power3.out`). As the next card arrives, the one below steps back: its `enter` goes to `scale: 0.94, y: -26, opacity: 0.55` (0.5s, `power3.out`, transformOrigin top center) — and the one two below fades to 0. Remember `immediateRender:false` on every second-and-later tween on the same element.
- Each card's callout pops ~0.6s after its card lands. Use each window's own callouts (`TK.callouts(w, shot.callouts, {only:[i], numbers:[1]})`), and override the criteria-inputs body before building (copy the shot object, don't mutate shots.js).
- No camera push-ins in this frame — the stack is the motion. Keep every card's callout inside the frame.

Scene 1 (0.0–2.0s): header rises (0.05). Card 1 (criteria-inputs) lands at 0.2s; its callout on 0.75s.
Scene 2 (2.0–4.0s): eyebrow steps on 2.0s; card 2 (criteria-agent) lands on 2.0s; callout on 2.6s.
Scene 3 (4.0–6.0s): eyebrow steps; card 3 (phases) lands on 4.0s; callout on 4.6s.
Scene 4 (6.0–8.0s): eyebrow steps; card 4 (distribution) lands on 6.0s; callout on 6.6s.
Scene 5 (8.0–10.0s): eyebrow steps; card 5 (judge-portal) lands on 8.0s; callout on 8.6s. Hold.

## Frame 16 — Start judging

- scene: The Progress page before judging: five readiness checks tick green, the "When you start" summary, a click on Start judging — then night sweeps in and the R1 agent logo appears as every project streams into it
- voiceover: "When it's all in place, start judging. Every project comes in, and the RoundOne agent takes over."
- duration: 6s
- transition_in: cut
- status: animated
- src: compositions/frames/16-start.html
- type: transition
- blueprint: compose
- asset_candidates: assets/tour/raw/progress.png — use its top 124 page px (the app nav with Judging + the Progress tab) as the page's chrome via TK.crop; assets/roundone-r1-logo.png — the agent logo
- focal: the Start judging button, then the R1 logo
- roles: rebuilt app UI (the not-started Progress page) in a tour-kit window · R1 logo = cutout (hands off to frame 17)
- handoff_out: roundone-r1-logo — center (960, 300), 170×170px, border-radius 38px, scale 1, opacity 1, static from 5.0s to the cut (no motion at the cut).
- sfx: none

narrativeRole: The switch from setup to the machine's turn.
keyMessage: Start judging, and the agent takes round one.

**On-screen copy (render verbatim):**
- Header (chapter 1): eyebrow `The agent <b>›</b> Start` · title `Start judging.`
- Checklist rows (green check tile · label · hint · `Edit`): `12 projects ready` / `Every active project goes into the first phase.` · `Group review → Semifinal → Final panel` / `3 phases; each narrows the pool for the next.` · `6 judges in Group review` / `2 per project` · `5 criteria · weights add to 100%` / `The rubric judges and the agent score against.` · `Agent first · mixed · daily over 3 days` / `How the work is handed out.`
- Panel: eyebrow `WHEN YOU START` · `1` `12 projects move into Group review.` · `2` `The agent's review is queued for each of them.` · `3` `24 reviews go out to 6 judges, about 4 each.` · button `Start judging` (+ arrow)
- Aside: `How judging runs` · `Agent first` · `Assignments` · `Closing a phase` · `Last phase` (titles only, with pixel icons spark / users / arrow-right / trophy)
- After the click: label `ROUND ONE · THE AGENT` (GeistMono 600 20px, 0.18em, `on-dark-muted`) under the logo

**Build notes:**
- Ground: paper clip; a full-bleed canvas above everything running `RK.dither(clock, canvas, {start: 0, dur: 0.4, mode: "reveal", color: "#150C2E", angle: "diagonal"})` (the frame opens covered — a pixel wipe leads into it), and a SECOND canvas running `RK.dither(clock, canvas2, {start: 3.9, dur: 0.6, mode: "cover", color: "#150C2E", angle: "center"})` that turns the frame to night after the click. Above the second canvas: the night-glow gradient layer fading in 4.4–4.6 (so the ground is night-glow, not flat), the R1 logo and label.
- The page: `TK.window` with `html`, url `roundone.dev/h/agent-hacks-2026/judging/progress`. Put a `TK.crop(w, [0, 0, 1440, 124], "assets/tour/raw/progress.png")` at the top for the real nav; below it, rebuild the not-started page (src/app/h/[slug]/judging/progress/page.tsx `NotStarted`): page title `Progress` (Geist 30px 500) at page (160, 164); a white panel (1px border, 12px radius) with the five check rows (28px green tiles `#DCF7EC`/`#0F9D6B` with a pixel check, 15px medium label, 13px muted hint, `Edit` link at the right), a tinted "When you start" panel below it with the numbered lines and a dark ink `Start judging →` button at its bottom right; the aside column at page x≈1080.
- Check tiles start grey (`#F1EEF8`, no icon) and pop to green on their beat.
- The ingest: 12 small project marks (`rk-mark`, 44px, initials `NS RW LE JC SB PQ CA MM TW GS CC LL`) fly from a fan at the bottom of the frame into the logo, staggered 4.8–5.6s, each vanishing into it.
- Logo: `assets/roundone-r1-logo.png`, 170px, radius 38px, center (960, 300); pops on 4.75s (`RK.pop`) and then does NOT move.

Scene 1 (0.0–1.0s): tiles clear 0.0–0.4s; header rises at 0.4s; the window rises at 0.45s.
Scene 2 (1.0–2.5s): the five check tiles pop green on 1.0 / 1.25 / 1.5 / 1.75 / 2.0s.
Scene 3 (2.5–3.9s): camera pushes to the "When you start" panel (TK.focus, max 1.35) at 2.4s; the page cursor arrives on `Start judging` by 3.4s and clicks on 3.5s; the label steps to `Starting…` on 3.6s.
Scene 4 (3.9–6.0s): night tiles sweep in 3.9–4.5s; the night glow settles; the R1 logo pops on 4.75s at (960, 300); `ROUND ONE · THE AGENT` fades up under it on 5.0s; the 12 project marks stream into the logo 4.8–5.6s. Hold with the logo static.

## Frame 17 — The agent at work

- scene: Night. The R1 logo becomes the agent's hub; your criteria feed in; a project card on the left and three stations on the right — Nebius Sandboxes, Tavily, NVIDIA Nemotron — light up in turn as the agent sends them work; the card flips to a verdict; a badge notes it runs on Vercel Workflow
- voiceover: "For each project, it works through your criteria: building and testing the code in a Nebius sandbox, searching for the SDK calls you asked about, checking every claim — with NVIDIA Nemotron doing the reasoning."
- duration: 12s
- transition_in: cut
- status: animated
- src: compositions/frames/17-agent.html
- type: feature_showcase
- blueprint: agent-progress-theater (Adapt)
- asset_candidates: assets/roundone-r1-logo.png — R1 logo (the hub); assets/nebius-logo.svg — Nebius wordmark; assets/tavily-logo.png — Tavily wordmark for dark grounds; assets/nvidia-logo-white.svg — NVIDIA mark for night
- focal: the hub and its three stations
- roles: roundone-r1-logo = cutout (the hub) · nebius / tavily / nvidia = supporting (station marks)
- handoff_in: roundone-r1-logo — center (960, 300), 170×170px, border-radius 38px, scale 1, opacity 1, static at t=0 (it only starts moving at 0.15s).
- sfx: none

narrativeRole: The machine at work, visibly — each sponsor doing one job.
keyMessage: Nebius Sandboxes run, test and search the code. Tavily reads the live web. NVIDIA Nemotron checks every claim. Durable, on Vercel Workflow.

**Start from `../roundone-devpost/compositions/frames/04-agent.html`** (a finished 9.5s version of exactly this scene, same kit and look). Copy it to `compositions/frames/17-agent.html`, rename every `f04-agent` id/class to `f17-agent` and the composition id / timeline key to `17-agent`, then make these changes:
1. Duration 12s. Keep 0.0–1.0s as is. Insert a new beat 1.0–2.0s (below), and shift every original beat after 1.0s later by +1.0s. Then add the badge beat at 10.5s.
2. New beat — your criteria: three small criterion chips appear stacked under the hub label (centered on x=960, tops at y≈660 / 712 / 764, `rk-night-card`-style pills, 20px/600 `on-dark`, a violet pixel `check-list` icon each): `Builds from the README` · `Uses the NVIDIA SDK` · `Demo matches the claims`. They pop on 1.0 / 1.25 / 1.5s and at 1.75s slide up into the hub (y → 520, scale → 0.3, opacity → 0, `power3.in`, 0.3s) — the rubric going in.
3. Verdict rows: replace the last row (play icon · `Video 2:41`) with (search icon · `Claims match the demo`). Keep the other five.
4. The badge (new, 10.5s): centered at x=960, top y≈820, a `rk-glass` pill with a white Vercel triangle (an inline SVG `<svg viewBox="0 0 76 65"><path d="M37.6 0 75.2 65H0z" fill="#fff"/></svg>` at 18px) + `Runs on Vercel Workflow` (Geist Sans 600 22px) + a thin divider + `durable · retries · resumes` (Geist Mono 18px `on-dark-muted`). It rises 20px + fades in (0.5s, `power3.out`). Keep it above y=900.
5. Keep the eyebrow `ROUND ONE · THE AGENT`, the stations' copy, the connectors, packets and the flip exactly as they are.

Scene 1 (0.0–1.0s): as the original: logo glides to the hub (0.15–0.75s), eyebrow, project card, dim stations, connectors, hub label.
Scene 2 (1.0–2.0s): the three criteria chips pop and rise into the hub.
Scene 3 (2.0–4.5s): Nebius Sandboxes — the original 1.0–3.5s beat, +1.0s.
Scene 4 (4.5–6.8s): Tavily — the original 3.5–5.8s beat, +1.0s.
Scene 5 (6.8–10.5s): NVIDIA Nemotron and the verdict — the original 5.8–9.5s beat, +1.0s (flip ≈ 8.3s, passes 8.7–9.45s, `Agent review done` 9.6s).
Scene 6 (10.5–12.0s): the Vercel Workflow badge rises in on 10.5s. Hold, everything lit.

## Frame 18 — Checked, verified, summarized

- scene: A project's agent review in the app: the score with its gates passed, strengths and what to improve, and the flag that sends low-confidence calls to a person
- voiceover: "It doesn't pick winners. It checks, verifies and summarizes — with the evidence to back it up — so your judges can focus on the human side."
- duration: 8s
- transition_in: cut
- status: animated
- src: compositions/frames/18-review.html
- type: feature_showcase
- blueprint: compose
- asset_candidates: assets/tour/raw/agent-review.png — the agent review screen (7.3/10, gates passed, strengths / to improve)
- focal: the score row
- roles: screenshot in a tour-kit window · kit callouts from shots.js (agent-review)
- sfx: none

narrativeRole: Say plainly what the agent is — a checker, not a judge.
keyMessage: The agent checks, verifies and summarizes. People judge.

**On-screen copy (render verbatim):**
- Header (chapter 1): eyebrow `The agent <b>›</b> Review` · title `Checked, verified, summarized.`
- Callouts (shots.js agent-review, numbered in the order shown): callout 2 `Round one, done` → `1`; callout 3 `Feedback for the team` → `2`; callout 1 `A person decides` → `3`.

**Build notes:** follow `14-schema.html`'s structure (paper ground clip, stage clip, TK.window + TK.header, build in `TK.ready`). Add the pixel-wipe reveal canvas (`RK.dither` reveal, 0–0.4s, `#150C2E`, diagonal) on top — this frame is entered through a wipe. Use `TK.callouts(w, shot.callouts, {only: [1, 2, 0], numbers: [1, 2, 3]})`.

Scene 1 (0.0–1.0s): tiles clear 0.0–0.4s; header rises at 0.4s; window rises at 0.45s.
Scene 2 (1.0–2.5s): camera pushes onto the score row (TK.focus on callout 1's rect, max 1.5) at 1.0s; callout `Round one, done` on 1.5s.
Scene 3 (2.5–4.0s): camera moves down to strengths / to improve at 2.6s; callout `Feedback for the team` on 3.25s.
Scene 4 (4.0–5.5s): camera moves up to the `1 needs a person` tag at 4.3s; callout `A person decides` on 4.9s.
Scene 5 (5.5–8.0s): pull back to the whole window at 5.9s. Hold.

## Frame 19 — A person makes the call

- scene: The agent-inbox email ("7 projects need your call"): agree or disagree with each failed gate, the list of failures with the agent's reasoning — and an audit trail card stamping every decision
- voiceover: "Anything that fails a must-pass check lands in your inbox. A person makes the call, and every decision goes on the audit trail."
- duration: 8s
- transition_in: push-slide LEFT 0.5s
- status: animated
- src: compositions/frames/19-inbox.html
- type: feature_showcase
- blueprint: compose
- asset_candidates: assets/tour/email-agent-inbox.png — the app's real agent-inbox email (680 css wide, 2×; 1634 css tall)
- focal: the email, then the audit trail card
- roles: email in a tour-kit mail window · rebuilt audit-trail card (film style)
- sfx: none

narrativeRole: Nothing the machine flags is final until a person says so — and it's all on the record.
keyMessage: Failures wait for a person. Every call is audited.

**On-screen copy (render verbatim):**
- Header (chapter 1): eyebrow `The agent <b>›</b> Inbox` · title `A person makes the call.`
- Mail window: subject `7 projects need your call` · from `RoundOne` `judging@roundone.dev` · to `Dylan (organizer)`
- Audit card: header `Audit trail` + mono `newest first`; entries (square dot · text · mono time): `Back in the pool` / `by the organizer` / `2:14 PM` · `Agent failed a gate` / `Uses Acme SDK · confidence low` / `1:58 PM` · `Agent review done` / `5 steps · nemotron-3-super` / `1:57 PM` · `Submitted` / `via the submission form` / `9:03 AM`

**Build notes:**
- `TK.mail(stage, {x: 150, y: 196, width: 1100, height: 900, zoom: 1.2, src: "assets/tour/email-agent-inbox.png", subject, from, fromEmail, to})`.
- Rings on the email (build them yourself in the mail window's `layer`, same look as `.tk-ring`, violet): the two choice boxes (`Agree — keep it out` / `Disagree — back in the pool`), then the first failure card (Grant Scout · FAILED · Uses Acme SDK and its reason). Measure their positions from the PNG (email css px × zoom, offset by `m.emailLeft`/`m.emailTop` and the scroll).
- Audit card: an `rk-mock` at frame x 1300–1800, y 250–860 (keep ≤ 900), 20px/600 header, rows 64px with hairlines; square 12px dots (violet for agent entries, magenta for the organizer's); times in Geist Mono 18px `faint`. Entries stamp in newest-first: dot `RK.pop`, text rises 8px.

Scene 1 (0.0–1.0s): header rises (0.05); the mail window rises at 0.2s.
Scene 2 (1.0–2.5s): ring on the Agree / Disagree boxes on 1.25s (a slow camera push toward them, TK.focus max 1.2, at 1.0s).
Scene 3 (2.5–4.0s): the email scrolls to `Waiting on you` (TK.scroll 2.5–3.7s); ring on Grant Scout's failure on 3.75s.
Scene 4 (4.0–6.5s): camera rests (4.0s); the audit card slides in from the right on 4.25s; its entries stamp on 5.0 / 5.25 / 5.5 / 5.75s.
Scene 5 (6.5–8.0s): hold.

## Frame 20 — Today's batch is open

- scene: A judge's email: "Day 2 is open" — 6 projects waiting, about 24 minutes, 4 of 22 scored — beside a day strip that shows the work arriving in batches; the judge clicks "Open today's batch"
- voiceover: "Then your judges get an email with their projects — all at once, or in daily batches so nobody burns out."
- duration: 6s
- transition_in: cut
- status: animated
- src: compositions/frames/20-judge-email.html
- type: feature_showcase
- blueprint: compose
- asset_candidates: assets/tour/email-judge-batch.png — the app's real judge batch email (680 × 560 css, 2×)
- focal: the email's stats and its button
- roles: email in a tour-kit mail window · film-style side card (day strip)
- sfx: none

narrativeRole: The human half begins — in manageable pieces.
keyMessage: Judges get their projects in batches, so fatigue doesn't win.

**On-screen copy (render verbatim):**
- Header (chapter 2): eyebrow `Judging <b>›</b> Email` · title `Today's batch is open.`
- Mail window: subject `Day 2 is open` · from `RoundOne` `judging@roundone.dev` · to `Marcus`
- Side card: title `Daily batches` · days `Day 1` (check, `done`) · `Day 2` (dot, `open`) · `Day 3` (empty, `tomorrow`)

**Build notes:**
- Pixel-wipe reveal canvas on top (entered through a wipe): `RK.dither` reveal 0–0.4s, `#150C2E`, diagonal.
- `TK.mail(stage, {x: 200, y: 196, width: 1060, height: 760, zoom: 1.3, src: "assets/tour/email-judge-batch.png", emailHeight: 560, …})`.
- Side card: `rk-mock` at frame x 1330–1800, y 330–700: 26px/600 title, three rows with a 36px tile each (Day 1 = pass green check, Day 2 = violet dot pulsing ONCE with a stepped pop, Day 3 = dashed empty), labels 24px, status tags (`rk-tag--pass` done, `rk-tag--agent` open, `rk-tag--neutral` tomorrow).
- The email's `Open today's batch →` button: put the page cursor (RK.cursor inside the mail window's `layer`) on it and click; add a violet ring on the three stat boxes first.

Scene 1 (0.0–1.0s): tiles clear 0.0–0.4s; header rises at 0.4s; the mail window rises at 0.45s.
Scene 2 (1.0–2.0s): ring on the three stat boxes on 1.25s.
Scene 3 (2.0–3.5s): the side card rises on 2.0s; its days pop on 2.25 / 2.5 / 2.75s.
Scene 4 (3.5–6.0s): the cursor glides to `Open today's batch` by 4.35s and clicks on 4.5s (the button darkens for 0.15s). Hold — the next frame zooms through from here.

## Frame 21 — Judges score the idea

- scene: The distraction-free judging page: the submission (video, pitch, live demo, repo, team) on the left, the rubric on the right; the camera visits each part in turn, the score meters fill, then on to the next project
- voiceover: "The judging page keeps it simple: watch the video, read the pitch, try the demo, score each criterion, leave a note — and move on to the next."
- duration: 10s
- transition_in: zoom-through 0.4s
- status: animated
- src: compositions/frames/21-judge-view.html
- type: feature_showcase
- blueprint: compose
- asset_candidates: assets/tour/raw/judge-view.png — the judge view of project #004 Nightshift (submission left, "Ada's scores" rubric right)
- focal: the rubric panel
- roles: screenshot in a tour-kit window · kit callouts from shots.js (judge-view) · ring-only highlights · crops of the score meters
- sfx: none

narrativeRole: Show judges exactly what their job becomes — the good part.
keyMessage: Everything on one page. Score what people should.

**On-screen copy (render verbatim):**
- Header (chapter 2): eyebrow `Judging <b>›</b> Judge view` · title `Judges score the idea.`
- Callouts (shots.js judge-view): callout 1 `Everything on one page` → `1`; callout 3 `Score what people should` → `2`; callout 2 `A running total` → `3`
- A film-style pill button over the page, bottom right of the rubric panel: `Next project` + arrow (`rk-pill rk-pill--dark`), with a mono hint `4 of 6` beside it

**Build notes:**
- Ring-only highlights (TK.showCallout with `{ringOnly: true}` on extra callouts you define in page px — find the rows in the screenshot: the Video row, the Overview/pitch row, the Live demo row inside the submission panel (callout 1's box is [106, 489, 800, 395])).
- Score meters: the rubric panel (callout 3's box [962, 528, 354, 364]) has a segmented bar per criterion. Hide each bar with `TK.cover` (sample the panel's white) and reveal a `TK.crop` of it left→right with a stepped clip-path (`steps(10)`, 0.35s each) — they fill like the film's health bars.

Scene 1 (0.0–1.0s): header rises (0.05); the window rises at 0.2s.
Scene 2 (1.0–3.75s): camera pushes onto the submission panel at 0.9s; callout `Everything on one page` on 1.5s; ring-only highlights step over Video (2.25s), the pitch (2.75s) and Live demo (3.25s).
Scene 3 (3.75–6.5s): camera crosses to the rubric at 3.75s; callout `Score what people should` on 4.25s; the meters fill on 4.75 / 5.1 / 5.45 / 5.8s.
Scene 4 (6.5–8.0s): callout `A running total` on 6.5s (a small push toward the total, max 1.6).
Scene 5 (8.0–10.0s): camera rests at 7.75s; the `Next project` pill pops on 8.25s; the page cursor clicks it on 9.0s. Hold.

## Frame 22 — Every score counts

- scene: Animated roll-up: three judges' scores fly into six projects, combined scores count up, the rows re-sort, a cut line drops under the top four, and they advance to the Semifinal
- voiceover: "RoundOne adds up every judge's scores and sends the strongest projects on to the next round."
- duration: 6s
- transition_in: push-slide LEFT 0.5s
- status: animated
- src: compositions/frames/22-scoring.html
- type: data_story
- blueprint: compose
- asset_candidates:
- focal: the ranked list and its cut line
- roles: typography + rebuilt UI only (film-style cards)
- sfx: none

narrativeRole: The scoring is automatic and fair; the field narrows on its own.
keyMessage: Scores combine; the best move on.

**On-screen copy (render verbatim):**
- Header (TK.header, chapter 2): eyebrow `Judging <b>›</b> Group review` · title `Every score counts.`
- Judges (left column, `rk-face` 64px): `AR` (face 0), `MK` (face 1), `JL` (face 2)
- Rows (`rk-mark` + name · combined score): `NS` Nightshift 8.9 · `RW` Repo Whisperer 8.4 · `LE` Ledgerly 8.1 · `JC` Judge Copilot 7.7 · `TW` Tripwire 6.9 · `MM` Menu Mind 6.2 — they START in this order instead: Repo Whisperer, Menu Mind, Nightshift, Tripwire, Ledgerly, Judge Copilot
- Cut line label: `Top 4 → Semifinal` · tags on the top four: `Advances` (`rk-tag--pass`)

**Build notes:**
- Paper ground clip + stage clip; header via `TK.header` (the kit works without a window). A `rk-mock` list card at x 520–1800, y 230–880 with six 100px rows (mark 56px, name 28px/600, a 3-cell mini score strip in the middle showing each judge's score as small chips, the combined score in Geist Pixel 44px at the right). The three judge faces stand in a column at x≈300, y 330 / 500 / 670.
- Score chips: each judge fires one small chip (their score, e.g. `9`, 18px/600 on `violet-soft`) at each row on the beat — travel 0.35s `power3.out` from the face to the row's strip cell.
- Re-sort: FLIP the rows to their ranked order (y tweens, 0.6s `power3.inOut`); ranks never overlap mid-move more than the row height.
- Cut line: a 2px dashed `magenta` line under row 4 with the label on its right, drawn left→right in `steps(8)`.

Scene 1 (0.0–1.0s): header rises (0.05); the list card rises at 0.2s with its six rows (combined scores show `–`); faces pop on 0.5s.
Scene 2 (1.0–2.5s): chips fly — judge AR on 1.0s, MK on 1.5s, JL on 2.0s (one volley of six chips each); combined scores count up on 2.25–2.75s (`RK.count`, 1 decimal, steps 6).
Scene 3 (2.75–3.75s): rows re-sort into rank order (2.75–3.35s).
Scene 4 (3.75–6.0s): the cut line draws on 3.75s; `Advances` tags pop down the top four on eighths 4.25–4.625s; rows five and six dim to 40% on 4.75s. Hold.

## Frame 23 — Every round, every judge

- scene: A project's page after judging: where it landed (1st, every prize and award) and each judge's weighted scores, averaged
- voiceover: "Open any project to see how it did — round by round, and judge by judge."
- duration: 6s
- transition_in: push-slide LEFT 0.5s
- status: animated
- src: compositions/frames/23-project.html
- type: feature_showcase
- blueprint: compose
- asset_candidates: assets/tour/raw/project.png — project #004 Nightshift after judging (won Grand prize; final panel scores 8.9)
- focal: the result banner, then the scores panel
- roles: screenshot in a tour-kit window · kit callouts from shots.js (project)
- sfx: none

narrativeRole: Full transparency per project.
keyMessage: Every project on one page — result, feedback, scores by round and judge.

**On-screen copy:** Header (chapter 2): eyebrow `Judging <b>›</b> Project` · title `Every round, every judge.` · callouts: shots.js project callout 1 `Where it landed` → `1`, callout 2 `Every judge, averaged` → `2`.

**Build notes:** the `14-schema.html` pattern.

Scene 1 (0.0–1.0s): header rises (0.05); the window rises at 0.2s.
Scene 2 (1.0–2.75s): camera pushes onto the result banner (callout 1's rect, max 1.35) at 0.9s; callout on 1.5s.
Scene 3 (2.75–4.5s): camera moves to the scores panel at 2.75s; callout 2 on 3.35s.
Scene 4 (4.5–6.0s): camera rests at 4.4s. Hold.

## Frame 24 — Every round at a glance

- scene: The Progress page mid-judging: the round counters tick in, the pixel funnel draws itself from Submitted to Final panel, and the key parts get called out
- voiceover: "And the progress page shows every round at a glance."
- duration: 6s
- transition_in: push-slide LEFT 0.5s
- status: animated
- src: compositions/frames/24-progress.html
- type: feature_showcase
- blueprint: compose
- asset_candidates: assets/tour/raw/progress.png — Judging › Progress (Submitted 12 · Group review 11 · Semifinal 8 · Final panel 5, the pixel funnel bar, the projects table; a "Run agent" button top right)
- focal: the pixel funnel
- roles: screenshot in a tour-kit window · covers + crops to animate the counters and funnel · kit callouts 1 and 3 from shots.js (progress)
- sfx: none

narrativeRole: The whole event's state, in one glance.
keyMessage: Every round, how far it got, and who moved on.

**On-screen copy:** Header (chapter 2): eyebrow `Judging <b>›</b> Progress` · title `Every round at a glance.` · callouts: shots.js progress callout 1 `Reviewed and advanced` → `1`, callout 3 `The whole funnel` → `2`. Do NOT use callout 2.

**Build notes:**
- Hide the `Run agent` button for the whole frame: `TK.cover(w, [1185, 150, 160, 70], <the page ground color sampled from the screenshot around it>)` — it must be invisible from t=0 (a plain static cover, no tween).
- The four counters row (above the funnel, roughly page y 240–350 across x 110–1330): cover each column and reveal a crop of it on its beat (stepped clip, 0.2s) — or cover the whole row and reveal the four column crops left to right.
- The funnel bar (shots.js callout 3's box [110, 356, 1220, 238]): cover it and reveal a crop left→right with `clip-path: inset(0 X% 0 0)` in `steps(16)` over 1.2s.

Scene 1 (0.0–1.0s): header rises (0.05); the window rises at 0.2s.
Scene 2 (1.0–2.0s): the four counters step in on 1.0 / 1.25 / 1.5 / 1.75s.
Scene 3 (2.0–3.25s): the funnel draws 2.0–3.2s (camera pushes a little toward it at 1.9s, max 1.2).
Scene 4 (3.25–6.0s): callout `Reviewed and advanced` on 3.5s; callout `The whole funnel` on 4.25s. Hold.

## Frame 25 — Ask across every project

- scene: The Chat screen: a question types in and sends, the agent checks scores and answers; the scope filters (phase, status, judge) and the Nemotron-on-Nebius model chip get called out
- voiceover: "At any point, judges and organizers can chat across every project — by round, group or judge — to compare, dig in, or break a tie, with Nemotron doing the reading."
- duration: 10s
- transition_in: push-slide LEFT 0.5s
- status: animated
- src: compositions/frames/25-chat.html
- type: feature_showcase
- blueprint: compose
- asset_candidates: assets/tour/raw/chat.png — Judging › Chat (scope filters left; the question "Which project ranked first in the final panel, and what was its average final-panel score?", a "Checked scores" tool line and the answer; the input at the bottom; the model chip top right)
- focal: the conversation
- roles: screenshot in a tour-kit window · covers + crops to replay the exchange · kit callouts from shots.js (chat)
- sfx: none

narrativeRole: A research assistant over the whole event — for comparisons and tie-breaks.
keyMessage: Ask anything across every project; Nemotron on Nebius does the reading.

**On-screen copy (render verbatim):**
- Header (chapter 2): eyebrow `Judging <b>›</b> Chat` · title `Ask across every project.`
- Typed into the input: `Which project ranked first in the final panel?`
- Callouts (shots.js chat): callout 1 `Scope the question` → `1`; callout 2 `Answers from your data` → `2`; callout 3 `Nemotron on Nebius` → `3`

**Build notes:**
- Replay the exchange from the screenshot: cover the conversation area (the question bubble, the `Checked scores` line and the answer — find them in the screenshot, roughly page x 150–1300, y 150–470) with the chat's ground color at t=0, then reveal crops of each piece in order. Type the question into the input with `RK.type` in an overlay matched to the input's placeholder position and font (Geist Sans 15px); the typed text clears on send.
- Answer lines reveal top to bottom with a stepped clip (like streaming).

Scene 1 (0.0–1.0s): header rises (0.05); the window rises at 0.2s.
Scene 2 (1.0–4.0s): camera pushes onto the conversation + input at 0.9s (max 1.35); the question types 1.1–2.3s; send on 2.5s (the question bubble pops in, the input clears); `Checked scores` on 2.9s; the answer streams 3.25–3.9s.
Scene 3 (4.0–8.0s): camera pulls to the left filters at 4.0s — callout `Scope the question` on 4.5s; over to the answer — callout `Answers from your data` on 5.75s; up to the model chip — callout `Nemotron on Nebius` on 7.0s.
Scene 4 (8.0–10.0s): camera rests at 8.0s. Hold.

## Frame 26 — Set the prizes once

- scene: The Rewards screen: prize types — cash, credits, swag, passes, links — snap into the prize tiers; callouts on prizes by rank, the awards you pick and each winner's haul
- voiceover: "Prizes get messy — cash, credits, swag, event passes. Set them up once, and RoundOne keeps track of who gets what."
- duration: 8s
- transition_in: cut
- status: animated
- src: compositions/frames/26-rewards.html
- type: feature_showcase
- blueprint: compose
- asset_candidates: assets/tour/raw/rewards.png — Judging › Rewards (Prizes tab: Grand prize $5,000 cash + 100,000 API credits; Runners-up; Top 5 finalists 5,000 API credits · Swag pack · Conference pass; Most creative; Best demo; Best technical build)
- focal: the prize list
- roles: screenshot in a tour-kit window · film-style reward chips · kit callouts from shots.js (rewards)
- sfx: none

narrativeRole: The admin headache, handled.
keyMessage: Mixed rewards, set once, tracked for you.

**On-screen copy (render verbatim):**
- Header (chapter 3): eyebrow `Results <b>›</b> Rewards` · title `Set the prizes once.`
- Chips (film `rk-tag` pills with pixel icons, 20px/600): `Cash` (coin) · `Credits` (ticket) · `Swag` (gift) · `Pass` (tag) · `Link` (link)
- Callouts (shots.js rewards): callout 2 `Prizes by final rank` → `1`; callout 3 `Awards you pick` → `2`; callout 1 `Each winner's haul` → `3`

**Build notes:**
- Pixel-wipe reveal canvas on top (entered through a wipe): `RK.dither` reveal 0–0.4s, `#150C2E`, diagonal.
- The chips live in the window's `layer`: they fly in from beyond the window's right edge (page x ≈ 1500) along a gentle arc and land ON the prize rows (Grand prize row: Cash, Credits; Top 5 finalists row: Swag, Pass; Best technical build row: Link), then shrink to 70% and hold there as labels. 0.4s `power3.out` each.

Scene 1 (0.0–1.0s): tiles clear 0.0–0.4s; header rises at 0.4s; the window rises at 0.45s.
Scene 2 (1.0–2.75s): camera pushes onto the prize list at 0.9s (max 1.3); chips land on eighths 1.25–2.25s.
Scene 3 (2.75–5.75s): callout `Prizes by final rank` on 3.0s; `Awards you pick` on 4.0s (camera follows down); over to the right column — `Each winner's haul` on 5.25s.
Scene 4 (5.75–8.0s): camera rests at 6.0s. Hold.

## Frame 27 — Preview it. Perfect it.

- scene: The winner email being written and previewed: an editor panel types the intro while the real winner email preview sits beside it, scrolls to the rewards, and a test send goes out
- voiceover: "Write the winners' email, and preview it until it's right."
- duration: 6s
- transition_in: push-slide LEFT 0.5s
- status: animated
- src: compositions/frames/27-winner-email.html
- type: feature_showcase
- blueprint: compose
- asset_candidates: assets/tour/email-winner.png — the app's real winner email ("Congrats, Repo Whisperer!", 680 × 1356 css, 2×)
- focal: the preview
- roles: rebuilt editor panel (film-style) · email in a preview window
- sfx: none

narrativeRole: Winners hear the news the way you want it told.
keyMessage: Edit the winner email and see exactly what they'll get.

**On-screen copy (render verbatim):**
- Header (chapter 3): eyebrow `Results <b>›</b> Winner email` · title `Preview it. Perfect it.`
- Editor (`rk-mock`, frame x 120–740, y 230–860): label `Subject` → `Congrats — you placed at AI Agents Hack 2026` ; label `Intro` → types `Here's everything you've earned, and how to claim it.` ; label `Reply to` → `prizes@aiagentshack.dev` ; buttons `Send test` (pill, dark) and `Save` (ghost)
- Preview window: a `TK.mail`-style window at frame x 800–1800 with the tab row `Preview` · `Desktop` / `Mobile` (Desktop active) instead of an inbox header; after the send, a tag `Test sent to you` (`rk-tag--pass`) pops by the button

**Build notes:** build the preview with `TK.mail` (subject `Congrats, Repo Whisperer!`, from `AI Agents Hack 2026`, zoom 1.1, width 1000, x 800) — or a plain window with the email image — and scroll it with `TK.scroll`. Inputs styled like the app (white, 1px `#E6E1F0`, 10px radius, Geist Sans 20px in the film scale).

Scene 1 (0.0–1.0s): header rises (0.05); the editor rises at 0.2s, the preview at 0.35s.
Scene 2 (1.0–2.75s): the intro types 1.0–2.4s; a violet ring pulses once around the matching paragraph in the preview on 2.5s.
Scene 3 (2.75–4.25s): the preview scrolls to `Your rewards` (Grand prize · $5,000 for the team · $10,000 in Acme API credits…) 2.75–3.9s.
Scene 4 (4.25–6.0s): the cursor clicks `Send test` on 4.5s; `Test sent to you` pops on 4.75s. Hold.

## Frame 28 — Thank everyone who built

- scene: The thank-you email everyone else gets: their project, reviewed by 3 judges, how far it got, the winners — and a thank-you gift of credits for every team, which pops with a little pixel confetti
- voiceover: "And thank everyone who didn't place. Recognize their work, and send them something extra — so the goodwill keeps going."
- duration: 8s
- transition_in: push-slide LEFT 0.5s
- status: animated
- src: compositions/frames/28-thank-you.html
- type: feature_showcase
- blueprint: compose
- asset_candidates: assets/tour/email-thank-you.png — the app's real thank-you email ("Thank you for building Menu Mind", 680 × 2040 css, 2×)
- focal: the thank-you gift block
- roles: email in a tour-kit mail window · rings · pixel confetti
- sfx: none

narrativeRole: Every builder leaves feeling seen — and still building on your product.
keyMessage: An optional thank-you, with a bonus, for everyone who didn't win.

**On-screen copy:** Header (chapter 3): eyebrow `Results <b>›</b> Thank-you email` · title `Thank everyone who built.` · mail: subject `Thank you for building Menu Mind` · from `AI Agents Hack 2026` `hello@aiagentshack.dev` · to `Menu Mind team` · a small film tag beside the window, top right of it: `Optional` (`rk-tag--neutral`)

**Build notes:** `TK.mail(stage, {x: 330, y: 196, width: 1260, height: 900, zoom: 1.25, src: "assets/tour/email-thank-you.png", …})`. Rings (violet) drawn in the mail window's `layer` over email regions measured from the PNG. Confetti: `RK.confetti(clock, <a full-frame stage layer>, {x, y, start, count: 24, size: 10})` from the gift icon's frame position, after the scroll lands.

Scene 1 (0.0–1.0s): header rises (0.05); the mail window rises at 0.2s; the `Optional` tag pops on 0.75s.
Scene 2 (1.0–2.5s): ring on the `Your project · Menu Mind · Reviewed by 3 judges · Reached round 2 of 2` block on 1.25s (small push, max 1.2).
Scene 3 (2.5–4.0s): the email scrolls to `A thank-you gift` (2.5–3.7s).
Scene 4 (4.0–6.0s): ring on the gift block on 4.0s; pixel confetti bursts from the gift icon on 4.25s.
Scene 5 (6.0–8.0s): hold (the confetti settles out of frame by ~6.5s).

## Frame 29 — Winners, announced

- scene: The public winners page; the podium cards rise from the floor in steps, a crown pops over first place with a pixel confetti burst, and Share copies the link
- voiceover: "Then publish your winners."
- duration: 6s
- transition_in: zoom-through 0.4s
- status: animated
- src: compositions/frames/29-winners.html
- type: celebration
- blueprint: compose
- asset_candidates: assets/tour/raw/winners-page.png — the public winners page for Agent Hacks 2026 (pixel header; podium cards 2 Ledgerly · 1 Nightshift · 3 Judge Copilot; Share button top right)
- focal: the first-place card
- roles: screenshot in a tour-kit window · crops of the podium cards (animated) · crown + confetti from the film's winners frame
- sfx: none

narrativeRole: The payoff — the fun part the arcade layer was made for.
keyMessage: Winners, announced — one link to share.

**On-screen copy (render verbatim):** Header (chapter 3): eyebrow `Results <b>›</b> Winners page` · title `Winners, announced.` · after the click: a film tag `Link copied` (`rk-tag--pass`, link icon) by the Share button.

**Build notes:**
- Reuse the motion language of `compositions/frames/11-winners.html` (read it): bricks rising in `steps(5)`, the crown `RK.pop`, `RK.confetti` (count 38, size 14) and the Share click. Here they act on the real page: cover the three podium cards (find them in the screenshot; roughly page y 470–900) with the page ground, then raise crops of each card from 120px lower in `steps(5)` — 2nd on 0.75s, 1st on 1.0s, 3rd on 1.25s. Crown (the kit's `crown` icon, 44px, `#FBBF24`) pops above the 1st card on 1.5s with confetti from there.
- `url`: `roundone.dev/w/agent-hacks-2026`.

Scene 1 (0.0–0.75s): header rises (0.05); the window rises at 0.15s; camera eases toward the podium (max 1.2) at 0.5s.
Scene 2 (0.75–2.25s): the cards rise (0.75 / 1.0 / 1.25s); crown + confetti on 1.5s.
Scene 3 (2.25–4.0s): camera eases up toward Share at 2.25s; the page cursor clicks `Share` on 3.0s; `Link copied` pops on 3.25s.
Scene 4 (4.0–6.0s): camera rests at 4.0s; hold while the confetti clears.

## Frame 30 — Ready for round one?

- scene: The end card on the neon-floor pixel city: "Ready for round one?", the R1 lockup, an 8-bit Get started button pressed, roundone.dev, and the open-source / built-on credit line
- voiceover: "RoundOne. Open source, and ready for your next hackathon."
- duration: 6s
- transition_in: cut
- status: animated
- src: compositions/frames/30-end.html
- type: cta
- blueprint: cta-morph-press (Adapt)
- asset_candidates: assets/retro-footer.png; assets/roundone-r1-logo.png; assets/nvidia-logo-white.svg; assets/nebius-logo.svg
- focal: assets/roundone-r1-logo.png
- roles: retro-footer = background · roundone-r1-logo = cutout · nvidia / nebius = supporting (credit line)
- sfx: none

narrativeRole: Close on the arcade's own question and one action.
keyMessage: Ready for round one? Get started at roundone.dev.

**Start from `.hyperframes/carve/12-outro.orig.html`** (the film's old end card) — copy it, rename every `f12-` id to `f30-`, composition id / timeline key `30-end`, and change only the headline: `Ready for` / `round one?` (line 2 in `rk-sunset-text` with the hero glow). Keep everything else — lockup, `Get started` + `roundone.dev`, the credit line (`Open source · Self-hosted · Built on` [NVIDIA] `Nemotron` + [Nebius] `Token Factory`), the press on 3.5s, the dither reveal (entered through a wipe) and the timing. This is the final frame: a fade to black over the last 0.5s is allowed (fromTo on a full-frame black layer, opacity 0 → 1, 5.5–6.0s).
