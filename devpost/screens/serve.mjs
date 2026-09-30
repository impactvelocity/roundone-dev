// Serves the screen-graphic template for previewing in a browser, e.g.
// http://localhost:3007/devpost/screens/frame.html?shot=winners
// Only the folders frame.html loads from are reachable; nothing else in the repo.
//
//   node devpost/screens/serve.mjs [port=3007]
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const ALLOWED = ["devpost/screens/", "node_modules/geist/dist/fonts/", "public/landing/"];
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".svg": "image/svg+xml" };
const port = Number(process.argv[2] ?? 3007);

http.createServer((req, res) => {
  const { pathname } = new URL(req.url, "http://localhost");
  if (pathname === "/") {
    res.writeHead(302, { Location: "/devpost/screens/frame.html" });
    return res.end();
  }
  const rel = path.normalize(decodeURIComponent(pathname)).replace(/^\/+/, "");
  const file = path.join(ROOT, rel);
  if (!ALLOWED.some((p) => rel.startsWith(p)) || !file.startsWith(ROOT + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404);
    return res.end("Not found");
  }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] ?? "application/octet-stream", "Cache-Control": "no-store" });
  fs.createReadStream(file).pipe(res);
}).listen(port, "127.0.0.1", () => console.log(`Screen graphics on http://localhost:${port}/`));
