// Adds the film-level layers the product-launch assembler doesn't know about.
// Run after assemble-index.mjs (and transitions.mjs inject). Idempotent.
//   node kit/add-overlays.mjs
//
// 1. The pixel-dither wipe cover (compositions/pixel-wipes.html): covers at
//    8.0 and 22.5, and a final cover at 30.0 that the app demo reveals from.
// 2. The music bed (assets/music/roundone-bgm.mp3), conformed to the film's
//    120 BPM grid exactly as in ../roundone-launch/kit/add-overlays.mjs:
//      tempo 118.586 BPM (beat 0.50596 s); the full groove drops in on the
//      downbeat at 9.9637 s (song time) after ~5 bars of lighter intro.
//    Played at RATE (pitch kept) a song bar is exactly 2.000 s. This intro
//    needs 4 bars before the ROUND 1 slam at 8.0 s, so the clip starts at the
//    song's bar 2 (song 1.8683 s): the groove drop lands on 8.0 with no edit.
//    The bus matches the launch film: -4 dB into a -1 dB limiter. The last
//    1.2 s fade out for the standalone intro — drop that fade when the demo
//    is cut on after it, so the music carries straight through.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const project = join(dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = join(project, "index.html");
let html = readFileSync(indexPath, "utf8");

const FILM = 30;
const rootEnd = html.lastIndexOf("\n    </div>\n");
if (rootEnd < 0) throw new Error("couldn't find the end of #root in index.html");
const insert = (block) => {
  const at = html.lastIndexOf("\n    </div>\n");
  html = `${html.slice(0, at)}\n${block}${html.slice(at)}`;
};

// ── 1. Pixel wipes ─────────────────────────────────────────────────────────
if (!html.includes('id="el-pixel-wipes"')) {
  insert(`      <div
        id="el-pixel-wipes"
        class="scene"
        data-composition-id="pixel-wipes"
        data-composition-src="compositions/pixel-wipes.html"
        data-start="0"
        data-duration="${FILM}"
        data-track-index="3"
        style="z-index: 20; pointer-events: none"
      ></div>`);
  console.log(`✓ mounted pixel-wipes overlay (0–${FILM}s, z-index 20)`);
} else {
  console.log("✓ pixel-wipes overlay already mounted");
}

// ── 2. Music bed ───────────────────────────────────────────────────────────
const BEAT = 0.50596; // song seconds per beat
const RATE = +(BEAT / 0.5).toFixed(6); // → 120 BPM
const DROP = 9.9637; // song time of the groove downbeat
const SLAM = 8.0; // film time of the ROUND 1 slam
const MEDIA_START = +(DROP - SLAM * RATE).toFixed(4); // song bar 2 (1.8683)
const FADE_OUT = 1.2;
const r3 = (v) => +v.toFixed(3);

const json = (o) => JSON.stringify(o).replace(/"/g, "&quot;");
const busChain = json({
  version: 1,
  nodes: [
    { type: "gain", id: "n1", label: "Level for web (about -16 LUFS)", params: { gain: -4 } },
    { type: "limiter", id: "n2", label: "Ceiling", params: { limit: -1, attack: 5, release: 50, level_out: 0 } },
  ],
});
const auto = json({
  version: 1,
  lanes: [
    {
      target: "volume",
      points: [
        { t: 0, v: 0 },
        { t: 0.03, v: 1 },
        { t: r3(FILM - FADE_OUT), v: 1, curve: 0.3 },
        { t: FILM, v: 0 },
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
        id="bgm"
        data-audio-group="music"
        data-timeline-role="music"
        src="assets/music/roundone-bgm.mp3"
        data-start="0"
        data-duration="${FILM}"
        data-media-start="${MEDIA_START}"
        data-playback-rate="${RATE}"
        data-track-index="12"
        data-automation="${auto}"
      ></audio>
      <!-- music:end -->`;

html = html.replace(/\n?      <!-- music:start[\s\S]*?<!-- music:end -->/, "");
insert(music);
writeFileSync(indexPath, html);
console.log(
  `✓ music bed: rate ${RATE} · 0–${FILM}s from song ${MEDIA_START} · drop (song ${DROP}) → film ${r3((DROP - MEDIA_START) / RATE)} · fade out ${r3(FILM - FADE_OUT)}–${FILM}s`,
);
