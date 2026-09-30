# Frame packet: 02-slow-part

## Project inputs

- Project: /Users/dylanjones/apps/judge-agent-nebius/videos/roundone-devpost
- Design tokens: /Users/dylanjones/apps/judge-agent-nebius/videos/roundone-devpost/frame.md
- RULES_DIR: /Users/dylanjones/.claude/skills/hyperframes-animation/rules

## Assigned storyboard block

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

## Selected blueprint: overwhelm-surround

# overwhelm-surround — Overwhelm / Close-In

**intent**: Convey overwhelm by accumulation. Recognizable subjects assemble, density markers scatter in to amplify "look how much," then the central subject morphs into the viewer's own avatar and elements close in from ALL sides — the frame feels surrounded, not zoomed-into. The emotional arc is recognition → claustrophobia.

**roles served**

- Problem (from `problem-mockup-overwhelm`): when the problem beat must first show "too many tools / too much surface area" and then put **the viewer inside it** — a literal swap of subject (product → person) followed by a closing-in that feels invasive. Reach for it when the pain is "you're buried," not "this metric is bad" (that's `dataviz-countup`).
- Problem (from `desktop-clutter-accumulation`): when the overwhelm is a **workspace**, not a tool
  count — live windows, stickies, and alert toasts pile up until the frame is chaotically full, and
  the beat resolves not by closing in but by shoving the clutter aside and asking the question.
  Reach for this variant when the pain lands on words ("how can you X… when you spend months on
  Y?"), not on a surrounded avatar.

**duration**: 6–9s (clutter-shove-to-question variant ~10s)

**shot structure** (a `[bg]` canvas; recognizable surfaces first, the viewer's avatar revealed underneath, then a radial crowd)

- **Scene 1 (0.0–~1.6s) — recognizable assembly.** Three `[product mockups / surfaces]` assemble into something the viewer knows — staggered scale-in, the **center** one full-size, the two flanks smaller (~0.86). Each rides a low-amplitude float so they feel like live context, not a static collage. Camera static.
- **Scene 2 (~1.6–3.0s) — density amplifies.** `[platform icons / logos]` scatter in around the mockups (staggered), used purely as **density markers** — "look how much surface area," not animated dials.
- **Scene 3 (~3.0–4.6s) — the morph (signature move).** The CENTER mockup MORPHS: its content fades out, the container reshapes, and the viewer's `[avatar]` is revealed **underneath** — a literal swap of subject, product → person.
- **Scene 4 (~4.6–end) — close-in.** `[task bubbles / demands]` close in from ALL sides toward the avatar (radial staggered entry). The avatar **stays put** while the bubbles invade — the claustrophobia comes from being surrounded, never from a camera push. Holds on the crowded state.
- **Variant — clutter-shove-to-question** (replaces Scenes 3–4 and
  inverts the camera contract — see modifier): accumulation runs under a **slow steady zoom-out** —
  `[sticky notes]` bounce in springy, `[dashboard / editor windows]` pop and slide up, a stack of
  `[alert toasts]` slides in at one edge, inner content keeps typing / log-scrolling as live density,
  windows overlap until the frame is chaotically full. The camera then REVERSES into a quick
  push-in that **shoves the clutter to the frame edges**, opening central negative space where a
  `[two-part serif question]` builds word-by-word (line 1 swaps in place to line 2); a `[cursor]`
  glides in from off-frame and comes to rest under the text; a very slow forward creep and hold.
  No morph, no avatar — the question is the payoff.

**motion vocabulary**: staggered scale-in assembly; resting-scale-preserving low float; density-marker icon scatter; content-fade → container-reshape → reveal-anchor-beneath morph; radial close-in entry from all compass points; held crowded end-state. Clutter-shove variant: slow steady zoom-out under accumulation; reverse quick push-in; clutter
shoved to frame edges opening center negative space; continuous live typing / log scroll inside
windows as ambient density; toast-stack slide-in; word-by-word serif build with in-place line swap;
cursor glide-to-rest; very slow forward creep + hold.

**rule mapping**

- staggered mockup + icon entries (smooth settle onto their resting scale) → `spring-pop-entrance` (smooth-settle register) backed by `gsap-effects`
- platform icons as density markers (positions pre-baked, scale/opacity only — NOT internal-parts animation) → `svg-icon-enrichment` (its DOM contract only)
- center mockup → avatar morph (HF forbids `width`/`height` tweens → drive the reshape on `scaleX`/`scaleY`, anchor = the avatar layer rendered beneath) → `card-morph-anchor`
- radial bubble close-in (positions baked once via `cos`/`sin`, staggered entry) → `gsap-effects` (radial layout) + `spring-pop-entrance` (per-bubble arrival)
- low-amplitude float on background mockups/icons → `sine-wave-loop` (low-amplitude register — subtle jitter that composes onto each element's resting scale, never a `fromTo` yoyo that re-tweens to its start)
- (variant) zoom-out under accumulation → quick push-in → slow forward creep → `multi-phase-camera`
  (pull-back / push / drift as sequential phases on one world wrapper; counter-translate math in
  `viewport-change`)
- (variant) clutter shoved to the edges as the push-in lands → `center-outward-expansion` (outward
  vectors to edge resting positions), fired at the same timeline position as the camera push so the
  shove reads as CAUSED by it (`reactive-displacement` register)
- (variant) word-by-word serif question build → `gsap-effects` (staggered word reveal); the
  in-place line-1 → line-2 swap → `discrete-text-sequence`
- (variant) live typing inside windows → `gsap-effects` (typewriter); the continuous inner
  log-scroll — composition: looping content translateY via `gsap-effects` (masked)
- (variant) cursor glide-in coming to rest → `cursor-click-ripple` (approach portion only — no click)

**camera modifier**: camera-static — the close-in must read as the world crowding the subject, so the frame holds; a push-in would convert "surrounded" into "zoomed-into" and kill the claustrophobia. The clutter-shove-to-question variant is the sanctioned exception: there the camera IS the
storyteller (zoom-out ↔ push-in via `multi-phase-camera`), and the claustrophobia comes from
accumulation, not surround — never mix the two resolutions in one shot.
