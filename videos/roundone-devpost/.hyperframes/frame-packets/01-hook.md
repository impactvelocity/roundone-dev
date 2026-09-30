# Frame packet: 01-hook

## Project inputs

- Project: /Users/dylanjones/apps/judge-agent-nebius/videos/roundone-devpost
- Design tokens: /Users/dylanjones/apps/judge-agent-nebius/videos/roundone-devpost/frame.md
- RULES_DIR: /Users/dylanjones/.claude/skills/hyperframes-animation/rules

## Assigned storyboard block

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

## Selected blueprint: typewriter-reveal

# typewriter-reveal — Typewriter Reveal

**intent**: A live text caret types (and edits) a line as a human would, then either collapses it to a point and pops a brand payoff, or holds it under a persistent brand mark while a sub-line types/swaps into the final CTA — making "someone is typing this" the engine of the shot.

**roles served**

- Hook (from hook-typed-line-to-reveal): Type a relatable question/statement live, then COLLAPSE it and spring-pop the brand — a logo lockup OR a product-UI moment ("here's the everyday pain, now here's us").
- Brand_Outro (from brand-outro-persistent-mark-cta-rail): Hold the hero mark dead-center/top the whole shot while a sub-line beneath it swaps or types its way into the final CTA — landing the ask once the logo is already established.

**duration**: 3.6–7s (Brand_Outro 3.6–6.0s · Hook 5.5–7s)

**shot structure** (one consolidated template; `[slots]` are product-agnostic)

- Scene 1 (0.0–~2.0s): On a solid `[bg color]` field, a blinking text-input caret `|` sits at the line start, then `[primary line]` TYPES on character-by-character with the caret trailing.
  - _Variant — Hook_: nothing else is on screen; the typed `[hook line]` owns the frame. (Sub-variant: the line types inside UI chrome — a rounded `[input/pill]` — and the whole assembly continuously TRANSLATES leftward + scales slightly so the active caret stays pinned near frame-center while earlier words scroll off and clip past the left edge — a ticker push.)
  - _Variant — Brand_Outro_: a `[logo mark]` (+ optional `[wordmark]`) is already centered/upper and STAYS fully visible for the entire shot; an entry flourish plays on the mark itself (e.g. `[checkmark/icon]` strokes into the mark, or thin concentric rings ripple outward from it), and the typed `[tagline / product label]` is the SUB-LINE beneath the mark.

- Scene 2 (~2.0–4.5s): The typed line is MODIFIED in place — the active text is edited rather than re-shot.
  - _Variant — Hook_: final word(s) BACKSPACE out and a new word RETYPES (`[word A]` → `[word B]`), or the fill/caret snaps to `[accent color]` on the final word. Holds briefly.
  - _Variant — Brand_Outro_: the sub-line is REMOVED in place — a direct hard CUT/replace (NO backspace) or a moving mask-WIPE erases it — while the mark performs a small idle move (gentle rotate / sparkle reposition); the mark never leaves frame.

- Scene 3 — resolve:
  - _Variant — Hook (collapse, ~0.3–0.7s)_: caret vanishes; the whole text/assembly COLLAPSES to a point at center (horizontal X-collapse or scale-to-0 zoom-out) and disappears, leaving a clean `[bg]`. Then (remainder) a centered `[brand element]` SPRING-POPS in:
    - _logo-lockup sub-variant_: a `[mark/icon]` pops, then slides aside as a `[wordmark]` UNMASKS / slides out from behind it; both settle into a centered lockup.
    - _product-UI sub-variant_: a `[UI control]` (e.g. button) pops; a `[cursor]` sweeps in from a corner and homes onto it; on contact a ~150ms state-FLIP — base cross-fades to `[accent color]`, icon inverts, and a soft radial GLOW blooms outward and persists.
  - _Variant — Brand_Outro (~4.5s–end)_: the final `[CTA]` resolves in the sub-line slot — TYPED in with a caret and/or shown as a `[CTA in accent-color button]` beside plain text; an optional `[accent color]` GLOW ring / halo settles around the persistent mark. Holds to end. Final frame: `[logo mark]` + (glow ring) + `[CTA]`.

**motion vocabulary**: blinking text caret; character-by-character type-on; backspace-and-retype OR in-place hard-cut/mask-wipe text swap; optional leftward ticker push (assembly translates to keep caret centered); persistent centered hero mark (never vanishes) with entry flourish (icon stroke-draw, concentric ripple rings) and small idle move (rotate / sparkle); X-collapse / scale-to-0 zoom-out of the typed line; spring-pop brand reveal; wordmark unmask-slide into lockup; cursor sweep + UI state-flip + radial glow bloom; accent glow/halo ring settle; pill/button CTA reveal; hold.

**rule mapping** (per motion verb → `rules/<id>.md`)

- blinking text caret → `context-sensitive-cursor` (caret color-switch + blink)
- character-by-character type-on → `discrete-text-sequence` (typing/typos/holds/backspace); recipe `gsap-effects` (typewriter)
- backspace-and-retype → `discrete-text-sequence`
- in-place hard-cut / replace text swap → `discrete-text-sequence` (whole-text state swaps)
- mask-wipe erase of sub-line → `techniques.md` clip-path reveal (run in reverse)
- leftward ticker push (assembly translates to keep caret centered) → `camera-cursor-tracking` (viewport follows a moving caret)
- persistent hero mark hold → no motion rule needed (static anchor; intentional — it's the absence of motion)
- entry flourish: icon stroke-draw into mark → `svg-path-draw`
- entry flourish: concentric ripple rings from mark → `cursor-click-ripple` (ripple bloom)
- small idle mark move (rotate / sparkle reposition) → `sine-wave-loop` (idle)
- X-collapse / scale-to-0 zoom-out of typed line → `scale-swap-transition` (closest fit — it morphs/collapses elements at a shared center; approximation, since a standalone collapse-and-vanish without the paired same-center brand pop isn't its exact case)
- spring-pop brand reveal → `spring-pop-entrance` (alt `physics-press-reaction`)
- collapse-text → pop-brand as a same-center morph pair → `scale-swap-transition` (morph two elements at same center)
- wordmark unmask-slide into lockup → `techniques.md` clip-path reveal (unmask); slide via `spring-pop-entrance`
- cursor sweep onto UI control + press → `cursor-click-ripple` (cursor→target press + ripple)
- UI state-flip (base/icon invert on contact) → `hacker-flip-3d`
- radial glow bloom / accent glow-halo ring settle → `asr-keyword-glow` (accent glow); ring expansion via `center-outward-expansion`
- pill/button CTA reveal → `spring-pop-entrance` (alt `scale-swap-transition`)

**camera modifier**: none required — camera is static for both roles. The Hook ticker push is an ELEMENT translate (the typed assembly slides leftward to keep the caret centered), not a camera move → modeled by `camera-cursor-tracking` rather than a true camera rule.

## Selected motion rule: viewport-change

---
name: viewport-change
description: Virtual camera — simulate zoom / pan / focus-lock by transforming a wrapper around all scene content. Camera moves right → world translates left.
metadata:
  tags: viewport, camera, zoom, pan, focus-lock, virtual-camera
---

# Viewport Change (Virtual Camera)

Simulates camera effects (zoom / pan / focus-lock on a moving element) by transforming a wrapper around ALL scene content. The "world" moves opposite to the perceived camera. Distinct from [multi-phase-camera](multi-phase-camera.md) (2-3 discrete phases + drift) — viewport-change is a single continuous zoom/pan, often used for focus-lock following a moving element.

## How It Works

Camera intent → world transform. Camera **pans right** → world `translateX(-distance)`; camera **zooms in** → world `scale(>1)`; camera **follows element X** → world `translateX(viewportCenter - elementWorldX)` per-frame. Get the sign right or everything moves the wrong way. The single `.world` wrapper holds the camera transform; elements inside are positioned in world space, unchanged.

**Single-element composite transform (this rule's form).** Both scale and translate live on ONE wrapper as `translate(x, y) scale(S)`. CSS applies scale FIRST, then translate (right-to-left matrix composition), so a point at world offset `(ox, oy)` lands on screen at `(S × ox + x, S × oy + y)`. To map the target to viewport center, solve `S × offset + T = 0`:

```
T = -offset × S
```

This is **different from [coordinate-target-zoom](coordinate-target-zoom.md)**, which uses two nested wrappers (outer scales, inner translates) and derives `T = -offset` (independent of S). Mixing up the two forms drifts the target off-center as scale changes. Use this single-wrapper form when you want one source of truth for camera state (`cam.scale`, `cam.x`, `cam.y`) written via `onUpdate`; use nested wrappers when scale and translate can tween independently with shared ease.

## Recipe

```html
<div class="world" id="world">
  <div class="content">
    <div class="hero">{Brand}</div>
    <div class="tagline">{tagline}</div>
    <div class="cta" id="cta">{ctaUrl}</div>
  </div>
</div>
```

```css
.scene {
  overflow: hidden; /* REQUIRED — any non-1.0 scale reveals edges or pushes content off-frame */
  background: {bgGradient}; /* on .scene, NOT .world — a world-borne background warps with the camera */
}
.world {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  transform-origin: 50% 50%; /* centered scaling is what the math assumes */
  will-change: transform;
}
```

```js
const world = document.getElementById("world");

// Camera state — single source of truth. The world transform is composed from
// this object in ONE place so the transform string order is stable.
const cam = { scale: 1, x: 0, y: 0 };
function applyCamera() {
  world.style.transform = `translate(${cam.x}px, ${cam.y}px) scale(${cam.scale})`;
}
applyCamera(); // seed frame 0

// Zoom in on the CTA: single-element composite transform → T = -offset × S.
// TARGET_OFFSET_Y is the target's measured offset from viewport center at
// neutral camera (sign matters — positive = below center).
const counterY = -TARGET_OFFSET_Y * TARGET_SCALE;

tl.to(
  cam,
  {
    scale: TARGET_SCALE,
    y: counterY,
    duration: ZOOM_DUR,
    ease: "power3.inOut",
    onUpdate: applyCamera,
  },
  ZOOM_START,
);
```

## Scale Value Guide

| Effect      | Scale       | Feel                                |
| ----------- | ----------- | ----------------------------------- |
| Subtle      | 1.02 - 1.05 | Barely perceptible — "professional" |
| Medium      | 1.05 - 1.15 | "Ta-da" emphasis                    |
| Noticeable  | 1.15 - 1.30 | Focus on region                     |
| Dramatic    | 1.5 - 2.5   | Element fills screen                |
| Full-screen | 3.0+        | Element covers viewport             |

Perception: < 5% scale change is imperceptible; 10-15% is comfortable emphasis; > 30% is cinematic/dramatic. For a natural product feel, prefer 1.05-1.15× over 2-3s; save big > 1.3× zooms for dramatic narrative moments.

### Extreme range — 4–12× outward (workspace reveal)

The same single-cam math runs far past the table: a zoom-out workspace reveal opens punched-in at **4–12×** on one detail (a single cell, message, or button) and pulls out to the full workspace in one continuous move. The mechanics don't change — one `cam` object, `T = -offset × S`, one `applyCamera()` writer — only the authoring direction does:

- **Build the workspace at its final (1×) layout and OPEN scaled-in** (`cam.scale = 8`, counter-translate aiming the opening detail; state it in a `fromTo` / seed via `applyCamera()` so a seek to t=0 lands punched-in). The wide landing frame is then everything at native design size — text crisp, raster assets at source resolution.
- **Never the inverse** — authoring the close-up at 1× and scaling the world down to 0.08–0.25 for the wide frame drops every label below legible pixel size and softens raster media; the reveal lands on mush.
- **Measure the opening target** — at S = 8, a 1 px error in the baked offset is 8 px on screen at the opening pose. Take the offset from the target's real laid-out center (`getBoundingClientRect` after `fonts.ready`, once at setup — the measuring doctrine in [coordinate-target-zoom.md](coordinate-target-zoom.md)), never from a layout formula.
- **The opening detail must survive ×S** — it renders at `S ×` its design size on the first frames (vector/DOM text is safe; raster needs `sourceResolution ≥ rendered × S`).

## Variations

- **Focus-lock (camera follows a moving cursor/character)** — keep the element at a fixed screen X by computing the world offset per-frame inside the driver's `onUpdate`:

```js
const focusEl = document.querySelector(".moving-cursor");
const targetScreenX = VIEWPORT_WIDTH * FOCUS_SCREEN_X_FRAC; // 0.4–0.7; 0.5 = dead center
const focusUpdate = { p: 0 };
tl.to(
  focusUpdate,
  {
    p: 1,
    duration: FOLLOW_DUR, // matches how long the focused element is in motion
    ease: "power2.inOut",
    onUpdate: () => {
      const rect = focusEl.getBoundingClientRect();
      cam.x = targetScreenX - (rect.left + rect.width / 2);
      applyCamera();
    },
  },
  FOLLOW_START,
);
```

- **Composite scale (multi-phase)** — two proxy tweens multiplied through one writer: `cam.scale = scaleUp.v * scaleDown.v; applyCamera()`. Combine a slow push-in (~1.15) with a brief release (~0.9) for a breath/punch shape.
- **Camera mode transition (centered → follow)** — crossfade two camera modes via a 0→1 weight tween; intermediate frames interpolate between the modes' offsets.

## Values

| token           | range                                | notes                                                                                       |
| --------------- | ------------------------------------ | ------------------------------------------------------------------------------------------- |
| TARGET_OFFSET_Y | measured, not a free parameter       | target's offset from viewport center at neutral camera; measure via `getBoundingClientRect` |
| TARGET_SCALE    | 1.3× modest → 1.6–2.0× typical → 3×+ | raster media needs `sourceResolution ≥ rendered × TARGET_SCALE`                             |
| ZOOM_START      | content landed + ~0.5s scan time     | let the viewer read before the camera moves                                                 |
| ZOOM_DUR        | 1.0–2.0s                             | under 0.8s teleports, over 2.5s drags                                                       |
| DWELL           | ≥ 1.0s after the zoom settles        | the viewer must be able to read the focal point (climax dwell)                              |
| VIEWPORT_WIDTH  | = the root's `data-width`            | real value, not abstract                                                                    |

## Critical Constraints

- **One `.world` wrapper carries the whole camera** — every scene element lives inside it; a second transformed wrapper is a second camera.
- **Single source of truth via the `cam` object + `applyCamera()`** — when scale and translate both change, write them in ONE place; never split them across tweens that touch `world.style.transform` directly (the transform string composition order becomes unpredictable).
- **Single-wrapper counter-translate is `T = -offset × S`** — don't import the nested-wrapper `T = -offset` formula.
- **`overflow: hidden` on `.scene`**; **`transform-origin: 50% 50%` on `.world`**; **background on `.scene`, never on `.world`**.

## See also

[coordinate-target-zoom.md](coordinate-target-zoom.md) (nested-wrapper alternative, `T = -offset`) · [multi-phase-camera.md](multi-phase-camera.md) (viewport-change inside one phase) · [sine-wave-loop.md](sine-wave-loop.md) (idle micro-drift after the viewport settles).
