// Builds index.html (the live agent block) from edit.json.
//   node kit/build.mjs
// The block is the stretch that replaces the main film's agent diagram: the app on
// the left, the dev server's request log on the right, three chips naming the
// calls. A shot's length is (to - from) / rate. A shot with "log": "sync" plays the
// log from the same source second as the app (10a and 10b were recorded together);
// any other log shot names its own source time and gets the segment's log tag.
// Each segment's voice line (assets/vo/<id>.wav) starts voDelay into the segment
// (the first one at firstVoAt); the build warns when a line outgrows its footage.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const edit = JSON.parse(fs.readFileSync(path.join(root, "edit.json"), "utf8"));
const r3 = (n) => Math.round(n * 1000) / 1000;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const probe = (f) => Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path.join(root, f)]).toString().trim());

// Stage geometry (frame px). Both windows bleed off the bottom, like the main film's tour.
const BAR = 46;
const TOP = 196;
const APP = { left: 120, width: 1060 };
const LOG = { left: 1204, width: 596 };
const VIS_H = 1080 - TOP - BAR; // what the viewer sees of either window's content
const K = APP.width / 1440; // recording px (1440 x 900) -> app viewport px
const VP_H = 900 * K;
// The log recording is 2000 x 1800 (a 1000 x 900 terminal at 2x). Scale it so the
// host and path read; the long operation ids run off the right edge.
const LK = 0.518;
const LOG_W = r3(2000 * LK);
const LOG_H = r3(1800 * LK);
const LOG_Y = { top: r3(-82 * LK), bottom: r3(VIS_H - (1780 * LK)) };

/** Camera for a zoom [scale, focusX, focusY] in recording px: focus to the visible centre, never past an edge. */
function camera([s, fx, fy]) {
  const x = Math.min(0, Math.max(APP.width - s * APP.width, APP.width / 2 - s * fx * K));
  const y = Math.min(0, Math.max(VIS_H - s * VP_H, VIS_H / 2 - s * fy * K));
  if (s * VP_H < VIS_H) console.warn(`! zoom ${s} leaves the app window short of the frame bottom`);
  return { scale: s, x: r3(x), y: r3(y) };
}

// Lay the segments out on the block's clock.
let t = 0;
const segs = edit.segments.map((seg, si) => {
  let st = t;
  const shots = seg.shots.map((sh, i) => {
    const dur = r3((sh.to - sh.from) / sh.rate);
    const log = sh.log === "sync" ? { from: sh.from, rate: sh.rate } : { from: sh.log.from, rate: sh.log.rate ?? sh.rate };
    const shot = { ...sh, i, start: r3(st), dur, logShot: log };
    st += dur;
    return shot;
  });
  const dur = r3(st - t);
  const vo = `assets/vo/${seg.id}.wav`;
  const voLen = probe(vo);
  const voAt = r3(si === 0 ? edit.firstVoAt : t + edit.voDelay);
  if (voAt + voLen + 0.05 > t + dur) console.warn(`! ${seg.id}: voice ends ${(voAt + voLen).toFixed(2)}s, footage ends ${(t + dur).toFixed(2)}s`);
  const out = { ...seg, start: r3(t), dur, shots, vo, voLen, voAt };
  t += dur;
  return out;
});
const TOTAL = r3(t);

const CHIPS = {
  nebius: { color: "#A78BFA", label: "Nemotron on Token Factory", path: "/chat/completions" },
  sandbox: { color: "#76B900", label: "Nebius Sandboxes", path: "/sandboxes/v1/…" },
  tavily: { color: "#2DD4BF", label: "Tavily", path: "api.tavily.com" },
};
const CHECK = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" shape-rendering="crispEdges" aria-hidden="true"><polygon points="22 4 22 6 21 6 21 7 20 7 20 8 19 8 19 9 18 9 18 10 17 10 17 11 16 11 16 12 15 12 15 13 14 13 14 14 13 14 13 15 12 15 12 16 11 16 11 17 10 17 10 18 8 18 8 17 7 17 7 16 6 16 6 15 5 15 5 14 4 14 4 13 3 13 3 12 2 12 2 10 4 10 4 11 5 11 5 12 6 12 6 13 7 13 7 14 8 14 8 15 10 15 10 14 11 14 11 13 12 13 12 12 13 12 13 11 14 11 14 10 15 10 15 9 16 9 16 8 17 8 17 7 18 7 18 6 19 6 19 5 20 5 20 4 22 4"/></svg>';

// ── markup ───────────────────────────────────────────────────────────────────
const appVids = [];
const logVids = [];
const appSpeeds = [];
const logSpeeds = [];
const logTags = [];
for (const seg of segs) {
  for (const sh of seg.shots) {
    const id = `${seg.id}-${sh.i + 1}`;
    const span = `data-start="${sh.start}" data-duration="${sh.dur}"`;
    appVids.push(`<video id="v-${id}" class="clip shot" src="assets/live/${sh.src}.mp4" ${span} data-media-start="${sh.from}" data-playback-rate="${sh.rate}" muted playsinline></video>`);
    logVids.push(`<video id="l-${id}" class="clip logv" src="assets/live/10b-proof-terminal.mp4" ${span} data-media-start="${sh.logShot.from}" data-playback-rate="${sh.logShot.rate}" muted playsinline></video>`);
    appSpeeds.push(`<span id="sa-${id}" class="clip speed" ${span} data-layout-ignore><b>${sh.rate}×</b> speed</span>`);
    logSpeeds.push(`<span id="sl-${id}" class="clip speed" ${span} data-layout-ignore><b>${sh.logShot.rate}×</b> speed</span>`);
  }
  logTags.push(`<span id="lt-${seg.id}" class="clip ltag" data-layout-ignore data-start="${seg.start}" data-duration="${seg.dur}">${esc(seg.log.label)} <em>· ${esc(seg.log.tag)}</em></span>`);
}
const headers = segs.map(
  (seg) => `<div id="h-${seg.id}" class="clip hdr" data-start="${seg.start}" data-duration="${seg.dur}">
        <div class="eb" data-layout-allow-overlap>${seg.eyebrow}</div>
        <div class="ti" data-layout-allow-overlap>${esc(seg.title)}</div>
      </div>`,
);
const steps = ["Setup", "The agent", "Judging", "Results"]
  .map((name, i) => {
    const cls = i < edit.chapter ? "step done" : i === edit.chapter ? "step now" : "step";
    return `${i > 0 ? '<span class="sep"></span>' : ""}<span class="${cls}">${i < edit.chapter ? CHECK : "<i></i>"}<span>${name}</span></span>`;
  })
  .join("");
const chips = Object.entries(CHIPS).map(
  ([k, c]) => `<div id="chip-${k}" class="chip"><i style="background:${c.color}"></i><span class="cl">${esc(c.label)}</span><code>${esc(c.path)}</code></div>`,
);
const voices = segs.map(
  (seg) => `<audio id="vo-${seg.id}" class="clip" src="${seg.vo}" data-start="${seg.voAt}" data-duration="${r3(seg.voLen)}" data-volume="1" data-track-index="5"></audio>`,
);

// The entrance wipe: the main film's dark agent diagram breaks up into pixels, in
// eight stepped waves like the film's own pixel wipes. Seeded, so every render matches.
const PX = 60;
const WAVES = 8;
let seed = 20261022;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const shade = (row) => {
  const a = [0x16, 0x0c, 0x2e], b = [0x22, 0x0f, 0x3a], k = row / 17;
  return "#" + a.map((v, i) => Math.round(v + (b[i] - v) * k).toString(16).padStart(2, "0")).join("");
};
const pixels = [];
for (let row = 0; row < 18; row++)
  for (let col = 0; col < 32; col++)
    pixels.push(`<i class="px w${Math.floor(rnd() * WAVES)}" style="left:${col * PX}px;top:${row * PX}px;background:${shade(row)}"></i>`);

// ── timeline ─────────────────────────────────────────────────────────────────
const tl = [];
// Entrance from the main film's dark agent diagram: the dark breaks up, the windows rise in.
for (let w = 0; w < WAVES; w++) tl.push(`tl.set("#flood .w${w}", { opacity: 0 }, ${r3(0.04 + w * 0.05)});`);
tl.push(`tl.fromTo("#steps", { y: -14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 0.2);`);
tl.push(`tl.fromTo("#app", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "expo.out" }, 0.15);`);
tl.push(`tl.fromTo("#log", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "expo.out" }, 0.3);`);
tl.push(`tl.fromTo(".chip", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.35, ease: "expo.out", stagger: 0.1 }, 0.9);`);
for (const seg of segs) {
  const first = seg.start === 0;
  const lead = first ? 0.25 : 0.05;
  if (first) {
    tl.push(`tl.fromTo("#h-${seg.id} .eb", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, ${lead});`);
    tl.push(`tl.fromTo("#h-${seg.id} .ti", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, ${r3(lead + 0.1)});`);
  } else {
    tl.push(`tl.fromTo("#h-${seg.id} .eb", { opacity: 0, filter: "blur(6px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.18, ease: "power4.out" }, ${r3(seg.start + lead)});`);
    tl.push(`tl.fromTo("#h-${seg.id} .ti", { opacity: 0, filter: "blur(8px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.2, ease: "power4.out" }, ${r3(seg.start + lead + 0.07)});`);
  }
  if (seg.start + seg.dur < TOTAL - 0.01) tl.push(`tl.to("#h-${seg.id} .eb, #h-${seg.id} .ti", { opacity: 0, filter: "blur(6px)", duration: 0.15, ease: "power3.in" }, ${r3(seg.start + seg.dur - 0.18)});`);
  // The chips the voice is talking about light up; the rest dim.
  const at = first ? 1.6 : seg.start + 0.1;
  for (const k of Object.keys(CHIPS)) {
    const on = seg.chips.includes(k);
    tl.push(`tl.to("#chip-${k}", { backgroundColor: "${on ? "#FFFFFF" : "#241D3A"}", borderColor: "${on ? "#FFFFFF" : "#3A3158"}", scale: ${on ? 1 : 0.97}, duration: 0.3, ease: "power2.out" }, ${r3(at)});`);
    tl.push(`tl.to("#chip-${k} .cl", { color: "${on ? "#1D1433" : "#E4DDFA"}", duration: 0.3, ease: "power2.out" }, ${r3(at)});`);
    tl.push(`tl.to("#chip-${k} code", { color: "${on ? "#564B70" : "#B3AAD1"}", duration: 0.3, ease: "power2.out" }, ${r3(at)});`);
    tl.push(`tl.to("#chip-${k} i", { scale: ${on ? 1.25 : 1}, duration: 0.3, ease: "power2.out" }, ${r3(at)});`);
  }
}
// Cameras: a new recording starts wide and pushes in; within one take the camera travels.
let prev = null;
let prevSrc = null;
let prevLogY = null;
for (const seg of segs) {
  for (const sh of seg.shots) {
    const cam = camera(sh.zoom);
    if (sh.src !== prevSrc) {
      const wide = camera([Math.max(1.3, sh.zoom[0] - 0.15), sh.zoom[1], sh.zoom[2]]);
      tl.push(`tl.set("#cam", { scale: ${wide.scale}, x: ${wide.x}, y: ${wide.y} }, ${sh.start});`);
      tl.push(`tl.to("#cam", { scale: ${cam.scale}, x: ${cam.x}, y: ${cam.y}, duration: 0.9, ease: "power2.inOut" }, ${r3(sh.start + 0.3)});`);
    } else if (JSON.stringify(cam) !== JSON.stringify(prev)) {
      tl.push(`tl.to("#cam", { scale: ${cam.scale}, x: ${cam.x}, y: ${cam.y}, duration: 0.8, ease: "power2.inOut" }, ${sh.start});`);
    }
    const ly = LOG_Y[sh.logY];
    if (prevLogY === null) tl.push(`tl.set("#lcam", { y: ${ly} }, 0);`);
    else if (ly !== prevLogY) tl.push(`tl.to("#lcam", { y: ${ly}, duration: 0.8, ease: "power2.inOut" }, ${sh.start});`);
    prev = cam;
    prevSrc = sh.src;
    prevLogY = ly;
  }
}
// Exit: a whip-pan left, the way the main film moves between tour scenes; the film
// picks up as its inbox scene slides in from the right. The stepper stays, as it does there.
const last = segs.at(-1).id;
tl.push(`tl.to("#app, #log, .chips, #h-${last}", { x: -1900, filter: "blur(10px)", duration: ${edit.tail}, ease: "power3.in" }, ${r3(TOTAL - edit.tail)});`);

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      @font-face{font-family:"GeistPixelSquare";font-weight:500;font-style:normal;font-display:block;src:url("assets/fonts/GeistPixelSquare.woff2") format("woff2");}
      @font-face{font-family:"GeistSans";font-weight:100 900;font-style:normal;font-display:block;src:url("assets/fonts/GeistSans-Variable.woff2") format("woff2");}
      @font-face{font-family:"GeistMono";font-weight:100 900;font-style:normal;font-display:block;src:url("assets/fonts/GeistMono-Variable.woff2") format("woff2");}
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { margin: 0; width: 1920px; height: 1080px; overflow: hidden; background: #FAF8FF; }
      #root { position: relative; width: 100%; height: 100%; overflow: hidden; font-family: "GeistSans", sans-serif; color: #1D1433; }
      #ground { position: absolute; inset: 0; background-color: #FAF8FF;
        background-image: radial-gradient(circle at 1px 1px, rgba(124,58,237,0.10) 1.4px, transparent 1.6px); background-size: 32px 32px; }
      .hdr { position: absolute; left: 120px; top: 58px; width: 1040px; height: 130px; }
      .hdr .eb { font: 600 20px/1 "GeistMono", monospace; letter-spacing: 0.2em; text-transform: uppercase; color: #7C3AED; white-space: nowrap; }
      .hdr .eb b { color: #564B70; font-weight: 600; }
      .hdr .ti { margin-top: 16px; font: 500 58px/1.02 "GeistPixelSquare", sans-serif; color: #1D1433; white-space: nowrap; letter-spacing: -0.005em; }
      #steps { position: absolute; right: 120px; top: 60px; display: flex; align-items: center; gap: 10px; }
      .step { display: flex; align-items: center; gap: 8px; height: 38px; padding: 0 16px; border-radius: 999px; font: 600 15px/1 "GeistMono", monospace; letter-spacing: 0.14em; text-transform: uppercase; white-space: nowrap; color: #7B7292; border: 1.5px solid rgba(46,22,88,0.12); background: #FFFFFF; }
      .step.done { color: #7C3AED; background: #EDE5FF; border-color: transparent; }
      .step.now { color: #FFFFFF; background: #7C3AED; border-color: #7C3AED; box-shadow: 0 10px 24px -10px rgba(124,58,237,0.7); }
      .step i { display: block; width: 8px; height: 8px; background: currentColor; }
      .step svg { display: block; }
      .sep { width: 14px; height: 3px; background: rgba(46,22,88,0.16); }
      .window { position: absolute; top: ${TOP}px; height: ${1080 - TOP + 30}px; border-radius: 18px; overflow: hidden; background: #FFFFFF; border: 1px solid rgba(26,21,48,0.12); box-shadow: 0 60px 110px -46px rgba(46,22,110,0.5), 0 22px 44px -22px rgba(46,22,110,0.28); }
      #app { left: ${APP.left}px; width: ${APP.width}px; }
      #log { left: ${LOG.left}px; width: ${LOG.width}px; background: #0F0B1A; border-color: #2C2448; }
      .bar { position: relative; height: ${BAR}px; display: flex; align-items: center; padding: 0 18px; background: #FBFAFF; border-bottom: 1px solid #ECE8F4; }
      #log .bar { background: #1B1530; border-bottom-color: #2C2448; }
      .dots { display: flex; gap: 9px; }
      .dots i { display: block; width: 13px; height: 13px; border-radius: 50%; background: #E3DEEE; }
      #log .dots i { background: #3A3158; }
      .url { position: absolute; left: 50%; top: 9px; margin-left: -300px; width: 600px; height: 28px; display: flex; align-items: center; justify-content: center; border-radius: 9px; background: #F1EEF8; font: 400 15px/1 "GeistMono", monospace; color: #6E6888; white-space: nowrap; }
      .url b { color: #1A1530; font-weight: 500; }
      .ltag { position: absolute; left: 92px; top: 0; height: ${BAR}px; line-height: ${BAR}px; font: 600 16px/${BAR}px "GeistMono", monospace; color: #E9E3FF; white-space: nowrap; }
      .ltag em { font-style: normal; font-weight: 500; color: #A99FC9; }
      .speed { position: absolute; right: 14px; top: 10px; height: 26px; padding: 0 10px; border-radius: 7px; background: #1D1433; color: #F7F2FF; font: 500 15px/26px "GeistMono", monospace; white-space: nowrap; }
      #log .speed { background: #2C2448; }
      .speed b { font-weight: 700; color: #FBBF24; }
      .vp { position: relative; width: 100%; height: ${VIS_H + 30}px; overflow: hidden; }
      #app .vp { background: #FAF8FF; }
      #cam { position: absolute; left: 0; top: 0; width: ${APP.width}px; height: ${r3(VP_H)}px; transform-origin: 0 0; }
      .shot { position: absolute; left: 0; top: 0; width: ${APP.width}px; height: ${r3(VP_H)}px; object-fit: fill; }
      #lcam { position: absolute; left: 0; top: 0; width: ${LOG_W}px; height: ${LOG_H}px; }
      .logv { position: absolute; left: -6px; top: 0; width: ${LOG_W}px; height: ${LOG_H}px; object-fit: fill; }
      .chips { position: absolute; left: ${LOG.left + 16}px; bottom: 30px; width: ${LOG.width - 32}px; display: flex; flex-direction: column; gap: 10px; }
      .chip { display: flex; align-items: center; gap: 12px; height: 54px; padding: 0 18px; border-radius: 12px; background: #241D3A; border: 1px solid #3A3158; box-shadow: 0 10px 30px rgba(15,11,26,0.45); transform-origin: 50% 50%; }
      .chip i { flex: 0 0 14px; width: 14px; height: 14px; border-radius: 3px; }
      .chip .cl { font: 600 21px/1 "GeistSans", sans-serif; color: #E4DDFA; white-space: nowrap; }
      .chip code { margin-left: auto; font: 500 17px/1 "GeistMono", monospace; color: #B3AAD1; white-space: nowrap; }
      #flood { position: absolute; inset: 0; }
      #flood .px { position: absolute; width: ${PX}px; height: ${PX}px; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${TOTAL}" data-width="1920" data-height="1080">
      <div id="ground"></div>
      ${headers.join("\n      ")}
      <div id="steps" data-layout-ignore>${steps}</div>
      <div id="app" class="window" data-layout-allow-overflow>
        <div class="bar" data-layout-ignore><div class="dots"><i></i><i></i><i></i></div>
          <div class="url" data-layout-ignore><b>localhost:3000</b>/h/agent-builders-hackathon/judging/projects/1</div>
          ${appSpeeds.join("\n          ")}
        </div>
        <div class="vp"><div id="cam">
          ${appVids.join("\n          ")}
        </div></div>
      </div>
      <div id="log" class="window" data-layout-allow-overflow>
        <div class="bar" data-layout-ignore><div class="dots"><i></i><i></i><i></i></div>
          ${logTags.join("\n          ")}
          ${logSpeeds.join("\n          ")}
        </div>
        <div class="vp"><div id="lcam">
          ${logVids.join("\n          ")}
        </div></div>
      </div>
      <div class="chips">
        ${chips.join("\n        ")}
      </div>
      <div id="flood" data-layout-ignore>${pixels.join("")}</div>
      ${voices.join("\n      ")}
    </div>
    <script>
      const tl = gsap.timeline({ paused: true });
      ${tl.join("\n      ")}
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`;
fs.writeFileSync(path.join(root, "index.html"), html);

console.log(`block ${TOTAL}s`);
for (const s of segs) console.log(`  ${s.id.padEnd(8)} ${String(s.start).padStart(7)}s  ${String(s.dur).padStart(6)}s  voice ${s.voAt}s + ${s.voLen.toFixed(2)}s`);
