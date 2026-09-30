// Carves the music bed around the voiceover: the hyperframes-audio "voiceover carve"
// (dynamic), once for each bed clip. Run it after kit/add-overlays.mjs, which
// rewrites the music block and so drops any earlier carve, and again whenever the
// voiceover clips move.
//   node kit/carve-music.mjs [--strength 0.5] [--dry-run]
//
// Strength 0.5 rather than the skill's 0.8: the voice runs almost wall to wall, so
// 0.8 held the music at its full 19 dB duck the whole way, about 20 dB under the
// voice (music-only render: -31.7 LUFS). That buried the drop at 0:16 and left the
// end card near silent while the bed recovered. 0.5 aims the music 12 dB under the voice.
//
// Why not point the skill's carve.mjs at index.html directly: it measures each bed
// from the top of its file at 1×, but both bed clips play the song 1.2% fast
// (data-playback-rate) and the main clip starts 1.8 s into it (data-media-start), so
// its level match would read the song about 2 s off and under-duck the drop at 0:16.
// It also hears both sides before their buses (voice +5 dB, music -4 dB). So each
// side is first written to a WAV exactly as it reaches the mix, trimmed to where the
// voice and the bed overlap; carve.mjs runs on a scratch copy of index.html that
// points at those WAVs; and the three attributes it writes (data-fx-carve,
// data-fx-chain, data-automation) are copied onto the real bed clip.
//
// Needs ffmpeg, the hyperframes-audio skill (HF_CARVE_SCRIPT overrides where its
// carve.mjs lives) and @hyperframes/core, which this installs into
// .hyperframes/carve/core on first run. Scratch files live in .hyperframes/carve/.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const project = join(dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = join(project, "index.html");
const scratch = join(project, ".hyperframes", "carve");
const coreDir = join(scratch, "core");
const carveScript =
  process.env.HF_CARVE_SCRIPT ?? join(homedir(), ".claude/skills/hyperframes-audio/scripts/carve.mjs");

const argv = process.argv.slice(2);
const strength = argv.includes("--strength") ? argv[argv.indexOf("--strength") + 1] : "0.5";
const dryRun = argv.includes("--dry-run");

if (!existsSync(carveScript)) {
  throw new Error(`no carve.mjs at ${carveScript}; set HF_CARVE_SCRIPT to the hyperframes-audio skill's copy`);
}
mkdirSync(scratch, { recursive: true });
if (!existsSync(join(coreDir, "node_modules/@hyperframes/core"))) {
  // Same version as the CLI this project pins, so the carve matches what renders it.
  const pin = readFileSync(join(project, "package.json"), "utf8").match(/hyperframes@([\d.]+)/)?.[1] ?? "latest";
  execFileSync("npm", ["install", "--prefix", coreDir, "--no-audit", "--no-fund", `@hyperframes/core@${pin}`], {
    stdio: "inherit",
  });
}

let html = readFileSync(indexPath, "utf8");

const attrOf = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1] ?? null;
const withAttr = (tag, name, value) =>
  attrOf(tag, name) === null
    ? tag.replace(/>$/, ` ${name}="${value}">`)
    : tag.replace(new RegExp(`(\\s${name}=)"[^"]*"`), `$1"${value}"`);
const withoutAttr = (tag, name) => tag.replace(new RegExp(`\\s${name}="[^"]*"`), "");
const num = (tag, name, fallback) => {
  const n = Number(attrOf(tag, name));
  return attrOf(tag, name) !== null && Number.isFinite(n) ? n : fallback;
};
const r3 = (v) => +v.toFixed(3);

/** Every <audio> opening tag with its timing. */
const clips = [...html.matchAll(/<audio\b[^>]*>/g)].map(([tag]) => ({
  tag,
  id: attrOf(tag, "id"),
  group: attrOf(tag, "data-audio-group"),
  src: attrOf(tag, "src"),
  start: num(tag, "data-start", 0),
  duration: num(tag, "data-duration", NaN),
  mediaStart: num(tag, "data-media-start", 0),
  rate: num(tag, "data-playback-rate", 1),
}));

/** The summed plain `gain` stages on a bus: the level change it applies to every member. */
function busGainDb(groupId) {
  const tag = html.match(new RegExp(`<hf-audio-group\\b[^>]*\\sid="${groupId}"[^>]*>`))?.[0];
  const chain = tag && attrOf(tag, "data-fx-chain");
  if (!chain) return 0;
  const { nodes = [] } = JSON.parse(chain.replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
  return nodes
    .filter((n) => n.type === "gain" && n.enabled !== false)
    .reduce((db, n) => db + (n.params?.gain ?? 0), 0);
}

/**
 * Write `seconds` of a clip, from `clipOffset` seconds into it, as it reaches the mix:
 * from the right point in the file, at the clip's rate, through its bus's gain.
 */
function conform(clip, clipOffset, seconds, out) {
  const filters = [];
  if (clip.rate !== 1) filters.push(`atempo=${clip.rate}`);
  const gain = busGainDb(clip.group);
  if (gain !== 0) filters.push(`volume=${gain}dB`);
  execFileSync("ffmpeg", [
    "-v", "error", "-y",
    "-ss", String(r3(clip.mediaStart + clipOffset * clip.rate)),
    "-i", resolve(project, clip.src),
    ...(filters.length ? ["-af", filters.join(",")] : []),
    "-t", String(r3(seconds)),
    "-ac", "1", "-ar", "48000", "-c:a", "pcm_f32le",
    out,
  ]);
}

const voices = clips.filter((c) => c.group === "voiceover" && c.src);
const beds = clips.filter((c) => c.group === "music" && c.src);
if (voices.length === 0) throw new Error("no <audio data-audio-group=\"voiceover\"> to make room for");

for (const bed of beds) {
  const bedEnd = bed.start + bed.duration;
  let comp = html;
  const named = [];
  for (const voice of voices) {
    const from = Math.max(voice.start, bed.start);
    const to = Math.min(voice.start + voice.duration, bedEnd);
    if (to - from < 0.05) continue;
    const wav = join(scratch, `${bed.id}__${voice.id}.wav`);
    conform(voice, from - voice.start, to - from, wav);
    let tag = withAttr(voice.tag, "src", wav);
    tag = withAttr(withAttr(tag, "data-start", r3(from)), "data-duration", r3(to - from));
    comp = comp.replace(voice.tag, tag);
    named.push(voice.id);
  }
  if (named.length === 0) {
    console.log(`– ${bed.id}: no voice over it, left alone`);
    continue;
  }
  const bedWav = join(scratch, `${bed.id}.wav`);
  conform(bed, 0, bed.duration, bedWav);
  comp = comp.replace(bed.tag, withAttr(bed.tag, "src", bedWav));

  const scratchIndex = join(scratch, `index.${bed.id}.html`);
  writeFileSync(scratchIndex, comp);
  console.log(`\n── ${bed.id} (${r3(bed.start)}–${r3(bedEnd)}s) ─────────────`);
  execFileSync(
    "node",
    [
      carveScript,
      "--comp", scratchIndex,
      "--bed", bed.id,
      ...named.flatMap((id) => ["--voice", id]),
      "--strength", strength,
      "--core", coreDir,
      ...(dryRun ? ["--dry-run"] : []),
    ],
    { stdio: "inherit" },
  );
  if (dryRun) continue;

  // Copy the carve's three attributes onto the real bed tag.
  const carvedTag = readFileSync(scratchIndex, "utf8").match(
    new RegExp(`<audio\\b[^>]*\\sid="${bed.id}"[^>]*>`),
  )?.[0];
  if (!carvedTag) throw new Error(`lost ${bed.id} in the scratch copy`);
  let realTag = bed.tag;
  for (const name of ["data-fx-carve", "data-fx-chain", "data-automation"]) {
    const value = attrOf(carvedTag, name);
    realTag = value === null ? withoutAttr(realTag, name) : withAttr(realTag, name, value);
  }
  html = html.replace(bed.tag, realTag);
}

if (!dryRun) {
  writeFileSync(indexPath, html);
  console.log(`\n✓ carved ${beds.map((b) => b.id).join(", ")} around ${voices.map((v) => v.id).join(", ")}`);
}
