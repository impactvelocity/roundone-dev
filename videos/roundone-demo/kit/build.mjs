// Builds index.html and compositions/tour.html from edit.json.
//   node kit/build.mjs
// Each segment's length is the sum of its shots ((to - from) / rate). Its
// voice line (assets/vo/<id>.wav) starts voDelay seconds in; swap the wav for
// the final read and rebuild, and the build warns when a line outgrows its
// footage.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const edit = JSON.parse(fs.readFileSync(path.join(root, "edit.json"), "utf8"));
const r3 = (n) => Math.round(n * 1000) / 1000;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const probe = (f) => Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path.join(root, f)]).toString().trim());

// Stage geometry: the app window and its viewport onto a 1440 x 900 recording.
const WIN = { left: 160, top: 190, width: 1600, bar: 44 };
const VP = { w: WIN.width, h: WIN.width / 1.6 }; // 1600 x 1000, bleeds off the bottom
const VISIBLE_H = 1080 - WIN.top - WIN.bar; // what the viewer actually sees of it
const K = VP.w / 1440; // recording px -> viewport px

/** Camera for a zoom [scale, focusX, focusY] in recording px: focus to the visible centre, never past an edge. */
function camera([s, fx, fy] = [1, 720, 450]) {
  const x = Math.min(0, Math.max(VP.w - s * VP.w, VP.w / 2 - s * fx * K));
  const y = Math.min(0, Math.max(VISIBLE_H - s * VP.h, VISIBLE_H / 2 - s * fy * K));
  return { scale: s, x: r3(x), y: r3(y) };
}

// Lay the segments out on the tour's clock.
let t = 0;
const segs = edit.segments.map((seg) => {
  let st = t;
  const shots = seg.shots.map((sh, i) => {
    const dur = r3((sh.to - sh.from) / sh.rate);
    const shot = { ...sh, i, start: r3(st), dur };
    st += dur;
    return shot;
  });
  const dur = r3(st - t);
  const vo = `assets/vo/${seg.id}.wav`;
  const voLen = fs.existsSync(path.join(root, vo)) ? probe(vo) : 0;
  if (voLen + edit.voDelay + 0.3 > dur) console.warn(`! ${seg.id}: voice ${voLen.toFixed(2)}s + ${edit.voDelay}s lead needs ${(voLen + edit.voDelay + 0.3).toFixed(2)}s, footage is ${dur}s`);
  const out = { ...seg, start: r3(t), dur, shots, vo, voLen };
  t += dur;
  return out;
});
const TOUR = r3(t);
const total = r3(edit.coldOpen.duration + TOUR + edit.endCard.duration);

// ── tour.html ────────────────────────────────────────────────────────────────
const vids = [];
const urls = [];
const speeds = [];
const proofVids = [];
for (const seg of segs) {
  for (const sh of seg.shots) {
    const at = `data-start="${sh.start}" data-duration="${sh.dur}" data-media-start="${sh.from}" data-playback-rate="${sh.rate}"`;
    const id = `${seg.id}-${sh.i + 1}`;
    if (seg.proof) {
      if (sh.pair) proofVids.push(`<video id="pa-${id}" class="clip pa-video" src="assets/live/${sh.src}.mp4" ${at} muted playsinline></video>`);
      const term = sh.pair ?? sh.src;
      proofVids.push(`<video id="pt-${id}" class="clip pt-video" src="assets/live/${term}.mp4" ${at} muted playsinline></video>`);
    } else {
      vids.push(`<video id="v-${id}" class="clip shot" src="assets/live/${sh.src}.mp4" ${at} muted playsinline></video>`);
    }
    if (sh.url) urls.push(`<span id="u-${id}" class="clip url" data-start="${sh.start}" data-duration="${sh.dur}">localhost:3000${esc(sh.url)}</span>`);
    speeds.push(`<span id="s-${id}" class="clip speed${seg.proof ? " speed-proof" : ""}" data-start="${sh.start}" data-duration="${sh.dur}"><b>${sh.rate}×</b> speed</span>`);
  }
}
const headers = segs.map(
  (seg) => `<div id="h-${seg.id}" class="clip hdr" data-start="${seg.start}" data-duration="${seg.dur}">
        <div class="eb">${esc(seg.eyebrow)}</div>
        <div class="ti">${esc(seg.title)}</div>
      </div>`,
);
const steps = edit.chapters.map((c, i) => `<div id="step-${i}" class="step"><span class="fill"></span><span class="lbl">${esc(c)}</span></div>`);

// Timeline: header swaps, chapter stepper, camera, the proof layout.
const tl = [];
tl.push(`tl.fromTo("#flood", { opacity: 1 }, { opacity: 0, duration: 0.45, ease: "power2.inOut" }, 0);`);
tl.push(`tl.fromTo("#win", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "expo.out" }, 0.15);`);
tl.push(`tl.fromTo("#steps", { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0.3);`);
for (const seg of segs) {
  const lead = seg.start === 0 ? 0.35 : 0.05;
  tl.push(`tl.fromTo("#h-${seg.id} .eb", { opacity: 0, filter: "blur(6px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.18, ease: "power4.out" }, ${r3(seg.start + lead)});`);
  tl.push(`tl.fromTo("#h-${seg.id} .ti", { opacity: 0, filter: "blur(8px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.2, ease: "power4.out" }, ${r3(seg.start + lead + 0.07)});`);
  tl.push(`tl.to("#h-${seg.id} .eb, #h-${seg.id} .ti", { opacity: 0, filter: "blur(6px)", duration: 0.15, ease: "power3.in" }, ${r3(seg.start + seg.dur - 0.18)});`);
}
let chapter = -1;
for (const seg of segs) {
  if (seg.chapter === chapter) continue;
  const at = seg.start === 0 ? 0.3 : seg.start;
  if (chapter >= 0) tl.push(`tl.to("#step-${chapter} .fill", { opacity: 0, duration: 0.3, ease: "power2.inOut" }, ${r3(at)}); tl.to("#step-${chapter} .lbl", { color: "#6F6588", duration: 0.3 }, ${r3(at)});`);
  tl.push(`tl.fromTo("#step-${seg.chapter} .fill", { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.inOut", immediateRender: false }, ${r3(at)}); tl.to("#step-${seg.chapter} .lbl", { color: "#FFFFFF", duration: 0.3 }, ${r3(at)});`);
  chapter = seg.chapter;
}
// Camera: a new screen starts wide and pushes in; within one recording the camera travels.
let prev = null;
for (const seg of segs) {
  if (seg.proof) continue;
  seg.shots.forEach((sh, i) => {
    const cam = camera(sh.zoom);
    const sameTake = i > 0 && seg.shots[i - 1].src === sh.src;
    if (i === 0 || !sameTake) {
      tl.push(`tl.set("#cam", { scale: 1, x: 0, y: 0 }, ${sh.start});`);
      if (cam.scale !== 1) tl.push(`tl.to("#cam", { scale: ${cam.scale}, x: ${cam.x}, y: ${cam.y}, duration: 0.9, ease: "power2.inOut" }, ${r3(sh.start + 0.5)});`);
    } else if (JSON.stringify(cam) !== JSON.stringify(prev)) {
      tl.push(`tl.to("#cam", { scale: ${cam.scale}, x: ${cam.x}, y: ${cam.y}, duration: 0.8, ease: "power2.inOut" }, ${r3(sh.start)});`);
    }
    prev = cam;
  });
}
// Proof: the app window steps aside, app and terminal side by side, then the terminal fills the stage.
const proof = segs.find((s) => s.proof);
if (proof) {
  const p0 = proof.start;
  const split = proof.shots[0].start + proof.shots[0].dur;
  const end = proof.start + proof.dur;
  tl.push(`tl.to("#win", { opacity: 0, filter: "blur(8px)", duration: 0.2, ease: "power3.in" }, ${r3(p0 - 0.05)});`);
  tl.push(`tl.fromTo("#pa", { opacity: 0, filter: "blur(8px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.25, ease: "power4.out" }, ${r3(p0 + 0.1)});`);
  tl.push(`tl.fromTo("#pt", { opacity: 0, x: 950, y: 40, scale: 0.43 }, { opacity: 1, duration: 0.25, ease: "power4.out" }, ${r3(p0 + 0.2)});`);
  tl.push(`tl.to("#pa", { x: -260, opacity: 0, filter: "blur(10px)", duration: 0.55, ease: "power3.in" }, ${r3(split - 0.35)});`);
  tl.push(`tl.to("#pt", { x: 0, y: 0, scale: 1, duration: 0.7, ease: "power3.inOut" }, ${r3(split - 0.35)});`);
  tl.push(`tl.fromTo(".legend > div", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.35, ease: "expo.out", stagger: 0.12 }, ${r3(split + 0.6)});`);
  tl.push(`tl.to("#pt, .legend", { opacity: 0, filter: "blur(8px)", duration: 0.18, ease: "power3.in" }, ${r3(end - 0.2)});`);
  tl.push(`tl.to("#win", { opacity: 1, filter: "blur(0px)", duration: 0.2, ease: "power4.out" }, ${r3(end)});`);
}
tl.push(`tl.fromTo("#flood", { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.in", immediateRender: false }, ${r3(TOUR - 0.3)});`);

const tour = `<template>
  <style>
    @font-face{font-family:"GeistPixelSquare";font-weight:500;font-style:normal;font-display:block;src:url("assets/fonts/GeistPixelSquare.woff2") format("woff2");}
    @font-face{font-family:"GeistSans";font-weight:100 900;font-style:normal;font-display:block;src:url("assets/fonts/GeistSans-Variable.woff2") format("woff2");}
    @font-face{font-family:"GeistMono";font-weight:100 900;font-style:normal;font-display:block;src:url("assets/fonts/GeistMono-Variable.woff2") format("woff2");}
    #root { position: absolute; inset: 0; overflow: hidden; background-color: #FAF8FF;
      background-image: radial-gradient(circle at 1px 1px, rgba(124,58,237,0.10) 1.4px, transparent 1.6px); background-size: 32px 32px;
      font-family: "GeistSans", sans-serif; color: #1D1433; }
    .hdr { position: absolute; left: 120px; top: 50px; width: 1100px; height: 130px; }
    .hdr .eb { font: 600 20px/1 "GeistMono", monospace; letter-spacing: 0.2em; text-transform: uppercase; color: #7C3AED; }
    .hdr .ti { margin-top: 18px; font: 500 60px/1.05 "GeistPixelSquare", sans-serif; color: #1D1433; white-space: nowrap; }
    #steps { position: absolute; right: 120px; top: 70px; display: flex; gap: 6px; padding: 6px; border-radius: 14px; background: #FFFFFF; box-shadow: 0 1px 0 rgba(29,20,51,0.06), 0 8px 24px rgba(29,20,51,0.08); }
    .step { position: relative; padding: 10px 18px; border-radius: 9px; font: 600 19px/1 "GeistSans", sans-serif; }
    .step .fill { position: absolute; inset: 0; border-radius: 9px; background: #1D1433; opacity: 0; }
    .step .lbl { position: relative; color: #6F6588; }
    .window { position: absolute; border-radius: 14px; overflow: hidden; background: #FFFFFF; box-shadow: 0 2px 0 rgba(29,20,51,0.05), 0 30px 70px rgba(29,20,51,0.18); border: 1px solid rgba(29,20,51,0.08); }
    #win { left: ${WIN.left}px; top: ${WIN.top}px; width: ${WIN.width}px; height: ${WIN.bar + VP.h}px; }
    .bar { position: relative; height: ${WIN.bar}px; display: flex; align-items: center; gap: 8px; padding: 0 16px; background: #F3F0FA; border-bottom: 1px solid rgba(29,20,51,0.08); }
    .bar .dot { width: 12px; height: 12px; border-radius: 50%; }
    .addr { position: absolute; left: 50%; top: 8px; width: 760px; height: 28px; margin-left: -380px; border-radius: 8px; background: #FFFFFF; border: 1px solid rgba(29,20,51,0.08); }
    .url { position: absolute; left: 0; right: 0; top: 0; height: 28px; line-height: 28px; text-align: center; font: 500 16px "GeistMono", monospace; color: #564B70; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .speed { position: absolute; right: 16px; top: 9px; height: 26px; padding: 0 10px; border-radius: 7px; background: #1D1433; color: #F7F2FF; font: 500 15px/26px "GeistMono", monospace; }
    .speed b { font-weight: 700; color: #FBBF24; }
    .speed-proof { top: 199px; right: 176px; z-index: 6; }
    #vp { position: relative; width: ${VP.w}px; height: ${VP.h}px; overflow: hidden; background: #FAF8FF; }
    #cam { position: absolute; left: 0; top: 0; width: ${VP.w}px; height: ${VP.h}px; transform-origin: 0 0; }
    .shot { position: absolute; left: 0; top: 0; width: ${VP.w}px; height: ${VP.h}px; object-fit: fill; }
    #pa { left: 120px; top: 230px; width: 960px; height: ${44 + 600}px; opacity: 0; }
    #pa .pvp { position: relative; width: 960px; height: 600px; overflow: hidden; }
    .pa-video { position: absolute; left: 0; top: 0; width: 960px; height: 600px; }
    #pt { left: 160px; top: 190px; width: 1600px; height: 890px; background: #0F0B1A; border-color: #2C2448; transform-origin: 0 0; opacity: 0; z-index: 4; }
    #pt .bar { background: #1B1530; border-bottom-color: #2C2448; color: #A99FC9; font: 500 17px "GeistMono", monospace; }
    #pt .pvp { position: relative; width: 1600px; height: 846px; overflow: hidden; }
    .pt-video { position: absolute; left: -10px; top: -65px; width: 1700px; height: 1530px; }
    .legend { position: absolute; left: 140px; bottom: 30px; display: flex; gap: 12px; z-index: 6; }
    .legend > div { display: flex; align-items: center; gap: 10px; height: 56px; padding: 0 20px; border-radius: 12px; background: #FFFFFF; box-shadow: 0 10px 30px rgba(15,11,26,0.35); font: 600 25px/1 "GeistSans", sans-serif; color: #1D1433; }
    .legend code { font: 500 21px "GeistMono", monospace; color: #564B70; }
    .legend i { width: 14px; height: 14px; border-radius: 3px; display: inline-block; }
    #flood { position: absolute; inset: 0; background: #150C2E; z-index: 9; }
  </style>
  <div id="root" data-composition-id="tour" data-width="1920" data-height="1080">
    ${headers.join("\n    ")}
    <div id="steps">${steps.join("")}</div>
    <div id="win" class="window" data-layout-allow-overflow>
      <div class="bar" data-layout-ignore><span class="dot" style="background:#FF5F57"></span><span class="dot" style="background:#FEBC2E"></span><span class="dot" style="background:#28C840"></span>
        <div class="addr">${urls.join("")}</div>
        ${speeds.filter((s) => !s.includes("speed-proof")).join("\n        ")}
      </div>
      <div id="vp"><div id="cam">
        ${vids.join("\n        ")}
      </div></div>
    </div>
    <div id="pa" class="window">
      <div class="bar" data-layout-ignore><span class="dot" style="background:#FF5F57"></span><span class="dot" style="background:#FEBC2E"></span><span class="dot" style="background:#28C840"></span>
        <div class="addr" style="width:520px;margin-left:-260px"><span class="url">localhost:3000/h/agent-builders-hackathon/judging/projects/1</span></div></div>
      <div class="pvp">${proofVids.filter((v) => v.includes("pa-video")).join("")}</div>
    </div>
    <div id="pt" class="window">
      <div class="bar" data-layout-ignore><span class="dot" style="background:#FF5F57"></span><span class="dot" style="background:#FEBC2E"></span><span class="dot" style="background:#28C840"></span>&nbsp;&nbsp;roundone — pnpm dev (NODE_DEBUG=fetch) · live, during the review</div>
      <div class="pvp">${proofVids.filter((v) => v.includes("pt-video")).join("")}</div>
    </div>
    <div class="legend">
      <div><i style="background:#7C3AED"></i>Nemotron on Nebius Token Factory <code>/v1/chat/completions</code></div>
      <div><i style="background:#76B900"></i>Nebius Sandboxes <code>/sandboxes/v1</code></div>
      <div><i style="background:#2DD4BF"></i>Tavily <code>api.tavily.com</code></div>
    </div>
    ${speeds.filter((s) => s.includes("speed-proof")).join("\n    ")}
    <div id="flood"></div>
  </div>
  <script>
    const tl = gsap.timeline({ paused: true });
    ${tl.join("\n    ")}
    window.__timelines["tour"] = tl;
  </script>
</template>
`;
fs.mkdirSync(path.join(root, "compositions"), { recursive: true });
fs.writeFileSync(path.join(root, "compositions/tour.html"), tour);

// ── index.html ───────────────────────────────────────────────────────────────
const T0 = edit.coldOpen.duration;
const voices = segs.map(
  (seg) => `<audio id="vo-${seg.id}" class="clip" src="${seg.vo}" data-start="${r3(T0 + seg.start + edit.voDelay)}" data-duration="${r3(seg.voLen)}" data-volume="1" data-track-index="3"></audio>`,
);
const index = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { margin: 0; width: 1920px; height: 1080px; overflow: hidden; background: #150C2E; }
      #root { position: relative; width: 100%; height: 100%; }
      .full { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; object-fit: contain; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${total}" data-width="1920" data-height="1080">
      <video id="coldopen" class="clip full" src="${edit.coldOpen.src}" data-start="0" data-duration="${T0}" data-has-audio="true" data-fade-out="0.4" playsinline data-track-index="0"></video>
      <div id="tour" data-composition-id="tour" data-composition-src="compositions/tour.html" data-start="${T0}" data-duration="${TOUR}" data-track-index="1" data-track-kind="graphics" data-width="1920" data-height="1080"></div>
      <video id="endcard" class="clip full" src="${edit.endCard.src}" data-start="${r3(T0 + TOUR)}" data-duration="${edit.endCard.duration}" data-has-audio="true" playsinline data-track-index="0"></video>
      <audio id="music" class="clip" src="${edit.music.src}" data-start="${r3(T0 - 0.4)}" data-duration="${r3(TOUR + 0.7)}" data-media-start="${edit.music.mediaStart}" data-volume="${edit.music.volume}" data-fade-in="1.2" data-fade-out="0.6" data-track-index="2"></audio>
      ${voices.join("\n      ")}
    </div>
    <script>
      const tl = gsap.timeline({ paused: true });
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`;
fs.writeFileSync(path.join(root, "index.html"), index);

console.log(`tour ${TOUR}s · total ${total}s (${Math.floor(total / 60)}:${String(Math.round(total % 60)).padStart(2, "0")})`);
for (const s of segs) console.log(`  ${s.id.padEnd(8)} ${String(s.start).padStart(7)}s  ${String(s.dur).padStart(6)}s  voice ${s.voLen.toFixed(2)}s`);
