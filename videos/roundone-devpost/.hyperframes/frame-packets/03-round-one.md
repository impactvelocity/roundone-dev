# Frame packet: 03-round-one

## Project inputs

- Project: /Users/dylanjones/apps/judge-agent-nebius/videos/roundone-devpost
- Design tokens: /Users/dylanjones/apps/judge-agent-nebius/videos/roundone-devpost/frame.md
- RULES_DIR: /Users/dylanjones/.claude/skills/hyperframes-animation/rules

## Assigned storyboard block

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

## Selected motion rule: kinetic-beat-slam

---
name: kinetic-beat-slam
description: Percussive kinetic typography — short phrases slam in on a steady beat with distinct per-phrase entrances, optional rhythm chrome (metronome ticks, beat bar), then a locked finale.
metadata:
  tags: text, kinetic, typography, beat, rhythm, slam, percussive, punchy
---

# Kinetic Beat Slam

Short phrases hit one at a time on a **steady beat**, each with a _different_ entrance, then stack into a locked finale — the recipe for "punchy / rhythmic" text-forward pieces (taglines, manifestos, hype intros). The difference between generic and rhythmic is (1) one shared **onset array** driving every element, (2) **distinct** entrances per phrase rather than one reused helper, and (3) optional **rhythm chrome** that visibly keeps the beat.

## How It Works

A single tempo grid — `PULSE` seconds per sub-beat, `BEATS = [t0, t1, t2, …]` on that grid — is the rhythmic spine; every phrase entrance, accent, and chrome tick reads its time from it, so the piece locks to one pulse instead of drifting hand-tuned offsets. Each phrase gets a different transform axis (scale+blur slam / side snap / rise+rotate) with short attacks (0.35–0.6s on the hit), then the stack holds with a finite low-amplitude breath.

## Recipe

```html
<!-- inside a standard scene clip (hyperframes-core) -->
<div class="kbs-stage">
  <div class="kbs-line" id="p1"><span class="verb">Notice</span> more.</div>
  <div class="kbs-line" id="p2"><span class="verb">Decide</span> faster.</div>
  <div class="kbs-line" id="p3"><span class="verb">Act</span> now.</div>
</div>
<!-- optional rhythm chrome -->
<div class="kbs-metronome" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
```

```css
.kbs-stage {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 120px 160px; /* title-safe margin */
}
.kbs-line {
  font-family: "Archivo Black", "League Gothic", sans-serif; /* embedded display face */
  font-size: 150px;
  line-height: 0.96;
  letter-spacing: -0.03em;
  color: #f5f5f5;
}
.kbs-line .verb {
  color: #ff5b2e; /* exactly one accent hue */
}
.kbs-metronome {
  position: absolute;
  bottom: 64px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 14px;
}
.kbs-metronome i {
  width: 6px;
  height: 28px;
  background: #ff5b2e;
  opacity: 0.25;
}
```

```js
// ONE tempo grid drives everything — phrases AND the metronome read it.
const PULSE = 0.4; // seconds per sub-beat
const BEATS = [PULSE * 1, PULSE * 5, PULSE * 9]; // phrase onsets, on the grid

// Distinct entrances per phrase (NOT one reused helper).
tl.fromTo(
  "#p1",
  { scale: 1.5, filter: "blur(16px)", opacity: 0 },
  { scale: 1, filter: "blur(0px)", opacity: 1, duration: 0.5, ease: "power4.out" },
  BEATS[0],
);
tl.fromTo(
  "#p2",
  { x: -320, opacity: 0 },
  { x: 0, opacity: 1, duration: 0.45, ease: "expo.out" },
  BEATS[1],
);
tl.fromTo(
  "#p3",
  { y: 90, rotation: 6, opacity: 0 },
  { y: 0, rotation: 0, opacity: 1, duration: 0.55, ease: "circ.out" },
  BEATS[2],
);

// Rhythm chrome: each tick flashes on the SAME grid, not a magic offset.
gsap.utils.toArray(".kbs-metronome i").forEach((tick, i) => {
  tl.to(tick, { opacity: 1, duration: 0.08, yoyo: true, repeat: 1, ease: "none" }, PULSE * (i + 1));
});

// Finale hold: floor (not ceil) so the repeat never overshoots data-duration;
// max(0,…) so a short hold never yields a negative repeat (GSAP reads negative as -1 = infinite).
const holdStart = BEATS[2] + 0.7,
  cycle = 1.6,
  holdDur = SCENE_DURATION - holdStart;
tl.to(
  ".kbs-stage",
  {
    scale: 1.01,
    duration: cycle / 2,
    ease: "sine.inOut",
    yoyo: true,
    repeat: Math.max(0, Math.floor(holdDur / cycle) - 1),
  },
  holdStart,
);
```

## Variations

- **Entrance easing by attack character** — `power4.out` hard slam ⭐ default hit · `expo.out` hardest snap (side-snaps, whip-ins) · `back.out(2)` overshoot pop (accents only, not body words) · `circ.out` heavy rise with momentum. Use **at least 3 distinct easings** across the piece.
- **Rhythm chrome alternatives** — a center beat bar or a `// label` monospace tag pulsing on-beat instead of the 5-tick metronome; mark any decorative that must survive a shader transition per `../transitions/overview.md`.
- **Finale dressing** — stack + accent underline sweep ([css-marker-patterns](css-marker-patterns.md)); don't just leave the last phrase sitting.

## Values

| token             | range                | notes                                                                                        |
| ----------------- | -------------------- | -------------------------------------------------------------------------------------------- |
| BEATS spacing     | 1.2–1.8s             | <0.8s frantic, >2.5s loses the pulse; keep spacing even — it's a beat                        |
| entrance duration | 0.35–0.6s            | the hit must resolve before the next beat; exits ≤0.25s                                      |
| accent hue        | exactly 1            | the verbs; the rest mono white / near-black                                                  |
| display face      | 150px+, heavy weight | Archivo Black / League Gothic / Oswald — see `hyperframes-creative/references/typography.md` |

## Critical Constraints

- **One beat array, not scattered offsets** — every element times off `BEATS[]` / `PULSE`; this is the single biggest lever for "rhythmic".
- **Different entrance per phrase** — a reused `punchIn()` for all lines is the flat-but-competent tell. Vary the motion axis, reuse the ease _family_.
- **Finale repeat math**: `repeat: Math.max(0, Math.floor(dur / cycle) - 1)` — `Math.ceil` overshoots `data-duration` and trips the `gsap_repeat_ceil_overshoot` lint rule; a negative repeat is read by GSAP as `-1` (infinite).
- **No banned exit animations between scenes** — in a montage the _transition_ is the exit (`../transitions/overview.md`); only a final scene may fade out.
- **Display font must be embedded** or it silently falls back at render — Anton / Bebas-as-literal are NOT embedded (`Bebas Neue` aliases to League Gothic; verify in `typography.md`).

## See also

`3d-text-depth-layers` (extruded depth on the slammed words) · `css-marker-patterns` (finale underline/circle) · `sine-wave-loop` (the finale breath) · `../adapters/gsap-easing-and-stagger.md` (easing vocabulary).

## Selected motion rule: 3d-text-depth-layers

---
name: 3d-text-depth-layers
description: Multiple offset text layers create a stacked 3D shadow / extrusion effect on large typography — more impactful than CSS text-shadow because each layer is a full DOM element.
metadata:
  tags: text, 3d, depth, layers, shadow, typography, stacked, extrusion
---

# 3D Text Depth Layers

The same text rendered N times at increasing offsets — back layers translucent, front layer full opacity and brand color — creates a physical "stacked extrusion" depth illusion on large typography. Distinct from `text-shadow` (which can't have per-layer hue / opacity / animation): each layer is a real DOM element.

## How It Works

A build script appends `LAYER_COUNT` copies back-to-front; each back layer sits at `translate(i × OFFSET_X, i × OFFSET_Y)` with alpha stepping down per layer, while the front copy (`i = 0`) is `position: relative` so it defines the container size (back layers stack absolutely behind it). The default entrance cascades the layers' fades back-to-front while a proxy tween grows the offsets from 0 → full, so the depth "builds forward" and lands as the last layer fades in.

## Recipe

```html
<!-- inside a standard scene clip (hyperframes-core) -->
<div class="depth-stack">
  <!-- layers injected by script — LAYER_COUNT copies of {label} -->
</div>
```

```css
.depth-stack {
  position: relative; /* front layer defines size; back layers stack behind */
}
.depth-text {
  font-weight: 900; /* black weight — thin text loses the illusion */
  font-size: HERO_FONT_SIZE;
  letter-spacing: HERO_LETTER_SPACING;
  line-height: 1;
  color: {frontColor};
}
.depth-text.is-back {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none; /* decorative */
}
.depth-text.is-front {
  position: relative;
  z-index: 10;
}
```

```js
const stack = document.querySelector(".depth-stack");

// Build back-to-front so the FRONT (i=0) is appended LAST
for (let i = LAYER_COUNT - 1; i >= 0; i--) {
  const el = document.createElement("div");
  el.className = "depth-text " + (i === 0 ? "is-front" : "is-back");
  el.textContent = "{label}";
  if (i > 0) {
    const alpha = Math.max(BACK_ALPHA_MAX - i * BACK_ALPHA_STEP, BACK_ALPHA_MIN);
    el.style.color = `rgba({backHueRGB}, ${alpha})`; // rgba in color, NOT element opacity
    el.style.transform = `translate(${i * OFFSET_X}px, ${i * OFFSET_Y}px)`;
  }
  el.dataset.layer = String(i);
  stack.appendChild(el);
}

// Cascade entry — back layers fade in first, building forward
stack.querySelectorAll(".depth-text").forEach((el) => {
  const i = Number(el.dataset.layer);
  const finalAlpha = i === 0 ? 1 : Math.max(BACK_ALPHA_MAX - i * BACK_ALPHA_STEP, BACK_ALPHA_MIN);
  tl.fromTo(
    el,
    { opacity: 0 },
    { opacity: finalAlpha, duration: LAYER_FADE_DUR, ease: "power2.out" },
    LAYER_CASCADE_START + (LAYER_COUNT - 1 - i) * LAYER_CASCADE_STEP,
  );
});

// Depth grows on entry — offsets interpolate 0 → full
const depthState = { p: 0 };
tl.to(
  depthState,
  {
    p: 1,
    duration: DEPTH_GROW_DUR,
    ease: "power2.out",
    onUpdate: () => {
      stack.querySelectorAll(".depth-text.is-back").forEach((el) => {
        const i = Number(el.dataset.layer);
        el.style.transform = `translate(${i * OFFSET_X * depthState.p}px, ${i * OFFSET_Y * depthState.p}px)`;
      });
    },
  },
  LAYER_CASCADE_START, // align with the cascade so depth lands as the last layer fades in
);
```

## Variations

- **Static depth** (single hero shot) — render all layers at final positions from t=0; optionally fade the whole stack in with a subtle scale (0.94–0.98 → 1, 0.5–0.8s).
- **Dynamic depth pulse** — after the grow completes, modulate the offsets with a sine multiplier `1 + sin(p) × BEAT_AMP` (BEAT_AMP 0.2–0.6; one beat per 0.7–1.5s reads as a heartbeat).
- **Color-shift back layers** — instead of fading to translucent, step hue/lightness per layer: `hsla(HUE_BASE − i × HUE_STEP, SAT_PCT%, LIGHT_BASE − i × LIGHT_STEP%, 1)` (HUE_STEP 4–12°; larger reads as glitch). Depth reads as a colored cast shadow.

## Values

| token               | range                    | notes                                                                  |
| ------------------- | ------------------------ | ---------------------------------------------------------------------- |
| LAYER_COUNT         | 4–6                      | <4 doesn't read as 3D; >6 clutters on tight kerning                    |
| OFFSET_X / OFFSET_Y | 1–3px each               | >4px reads as glitch / chromatic aberration, not depth                 |
| BACK_ALPHA_MAX      | 0.6–0.85                 | nearest back layer; >0.9 fights the front for dominance                |
| BACK_ALPHA_STEP     | 0.08–0.15                | small = soft gradient; large = discrete plates                         |
| BACK_ALPHA_MIN      | 0.1–0.2                  | floor — below 0.1 the deepest layer vanishes on dark backgrounds       |
| HERO_FONT_SIZE      | 60px min; 200–340px hero | thin/small text loses the layered illusion                             |
| HERO_LETTER_SPACING | −0.03em–0                | tighter makes offsets read as depth, not repetition                    |
| LAYER_CASCADE_STEP  | 0.04–0.10s               | smaller ≈ simultaneous; larger feels stepped                           |
| LAYER_FADE_DUR      | 0.3–0.6s                 | per-layer fade                                                         |
| DEPTH_GROW_DUR      | 0.4–0.8s                 | ≈ `LAYER_FADE_DUR × LAYER_COUNT / 2` so depth lands with the last fade |

## Critical Constraints

- **Offset direction implies light direction** — `(+x, +y)` = light upper-left, `(-x, +y)` = upper-right; one sign convention for the whole composition.
- **Back layers translucent OR darker — never more saturated than the front** (reads as a halo, not depth).
- **Set back-layer color via `rgba()` in `color`, not element `opacity`** — opacity fades the whole rendered glyph including any shadow.
- **Front layer `position: relative` defines container size**; back layers absolute with `pointer-events: none`; offsets via `transform: translate()`, never `top`/`left`.
- **No CSS `text-shadow` alongside layered depth** — they compound and over-extrude.
- **No per-letter animation on top of the stack** — hacker-flip / typewriter over 6-layer depth is chaos; drop to 2–3 layers or apply depth only to the static post-reveal state.

## See also

`counting-dynamic-scale` (counter rendered with depth layers) · `sine-wave-loop` (idle breathing on the front layer post-reveal) · `center-outward-expansion` (depth-stacked wordmark after the burst lands).
