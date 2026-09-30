---
version: alpha
name: RoundOne — Frame (video / frame layer)
description: >
  RoundOne's landing page at frame scale. Clean like a Notion product film — a pale paper ground,
  floating white product cards with a soft violet lift, big confident headlines and lots of air —
  with a playful retro-arcade layer on top: Geist Pixel headlines, the app's own 24×24 pixel icons,
  a pixel cursor, segmented health-bar meters, 8-bit buttons, stepped (sprite-like) motion, and the
  synthwave pixel-art sky for the bookends. Adapted from the blue-professional preset's restraint
  (one ground, tinted cards, pill chrome) and remapped by hand to the brand's real tokens.
unit: the frame — 1920×1080 only
principle: clean first, playful second · every token from the landing CSS · one idea per frame

colors:
  paper: "#FAF8FF"           # the default frame ground (white + the landing's 4.5% violet tint)
  card: "#FFFFFF"            # every product card / mock surface
  ink: "#1D1433"             # headlines + primary UI text (landing --silver)
  muted: "#564B70"           # secondary text (landing --muted)
  faint: "#8A80A3"           # tertiary text, mono metadata (landing --faint) — never for text under 22px on paper
  line: "rgba(46,22,88,0.2)"       # borders that must be seen
  line-soft: "rgba(46,22,88,0.1)"  # hairlines, row dividers
  tint: "rgba(109,40,217,0.045)"   # tinted panels
  tint-strong: "rgba(109,40,217,0.09)" # empty meter segments, neutral tags
  violet: "#7C3AED"          # the AGENT's color — agent tags, eyebrows, icon tiles, links
  violet-soft: "#EDE5FF"     # agent tag / icon tile fill
  magenta: "#E8318F"         # the HUMAN / judge color — judge tags, judge dots, flags
  magenta-soft: "#FFE4F1"    # human tag fill
  orange: "#FB7A3C"
  sun: "#FBBF24"
  pass: "#0F9D6B"            # Pass tags, check marks
  pass-soft: "#DCF7EC"
  warn: "#C2410C"            # gate / must-pass tags
  warn-soft: "#FFEDD5"
  night: "#150C2E"           # night ground (landing --screen-deep)
  night-2: "#2E1658"         # night card edge / deep purple
  on-dark: "#F7F2FF"         # text on night
  on-dark-muted: "#B9ABD9"   # secondary text on night
  pink-on-dark: "#F0ABFC"    # eyebrows on night
  nvidia-green: "#76B900"    # only inside the NVIDIA mark
  nebius-lime: "#E0FF4F"     # only inside the Nebius mark

gradients:
  sunset: "linear-gradient(180deg, #FCD34D 0%, #FB923C 38%, #F43F5E 70%, #E11D8F 100%)"   # hero words, podium, confetti palette
  dusk: "linear-gradient(95deg, #7C3AED 0%, #D946EF 45%, #FB7A3C 100%)"                  # meters, project marks, human card edge, connectors
  night-glow: "radial-gradient(ellipse 70% 55% at 50% 118%, rgba(251,122,60,0.42), transparent 70%), radial-gradient(ellipse 90% 70% at 50% 110%, rgba(217,70,239,0.3), transparent 72%), #150C2E"
  sun-button: "repeating-linear-gradient(to bottom, transparent 0 5px, rgba(255,255,255,0.24) 5px 7px), linear-gradient(180deg, #FDE047 0%, #FB923C 42%, #F43F5E 80%, #E11D8F 100%)"

radii:
  card: "28px"
  card-sm: "20px"
  row: "14px"
  tile: "14px"
  pill: "999px"
  pixel: "0px"

typography:
  display-xl: { fontFamily: "GeistPixelSquare", px: 132, weight: 500, lineHeight: 1.02, color: "ink" }
  display-l:  { fontFamily: "GeistPixelSquare", px: 92,  weight: 500, lineHeight: 1.06, color: "ink" }
  display-m:  { fontFamily: "GeistPixelSquare", px: 60,  weight: 500, lineHeight: 1.05, color: "ink" }
  stat:       { fontFamily: "GeistPixelSquare", px: 120, weight: 500, lineHeight: 1.0,  color: "ink" }
  title:      { fontFamily: "GeistSans", px: 36, weight: 600, lineHeight: 1.2, color: "ink" }
  ui:         { fontFamily: "GeistSans", px: 27, weight: 500, lineHeight: 1.3, color: "ink" }
  ui-sm:      { fontFamily: "GeistSans", px: 22, weight: 400, lineHeight: 1.35, color: "muted" }
  tag:        { fontFamily: "GeistSans", px: 19, weight: 600, lineHeight: 1.0, color: "by tone" }
  eyebrow:    { fontFamily: "GeistMono", px: 20, weight: 600, tracking: "0.2em", upper: true, color: "violet" }
  mono:       { fontFamily: "GeistMono", px: 22, weight: 400, lineHeight: 1.55, color: "muted" }

spacing:
  safe-x: "120px"            # left/right margin for headlines and cards
  top: "96px"                # headline band starts here
  keep-out-y: "900px"        # nothing below y=900 (bottom band reserved, captions disabled but keep it clean)
  ui-scale: "1.8×"           # the landing mocks are authored at web size; rebuild them at 1.8× (1rem → 28.8px)

components:
  mock-card: "class rk-mock — white, 1px line-soft border, 28px radius, soft violet lift shadow"
  tag: "class rk-tag + rk-tag--pass|gate|agent|human|flag|neutral — pill, 19px/600, 9px pixel icon optional"
  meter: "class rk-meter — N segmented bars (health-bar), filled segments blend violet→magenta"
  face: "class rk-face rk-face--0|1|2 — gradient circle with initials (judges)"
  project-mark: "class rk-mark — dusk-gradient rounded square with 2-letter initials"
  icon-tile: "class rk-tile (agent) / rk-tile--human — rounded square holding a pixel icon"
  eyebrow: "class rk-eyebrow — mono uppercase 0.2em violet (rk-eyebrow--dark on night)"
  display: "class rk-display — Geist Pixel Square headline face"
  gradient-text: "class rk-sunset-text / rk-dusk-text — background-clip text"
  arcade-button: "class rk-arcade (+ --light / --night / --sm) — 8-bit notched button, sunset stripes"
  pill-button: "class rk-pill (+ --sun / --dark / --ghost / --glass)"
  night-card: "class rk-night-card — translucent card on night"
  glass-pill: "class rk-glass — the hero chip: white/10 fill, white/20 border, blur"
  pixel-cursor: "RK.cursor() — the pixel arrow pointer; click with RK.click()"
  pixel-icon: "RK.icon(name, size) or <span data-rk-icon='check' data-size='20'></span> + RK.hydrate(root)"
---

# RoundOne — Frame (video / frame layer)

## Read first

This spec is the look for every frame of the RoundOne launch film. The frontmatter is normative: quote hex values, fonts and sizes from it. The shared runtime `assets/retro-kit.js` ships every component class below plus deterministic helpers (pixel icons, cursor, clicks, dither, confetti, count-ups, typing, pixel fields, the pixel funnel). **Use the kit instead of hand-rolling these** so all twelve frames match.

## Overview

Two registers, one film:

- **Clean (the base).** Pale paper ground (`paper`), white product cards (`rk-mock`) floating with a soft violet lift, near-black ink headlines, generous margins, one idea per frame. Real product UI rebuilt faithfully (same copy, same tags, same meters as the app). The camera is calm: smooth long-tail settles (`power3.out`), no wobble.
- **Retro-arcade (the play layer).** Headlines in **Geist Pixel Square**. The app's own **pixel icons**. A **pixel cursor** that clicks with a stepped pixel ripple. **Segmented meters** that fill like health/XP bars. **8-bit buttons.** Pixel pops, pixel confetti, and dither dissolves. Retro elements move in **steps** (GSAP `steps(n)` ease) — like sprites — while the clean UI moves smoothly. That contrast *is* the style.

Reference points: a Notion feature film for the pacing, space and UI-first framing; a 16-bit arcade game for the accents. Failure looks like a dark "AI" gradient deck, a busy dashboard, or a pixel-art parody that buries the product.

## Grounds (pick one per frame)

1. **Paper** — `paper` (#FAF8FF) plus a faint pixel dot grid: `background-image: radial-gradient(circle at 1px 1px, rgba(124,58,237,0.10) 1.4px, transparent 1.6px); background-size: 32px 32px;` Default for product frames.
2. **Night** — `gradients.night-glow` plus the star layer (class `rk-stars`). For the open-stack frame.
3. **Art** — the real landing pixel art, full-bleed, `object-fit: cover`: `assets/retro-hero.png` (sky over clouds; its bottom third fades to white) or `assets/retro-footer.png` (neon grid floor). Put a radial night scrim behind text, as the landing does: `radial-gradient(ellipse 50% 42% at 50% 34%, rgba(24,8,48,0.78), rgba(24,8,48,0.45) 55%, transparent 82%)`.

The ground is its own full-duration `class="clip"` layer on the lowest track — never a background on `#root`.

## Typography

- **Headlines are Geist Pixel Square** (`display-*`), ink on paper, `on-dark` on night/art. Sentence case. One emphasized phrase may take `rk-sunset-text` (on dark) or `rk-dusk-text` (on paper) — never a whole headline.
- **UI is Geist Sans** at 1.8× the landing sizes (`title` 36 / `ui` 27 / `ui-sm` 22 / `tag` 19).
- **Mono (Geist Mono)** for eyebrows, traces, metadata, numbers-as-texture.
- **Legibility floor:** nothing meant to be read is under 19px; `faint` only for ≥22px metadata.
- A headline holds long enough to read: at least 0.3s per word after it has fully landed.
- Headlines never wrap into more than 2 lines; set `max-width` and let them wrap naturally (no `<br>` except deliberate one-word-per-line display titles).

### Font loading — paste into every frame's `<style>` (inside the `<template>`)

```css
@font-face{font-family:"GeistPixelSquare";font-weight:500;font-style:normal;font-display:block;src:url("assets/fonts/GeistPixelSquare.woff2") format("woff2");}
@font-face{font-family:"GeistSans";font-weight:100 900;font-style:normal;font-display:block;src:url("assets/fonts/GeistSans-Variable.woff2") format("woff2");}
@font-face{font-family:"GeistMono";font-weight:100 900;font-style:normal;font-display:block;src:url("assets/fonts/GeistMono-Variable.woff2") format("woff2");}
```

## The retro kit — `assets/retro-kit.js`

Load it inside the template, after GSAP and before your frame script:

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<script src="assets/retro-kit.js"></script>
```

It injects the component CSS once (all classes are `rk-*`) and exposes `window.RK`. Everything is deterministic and seek-safe.

**Component classes** (markup you write; styles come from the kit):

| Class | What it is |
| --- | --- |
| `rk-mock` | White product card: 1px `line-soft` border, 28px radius, `0 2px 4px rgba(46,22,88,.05), 0 32px 86px -32px rgba(76,29,149,.28)` |
| `rk-tag` + `rk-tag--pass / --gate / --agent / --human / --flag / --neutral` | Status pill, 19px/600. pass = green on `pass-soft`, gate = `warn` on `warn-soft`, agent = violet on `violet-soft`, human = dashed `line` border + muted, flag = magenta on `magenta-soft`, neutral = muted on `tint-strong`. Put an icon span inside for a pixel icon. |
| `rk-meter` | Segmented health bar: a flex row of `<i>` segments (6px gap, 10px tall, 3px radius). Add class `on` to a segment to fill it; the kit colors filled segments violet→magenta across the bar. `RK.meter(el, count)` builds the segments; `RK.fillMeter(clock, el, {to, start, dur})` fills them in steps. |
| `rk-face rk-face--0/1/2` | Judge avatar: gradient circle (violet / pink / orange), white initials, white ring. Set size with width/height + font-size. |
| `rk-mark` | Project mark: dusk-gradient rounded square, white bold initials. |
| `rk-tile` / `rk-tile--human` | 56px icon tile: violet on `violet-soft` (agent) / dashed border muted (human). |
| `rk-eyebrow` / `rk-eyebrow--dark` | Mono uppercase eyebrow, violet / `pink-on-dark`. |
| `rk-display` | Geist Pixel Square. |
| `rk-sunset-text` / `rk-dusk-text` | Gradient text fills. |
| `rk-arcade` (+ `--light`, `--night`, `--sm`) | The landing's 8-bit button: notched pixel outline from box-shadows, sunset stripes, hard bottom edge. Press it with `RK.press(tl, el, t)` (drops onto its edge in 2 steps, then pops back). |
| `rk-pill` (+ `--sun`, `--dark`, `--ghost`, `--glass`) | Rounded pill buttons from the landing. |
| `rk-glass` | Hero chip on art/night: white 10% fill, white 20% border, blur, white text. |
| `rk-night-card` | Card on night: white 4.5% fill, white 10% border, 24px radius. |
| `rk-stars` | Absolute full-bleed layer of faint pixel stars (two offset dot grids, white and gold). |
| `rk-dotgrid` | Absolute full-bleed paper dot grid (see Grounds). |
| `rk-row` | A UI list row: flex, 18px gap, 16px 28px padding, hairline divider. |

**Helpers** (call during the synchronous timeline build):

- `RK.icon(name, size)` → inline SVG string of a pixel icon (`fill: currentColor`). Names: check, spark, users, user, gear, search, play, globe, image, eye, flag, inbox, mail, trophy, crown, lock, arrow-right, calendar, list, check-list, code, chat, coin, gift, refresh, link, branch, table, grid, x, plus, ticket, tag, dot, paint-brush, notebook, chart-line, copy, external, text, paragraph, hash. Or place `<span data-rk-icon="check" data-size="20"></span>` in markup and call `RK.hydrate(rootEl)` once.
- `const clock = RK.clock(tl, DURATION)` → one linear driver across the whole frame (create it once, right after the timeline, with the frame's exact duration); `clock.add(t => …)` runs on every seek with frame time `t` and must set state as a pure function of `t`. All the time-based helpers below use it. Never write the same property from both the clock and a GSAP tween.
- `RK.type(clock, el, text, {start, cps = 28, caret = true})` → types text in with a blinking block caret (█) that disappears 0.6s after the line completes.
- `RK.states(clock, el, [{t, text}, …])` → discrete text states (swap a word in place, counters, status labels).
- `RK.count(clock, el, {from, to, start, dur, decimals = 0, steps = 0, prefix = "", suffix = ""})` → count-up. `steps` > 0 quantizes it like an arcade score counter.
- `RK.meter(el, count)` and `RK.fillMeter(clock, el, {from = 0, to, start, dur})` → segmented meter build + stepped fill.
- `RK.cursor({x, y, size = 3})` → returns an absolutely positioned pixel-arrow element (36×60px, hotspot = the arrow tip at its top-left). Append it to your stage (a `position:relative` full-frame layer) and move it with ordinary GSAP `x`/`y` tweens in stage pixels (`power3.inOut`, ~0.6–0.9s per move). It starts wherever `{x, y}` says.
- `RK.click(clock, cursorEl, stageEl, {t, x, y, color = "#7C3AED"})` → at time `t` the cursor dips and two square pixel rings step outward from (x, y) (stage pixels). Put the cursor's tip on (x, y) by `t`.
- `RK.press(clock, arcadeButtonEl, t)` → 8-bit button press and release at `t` (drops onto its edge, holds 0.16s, pops back). The kit owns that button element's `transform` — animate its entrance on a wrapper.
- `RK.pop(tl, el, t, {from = 0.6})` → sprite pop-in with GSAP: hidden → 112% → 100% in steps (check marks, badges, coins, tags). The element starts hidden.
- `RK.shake(clock, el, {t, dur = 0.3, amp = 10})` → stepped arcade shake, ends exactly at rest. The kit owns `el`'s `transform` — use a dedicated wrapper.
- `RK.pixelField(svgEl, {cols, rows, cell, gap, palette, seed})` → draws a field of square pixels, rows banded through `palette`, opacity from a fixed hash. Reveal it with a stepped `clip-path: inset(...)` tween.
- `RK.funnel(svgEl, {width, height, cell, bands:[{color, count, faded, live}]})` → the app's pixel funnel (the Judging › Progress chart): a symmetric pixel river whose thickness eases stage to stage.
- `RK.dither(clock, canvasEl, {start, dur, color, mode: "cover" | "reveal", cell = 48, angle = "diagonal"})` → Bayer-dithered pixel wipe on a full-bleed `<canvas width=1920 height=1080>`: `cover` fills tiles in, `reveal` clears them.
- `RK.confetti(clock, stageEl, {x, y, start, count = 36, size = 12, colors, spread = 1, power = 1})` → deterministic pixel confetti (square bits of `size`, 1.5× and 2× that, ballistic with drag and gravity, flipping like paper), ≤40 pieces. (x, y) in stage pixels; the stage must be `position:relative` or absolute full-frame.

## Motion grammar (all frames)

- **Beat grid — the film is cut to 120 BPM, 4/4.** A beat is 0.5s, a bar is 2s. Every frame starts on a bar line. Land every major hit (a headline arriving, a check turning Pass, a click, a stamp, a pop) exactly on a beat: frame-local 0.0, 0.5, 1.0, 1.5 … Smaller pickups may use eighths (0.25s). The storyboard gives beat times — honor them to ±0.03s. Music is added later and will sync to this grid.
- **Clean moves:** `power3.out` settles (0.5–0.8s) for cards, rows and headlines; `expo.out` for fast arrivals; a small y rise (24–40px) + opacity. No bounce, no elastic, no lazy breathing, no slow drift on content.
- **Retro moves:** `steps(3–6)` eases for pixel pops, stepped counters, meters filling segment by segment, the cursor's click ripple, dither wipes, shakes. Overshoot only for sprite pops (`RK.pop`) and the arcade "ROUND 1" slam.
- **Headline swaps** inside a frame are velocity-matched: the old line lifts up and fades in 0.25s while the new one rises in from below (a within-frame seam, not an exit).
- **Reveal on the beat, across the whole frame.** Never dump the whole canvas in the first 25%. Content keeps arriving; the last beat of a frame is a settled, readable hold.
- **No exits.** Frame-to-frame transitions are owned by the assembler (push-slides, zoom-throughs and pixel-dither wipes). Only the last frame fades.
- Entrances use `fromTo`. No CSS transitions or keyframes. No `Math.random`, no `Date.now`, no infinite repeats.

## Layout rules

- Headline band: top-left at x=120, y≈96–260, or centered for hero moments. Product cards sit below/right, bottom edge ≤ y=900.
- One dominant element per frame (a card or a headline) at ≥40% of the canvas; ≥3 depth layers (ground → card → accents/cursor).
- Cards are real UI rebuilt at 1.8× scale with the exact copy the storyboard gives. Never invent product copy, numbers, testimonials or logos beyond what the frame lists.
- Paper frames keep ≥120px side margins. Nothing touches the frame edge except grounds and art.

## Do

- Use the kit's classes and helpers for every tag, meter, icon, cursor, click and pixel effect.
- Keep violet = agent and magenta = human, everywhere.
- Let pixel type and pixel icons carry the retro feel; let the UI stay crisp and clean.

## Don't

- No purple-blue "AI" gradient blobs, bokeh, glows behind everything, or neon outlines on paper frames.
- No emoji. No drop shadows on text (except the art frames' dark glow behind headlines). No outlined/stroked type.
- No bouncy UI cards. No floating elements that drift on their own.
- Don't render the storyboard's scene caption as text. Visible copy comes only from the frame's listed on-screen text.
