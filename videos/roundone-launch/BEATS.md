# Music sync — cue sheet

The film is cut to **120 BPM in 4/4**: a beat every 0.5s, a bar every 2s, 33 bars (66s). Every frame starts on a bar line and the main hits land on beats.

## The music that's in it

`assets/music/roundone-bgm.mp3` (3:24, measured at **118.59 BPM**, steady) is mounted by `kit/add-overlays.mjs`:

- It plays 1.19% fast with pitch kept (`data-playback-rate` 1.01192), so every song bar is exactly 2.000s and its beats sit on the film's grid.
- The song has 5 bars of intro before its groove drops in; the film needs 8 before "ROUND 1". So 0:00–0:08 plays intro bars 1–4, and 0:08 onward plays from bar 2, repeating bars 2–4 into bar 5 — the groove lands on **0:16.0**. A 0.1s crossfade covers the seam at 0:08.
- The song's 8-bar phrases then start at 0:32, 0:48 and 1:04. It fades out from 1:03.5 to 1:06.
- Both pieces ride one `music` bus: -4 dB into a -1 dB limiter. The render measures -16.9 LUFS, peak -3.6 dBFS.

The intro arrangement is specific to this song (its 5-bar intro). A different track needs its own tempo and drop measured and the arrangement redone in section 2 of `kit/add-overlays.mjs`, then a re-render.

## Sections (bar lines)

| Time | Bar | Frame | What happens |
| --- | --- | --- | --- |
| 0:00 | 1 | 01 Hook | Question types in over the pixel sky |
| 0:04 | 3 | 02 Building got cheap | Page scrolls up from the clouds |
| 0:10 | 6 | 03 Buried in AI slop | Judge queue |
| 0:16 | 9 | 04 ROUND 1 | **The drop.** Arcade slam, logo, promise |
| 0:22 | 12 | 05 Shaped to your rubric | Schema → criteria |
| 0:28 | 15 | 06 The agent | Checks turn Pass one by one |
| 0:34 | 18 | 07 Open stack | NVIDIA Nemotron, Nebius, Tavily |
| 0:40 | 21 | 08 The split | Machine checks, people decide |
| 0:44 | 23 | 09 On the record | Inbox click, audit trail |
| 0:50 | 26 | 10 Rounds and emails | Funnel, emails fly out |
| 0:56 | 29 | 11 Winners | Podium, confetti |
| 1:00 | 31 | 12 Outro | End card, 8-bit button press |
| 1:06 | 34 | — | End |

## Hits worth a sound

| Time | Hit |
| --- | --- |
| 0:02.0 | "Run a hackathon." slams in (screen shake) |
| 0:02.5 · 2.75 · 3.0 | Three +pickup chips pop |
| 0:05.5 | The 1,000-pixel flood sweeps in |
| 0:09.0 | "400" judge-hours lands |
| 0:11.5 | The judge queue starts scrolling |
| 0:15.65–16.0 | Pixel wipe to night |
| 0:16.0 | **ROUND 1 slam** (shake) |
| 0:18.0 | R1 logo pops |
| 0:21.65–22.0 | Pixel wipe |
| 0:26.0–26.75 | Four connectors draw |
| 0:29.0 · 29.5 · 30.5 · 31.0 · 32.5 | Agent checks flip to Pass |
| 0:30.0 · 32.0 | Headline word swaps (Watches / Visits) |
| 0:33.0 | Score 8.5 |
| 0:33.5 | "Agent review done" |
| 0:33.65–34.0 | Pixel wipe |
| 0:35.25 · 35.75 · 36.25 | Nemotron tiers power up |
| 0:39.65–40.0 | Pixel wipe |
| 0:42.5 · 43.0 | Split badges pop |
| 0:46.0 | Click: "Back in the pool" |
| 0:47.5–48.25 | Audit trail stamps |
| 0:52.5 · 53.0 · 53.5 | Emails fly out |
| 0:57.5 | Confetti burst |
| 0:59.0 | Share click |
| 0:59.65–60.0 | Pixel wipe |
| 1:03.5 | 8-bit "Get started" press |
