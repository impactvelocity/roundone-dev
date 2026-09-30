# RoundOne — Devpost demo video plan

**Format:** landscape 1920×1080, 30fps · **Length:** 2:50 (170.5s). The rules allow 3:00, so treat 2:55 as the ceiling. · **Voice:** narrated in the first person, ideally by you · **Tone:** arcade-cinematic and narrated, with the launch film's look at a demo's pace · **Where:** a public YouTube video, linked from the Devpost entry

## What the video has to do

From the hackathon page (nebiusglobalaihackathon.devpost.com):

- "Upload a 3-minute or shorter public YouTube video showing your project working."
- It must show "how you used Nebius Token Factory and NVIDIA Nemotron or other NVIDIA open source models."
- It's judged on Technological Implementation, Design, Potential Impact and Quality of the Idea. There's also a $3,000 Best Use of Tavily prize.

| What judges score | Where the video answers it |
|---|---|
| **Technological Implementation:** how well it's built, and how it uses Token Factory and Nemotron | Scenes 6–11: the agent is set up and runs for real, with Nebius Sandboxes, Tavily, the three Nemotron tiers, strict JSON, the double check and the trace |
| **Design:** a complete product, not a proof of concept | Scenes 12–16: the judge's private link, rounds, chat, prizes, emails and the public winners page |
| **Potential Impact:** a real problem for a real audience | Scenes 1–2: this hackathon's own judges and their 1,500+ projects. Scene 17: open source, for any team that runs a hackathon |
| **Quality of the Idea:** a non-obvious use of the models | Scenes 3–5: AI judging AI doesn't work, so the agent checks and people judge. Scene 13: the agent's score stays hidden until the judge submits, and it only breaks ties |
| **Best Use of Tavily** | Scene 8 (crawl, extract and search inside the agent) and scene 15 (the chat searching the web) |

## The questions first

- **What is it?** Open-source, self-hosted hackathon judging. An NVIDIA Nemotron agent on Nebius checks every project first, and people judge the ideas.
- **Who is it for?** Teams that run hackathons, and the judges they recruit. This video is aimed at one group of judges in particular: the ones watching it.
- **What sets it apart?** It splits the work. The agent does the checking: does it build, does it call the sponsor's API, is the demo up, is the video under the limit. People judge the idea. The agent's score stays hidden until a judge submits their own, and it only breaks ties.
- **Most impressive moment:** RoundOne, set up with this hackathon's own rules, judging its own entry. It clones the repo into a Nebius Sandbox, builds it, finds the Token Factory calls, crawls roundone.dev with Tavily, and returns Nemotron's verdict with evidence down to the file and line.
- **Visual hook:** "Hi, judges." types in over the night sky. Then 1,500 pixel squares flood the frame, and one lights up: this one.
- **Share caption:** "The judges of this hackathon have 1,500+ projects. RoundOne's Nemotron agent on Nebius checks every one first, so they can spend their time on the ideas."

## Angle

Talk to the judges directly. This video is one of the 1,500+ in their pile, and it's about them. The story runs: the problem, the wrong fix (AI judging AI), the right split, the agent at work on Nebius, NVIDIA and Tavily, the app for judges and organizers, then "Thanks for judging."

- **Hook (0:00–0:07):** "Hi, judges. You have more than fifteen hundred projects to get through. This one's about you."
- **Highlights:**
  1. RoundOne judging its own entry against this hackathon's rules, recorded live.
  2. Each sponsor has one clear job. Nebius Sandboxes run the code, Tavily reads the live web, and Nemotron on Token Factory makes the call.
  3. Judges score first and compare after. The agent never picks the winner.
- **Punchline:** "Let the machine check the machine, and give your judges their attention back. Thanks for judging."
- **Bookends:** it opens on ROUND 1 and closes on THANKS FOR JUDGING, like the start and end screens of an arcade game.
- **A thread to follow:** Nexus Copilot, the project an AI-only judge gives 10/10 in scene 3, comes back as a real test project. RoundOne flags its README in scene 10, and its failed gate goes to the inbox in scene 11.

## Look

- The identity is the launch film's (`videos/roundone-launch/frame.md`). That means a paper background with the pixel dot grid, white `rk-mock` cards with a soft violet lift, and Geist Pixel headlines. Violet stands for the agent and magenta for people, and acts are separated by pixel-dither wipes. The night-sky and neon-floor art frame the opening, the reveal, the stack and the close.
- **What's new:** it's narrated, the holds are longer, and 96 of its 170 seconds are real recordings of the app. Each recording sits in an `rk-mock` card at least 78% of the frame wide. Above the card go a mono eyebrow with the app's own breadcrumb (like "Setup › Criteria") and a short Geist Pixel headline. The camera pushes in, up to 1.6×, on whatever the voice is describing.
- Headlines are 2–6 words. They support the voice rather than repeat it. Anything meant to be read stays up for at least 0.3s per word.
- **Honesty chips:** sped-up recordings get a small mono "sped up 20×" chip, and screens from the seeded demo hackathons get a "sample data" chip.

## At a glance

| # | Scene | Time | Length | Source |
|---|---|---|---|---|
| | **Act 1 · The problem** | 0:00–0:49.5 | 49.5s | |
| 1 | Hi, judges | 0:00.0–0:07.0 | 7.0 | New, from launch 01 + 02 |
| 2 | The grind | 0:07.0–0:18.5 | 11.5 | New, with launch 03 |
| 3 | AI judging AI | 0:18.5–0:31.5 | 13.0 | New (landing `AiOnlyJudge`) |
| 4 | AI is great at checking | 0:31.5–0:37.5 | 6.0 | New (pairs with 2) |
| 5 | ROUND 1 | 0:37.5–0:49.5 | 12.0 | Launch 04 + 08 |
| | **Act 2 · The agent** | 0:49.5–1:53.5 | 64.0s | |
| 6 | This hackathon's rules | 0:49.5–1:00.5 | 11.0 | Footage F1 |
| 7 | Built in a Nebius Sandbox | 1:00.5–1:12.0 | 11.5 | Footage F2 |
| 8 | The live web, through Tavily | 1:12.0–1:22.5 | 10.5 | Footage F2 |
| 9 | Nemotron makes the call | 1:22.5–1:35.5 | 13.0 | Launch 07 + `devpost/agent-stack.png` |
| 10 | Every verdict, with its evidence | 1:35.5–1:44.5 | 9.0 | Footage F3, F4 |
| 11 | A person makes the call | 1:44.5–1:53.5 | 9.0 | Footage F5 |
| | **Act 3 · The app** | 1:53.5–2:38.5 | 45.0s | |
| 12 | A batch, not a pile | 1:53.5–2:02.0 | 8.5 | Footage F6 |
| 13 | Score first, then compare | 2:02.0–2:10.5 | 8.5 | Footage F7 |
| 14 | Judges rank, the agent breaks ties | 2:10.5–2:21.5 | 11.0 | Footage F8 |
| 15 | Ask across every project | 2:21.5–2:30.5 | 9.0 | Footage F9 |
| 16 | Winners, announced | 2:30.5–2:38.5 | 8.0 | Footage F10 |
| | **Close** | 2:38.5–2:50.5 | 12.0s | |
| 17 | Thanks for judging | 2:38.5–2:50.5 | 12.0 | Launch 12 |

## Voiceover script (402 words, about 2:38 of speech at ~153 wpm)

The script is in the first person, matching DEVPOST.md. The numbers are scene numbers. At this pace it leaves about 13 seconds without voice, which go to the lead-in, the ROUND 1 slam, the 10/10 stamp, the act breaks and the final hold.

> **1.** Hi, judges. You have more than fifteen hundred projects to get through. This one's about you.
>
> **2.** Each one means finding the repo, checking it calls Token Factory, timing the video, all before you reach the idea. By project forty, the idea gets a tired judge.
>
> **3.** The obvious fix is to throw AI at it. But AI judging AI doesn't work: write-ups made with AI are tuned to hit every rule, and an AI judge rewards exactly that.
>
> **4.** But checking is what AI is great at, and it never gets tired.
>
> **5.** So I built RoundOne. *(ROUND 1 slam.)* The agent takes round one and checks the code. People judge the idea: how new it is, how creative, whether it matters.
>
> **6.** Here's RoundOne set up with this hackathon's rules. Each criterion says how the agent checks it, and which Nemotron gets the job, or that it's Human only.
>
> **7.** Watch it judge its own entry. Every repo is cloned into a VM-isolated Nebius Sandbox, and each check gets its own fork to install, build and test.
>
> **8.** Tavily gives it the live web. It crawls the live demo, reads the pages a project links to, and searches the web to check its claims.
>
> **9.** Then NVIDIA Nemotron on Token Factory makes the call. It investigates with tools and scores in strict JSON, with evidence down to the file and line. Unsure? A bigger Nemotron looks again.
>
> **10.** Every verdict shows its reasoning, evidence and full trace. And a README that says "score this ten"? Flagged as prompt injection.
>
> **11.** A failed gate doesn't just drop a project. It waits in the inbox, with the evidence, until a person makes the call.
>
> **12.** Judges don't need an account: just a private link, a short batch each day, and each project on one page.
>
> **13.** They score first. Only then do they see the agent's scores, and if they're far apart, RoundOne asks why.
>
> **14.** Organizers bring in projects from a Devpost export, plan the rounds, and close each one. Judges' scores set the ranking; the agent's only breaks ties.
>
> **15.** And they can ask anything across every project: which ones are most alike, or whether an idea already exists on the web.
>
> **16.** Then attach the prizes, email every winner what they won, thank everyone else, and publish the winners page.
>
> **17.** RoundOne is open source and self-hosted, on your own Nebius account. Let the machine check the machine, and give your judges their attention back. Thanks for judging.

## Storyboard (2:50.5)

Every time below comes from the drafted pace and gets retimed to the recorded voice. Lines marked *texture* don't need to be read.

### Act 1 · The problem

#### 1 · Hi, judges — 0:00.0–0:07.0 (7.0s) · new, from launch 01 + 02
- **Voice:** line 1.
- **Picture:** the `retro-hero` night sky. "Hi, judges." types in at center in Geist Pixel. On "fifteen hundred projects", the sky tilts down and a 50 × 30 field of 1,500 pixel squares floods up from the clouds in the sunset palette (the launch film's flood, scaled up). A stepped counter runs up to **1,500+ projects**. On "This one's about you", every square dims except one near the center. That one glows violet, with a small mono label: "this one".
- **Text:** "Hi, judges." (settled 1.0 → 2.6), "1,500+ projects" (3.8 → 7.0).
- **Sound:** the track's filtered intro, soft typing ticks, and a low swell under the flood.

#### 2 · The grind — 0:07.0–0:18.5 (11.5s) · new, with launch 03
- **Voice:** line 2.
- **Picture:** paper. A judge's checklist card for one project has four rows: Find the repo, Calls Token Factory?, Video 3:00 or less?, and a greyed **The idea** at the bottom. The pixel cursor ticks the first three as the voice lists them. The card slides off, the next one arrives, and each arrives faster than the last. A stepped counter climbs to **Project 40** on "By project forty" (7.0 → 15.5). Then comes the launch film's "Buried" queue. The cards drain to grey, and a segmented energy meter drops from 10 to 2 like a health bar. One card, **#251 Signal Garden**, keeps its dusk glow as it sinks under the rest (15.5 → 18.5).
- **Text:** the checklist rows (*texture*), and "Project 40", the only number meant to be read.
- **Sound:** soft tuned clicks for the ticks, speeding up. The music thins as the meter drains.

#### 3 · AI judging AI — 0:18.5–0:31.5 (13.0s) · new, from the landing's `AiOnlyJudge`
- **Voice:** line 3.
- **Picture:** paper. The AI-only judge card from the landing page shows **Nexus Copilot**, "Project #002 · built with a coding agent", with an **AI-only judge** tag. Its rows land on the beat: Uses the sponsor API ✓ Yes, README covers every criterion ✓ Yes, README 1,400 words, Code **8 lines** (magenta flag). On "rewards exactly that", **10 /10** slams in with a short stepped shake. The note "Scored by the same kind of model that wrote it" types in beneath it.
- **Text:** "AI judging AI" (headline, 19.2 → 31.5), "10/10" (29.5 → 31.5).
- **Sound:** a flat, slightly detuned stamp on the 10. It should sound wrong.

#### 4 · AI is great at checking — 0:31.5–0:37.5 (6.0s) · new, pairs with 2
- **Voice:** line 4.
- **Picture:** scene 2's checklist card returns, and this time the rows tick themselves. Each one gets the agent's mechanism tag and a green **Pass**: Builds (Sandbox run), Calls Token Factory (Code scraper), Video 3:00 or less (Video reviewer), Live demo up (Web scraper) (31.8 → 33.8). The energy meter stays full. The camera pulls back to scene 1's 1,500-square field, which flips to violet in one wave (34.0 → 36.0).
- **Text:** "AI is great at checking." (32.0 → 37.5).
- **Sound:** four soft plucks climbing, then a shimmer for the wave.

#### 5 · ROUND 1 — 0:37.5–0:49.5 (12.0s) · launch 04 + 08
- **Voice:** line 5. "So I built RoundOne." lands just before the slam, and the rest follows it.
- **Picture:** a pixel-dither wipe to the night sky. On the bar line at **0:40.0**, the arcade **ROUND 1** slam hits with its screen shake, then the R1 logo pops in. The H1 follows line by line with the voice: "Agents check the code." / "Humans judge the idea.", the second line in the sunset gradient with `hero-glow`. At 46.0 two split cards slide in underneath. The violet **The agent checks** card carries four tags: Sandbox run, Code scraper, Web scraper, Video reviewer. The magenta **People judge** card lists Quality of the idea, Potential impact and Design, each tagged **Human only**.
- **Text:** the H1 (settled 45.0 → 49.5).
- **Sound:** the drop. The groove comes in full on the slam, then ducks under the voice from 41.0.
- **Poster:** the settled H1 over the sky with the logo, at about 0:45.8. It matches `devpost/thumbnail.png`.

### Act 2 · The agent

#### 6 · This hackathon's rules — 0:49.5–1:00.5 (11.0s) · footage F1
- **Voice:** line 6.
- **Picture:** a pixel-dither wipe back to paper, then the real **Setup › Criteria** page for the demo copy of this hackathon. It lists five gates (Builds from the README, Calls Nebius Token Factory, Uses an NVIDIA open model, Live demo works, Demo video 3 min or less) and four scored criteria: Technological Implementation, plus Design, Potential Impact and Quality of the Idea, each marked **Human only**. The cursor opens **Technological Implementation** and goes to its **Agent** tab. That tab shows What to look for, the model picker, Look for in the repo (`tokenfactory.nebius.com`, `nvidia/`) and Double-check set to **When unsure**. The model picker moves from Balanced to **In-depth**, and the model id changes to `nvidia/Nemotron-3-Ultra-550b-a55b`. Push in on the model picker.
- **Text:** eyebrow "Setup › Criteria", headline "This hackathon's rules".

#### 7 · Built in a Nebius Sandbox — 1:00.5–1:12.0 (11.5s) · footage F2
- **Voice:** line 7.
- **Picture:** **Judging › Projects › #001 RoundOne**. The cursor clicks **Run agent review**, the steps queue, and three start at once. Push in on the build step. Its live status line steps through the real messages: "Cloning github.com/…/roundone in a Nebius sandbox", then "Sandbox: pnpm install", then "Sandbox: pnpm build". It's sped up, with the chip showing. In the lower right, a small diagram builds on the beat: the `node:22` base image, then the repo cloned once, then three forks, one per step.
- **Text:** eyebrow "Judging › Projects › #001", headline "Built in a Nebius Sandbox".
- **Sound:** a soft tick for each status change, with the groove running under the voice.

#### 8 · The live web, through Tavily — 1:12.0–1:22.5 (10.5s) · footage F2
- **Voice:** line 8.
- **Picture:** the same run, now on the **Live demo works** step: "Crawling roundone.dev", then its trace fills with the pages Tavily brought back. Cut to the Technological Implementation step's investigation, where the trace shows `readWebPage` and `searchWeb` calls. Use whichever Tavily calls the real trace contains; the crawl on the Live demo gate is the one that always happens. Three chips pop in beside the card: **Extract** reads a project's pages, **Crawl** walks the live demo, **Search** checks claims on the web.
- **Text:** headline "The live web, through Tavily".

#### 9 · Nemotron makes the call — 1:22.5–1:35.5 (13.0s) · launch 07, extended with `devpost/agent-stack.png`
- **Voice:** line 9.
- **Picture:** a night background with stars. The four stages from the agent-stack diagram light up in order, one per beat:
  1. **Gather evidence:** the five mechanisms.
  2. **Investigate:** tool chips light up (`searchRepo`, `readRepoFile`, `listRepoDir`, `runCommand`, `readWebPage`, `searchWeb`).
  3. **Score:** a verdict types out in mono, taken from the real run, with score, confidence, reasoning and evidence with a file:line source.
  4. **Double-check.**

  Beside them the three Nemotron tiers power up: Quick · Nemotron 3.5 Lightning, Balanced · Nemotron 3 Super 120B · up to 6 tool calls, In-depth · Nemotron 3 Ultra 550B · up to 10 tool calls. On "Unsure?", an arrow steps one tier up, from Super 120B to Ultra 550B. A frame around the whole pipeline reads **Nebius Token Factory · every model call**.
- **Text:** headline "Nemotron makes the call". The model names are meant to be read; the tool names and the JSON are *texture*.
- **Sound:** a bass swell, and a shimmer when Ultra 550B lights up.

#### 10 · Every verdict, with its evidence — 1:35.5–1:44.5 (9.0s) · footage F3, F4
- **Voice:** line 10.
- **Picture:** back to paper and the finished review, with its gates passed. The cursor opens **Calls Nebius Token Factory**, which shows Reasoning, Evidence, Feedback for the team, and **How it got there**, the trace with timings. Push in on the real file:line in the evidence, which should be `src/lib/ai.ts`, where the Token Factory base URL lives. The footer shows the run's real model, tier, time and tokens. On "score this ten", hard cut to **#002 Nexus Copilot**, the project from scene 3. Its **Flags** block shows **prompt_injection**, and a magenta flag tag pops. If the agent's real score for it is low, leave it on screen next to scene 3's 10/10.
- **Text:** headline "Every verdict, with its evidence".
- **Sound:** a small, dry "denied" blip on the flag, answering scene 3's stamp.

#### 11 · A person makes the call — 1:44.5–1:53.5 (9.0s) · footage F5
- **Voice:** line 11.
- **Picture:** the top bar's **Inbox** with its red count. The agent-failed inbox holds #002 Nexus Copilot, which failed **Live demo works** (the demo URL returns a 404). Under it are the agent's evidence and the two buttons, **Disagree — back in the pool** and **Agree — keep it out**. The cursor clicks **Agree — keep it out**. The project's **Audit trail** slides in beside it, and the new entry stamps in at the top.
- **Text:** headline "A person makes the call".
- **Sound:** one soft stamp for the audit entry.

### Act 3 · The app

#### 12 · A batch, not a pile — 1:53.5–2:02.0 (8.5s) · footage F6
- **Voice:** line 12.
- **Picture:** a pixel-dither wipe tinted magenta, the judges' color. First, the judge's "batch is open" email, rendered from the real React Email template. Its button opens the judge's private link: "Welcome, Ada", "1 of 4 done, 3 to go", "About 12 minutes", **Keep going →**. Then one project on one page, with the submission on the left (video, repo, live demo) and the rubric on the right.
- **Text:** headline "A batch, not a pile". Add the "sample data" chip.
- **Sound:** the music breaks down to pads for the judges' section, warmer and quieter.

#### 13 · Score first, then compare — 2:02.0–2:10.5 (8.5s) · footage F7
- **Voice:** line 13.
- **Picture:** the judge fills in the scores, and the segmented meters step up. They click **Submit**, and the agent's scores appear beside theirs. The gap callout lands: "3 points from the agent. Say why in your notes?" Push in on the callout.
- **Text:** headline "Score first. Then compare." Add the "sample data" chip.
- **Sound:** a soft pop as the agent's scores appear.

#### 14 · Judges rank, the agent breaks ties — 2:10.5–2:21.5 (11.0s) · footage F8
- **Voice:** line 14.
- **Picture:** four quick shots of about 2.7s each:
  1. The **Projects API** drawer, showing its ready-made **Agent prompt**, which lets a coding agent import a Devpost export. Keep the API key out of frame.
  2. **Setup › Distribution**, previewing each judge's load.
  3. **Judging › Progress**, with the pixel funnel and its live dot. The cursor presses **Close phase**.
  4. The phase's project list, pushed in on its real ordering line: "gate passes first, then by average judge score, then agent score".
- **Text:** headline "Judges rank. The agent breaks ties."

#### 15 · Ask across every project — 2:21.5–2:30.5 (9.0s) · footage F9
- **Voice:** line 15.
- **Picture:** **Judging › Chat**, scoped to one phase. The question types in: "Check if the top project's idea already exists on the web." The answer streams in, sped up, with its tool calls showing: projects searched, pages read, and a Tavily web search. It links each project it mentions. A Tavily chip sits beside the card.
- **Text:** headline "Ask across every project".

#### 16 · Winners, announced — 2:30.5–2:38.5 (8.0s) · footage F10
- **Voice:** line 16.
- **Picture:** a four-shot montage:
  1. **Judging › Rewards**, with prize tiers by rank plus awards.
  2. **Results › Winners**: the podium, with the cursor on **Email winners**.
  3. The winner email's preview.
  4. The public winners page at `/w/…`. The podium is in the hackathon's colors, the **Share** button pulses, and sunset pixel confetti from the launch film's winners frame falls over it.
- **Text:** headline "Winners, announced." Add the "sample data" chip.
- **Sound:** the full groove returns for the confetti, with a sparkle.

### Close

#### 17 · Thanks for judging — 2:38.5–2:50.5 (12.0s) · launch 12
- **Voice:** line 17.
- **Picture:** a pixel-dither dissolve to the `retro-footer` neon floor, gliding forward. The lockup assembles during the first sentence: the R1 logo, **roundone.dev**, the repo URL, "Open source · Self-hosted", and small NVIDIA, Nebius and Tavily marks. "Give your judges their attention back." settles above it with the second sentence, with "attention back" in the sunset gradient. On "Thanks for judging", a pixel line blinks in beneath it like an arcade end screen: **THANKS FOR JUDGING**. The picture fades out over the last 0.8s.
- **Text:** the headline (settled 2:45.0 → 2:50.5), the lockup and the end line.
- **Sound:** the track resolves on a held chord and rings out.

## Sound

- **Music:** your track, `videos/roundone-launch/assets/music/roundone-bgm.mp3` (3:24). Conform it to 120 BPM the same way as the launch film, so a bar is 2s and the reused frames stay on the grid. It's long enough to run under the whole video.
- **Arrangement:**
  - The filtered intro loops under Act 1 (0:00–0:40).
  - The groove drops on the **ROUND 1** slam at 0:40.0 and holds under the agent (0:40–1:53).
  - It breaks down to pads for the judges (1:53.5).
  - It comes back full for the winners (2:30.5).
  - It rings out on the end card.
  
  Measure the song's sections first, as `BEATS.md` did for the launch cut.
- **Mix:** the voice leads. The music sits 18–20 dB under it and comes up in the gaps: the slam, the 10/10, the winners and the end. Aim for −14 LUFS integrated (YouTube's target) and a true peak of −1 dBTP.
- **Effects:** keep them few and soft, tuned to the track and in the same reverb. The full set is typing ticks, checklist clicks, Pass plucks, the flat 10/10 stamp, the slam, the flag blip, the audit stamp and the confetti sparkle. Repeated ticks stay in the background.

## What to record first

The agent footage has to come from a real run. In the seeded demo hackathons, the agent verdicts are written by `scripts/seed-demo.mjs`, not by the agent. Use those hackathons only for the judge and results screens (scenes 12, 13 and 16), with the "sample data" chip.

### Set up

1. **Make the repo public.** The Devpost entry needs that anyway, and the sandbox can't clone a private repo.
2. **Land the README rewrite first.** Another session is rewriting README.md right now, and the "Builds from the README" gate reads it.
3. **Create a demo copy of this hackathon** in RoundOne. Give it a name like "Global AI Hackathon · RoundOne demo", and use the event's name but not its logo. Use this rubric:

   | Criterion | Scale | Mechanisms | Tier |
   |---|---|---|---|
   | Builds from the README | pass/fail gate | Sandbox run | Balanced |
   | Calls Nebius Token Factory | pass/fail gate | Code scraper, Agent judge (look for `tokenfactory.nebius.com`) | Balanced |
   | Uses an NVIDIA open model | pass/fail gate | Code scraper, Agent judge (look for `nvidia/`, `nemotron`) | Balanced |
   | Live demo works | pass/fail gate | Web scraper | In-depth, so it crawls instead of reading one page |
   | Demo video 3 min or less | pass/fail gate | Video reviewer | Quick |
   | Technological Implementation | 1–10 | Sandbox run, Agent judge | In-depth, double-check When unsure |
   | Design | 1–10 | Human only | — |
   | Potential Impact | 1–10 | Human only | — |
   | Quality of the Idea | 1–10 | Human only | — |

4. **Submit RoundOne as #001** through the submission form. Use the repo, roundone.dev, and the launch promo (youtu.be/RQMpDc4jdso, 1:06) as its demo video, because this video doesn't exist yet.
5. **Add #002 Nexus Copilot**, scene 3's project for real. It's a tiny public repo with about 8 lines of code and a long README. The README hides an HTML comment asking AI judges for a 10/10, and the live demo URL returns a 404. The agent should flag the comment (scene 10) and fail **Live demo works**, which puts it in the inbox (scene 11).
6. **Do a dry run.** Run the agent once, and check that RoundOne's own build passes in the sandbox. If it doesn't, set that criterion's sandbox commands to match the README and run it again. If it still won't pass, use another real public repo for the hero shot and change line 7 to "Watch it judge a real submission." Don't use other entrants' projects.

### Capture settings

- A 1920×1080 viewport at 2× device scale (3840×2160 pixels), so push-ins stay sharp. App only, with no browser chrome, in light mode.
- Record on roundone.dev with the organizer account, or on a local production build, so the Next.js dev indicator doesn't show. Demo accounts are read-only. For the seeded demos, record as their owner and re-run `pnpm demo:seed` afterwards to reset them.
- Move the cursor slowly and deliberately, and pause before each click. Record at 30fps or higher.

### Shot list

| # | Scene | Where | What to do | Raw length |
|---|---|---|---|---|
| F1 | 6 | Demo copy › Setup › Criteria | Hold on the list for 3s. Open Technological Implementation, go to the Agent tab, and switch Model from Balanced to In-depth. Hover Look for in the repo, then Double-check. | ~20s |
| F2 | 7, 8 | Demo copy › Judging › Projects › #001 | Click Run agent review and record the whole run. Keep the build step open while it runs, then the Live demo step. The edit speeds it up. | the full run |
| F3 | 10 | #001, after the run | Scroll the finished review. Open Calls Nebius Token Factory: Reasoning, Evidence, Feedback for the team, How it got there. Open one trace entry, then hold on the footer. | ~25s |
| F4 | 10 | #002 Nexus Copilot | Open the step with the prompt_injection flag and hold. | ~8s |
| F5 | 11 | Top bar › Inbox, then #002 | Open the inbox and hover the evidence. Click Agree — keep it out, then open #002's audit trail. | ~15s |
| F6 | 12 | The batch email (React Email preview, `pnpm email`), then a judge link `/j/…` in the seeded mid-judging demo | Show the email and click through: welcome screen, Keep going, then one project with the submission and rubric side by side. | ~25s |
| F7 | 13 | The same judge link | Score each criterion and Submit. Wait for the agent's scores and the gap callout, type a short note, then Save change & next. | ~20s |
| F8 | 14 | Projects API drawer, Setup › Distribution, Judging › Progress | Hold on each. Press Close phase, confirm, and hold on the project list's ordering line. | ~30s |
| F9 | 15 | Judging › Chat | Scope it to a phase with the Smart model. Ask "Check if the top project's idea already exists on the web" and let the answer finish. | the full answer |
| F10 | 16 | Judging › Rewards, Results › Winners, the winner email preview, `/w/demo-open-agents-2026` | Hold on each. Hover Email winners (don't send), then hover Share. | ~35s |

## Build notes

- **Project:** a new HyperFrames project at `videos/roundone-devpost/`, started from `videos/roundone-launch/`. The retro kit, fonts, art, logos, music and `frame.md` carry over unchanged.
- **Reused frames,** retimed and re-captioned, from `videos/roundone-launch/compositions/frames/`:
  - 01-hook and 02-flood → scene 1
  - 03-buried → the second half of scene 2
  - 04-round-one and 08-split → scene 5
  - 07-open-stack → scene 9, extended into the four stages
  - 11-winners → its confetti goes over the scene 16 footage
  - 12-outro → scene 17
- **New frames:**
  - the checklist card, shared by scenes 2 and 4
  - the AI-only judge card for scene 3, rebuilt from `AiOnlyJudge` in `src/app/landing/_components/mocks.tsx`
  - one footage frame for every recording: the `rk-mock` card, the eyebrow and headline band, keyframed push-ins and the chips
- **Voice first:** record your read of the script. If you'd rather lock the timing first, I can make a TTS scratch track and you swap in your read later. Retime every scene to the recorded phrases, and keep the act breaks (0:37.5, 0:49.5, 1:53.5, 2:38.5) and the ROUND 1 slam on bar lines.
- **Captions:** upload the script to YouTube as an SRT instead of burning captions in. That keeps the UI clean and makes the transcript exact, which matters because RoundOne's own Video reviewer reads transcripts.
- **Checks before the full render:** take stills from every scene and from mid-transition. Look for text under 19px, anything overflowing its card, and muddy crossfades between two busy layouts. Then confirm the final file is 2:55 or shorter.
- **Poster:** use scene 5's settled H1 as `brag.jpg` and as frame 0. For YouTube's custom thumbnail, use `devpost/thumbnail.png`.
- **Reuse:** the same cut can fill the landing page's empty demo-video slot, `DEMO_YOUTUBE_ID` in `src/app/landing/_components/links.ts`.

## YouTube title and description (draft)

**Title:** RoundOne: the agent takes round one, people judge the idea | Nebius × NVIDIA Global AI Hackathon

**Description:**

> The judges of this hackathon have 1,500+ projects to get through. RoundOne's agent (NVIDIA Nemotron on Nebius Token Factory, with Nebius Sandboxes and Tavily) checks every project first: it builds the repo, finds the sponsor calls, visits the live demo and reads the video transcript. Judges spend their time on the ideas. Open source and self-hosted.
>
> roundone.dev · [repo link]
>
> 0:00 Hi, judges
> 0:18 AI judging AI
> 0:37 RoundOne
> 0:49 The agent: Sandboxes, Tavily, Nemotron
> 1:53 Judges and organizers
> 2:38 Open source

## To confirm

- **1,500+ projects:** the number comes from DEVPOST.md. Check it against the gallery count before recording the voice.
- **The repo URL** for the end card and the description.
- **The voice:** yours fits best, since the Devpost story is in the first person. A TTS read works as a scratch track.
