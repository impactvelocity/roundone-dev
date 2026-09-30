/*
 * RoundOne tour kit — the app-tour layer of the launch film.
 *
 * Puts the real app on screen the way the landing page's screen tour does
 * (devpost/screens/frame.html): a browser window holding a 1440×900 screenshot
 * (captured at 2×), numbered callout rings and dark cards from
 * assets/tour/shots.js, joined by connector lines. On top of that it adds what
 * video needs: a camera that pushes in on each callout, entrances timed on the
 * frame's GSAP timeline, a mail window for the app's real emails, and helpers
 * to hide or animate parts of a screenshot.
 *
 * Load after GSAP and retro-kit.js:
 *   <script src="assets/retro-kit.js"></script>
 *   <script src="assets/tour/shots.js"></script>   (only if you use TK.shot)
 *   <script src="assets/tour-kit.js"></script>
 *
 * Coordinates:
 *   frame px — the 1920×1080 video frame.
 *   page px  — the app's own CSS pixels inside a window (a screenshot is 1440×900).
 *   A window is placed at (x, y) in frame px with scale s = width / 1440, so page
 *   px × s = frame px at camera rest. Callout boxes, card positions, covers,
 *   crops and the page cursor layer all use page px.
 *
 * Build asynchronously: callout cards are measured, so wait for fonts and images.
 *   TK.ready(root).then(() => { …build…; window.__timelines[id] = tl; });
 * Everything the kit animates goes on the timeline you pass in (seek-safe:
 * fromTo tweens only, no CSS transitions, no randomness). Chained moves on one
 * element (camera, scroll, dims) use immediateRender:false so a later tween's
 * start state never paints over the frame's opening state at build time — do
 * the same for your own second-and-later fromTo on any element.
 */
(function () {
  if (window.TK) return;

  var PAGE_W = 1440;
  var PAGE_H = 900;
  var BAR_H = 46;
  // shots.js stores card positions on the landing images' 1500×1000 canvas, where the
  // screenshot starts at (131, 183) and is 1238px wide. Convert to page px.
  var CANVAS_K = 1238 / 1440;
  var CANVAS_LEFT = 131;
  var CANVAS_TOP = 183;

  var COLORS = { violet: "#7C3AED", magenta: "#E8318F", orange: "#EA6A2C", pass: "#0F9D6B" };

  var CSS = [
    // Headline band (frame px, fixed above the camera)
    ".tk-headband{position:absolute;left:0;top:0;width:1920px;height:250px;pointer-events:none;background:linear-gradient(180deg,#FAF8FF 0%,#FAF8FF 58%,rgba(250,248,255,0) 100%);}",
    ".tk-head{position:absolute;left:120px;top:58px;}",
    ".tk-eyebrow{font:600 20px/1 'GeistMono',monospace;letter-spacing:.2em;text-transform:uppercase;color:#7C3AED;white-space:nowrap;}",
    ".tk-eyebrow b{color:#564B70;font-weight:600;}",
    ".tk-title{margin-top:16px;font:500 58px/1.02 'GeistPixelSquare',sans-serif;color:#1D1433;white-space:nowrap;letter-spacing:-.005em;}",
    ".tk-steps{position:absolute;right:120px;top:60px;display:flex;align-items:center;gap:10px;}",
    ".tk-step{display:flex;align-items:center;gap:8px;height:38px;padding:0 16px;border-radius:999px;font:600 15px/1 'GeistMono',monospace;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;color:#8A80A3;border:1.5px solid rgba(46,22,88,.12);background:#fff;}",
    ".tk-step--done{color:#7C3AED;background:#EDE5FF;border-color:transparent;}",
    ".tk-step--now{color:#fff;background:#7C3AED;border-color:#7C3AED;box-shadow:0 10px 24px -10px rgba(124,58,237,.7);}",
    ".tk-step i{display:block;width:8px;height:8px;background:currentColor;}",
    ".tk-step svg{display:block;}",
    ".tk-step-sep{width:14px;height:3px;background:rgba(46,22,88,.16);}",

    // Camera + window (frame px outside, page px inside)
    ".tk-cam{position:absolute;left:0;top:0;width:1920px;height:1080px;}",
    ".tk-enter{position:absolute;left:0;top:0;width:1920px;height:1080px;}",
    ".tk-place{position:absolute;transform-origin:0 0;}",
    ".tk-window{position:absolute;left:0;top:0;background:#fff;border-radius:18px;overflow:hidden;border:1px solid rgba(26,21,48,.12);box-shadow:0 60px 110px -46px rgba(46,22,110,.5),0 22px 44px -22px rgba(46,22,110,.28);}",
    ".tk-bar{position:relative;height:" + BAR_H + "px;display:flex;align-items:center;padding:0 18px;background:#FBFAFF;border-bottom:1px solid #ECE8F4;}",
    ".tk-dots{display:flex;gap:9px;}",
    ".tk-dots i{display:block;width:13px;height:13px;border-radius:50%;background:#E3DEEE;}",
    ".tk-url{position:absolute;left:50%;top:9px;margin-left:-280px;width:560px;height:28px;display:flex;align-items:center;justify-content:center;gap:9px;border-radius:9px;background:#F1EEF8;font:400 15px/1 'GeistSans',sans-serif;color:#6E6888;white-space:nowrap;}",
    ".tk-url b{color:#1A1530;font-weight:500;}",
    ".tk-page{position:relative;overflow:hidden;background:#F9F9FB;}",
    ".tk-page > img.tk-shot{display:block;width:" + PAGE_W + "px;height:" + PAGE_H + "px;}",
    ".tk-slot{position:absolute;left:0;top:0;width:" + PAGE_W + "px;height:" + PAGE_H + "px;}",
    ".tk-fx{position:absolute;left:0;top:0;width:" + PAGE_W + "px;height:" + PAGE_H + "px;pointer-events:none;}",
    ".tk-layer{position:absolute;left:1px;width:" + PAGE_W + "px;height:" + PAGE_H + "px;pointer-events:none;}",
    ".tk-links{position:absolute;left:0;top:0;width:" + PAGE_W + "px;height:" + PAGE_H + "px;overflow:visible;}",

    // Callouts (page px; sizes = the landing images' ÷ 0.8597)
    ".tk-ring{position:absolute;border:3px solid var(--tk-accent);border-radius:14px;box-shadow:0 0 0 6px color-mix(in srgb,var(--tk-accent) 16%,transparent),0 12px 32px -9px color-mix(in srgb,var(--tk-accent) 45%,transparent);}",
    ".tk-card{position:absolute;width:340px;display:flex;gap:14px;align-items:flex-start;padding:17px 20px 19px 17px;border-radius:16px;background:#1A1530;color:#fff;border:1px solid rgba(255,255,255,.08);box-shadow:0 28px 56px -21px rgba(26,21,48,.6),0 7px 16px -7px rgba(26,21,48,.35);}",
    ".tk-card h3{font:600 20px/1.2 'GeistSans',sans-serif;letter-spacing:-.005em;margin:2px 0 6px;}",
    ".tk-card p{font:400 17px/1.38 'GeistSans',sans-serif;color:#C8C1DC;}",
    ".tk-num{display:grid;place-items:center;flex:none;width:30px;height:30px;border-radius:8px;background:var(--tk-accent);color:#fff;font:500 17px/1 'GeistPixelSquare',sans-serif;box-shadow:inset 0 -3px 0 rgba(0,0,0,.22);}",

    // Mail window
    ".tk-mailhead{padding:22px 30px 18px;border-bottom:1px solid #ECE8F4;background:#fff;font:400 18px/1.35 'GeistSans',sans-serif;color:#564B70;}",
    ".tk-mailhead .tk-subj{font:600 26px/1.2 'GeistSans',sans-serif;color:#1D1433;margin-bottom:12px;}",
    ".tk-mailhead .tk-from{display:flex;align-items:center;gap:12px;}",
    ".tk-mailhead .tk-av{width:38px;height:38px;border-radius:10px;background:#7C3AED;color:#fff;display:grid;place-items:center;font:500 15px/1 'GeistPixelSquare',sans-serif;}",
    ".tk-mailhead b{color:#1D1433;font-weight:600;}",
    ".tk-mailbody{position:relative;overflow:hidden;background:#F7F7F9;}",
    ".tk-mailbody img{position:absolute;left:50%;top:26px;display:block;}",
  ].join("\n");

  function injectCss() {
    if (document.getElementById("tk-css")) return;
    var s = document.createElement("style");
    s.id = "tk-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
  injectCss();

  function el(tag, cls, parent) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (parent) parent.appendChild(e);
    return e;
  }

  var LOCK =
    '<svg width="13" height="13" viewBox="0 0 12 12" fill="none"><rect x="2" y="5.2" width="8" height="5.6" rx="1.4" fill="#8f89a6"/><path d="M4 5.2V3.8a2 2 0 0 1 4 0v1.4" stroke="#8f89a6" stroke-width="1.3"/></svg>';

  // ── Headline band ─────────────────────────────────────────────────────────
  var CHAPTERS = ["Setup", "The agent", "Judging", "Results"];

  /**
   * The tour's headline band: eyebrow + pixel title top-left, chapter stepper
   * top-right, over a paper fade the camera slides under.
   *   TK.header(stage, {eyebrow: "Setup <b>›</b> Schema", title: "Shape every submission.", chapter: 0})
   * chapter: index into Setup / The agent / Judging / Results, or -1 for none.
   */
  function header(parent, o) {
    var band = el("div", "tk-headband", parent);
    var head = el("div", "tk-head", parent);
    var eyebrow = el("div", "tk-eyebrow", head);
    eyebrow.innerHTML = o.eyebrow || "";
    var title = el("div", "tk-title", head);
    title.textContent = o.title || "";
    // The camera slides app content under the headline band on purpose; mark the
    // band's text blocks as deliberate layering for the layout audit (not inherited).
    [eyebrow, title].forEach(function (e) { e.setAttribute("data-layout-allow-overlap", ""); });
    var steps = null;
    var items = [];
    if (o.chapter != null && o.chapter >= 0) {
      steps = el("div", "tk-steps", parent);
      CHAPTERS.forEach(function (name, i) {
        if (i > 0) el("span", "tk-step-sep", steps);
        var cls = i < o.chapter ? "tk-step tk-step--done" : i === o.chapter ? "tk-step tk-step--now" : "tk-step";
        var s = el("span", cls, steps);
        var mark = i < o.chapter && window.RK ? RK.icon("check", 12) : "<i></i>";
        s.innerHTML = mark + "<span data-layout-allow-overlap>" + name + "</span>";
        items.push(s);
      });
    }
    return { band: band, head: head, eyebrow: eyebrow, title: title, steps: steps, items: items };
  }

  /** Header entrance: eyebrow, title and stepper rise in (clean, power3.out). */
  function showHeader(tl, h, t) {
    t = t || 0;
    tl.fromTo(h.eyebrow, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, t);
    tl.fromTo(h.title, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, t + 0.1);
    if (h.steps) tl.fromTo(h.steps, { y: -14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, t + 0.15);
  }

  /** Swap the title text in place (velocity-matched lift/rise). */
  function swapTitle(tl, h, t, text) {
    var clone = h.title.cloneNode(false);
    clone.textContent = text;
    clone.style.position = "absolute";
    clone.style.left = "0";
    clone.style.top = h.title.offsetTop + "px";
    clone.style.marginTop = "0";
    h.head.appendChild(clone);
    tl.fromTo(h.title, { y: 0, opacity: 1 }, { y: -24, opacity: 0, duration: 0.25, ease: "power2.in", immediateRender: false }, t);
    tl.fromTo(clone, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" }, t + 0.1);
    return clone;
  }

  // ── Windows ───────────────────────────────────────────────────────────────
  /**
   * A browser window in its own camera rig.
   *   var w = TK.window(stage, {url: "roundone.dev/h/agent-hacks-2026/setup/schema",
   *                             src: "assets/tour/raw/schema.png"});
   * Options: x (240), y (196), width (1440 → scale 1), src (a 1440×900 2× screenshot)
   * or html (markup for a rebuilt page, laid out at 1440×900 page px), pageHeight (900).
   * Returns { cam, enter, place, win, page, slot, fx, layer, links, scale, x, y, pageTop }.
   *   slot  — where rebuilt markup goes (page px, clipped by the window)
   *   fx    — above the screenshot, clipped: covers, crops, overlays
   *   layer — above the window, unclipped: callouts, the page cursor, click rings
   */
  function makeWindow(parent, o) {
    var x = o.x != null ? o.x : 240;
    var y = o.y != null ? o.y : 196;
    var width = o.width || PAGE_W;
    var s = width / PAGE_W;
    var pageH = o.pageHeight || PAGE_H;

    var cam = el("div", "tk-cam", parent);
    var enter = el("div", "tk-enter", cam);
    var place = el("div", "tk-place", enter);
    place.style.left = x + "px";
    place.style.top = y + "px";
    place.style.transform = "scale(" + s + ")";
    var win = el("div", "tk-window", place);
    win.style.width = PAGE_W + 2 + "px";
    var bar = el("div", "tk-bar", win);
    bar.innerHTML = '<div class="tk-dots"><i></i><i></i><i></i></div>';
    var url = el("div", "tk-url", bar);
    var parts = (o.url || "roundone.dev").split("/");
    url.innerHTML = LOCK + "<span><b>" + parts[0] + "</b>" + (parts.length > 1 ? "/" + parts.slice(1).join("/") : "") + "</span>";
    var page = el("div", "tk-page", win);
    page.style.width = PAGE_W + "px";
    page.style.height = pageH + "px";
    var img = null;
    if (o.src) {
      img = el("img", "tk-shot", page);
      img.src = o.src;
      img.alt = "";
    }
    var slot = el("div", "tk-slot", page);
    slot.style.height = pageH + "px";
    if (o.html) slot.innerHTML = o.html;
    var fx = el("div", "tk-fx", page);
    fx.style.height = pageH + "px";
    var layer = el("div", "tk-layer", place);
    layer.style.top = BAR_H + 1 + "px";
    layer.style.height = pageH + "px";
    var links = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    links.setAttribute("class", "tk-links");
    layer.appendChild(links);

    gsap.set(cam, { x: 0, y: 0, scale: 1, transformOrigin: "0 0" });
    var w = {
      cam: cam, enter: enter, place: place, win: win, bar: bar, url: url, page: page, img: img,
      slot: slot, fx: fx, layer: layer, links: links, scale: s, x: x, y: y, pageTop: BAR_H + 1,
      camState: { x: 0, y: 0, scale: 1 }, callouts: [],
    };
    return w;
  }

  /** Page px → frame px at camera rest. rect: {x, y, w, h} or [x, y, w, h]. */
  function toFrame(w, r) {
    if (Array.isArray(r)) r = { x: r[0], y: r[1], w: r[2], h: r[3] };
    return {
      x: w.x + w.scale * (r.x + 1),
      y: w.y + w.scale * (r.y + w.pageTop),
      w: r.w * w.scale,
      h: r.h * w.scale,
    };
  }

  /** Window entrance: rises 44px and fades in (power3.out). */
  function showWindow(tl, w, t, o) {
    o = o || {};
    tl.fromTo(w.enter, { y: o.from != null ? o.from : 44, opacity: 0 }, { y: 0, opacity: 1, duration: o.dur || 0.7, ease: "power3.out" }, t || 0);
  }

  // ── Callouts ──────────────────────────────────────────────────────────────
  /**
   * Build callouts from shots.js entries (box in page px; card on the landing canvas).
   *   TK.callouts(w, TOUR_SHOTS.schema.callouts)            // all, numbered 1…n
   *   TK.callouts(w, list, {only: [0, 2], renumber: true})
   * A callout may also carry `cardAt: [x, y]` in page px to override the canvas position.
   * Returns [{ring, card, line, dot, box, cardRect, rect}] — rect = ring ∪ card, page px.
   * Must run after TK.ready (cards are measured).
   */
  function callouts(w, list, o) {
    o = o || {};
    var out = [];
    var pick = o.only || list.map(function (_, i) { return i; });
    pick.forEach(function (idx, n) {
      var c = list[idx];
      var accent = COLORS[c.color || "violet"] || c.color || COLORS.violet;
      var b = { x: c.box[0], y: c.box[1], w: c.box[2], h: c.box[3] };
      var ring = el("div", "tk-ring", w.layer);
      ring.style.setProperty("--tk-accent", accent);
      ring.style.left = b.x + "px";
      ring.style.top = b.y + "px";
      ring.style.width = b.w + "px";
      ring.style.height = b.h + "px";
      if (c.radius != null) ring.style.borderRadius = c.radius / CANVAS_K + "px";

      var card = el("div", "tk-card", w.layer);
      card.style.setProperty("--tk-accent", accent);
      if (c.width) card.style.width = c.width / CANVAS_K + "px";
      var num = o.renumber === false ? idx + 1 : n + 1;
      card.innerHTML = '<span class="tk-num">' + (o.numbers ? o.numbers[n] : num) + "</span><div><h3>" + c.title + "</h3><p>" + c.body + "</p></div>";
      var cx = c.cardAt ? c.cardAt[0] : (c.card[0] - CANVAS_LEFT) / CANVAS_K;
      var cy = c.cardAt ? c.cardAt[1] : (c.card[1] - CANVAS_TOP) / CANVAS_K;
      card.style.left = cx + "px";
      card.style.top = cy + "px";
      var k = { x: cx, y: cy, w: card.offsetWidth, h: card.offsetHeight };

      // Connector: card edge → ring edge (or the ring point `to` names), unless they touch.
      var kc = { x: k.x + k.w / 2, y: k.y + k.h / 2 };
      var rc = { x: b.x + b.w / 2, y: b.y + b.h / 2 };
      var from = edgePoint(k, rc);
      var to = c.to ? { x: b.x + c.to[0] * b.w, y: b.y + c.to[1] * b.h } : edgePoint(b, kc);
      var line = null;
      var dot = null;
      if (Math.hypot(to.x - from.x, to.y - from.y) > 16) {
        line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", from.x);
        line.setAttribute("y1", from.y);
        line.setAttribute("x2", to.x);
        line.setAttribute("y2", to.y);
        line.setAttribute("stroke", accent);
        line.setAttribute("stroke-width", "3");
        line.setAttribute("stroke-linecap", "round");
        var len = Math.hypot(to.x - from.x, to.y - from.y);
        line.setAttribute("stroke-dasharray", len + " " + len);
        line.__len = len;
        dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot.setAttribute("cx", to.x);
        dot.setAttribute("cy", to.y);
        dot.setAttribute("r", "6.5");
        dot.setAttribute("fill", accent);
        dot.setAttribute("stroke", "#fff");
        dot.setAttribute("stroke-width", "3");
        w.links.appendChild(line);
        w.links.appendChild(dot);
      }
      var x0 = Math.min(b.x, k.x);
      var y0 = Math.min(b.y, k.y);
      var x1 = Math.max(b.x + b.w, k.x + k.w);
      var y1 = Math.max(b.y + b.h, k.y + k.h);
      // Hidden until shown.
      gsap.set([ring, card], { opacity: 0 });
      // Hidden outright too: a round cap on a fully offset dash still paints a dot.
      if (line) gsap.set(line, { attr: { "stroke-dashoffset": line.__len }, opacity: 0 });
      if (dot) gsap.set(dot, { opacity: 0 });
      var co = { ring: ring, card: card, line: line, dot: dot, box: b, cardRect: k, rect: { x: x0, y: y0, w: x1 - x0, h: y1 - y0 } };
      out.push(co);
      w.callouts.push(co);
    });
    return out;
  }

  function edgePoint(rect, p) {
    var cx = rect.x + rect.w / 2;
    var cy = rect.y + rect.h / 2;
    var dx = p.x - cx;
    var dy = p.y - cy;
    if (!dx && !dy) return { x: cx, y: cy };
    var t = Math.min(Math.abs(rect.w / 2 / dx) || Infinity, Math.abs(rect.h / 2 / dy) || Infinity);
    return { x: cx + dx * t, y: cy + dy * t };
  }

  /**
   * Show one callout at t: the ring snaps in (stepped), the connector draws, the
   * dot and the card pop. ~0.7s end to end. Pass {ringOnly: true} to skip the card.
   */
  function showCallout(tl, co, t, o) {
    o = o || {};
    tl.fromTo(co.ring, { opacity: 0, scale: 1.12 }, { opacity: 1, scale: 1, duration: 0.24, ease: "steps(3)", transformOrigin: "50% 50%" }, t);
    co.ringOnly = !!o.ringOnly;
    if (o.ringOnly) return;
    if (co.line) {
      tl.fromTo(co.line, { opacity: 0 }, { opacity: 1, duration: 0.01, immediateRender: false }, t + 0.16);
      tl.fromTo(co.line, { attr: { "stroke-dashoffset": co.line.__len } }, { attr: { "stroke-dashoffset": 0 }, duration: 0.3, ease: "power2.out" }, t + 0.16);
      tl.fromTo(co.dot, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.18, ease: "steps(3)", transformOrigin: "50% 50%" }, t + 0.16);
    }
    tl.fromTo(co.card, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1.1, duration: 0.12, ease: "steps(2)", transformOrigin: "50% 50%" }, t + 0.36);
    tl.fromTo(co.card, { scale: 1.1 }, { scale: 1, duration: 0.12, ease: "steps(2)", immediateRender: false }, t + 0.48);
  }

  /** Fade a shown callout back (to make room for the next one). */
  function dimCallout(tl, co, t, to) {
    var a = to == null ? 0 : to;
    // Only what showCallout actually showed: a ring-only highlight's card and connector stay hidden.
    tl.fromTo(co.ringOnly ? [co.ring] : [co.ring, co.card], { opacity: 1 }, { opacity: a, duration: 0.3, ease: "power2.out", immediateRender: false }, t);
    if (co.line && !co.ringOnly) tl.fromTo([co.line, co.dot], { opacity: 1 }, { opacity: a, duration: 0.3, ease: "power2.out", immediateRender: false }, t);
  }

  // ── Camera ────────────────────────────────────────────────────────────────
  var VIEW = { x: 90, y: 200, w: 1740, h: 860 };

  /**
   * Move the camera so a page-px rect fills the view (below the headline band).
   *   TK.focus(tl, w, t, co.rect)                          // push in on a callout
   *   TK.focus(tl, w, t, [0, 0, 1440, 900], {scale: 1})   // back out
   * Options: pad (40 page px), max (1.7), min (1), scale (forces a zoom), dur (0.9),
   * ease ("power3.inOut"), view ({x, y, w, h} in frame px), anchor ([ax, ay] 0…1 in the view).
   */
  function focus(tl, w, t, rect, o) {
    o = o || {};
    if (Array.isArray(rect)) rect = { x: rect[0], y: rect[1], w: rect[2], h: rect[3] };
    var pad = o.pad != null ? o.pad : 40;
    var view = o.view || VIEW;
    var r = toFrame(w, { x: rect.x - pad, y: rect.y - pad, w: rect.w + pad * 2, h: rect.h + pad * 2 });
    var S = o.scale != null ? o.scale : Math.min(view.w / r.w, view.h / r.h);
    S = Math.max(o.min != null ? o.min : 1, Math.min(o.max != null ? o.max : 1.7, S));
    var ax = o.anchor ? o.anchor[0] : 0.5;
    var ay = o.anchor ? o.anchor[1] : 0.5;
    var vx = view.x + view.w * ax;
    var vy = view.y + view.h * ay;
    var cx = r.x + r.w / 2;
    var cy = r.y + r.h / 2;
    var next = { x: vx - S * cx, y: vy - S * cy, scale: S };
    if (o.clamp !== false && S <= 1.0001 && o.scale == null) next = { x: 0, y: 0, scale: 1 };
    var prev = w.camState;
    tl.fromTo(w.cam, { x: prev.x, y: prev.y, scale: prev.scale }, { x: next.x, y: next.y, scale: next.scale, duration: o.dur || 0.9, ease: o.ease || "power3.inOut", immediateRender: false }, t);
    w.camState = next;
    return next;
  }

  /**
   * Pull back to frame every callout shown so far (or `rects`) inside the safe
   * area — below the headline band, above the y=900 keep-out — zooming out below
   * 1× when they need it. Use it for a frame's closing hold instead of TK.rest
   * when callouts sit low on the page.
   */
  function overview(tl, w, t, o) {
    o = o || {};
    var rs = o.rects || w.callouts.map(function (c) { return c.rect; });
    if (!rs.length) return rest(tl, w, t, o);
    var x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    rs.forEach(function (r) {
      if (Array.isArray(r)) r = { x: r[0], y: r[1], w: r[2], h: r[3] };
      x0 = Math.min(x0, r.x); y0 = Math.min(y0, r.y);
      x1 = Math.max(x1, r.x + r.w); y1 = Math.max(y1, r.y + r.h);
    });
    return focus(tl, w, t, { x: x0, y: y0, w: x1 - x0, h: y1 - y0 }, {
      pad: o.pad != null ? o.pad : 30,
      min: o.min != null ? o.min : 0.6,
      max: o.max != null ? o.max : 1.3,
      view: o.view || { x: 90, y: 236, w: 1740, h: 656 },
      clamp: false,
      dur: o.dur,
      ease: o.ease,
    });
  }

  /** Camera back to rest (the whole window at its placed size). */
  function rest(tl, w, t, o) {
    o = o || {};
    var prev = w.camState;
    var next = { x: 0, y: 0, scale: 1 };
    tl.fromTo(w.cam, { x: prev.x, y: prev.y, scale: prev.scale }, { x: 0, y: 0, scale: 1, duration: o.dur || 0.9, ease: o.ease || "power3.inOut", immediateRender: false }, t);
    w.camState = next;
  }

  // ── Screenshot helpers ────────────────────────────────────────────────────
  /** A flat patch over part of the screenshot (page px), e.g. to hide a button. */
  function cover(w, rect, color) {
    if (Array.isArray(rect)) rect = { x: rect[0], y: rect[1], w: rect[2], h: rect[3] };
    var d = el("div", null, w.fx);
    d.style.cssText = "position:absolute;left:" + rect.x + "px;top:" + rect.y + "px;width:" + rect.w + "px;height:" + rect.h + "px;background:" + (color || "#fff") + ";";
    return d;
  }

  /**
   * A copy of part of the screenshot, pixel-aligned over the same spot, that you
   * can animate on its own (reveal with clip-path, move, fade). Pair with cover().
   */
  function crop(w, rect, src) {
    if (Array.isArray(rect)) rect = { x: rect[0], y: rect[1], w: rect[2], h: rect[3] };
    var d = el("div", null, w.fx);
    d.style.cssText =
      "position:absolute;left:" + rect.x + "px;top:" + rect.y + "px;width:" + rect.w + "px;height:" + rect.h + "px;" +
      "background-image:url('" + (src || w.img.getAttribute("src")) + "');background-size:" + PAGE_W + "px " + PAGE_H + "px;" +
      "background-position:" + -rect.x + "px " + -rect.y + "px;background-repeat:no-repeat;";
    return d;
  }

  // ── Mail window ───────────────────────────────────────────────────────────
  /**
   * A mail client window holding one of the app's real emails (assets/tour/email-*.png,
   * rendered from src/emails at 680px wide, 2×).
   *   var m = TK.mail(stage, {subject: "Day 2 is open", from: "RoundOne", fromEmail: "judging@roundone.dev",
   *                           to: "Marcus", src: "assets/tour/email-judge-batch.png", emailHeight: 520});
   * Options: x (330), y (196), width (1260), height (930 → the window runs off the frame bottom),
   * emailWidth (680 css), zoom (1.25: the email's display scale), emailHeight (css px of the image).
   * Returns the window object plus {mail, head, body, email}. Scroll the email with TK.scroll.
   */
  function mail(parent, o) {
    var x = o.x != null ? o.x : 330;
    var y = o.y != null ? o.y : 196;
    var width = o.width || 1260;
    var height = o.height || 930;
    var cam = el("div", "tk-cam", parent);
    var enter = el("div", "tk-enter", cam);
    var place = el("div", "tk-place", enter);
    place.style.left = x + "px";
    place.style.top = y + "px";
    var win = el("div", "tk-window", place);
    win.style.width = width + "px";
    var bar = el("div", "tk-bar", win);
    bar.innerHTML = '<div class="tk-dots"><i></i><i></i><i></i></div>';
    var url = el("div", "tk-url", bar);
    url.innerHTML = "<span><b>Inbox</b> · " + (o.to || "you") + "</span>";
    var head = el("div", "tk-mailhead", win);
    head.innerHTML =
      '<div class="tk-subj">' + (o.subject || "") + "</div>" +
      '<div class="tk-from"><span class="tk-av">R1</span><span><b>' + (o.from || "RoundOne") + "</b> &lt;" + (o.fromEmail || "hello@roundone.dev") + "&gt;<br>to " + (o.to || "you") + "</span></div>";
    var body = el("div", "tk-mailbody", win);
    var headH = 132;
    body.style.height = height - BAR_H - headH + "px";
    var zoom = o.zoom || 1.25;
    var emailW = (o.emailWidth || 680) * zoom;
    var email = el("img", null, body);
    email.src = o.src;
    email.alt = "";
    email.style.width = emailW + "px";
    email.style.marginLeft = -emailW / 2 + "px";
    if (o.emailHeight) email.style.height = o.emailHeight * zoom + "px";
    var layer = el("div", "tk-layer", place);
    layer.style.left = "0";
    layer.style.top = "0";
    layer.style.width = width + "px";
    layer.style.height = height + "px";
    // Connector layer, so TK.callouts works on a mail window too.
    var links = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    links.setAttribute("class", "tk-links");
    layer.appendChild(links);
    gsap.set(cam, { x: 0, y: 0, scale: 1, transformOrigin: "0 0" });
    gsap.set(email, { y: 0 });
    return {
      cam: cam, enter: enter, place: place, win: win, bar: bar, url: url, head: head, body: body, email: email,
      layer: layer, links: links, scale: 1, x: x, y: y, pageTop: 0, zoom: zoom, emailWidth: emailW,
      camState: { x: 0, y: 0, scale: 1 }, scrollY: 0, callouts: [],
      // Where the email's own px land inside the window (for focus()/callouts on the mail).
      emailLeft: width / 2 - emailW / 2, emailTop: BAR_H + 1 + headH + 26,
    };
  }

  /** Scroll a mail window's email (or any element) to a y offset in email css px × zoom. */
  function scroll(tl, m, t, toY, o) {
    o = o || {};
    var from = m.scrollY;
    tl.fromTo(m.email, { y: -from }, { y: -toY, duration: o.dur || 1.2, ease: o.ease || "power3.inOut", immediateRender: false }, t);
    m.scrollY = toY;
  }

  /**
   * Wait for fonts and every <img> under root to decode, then build.
   *   TK.ready(root).then(function () { … });
   */
  function ready(root) {
    var imgs = Array.prototype.slice.call((root || document).querySelectorAll("img"));
    var waits = imgs.map(function (img) {
      if (img.decode) return img.decode().catch(function () {});
      return Promise.resolve();
    });
    waits.push(document.fonts ? document.fonts.ready : Promise.resolve());
    return Promise.all(waits);
  }

  /** The shots.js entry for an id, with its window options and callouts. */
  function shot(id) {
    var list = window.TOUR_SHOTS || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    throw new Error("TK.shot: no shot " + id);
  }

  window.TK = {
    PAGE_W: PAGE_W, PAGE_H: PAGE_H, BAR_H: BAR_H, COLORS: COLORS, CHAPTERS: CHAPTERS, VIEW: VIEW,
    header: header, showHeader: showHeader, swapTitle: swapTitle,
    window: makeWindow, showWindow: showWindow, toFrame: toFrame,
    callouts: callouts, showCallout: showCallout, dimCallout: dimCallout,
    focus: focus, rest: rest, overview: overview,
    cover: cover, crop: crop,
    mail: mail, scroll: scroll,
    ready: ready, shot: shot,
  };
})();
