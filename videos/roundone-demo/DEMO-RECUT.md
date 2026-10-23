# Demo recut — live footage for Devpost

Devpost flagged the submission: the rules ask for "footage that shows the Project functioning on the device for which it was built". The current cut (`renders/roundone-launch-tour-vo-fast.mp4`, 2:37) is all motion graphics built from screenshots, so nothing in it shows the app actually running. This recut puts screen recordings of the real app at roundone.dev at the center: a team submitting, the agent working live in a Nebius sandbox, Tavily reading the web, a person making a call, a judge scoring, and results going out.

Hard limit: 3:00. Target 2:50.

## What the app can show live

These already exist in the app. Nothing needs building.

| Moment | Where | What appears on screen |
| --- | --- | --- |
| A team submits | `/f/…` public form | The branded form; after submitting, the confirmation |
| Import from Devpost | `/api/intake` | `curl` in a terminal, then the project shows up in Judging › Projects |
| Agent starts | Project page › **Run agent review** | Each criterion card gets a spinner and a live activity line (`Sandbox: pnpm install`). The page refreshes itself every 2.5s while it works |
| Nebius sandbox | A step's trace | `Cloned github.com/… in a Nebius sandbox`, then `$ pnpm install → exit 0`, `$ pnpm build → exit 0`, `$ pnpm test → …` with times. Click a line to open the command's output |
| Tavily Extract | Web scraper trace | `Read https://their-demo.app`. Click it to see the page as markdown |
| Tavily Crawl | Web scraper trace (In-depth tier only) | `Crawled their-demo.app: 4 more pages`, with the URLs |
| Tavily Search | Investigation trace (Balanced or In-depth) | `Searched the web for "…"`, expanded to the answer and results |
| Agent tools | Investigation trace | `Searched the repo for /…/`, `Read src/…`, `$ <command>` run by the agent |
| Nemotron verdict | Step trace and card | `Scored by nvidia/Nemotron-3-Ultra…: 7/10 · confidence 0.82`, then the double check |
| Summary | Agent review card | Score, gates passed, strengths, what to improve |
| A person decides | Inbox | A failed gate with the agent's evidence; **Back in the pool**; the audit-trail entry |
| Judge scores | `/j/…` portal | Batch list, project page, scoring rail; after submitting, the agent's score and the 2-point gap callout |
| Chat with the web | Judging › Chat | The answer streams in, with "searched the web · read 2 web pages" and the sources |
| Results | Progress › close phase, then `/w/…` | Ranking, then the public winners page |

## Recommended cut (2:50)

Keep the first 17 seconds of the current film (the hook and the ROUND 1 slam, with their recorded voice). Everything after that is live footage, in the tour's look: the app in a browser window with the URL bar visible, the chapter stepper (Setup · The agent · Judging · Results) top-right, and a small sponsor tag (Nebius, Tavily, NVIDIA) that pops in each time one of them does the work.

| # | Time | Chapter | On screen (recorded) | Voiceover (new) |
| --- | --- | --- | --- | --- |
| 0 | 0:00–0:17 | — | Existing hook + ROUND 1 slam | Existing: "Want people building on your product? … Introducing RoundOne. It's open source, and you can host it yourself." |
| 1 | 0:17–0:32 | Setup | roundone.dev in the URL bar. Setup › Criteria: open a criterion's Agent tab. Sandbox run, Web scraper and Agent judge are on, the tier is In-depth, the sandbox commands are filled in | "This is RoundOne, running at roundone dot dev. For each criterion, I tell the agent how to check it: build the code in a Nebius sandbox, read the live demo with Tavily, and score it with Nemotron." |
| 2 | 0:32–0:50 | Setup | Private window: the `/f/…` form. Paste a repo, a live demo URL and a YouTube link, submit, see the confirmation. Cut to Judging › Projects with the new project in the list. Optional 2s: `curl` to `/api/intake` | "Teams submit through a public form built from my rubric, or I import them from Devpost through the API. Here's a real one: a repo, a live demo and a video." |
| 3a | 0:50–1:12 | The agent | Project page › Run agent review › confirm. Cards start spinning. Speed up 8× (with an `8×` tag) through the install, dropping to 1× as `Cloned … in a Nebius sandbox`, `$ pnpm install → exit 0` and `$ pnpm build → exit 0` land. Click `pnpm build` to open its output. **Nebius** tag | "I start the agent. It clones the repo into a Nebius sandbox, then installs it, builds it and runs the tests. Every command and its output is right here." |
| 3b | 1:12–1:28 | The agent | Web scraper step: open `Read https://…` to show the extracted page, then `Crawled …: 4 more pages`, then `Searched the web for "…"` with its results. **Tavily** tag with `Extract · Crawl · Search` | "Then it reads the live demo with Tavily, crawls a couple of links deep, and searches the web to check the team's claims and look for prior art." |
| 3c | 1:28–1:40 | The agent | `Scored by nvidia/Nemotron…` line, the double-check line, then the finished review card: score, gates, strengths, what to improve. **NVIDIA** tag | "Nemotron scores each criterion against that evidence, with sources, and a bigger Nemotron double-checks anything uncertain. It checks and summarizes. It doesn't pick winners." |
| 4 | 1:40–1:52 | The agent | Inbox: a project that failed a gate, with the evidence. Click **Back in the pool**, confirm, open the project and show the audit-trail entry | "Anything that fails a must-pass check comes to my inbox. I make the call, and it goes on the audit trail." |
| 5 | 1:52–2:12 | Judging | Private window: the `/j/…` link. Today's batch, open a project, play the video for a second, score the criteria, submit. The agent's score appears with the gap callout | "Judges get a private link and a short batch. They watch, read, try the demo and score the idea. Only after they submit do they see the agent's score, and a big gap gets pointed out." |
| 6 | 2:12–2:28 | Judging | Judging › Chat, Smart mode. Type: "Do any of these projects already exist as products? Search the web." The answer streams with "searched the web · read 2 web pages"; open the sources. **Tavily** tag | "I can ask across every project. Nemotron reads the submissions, and Tavily searches the live web to break a tie or check what's really new." |
| 7 | 2:28–2:44 | Results | Progress: close the phase, the ranking appears. Results › Publish. The `/w/…` winners page loads, scroll the podium | "When a round closes, RoundOne ranks the projects and moves the best ones on. Then I publish the winners and share the page." |
| 8 | 2:44–2:50 | — | Existing end card (frame 30) | "RoundOne is open source. Get started at roundone dot dev." |

Segment 3 is the one Devpost is asking for, so it gets the most time (50s). Keep at least one stretch of 5–8 seconds at real speed where trace lines appear on their own, so it's plain the page is live and not a mockup. Label every speed-up.

## Minimum fix (keeps the current 2:37 film)

If you'd rather keep the film as it is, swap these tour scenes for live clips of the same length. The music and the other scenes stay. Times are in the current fast cut (about ±1s).

| Current scene | Time | Replace with | VO |
| --- | --- | --- | --- |
| Start a hackathon + Shape every submission | 0:51–1:03 (12s) | Segment 2: the form submission | New |
| Start judging + The agent at work + Checked, verified | 1:11–1:31 (20s) | Segments 3a–3c, cut hard (about 8s sandbox, 8s Tavily, 4s verdict) | New |
| A person makes the call | 1:31–1:37 (6s) | Segment 4, short | Keep |
| Judges score the idea | 1:42–1:50 (8s) | Segment 5, short | Keep |
| Ask across every project | 2:03–2:11 (8s) | Segment 6 | New |
| Winners page | 2:28–2:33 (5s) | The live `/w/…` page | Keep |

That's about a minute of live footage. It's enough to meet the rule, but 20 seconds is tight for the sandbox and Tavily together, which is why the recommended cut gives them 50.

## Before recording

**Accounts and keys**
- Record on roundone.dev with your organizer account. The demo login is read-only and can't run the agent.
- Check that prod has `NEBIUS_PROJECT_ID` and `TAVILY` set. Without them, the project page shows "Sandbox runs are off" or the trace says "TAVILY isn't set".
- For the judge and inbox shots, either use a fresh hackathon or run `pnpm demo:seed --owner you@…` to get demo hackathons you own (with scores already in) that you can close and publish.
- Make yourself the judge, or set `EMAIL_REDIRECT_TO`, so no real judge gets a test email.

**The project the agent reviews**
- Use a small public repo you own that installs and builds in a minute or two, with a live demo URL and a YouTube video of three minutes or less (the agent checks the length). A step stops after 14 minutes.
- For the criterion you'll show, pick **In-depth** (only In-depth crawls), turn on Sandbox run, Web scraper and Agent judge, and add guidance like "Search the web for prior art and check the README's claims against the live demo". That makes a web search very likely.
- For the inbox shot, add a second project that fails a gate, such as one that doesn't use an NVIDIA model.
- Do a full dry run first, then record the second run with **Re-run review**, once you know how long it takes and where the good lines land.

**Capture**
- Browser window at 1440×900, recorded at 2×. Hide the bookmarks bar and extensions, and use a clean profile. Keep the URL bar.
- Keep the project tab in front while the agent runs. The page stops refreshing while its tab is hidden, and catches up when you come back.
- Screen Studio (or similar) gives smooth cursor movement and auto-zoom. With QuickTime, the zooms can be added in the edit.
- Record each segment as its own clip, with a few seconds before and after, and no talking. The voiceover is recorded separately.

## Voiceover

Same voice as the story read (ElevenLabs, Flint), so the cold open and the new part sound like one person. About 330 words over 2:33, which is a calm walkthrough pace. Record it as one read with a one-second pause between segments.

> This is RoundOne, running at roundone dot dev. For each criterion, I tell the agent how to check it: build the code in a Nebius sandbox, read the live demo with Tavily, and score it with Nemotron.
>
> Teams submit through a public form built from my rubric, or I import them from Devpost through the API. Here's a real one: a repo, a live demo and a video.
>
> I start the agent. It clones the repo into a Nebius sandbox, then installs it, builds it and runs the tests. Every command and its output is right here.
>
> Then it reads the live demo with Tavily, crawls a couple of links deep, and searches the web to check the team's claims and look for prior art.
>
> Nemotron scores each criterion against that evidence, with sources, and a bigger Nemotron double-checks anything uncertain. It checks and summarizes. It doesn't pick winners.
>
> Anything that fails a must-pass check comes to my inbox. I make the call, and it goes on the audit trail.
>
> Judges get a private link and a short batch. They watch, read, try the demo and score the idea. Only after they submit do they see the agent's score, and a big gap gets pointed out.
>
> I can ask across every project. Nemotron reads the submissions, and Tavily searches the live web to break a tie or check what's really new.
>
> When a round closes, RoundOne ranks the projects and moves the best ones on. Then I publish the winners and share the page.
>
> RoundOne is open source. Get started at roundone dot dev.

Pronunciation: Nebius "NEB-ee-us", Nemotron "NEM-oh-tron", Tavily "TAV-ih-lee", roundone.dev "round one dot dev".

If you record it in your own voice instead, change the cold open too, so the whole film has one narrator.

## Assembly

The recorded clips can go into this HyperFrames project as `<video>` clips inside a `TK.window` frame, with the existing `TK.header` and chapter stepper. Then the live part keeps the film's look, and `kit/add-overlays.mjs` and `kit/carve-music.mjs` place the voice and carve the music as before. The other option is a regular editor (Screen Studio → DaVinci Resolve or Final Cut), with the cold open and end card exported from the current render.
