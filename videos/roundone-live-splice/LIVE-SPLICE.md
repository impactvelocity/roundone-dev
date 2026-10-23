# Live splice — main film + live agent footage

**Render:** `renders/roundone-live-splice.mp4` — 2:55.0, 1920×1080, 30 fps, −16.5 LUFS (peak −1.8 dBFS).

The main film (`../roundone-launch/renders/roundone-launch-tour-vo-fast.mp4`, 2:37, left as it is), with its "Checked, verified, summarized" scene swapped for 33 s of the real app running and the dev server's request log beside it. Two short tour scenes come out to pay for the time. `../roundone-launch` and `../roundone-demo` are untouched; this project works from copies (`assets/main.mp4`, `assets/live/`).

## What changed in the main film

| Main film | Time | Change |
| --- | --- | --- |
| Every title | throughout | **Full stops at the end of titles removed** (`kit/periods.py`, below) |
| Story, tour, the agent diagram | 0:00–1:24.4 | Kept. The diagram (repo → R1 → Sandboxes, Tavily, Nemotron → review card) now plays out in full, with its own line "It follows your instructions… checks the claims with NVIDIA Nemotron." |
| Checked, verified, summarized | 1:24.4–1:31.4 | **Replaced** by the live block: pixel wipe in from the diagram, whip-pan out into the inbox scene the way the tour moves between scenes |
| Inbox → Every round, every judge | 1:31.4–1:59.9 | Kept. The last 4.5 s of the project-page scene play at 0.72× to cover the dropped progress scene's picture |
| Every round at a glance (Progress) | 2:00.2–2:02.7 voice | **Dropped** |
| Chat → Preview it. Perfect it | 2:02.7–2:22.7 | Kept |
| Thank everyone who built | 2:22.7–2:28.2 voice | **Dropped** |
| Winners page, end card | 2:28.2–2:37 | Kept |

## The live block (`index.html`, built from `edit.json`)

App window on the left; the server log (`NODE_DEBUG=fetch`, grepped) on the right; three chips under the log: Nemotron on Token Factory `/chat/completions`, Nebius Sandboxes `/sandboxes/v1/…`, Tavily `api.tavily.com`. The chip for what the voice describes turns white. Header, stepper and window chrome copy the main film's tour kit (`../roundone-launch/assets/tour-kit.js`). Titles have no full stops, like the rest of the film now.

| Beat | Length | Title | App footage | Log | Chips lit |
| --- | --- | --- | --- | --- | --- |
| agent | 9.1 s | One entry, every criterion | `10a` 12–22 s at 1.1×: the five criterion cards waiting, then starting (Cloning … in a Nebius sandbox · Getting the video's transcript · Crawling heytrivi.app) | `10b`, same seconds | all three |
| sandbox | 7.0 s | It builds and tests the code | `10a` 22–101 s at 9× / 20× / 6.2×: corepack, `pnpm install`, `build`, `test` → exit 0 | `10b`, same seconds | Sandboxes |
| tavily | 9.0 s | It reads every live link | `03` 135.5–158 s at 2.5×: Impact's trace — Read heytrivi.app (opened), Crawled 3 more pages (opened), Searched the web (opened) | `10b` 50–72 s, tagged **"same review · re-run"** | Tavily |
| verdict | 7.9 s | Checked, verified, summarized | `10a` 108–126.4 s: Investigated / Scored by nvidia/nemotron… then the 6.3 review card | `10b`, same seconds | Token Factory |

Honesty: `10a` and `10b` were recorded together, so in three of the four beats the log is the log of the run on screen ("live · this run"). `03-agent-run` (the clearer Tavily trace) is an earlier run of the same review with no log recording, so the Tavily beat's log comes from the re-run and its bar says so.

## Voiceover

ElevenLabs Flint (`qAZH0aMXY8tw1QufPN0D`, eleven_v4) in the flow https://elevenlabs.io/app/flows/ZIZM9HGlLspK9lsudIog. Takes in `assets/vo/flint/` (`*-v1.mp3` are the first takes of the two re-recorded lines). `bash kit/prep-vo.sh` makes `assets/vo/<id>.wav`: trimmed, **played 1.2×** with pitch kept to match the main film's voice (measured at 1.13–1.25× across its sentences), −16 LUFS, then placed 3 dB down in the mix.

| id | Length at 1.2× | Line |
| --- | --- | --- |
| `agent` | 7.8 s | Here's an entry going through. The agent runs every criterion on Nebius: technical execution, the video, impact, originality. |
| `sandbox` | 6.5 s | For technical execution, it clones the repo into a Nebius sandbox, installs it, builds it, and runs the tests. *(the take's second sentence, "Each step lands in the trace…", is cut)* |
| `tavily` | 8.6 s | Tavily reads every live link: the repo, the README, the demo. Then it searches the web for the name and the idea, so you know if it's new, or a repeat. |
| `verdict` | 6.3 s | Nemotron scores each criterion with the evidence attached. It checks and summarizes. It doesn't pick winners. |

## Title full stops (`kit/periods.py`)

The main film is a render, and the composition behind its fast cut isn't in `../roundone-launch` (that project holds the 3:24 version, and the fast cut isn't a uniform speed-up of it), so its titles can't be retyped. Instead `detect` scans every frame where titles live and finds each title's last full stop: a small square blob with no letter after it on its line, right after a much taller letter that ends at or below it. `apply` covers each stop with the background just to its right, holds resting titles' patches a few frames either side so a stop doesn't flash as a title blurs in or out, and writes `assets/main-clean.mp4` (CRF 12). It found 38 title moments (story and tour), all checked before and after; a re-run of `detect` on the cleaned file finds 2 stray frames, both mid whip-pan. Stops inside a line ("Tired judges. Endless queues", "Preview it. Perfect it") stay.

## Rebuild

```bash
bash kit/prep-vo.sh                       # voice lines from the Flint takes
node kit/build.mjs && npm run check       # index.html from edit.json (warns if a line outgrows its beat)
npx --yes hyperframes@0.8.186 render -o renders/agent-block.mp4 -q delivery --video-frame-format png
uv run --with numpy --with scipy python -I kit/periods.py detect   # then: … apply
node kit/assemble.mjs                     # → renders/roundone-live-splice.mp4
```

`kit/assemble.mjs` holds every cut point and the reasoning. The tour's voice runs ahead of its pictures and scenes change with whip-pans and crossfades, so each seam cuts sound in a voice pause and picture clear of any transition carrying a dropped scene, and the pieces are sized so sync holds (checked frame-exact in the last stretch). The music bed runs unbroken under the tour at main time − 2.154 s (found by cross-correlating the film with `roundone-bgm.mp3`). The block's bed continues the song from 1:25.2, ducked under the new voice, and rejoins the film's bed on the same bar phase. Audio seams are 0.1 s crossfades inside voice pauses.

## Measured, not heard

- Loudness: tour before the block −16.3 LUFS, block −16.4, whole film −16.5; music floor in voice pauses −32/−33 dB on both sides.
- Every seam checked frame by frame, and in a Whisper transcript (no clipped words).
- The two dropped voice stretches are 2.5 s and 5.5 s (5 and 11 beats), so between the chat and winners seams the bed sits one beat off its bar. It's beat-aligned at both seams, and the bar phase is restored after the second one. Listen there first.
