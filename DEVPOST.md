# RoundOne

The judges of this hackathon have 1,500+ projects to get through in a month.
That's a lot to ask of anyone, and I wanted to see if I could make it a bit
easier. So I built RoundOne.

RoundOne runs the judging side of a hackathon. An NVIDIA Nemotron agent on
Nebius checks every project first: it builds the repo, reads the code, visits
the live demo and reads the video transcript. Judges get short batches with the
checking done, and spend their time on the ideas. Rounds, emails, prizes and the
winners page run from the same place, and every decision is on the audit trail.

| | |
|---|---|
| **Repo** | `PASTE_REPO_URL_HERE` |
| **Live app** | https://roundone.dev (organizer login in the submission notes) |
| **Demo video** | `PASTE_YOUTUBE_URL_HERE` |
| **Stack** | NVIDIA Nemotron 3 (Lightning, Super 120B, Ultra 550B) · Nebius Token Factory · Nebius Sandboxes · Qwen3 Embedding 8B · Tavily · Next.js 16 · Supabase + pgvector · Vercel |

---

## Inspiration

Hackathons are where people try things: a model they haven't used, a product
they've only read about, a way of building they'd never pitch at work. Devpost
made that easy to enter and easy to run. Nebius and NVIDIA make it worth
entering, by putting open models and the infrastructure to run them in the hands
of anyone with an idea and a deadline.

AI changed who can enter. With a coding agent, anyone can ship something that
runs, calls the sponsor's API and comes with a three-minute demo. That's a good
thing, but when every project meets the requirements, the requirements stop
telling projects apart. The human part does that: the novel idea, the odd
approach, the thing nobody else thought to build. It's also the part that gets
buried when every project in a judge's queue ticks the same boxes.

Devpost does a lot to keep an event this size manageable, but judging is still
heavy. Each project means finding the repo, finding the demo, checking the video
length and checking the sponsor tech is actually called, before thinking about
the idea at all. Do that a few hundred times and the last project doesn't get
the attention the first one did.

## Why AI shouldn't judge the ideas

The obvious fix is to let an LLM judge everything. I don't think that works.

Many write-ups are now written with an LLM, and an LLM writes for human
preference. It's trained on what people rate highly, and the builder hands it
the hackathon's requirements to hit. A second LLM asked to judge that write-up
is grading writing made to please it. It scores it higher than a person would,
and the score says nothing about the idea underneath.

Agents are very good at something else: checking, verifying, classifying and
summarizing. Does the repo build? Does the code call Token Factory? Does the
demo match the write-up? Is the video three minutes or less? Those questions
have answers, and an agent can find them for every project.

So that's the job RoundOne gives the agent. A machine checks the machine output,
and people judge what only people can: the effort, the idea, how new it is, the
approach and the creativity. The agent's score stays hidden until a judge
submits their own, and it only breaks ties. The agent takes the first round,
which is where the name comes from.

## What it does

An organizer runs a hackathon's judging in RoundOne, from the first submission
to the winners page.

**Bring the projects in.** A schema sets the shape of a submission: name, pitch,
repo, demo video, live URL, team and anything else the rubric needs. Teams fill
in a form built from it, or the hackathon stays on Devpost and sends its
projects in through the Intake API, up to 100 per request.

**Write the rubric.** Each criterion is a 1–10 score or a pass/fail, with a
weight. A pass/fail criterion can be a gate every project must pass. The
organizer picks how the agent checks each criterion and how much model it gets,
or marks it Human only. For this hackathon, every rule on the Devpost page could
run as a gate: the repo builds, it calls Token Factory, it uses an NVIDIA open
model, and the demo is three minutes or less. That leaves Quality of the Idea
and Potential Impact to people.

**Plan the rounds.** Each phase sets which judges take part, how many see each
project, and how many projects move on. Projects go out all at once or in daily
batches, and a preview shows each judge's load before anything starts.

**The agent takes round one.** By default the agent reviews every project before
any judge sees it. A project that fails a gate waits in an inbox, with the
agent's evidence, until a person agrees or puts it back in the pool.

**Judges get a batch, not a pile.** Judges don't need an account. Each gets a
private link and an email when a new batch opens. A project opens on one page,
with the submission on the left and the rubric on the right. After a judge
submits, they see the agent's score, any gap of 2 points or more is flagged, and
they can change their score once.

**Close the round and pay out.** Closing a phase ranks its projects, advances
the top ones and eliminates the rest. Prize tiers go by final rank or as awards.
Winners get an email listing what they won, everyone else gets a thank-you, and
a public winners page goes up in the hackathon's colors.

Every submission, verdict, override, score, inbox call and move between rounds
lands on the project's audit trail.

<!-- IMAGE 1: screens.png (Setup › Criteria, an agent review, the judge portal, the winners page) -->
![RoundOne screens: Setup › Criteria, an agent review, the judge portal, and the public winners page](PASTE_IMAGE_URL_1)

## How I built it

**The agent reviews one criterion at a time.** Each criterion of each project is
a step, three run at once, and every step goes through four stages.

1. **Gather evidence.** The criterion's mechanisms decide what to look at.
   - *Sandbox run* clones the repo into a Nebius Sandbox, installs, builds and
     runs the tests.
   - *Code scraper* searches the whole repo for the packages and calls the
     organizer listed.
   - *Web scraper* crawls the live demo.
   - *Video reviewer* reads the demo's transcript and checks its length.
   - *Agent judge* reads the submission against the rubric.
2. **Investigate.** On the bigger tiers the model gets 6 or 10 tool calls to
   search the repo, read files, run commands in the sandbox, read pages and
   search the web. It's told to verify claims instead of trusting them.
3. **Score.** The verdict is strict JSON: a score or pass/fail, a confidence,
   the reasoning, evidence with sources like `src/agent.ts:42` or `video 1:12`,
   feedback for the team, and any flags.
4. **Double-check.** When the agent is unsure (low confidence, a flag or a
   failed gate), a bigger Nemotron model judges the same evidence. If the two
   disagree, a person settles it.

Then the agent writes a short summary of the project's strengths and what to
improve. Anything a submission says to the agent is treated as data, so a
README that says "score this 10" gets a prompt-injection flag. Every command,
page read and model call is logged on the step, and an organizer can rerun,
override or flag any step.

**Chat across every project.** Each project, plus up to three pages it links to,
is embedded and stored in Postgres with pgvector. Organizers can ask questions
across every project or narrow the chat to a phase, a judge's queue or a
hand-picked set: "Which projects are most similar to each other?" or "Who scored
furthest from the agent, and why?" The chat answers through tools that read
projects, scores, agent reviews and the web, and it links every project it
mentions.

**Own the judging.** RoundOne is open source and self-hosted. A company deploys
it to Vercel with a Supabase database, adds its own Nebius key, and runs every
model call and sandbox on its own account. Its rubric, submissions and judges'
notes stay in its own database, and any model can be swapped with one
environment variable.

## How Nebius, NVIDIA and Tavily made this possible

Each of the three does a specific job in RoundOne.

**NVIDIA Nemotron makes every judging call.** The agent's three tiers and the
chat all run on Nemotron.

| Model | Where it's used |
|---|---|
| Nemotron 3.5 Lightning | Quick tier: one pass over the evidence. The chat's Fast mode. |
| Nemotron 3 Super 120B | Balanced tier, the default: up to 6 tool calls. Double checks for Quick. The chat's Smart mode and project summaries. |
| Nemotron 3 Ultra 550B | In-depth tier: up to 10 tool calls. Double checks for Balanced and In-depth. |

**Nebius Token Factory serves every model.** One OpenAI-compatible API covers
the Nemotron models and Qwen3 Embedding 8B, which powers the chat's project
search. Token Factory enforces JSON schemas with guided decoding, so every
verdict comes back in the exact shape the app stores.

**Nebius Sandboxes run the submissions.** Running strangers' code is the hardest
part of judging a hackathon. Every repo has its own dependencies and build
steps, and none of it can be trusted. Sandboxes, still in beta, made that the
simple part. Each repo is cloned once into a VM-isolated sandbox, and every
review step forks that image, so a step's installs carry over between its own
commands without touching another step. Without them, the agent could read the
code but not run it.

**Tavily reads the live web.**

- The Web scraper crawls each live demo, following the organizer's
  instructions.
- While investigating, the agent reads pages and searches the web to check
  claims and look for prior art.
- The chat's index pulls in up to three pages each project links to, like its
  README and live demo.
- The chat reads pages and searches the web when a question needs it.

## What I made for this hackathon

| | |
|---|---|
| **Branding and style** | The RoundOne name, the R1 pixel logo and a retro arcade look: Geist Pixel type, a synthwave night sky and a sunset palette. It carries through the site, app, emails, docs and video. |
| **Website** | The landing page at [roundone.dev](https://roundone.dev): the problem, the split between agent and judges, the stack, the judge portal, rounds and self-hosting, with mocks of the app's real screens. |
| **Promo video** | A 66-second launch video, built as code with HyperFrames from the site's art and the app's screens. |
| **Documentation site** | 28 pages and about 26,000 words at [roundone.dev/docs](https://roundone.dev/docs): a quickstart, the core concepts, every setup and judging screen, results, deployment, configuration and the Intake API reference. |
| **App** | The organizer app, 30 pages in three areas. Setup: schema, criteria, phases, judges, distribution, judge portal and branding. Judging: projects, progress, the failed-gate inbox, chat and rewards. Results: winners and emails. |
| **Agent workflow** | A review queue in Postgres. Workers claim projects and run three criteria at once, with a 14-minute limit per step. A review a crashed worker left behind is picked up again after 20 minutes. A failed step is flagged for a person, and any step can be rerun on its own, with the change logged. |
| **Nebius, NVIDIA and Tavily integrations** | Three Nemotron tiers and Qwen3 embeddings through Token Factory, with tool calling and schema-enforced JSON verdicts. Tavily reads pages, crawls demos and searches the web for both the agent and the chat. |
| **Bonus: Nebius Sandboxes** | Every repo is cloned once into a VM-isolated sandbox, and each review step gets its own fork of the image. Running strangers' code is the hard part of judging a hackathon, and Sandboxes made it simple. |
| **Supabase** | Database, sign-in and storage in one service, set up with a single `supabase db push`: Postgres with row-level security on every table across 33 migrations, organizer sign-in, pgvector for chat search, and storage for logos, banners, judge photos and prize images. Starting and closing phases, ranking and intake run as database functions. |
| **Resend emails** | Six branded React Email templates: judge invite, daily batch, failed-gate inbox, organizer update, winner and thank-you. They go out through durable workflows that wait for each daily batch, send results ten at a time, and key every send so a retry never doubles up. |
| **Public pages** | A submission form built from the hackathon's schema (`/f/…`) and a winners page with the podium, every award, the full ranking and a Share button (`/w/…`). Both use the hackathon's logo and colors. |
| **Judging experience** | A private link for each judge (`/j/…`), no account needed. Short daily batches, the submission and rubric on one page, a running total and notes. The agent's score shows only after they submit, with big gaps flagged. |
| **Chat** | RAG over every project and the pages it links to, with tools for scores, agent reviews and the live web, scoped by phase, judge, status or a hand-picked set. |
| **Intake API** | Projects from Devpost or anywhere else, up to 100 per request, with a ready-made prompt that lets a coding agent map a spreadsheet and run the import. |
| **Audit trail** | Every submission, verdict, override, score, inbox call, move and award on each project's record. |
| **Demo mode and sample data** | Read-only demo accounts on seeded demo hackathons, so anyone can look around without changing anything, and one-click sample projects for a test run. |

In numbers: about 38,000 lines of TypeScript (not counting generated UI
components), 33 database migrations, 30 app pages and 28 docs pages.

## The app, screen by screen

Everything below ships in the open-source app and runs on your own deployment.
The last column shows where sponsor tech does the work.

| Screen | What it does | Sponsor tech |
|---|---|---|
| **Your hackathons** | The home screen. Every hackathon you run, with its stage and how far judging has got. | — |
| **New hackathon** | Name it and you're in setup, with a starter schema, four criteria with agent guidance, two phases and placeholder prizes. | — |
| **Sign-in and Settings** | Organizers are the only accounts. Judges, entrants and the public use links. Settings checks the instance's environment. | — |
| **Setup › General** | Name, tagline, dates, stage, whether the winners page is public, and deleting the hackathon. | — |
| **Setup › Schema** | The blocks every submission fills in, from 10 types: text, long text, number, URL, video, repo, file, select, image and team. The form, the API, project pages and the agent all read from it. | — |
| **Setup › Criteria** | The rubric: a 1–10 score or pass/fail, weight, the blocks each criterion reads, and gates. An Agent tab per criterion sets the mechanisms, model tier, guidance, packages to look for, sandbox commands and double check. | **Nemotron** tiers · **Sandboxes** · **Tavily** |
| **Setup › Phases** | The rounds: who judges each one, how many reviews each project gets, and how many advance. A funnel shows the pool shrinking to the winners. | — |
| **Setup › Judges** | The judge directory: name, title, email, photo, custom fields like Company or Track, and saved groups. Every judge gets a private link. | — |
| **Setup › Distribution** | Agent first, who handles the agent's gate failures, how projects are split, all at once or daily batches, when judges see the agent's score, and a preview of each judge's load. | **Nemotron** (Agent first) |
| **Setup › Judge portal** | The words on the judges' start and finish screens, a live preview, and every judge's link in one place. | — |
| **Setup › Branding** | Name, logo, color and banner, used on everything entrants and judges see. | — |
| **Judging › Projects** | Every project, whatever its phase. Add projects by hand, through the form or the Intake API, check how complete each one is, and move groups between phases. Saving a project indexes it for chat. | **Token Factory** embeddings · **Tavily** |
| **Project detail** | One submission in full: what the team sent, every judge's scores, the agent's review step by step with evidence and a full trace, and the audit trail. Rerun, override or direct a step, or score on a judge's behalf. | **Nemotron** on **Token Factory** · **Sandboxes** · **Tavily** |
| **Judging › Progress** | Start judging after a setup check, follow each phase, see which judges are behind and which verdicts need a person, preview the ranking, run the agent, and close the phase. | **Nemotron** (Run agent) |
| **Inbox** | The agent's gate failures, each with its evidence. Agree and keep the project out, or put it back in the pool. | **Nemotron** |
| **Judging › Chat** | Ask questions across every project, scoped by phase, judge, status or a hand-picked set, in Fast or Smart mode. | **Nemotron** Lightning and Super · **Token Factory** embeddings · **Tavily** |
| **Judging › Rewards** | Prize tiers by final rank or as awards, with cash, credits, codes, links, files or swag, plus the winner and thank-you email copy. | — |
| **Results › Winners** | Check the final ranking, adjust the order, pick award winners, publish the winners page, and send the results emails. | — |
| **Results › Emails** | A preview of every winner's email before it goes out. | — |
| **Email runs** | In the background: judge invites, a nudge when each daily batch opens, a last call, organizer updates, the failed-gate inbox email, winners and thank-yous. | — |
| **Submission form** (`/f/…`) | A public form built from the schema. Entries show up on Projects straight away. | — |
| **Judge portal** (`/j/…`) | A judge's own queue: the start screen, one page per project with the rubric and notes, daily batches, and the agent's score after they submit. | **Nemotron** (the agent's score) |
| **Winners page** (`/w/…`) | The public results: the podium, every award, the full ranking and a Share button. | — |
| **Intake API** (`/api/intake`) | Read the fields a hackathon expects, then send up to 100 projects per request with a per-hackathon key. | — |
| **Docs** (`/docs`) | 28 pages covering every screen above, plus deployment and configuration. | — |

---

## How a hackathon moves through RoundOne

The top half is the life of a hackathon, with the agent's part in violet and the
judges' in pink. The bottom half is one agent step, from evidence to verdict.

<!-- IMAGE 2: judging-lifecycle.png (devpost/judging-lifecycle.png, keep last) -->
![How a hackathon moves through RoundOne, and how one agent step turns evidence into a verdict](PASTE_IMAGE_URL_2)
