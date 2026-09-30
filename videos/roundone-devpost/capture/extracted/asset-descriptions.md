# Asset Descriptions

⚠️  No vision credentials — descriptions below are catalog-derived (alt text, headings, section context, filename) instead of Vision-generated. To get richer Vision descriptions on the next capture, set GEMINI_API_KEY (or GOOGLE_API_KEY), or HYPERFRAMES_VERTEX_PROJECT_ID plus HYPERFRAMES_VERTEX_SERVICE_ACCOUNT for Vertex service-account auth, and re-run.

The `logo-<hash>.svg` filename prefix is a structural hint (DOM said this SVG was inside a `<header>`, home-link `<a>`, or had an aria-label matching the page brand). To pick the actual brand logo without Vision, open the `logo-*` candidates in a previewer or rasterize them with `sharp` before referencing — composing a fake logo ships off-brand in the final video.

- svgs/svg-01a9beeb.svg — svg 01a9beeb
- svgs/svg-12fc2d6e-2.svg — svg 12fc2d6e 2
- svgs/svg-12fc2d6e.svg — svg 12fc2d6e
- svgs/svg-1b436bb2.svg — svg 1b436bb2
- svgs/svg-33ab7775-2.svg — svg 33ab7775 2
- svgs/svg-33ab7775.svg — svg 33ab7775
- svgs/svg-42a77328.svg — svg 42a77328
- svgs/svg-42c60c05.svg — svg 42c60c05
- svgs/svg-4742e975-2.svg — svg 4742e975 2
- svgs/svg-4742e975.svg — svg 4742e975
- svgs/svg-63488fa6-2.svg — svg 63488fa6 2
- svgs/svg-63488fa6-3.svg — svg 63488fa6 3
- svgs/svg-63488fa6-4.svg — svg 63488fa6 4
- svgs/svg-63488fa6.svg — svg 63488fa6
- svgs/svg-8ba33752.svg — svg 8ba33752
- svgs/svg-aec09534.svg — svg aec09534
- svgs/svg-af70fea9.svg — svg af70fea9
- svgs/svg-b914a91b.svg — svg b914a91b
- svgs/svg-c4fb68d3-2.svg — svg c4fb68d3 2
- svgs/svg-c4fb68d3-3.svg — svg c4fb68d3 3
- svgs/svg-c4fb68d3-4.svg — svg c4fb68d3 4
- svgs/svg-c4fb68d3.svg — svg c4fb68d3
- svgs/svg-da768265.svg — svg da768265
- svgs/svg-eacb2564-2.svg — svg eacb2564 2
- svgs/svg-eacb2564-3.svg — svg eacb2564 3
- svgs/svg-eacb2564-4.svg — svg eacb2564 4
- svgs/svg-eacb2564.svg — svg eacb2564
- svgs/svg-f3e3167d.svg — svg f3e3167d
- svgs/svg-f6060d58.svg — svg f6060d58
- svgs/svg-f907fe54.svg — svg f907fe54

## Repo assets (staged by hand from the RoundOne source)

The capture could not download the landing page's Next.js-optimized images or its fonts, so these come straight from the repo. They are the real brand assets the site uses.

- roundone-r1-logo.png — THE RoundOne brand mark: an app-icon tile with pixel "R1" letters in the sunset gradient (yellow → orange → pink) over a starry purple night sky with pixel clouds. 512×512, rounded-square, transparent corners. Use for the reveal lockup and the end card.
- retro-hero.png — landing hero art, 1672×941: synthwave pixel-art night sky (deep purple → magenta → pink) with stars, planets and floating pixel city islands where people work on laptops at retro CRT monitors; clouds fade to pure white across the bottom third. The hook and the reveal sit on it.
- retro-footer.png — landing footer art, 1672×941: neon-floor pixel city at dusk, retro computers, CRT screens and floppy disks lining a glowing grid floor that recedes to a sunset horizon; dark purple sky with stars. The outro sits on it.
- nvidia-logo-ink.svg — NVIDIA eye (green #76B900) + wordmark in ink #1D1433, for light backgrounds.
- nvidia-logo-white.svg — NVIDIA eye (green) + white wordmark, for the night backgrounds.
- nebius-logo.svg — Nebius lime pill wordmark (#E0FF4F pill, #052B42 letters).
- fonts/GeistPixel-Square.woff2 — Geist Pixel Square, the landing's headline face (single weight 500).
- fonts/GeistSans-Variable.woff2 — Geist Sans variable (100–900), body and UI text.
- fonts/GeistMono-Variable.woff2 — Geist Mono variable, traces, eyebrows, numbers-as-texture.
- pixel-icons/<name>.svg — the app's own Pixel Icon Library set (HackerNoon, CC BY 4.0), 24×24, `fill="currentColor"`, `shape-rendering="crispEdges"`. Inline the markup so it takes color. Names: check, spark, users, user, gear, search, play, globe, image, eye, flag, inbox, mail, trophy, crown, lock, arrow-right, calendar, list, check-list, code, chat, coin, gift, refresh, link, dot (clock), table, grid, notebook, paint-brush, ticket, tag, x, x-circle, ban, chart-line, copy, external, trash, text, paragraph, hash, branch, clip, grip, plus, arrow-left, arrow-up, arrow-down. `_all.json` holds all inner markup keyed by name.

### UI to rebuild (not files — source components to recreate in HTML with identical copy and tokens)

- HeroReview (src/app/landing/_components/mocks.tsx) — one project's agent review: "Repo Whisperer · Project #042 · Coding and Agentic Engineering", tag "Agent review done"; left "The agent checks · nemotron-3-super" rows (Builds from the README · Sandbox run · gate · Pass; Runs on Nebius Token Factory · Code scraper · gate · Pass; Uses an NVIDIA open model · Code scraper · Nemotron found · gate · Pass; Demo video, 3 min or less · Video reviewer · 2:41 · gate · Pass; Technological implementation · Sandbox run · 42 of 42 tests pass · 8.5 with a 10-segment dusk meter); right "Judges decide" (Quality of the idea / Potential impact / Design, judge dots) and "Judges see the agent's scores only after they submit their own."
- SubmissionFlood — a 10×10 violet pixel grid ("~100 · hand-coded, before coding agents") beside a 40×25 sunset pixel field ("1,000+ · agent-assisted, now. Nearly all of them run."), footer "1,000 projects × 3 judges × 8 min / before anyone clones a repo" and "400 judge-hours".
- CriteriaSplit — "Setup › Criteria · Nebius × NVIDIA Global AI Hackathon": Technological implementation 25% (Sandbox run, Code scraper · Agent); Runs on Nebius Token Factory or AI Cloud · must pass (Code scraper · Agent); Uses an NVIDIA open model · must pass (Code scraper · Agent); Open-source repo with a README · must pass (Sandbox run · Agent); Demo video, 3 minutes or less · must pass (Video reviewer · Agent); Design 25% (Graphic reviewer · Agent + judges); Quality of the idea 25% (Human only · Judges); Potential impact 25% (Human only · Judges).
- JudgeQueue — judge portal: "Global AI Hackathon", meter 4/12, "ROUND 1 · DAY 2 OF 5", "Welcome, Grace", "4 of 12 done today, 8 to go. 36 more open over the coming days.", "Keep going →", "About 32 minutes · each score saves when you submit it", queue #118 Tidewatch 7.5 ✓, #042 Repo Whisperer 8.0 ✓, #207 Quiet Hours 6.5 ✓, #033 Pantry Pilot 7.0 ✓, #251 Signal Garden (next), #096 Loom Lens.
- ScoreReveal — "Your scores · #251 Signal Garden": Technological implementation You 8.0 / Agent 8.5; Quality of the idea You 9.0 / Human only; Design You 5.0 / Agent 7.5 with a "2+ apart" flag; "You can change your score once." "Next project →".
- GateInbox — "Inbox · 2 to decide": "#033 Pantry Pilot · Failed a gate: Uses an NVIDIA open model"; "Agent: No NVIDIA model found in the repo. The README says inference runs through a hosted API, but no model id is set in the code." "Code scraper · confidence: low"; buttons "Keep it out" / "Back in the pool".
- Phase funnel (landing Features) — Submitted 186 (all projects) → Screening 142 (passed the gates) → Round 1 40 (64% reviewed, live) → Finals 12 (top 12 planned), colors #7c3aed / #c026d3 / #f43f5e / #fb923c, pixel bars rising from the bottom.
- Split cards — "The agent checks": Does it build and pass its tests? / Does it use the sponsor tech? / Does the demo match the claims? / Did it follow the rules?  "Humans judge": Is the idea new? / Would it matter to anyone? / Is it made with taste? / Would you use it?
- Open stack cards — NVIDIA Nemotron "Every verdict": Quick · Nemotron 3.5 Lightning, Balanced · Nemotron 3 Super 120B, In-depth · Nemotron 3 Ultra 550B, "Double check: when the agent is unsure, a larger Nemotron takes a second look."; Nebius Token Factory "Inference and sandboxes": "Token Factory serves every model call… Each repo builds in a Nebius Sandbox: VM-isolated, with every review step on its own fork of the image."; Tavily "The live web": Extract reads a project's pages / Crawl walks the live demo / Search looks for prior art.
- Audit trail (project page) — newest-first timeline with square dots; event kinds: submitted, agent scored, gate failed, reinstated, judge scored, moved (advanced), ranked, awarded.
- Emails (src/emails) — judge batch "today's batch is open: N new projects" / "Open today's batch →"; thank-you "Thanks for building <project>" with how far it got; winner email with the prize.
- Winners page (/w/[slug]) — public page in the hackathon's color, 2-1-3 podium, prize names, Share button.
