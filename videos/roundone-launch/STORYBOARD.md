---
format: 1920x1080
duration: 66s
message: "RoundOne's NVIDIA Nemotron agent on Nebius checks every hackathon project, so human judges can focus on the ideas."
arc: Hook → Problem → Reveal → Mechanism (intake, agent, stack) → Humans decide → Audit → Rounds to winners → CTA
audience: Companies and DevRel teams that run hackathons, and the organizers and judges who run them
mode: autonomous
music: none
bpm: 120
beat_grid: "4/4 at 120 BPM — beat 0.5s, bar 2s; every frame starts on a bar line"
---

# RoundOne launch film — storyboard

Silent build (no narration, no music yet). The on-screen copy in each frame IS the film's voice. Every frame starts on a bar line of a 120 BPM grid so music can be laid in later; hits land on beats.

## Video direction

- **Look:** `frame.md` — clean Notion-style product film (paper ground, floating white cards, big confident Geist Pixel headlines, generous margins) with a retro-arcade play layer (pixel icons, pixel cursor, segmented health-bar meters, 8-bit buttons, stepped sprite motion, pixel confetti, dither wipes). Violet = the agent, magenta = humans, everywhere.
- **Grounds by frame:** art (retro-hero) 1, 4 · paper 2, 3, 5, 6, 8, 9, 10, 11 · night 7 · art (retro-footer) 12.
- **Motion grammar:** UI moves smoothly (`power3.out`, small rises); retro elements move in steps. Reveals land on the beat grid (0.5s beats, eighths allowed for pickups) and keep arriving across the whole frame; the last beat of each frame is a readable hold. No bounce on UI, no lazy breathing, no drift on content (the art backdrops may creep in scale very slightly).
- **Headline position (paper frames):** a consistent title band — eyebrow at x=120, y≈104; headline top at y≈140. Frame 8 centers its headline. Art/night frames center their type.
- **Held beats:** frame 4's lockup (last 2.5s), frame 8's split (last 1.5s) and frame 12's end card (last 2s) are deliberate holds.
- **Transitions (assembler-owned, not built in frames):** 1→2 push-slide UP (the sky scrolls away into the page) · 2→3, 8→9, 10→11 push-slide LEFT · 5→6, 9→10 zoom-through · 3→4, 4→5, 6→7, 7→8, 11→12 a **pixel-dither wipe**: an overlay covers the outgoing frame in night-purple Bayer tiles over its last 0.35s, then the incoming frame reveals itself from full night-purple tiles over its first 0.4s (frames 4, 5, 7, 8, 12 build that reveal themselves — see each block).
- **Negative list:** no "AI" purple-blue glow blobs or bokeh, no emoji, no invented metrics/testimonials, no scrollbars or browser chrome except the winners page's minimal header, no everything-at-once slide dumps, no floating screensaver motion.

## Frame 1 — Hook

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
- Headline, one line, three states swapped in place (`every` never moves): `Builds every repo.` → `Watches every demo.` → `Visits every live site.`
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
- Headline A: `Rounds that run themselves.` → Headline B (replaces A): `Every entrant hears back.`
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

## Frame 12 — Give your judges their attention back

- scene: Neon-floor pixel city; the closing line, the R1 lockup and an 8-bit Get started button that gets pressed
- voiceover: ""
- duration: 6s
- transition_in: cut
- status: animated
- src: compositions/frames/12-outro.html
- type: cta
- persuasion: Future pacing into a single action
- beat: motivation → urgency-to-act
- blueprint: cta-morph-press (Adapt)
- asset_candidates: assets/retro-footer.png — landing footer neon-floor pixel city; assets/roundone-r1-logo.png — RoundOne R1 app-icon logo; assets/nvidia-logo-white.svg — NVIDIA mark for night; assets/nebius-logo.svg — Nebius mark
- focal: assets/roundone-r1-logo.png
- roles: retro-footer = background (full-bleed; night scrim behind the type) · roundone-r1-logo = cutout (lockup mark) · nvidia-logo-white = supporting (credit line) · nebius-logo = supporting (credit line)
- sfx: none

narrativeRole: Close on the promise and one action, in the arcade's own language.
keyMessage: Give your judges their attention back. Get started.

Adapt: keep the identity → action walk with a human-aimed click on the CTA; the mark does not morph into the button — it sits above it, and the click is an 8-bit press.

**On-screen copy (render verbatim):**
- Headline (two lines, centered): `Give your judges their` / `attention back.` — `attention back.` in `rk-sunset-text` with the hero glow
- Lockup: `RoundOne`
- CTA: `Get started` (8-bit button with the arrow-right icon) and `roundone.dev`
- Credit line: `Open source · Self-hosted · Built on` [NVIDIA mark] `Nemotron` + [Nebius mark] `Token Factory`

**Build notes:**
- Layers: ground clip = `assets/retro-footer.png` full-bleed with a radial night scrim (`radial-gradient(ellipse 55% 45% at 50% 40%, rgba(21,12,46,0.72), rgba(21,12,46,0.35) 60%, transparent 85%)`) and a very slow push 1.00→1.03; a full-bleed canvas running `RK.dither(clock, canvas, {start: 0, dur: 0.4, mode: "reveal", color: "#150C2E", angle: "center"})`; then the stage.
- Headline: Geist Pixel 100px `on-dark`, centered, lines at top y≈150 and y≈262.
- Lockup: logo 104px (radius 24px) + `RoundOne` Geist Sans 700 60px `on-dark`, 24px gap, centered, top y≈430.
- CTA row centered at y≈600: a wrapper holding `rk-arcade` `Get started` + arrow-right icon (24px), then `roundone.dev` in Geist Mono 30px `on-dark` 36px to its right.
- Credit line: ui-sm 22px `on-dark-muted`, centered at y≈800, logos inline at 26px tall.
- Cursor: `RK.cursor` from (1500, 1000) → the button center by 3.4s; `RK.press` on the button at 3.5s plus `RK.click` with color `#FCD34D`.
- Pixel sparkles (as frame 1) blink on beats in the sky.

Scene 1 (0.0–1.5s): tiles clear 0.0–0.4s. `Give your judges their` rises in on 0.5s, `attention back.` on 1.0s.
Scene 2 (1.5–3.0s): the logo pops on 1.5s and `RoundOne` wipes in beside it; the CTA row rises in on 2.0s (button first, `roundone.dev` types in with `RK.type` from 2.25s, caret off after).
Scene 3 (3.0–4.0s): the cursor travels in from the bottom right and presses `Get started` on 3.5s — the 8-bit button drops onto its edge and pops back, a sunset pixel ripple steps out.
Scene 4 (4.0–6.0s): the credit line rises in on 4.0s. The cursor eases aside. Hold on the end card to the last frame.
