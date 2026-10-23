"""Find (and with --apply, paint out) the full stop at the end of each title in the main film.

    uv run --with numpy --with scipy python -I kit/periods.py detect   # writes .hyperframes/periods.json
    uv run --with numpy --with scipy python -I kit/periods.py apply    # writes assets/main-clean.mp4

The main film is a render, so its titles can't be retyped. A title's full stop is a
~7 px square of the pixel font sitting on the baseline right after the last letter.
Detect looks only where titles live (the whole top of the frame in the story part,
the header band in the tour), finds blobs that differ from the band's background, and
keeps a blob only when it is small and square, no letter follows it on its line, and the
letter just before it is much taller and shares its bottom edge. That rules out i-dots,
commas, the dot in "roundone.dev", pixel art and small UI text. Apply covers each hit
with the background just to its right, and holds the patch a few frames either side so
the stop doesn't flash while a title blurs in or out.
"""
import json, subprocess, sys
import numpy as np
from scipy import ndimage

SRC = "assets/main.mp4"
OUT = "assets/main-clean.mp4"
LOG = ".hyperframes/periods.json"
W, H, FPS = 1920, 1080, 30
TOUR_FROM = 49.0                 # the app tour starts here; before it, the story part
STORY_BAND = (0, 620)            # y range searched in the story part
TOUR_BAND = (85, 178)            # the tour's title row
HOLD = 6                         # frames a patch is held either side of a detection

def frames(path, h=H):
    p = subprocess.Popen(["ffmpeg", "-v", "error", "-i", path, "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], stdout=subprocess.PIPE)
    n = W * H * 3
    while True:
        b = p.stdout.read(n)
        if len(b) < n: break
        yield np.frombuffer(b, np.uint8).reshape(H, W, 3)

def find(frame, t):
    y0, y1 = TOUR_BAND if t >= TOUR_FROM else STORY_BAND
    band = frame[y0:y1].astype(np.int32)
    lum = (band[..., 0] * 299 + band[..., 1] * 587 + band[..., 2] * 114) // 1000
    bg = int(np.median(lum))
    ink = np.abs(lum - bg) > 60
    lab, n = ndimage.label(ink)
    if n == 0: return []
    objs = ndimage.find_objects(lab)
    boxes = [(s[0].start, s[0].stop, s[1].start, s[1].stop) for s in objs]
    hits = []
    for i, (a, b, c, d) in enumerate(boxes):
        h, w = b - a, d - c
        big = 24 if t < TOUR_FROM else 11  # the story part's hero titles run up to ~110 px
        if not (5 <= h <= big and 5 <= w <= big and abs(h - w) <= 2): continue
        if d > W - 40: continue  # the patch is copied from the right
        if (lab[a:b, c:d] == i + 1).mean() < 0.8: continue
        gap = max(14, 1.2 * h + 4)
        letter = lambda a2, b2: -3 <= b2 - b <= 0.4 * (b2 - a2) and (b2 - a2) >= 2.5 * h
        # no letter after it on its line (stars and art don't count)
        if any(k != i and 0 < c2 - d <= 60 and letter(a2, b2) for k, (a2, b2, c2, d2) in enumerate(boxes)): continue
        # the glyph before it: close, at least 2.5x taller, ending at or below its bottom edge
        prev = [k for k, (a2, b2, c2, d2) in enumerate(boxes)
                if k != i and 0 <= c - d2 <= gap and -3 <= b2 - b <= 20 and a2 < a - h and (b2 - a2) >= 2.5 * h]
        if not prev: continue
        hits.append([a + y0, b + y0, c, d])
    return hits

def detect():
    out = {}
    for f, frame in enumerate(frames(SRC)):
        hits = find(frame, f / FPS)
        if hits: out[f] = hits
    json.dump(out, open(LOG, "w"))
    # summarise runs: consecutive frames with a hit at about the same place
    runs, cur = [], None
    keys = sorted(int(k) for k in out)
    for f in keys:
        box = out[f][0]
        if cur and f - cur["end"] <= 3 and abs(box[2] - cur["box"][2]) <= 40 and abs(box[0] - cur["box"][0]) <= 40:
            cur["end"] = f; cur["box"] = box
        else:
            cur = {"start": f, "end": f, "box": box}; runs.append(cur)
    for r in runs:
        print(f"{r['start']/FPS:7.2f}–{r['end']/FPS:7.2f}s  frames {r['end']-r['start']+1:3d}  box y{r['box'][0]}-{r['box'][1]} x{r['box'][2]}-{r['box'][3]}")
    print(f"{len(keys)} frames with a hit, {len(runs)} runs")

def apply():
    hits = {int(k): v for k, v in json.load(open(LOG)).items()}
    # hold each hit a few frames either side (titles blur in and out)
    # A box that stays put (seen in 3+ frames nearby) is a resting title and is held;
    # a one-off hit is a title mid whip-pan, so it is patched in its own frame only.
    near = lambda a, b: all(abs(x - y) <= 2 for x, y in zip(a, b))
    held = {f: list(boxes) for f, boxes in hits.items()}
    for f, boxes in hits.items():
        for box in boxes:
            seen = sum(any(near(box, o) for o in hits.get(g, [])) for g in range(f - HOLD, f + HOLD + 1))
            if seen < 3: continue
            for g in range(f - HOLD, f + HOLD + 1):
                held.setdefault(g, [])
                if not any(near(box, o) for o in held[g]): held[g].append(box)
    enc = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
                            "-i", SRC, "-map", "0:v", "-map", "1:a", "-c:v", "libx264", "-preset", "slow", "-crf", "12", "-pix_fmt", "yuv420p",
                            "-c:a", "copy", OUT], stdin=subprocess.PIPE)
    for f, frame in enumerate(frames(SRC)):
        if f in held:
            frame = frame.copy()
            for a, b, c, d in held[f]:
                a, b, c, d = a - 3, b + 3, c - 3, d + 3
                w = d - c
                frame[a:b, c:d] = frame[a:b, d + 2:d + 2 + w]
        enc.stdin.write(frame.tobytes())
    enc.stdin.close(); enc.wait()
    print(f"wrote {OUT}")

if len(sys.argv) > 2:  # detect on another file, e.g. to confirm main-clean.mp4 has no stops left
    SRC, LOG = sys.argv[2], ".hyperframes/periods-recheck.json"
{"detect": detect, "apply": apply}[sys.argv[1]]()
