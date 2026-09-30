// Captures a public RoundOne page (no sign-in: /w, /docs, /landing) as a 2× PNG
// for the screen graphics. Hides the Next.js dev indicator before the shot.
//
//   node devpost/screens/capture-public.mjs <url> <out.png> [width=1440] [height=900] [scrollY=0]
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const [url, out, width = "1440", height = "900", scrollY = "0"] = process.argv.slice(2);
if (!url || !out) throw new Error("usage: capture-public.mjs <url> <out.png> [width] [height] [scrollY]");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const port = 9400 + Math.floor(Math.random() * 400);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "r1-shot-"));
const chrome = spawn(CHROME, [
  "--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  "--hide-scrollbars", "--no-first-run", "--no-default-browser-check", "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200);
  try { target = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === "page"); } catch {}
}
if (!target) throw new Error("Chrome didn't start");

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let id = 0;
const pending = new Map();
const listeners = [];
ws.addEventListener("message", (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
  else listeners.forEach((fn) => fn(msg));
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const n = ++id;
  pending.set(n, (m) => (m.error ? reject(new Error(`${method}: ${m.error.message}`)) : resolve(m.result)));
  ws.send(JSON.stringify({ id: n, method, params }));
});
const once = (method) => new Promise((r) => listeners.push((m) => m.method === method && r(m.params)));

try {
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: +width, height: +height, deviceScaleFactor: 2, mobile: false });
  const loaded = once("Page.loadEventFired");
  await send("Page.navigate", { url });
  await loaded;
  await send("Runtime.evaluate", {
    awaitPromise: true,
    expression: `(async () => {
      const s = document.createElement("style");
      s.textContent = "nextjs-portal{display:none!important} *{caret-color:transparent!important}";
      document.head.appendChild(s);
      await document.fonts.ready;
      window.scrollTo(0, ${+scrollY});
      await new Promise((r) => setTimeout(r, 1500));
    })()`,
  });
  const { data } = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(out, Buffer.from(data, "base64"));
  console.log("saved", out);
} finally {
  ws.close();
  const exited = new Promise((r) => chrome.once("exit", r));
  chrome.kill();
  await exited;
  fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
