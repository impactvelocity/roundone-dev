/*
 * RoundOne retro kit — shared by every frame of the launch film.
 *
 * Injects the rk-* component CSS once and exposes window.RK: pixel icons, a
 * pixel cursor with stepped click ripples, segmented meters, count-ups, typing,
 * pixel fields, the app's pixel funnel, Bayer dither wipes and pixel confetti.
 *
 * Everything is deterministic and seek-safe: time-based helpers hang off one
 * linear "clock" tween per frame (RK.clock) and draw a pure function of t.
 * Built from assets/retro-kit.src.js by build-kit.mjs (it inlines the icons).
 */
(function () {
  if (window.RK && window.RK.__v === 1) return;

  // Pixel Icon Library by HackerNoon (CC BY 4.0), the set src/components/pixel-icon.tsx ships.
  var ICONS = /*__ICONS__*/ {};

  var BAYER = [
    [0, 8, 2, 10],
    [12, 4, 14, 6],
    [3, 11, 1, 9],
    [15, 7, 13, 5],
  ];

  var CSS = [
    '.rk-display{font-family:"GeistPixelSquare","GeistSans",sans-serif;font-weight:500;}',
    '.rk-sans{font-family:"GeistSans",sans-serif;}',
    '.rk-mono{font-family:"GeistMono",monospace;}',
    ".rk-sunset-text{background:linear-gradient(180deg,#FCD34D 0%,#FB923C 38%,#F43F5E 70%,#E11D8F 100%);-webkit-background-clip:text;background-clip:text;color:transparent;}",
    ".rk-dusk-text{background:linear-gradient(95deg,#7C3AED 0%,#D946EF 45%,#FB7A3C 100%);-webkit-background-clip:text;background-clip:text;color:transparent;}",
    '.rk-eyebrow{font-family:"GeistMono",monospace;font-size:20px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#7C3AED;}',
    ".rk-eyebrow--dark{color:#F0ABFC;}",
    ".rk-mock{background:#FFFFFF;border:1px solid rgba(46,22,88,.1);border-radius:28px;box-shadow:0 2px 4px rgba(46,22,88,.05),0 32px 86px -32px rgba(76,29,149,.28);}",
    '.rk-tag{display:inline-flex;align-items:center;gap:7px;border-radius:999px;padding:7px 15px;font-family:"GeistSans",sans-serif;font-size:19px;font-weight:600;line-height:1;white-space:nowrap;}',
    ".rk-tag svg{width:14px;height:14px;flex:none;display:block;}",
    ".rk-tag--pass{background:#DCF7EC;color:#0C7D55;}",
    ".rk-tag--gate{background:#FFEDD5;color:#C2410C;}",
    ".rk-tag--agent{background:#EDE5FF;color:#7C3AED;}",
    ".rk-tag--human{border:1.5px dashed rgba(46,22,88,.24);color:#564B70;padding:5.5px 13.5px;}",
    ".rk-tag--flag{background:#FFE4F1;color:#E8318F;}",
    ".rk-tag--neutral{background:rgba(109,40,217,.09);color:#564B70;}",
    ".rk-meter{display:flex;gap:5px;height:11px;}",
    ".rk-meter i{display:block;flex:1 1 0;height:100%;border-radius:3px;background:rgba(109,40,217,.09);}",
    ".rk-meter i.on{background:var(--rk-seg,#7C3AED);}",
    '.rk-face{display:grid;place-items:center;border-radius:50%;color:#FFFFFF;font-family:"GeistSans",sans-serif;font-weight:600;box-shadow:0 0 0 3px #FFFFFF;flex:none;}',
    ".rk-face--0{background:linear-gradient(135deg,#A78BFA,#7C3AED);}",
    ".rk-face--1{background:linear-gradient(135deg,#F9A8D4,#E8318F);}",
    ".rk-face--2{background:linear-gradient(135deg,#FDBA74,#FB7A3C);}",
    '.rk-mark{display:grid;place-items:center;border-radius:18px;background:linear-gradient(95deg,#7C3AED 0%,#D946EF 45%,#FB7A3C 100%);color:#FFFFFF;font-family:"GeistSans",sans-serif;font-weight:700;flex:none;}',
    ".rk-tile{display:grid;place-items:center;width:56px;height:56px;border-radius:14px;background:#EDE5FF;color:#7C3AED;flex:none;}",
    ".rk-tile--human{background:transparent;border:1.5px dashed rgba(46,22,88,.24);color:#564B70;}",
    ".rk-row{display:flex;align-items:center;gap:18px;padding:16px 28px;border-top:1px solid rgba(46,22,88,.1);}",
    '.rk-pill{display:inline-flex;align-items:center;justify-content:center;gap:12px;padding:18px 34px;border-radius:999px;font-family:"GeistSans",sans-serif;font-size:26px;font-weight:600;line-height:1;white-space:nowrap;border:1px solid transparent;}',
    ".rk-pill--sun{background:linear-gradient(100deg,#FBBF24 0%,#FB7A3C 45%,#E8318F 100%);color:#1D0B24;box-shadow:0 2px 4px rgba(29,11,36,.2),0 14px 40px rgba(232,49,143,.4);}",
    ".rk-pill--dark{background:#150C2E;color:#F7F2FF;box-shadow:0 2px 4px rgba(21,12,46,.2);}",
    ".rk-pill--ghost{background:#FFFFFF;border-color:rgba(46,22,88,.12);color:#1D1433;box-shadow:0 2px 4px rgba(46,22,88,.06);}",
    ".rk-pill--glass{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.28);color:#F7F2FF;}",
    '.rk-glass{display:inline-flex;align-items:center;gap:12px;padding:12px 26px;border-radius:999px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.22);color:#FFFFFF;font-family:"GeistSans",sans-serif;font-size:24px;font-weight:500;line-height:1.1;white-space:nowrap;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);}',
    ".rk-arcade{--edge:#1D0B2E;--depth:#8B1D5C;--lift:12px;--glow:rgba(232,49,143,.38);position:relative;display:inline-flex;align-items:center;justify-content:center;gap:14px;margin:5px 5px 14px;padding:26px 40px 24px;" +
      'font-family:"GeistPixelSquare","GeistSans",sans-serif;font-size:32px;font-weight:500;letter-spacing:.02em;line-height:1;color:#22091F;white-space:nowrap;' +
      "background:repeating-linear-gradient(to bottom,transparent 0 9px,rgba(255,255,255,.24) 9px 12px),linear-gradient(180deg,#FDE047 0%,#FB923C 42%,#F43F5E 80%,#E11D8F 100%);" +
      "box-shadow:0 -5px 0 0 var(--edge),0 5px 0 0 var(--edge),-5px 0 0 0 var(--edge),5px 0 0 0 var(--edge),0 var(--lift) 0 0 var(--depth),inset 0 5px 0 0 rgba(255,255,255,.45),inset 0 -5px 0 0 rgba(122,22,80,.3),0 calc(var(--lift) + 16px) 40px -12px var(--glow);}",
    ".rk-arcade--light{--depth:#B9A4F5;--glow:rgba(76,29,149,.2);color:#1D1433;background:repeating-linear-gradient(to bottom,transparent 0 9px,rgba(124,58,237,.07) 9px 12px),#FFFFFF;}",
    ".rk-arcade--night{--depth:#7C3AED;--glow:rgba(76,29,149,.3);color:#F7F2FF;background:repeating-linear-gradient(to bottom,transparent 0 9px,rgba(255,255,255,.06) 9px 12px),linear-gradient(180deg,#3B1D6E 0%,#150C2E 100%);}",
    ".rk-arcade--sm{--lift:8px;gap:10px;padding:16px 24px 15px;font-size:22px;}",
    ".rk-arcade svg{display:block;}",
    ".rk-night-card{background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.1);border-radius:24px;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);}",
    ".rk-stars{position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(circle at 2px 2px,rgba(255,255,255,.42) 1.6px,transparent 2.3px),radial-gradient(circle at 2px 2px,rgba(251,191,36,.32) 1.6px,transparent 2.3px);background-size:163px 149px,251px 229px;background-position:23px 37px,121px 71px;}",
    ".rk-dotgrid{position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(circle at 1px 1px,rgba(124,58,237,.10) 1.4px,transparent 1.6px);background-size:32px 32px;}",
    ".rk-cursor{position:absolute;left:0;top:0;z-index:60;pointer-events:none;will-change:transform;}",
    ".rk-cursor-inner{transform-origin:0 0;filter:drop-shadow(0 6px 8px rgba(29,20,51,.28));}",
    ".rk-cursor svg,.rk-cursor-inner svg{display:block;}",
    ".rk-ripple{position:absolute;box-sizing:border-box;border:5px solid currentColor;pointer-events:none;opacity:0;will-change:transform,opacity;}",
    ".rk-bit{position:absolute;left:0;top:0;pointer-events:none;opacity:0;will-change:transform,opacity;}",
    ".rk-caret{display:inline-block;width:.52em;height:.9em;background:currentColor;margin-left:.07em;vertical-align:-.06em;}",
    ".rk-icon{display:block;flex:none;}",
  ].join("\n");

  function injectCSS() {
    if (document.getElementById("rk-style")) return;
    var s = document.createElement("style");
    s.id = "rk-style";
    s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }
  injectCSS();

  // ── Deterministic helpers ──────────────────────────────────────────────

  /** Same inputs, same 0–1 value, on every render (the funnel's hash). */
  function noise(a, b, c) {
    var h = Math.imul(a + 1, 374761393) ^ Math.imul(b + 1, 668265263) ^ Math.imul(c + 1, 2147483647);
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  }

  function bayer(x, y) {
    return BAYER[((y % 4) + 4) % 4][((x % 4) + 4) % 4];
  }

  function clamp01(v) {
    return v < 0 ? 0 : v > 1 ? 1 : v;
  }

  var EASES = {
    linear: function (p) {
      return p;
    },
    "power2.out": function (p) {
      return 1 - Math.pow(1 - p, 3);
    },
    "power3.out": function (p) {
      return 1 - Math.pow(1 - p, 4);
    },
    "power2.inOut": function (p) {
      return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    },
    "expo.out": function (p) {
      return p >= 1 ? 1 : 1 - Math.pow(2, -10 * p);
    },
  };

  function easeFn(name) {
    return EASES[name] || EASES["power2.out"];
  }

  // ── Icons ──────────────────────────────────────────────────────────────

  function icon(name, size, extraClass) {
    var s = size || 24;
    var body = ICONS[name];
    if (!body) body = ICONS.dot || "";
    return (
      '<svg class="rk-icon' +
      (extraClass ? " " + extraClass : "") +
      '" width="' +
      s +
      '" height="' +
      s +
      '" viewBox="0 0 24 24" fill="currentColor" shape-rendering="crispEdges" aria-hidden="true">' +
      body +
      "</svg>"
    );
  }

  function hydrate(root) {
    var scope = root || document;
    var els = scope.querySelectorAll("[data-rk-icon]");
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.getAttribute("data-rk-done")) continue;
      var n = el.getAttribute("data-rk-icon");
      var sz = parseFloat(el.getAttribute("data-size")) || 24;
      el.innerHTML = icon(n, sz);
      if (!el.style.display) el.style.display = "inline-flex";
      el.setAttribute("data-rk-done", "1");
    }
  }

  // ── The frame clock: one linear driver, many pure draw functions ───────

  function clock(tl, duration) {
    var fns = [];
    var state = { t: 0 };
    tl.to(
      state,
      {
        t: duration,
        duration: duration,
        ease: "none",
        onUpdate: function () {
          for (var i = 0; i < fns.length; i++) fns[i](state.t);
        },
      },
      0,
    );
    return {
      duration: duration,
      add: function (fn) {
        fns.push(fn);
        fn(0);
        return fn;
      },
    };
  }

  // ── Text ───────────────────────────────────────────────────────────────

  /** Type `text` into `el` with a block caret. Left-align typed text (centered text shifts as it grows). */
  function type(clk, el, text, o) {
    o = o || {};
    var start = o.start || 0;
    var cps = o.cps || 28;
    var showCaret = o.caret !== false;
    var hold = o.caretHold != null ? o.caretHold : 0.6;
    var end = start + text.length / cps;
    el.innerHTML = "";
    var typed = document.createElement("span");
    typed.className = "rk-typed";
    el.appendChild(typed);
    var caret = null;
    if (showCaret) {
      caret = document.createElement("span");
      caret.className = "rk-caret";
      el.appendChild(caret);
    }
    var last = null;
    clk.add(function (t) {
      var n = t < start ? 0 : Math.min(text.length, Math.floor((t - start) * cps + 1e-6));
      var s = text.slice(0, n);
      if (s !== last) {
        typed.textContent = s;
        last = s;
      }
      if (caret) {
        var on = false;
        if (t >= start && t < end) on = true;
        else if (t >= end && t < end + hold) on = Math.floor((t - end) / 0.2) % 2 === 1 ? false : true;
        caret.style.opacity = on ? "1" : "0";
      }
    });
    return { end: end };
  }

  /** Discrete text/html states: [{t, text}] or [{t, html}] — shows the latest whose t has passed. */
  function states(clk, el, list) {
    var last = null;
    clk.add(function (t) {
      var pick = null;
      for (var i = list.length - 1; i >= 0; i--) {
        if (t >= list[i].t) {
          pick = list[i];
          break;
        }
      }
      var key = pick ? (pick.html != null ? "h:" + pick.html : "t:" + pick.text) : "";
      if (key === last) return;
      last = key;
      if (!pick) el.textContent = "";
      else if (pick.html != null) el.innerHTML = pick.html;
      else el.textContent = pick.text;
    });
  }

  function fmt(v, dec) {
    return v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
  }

  /** Count-up. `steps` > 0 quantizes it like an arcade score counter. */
  function count(clk, el, o) {
    var from = o.from || 0;
    var to = o.to;
    var start = o.start || 0;
    var dur = o.dur || 1;
    var dec = o.decimals || 0;
    var steps = o.steps || 0;
    var e = easeFn(o.ease || "power2.out");
    var prefix = o.prefix || "";
    var suffix = o.suffix || "";
    var last = null;
    clk.add(function (t) {
      var p = e(clamp01((t - start) / dur));
      if (steps > 0) p = Math.round(p * steps) / steps;
      var v = from + (to - from) * p;
      var s = prefix + fmt(v, dec) + suffix;
      if (s !== last) {
        el.textContent = s;
        last = s;
      }
    });
  }

  // ── Meters ─────────────────────────────────────────────────────────────

  function mixHex(a, b, p) {
    var pa = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)];
    var pb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)];
    var out = "#";
    for (var i = 0; i < 3; i++) {
      var v = Math.round(pa[i] + (pb[i] - pa[i]) * p);
      out += (v < 16 ? "0" : "") + v.toString(16);
    }
    return out;
  }

  /** Build `n` segments; filled ones blend violet → magenta (or `colors: [from, to]`). */
  function meter(el, n, o) {
    o = o || {};
    var c = o.colors || ["#7C3AED", "#E8318F"];
    var h = "";
    for (var i = 0; i < n; i++) h += "<i></i>";
    el.innerHTML = h;
    for (var j = 0; j < n; j++) {
      el.children[j].style.setProperty("--rk-seg", mixHex(c[0], c[1], n > 1 ? j / (n - 1) : 0));
    }
    return el;
  }

  /** Fill (or drain) a meter segment by segment between `from` and `to` segments. */
  function fillMeter(clk, el, o) {
    var segs = el.children;
    var from = o.from || 0;
    var to = o.to;
    var start = o.start || 0;
    var dur = o.dur || 0.6;
    var last = -1;
    clk.add(function (t) {
      var p = clamp01((t - start) / dur);
      var k = Math.round(from + (to - from) * p);
      if (k === last) return;
      last = k;
      for (var i = 0; i < segs.length; i++) {
        if (i < k) segs[i].classList.add("on");
        else segs[i].classList.remove("on");
      }
    });
  }

  // ── Cursor, clicks, presses, pops, shakes ──────────────────────────────

  // The classic arrow pointer, 12×20 pixels. X = ink outline, W = white fill.
  var CURSOR = [
    "X...........",
    "XX..........",
    "XWX.........",
    "XWWX........",
    "XWWWX.......",
    "XWWWWX......",
    "XWWWWWX.....",
    "XWWWWWWX....",
    "XWWWWWWWX...",
    "XWWWWWWWWX..",
    "XWWWWWWWWWX.",
    "XWWWWWWXXXXX",
    "XWWWXWWX....",
    "XWWX.XWWX...",
    "XWX..XWWX...",
    "XX....XWWX..",
    "X.....XWWX..",
    ".......XWWX.",
    ".......XWWX.",
    "........XX..",
  ];

  function cursorSVG(px) {
    var p = px || 3;
    var rects = "";
    for (var y = 0; y < CURSOR.length; y++) {
      for (var x = 0; x < CURSOR[y].length; x++) {
        var ch = CURSOR[y][x];
        if (ch === ".") continue;
        rects +=
          '<rect x="' + x * p + '" y="' + y * p + '" width="' + p + '" height="' + p + '" fill="' + (ch === "X" ? "#1D1433" : "#FFFFFF") + '"/>';
      }
    }
    return (
      '<svg width="' + 12 * p + '" height="' + CURSOR.length * p + '" viewBox="0 0 ' + 12 * p + " " + CURSOR.length * p +
      '" shape-rendering="crispEdges" aria-hidden="true">' + rects + "</svg>"
    );
  }

  /** A pixel-arrow cursor. Position it with GSAP x/y on the returned element (hotspot = arrow tip). */
  function cursor(o) {
    o = o || {};
    var d = document.createElement("div");
    d.className = "rk-cursor";
    d.innerHTML = '<div class="rk-cursor-inner">' + cursorSVG(o.size || 3) + "</div>";
    if (window.gsap) window.gsap.set(d, { x: o.x || 0, y: o.y || 0 });
    return d;
  }

  /** Click at stage coords (x, y) at time t: cursor dips, square pixel rings step outward. */
  function click(clk, cur, stage, o) {
    var t0 = o.t;
    var x = o.x;
    var y = o.y;
    var color = o.color || "#7C3AED";
    var size = o.size || 84;
    var inner = cur ? cur.querySelector(".rk-cursor-inner") : null;
    var rings = [];
    for (var k = 0; k < 2; k++) {
      var r = document.createElement("div");
      r.className = "rk-ripple";
      r.style.color = color;
      r.style.left = x - size / 2 + "px";
      r.style.top = y - size / 2 + "px";
      r.style.width = size + "px";
      r.style.height = size + "px";
      stage.appendChild(r);
      rings.push(r);
    }
    clk.add(function (t) {
      if (inner) {
        var d = t - t0;
        var sc = d >= -0.06 && d < 0.1 ? 0.84 : 1;
        inner.style.transform = sc === 1 ? "" : "scale(" + sc + ")";
      }
      for (var i = 0; i < rings.length; i++) {
        var p = (t - t0 - i * 0.1) / 0.4;
        if (p < 0 || p >= 1) {
          rings[i].style.opacity = "0";
          continue;
        }
        var q = Math.floor(p * 5) / 5;
        rings[i].style.opacity = String(1 - q);
        rings[i].style.transform = "scale(" + (0.25 + 0.95 * q) + ")";
      }
    });
  }

  /** 8-bit button press at t: drops onto its bottom edge in 2 steps, holds, pops back. Don't also tween this element's transform. */
  function press(clk, el, t0, o) {
    o = o || {};
    var lift = o.lift || 12;
    var hold = o.hold || 0.16;
    clk.add(function (t) {
      var d = t - t0;
      var k = 0;
      if (d >= 0 && d < 0.05) k = 0.5;
      else if (d >= 0.05 && d < 0.05 + hold) k = 1;
      else if (d >= 0.05 + hold && d < 0.1 + hold) k = 0.5;
      el.style.transform = k ? "translateY(" + lift * k + "px)" : "";
      el.style.setProperty("--lift", lift * (1 - k) + "px");
    });
  }

  /** Sprite pop-in at t: hidden → 112% → 100% in steps. Uses GSAP scale/opacity on `el`. */
  function pop(tl, el, t0, o) {
    o = o || {};
    var from = o.from != null ? o.from : 0.6;
    tl.fromTo(el, { scale: from, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.12, ease: "steps(2)" }, t0);
    tl.to(el, { scale: 1, duration: 0.08, ease: "steps(1)" }, t0 + 0.12);
  }

  /** Stepped arcade shake on a wrapper you don't otherwise transform. Ends exactly at rest. */
  function shake(clk, el, o) {
    var t0 = o.t;
    var dur = o.dur || 0.3;
    var amp = o.amp || 10;
    var path = [
      [1, -0.6],
      [-0.8, 0.5],
      [0.6, 0.8],
      [-0.5, -0.7],
      [0.3, 0.4],
      [-0.15, -0.2],
    ];
    clk.add(function (t) {
      var p = (t - t0) / dur;
      if (p < 0 || p >= 1) {
        el.style.transform = "";
        return;
      }
      var i = Math.min(path.length - 1, Math.floor(p * path.length));
      var fall = 1 - p;
      el.style.transform = "translate(" + Math.round(path[i][0] * amp * fall) + "px," + Math.round(path[i][1] * amp * fall) + "px)";
    });
  }

  // ── Pixel fields, the funnel ───────────────────────────────────────────

  function pixelField(svg, o) {
    var cols = o.cols;
    var rows = o.rows;
    var cell = o.cell || 10;
    var gap = o.gap != null ? o.gap : 2;
    var pal = o.palette;
    var seed = o.seed || 1;
    var rx = o.rx != null ? o.rx : 1;
    svg.setAttribute("viewBox", "0 0 " + (cols * cell - gap) + " " + (rows * cell - gap));
    svg.setAttribute("shape-rendering", "crispEdges");
    var out = [];
    for (var r = 0; r < rows; r++) {
      var color = pal[Math.min(pal.length - 1, Math.floor((r / rows) * pal.length))];
      for (var c = 0; c < cols; c++) {
        var op = 0.5 + 0.5 * noise(r * cols + c, seed, 7);
        out.push(
          '<rect x="' + c * cell + '" y="' + r * cell + '" width="' + (cell - gap) + '" height="' + (cell - gap) + '" rx="' + rx + '" fill="' + color + '" opacity="' + op.toFixed(2) + '"/>',
        );
      }
    }
    svg.innerHTML = out.join("");
  }

  /** The app's Judging › Progress funnel as pixel art. Returns one <g> per band. */
  function funnel(svg, o) {
    var w = o.width;
    var h = o.height;
    var CELL = o.cell || 16;
    var bands = o.bands;
    var DESIGN_H = 240;
    var PAD = 36;
    var RINGS = [
      { cells: 0, shades: [[1, 0.6], [0.84, 0.28], [0.68, 0.12]] },
      { cells: 1, shades: [[0.3, 0.6], [0.2, 0.4]] },
      { cells: 2, shades: [[0.12, 0.6], [0.07, 0.4]] },
    ];
    function shade(shades, r) {
      var acc = 0;
      for (var i = 0; i < shades.length; i++) {
        acc += shades[i][1];
        if (r < acc) return shades[i][0];
      }
      return shades[shades.length - 1][0];
    }
    var n = bands.length;
    var col = w / n;
    var mid = Math.round(h / 2 / CELL) * CELL;
    var scale = h / DESIGN_H;
    var max = 1;
    for (var b = 0; b < n; b++) max = Math.max(max, bands[b].count);
    function thickness(cnt) {
      return Math.max(2 * CELL, ((h - 2 * PAD * scale) * cnt) / max);
    }
    var rows = Math.ceil(h / 2 / CELL) + 1;
    var groups = [];
    for (var g = 0; g < n; g++) groups.push([]);
    for (var xi = 0; xi * CELL < w; xi++) {
      var cx = xi * CELL + CELL / 2;
      var i = Math.min(n - 1, Math.floor(cx / col));
      var tt = Math.min(1, Math.max(0, ((cx - i * col) / col - 0.3) / 0.4));
      var eased = tt * tt * (3 - 2 * tt);
      var fromT = thickness(bands[i].count);
      var toT = thickness((bands[i + 1] || bands[i]).count);
      var half = (fromT + (toT - fromT) * eased) / 2;
      for (var r = 0; r < rows; r++) {
        var d = r * CELL + CELL / 2;
        var ring = -1;
        for (var q = 0; q < RINGS.length; q++) {
          if (d <= half + RINGS[q].cells * CELL) {
            ring = q;
            break;
          }
        }
        if (ring === -1) break;
        for (var side = -1; side <= 1; side += 2) {
          var yi = side < 0 ? 2 * r : 2 * r + 1;
          var fade = bands[i].faded ? 0.35 : 1;
          var op = shade(RINGS[ring].shades, noise(i, xi, yi)) * fade;
          var y = side < 0 ? mid - (r + 1) * CELL : mid + r * CELL;
          groups[i].push('<rect x="' + xi * CELL + '" y="' + y + '" width="' + CELL + '" height="' + CELL + '" opacity="' + (Math.round(op * 100) / 100) + '"/>');
        }
      }
    }
    svg.setAttribute("viewBox", "0 0 " + w + " " + h);
    svg.setAttribute("shape-rendering", "crispEdges");
    var html = "";
    for (var k = 0; k < n; k++) html += '<g class="rk-funnel-band" fill="' + bands[k].color + '">' + groups[k].join("") + "</g>";
    svg.innerHTML = html;
    return svg.querySelectorAll("g.rk-funnel-band");
  }

  // ── Dither wipe, confetti ──────────────────────────────────────────────

  /** Bayer-dithered pixel wipe on a <canvas>. mode "cover" fills tiles in; "reveal" clears them. */
  function dither(clk, canvas, o) {
    var W = canvas.width;
    var H = canvas.height;
    var cell = o.cell || 48;
    var cols = Math.ceil(W / cell);
    var rows = Math.ceil(H / cell);
    var ctx = canvas.getContext("2d");
    var start = o.start || 0;
    var dur = o.dur || 0.5;
    var color = o.color || "#150C2E";
    var mode = o.mode || "cover";
    var angle = o.angle || "diagonal";
    var levels = o.levels || 20;
    var th = new Array(cols * rows);
    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < cols; x++) {
        var sweep;
        if (angle === "left") sweep = x / cols;
        else if (angle === "right") sweep = 1 - x / cols;
        else if (angle === "up") sweep = 1 - y / rows;
        else if (angle === "down") sweep = y / rows;
        else if (angle === "center") {
          var dx = (x + 0.5) / cols - 0.5;
          var dy = ((y + 0.5) / rows - 0.5) * (H / W);
          sweep = Math.min(1, Math.sqrt(dx * dx + dy * dy) / 0.62);
        } else sweep = (x / cols) * 0.62 + (y / rows) * 0.38;
        var bb = (bayer(x, y) + 0.5) / 16;
        th[y * cols + x] = Math.min(0.999, sweep * 0.55 + bb * 0.45);
      }
    }
    var last = -1;
    clk.add(function (t) {
      var p = clamp01((t - start) / dur);
      var q = Math.round(p * levels) / levels;
      if (q === last) return;
      last = q;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = color;
      for (var i = 0; i < th.length; i++) {
        var on = mode === "cover" ? th[i] < q : th[i] >= q;
        if (on) ctx.fillRect((i % cols) * cell, Math.floor(i / cols) * cell, cell, cell);
      }
    });
  }

  /** Deterministic pixel confetti: square bits burst from (x, y) at `start`, fall on gravity. */
  function confetti(clk, stage, o) {
    var n = Math.min(40, o.count || 36);
    var x0 = o.x;
    var y0 = o.y;
    var t0 = o.start || 0;
    var colors = o.colors || ["#FCD34D", "#FB923C", "#F43F5E", "#E11D8F", "#7C3AED", "#D946EF"];
    var spread = o.spread || 1;
    var power = o.power || 1;
    var g = o.gravity || 2000;
    var life = o.life || 2.4;
    var seed = o.seed || 3;
    var drag = 1.6;
    var bits = [];
    for (var i = 0; i < n; i++) {
      var el = document.createElement("div");
      el.className = "rk-bit";
      var size = (o.size || 12) + Math.floor(noise(i, seed, 1) * 3) * Math.round((o.size || 12) / 2);
      el.style.width = size + "px";
      el.style.height = size + "px";
      el.style.background = colors[i % colors.length];
      stage.appendChild(el);
      var ang = ((-90 + (noise(i, seed, 2) - 0.5) * 150 * spread) * Math.PI) / 180;
      var sp = (1100 + noise(i, seed, 3) * 1100) * power;
      bits.push({ el: el, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, half: size / 2, ph: Math.floor(noise(i, seed, 4) * 4) });
    }
    var FLIP = [1, 0.55, 0.15, 0.55];
    clk.add(function (t) {
      var dt = t - t0;
      for (var i = 0; i < bits.length; i++) {
        var b = bits[i];
        if (dt < 0 || dt > life) {
          b.el.style.opacity = "0";
          continue;
        }
        var k = (1 - Math.exp(-drag * dt)) / drag;
        var x = x0 + b.vx * k - b.half;
        var y = y0 + b.vy * k + 0.5 * g * dt * dt * 0.55 - b.half;
        x = Math.round(x / 4) * 4;
        y = Math.round(y / 4) * 4;
        var s = FLIP[(Math.floor(dt * 12) + b.ph) % 4];
        b.el.style.transform = "translate(" + x + "px," + y + "px) scale(1," + s + ")";
        b.el.style.opacity = dt > life - 0.4 ? String(Math.max(0, (life - dt) / 0.4)) : "1";
      }
    });
  }

  window.RK = {
    __v: 1,
    noise: noise,
    bayer: bayer,
    icon: icon,
    hydrate: hydrate,
    clock: clock,
    type: type,
    states: states,
    count: count,
    meter: meter,
    fillMeter: fillMeter,
    cursor: cursor,
    cursorSVG: cursorSVG,
    click: click,
    press: press,
    pop: pop,
    shake: shake,
    pixelField: pixelField,
    funnel: funnel,
    dither: dither,
    confetti: confetti,
  };
})();
