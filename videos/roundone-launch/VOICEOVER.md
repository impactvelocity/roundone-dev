# Voiceover — RoundOne launch film (3:24)

Two parts: the story (0:00–1:06), already recorded, and the app tour (1:03–3:24), still to record in the same ElevenLabs voice (Flint). Both are cut in their pauses and each line is placed on its scene by `kit/add-overlays.mjs`, with the music carved around the voice by `kit/carve-music.mjs`.

## Part 1 — the story (recorded)

`assets/voiceover/roundone-vo.mp3`, cut into 11 clips. The read's last line ("Get started at roundone dot dev") is dropped: the tour takes over from there.

| Plays at | Scene | Line |
| --- | --- | --- |
| 0:00 | Hook | Want people building on your product? Run a hackathon. AI lets everyone build now, so instead of a hundred projects, you get a thousand. Your judges get worn out, and the creative ones get buried in AI slop. |
| 0:16.6 | ROUND 1 (after the slam) | Introducing RoundOne. It's open source, and you can host it yourself. |
| 0:22.3 | Shaped to your rubric | You set up your rubric once, and every submission comes in shaped to fit it. |
| 0:27.3 | The agent | Then your AI agent takes the first round. |
| 0:30.1 | | It builds the repo, runs the tests, and searches the code in a sandbox. |
| 0:34.8 | Open stack | It reviews each project against your rubric, using NVIDIA Nemotron on Nebius. |
| 0:40.4 | The split | The AI checks the code, and people judge the creativity. |
| 0:44.4 | On the record | Flagged projects come to you, and every judging decision leaves an audit trail. |
| 0:50.3 | Rounds and emails | RoundOne moves projects from round to round and coordinates at each stage. |
| 0:56.3 | Winners | And winners get a public page, prizes and all. |
| 1:00.4 | Take the tour | Let your judges do the part only people can do. |

## Part 2 — the app tour (to record)

About 300 words over 2:20, a relaxed pace with room to breathe between scenes. Each line starts on its scene; drifting half a second either way is fine. Record it as one read with a clear pause (about a second) between the numbered lines, so they're easy to cut and place.

| # | Starts | Scene (length) | Line |
| --- | --- | --- | --- |
| 1 | 1:03.6 | Take the tour (end of) | Let's take a tour of the RoundOne app. |
| 2 | 1:06.4 | Start a hackathon (8s) | First, create your hackathon. Give it a name and the dates, and host it wherever you like — we like Devpost. |
| 3 | 1:14.3 | Project schema (8s) | Then shape what teams submit. Every field has a type — link, repo, video, file — so the agent knows what to check. |
| 4 | 1:22.3 | Set the rules once (10s) | Set your criteria and how each one is checked. Pick the model, plan your rounds, share out the work, and give each judge a private link. |
| 5 | 1:32.4 | Start judging (6s) | When everything's ready, start judging. The projects come in, and the agent takes over. |
| 6 | 1:38.4 | The agent at work (12s) | It follows your instructions: it builds and tests the code in a Nebius sandbox, searches for the SDK calls you asked about, and checks the claims with NVIDIA Nemotron. |
| 7 | 1:50.5 | Checked, verified, summarized (8s) | It doesn't pick winners. It checks, verifies and summarizes, so your judges can focus on the human side. |
| 8 | 1:58.4 | The inbox (8s) | Anything that fails a must-pass check lands in your inbox. A person makes the call, and every decision goes on the audit trail. |
| 9 | 2:06.4 | Judge email (6s) | Judges get their projects by email — all at once, or in daily batches so nobody burns out. |
| 10 | 2:12.6 | The judging page (10s) | The judging page is distraction-free. Watch the video, read the pitch, try the demo, score each criterion, leave a note — then on to the next. |
| 11 | 2:22.4 | Scores roll up (6s) | RoundOne combines all the judges' scores and moves the strongest projects on to the next round. |
| 12 | 2:28.4 | A project's page (6s) | Open any project to see its progress, its feedback, and its scores, by round and by judge. |
| 13 | 2:34.5 | Progress (6s) | And the progress page shows every round at a glance. |
| 14 | 2:40.4 | Chat (10s) | Anyone can chat across all the projects — filter by round, group or judge — to compare, dig in, or break a tie, with Nemotron doing the reading. |
| 15 | 2:50.5 | Rewards (8s) | Managing prizes gets messy: cash, credits, swag, event passes, links. Set them up once, and RoundOne keeps track of who gets what. |
| 16 | 2:58.4 | Winner email (6s) | Edit the winners' email and preview it until it's perfect. |
| 17 | 3:04.4 | Thank-you email (8s) | You can also thank everyone who didn't win, recognize their work, and send them something extra to keep the goodwill going. |
| 18 | 3:12.5 | Winners page (6s) | Then publish your winners, and share the page. |
| 19 | 3:18.6 | End card (6s) | RoundOne is open source. Get started at roundone dot dev. |

### Clean read (for recording)

> Let's take a tour of the RoundOne app.
>
> First, create your hackathon. Give it a name and the dates, and host it wherever you like — we like Devpost.
>
> Then shape what teams submit. Every field has a type — link, repo, video, file — so the agent knows what to check.
>
> Set your criteria and how each one is checked. Pick the model, plan your rounds, share out the work, and give each judge a private link.
>
> When everything's ready, start judging. The projects come in, and the agent takes over.
>
> It follows your instructions: it builds and tests the code in a Nebius sandbox, searches for the SDK calls you asked about, and checks the claims with NVIDIA Nemotron.
>
> It doesn't pick winners. It checks, verifies and summarizes, so your judges can focus on the human side.
>
> Anything that fails a must-pass check lands in your inbox. A person makes the call, and every decision goes on the audit trail.
>
> Judges get their projects by email — all at once, or in daily batches so nobody burns out.
>
> The judging page is distraction-free. Watch the video, read the pitch, try the demo, score each criterion, leave a note — then on to the next.
>
> RoundOne combines all the judges' scores and moves the strongest projects on to the next round.
>
> Open any project to see its progress, its feedback, and its scores, by round and by judge.
>
> And the progress page shows every round at a glance.
>
> Anyone can chat across all the projects — filter by round, group or judge — to compare, dig in, or break a tie, with Nemotron doing the reading.
>
> Managing prizes gets messy: cash, credits, swag, event passes, links. Set them up once, and RoundOne keeps track of who gets what.
>
> Edit the winners' email and preview it until it's perfect.
>
> You can also thank everyone who didn't win, recognize their work, and send them something extra to keep the goodwill going.
>
> Then publish your winners, and share the page.
>
> RoundOne is open source. Get started at roundone dot dev.

### Delivery notes

- Same voice and settings as the story read, so the two halves sound like one person. The tour can sit a touch calmer — it's a walkthrough, not a pitch.
- Pronunciation: Nebius "NEB-ee-us", Nemotron "NEM-oh-tron", Devpost "DEV-post", SDK as letters, roundone.dev "round one dot dev".
- The tightest lines are 6 (the agent at work) and 9 (judge email); if a take runs long, trim "with NVIDIA Nemotron" to "with Nemotron" in line 6, and "all at once, or" in line 9.
- The Vercel Workflow badge in the agent scene has no voiceover on purpose.
