---
workflow: general-video
flow: automation
storyboard: no
destination: Devpost demo video (YouTube), 1920x1080, 30 fps, under 3:00
voice: ElevenLabs Flint (scratch read for timing until the real read is dropped in)
---

# RoundOne demo film

Devpost asked for "footage that shows the Project functioning on the device for which it was built". The launch film (`../roundone-launch`, kept as it is) is motion graphics built from screenshots. This film is the live app: screen recordings of RoundOne on localhost doing a real hackathon end to end, plus the dev server's real request log proving the Nebius Token Factory, Nebius Sandboxes and Tavily calls.

## Intent

- Cold open: the first 16.8 s of the launch film (hook and ROUND 1 slam, its own voice and music).
- Live tour, in the launch film's look (paper ground, Geist Pixel titles, chapter stepper Setup · The agent · Judging · Results): criteria setup, a team submitting Hey Trivi through the public form, the agent run (Nebius sandbox commands, Tavily read/crawl/search, Nemotron verdict), the server log, Start judging and the inbox call on Dolly, the judge portal, chat with web search, closing the round and the public winners page.
- End card: the launch film's last 4.7 s ("Ready for round one?", its own voice line).

## Must-haves

- Every sped-up stretch carries its speed (`N× speed`). The browser bar shows the real localhost address, never roundone.dev.
- Recordings live in `assets/live/` (2880x1800, recorded headless at 1440x900 @2x). See `DEMO-RECUT.md` for the original plan.
- The edit is `edit.json`; `node kit/build.mjs` writes `index.html` and `compositions/tour.html` from it.
