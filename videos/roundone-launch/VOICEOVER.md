# Voiceover script — RoundOne launch film (66s)

Timed against the final cut (`renders/roundone-launch.mp4`) and the scene list in `BEATS.md`. About 150 words, which is a normal speaking pace (roughly 140 words a minute) with room to breathe.

Each line starts on its scene, but it doesn't have to land on a particular on-screen hit. Drifting half a second either way is fine. The one fixed moment is 0:16: stay quiet for about a second and a half so the music drop and the ROUND 1 slam land on their own.

## Cue sheet

| Start | Scene (length) | Line |
| --- | --- | --- |
| 0:00 | Hook (4s) | Want people building on your product? Run a hackathon. |
| 0:04 | Building got cheap (6s) | But AI lets everyone build now, so instead of a hundred projects, you get a thousand. |
| 0:10 | Buried in AI slop (6s) | Your judges get worn out, and the creative ones get buried in AI slop. |
| 0:16 | ROUND 1 (6s) | *(silence for the drop)* |
| 0:17.5 | | Introducing RoundOne. It's open source, and you can host it yourself. |
| 0:22 | Shaped to your rubric (6s) | You set up your rubric once, and every submission comes in shaped to fit it. |
| 0:28 | The agent (6s) | Then an AI agent takes round one. It builds the repo, runs the tests, and searches the code. |
| 0:34 | Open stack (6s) | It reviews each project against your rubric, using NVIDIA Nemotron on Nebius. |
| 0:40 | The split (4s) | The machine checks the machine, and people judge the ideas. |
| 0:44 | On the record (6s) | Flagged projects come to you, and every judging decision leaves an audit trail. |
| 0:50 | Rounds and emails (6s) | RoundOne moves projects from round to round and sends the emails at each stage. |
| 0:56 | Winners (4s) | And winners get a public page, prizes and all. |
| 1:00 | Outro (6s) | Give your judges their attention back. Get started at roundone dot dev. |

## Clean read

> Want people building on your product? Run a hackathon.
>
> But AI lets everyone build now, so instead of a hundred projects, you get a thousand. Your judges get worn out, and the creative ones get buried in AI slop.
>
> *(let the drop play)*
>
> Introducing RoundOne. It's open source, and you can host it yourself.
>
> You set up your rubric once, and every submission comes in shaped to fit it. Then an AI agent takes round one. It builds the repo, runs the tests, and searches the code. It reviews each project against your rubric, using NVIDIA Nemotron on Nebius.
>
> The machine checks the machine, and people judge the ideas.
>
> Flagged projects come to you, and every judging decision leaves an audit trail. RoundOne moves projects from round to round and sends the emails at each stage. And winners get a public page, prizes and all.
>
> Give your judges their attention back. Get started at roundone dot dev.

## Delivery notes

- Read it the way you'd explain RoundOne to someone who runs hackathons. Keep the first 16 seconds low-key, since that's the problem, and pick up after the drop.
- Pronunciation: Nebius "NEB-ee-us", Nemotron "NEM-oh-tron".
- Record while the silent render (`renders/roundone-launch-silent.mp4`) plays, and start each line on its scene.
- 0:28–0:44 is the densest stretch. If it runs long, shorten "using NVIDIA Nemotron on Nebius" to "on Nebius".
- Once it's recorded, the voice goes on its own track with the music ducked about 8–10 dB underneath it (the music bus lives in `kit/add-overlays.mjs`), then the film is re-rendered.

## On-screen copy that no longer matches

The voiceover now describes what the agent and the emails actually do, but two frames of the film still say otherwise:

- **Frame 06 (0:30):** the headline swaps to "Watches every demo." The video tool reads the transcript and looks at a few frames; it doesn't watch the video.
- **Frame 10 (0:53):** headline B reads "Every entrant hears back."
