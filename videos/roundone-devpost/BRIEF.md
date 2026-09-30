---
workflow: product-launch-video
flow: automation
storyboard: no
mode: autonomous
message: "RoundOne's agent does the slow checks on every hackathon project with Nebius, NVIDIA and Tavily, so human judging stays human."
destination: youtube
aspect: 1920x1080
language: en
audience: "The judges of the Nebius × NVIDIA Global AI Hackathon on Devpost, then anyone who runs a hackathon"
length: 30s
angle: problem → reveal → mechanism (the agent at the hub, each sponsor doing one job) → the human split → hand-off to the app demo
narration: planned, not recorded (see Notes)
music: assets/music/roundone-bgm.mp3 (user-supplied, conformed to 120 BPM, groove drop on 0:08)
---

## Intent

The animated opening of RoundOne's Devpost demo video. The first ~30 seconds are this intro; the rest of the video is a screenshot demo of the app, built separately (not in this project). The intro has to state the problem, the solution, and where Nebius, NVIDIA and Tavily fit, and introduce the RoundOne agent as open-source hackathon judging and management. It should be "flash": get to the problem and the Nebius-powered answer fast, then hand off to the demo.

The approved plan is `../../brag-output-2026-09-29-230353/brag-plan.md` (version 2). Same look as the launch film (`../roundone-launch`): the retro-kit, Geist Pixel headlines, the synthwave pixel sky, clean paper product cards, pixel-dither wipes.

User notes on the plan, verbatim intent:
- Scene 3 line: "open-source Hackathon judging and management" → on screen as "Open-source hackathon judging & management".
- Scene 5: "Something about keeping human judging human, and AI judging code, classifying and summarizing."
- "everything else I like."

## Assets

- assets/music/roundone-bgm.mp3 — the user's track (3:24, 118.59 BPM), played at 1.01192× (pitch kept) so a bar is 2.000s; start it at song bar 2 so the groove drop lands on 0:08.0 (the ROUND 1 slam).
- assets/retro-hero.png — landing hero pixel art (night sky over clouds, bottom third fades to white); frames 1 and 3.
- assets/roundone-r1-logo.png — the R1 app-icon logo; frame 3 → the agent hub in frame 4.
- assets/nebius-logo.svg, assets/nvidia-logo-white.svg, assets/tavily-logo.png (cream, for dark grounds) — the three sponsor marks for frame 4.
- assets/retro-kit.js + assets/fonts/ — the launch film's component kit and fonts (documented in frame.md).
- reference/launch-frames/*.html — the launch film's finished frames for the same beats, reused as starting points.

## Customizations

- Pixel-dither wipes at 0:08 and 0:22.5, and a final cover at 0:30 that the demo will reveal from.
- The R1 logo persists across the frame 3 → 4 cut (same position and size) and becomes the agent hub.
- One sample project threads through: #042 Repo Whisperer (the landing's own sample) — its checks wait in frame 2, the agent runs them in frame 4.

## Notes

- Narration: the plan's 70-word voiceover (below) is not in this build. HeyGen is signed out and the local Kokoro voice engine is missing its Python deps, so this cut is music + on-screen text (the plan says the intro reads on its own). Voiceover can be added later — the user's own read is the best fit, since they'll narrate the demo.
  - Planned VO: "Hi, judges. Fifteen hundred projects. Every repo to build, every demo to check, before you judge a single idea. / RoundOne is open-source hackathon judging and management. Its agent takes round one. / Nebius Sandboxes run, test and search the code. Tavily reads the live web. NVIDIA Nemotron on Nebius Token Factory checks every claim. / Let AI judge the code, classify and summarize. Keep human judging human. / Here's how it works."
- No SFX this cut (the SFX library needs HeyGen sign-in). The launch film shipped music-only too.
- 1,500+ projects comes from DEVPOST.md; confirm against the Devpost gallery count.
- Keep everything above y=900. No invented metrics; illustrative UI text only (terminal lines, verdict rows) from the landing's own mocks.
