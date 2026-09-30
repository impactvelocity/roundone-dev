#!/usr/bin/env bash
# Snapshot one frame on its own, outside the film, to check it while building.
#   bash kit/tour-harness.sh <frame_id> <duration_s> <t1,t2,…>
#   bash kit/tour-harness.sh 18-review 8 0.5,1.8,3.6,5.2,7.6
# Writes .hyperframes/harness-<frame_id>/snapshots/{frame-*.png,contact-sheet.jpg}.
set -euo pipefail
id="$1"; dur="$2"; at="$3"
here="$(cd "$(dirname "$0")/.." && pwd)"
dir="$here/.hyperframes/harness-$id"
mkdir -p "$dir"
ln -sfn ../../assets "$dir/assets"
ln -sfn ../../compositions "$dir/compositions"
cp "$here/hyperframes.json" "$here/package.json" "$dir/"
cat > "$dir/index.html" <<EOF
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1920px; height: 1080px; overflow: hidden; background: #000; }
      #root { position: relative; width: 100%; height: 100%; overflow: hidden; background: #FAF8FF; }
      .scene { position: absolute; inset: 0; width: 100%; height: 100%; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="$dur" data-width="1920" data-height="1080">
      <div id="el-test" class="scene" data-composition-id="$id" data-composition-src="compositions/frames/$id.html" data-start="0" data-duration="$dur" data-track-index="0"></div>
    </div>
    <script>
      window.__timelines["main"] = gsap.timeline({ paused: true });
      window.__timelines["main"].to({}, { duration: $dur }, 0);
    </script>
  </body>
</html>
EOF
rm -rf "$dir/snapshots"
cd "$here"
npx --yes hyperframes@0.8.98 snapshot "$dir" --at "$at" --no-end --timeout 20000 2>&1 | grep -E "frame-|contact|rror" || true
echo "→ $dir/snapshots/contact-sheet.jpg"
