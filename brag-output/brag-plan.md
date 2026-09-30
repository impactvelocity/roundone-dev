# RoundOne — launch video plan

**Format:** landscape 1920×1080, 30fps · **Length:** 62s (a 20s cutdown is at the end) · **Tone:** arcade-cinematic (see Tone)

## The questions first

- **What is it?** Open-source, self-hosted hackathon judging where an NVIDIA Nemotron agent on Nebius checks every project first, so human judges can spend their time on the ideas.
- **Who is it for?** Companies and DevRel teams that run hackathons to get people building on their product, and the judges they recruit.
- **What does it do for them?** Projects come in shaped to the rubric. The agent builds every repo, watches every demo and visits every live site. Judges get short daily batches and score only what people should score. Rounds, emails, rewards and the winners page run from one place, and everything is logged in an audit trail.
- **What sets it apart?** It splits the work: the machine checks the machine, and people judge the idea. The agent's score stays hidden until a judge submits their own, and it only breaks ties. It never picks a winner.
- **Most impressive claim:** "Coding agents turned 100 hand-coded submissions into 1,000." 1,000 projects × 3 judges × 8 min = 400 judge-hours, and nobody runs the code. RoundOne's agent does run it, in a VM-isolated Nebius Sandbox, with models up to Nemotron 3 Ultra 550B.
- **Visual hook:** the pixel flood. A tidy 10×10 grid of violet squares (~100 projects) gets swamped by a 40×25 sunset field (1,000+). It's the landing page's real `SubmissionFlood`.
- **Real UI to show:** the agent review ticking through its checks, Setup › Criteria, the judge portal, the gate inbox, the audit trail, the phase funnel, the emails and the public winners page.
- **Share caption:** "Want builders on your product? Run a hackathon. RoundOne's Nemotron agent on Nebius checks every project first, so your judges can focus on the ideas."

## Angle

Hackathons are the best way to get people building on your product, but AI broke judging. Building got cheap and judging didn't. RoundOne lets the machine check the machine: a Nemotron agent on Nebius builds, watches and visits every project, and people judge the idea. Nothing goes unreviewed, every call is logged, and the rest of the event runs itself.

- **Hook (0–4s):** "Want builders on your product?" → "Run a hackathon." It speaks to the buyer first, then turns into the problem at 4s.
- **Highlights:**
  1. The agent at work: every repo built, every demo watched, every live site visited.
  2. The stack: NVIDIA Nemotron on Nebius Token Factory, with Nebius Sandboxes.
  3. Nothing goes unreviewed and every call is logged: the gate inbox and the audit trail.
- **Punchline:** "Give your judges their attention back."

## Tone

Arcade-cinematic. The synthwave pixel night city from the landing page frames the story at the open, the reveal and the close, with trailer-scale headlines in Geist Pixel. The product beats between them are clean and white, like the landing page, with smooth slides. It should feel confident and warm, not jokey. The only irony comes from the premise: AI made the pile, and AI helps sort it.

## Visual identity (from `src/app/landing/landing.css`)

| Token | Value | Use |
|---|---|---|
| `--screen-deep` | `#150c2e` | night backgrounds, the stack scene |
| `--violet` / `--violet-soft` | `#7c3aed` / `#ede5ff` | agent color, tags |
| `--magenta` | `#e8318f` | human/judge color |
| `--orange` / `--sun` | `#fb7a3c` / `#fbbf24` | accents |
| `--pass` / `--pass-soft` | `#0f9d6b` / `#dcf7ec` | Pass tags |
| `--warn` / `--warn-soft` | `#c2410c` / `#ffedd5` | gate tags |
| `--sunset` | `#fcd34d → #fb923c → #f43f5e → #e11d8f` (vertical) | headline highlights |
| `--dusk` | `#7c3aed → #d946ef → #fb7a3c` (95°) | meters, human cards, project marks |

- **Type:** Geist Pixel Square for headlines and big numbers, Geist Sans for body, Geist Mono for traces, eyebrows and the math. All three come from the `geist` package.
- **Art and marks:** `public/landing/retro-hero.webp` (sky over clouds), `retro-footer.webp` (neon floor), `logo.svg`, NVIDIA and Nebius logos (`landing/_components/brand-logos.tsx`), `PixelIcon`, `pixel-dither.tsx`, `FunnelPixels`.
- **Motion language:** rows land with the landing page's `check-in` stagger, transitions dissolve through pixel dither, and cards use the `mock` frame (white, soft violet border).

## Storyboard (62.0s)

Readable lines stay settled for at least 0.3s per word. Lines marked *texture* don't need to be read.

### 1 · Hook — 0.0–4.0 (4.0s)
- **Visual:** the `retro-hero` night sky with a slow push-in and twinkling stars. Pixel text types in at center.
- **Text:** "Want builders on your product?" (settled 0.5 → 2.0) cuts to "Run a hackathon." (2.3 → 4.0). Three `Tag` chips pop in beneath it at 2.4, 2.6 and 2.8: **Adoption · Use cases · Excitement**.
- **Sound:** a filtered synth pulse and a soft arp starting. One tuned blip for each chip.

### 2 · The flood — 4.0–10.0 (6.0s)
- **Visual:** a hard cut to white. `SubmissionFlood` scaled to fill the frame. The 10×10 violet grid fills cell by cell, labeled "~100 · hand-coded, before coding agents". Then the 40×25 sunset field floods in from the right in a fast wave, labeled "1,000+ · agent-assisted, now". The math row types in underneath in mono, and **400 judge-hours** lands big in Geist Pixel.
- **Text:** "AI lets everyone build." (4.5 → 6.2) swaps to "Building got cheap. Judging didn't." (6.6 → 10.0). The math is *texture* and "400 judge-hours" is the readable number.
- **Sound:** a riser under the flood, and a low thud when the 400 lands.

### 3 · Buried — 10.0–15.0 (5.0s)
- **Visual:** the judge portal (`JudgeQueue`: "Welcome, Grace · Round 1 · Day 2 of 5"). The queue list starts scrolling and speeds up, and the counter ticks past forty. The cards drain to gray and all look alike. One card, **#251 Signal Garden**, keeps its dusk glow as it sinks under the rest.
- **Text:** "Tired judges. Endless queues." (10.4 → 12.3), then "Human creativity, buried in AI slop." (12.7 → 15.0).
- **Sound:** the music ducks under a low-pass filter, as if underwater. The only sound is a muffled heartbeat kick.

### 4 · Reveal — 15.0–19.5 (4.5s)
- **Visual:** a pixel-dither dissolve back to the `retro-hero` sky. The RoundOne logo scales in, then the landing page's H1 appears line by line, with the second line in the sunset gradient and `hero-glow`. A glass pill fades in above it: **Open source · Self-hosted**.
- **Text:** "Agents check the code. / Humans judge the idea." (settled 16.4 → 19.5).
- **Sound:** the drop, with the full pad, drums and sidechain pump. This is the loudest moment of the first half. **Poster candidate.**

### 5 · In from anywhere — 19.5–24.5 (5.0s)
- **Visual:** white. On the left, schema blocks snap into a column (Text "Project name", Long text "Pitch", Repo, Video, URL "Live demo", Team). On the right, `CriteriaSplit` (Setup › Criteria for the Nebius × NVIDIA hackathon) slides in, and thin dusk lines connect each block to the criteria it feeds. Mechanism chips flick on: Sandbox run, Code scraper, Video reviewer, Graphic reviewer, **Human only**.
- **Text:** "Projects come in shaped to your rubric." (19.9 → 24.5). A small line underneath: "From your form or the Intake API." (21.8 → 24.5).
- **Sound:** soft clicks, tuned to the chord, as each block snaps in.

### 6 · The agent at work — 24.5–33.0 (8.5s) ★ centerpiece
- **Visual:** `HeroReview` fills the frame (Repo Whisperer #042, "The agent checks · nemotron-3-super"). Rows land one by one, each turning **Pass**:
  - Builds from the README · Sandbox run
  - Runs on Nebius Token Factory · Code scraper
  - Uses an NVIDIA open model · Nemotron found
  - Demo video, 3 min or less · Video reviewer · 2:41
  - Live demo visited · Web scraper *(a row added from the real `web_scraper` mechanism)*
  - Technological implementation · 42 of 42 tests pass → **8.5**, with the dusk meter filling
  
  A dark `night-card` on the right runs the matching trace in Geist Mono (*texture*): `git clone`, `pnpm install`, `pnpm test ✓ 42 passed`, `grep tokenfactory.nebius.com ✓`, transcript lines scrolling, `crawl: 5 pages`. The trace shows the agent working and doubles as the audit record. At 32.2 the **Agent review done** tag lands.
- **Text:** big pixel overlays, one per beat: "Builds every repo." (24.9 → 27.3), "Watches every demo." (27.6 → 30.0), "Visits every live site." (30.3 → 33.0).
- **Sound:** the arp moves to 16ths. Each Pass is a soft pluck climbing the scale, sitting under the music. A small chord stab on 8.5.

### 7 · The stack — 33.0–39.0 (6.0s)
- **Visual:** a cut to the `night` section with stars. Three `night-card`s rise:
  - **NVIDIA · Nemotron · Every verdict.** Tier rows light up in turn: Quick → Nemotron 3.5 Lightning, Balanced → Nemotron 3 Super 120B, In-depth → **Nemotron 3 Ultra 550B**.
  - **Nebius · Token Factory · Inference and sandboxes.** "Every repo builds in a VM-isolated Nebius Sandbox."
  - **Tavily · The live web.** "Crawls live demos. Searches prior art."
- **Text:** "NVIDIA Nemotron on Nebius Token Factory." (settled 33.4, held for the scene), then "Unsure? A bigger Nemotron double-checks." (37.2 → 39.0). The card copy is secondary and the model names pop.
- **Sound:** a bass swell and sub, and a shimmer when 550B lights.

### 8 · The split — 39.0–44.0 (5.0s)
- **Visual:** white. Two `SplitCard`s slide in from opposite sides. **The agent checks** (violet): "Does it build and pass its tests?", "Does it use the sponsor tech?" **Humans judge** (dusk edge): "Is the idea new?", "Would you use it?" The agent's score column in a `ScoreReveal` sliver stays blurred until a judge's **Submit** click unblurs it.
- **Text:** "Let the machine check the machine." (39.4 → 41.4), then "People make the call." (41.9 → 44.0).
- **Sound:** the drums go half-time for a moment of air, and a soft *pop* when the blur clears.

### 9 · On the record — 44.0–49.0 (5.0s)
- **Visual:** `GateInbox`: "#033 Pantry Pilot · Failed a gate: Uses an NVIDIA open model", with the agent's evidence and "confidence: low". A cursor clicks **Back in the pool**. The project page's **Audit trail** slides in beside it, and entries stamp in newest-first using the real event kinds: submitted → agent scored → gate failed → reinstated by a person → judge scored → moved to Round 2.
- **Text:** "Nothing goes unreviewed." (44.4 → 46.4), then "Every call is on the record." (46.8 → 49.0).
- **Sound:** soft tuned stamps for each entry, kept in the background.

### 10 · Rounds that run themselves — 49.0–53.5 (4.5s)
- **Visual:** the phase funnel with the real `FunnelPixels`: Submitted 186 → Screening 142 → Round 1 40 (a *live* dot) → Finals 12. Email cards fly out of it, rendered from the real React Email templates: the judge batch ("today's batch is open"), the winner email, and the thank-you email ("Thanks for building Signal Garden · reached round 2").
- **Text:** "Rounds that run themselves." (49.4 → 51.3), then "Every entrant hears back." (51.6 → 53.5).
- **Sound:** airy whooshes in the same reverb as the pad.

### 11 · Winners — 53.5–56.5 (3.0s)
- **Visual:** the public winners page `/w/[slug]` slides up: the 2–1–3 podium in the hackathon's color, prize tags, and a pulse on the **Share** button. Sunset pixel confetti falls.
- **Text:** "Winners, announced." (53.9 → 56.5).
- **Sound:** the harmony lifts to the relative major, with a sparkle.

### 12 · Outro — 56.5–62.0 (5.5s)
- **Visual:** a pixel-dither dissolve to `retro-footer`, with a slow glide down the neon floor. The headline sits over it, with "attention back" in the sunset gradient. At 59.0 the lockup settles: the RoundOne logo, **roundone.dev**, "Open source · Self-hosted", and small NVIDIA and Nebius marks.
- **Text:** "Give your judges their attention back." (57.1 → 62.0).
- **Sound:** the last chord rings out on the pad tail. No button at the end.

## Sound (one piece)

Synthwave in F minor at ~108 BPM, written as one track. Act 1 (0–15s) is sparse and filtered, and ducks under water at "AI slop". The reveal drops in at 15s. The agent and stack scenes (24.5–39s) are the densest, with a 16th-note arp and a bass swell. At 39s the track breathes in half-time for the split. It resolves to Ab major for the winners and ends on a sustained pad. All the effects (chip blips, block clicks, Pass plucks, stamps, whooshes) are tuned to the chord, sit about 8–12 dB under the music and share its reverb. Repeated ticks stay soft.

## 20s cutdown (social)

| Scene | Time | Trim |
|---|---|---|
| 1 · Hook | 0–3.0 | "Run a hackathon." only |
| 2 · The flood | 3.0–7.0 | "Building got cheap. Judging didn't." |
| 4 · Reveal | 7.0–10.5 | H1 only |
| 6 · The agent at work | 10.5–16.5 | three rows plus the three overlays |
| 12 · Outro | 16.5–20.0 | lockup |

## Build notes

- Render the real components instead of rebuilding them: `landing/_components/mocks.tsx` (`HeroReview`, `SubmissionFlood`, `CriteriaSplit`, `JudgeQueue`, `ScoreReveal`, `GateInbox`), `FunnelPixels`, `brand-logos.tsx`, `PixelIcon`, and the React Email templates in `src/emails/` for the email cards, all styled by `landing.css`.
- Plan: a Remotion project in `brag-output/work/` that imports those components, so every frame is a pure function of time. `ffmpeg` isn't on this machine, but Remotion ships its own encoder.
- The agent trace and the audit trail can come from the real project page, using sample data (`sample-data-actions.ts`), if you'd rather show live screens than the mocks.
