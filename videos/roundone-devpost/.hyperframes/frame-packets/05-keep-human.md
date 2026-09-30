# Frame packet: 05-keep-human

## Project inputs

- Project: /Users/dylanjones/apps/judge-agent-nebius/videos/roundone-devpost
- Design tokens: /Users/dylanjones/apps/judge-agent-nebius/videos/roundone-devpost/frame.md
- RULES_DIR: /Users/dylanjones/.claude/skills/hyperframes-animation/rules

## Assigned storyboard block

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

## Selected blueprint: comparison-split

# comparison-split — Comparison Split-Cards

**intent**: Two paired items of equal weight shown side-by-side with mirrored 3D "book-open" tilts — the eye reads them as a balanced comparison, then a pill badge lands at each card's inner edge to punctuate. The motion IS the symmetry: two cards arriving from opposite wings into a held spread.

**roles served**

- Key_Feature (from `comparison-split-cards`): when two complementary features / capabilities of equal weight should be presented **simultaneously, not sequentially** — an A/B, a "X + Y together," paired concepts the viewer must weigh side-by-side. Not for >2 items (use `grid-card-assemble`) or sequential steps.

**duration**: 4–6s

**shot structure** (a `[bg]` canvas carrying two faint ambient glow blooms — `[accent A]` near 30%, `[accent B]` near 70% — so each side owns a color identity across a 50% symmetry axis; equal-width cards under one shared perspective parent)

- **Scene 1 (0.0–~0.8s) — title sets the concept.** A centered `[title line]` with an `[accent keyword]` slides DOWN into place from just above (a short smooth settle). The downward arrival is deliberate: it forms a non-conflicting T-shape against the cards, which arrive from the sides next.
- **Scene 2 (~0.4–1.9s) — the split-tilt entry (signature move).** Two equal-width feature cards arrive from opposite wings — `[left card]` from the left, `[right card]` from the right ~0.2s behind — each carrying a **mirrored 3D `rotateY` tilt** (left faces right, right faces left, opening like a book) and scaling ~0.85→1 as it lands. The entry overlaps the title's tail so the whole thing reads as ONE arrival, not two beats. Each card holds `[image / label / subtitle]`; box-shadows fall **outward** from the tilt (left shadow right, right shadow left).
- **Scene 3 (~1.9–end) — badges punctuate, then hold.** A pill `[badge]` lands at each card's **inner edge** (left then right, ~0.3s apart), overlapping its card ~15% so it reads as attached, not orbiting. This is the lone overshoot in the shot — it earns the punctuation. Settles and holds.

**motion vocabulary**: title slide-down from above; mirrored opposite-wing card entry; static book-open `rotateY` tilt (`+tilt` left, `−tilt` right); tilt-matched outward box-shadow; inner-edge badge spring-pop; gentle phase-opposed idle float (left vs right, never synchronized) registered as subtle jitter; dual side-glow ambient.

**rule mapping**

- two cards entering from opposite wings with mirrored `rotateY` tilts + tilt-matched shadow → `split-tilt-cards` (the signature; keep the two-layer split so the entry `x`/`scale` and the idle never collide on one alias)
- title slide-down settle → `gsap-effects` (translate + opacity on a long-tail `power3`)
- inner-edge pill badge pop (the one overshoot) → `spring-pop-entrance` (overshoot register — earns the punctuation)
- phase-opposed idle float on the pair → `sine-wave-loop` (low-amplitude register — subtle jitter, NOT lazy breathing; left `sin(t)`, right `sin(t+π)` so they never conveyor-belt)
- the two faint side glows behind the cards → `ambient-glow-bloom` (un-triggered soft bloom, one per accent)

**camera modifier**: camera-static by default — the symmetry is the subject and a move would break the balance.

## Selected motion rule: split-tilt-cards

---
name: split-tilt-cards
description: Two cards side-by-side with opposing Y-rotation creating a symmetric 3D split-screen layout for comparisons or feature pairs.
metadata:
  tags: 3d, cards, split, tilt, comparison, symmetric, layout
---

# Split Tilt Cards

Two cards side-by-side with opposing `rotateY` (left `+TILT`, right `−TILT`) — a symmetric "book-open" 3D split for comparisons, before/after, feature pairs. Each card slides in from its own side (reinforcing "they came from their own worlds and met here"), then the pair idles in counter-phase.

## How It Works

`perspective` on the scene root (REQUIRED — without it `rotateY` flattens to a 2D layout) and `transform-style: preserve-3d` on the stage and both cards. Entry starts each card off-axis with `TILT + TILT_OVERSHOOT`, settling to `TILT` — a pivot-into-place. Idle is a gentle counter-phase y-bob (the two yoyo tweens run in opposite directions); copy fades up during the cards' settle, not after.

## Recipe

```html
<!-- inside a standard scene clip (hyperframes-core) -->
<div class="split-stage">
  <div class="card card-left">
    <div class="card-eyebrow">{leftEyebrow}</div>
    <div class="card-headline">{leftHeadline}</div>
    <div class="card-body">{leftBody}</div>
  </div>
  <div class="card card-right">…</div>
</div>
```

```css
.scene-root {
  display: grid;
  place-items: center;
  perspective: SCENE_PERSPECTIVE; /* REQUIRED */
}
.split-stage {
  display: flex;
  gap: STAGE_GAP;
  transform-style: preserve-3d;
}
.card {
  width: CARD_WIDTH;
  transform-style: preserve-3d;
  will-change: transform;
}
/* Shadow falls WITH the facing direction: left card faces right → shadow right. */
.card-left {
  box-shadow: -CARD_SHADOW_OFFSET CARD_SHADOW_DROP CARD_SHADOW_BLUR {shadowColor};
}
.card-right {
  box-shadow: CARD_SHADOW_OFFSET CARD_SHADOW_DROP CARD_SHADOW_BLUR {shadowColor};
}
```

```js
// Entry — from outside, opposing tilts settle with a small pivot
tl.fromTo(
  ".card-left",
  { x: -ENTRY_SLIDE_DIST, rotateY: TILT + TILT_OVERSHOOT, opacity: 0 },
  { x: 0, rotateY: TILT, opacity: 1, duration: ENTRY_DUR, ease: "power3.out" },
  LEFT_AT,
);
tl.fromTo(
  ".card-right",
  { x: ENTRY_SLIDE_DIST, rotateY: -TILT - TILT_OVERSHOOT, opacity: 0 },
  { x: 0, rotateY: -TILT, opacity: 1, duration: ENTRY_DUR, ease: "power3.out" },
  RIGHT_AT,
);

// Counter-phase idle bob — opposite signs = alive; synchronized = conveyor belt
tl.to(
  ".card-left",
  { y: -FLOAT_AMP, duration: FLOAT_DURATION / 2, ease: "sine.inOut", yoyo: true, repeat: 1 },
  IDLE_START,
);
tl.to(
  ".card-right",
  { y: FLOAT_AMP, duration: FLOAT_DURATION / 2, ease: "sine.inOut", yoyo: true, repeat: 1 },
  IDLE_START,
);

// Copy fades up during the settle
tl.from(
  ".card-eyebrow, .card-headline, .card-body",
  { opacity: 0, y: COPY_RISE, stagger: COPY_STAGGER, duration: COPY_DUR, ease: "power2.out" },
  COPY_REVEAL_AT,
);
```

## Variations

- **Badges / floating labels**: position them on the PARENT, never inside a card — inside they inherit the `rotateY` and tilt off-axis.
- **3+ cards**: center card stays flat (`rotateY: 0`), outer two tilt inward — "old way / nothing / our way."
- **Zoom-through**: a separate camera tween scaling `.split-stage` reads as the viewer crossing the gap between the tilted pair.

## Values

| token             | range                            | notes                                                   |
| ----------------- | -------------------------------- | ------------------------------------------------------- |
| SCENE_PERSPECTIVE | 1000–2400px                      | lower exaggerates the tilt; higher reads near-isometric |
| TILT              | 10–18°                           | < 10 reads almost flat; > 18 folds shut and copy blurs  |
| TILT_OVERSHOOT    | 4–12°                            | the pivot-into-place feel                               |
| STAGE_GAP         | 40–120px (~0.06–0.15×CARD_WIDTH) | small = fused pair; large = compared-but-separate       |
| CARD_WIDTH        | 480–820px @1920                  | `2×CARD_WIDTH + STAGE_GAP ≤ 0.95×stage` at full tilt    |
| ENTRY_SLIDE_DIST  | 200–500px (~0.3–0.6×CARD_WIDTH)  |                                                         |
| ENTRY_DUR         | 0.6–1.2s                         |                                                         |
| RIGHT_AT          | LEFT_AT + 0–0.3s                 | zero feels mechanical; large fragments the pair         |
| FLOAT_AMP         | 3–8px                            | subtle is the point                                     |
| FLOAT_DURATION    | 1.6–3.2s round trip              | breathing cadence; IDLE_START ≥ entry end               |
| COPY_REVEAL_AT    | during the entry tail            | copy popping in after cards are idle reads disconnected |

## Critical Constraints

- **`perspective` on the scene root is REQUIRED**; `preserve-3d` on the stage AND each card.
- **Shadow direction matches tilt** — left card faces right → shadow falls right (and mirrored). Wrong sign reads as broken 3D.
- **Counter-phase idle** — the two bobs run with opposite signs at the same position.
- **Badges outside the card divs** (they'd inherit the rotation).
- **Body copy ≤ 2 lines per card** — tilted long paragraphs collapse into perspective blur.
- **Symmetric weight** — same width, same vertical center, similar line counts; asymmetry breaks the comparison metaphor.

## See also

`card-morph-anchor` (the pair can morph into one unified shape afterward) · `counting-dynamic-scale` (numbers as each side's headline) · `sine-wave-loop` (the idle form).
