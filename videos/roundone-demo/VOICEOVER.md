# Voiceover — RoundOne demo (2:47)

The new film's narration, for the ElevenLabs **Flint** voice. Use the same voice and settings as the cold open, so the film sounds like one person. The cold open (0:00–0:16.8) and the end card line ("RoundOne is open source. Get started at roundone dot dev.") come from the current film with their own voice, so only these ten lines need recording.

**Status:** voiced. The ten lines below were generated with ElevenLabs (Flint, `qAZH0aMXY8tw1QufPN0D`, model eleven_v4, one take each) in the flow https://elevenlabs.io/app/flows/ZIZM9HGlLspK9lsudIog. The originals are in `assets/vo/flint/`. `assets/vo/<id>.wav` are those takes with the silence trimmed off each end and loudness-normalized to −16 LUFS (−1.5 dBTP). The first timing read (macOS `say`) is kept in `assets/vo/scratch/`.

To replace a line (a retake, or a different voice):

1. Generate each line below in ElevenLabs as its own file, or one read cut at the pauses.
2. Save them over `assets/vo/<id>.wav`, keeping the names.
3. Run `node kit/build.mjs`. It re-places every line and warns if one runs longer than its footage. If one does, lower that segment's `rate` values a little in `edit.json` and rebuild.
4. Run `npm run check`, then `npm run render`.

Pronunciation: Nebius "NEB-ee-us", Nemotron "NEM-oh-tron", Tavily "TAV-ih-lee", RoundOne "round one", MCP and API as letters, WebMCP "web M-C-P".

| id | Starts | Footage | Scratch read | Line |
| --- | --- | --- | --- | --- |
| `setup` | 0:17.3 | 15.4s | 14.2s | This is RoundOne, running on my laptop. For each criterion, I tell the agent how to check it: build the code in a Nebius sandbox, read the live demo with Tavily, and score it with Nemotron. |
| `submit` | 0:32.7 | 10.4s | 9.4s | Teams submit through a public form built from my rubric. Here's a real one: Hey Trivi, with its repo, live demo, and video. |
| `sandbox` | 0:43.1 | 25.2s | 13.0s | I start the agent. It clones the repo into a Nebius sandbox, installs it, builds it, and runs the tests. Every command and its output lands right here, as it happens. |
| `tavily` | 1:08.3 | 13.2s | 10.1s | Next, it reads the live demo with Tavily, crawls a few pages deeper, and searches the web to check the team's claims against what's already out there. |
| `verdict` | 1:21.4 | 8.6s | 7.4s | Nemotron scores every criterion with evidence. It checks and summarizes. It doesn't pick winners. |
| `proof` | 1:30.0 | 15.0s | 13.6s | And it's all real. Here's the server log during that run: Nemotron calls through Nebius Token Factory, sandbox calls to the Nebius Sandboxes API, and Tavily reading the web. |
| `inbox` | 1:45.0 | 18.2s | 17.2s | When I start judging, the agent reviews every project. Dolly fails the must-pass MCP check, so it lands in my inbox. It's a judgment call. WebMCP counts here, so I put it back in the pool, and the call goes on the audit trail. |
| `judge` | 2:03.2 | 13.7s | 9.1s | Judges get a private link and score the idea. Only after they submit do they see the agent's score, and a big gap gets pointed out. |
| `chat` | 2:16.9 | 13.3s | 8.3s | I can ask across every project. Nemotron reads the submissions, and Tavily searches the web for anything similar. |
| `results` | 2:30.2 | 12.9s | 7.3s | When the round closes, RoundOne ranks the projects. I publish the winners, and the page is live. |

## Clean read

> This is RoundOne, running on my laptop. For each criterion, I tell the agent how to check it: build the code in a Nebius sandbox, read the live demo with Tavily, and score it with Nemotron.
>
> Teams submit through a public form built from my rubric. Here's a real one: Hey Trivi, with its repo, live demo, and video.
>
> I start the agent. It clones the repo into a Nebius sandbox, installs it, builds it, and runs the tests. Every command and its output lands right here, as it happens.
>
> Next, it reads the live demo with Tavily, crawls a few pages deeper, and searches the web to check the team's claims against what's already out there.
>
> Nemotron scores every criterion with evidence. It checks and summarizes. It doesn't pick winners.
>
> And it's all real. Here's the server log during that run: Nemotron calls through Nebius Token Factory, sandbox calls to the Nebius Sandboxes API, and Tavily reading the web.
>
> When I start judging, the agent reviews every project. Dolly fails the must-pass MCP check, so it lands in my inbox. It's a judgment call. WebMCP counts here, so I put it back in the pool, and the call goes on the audit trail.
>
> Judges get a private link and score the idea. Only after they submit do they see the agent's score, and a big gap gets pointed out.
>
> I can ask across every project. Nemotron reads the submissions, and Tavily searches the web for anything similar.
>
> When the round closes, RoundOne ranks the projects. I publish the winners, and the page is live.
