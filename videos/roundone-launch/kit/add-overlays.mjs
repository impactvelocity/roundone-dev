// Adds the film-level layers the product-launch assembler doesn't know about.
// Run after assemble-index.mjs and transitions.mjs inject. Idempotent.
//   node kit/add-overlays.mjs
//
// 1. The pixel-dither wipe cover (compositions/pixel-wipes.html).
// 2. The music bed (assets/music/roundone-bgm.mp3), conformed to the film's
//    120 BPM grid. Measured from the track's kicks and bass changes:
//      tempo 118.586 BPM (beat 0.50596 s), steady for the whole song;
//      downbeats at 9.9637 + 2.02384·m s (song time); the full groove drops
//      in on the downbeat at 9.9637 s after ~5 bars of lighter intro.
//    Playing at RATE (pitch kept) makes a song bar exactly 2.000 s. The film
//    needs 8 intro bars before the "ROUND 1" slam at 16.0 s, the song has 5, so:
//      intro  video 0.154–8.05  = song bars 1–4 (song 0 → 7.99)
//      main   video 7.95–66     = song bar 2 onward, so the groove drop
//                                 (song 9.9637) lands on video 16.0 and the
//                                 song's 8-bar phrases start at 32, 48 and 64
//    with a 0.1 s crossfade across the 8.0 bar line and a fade over the end card.
//    Both clips ride one bus: -4 dB (the master is ~-12 LUFS, peaks 0 dBFS; this
//    lands near -16 LUFS for web playback) into a -1 dB limiter.
// 3. The voiceover (assets/voiceover/), on its own bus. The music makes room for
//    it through a carve that this script cannot write, so run
//    `node kit/carve-music.mjs` after it (this script's music block drops the carve).
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const project = join(dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = join(project, "index.html");
let html = readFileSync(indexPath, "utf8");

const ROOT_END = "\n    </div>\n\n    <script>";
if (!html.includes(ROOT_END)) throw new Error("couldn't find the end of #root in index.html");

// ── 1. Pixel wipes ─────────────────────────────────────────────────────────
const FILM = 204; // 1:06 story + 2:18 app tour
if (!html.includes('id="el-pixel-wipes"')) {
  const host = `
      <div
        id="el-pixel-wipes"
        class="scene"
        data-composition-id="pixel-wipes"
        data-composition-src="compositions/pixel-wipes.html"
        data-start="0"
        data-duration="${FILM}"
        data-track-index="3"
        style="z-index: 20; pointer-events: none"
      ></div>
`;
  html = html.replace(ROOT_END, `${host}${ROOT_END}`);
  console.log(`✓ mounted pixel-wipes overlay (0–${FILM}s, z-index 20)`);
} else {
  console.log("✓ pixel-wipes overlay already mounted");
}

// ── 2. Music bed ───────────────────────────────────────────────────────────
const BEAT = 0.50596; // song seconds per beat
const RATE = +(BEAT / 0.5).toFixed(6); // → 120 BPM
const DROP = 9.9637; // song time of the groove downbeat
const BAR2 = DROP - 4 * 4 * BEAT; // song time of bar 2's downbeat (1.8683)
const XF = 0.1; // crossfade across the 8.0 bar line

const introStart = +(8.0 - (DROP - 4 * BEAT - 0) / RATE).toFixed(3); // song 0 → so song bar 2 lands on 2.0
const introEnd = 8.0 + XF / 2;
const mainStart = 8.0 - XF / 2;
const mainMediaStart = +(BAR2 - (XF / 2) * RATE).toFixed(4);
const r3 = (v) => +v.toFixed(3);

const json = (o) => JSON.stringify(o).replace(/"/g, "&quot;");
const busChain = json({
  version: 1,
  nodes: [
    { type: "gain", id: "n1", label: "Level for web (about -16 LUFS)", params: { gain: -4 } },
    { type: "limiter", id: "n2", label: "Ceiling", params: { limit: -1, attack: 5, release: 50, level_out: 0 } },
  ],
});
const introLen = r3(introEnd - introStart);
const introAuto = json({
  version: 1,
  lanes: [
    {
      target: "volume",
      points: [
        { t: 0, v: 0 },
        { t: 0.03, v: 1 },
        { t: r3(introLen - XF), v: 1 },
        { t: introLen, v: 0 },
      ],
    },
  ],
});
const mainLen = r3(FILM - mainStart);
const mainAuto = json({
  version: 1,
  lanes: [
    {
      target: "volume",
      points: [
        { t: 0, v: 0 },
        { t: XF, v: 1 },
        { t: r3(FILM - 3 - mainStart), v: 1, curve: 0.3 },
        { t: mainLen, v: 0 },
      ],
    },
  ],
});

const music = `      <!-- music:start (written by kit/add-overlays.mjs) -->
      <hf-audio-group
        id="music"
        data-label="Music"
        data-volume="1"
        data-fx-chain="${busChain}"
      ></hf-audio-group>
      <audio
        id="bgm-intro"
        data-audio-group="music"
        data-timeline-role="music"
        src="assets/music/roundone-bgm.mp3"
        data-start="${introStart}"
        data-duration="${introLen}"
        data-media-start="0"
        data-playback-rate="${RATE}"
        data-track-index="11"
        data-automation="${introAuto}"
      ></audio>
      <audio
        id="bgm"
        data-audio-group="music"
        data-timeline-role="music"
        src="assets/music/roundone-bgm.mp3"
        data-start="${mainStart}"
        data-duration="${mainLen}"
        data-media-start="${mainMediaStart}"
        data-playback-rate="${RATE}"
        data-track-index="12"
        data-automation="${mainAuto}"
      ></audio>
      <!-- music:end -->
`;

// Drop any earlier music block (and the first-pass bare <audio id="bgm">), then insert.
html = html.replace(/\n?      <!-- music:start[\s\S]*?<!-- music:end -->\n/, "\n");
html = html.replace(/\n      <audio\n        id="bgm"\n        data-timeline-role="music"[\s\S]*?><\/audio>\n/, "\n");
html = html.replace(ROOT_END, `\n${music}${ROOT_END}`);
console.log(
  `✓ music bed: rate ${RATE} · intro ${introStart}–${r3(introEnd)}s (song 0→${r3(introLen * RATE)}) · main ${mainStart}–${FILM}s from song ${mainMediaStart} · drop (song ${DROP}) → video ${r3(mainStart + (DROP - mainMediaStart) / RATE)}`,
);

// ── 3. Voiceover ───────────────────────────────────────────────────────────
// The ElevenLabs read of VOICEOVER.md ("Flint", v4), cut in its pauses with each
// line placed on its scene: [id, file in, file out, film start]. Its last line
// ("Get started at roundone dot dev") is dropped — the app tour takes over.
// The read measures -22 LUFS with peaks at -4.4 dBFS, so the bus lifts it 5 dB
// (about -17 LUFS, the level the music-only cut was mixed around) into a -1.5 dB
// ceiling. Every clip joins the "voiceover" group, so the bus and the carve
// (kit/carve-music.mjs) cover new clips without further wiring.
const VO_SRC = "assets/voiceover/roundone-vo.mp3";
const VO_CUTS = [
  ["vo-01", 0.0, 14.1, 0.0], //    hook + problem, as recorded
  ["vo-02", 14.1, 19.2, 16.27], //  "Introducing RoundOne…" after the ROUND 1 slam
  ["vo-03", 19.2, 23.85, 22.05], // rubric
  ["vo-04", 23.85, 26.65, 27.08], // "Then your AI agent takes the first round."
  ["vo-05", 26.93, 31.4, 30.04], // builds, tests, searches
  ["vo-06", 31.53, 36.93, 34.6], //  Nemotron on Nebius (open stack)
  ["vo-07", 36.93, 40.72, 40.19], // the split
  ["vo-08", 40.72, 45.74, 44.17], // inbox + audit trail
  ["vo-09", 45.74, 50.61, 50.06], // rounds
  ["vo-10", 50.61, 53.66, 56.12], // winners
  ["vo-11", 53.66, 56.99, 60.14], // "Let your judges do the part only people can do."
];
// The tour read (assets/voiceover/roundone-vo-tour.mp3, VOICEOVER.md part 2), one
// clip per numbered line, each speaking from its cue (a hair later where the line
// before it runs long): [id, file in, file out, film start].
const TOUR_SRC = "assets/voiceover/roundone-vo-tour.mp3";
const TOUR_CUTS = [
  ["vo-t01", 0.0, 2.4, 63.6], //       "Let's take a tour of the RoundOne app."
  ["vo-t02", 2.7, 9.98, 66.28], //     create a hackathon
  ["vo-t03", 10.19, 18.9, 74.18], //   project schema
  ["vo-t04", 19.14, 27.91, 82.95], //  set the rules once
  ["vo-t05", 28.2, 33.53, 92.28], //   start judging
  ["vo-t06", 33.76, 44.51, 98.28], //  the agent at work
  ["vo-t07", 44.79, 51.84, 110.38], // checked, verified, summarized
  ["vo-t08", 52.1, 59.96, 118.28], //  the inbox
  ["vo-t09", 60.27, 66.08, 126.28], // judge email
  ["vo-t10", 66.31, 76.18, 132.48], // the judging page
  ["vo-t11", 76.43, 82.19, 142.4], //  scores roll up
  ["vo-t12", 82.4, 88.49, 148.28], //  a project's page
  ["vo-t13", 88.71, 91.89, 154.38], // progress
  ["vo-t14", 92.13, 101.87, 160.28], // chat
  ["vo-t15", 102.2, 112.17, 170.05], // rewards
  ["vo-t16", 112.45, 115.87, 180.08], // winner email
  ["vo-t17", 116.1, 122.71, 184.28], // thank-you email
  ["vo-t18", 122.96, 126.02, 192.38], // winners page
  ["vo-t19", 126.27, 131.16, 198.48], // end card
];
const VO_CLIPS = [
  ...VO_CUTS.map(([id, from, to, start]) => [id, VO_SRC, from, to, start]),
  ...TOUR_CUTS.map(([id, from, to, start]) => [id, TOUR_SRC, from, to, start]),
].map(([id, src, from, to, start]) => ({
  id,
  src,
  start,
  duration: r3(to - from),
  mediaStart: from,
}));
const voBus = json({
  version: 1,
  nodes: [
    { type: "gain", id: "v1", label: "Up to about -17 LUFS", params: { gain: 5 } },
    { type: "limiter", id: "v2", label: "Ceiling", params: { limit: -1.5, attack: 5, release: 50, level_out: 0 } },
  ],
});
const voClips = VO_CLIPS.map(
  (c) => `      <audio
        id="${c.id}"
        data-audio-group="voiceover"
        src="${c.src}"
        data-start="${c.start}"
        data-duration="${c.duration}"
        data-media-start="${c.mediaStart}"
        data-track-index="10"
      ></audio>
`,
).join("");
const voiceover = `      <!-- voiceover:start (written by kit/add-overlays.mjs) -->
      <hf-audio-group
        id="voiceover"
        data-label="Voiceover"
        data-volume="1"
        data-fx-chain="${voBus}"
      ></hf-audio-group>
${voClips}      <!-- voiceover:end -->
`;
html = html.replace(/\n?      <!-- voiceover:start[\s\S]*?<!-- voiceover:end -->\n/, "\n");
html = html.replace(ROOT_END, `\n${voiceover}${ROOT_END}`);
writeFileSync(indexPath, html);
console.log(
  `✓ voiceover: ${VO_CLIPS.map((c) => `${c.id} ${c.start}–${r3(c.start + c.duration)}s`).join(" · ")} · bus +5 dB into -1.5 dB`,
);
