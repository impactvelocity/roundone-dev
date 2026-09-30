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
if (!html.includes('id="el-pixel-wipes"')) {
  const host = `
      <div
        id="el-pixel-wipes"
        class="scene"
        data-composition-id="pixel-wipes"
        data-composition-src="compositions/pixel-wipes.html"
        data-start="0"
        data-duration="66"
        data-track-index="3"
        style="z-index: 20; pointer-events: none"
      ></div>
`;
  html = html.replace(ROOT_END, `${host}${ROOT_END}`);
  console.log("✓ mounted pixel-wipes overlay (0–66s, z-index 20)");
} else {
  console.log("✓ pixel-wipes overlay already mounted");
}

// ── 2. Music bed ───────────────────────────────────────────────────────────
const BEAT = 0.50596; // song seconds per beat
const RATE = +(BEAT / 0.5).toFixed(6); // → 120 BPM
const DROP = 9.9637; // song time of the groove downbeat
const BAR2 = DROP - 4 * 4 * BEAT; // song time of bar 2's downbeat (1.8683)
const XF = 0.1; // crossfade across the 8.0 bar line
const FILM = 66;

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
        { t: r3(63.5 - mainStart), v: 1, curve: 0.3 },
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
// The ElevenLabs read of VOICEOVER.md ("Flint", v4), placed whole from 0:00 for a
// first listen. It measures -22 LUFS with peaks at -4.4 dBFS, so the bus lifts it
// 5 dB (about -17 LUFS, the level the music-only cut was mixed around) into a
// -1.5 dB ceiling. Chopped takes join the same group, so the bus and the carve
// cover them without further wiring.
const VO_CLIPS = [
  { id: "vo", src: "assets/voiceover/roundone-vo.mp3", start: 0, duration: 59.794, mediaStart: 0 },
];
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
