---
format: 1920x1080
duration: 30s
message: "RoundOne's agent does the slow checks on every hackathon project with Nebius, NVIDIA and Tavily, so human judging stays human."
arc: Hook → Problem → Reveal → Mechanism (the agent at the hub, each sponsor doing one job) → The human split → Hand-off to the demo
audience: The judges of the Nebius × NVIDIA Global AI Hackathon, then anyone who runs a hackathon
mode: autonomous
music: none
bpm: 120
beat_grid: "4/4 at 120 BPM — beat 0.5s, bar 2s; the ROUND 1 slam lands on 8.0 (the music drop)"
captions: skipped (no narration in this cut)
---

# RoundOne Devpost intro — storyboard

The animated opening of the Devpost demo video (the screenshot demo that follows is built elsewhere). No narration in this cut: the on-screen copy in each frame IS the voice, so every line meant to be read stays settled for at least 0.3s per word. The user's track is laid in after assembly by `kit/add-overlays.mjs` (conformed to 120 BPM, groove drop on 8.0), so `music: none` here.

## Video direction

- **Look:** `frame.md` — the launch film's look exactly: clean paper product frames (floating white `rk-mock` cards, big Geist Pixel headlines, generous margins) plus the retro-arcade layer (pixel icons, pixel cursor, segmented meters, 8-bit button, stepped sprite motion, dither wipes), with the synthwave pixel sky for the art frames. Violet = the agent, magenta = people, everywhere.
- **Grounds by frame:** 1 art → paper (one continuous scroll inside the frame) · 2 paper · 3 art (retro-hero) · 4 night (night-glow + stars) · 5 paper.
- **Pace:** "flash" — every frame keeps content arriving on the beat grid (0.5s beats, eighths for pickups) and ends on a short readable hold. No lazy drift, no bounce on UI.
- **Title band (paper frames):** eyebrow at x=120, y≈104 when used; headlines top-left at y≈140–260 or centered as the block says.
- **Transitions (not built in frames unless the block says so):** 1→2 hard cut on 3.0 · 2→3 pixel-dither wipe (an overlay covers frame 2 in night-purple Bayer tiles over 7.65–8.0; frame 3 reveals its own tiles over its first 0.4s) · 3→4 hard cut on 13.0 where the R1 logo does NOT move (numeric handoff below) · 4→5 pixel-dither wipe (overlay covers 22.15–22.5; frame 5 reveals its own tiles) · the overlay covers the final frame over 29.65–30.0 — the demo will reveal from those tiles.
- **Keep-out:** nothing below y=900 in any frame.
- **Negative list:** no "AI" glow blobs or bokeh, no emoji, no invented metrics or testimonials (illustrative UI text only, taken from the landing's own mocks), no browser chrome, no everything-at-once slide dumps, no floating screensaver motion.

## Frame 1 — Hi, judges

- scene: "Hi, judges." types over the pixel night sky, then the camera tilts down into the page where 1,500 sunset pixels flood in and "1,500+ projects" lands
- voiceover: ""
- duration: 3s
- transition_in: cut
- status: animated
- src: compositions/frames/01-hook.html
- type: hook
- persuasion: Direct address — the video is about the viewer's own pile
- beat: recognition → weight
- blueprint: typewriter-reveal (Adapt)
- rules: viewport-change
- asset_candidates: assets/retro-hero.png — landing hero pixel art, night sky over clouds (its bottom third fades to white)
- focal: the typed greeting, then the 1,500-pixel field
- roles: retro-hero = background (full-bleed, not dimmed; the landing's radial night scrim sits behind the type)
- sfx: none

narrativeRole: Speak straight to the judges watching, then show the size of their pile.
keyMessage: This hackathon has 1,500+ projects, and this video is one of them.

Adapt: keep the typewriter's typed line under a caret, then instead of a brand pop the camera tilts down into a data beat (the flood).

**On-screen copy (render verbatim):**
- Typed: `Hi, judges.`
- Eyebrow (paper section): `THIS HACKATHON`
- Stat: `1,500+` (count-up; the `+` pops after the count lands)
- Stat label: `projects`

**Build notes:**
- One `.world` wrapper 1920×2160 inside the frame, translated by the viewport-change recipe (never move the frame root). Section A (world y 0–1080): `assets/retro-hero.png` full-bleed (`object-fit: cover`) with a creeping push 1.00→1.03 on an inner wrapper, and the landing's radial night scrim centered at 50% 34% (`radial-gradient(ellipse 50% 42% at 50% 34%, rgba(24,8,48,0.78), rgba(24,8,48,0.45) 55%, transparent 82%)`). Section B (world y 1080–2160): the paper ground `#FAF8FF` + `rk-dotgrid`, with a 220px `#FFFFFF → #FAF8FF` fade at its top so the art's white cloud base melts into the paper (no visible seam).
- `Hi, judges.`: Geist Pixel Square 168px, `on-dark`, the landing hero glow (`filter: drop-shadow(0 2px 10px rgba(24,8,48,.85)) drop-shadow(0 0 2px rgba(24,8,48,.6))`), centered, top at y≈250 in section A. Type it with `RK.type` (cps ≈ 30 so it completes by ~0.45s) using the ghost-plus-typed-span grid trick from the launch hook so the centered line never shifts while typing. Five pixel sparkles (5×5 plus-shaped, 6px squares, `#FFFFFF` / `#FCD34D`) above y=520 blink on beats in section A.
- Section B layout (coordinates relative to section B's top): eyebrow `THIS HACKATHON` (`rk-eyebrow`) at (120, 150). The pixel field: `RK.pixelField(svg, {cols: 50, rows: 30, cell: 16, gap: 4, palette: ["#FCD34D","#FB923C","#F43F5E","#E11D8F","#A21CAF"], seed: 7})` → 996×596, placed at x=120, y=220 (bottom 816). Reveal it with a stepped `clip-path: inset(...)` sweep from the bottom-left corner toward the top-right (`steps(10)`), a flood, not a fade. Stat column: `1,500+` in Geist Pixel 210px `ink` (the `+` in `rk-sunset-text`), left-aligned at x=1210, top y≈360; `projects` Geist Sans 600 52px `muted` below it at y≈600. Right-align nothing past x=1800.
- Count-up with `RK.count` (from 0 to 1500, `steps: 12`, render with a thousands comma; build the display as `1,500` + a separate `+` span that pops after).

Scene 1 (0.0–1.2s): the sky is already there, creeping in. `Hi, judges.` types from 0.05s and completes by ~0.45s, caret blinking; sparkles blink on 0.5 and 1.0. The greeting holds to be read.
Scene 2 (1.2–1.7s): the camera tilts down — the `.world` translates y 0 → −1080 over 0.5s (`power3.inOut`) — the sky scrolls up out of frame and the paper page arrives.
Scene 3 (1.55–2.4s): the eyebrow rises in at 1.6s. The pixel field floods in (stepped clip sweep 1.6–2.3s) while `1,500` counts up alongside it (1.6–2.3s); on 2.35s the `+` pops (`RK.pop`) and `projects` rises in (16px, `power3.out`).
Scene 4 (2.4–3.0s): hold, readable. (Hard cut to frame 2 on 3.0.)

## Frame 2 — The slow part

- scene: A single project's checklist of slow checks, all still to do, while the pile of other projects grows behind it and "The idea" waits locked at the bottom
- voiceover: ""
- duration: 5s
- transition_in: cut
- status: animated
- src: compositions/frames/02-slow-part.html
- type: pain_point
- persuasion: Concrete tedium — the checks a judge must do before the idea
- beat: weight → frustration
- blueprint: overwhelm-surround (Adapt)
- asset_candidates:
- focal: the #042 Repo Whisperer checklist card
- roles: rebuilt UI and typography only (no image assets)
- sfx: none

narrativeRole: Make the slow part concrete: every project needs building and checking before anyone gets to the idea, and the pile keeps growing.
keyMessage: Every repo to build, every demo to check — then, the idea.

Adapt: keep "overwhelm by accumulation" (surfaces pile up around the focal card); instead of closing in on an avatar, the pile grows behind one card whose checks a lone cursor can't keep up with.

**On-screen copy (render verbatim):**
- Headline, three lines: `Every repo to build.` / `Every demo to check.` / `Then, the idea.` (line 3 in `rk-dusk-text`)
- Card header: mark `RW`, `Repo Whisperer`, `Project #042`, tag `to review`
- Rows (icon · text): gear · `Build the repo` · check-list · `Run the tests` · search · `Find the sponsor calls` · globe · `Check the live demo` · play · `Time the video`
- Last row (magenta, after a dashed divider): user · `The idea`, with a lock icon and the tag `waiting`
- Stack cards behind (header only, mark + name): `#043 Ledgerly` · `#044 Nightshift` · `#045 Cartographer` · `#046 Pocket QA` · `#047 Standup Bot` · `#048 Menu Mind`

**Build notes:**
- Ground: paper + `rk-dotgrid` on its own full-duration clip.
- Headline column: x=120, width 820. Geist Pixel Square 64px, `ink`, line tops at y=250, y=338, and y=470 for line 3 (the gap sets `Then, the idea.` apart). Each line rises 30px + fades in (`power3.out`, 0.5s).
- Main card: `rk-mock` at x=1000, y=190, width 740, height 640. Header row 96px: `rk-mark` `RW` 56px, `Repo Whisperer` 34px/600, `Project #042` ui-sm `muted`, `rk-tag rk-tag--neutral` `to review` at right. Rows 80px with `rk-row` dividers: `rk-tile` 48px holding the pixel icon, row text ui 27px/500, and at the right an empty 30px checkbox (2px `line` border, 6px radius) — the "to do" state. After row 5, a 2px dashed `line` divider, then row 6 in magenta: `rk-tile--human` with the user icon, `The idea` ui 27px/600 in `magenta`, and at the right a pixel lock icon + `rk-tag rk-tag--flag` `waiting`. Row 6 sits at 60% opacity until it arrives fully.
- Stack: six header-only `rk-mock` cards (740×110, same header styling, their own marks with 2-letter initials) sitting BEHIND the main card, each offset (+12px x, −12px y) × depth (1–6), opacity stepping 0.9 → 0.5 with depth. They pop in one by one (`RK.pop`, from 0.9) — only their top-right edges peek out above and to the right of the main card, a growing pile.
- Cursor: `RK.cursor` entering from the bottom-right; it clicks row 1's and row 2's checkboxes with `RK.click` (violet rings), and each clicked box fills with a violet pixel check (`RK.pop`).
- Row 1's checkbox is at about (1690, 326); row 2's about (1690, 406) — compute from your layout.

Scene 1 (0.0–1.0s): line 1 `Every repo to build.` rises at 0.1s; the main card rises in at 0.2s (40px, `power3.out`, 0.6s) with its header; rows 1–2 land at 0.5 / 0.7s (12px rise, stepped opacity).
Scene 2 (1.0–2.0s): line 2 `Every demo to check.` rises at 1.0s; rows 3–5 land at 1.1 / 1.3 / 1.5s. Stack cards 1–2 pop behind at 1.0 / 1.5s.
Scene 3 (2.0–3.5s): the cursor glides in (1.9–2.3s, `power3.inOut`) and ticks row 1 at 2.5s, then row 2 at 3.2s — slow, one box at a time — while stack cards 3–5 pop at 2.0 / 2.5 / 3.0s: the pile outgrows the ticks.
Scene 4 (3.5–5.0s): the dashed divider draws in steps and row 6 `The idea` arrives in magenta at 3.5s (lock + `waiting` pop); stack card 6 pops at 3.5s; line 3 `Then, the idea.` rises at 3.7s. Hold, readable, to the end (an overlay covers the frame over its last 0.35s — land nothing after 4.6s).

## Frame 3 — ROUND 1

- scene: The arcade "ROUND 1" slams onto the pixel sky on the music drop, condenses into the R1 logo, and RoundOne is introduced as open-source hackathon judging and management
- voiceover: ""
- duration: 5s
- transition_in: cut
- status: animated
- src: compositions/frames/03-round-one.html
- type: product_intro
- persuasion: Pattern interrupt, then the name and what it is
- beat: surprise → clarity
- blueprint: compose
- rules: kinetic-beat-slam, 3d-text-depth-layers
- asset_candidates: assets/retro-hero.png — landing hero pixel art sky; assets/roundone-r1-logo.png — RoundOne R1 app-icon logo
- focal: assets/roundone-r1-logo.png
- roles: retro-hero = background (full-bleed; the night scrim behind the type) · roundone-r1-logo = cutout (the lockup mark, then the agent hub in frame 4)
- handoff_out: roundone-r1-logo — center (960, 300), 170×170px, border-radius 38px, scale 1, opacity 1, static (no motion at the cut). Everything else in this frame disappears at the cut.
- sfx: none

narrativeRole: The drop. The product's name is an arcade callout — play it, then say plainly what RoundOne is.
keyMessage: RoundOne is open-source hackathon judging and management, and its agent takes round one.

**On-screen copy (render verbatim):**
- Slam: `ROUND 1`
- Wordmark: `RoundOne`
- Line (two lines, centered): `Open-source hackathon` / `judging & management` (line 2 in `rk-sunset-text` with the hero glow)
- Pill: `The agent takes round one.` (spark icon)

**Build notes:**
- Layers bottom→top: (1) ground clip: `assets/retro-hero.png` full-bleed with the landing night scrim, creeping push 1.00→1.03 over 5s; (2) a full-bleed `<canvas width=1920 height=1080>` running `RK.dither(clock, canvas, {start: 0, dur: 0.4, mode: "reveal", color: "#150C2E", angle: "center"})` — the frame opens fully covered in night-purple tiles and they clear from the center out; (3) the stage (one shake wrapper) with all type and the logo, above the tiles; a few pixel sparkles blinking on beats in the upper sky.
- `ROUND 1`: exactly the launch film's slam (see the reference frame): Geist Pixel Square ~230px, sunset gradient face, chunky 3D extrusion behind it per the 3d-text-depth-layers recipe (6 copies offset 5px right + 5px down, colors stepping `#E11D8F` → `#7A1655` → `#2E1658` → `#150C2E`), centered at y≈430, built from per-letter inline-blocks with a fixed advance (≈0.62em) so letters can move without measuring.
- The condense: O U N D and the space collapse (`scaleX` 1→0, `steps(3)`) while R slides right and 1 slides left until they meet centered as `R1`; then `R1` shrinks and flies to the logo spot — **center (960, 300)** — while `assets/roundone-r1-logo.png` (170px, radius 38px) pops in exactly there and the text fades under it.
- Lockup, all centered on x=960: logo center y=300 (top 215); `RoundOne` Geist Sans 700 76px `on-dark`, top y=410; the two-line line in Geist Pixel Square 68px, tops at y=540 and y=620 (`judging & management` sunset + glow); pill `rk-glass` with a darker fill (`rgba(21,12,46,0.55)`), 26px text + spark icon 22px, centered at y=790.
- The logo must end the frame exactly at the handoff values (center (960,300), 170px, opacity 1) and hold still from the moment it lands.

Scene 1 (0.0–1.25s): tiles clear 0.0–0.4s. `ROUND 1` slams exactly on 0.0s: scale 1.7→1, opacity 0→1, `steps(4)` over 0.2s (kinetic-beat-slam); `RK.shake` on the stage wrapper at 0.2s (amp 16, 0.35s). It holds, big and loud.
Scene 2 (1.25–1.75s): the condense — on 1.25s the middle letters collapse and R/1 slide together (0.25s, stepped); on 1.5s `R1` shrinks and flies to (960, 300) (`power3.inOut`, 0.25s).
Scene 3 (1.75–2.6s): on 1.75s the logo pops (`RK.pop`) exactly where `R1` arrived. `RoundOne` wipes in at 1.9s (clip reveal left→right, 0.3s). The line rises in: `Open-source hackathon` at 2.2s, `judging & management` at 2.35s (flicking to its gradient at 2.45s).
Scene 4 (2.6–5.0s): the pill rises in at 2.6s. Then a deliberate hold — the lockup reads still (only the sparkles blink). Hard cut to frame 4 on 5.0s with the logo unmoved.

## Frame 4 — The agent at work

- scene: Night. The R1 logo glides down to become the RoundOne agent's hub; a project card on the left, three sponsor stations on the right — Nebius Sandboxes, Tavily, NVIDIA Nemotron — light up in turn as the agent sends them work, then the project card flips to a verdict where every check passes
- voiceover: ""
- duration: 9.5s
- transition_in: cut
- status: animated
- src: compositions/frames/04-agent.html
- type: feature_showcase
- persuasion: Show the mechanism — each sponsor does one clear job
- beat: curiosity → confidence
- blueprint: agent-progress-theater (Adapt)
- rules: svg-path-draw
- asset_candidates: assets/roundone-r1-logo.png — R1 logo (the hub); assets/nebius-logo.svg — Nebius lime pill wordmark; assets/tavily-logo.png — Tavily wordmark "tavily by NEBIUS" in cream, made for dark grounds (362×109); assets/nvidia-logo-white.svg — NVIDIA eye + white wordmark for night
- focal: the R1 hub with its three stations
- roles: roundone-r1-logo = cutout (the hub) · nebius-logo / tavily-logo / nvidia-logo-white = supporting (station title marks)
- handoff_in: roundone-r1-logo — center (960, 300), 170×170px, border-radius 38px, scale 1, opacity 1, static at t=0 (it only starts moving at 0.15s).
- sfx: none

narrativeRole: The centerpiece — the RoundOne agent putting Nebius, Tavily and NVIDIA to work on one project, visibly.
keyMessage: Nebius Sandboxes run, test and search the code. Tavily reads the live web. NVIDIA Nemotron on Nebius Token Factory checks every claim.

Adapt: keep working-state theater → receipt (status lines swap while the machine works, then a checklist checks off and flips to done); the theater here is spatial — work visibly travels from the hub to each station and back, and the receipt is the project card flipping to its verdict.

**On-screen copy (render verbatim):**
- Eyebrow: `ROUND ONE · THE AGENT`
- Hub label: `ROUNDONE AGENT`
- Project card (front): mark `RW`, `Repo Whisperer`, `Project #042`; label `SUBMISSION`; chip rows: branch · `repo` · `github.com/…/repo-whisperer` — globe · `live demo` · `repo-whisperer.app` — play · `demo video` · `2:41`
- Station A: [Nebius mark] `Sandboxes` · verb `Runs, tests, searches code` · panel lines: `$ git clone …/repo-whisperer` · `$ pnpm test   ✓ 42 passed` · `$ grep tokenfactory.nebius.com  ✓`
- Station B: [Tavily mark] · verb `Reads the live web` · panel lines: `crawl repo-whisperer.app · 5 pages ✓` · `search "ask any codebase anything" · prior art ✓`
- Station C: [NVIDIA mark] `Nemotron` · verb `Checks every claim` · panel: `on Nebius Token Factory` then tier chips `Lightning` · `Super 120B` · `Ultra 550B`
- Project card (back, the verdict): `Agent review` + mono `nemotron-3-super`; rows (icon · text → `Pass`): gear `Builds` · check-list `Tests pass` · search `Calls Token Factory` · search `Uses an NVIDIA open model` · globe `Live demo up` · play `Video 2:41`; footer tag `Agent review done` (spark)

**Build notes:**
- Ground clip: `gradients.night-glow` from frame.md + an `rk-stars` layer (full duration). No dither canvas (this frame opens on a hard cut).
- The hub: `assets/roundone-r1-logo.png`, border-radius 38px at 170px. At t=0 it sits exactly at the handoff (center (960,300), 170px). It glides to center (960, 520) and scales to 150px (scale 0.882) over 0.15–0.75s (`power3.inOut`) and stays there. Hub label `ROUNDONE AGENT` (GeistMono 600 20px, 0.18em, `on-dark-muted`) centered at y=612, fading up at 0.7s.
- Eyebrow `ROUND ONE · THE AGENT` (`rk-eyebrow rk-eyebrow--dark`) at (120, 96).
- Project card: white `rk-mock` x=120, y=230, width 470, height 580. Front face: header (`rk-mark` `RW` 56px, `Repo Whisperer` 32px/600, `Project #042` ui-sm `muted`), label `SUBMISSION` (GeistMono 600 18px 0.18em `faint`), three chip rows 72px (tint fill `rgba(109,40,217,0.045)`, 14px radius, pixel icon in violet, a label word ui 24px/600, and the value in GeistMono 18px `muted`). Back face: header `Agent review` 32px/600 + mono `nemotron-3-super` (`faint`); six rows 58px (pixel icon violet 20px, text ui 21px/500, a right slot where `rk-tag rk-tag--pass` `Pass` with a check icon pops); footer `rk-tag rk-tag--agent` (spark) `Agent review done`. The flip: two stepped halves — rotateY 0→90° on the front (`steps(4)`, 0.18s), swap faces, back from −90°→0° (`steps(4)`, 0.18s). Use `perspective` on the card's parent; no CSS transforms on the tweened elements.
- Stations: three `rk-night-card`s at x=1200, width 600, height 230, tops y=150 / 410 / 670 (all bottoms ≤ 900). Padding 26px. Row 1: the mark (Nebius svg 30px tall + `Sandboxes`; Tavily png 40px tall alone; NVIDIA svg 28px tall + `Nemotron`) with names in Geist Sans 600 30px `on-dark`. Row 2: the verb in Geist Pixel Square 32px — `on-dark-muted` while dim, flicking to `rk-sunset-text` when lit. Row 3: the panel, GeistMono 18px, 26px line height: `$` and tool words in `#F0ABFC`, commands `#F7F2FF`, `✓` `#FCD34D`, other text `#B9ABD9`. Station C's tier chips: small pills (6px 14px, 18px/600 text, 999px radius) that start dim (`rgba(255,255,255,0.06)` fill, `#B9ABD9` text) and power up in steps to lit (`rgba(124,58,237,0.35)` fill, `#F7F2FF` text); `Ultra 550B` also gets a soft sunset glow behind it when lit (a radial `rgba(251,122,60,0.35)` layer fading in — no pulsing). Station B also shows five tiny page thumbnails (28×20 white-10% rects with two 2px lines) in a row after its first panel line.
- Dim vs lit stations: dim = opacity 0.4; lit = opacity 1 plus a 2px violet border glow (`box-shadow: 0 0 0 2px rgba(124,58,237,0.7), 0 20px 60px -20px rgba(124,58,237,0.6)`), switched in 2 steps.
- Connectors (svg-path-draw, stepped): one SVG over the whole frame, pixel "circuit" paths with 4px strokes dashed `4 6`: card→hub: (590, 520) → (885, 520); hub→A: (1035, 520) → (1110, 520) → (1110, 265) → (1200, 265); hub→B: (1035, 520) → (1200, 525); hub→C: (1035, 520) → (1110, 520) → (1110, 785) → (1200, 785). Dim stroke `rgba(185,171,217,0.25)`; the active path switches to `#F0ABFC`.
- Packets: 12px squares (sunset colors) that travel along a path with keyframed x/y (linear per segment) to show work moving; a packet disappears into its target.
- Text panels type in with `RK.type` (cps ≈ 70, caret off 0.3s after); the `✓` marks pop (`RK.pop`).

Scene 1 (0.0–1.0s): the logo holds at the handoff, then glides to the hub spot (0.15–0.75s). Eyebrow at 0.3s. The project card slides in from x−80 at 0.35s (`power3.out`, 0.6s). The three stations rise in dim (24px, opacity 0→0.4) at 0.5 / 0.6 / 0.7s. The connectors draw in dim, in steps, 0.75–1.0s. Hub label at 0.7s.
Scene 2 (1.0–3.5s) — Nebius Sandboxes: on 1.0s the card's `repo` chip gets a violet outline, the card→hub and hub→A paths light, and a packet travels card → hub → station A (1.0–1.5s). Station A lights on 1.5s (verb flicks to the gradient). Its panel lines type at 1.7 / 2.2 / 2.7s, their `✓`s popping as each line completes.
Scene 3 (3.5–5.8s) — Tavily: on 3.5s the `live demo` chip outlines, card→hub and hub→B light, a packet travels card → hub → B (3.5–4.0s). Station B lights on 4.0s. Panel line 1 types at 4.2s, the five page thumbnails pop on eighths 4.55–5.05s, line 2 types at 5.15s.
Scene 4 (5.8–9.5s) — NVIDIA Nemotron on Nebius Token Factory: on 5.8s the `demo video` chip outlines too; two packets travel from A and from B back to the hub (5.8–6.1s), then hub → C (6.1–6.4s) with that path lit. Station C lights on 6.4s; `on Nebius Token Factory` types at 6.45s; the tier chips power up on 6.55 / 6.7 / 6.85s (`Ultra 550B` glow blooms at 6.9s). A packet returns C → hub → card (6.9–7.3s). The card flips to the verdict at 7.3–7.66s. The six rows turn `Pass` at 7.7 / 7.85 / 8.0 / 8.15 / 8.3 / 8.45s (`RK.pop`), and `Agent review done` pops at 8.6s. Hold, everything lit (an overlay covers the frame over its last 0.35s).

## Frame 5 — Keep human judging human

- scene: Two cards open like a book — what AI judges (the code, classifying, summaries) and what people judge (novelty, creativity, the idea) — under "Keep human judging human."; then the cards step away, an 8-bit "How it works" button rises and a pixel cursor presses it
- voiceover: ""
- duration: 7.5s
- transition_in: cut
- status: animated
- src: compositions/frames/05-keep-human.html
- type: benefit_highlight
- persuasion: The split of labor — the agent guides, people decide
- beat: relief → curiosity
- blueprint: comparison-split (Adapt)
- rules: split-tilt-cards
- asset_candidates:
- focal: the two split cards, then the arcade button
- roles: rebuilt UI and typography only (no image assets)
- sfx: none

narrativeRole: The stance in one picture — AI judges the code, classifies and summarizes; the human part of judging stays human. Then hand off to the demo.
keyMessage: Keep human judging human.

Adapt: keep the mirrored book-open entrance and the inner-edge badge pops; then, as the final frame, clear the split and end on a cta-morph-press style click on an 8-bit button.

**On-screen copy (render verbatim):**
- Headline (one line, centered): `Keep human judging human.` (the final `human.` in `rk-dusk-text`)
- Left card title: `AI judges` (spark tile); items (icon · label · note): code · `The code` · `builds, tests, sponsor calls` — tag · `Classifying` · `which projects are alike` — notebook · `Summaries` · `what each one is, how it did`
- Right card title: `People judge` (users tile, dusk); items, each with the tag `Human only`: `Novelty` · `Creativity` · `The idea`
- Badges: left card `the slow part` (spark, agent tone) · right card `the final call` (user, flag tone)
- Button: `How it works` with a pixel arrow-right icon

**Build notes:**
- Layers: ground clip (paper + `rk-dotgrid`) → stage → a full-bleed canvas ON TOP running `RK.dither(clock, canvas, {start: 0, dur: 0.4, mode: "reveal", color: "#150C2E", angle: "diagonal"})` (the frame opens fully covered and clears).
- Headline: Geist Pixel Square 92px `ink`, centered, top y=120.
- Cards per the split-tilt-cards recipe (mirrored rotateY entrance): left x=160, right x=1000, both y=300, width 760, height 500 (bottom 800), gap 80. Left: `rk-mock` with `background: #FBF9FF`; title row: `rk-tile` (spark) 56px + `AI judges` Geist Pixel 48px `ink`. Right: white `rk-mock` with the dusk hairline across its top edge (2px dusk gradient, inset 36px) and a magenta-tinted shadow (`0 32px 86px -32px rgba(232,49,143,.35)`); title row: a 56px dusk-gradient tile (users icon, white) + `People judge` Geist Pixel 48px `ink`.
- Items, three per card, starting 140px below the card top, 96px apart. Left items: `rk-tile` 44px (violet icon) + label ui 30px/600 `ink` + note ui-sm 20px `muted` under the label. Right items: label ui 30px/600 `ink` + `rk-tag rk-tag--human` `Human only` right-aligned.
- Badges (spring-pop on the INNER edges, staggered so they never collide): left badge centered on the left card's right edge (x=920) at y=470; right badge centered on the right card's left edge (x=1000) at y=660. `rk-tag rk-tag--agent` (spark) `the slow part` and `rk-tag rk-tag--flag` (user) `the final call`, scaled to 24px text.
- Button: `rk-arcade` (the landing's 8-bit button) with Geist Pixel 44px label `How it works` + a 28px pixel arrow-right, centered at (960, 500), on its own entrance wrapper (the kit owns the button's own transform for `RK.press`). Cursor: `RK.cursor` + `RK.click` (violet rings) + `RK.press(clock, button, t)`.
- This is the final frame: exits are allowed here.

Scene 1 (0.0–1.2s): tiles clear 0.0–0.4s; the headline rises in at 0.4s (30px, `power3.out`). On 0.6s both cards enter from opposite wings with mirrored rotateY tilts (left from −14°, right from +14°, x ±120px), settling flat by 1.1s.
Scene 2 (1.2–2.3s): items tick in — left at 1.2 / 1.45 / 1.7s (tile `RK.pop`, text rises 10px), right at 1.35 / 1.6 / 1.85s with their `Human only` tags popping 0.1s after each.
Scene 3 (2.3–4.8s): badges spring-pop at 2.3s (left) and 2.6s (right) with `RK.pop`. Then a readable hold to 4.8s.
Scene 4 (4.8–5.5s): the headline and both cards step down and out together (y +50, opacity → 0, `steps(4)`, 0.3s, 4.8–5.1s). On 5.1s the arcade button rises into the center (40px rise, `power3.out`, 0.35s).
Scene 5 (5.5–7.5s): the pixel cursor enters from (1500, 940) at 5.5s and glides to the button's right half (about (1120, 520)) by 6.1s (`power3.inOut`); on 6.5s it clicks (`RK.click`) and the button presses (`RK.press`). Hold on the pressed-and-released button; an overlay covers the frame over its last 0.35s, and the app demo will reveal from those tiles.

## Review round 1 — 2026-09-30 (as rendered)

What changed between the frame workers' output and `renders/video.mp4` (30.0s, 900 frames):

- Element ids and classes in every frame now use a letter-first prefix (`f01-hook-…` … `f05-keep-human-…`); composition ids and timeline keys are unchanged. Digit-first ids broke `getElementById` lookups built from a bare frame-name constant (frames 1 and 5 threw at runtime).
- 04-agent: the card flip shows a face with `visibility: inherit`, never `visible` — an explicit `visible` escaped the frame host's gating and left the verdict face on screen during frame 5.
- `compositions/pixel-wipes.html`: the wipe canvas is `visibility: hidden` between wipes (it's transparent then), so layout audits don't read it as covering every frame.
- 02-slow-part: the six peeking stack cards carry `data-layout-ignore` (intentional layering; their text is never visible).
- 05-keep-human: the "How it works" arcade button is 58px (was 44px) so it holds the empty page.
- Checks: lint 0 errors; check passed (runtime 0, layout 0 errors / 3 connector_orphan false positives, motion 0, contrast 71/71). Audio: −17.3 LUFS integrated, music fades over the last 1.2s (remove `FADE_OUT` in `kit/add-overlays.mjs` when the demo is cut on after 30.0).
- Poster: 21.97s (frame 659) — every station lit, the verdict all Pass — baked in as frame 0 of `../../brag-output-2026-09-29-230353/brag.mp4`.
