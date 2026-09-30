// Renders each screen graphic in shots.js to devpost/screens/<nn>-<id>.png
// (3000×2000) with headless Chrome.
//
//   node devpost/screens/render.mjs            every shot
//   node devpost/screens/render.mjs winners    just these ids
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const DIR = path.dirname(new URL(import.meta.url).pathname);
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(DIR, "shots.js"), "utf8"), sandbox);
const shots = sandbox.window.SHOTS;
const only = process.argv.slice(2);

shots.forEach((shot, i) => {
  if (only.length && !only.includes(shot.id)) return;
  const out = path.join(DIR, `${String(i + 1).padStart(2, "0")}-${shot.id}.png`);
  execFileSync(CHROME, [
    "--headless=new", "--allow-file-access-from-files", "--hide-scrollbars",
    "--force-device-scale-factor=2", "--window-size=1500,1000", "--virtual-time-budget=4000",
    `--screenshot=${out}`, `file://${path.join(DIR, "frame.html")}?shot=${shot.id}`,
  ], { stdio: "ignore" });
  console.log("rendered", path.relative(process.cwd(), out));
});
