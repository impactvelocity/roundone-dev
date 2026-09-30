// Builds assets/retro-kit.js from kit/retro-kit.src.js by inlining the app's pixel icons.
// Run from anywhere: node kit/build-kit.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const project = join(here, "..");
const icons = JSON.parse(readFileSync(join(project, "capture/assets/pixel-icons/_all.json"), "utf8"));
const src = readFileSync(join(here, "retro-kit.src.js"), "utf8");
if (!src.includes("/*__ICONS__*/ {}")) throw new Error("icon placeholder missing");
const out = src.replace("/*__ICONS__*/ {}", JSON.stringify(icons)).replace("Built from assets/retro-kit.src.js", "Built from kit/retro-kit.src.js");
writeFileSync(join(project, "assets/retro-kit.js"), out);
console.log(`✓ assets/retro-kit.js (${Object.keys(icons).length} icons, ${out.length} bytes)`);
