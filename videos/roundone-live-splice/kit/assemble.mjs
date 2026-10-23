// Splices the live agent block (renders/agent-block.mp4) into the main film
// (assets/main-clean.mp4: ../roundone-launch/renders/roundone-launch-tour-vo-fast.mp4 with
// the full stops painted out of its titles by kit/periods.py).
//   node kit/assemble.mjs [--bed-db -17] [--vo-db -3] [--out renders/roundone-live-splice.mp4]
//
// What changes in the main film:
//   84.4–91.0   "Checked, verified, summarized" → the live block. The agent diagram before
//               it plays out in full, with its own line ("It follows your instructions…
//               checks the claims with NVIDIA Nemotron."), which ends at 85.2.
//   120.2–122.7 "And the progress page shows every round at a glance." (voice)
//   142.7–148.2 the thank-you email scene (voice)
//
// The main film's voice runs a little ahead of its pictures, so at each seam the
// sound and the picture are cut at their own points (voice in a pause, picture on a
// scene change) and the pieces are sized so they stay in sync afterwards. Where the
// picture would come up short (the dropped progress scene is longer on screen than
// in the voice), the tail of the project-page scene before it plays slower.
//
// The music bed runs unbroken under the whole tour at main time − 2.154 s, played
// 1.19% fast (measured by cross-correlating the film against roundone-bgm.mp3). The
// block's bed continues the song from where the film leaves it, ducked under the new
// voice, and is 31.8 s long so it rejoins the film's bed on the same bar phase (the
// cut-out stretch is 5.8 s; 31.8 − 5.8 = 13 bars). Each audio seam is a 0.1 s
// crossfade inside a voice pause. The block's own sound starts 0.8 s into its picture,
// where the diagram's line has finished.
import { execFileSync } from "node:child_process";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > 0 ? process.argv[i + 1] : fallback;
};
const r3 = (n) => Math.round(n * 1000) / 1000;
const probe = (f, entry = "format=duration") =>
  execFileSync("ffprobe", ["-v", "error", "-show_entries", entry, "-of", "csv=p=0", path.join(root, f)]).toString().trim();

const FPS = 30;
const MAIN = "assets/main-clean.mp4";
const BLOCK = "renders/agent-block.mp4";
const BGM = "assets/music/roundone-bgm.mp3";
const OUT = arg("out", "renders/roundone-live-splice.mp4");
const BED_DB = Number(arg("bed-db", "-17"));
const VO_DB = Number(arg("vo-db", "-3")); // the new lines are -16 LUFS each; this sits them level with the film's own voice
const BED_OFFSET = 2.154; // main time − bed position (as heard)
const BED_RATE = 1.01192;
const X = 0.05; // half a crossfade

const mainEnd = Number(probe(MAIN));
const blockV = Number(probe(BLOCK, "stream=nb_frames").split("\n")[0]) / FPS;

// Sound: where each kept piece of the main film starts and ends.
const A = { out1: 85.2, in2: 91.0, out2: 120.2, in3: 122.7, out3: 142.7, in4: 148.2 };
const BLOCK_A = 31.8;
// Picture: cut on the scene changes.
const V = { out1: 84.4, slowFrom: 115.36, out2: 119.9, in3: 124.2, in4: 148.62 }; // each cut clear of the whip-pans and crossfades around the dropped scenes

// Keep sync: a main frame m must land where the sound for m lands.
const fA = { b: A.out1, p2: A.out1 + BLOCK_A };
fA.p3 = fA.p2 + (A.out2 - A.in2);
fA.p4 = fA.p3 + (A.out3 - A.in3);
const total = r3(fA.p4 + (mainEnd - A.in4));
const snap = (t) => Math.round(t * FPS) / FPS;
const vIn2 = snap(A.in2 + (V.out1 + blockV) - fA.p2); // first main frame after the block
const p3At = fA.p3 + (V.in3 - A.in3); // where frame V.in3 must land
const slowLen = p3At - (V.out1 + blockV) - (V.slowFrom - vIn2);
const slow = r3(slowLen / (V.out2 - V.slowFrom));
const vIn4 = V.in4;
const vOut3 = snap(V.in3 + (fA.p4 + (V.in4 - A.in4)) - p3At); // the chat-to-email stretch runs at speed into the winners page

const bedStart = r3((A.out1 - X - BED_OFFSET) * BED_RATE);
const bedLen = r3(BLOCK_A + 2 * X);

const fc = [
  // picture
  `[0:v]trim=0:${V.out1},setpts=PTS-STARTPTS[v1]`,
  `[1:v]setpts=PTS-STARTPTS,fps=${FPS}[vb]`,
  `[0:v]trim=${vIn2}:${V.slowFrom},setpts=PTS-STARTPTS[v2]`,
  `[0:v]trim=${V.slowFrom}:${V.out2},setpts=(PTS-STARTPTS)*${slow},fps=${FPS}[v2s]`,
  // the Preview scene's last frame already shows the dropped thank-you scene sliding in,
  // so the winners page's first frame holds over it
  `[0:v]trim=start_frame=${Math.round(V.in3 * FPS)}:end_frame=${Math.round(vOut3 * FPS) - 1},setpts=PTS-STARTPTS[v3]`,
  `[0:v]trim=${vIn4},setpts=PTS-STARTPTS,tpad=start=1:start_mode=clone[v4]`,
  `[v1][vb][v2][v2s][v3][v4]concat=n=6:v=1:a=0,fps=${FPS},format=yuv420p,tpad=stop_mode=clone:stop_duration=0.1[v]`,
  // the block's sound: its voice over the continued, ducked bed
  `[1:a]aresample=48000,volume=${VO_DB}dB,atrim=${r3(A.out1 - V.out1)}:${r3(A.out1 - V.out1 + BLOCK_A)},asetpts=PTS-STARTPTS,adelay=${X * 1000}|${X * 1000},apad=whole_dur=${bedLen},asplit=2[vo][key]`,
  `[2:a]aresample=48000,atrim=start=${bedStart},asetpts=PTS-STARTPTS,atempo=${BED_RATE},atrim=0:${bedLen},volume=${BED_DB}dB,aformat=channel_layouts=stereo[bed]`,
  `[bed][key]sidechaincompress=threshold=0.03:ratio=5:attack=25:release=400:makeup=1[bedd]`,
  `[vo][bedd]amix=inputs=2:normalize=0,alimiter=limit=0.84:level=false[ab]`,
  // the main film's sound, cut in its voice pauses
  `[0:a]atrim=0:${A.out1 + X},asetpts=PTS-STARTPTS[a1]`,
  `[0:a]atrim=${A.in2 - X}:${A.out2 + X},asetpts=PTS-STARTPTS[a2]`,
  `[0:a]atrim=${A.in3 - X}:${A.out3 + X},asetpts=PTS-STARTPTS[a3]`,
  `[0:a]atrim=${A.in4 - X},asetpts=PTS-STARTPTS[a4]`,
  `[a1][ab]acrossfade=d=${2 * X}:c1=qsin:c2=qsin[x1]`,
  `[x1][a2]acrossfade=d=${2 * X}:c1=qsin:c2=qsin[x2]`,
  `[x2][a3]acrossfade=d=${2 * X}:c1=qsin:c2=qsin[x3]`,
  `[x3][a4]acrossfade=d=${2 * X}:c1=qsin:c2=qsin[a]`,
];

console.log(`block picture ${r3(blockV)}s, sound ${BLOCK_A}s · main resumes at ${vIn2} (picture) / ${A.in2} (sound)`);
console.log(`project-page tail ${V.slowFrom}–${V.out2} plays at ${r3(1 / slow)}× · chat from ${V.in3} · winners from ${vIn4}`);
console.log(`bed from ${bedStart}s of the song at ${BED_DB} dB · film ${total}s (${Math.floor(total / 60)}:${(total % 60).toFixed(1).padStart(4, "0")})`);

execFileSync(
  "ffmpeg",
  ["-v", "error", "-y", "-i", MAIN, "-i", BLOCK, "-i", BGM, "-filter_complex", fc.join(";"), "-map", "[v]", "-map", "[a]",
    "-c:v", "libx264", "-preset", "slow", "-crf", "17", "-profile:v", "high", "-movflags", "+faststart",
    "-c:a", "aac", "-b:a", "256k", "-ar", "48000", "-t", String(total), OUT],
  { cwd: root, stdio: "inherit" },
);
console.log(`wrote ${OUT} (${probe(OUT)}s)`);
