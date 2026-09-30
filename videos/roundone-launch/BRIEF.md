---
workflow: product-launch-video
flow: automation
storyboard: no
mode: autonomous
message: "RoundOne's NVIDIA Nemotron agent on Nebius checks every hackathon project, so human judges can focus on the ideas."
destination: website
aspect: 1920x1080
language: en
audience: "Companies and DevRel teams that run hackathons to get people building on their product, and the organizers and judges who run them"
length: 66s
angle: problem-to-solution launch (why hackathons → why judging broke → RoundOne → agent + stack → humans decide → rounds to winners)
narration: no
music: assets/music/roundone-bgm.mp3 (user-supplied, conformed to 120 BPM)
---

## Intent

The launch video for the RoundOne website (the landing page's demo-video slot), not the Devpost submission.

The user's story, in their words: hackathons are a great way to get adoption, use cases, and excitement for your product, and RoundOne makes running one easy and self-hostable. AI has let everyone build, and that is creating a problem for judges: overwhelm, fatigue, and human creativity hidden against "AI slop". RoundOne's mission is to help hackathon organizers ingest projects against a schema that can be judged by the criteria, and let a smart AI agent powered by Nebius and NVIDIA models do the first round — checking code, checking sites (hype the capabilities of Nebius and the agent). The judges focus on human creativity while the machine checks the machine, but nothing is left unreviewed: everything can be easily reviewed, judged and scored, so every entrant knows they are being seen. The entire process is audited. RoundOne sends batched emails for each round and phase, handles rewards, and publishes public winners pages.

Look and feel, in the user's words: "clean like a notion.com video but have the fun playful retro / gaming elements." Clean white canvas, floating product UI, confident type, lots of air — then pixel art, Geist Pixel headlines, 8-bit buttons and arcade moments from the RoundOne landing page as the playful layer. The name itself is an arcade callout ("ROUND 1"), which the reveal can play on.

The approved plan is `../../brag-output/brag-plan.md` (12 scenes). This build keeps its story and copy, retimed onto a 120 BPM bar grid (66s = 33 bars; the schema-to-criteria beat got 6s).

## Assets

- ../../public/landing/retro-hero.webp — synthwave pixel sky over clouds (landing hero art); the hook and the reveal sit on it.
- ../../public/landing/retro-footer.webp — neon-floor pixel city (landing footer art); the outro.
- ../../public/landing/logo.svg — the RoundOne mark.
- ../../src/app/landing/_components/brand-logos.tsx — NVIDIA and Nebius wordmarks as inline SVG.
- ../../src/components/pixel-icon.tsx — the Pixel Icon Library set (CC BY 4.0) the app uses; reuse, don't redraw.
- ../../src/app/landing/_components/mocks.tsx — faithful mocks of the app's screens (agent review, Setup › Criteria, judge portal, score reveal, gate inbox, submission flood); rebuild these in HTML with the same copy and tokens.
- ../../src/app/landing/landing.css — the landing's tokens, `mock`, `night`, `stars`, `btn-arcade` and `check-in` styles.
- ../../node_modules/geist/dist/fonts/ — Geist Sans, Geist Mono, Geist Pixel Square.

## Customizations

- No narration or SFX. Music: the user's track (assets/music/roundone-bgm.mp3), added after the silent cut — tempo-conformed from 118.59 to 120 BPM (pitch kept) with the groove drop on 0:16; wiring and measurements in kit/add-overlays.mjs.
- Beat grid for that later sync: 120 BPM, 4/4 — a beat every 0.5s, a bar every 2s. Every scene boundary lands on a bar line and every major hit (headline slam, check, stamp) on a beat. The reveal lands on the 16s phrase downbeat.
- Retro/gaming layer: Geist Pixel headlines, pixel icons, pixel-dither wipes, an arcade "ROUND 1" callout at the reveal, segmented health-bar style meters, 8-bit button for the CTA, pixel confetti for the winners.

## Notes

- Every claim and number on screen comes from the landing page or the code (Nemotron 3.5 Lightning / 3 Super 120B / 3 Ultra 550B, Token Factory, Nebius Sandboxes, Tavily, "1,000 projects × 3 judges × 8 min = 400 judge-hours", the sample projects). No invented testimonials or metrics.
- Readability: any line meant to be read stays settled at least 0.3s per word.
- Avoid generic SaaS language.
- End card URL: roundone.dev (from `src/lib/site.ts`).
