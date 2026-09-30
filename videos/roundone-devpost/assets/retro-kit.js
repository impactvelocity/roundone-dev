/*
 * RoundOne retro kit — shared by every frame of the launch film.
 *
 * Injects the rk-* component CSS once and exposes window.RK: pixel icons, a
 * pixel cursor with stepped click ripples, segmented meters, count-ups, typing,
 * pixel fields, the app's pixel funnel, Bayer dither wipes and pixel confetti.
 *
 * Everything is deterministic and seek-safe: time-based helpers hang off one
 * linear "clock" tween per frame (RK.clock) and draw a pure function of t.
 * Built from kit/retro-kit.src.js by build-kit.mjs (it inlines the icons).
 */
(function () {
  if (window.RK && window.RK.__v === 1) return;

  // Pixel Icon Library by HackerNoon (CC BY 4.0), the set src/components/pixel-icon.tsx ships.
  var ICONS = {"text":"<rect x=\"1\" y=\"2\" width=\"15\" height=\"1\"/><rect x=\"1\" y=\"15\" width=\"15\" height=\"1\"/><rect x=\"1\" y=\"8\" width=\"22\" height=\"1\"/><rect x=\"1\" y=\"21\" width=\"22\" height=\"1\"/>","paragraph":"<path d=\"m7,1v1h-2v1h-1v1h-1v2h-1v6h1v2h1v1h1v1h2v1h4v6h2V3h3v20h2V3h4V1H7Zm4,14h-4v-1h-2v-2h-1v-6h1v-2h2v-1h4v12Z\"/>","hash":"<path d=\"M17,12V9h6V7H18V4h1V1H17V4H16V7H10V4h1V1H9V4H8V7H3V9H7v3H6v3H1v2H5v3H4v3H6V20H7V17h6v3H12v3h2V20h1V17h6V15H16V12Zm-2,0H14v3H8V12H9V9h6Z\"/>","link":"<polygon points=\"16 10 17 10 17 17 16 17 16 18 15 18 15 19 14 19 14 20 13 20 13 21 12 21 12 22 11 22 11 23 5 23 5 22 4 22 4 21 3 21 3 20 2 20 2 19 1 19 1 14 2 14 2 13 3 13 3 12 4 12 4 11 5 11 5 14 4 14 4 15 3 15 3 18 4 18 4 19 5 19 5 20 6 20 6 21 10 21 10 20 11 20 11 19 12 19 12 18 13 18 13 17 14 17 14 16 15 16 15 11 14 11 14 10 13 10 13 9 14 9 14 8 15 8 15 9 16 9 16 10\"/><polygon points=\"23 5 23 10 22 10 22 11 21 11 21 12 20 12 20 13 19 13 19 10 20 10 20 9 21 9 21 6 20 6 20 5 19 5 19 4 18 4 18 3 14 3 14 4 13 4 13 5 12 5 12 6 11 6 11 7 10 7 10 8 9 8 9 13 10 13 10 14 11 14 11 15 10 15 10 16 9 16 9 15 8 15 8 14 7 14 7 7 8 7 8 6 9 6 9 5 10 5 10 4 11 4 11 3 12 3 12 2 13 2 13 1 19 1 19 2 20 2 20 3 21 3 21 4 22 4 22 5 23 5\"/>","play":"<path d=\"m21,11v-1h-1v-1h-2v-1h-2v-1h-1v-1h-2v-1h-2v-1h-1v-1h-2v-1h-2v-1h-3v1h-1v20h1v1h3v-1h2v-1h2v-1h1v-1h2v-1h2v-1h1v-1h2v-1h2v-1h1v-1h1v-2h-1Zm-2,2h-2v1h-2v1h-1v1h-2v1h-2v1h-1v1h-2v1h-2v1h-1V3h1v1h2v1h2v1h1v1h2v1h2v1h1v1h2v1h2v2Z\"/>","branch":"<path d=\"M20,2V1H16V2H15V6h1V7h1v4H7V7H8V6H9V2H8V1H4V2H3V6H4V7H5V17H4v1H3v4H4v1H8V22H9V18H8V17H7V13H19V7h1V6h1V2ZM5,3H7V5H5ZM7,21H5V19H7ZM19,5H17V3h2Z\"/>","clip":"<polygon points=\"21 4 21 9 20 9 20 10 19 10 19 11 18 11 18 12 17 12 17 13 16 13 16 14 15 14 15 15 14 15 14 16 13 16 13 17 12 17 12 18 11 18 11 19 8 19 8 18 7 18 7 17 6 17 6 14 7 14 7 13 8 13 8 12 9 12 9 11 10 11 10 10 11 10 11 9 12 9 12 8 13 8 13 7 14 7 14 6 15 6 15 5 16 5 16 6 17 6 17 7 16 7 16 8 15 8 15 9 14 9 14 10 13 10 13 11 12 11 12 12 11 12 11 13 10 13 10 14 9 14 9 15 8 15 8 16 9 16 9 17 10 17 10 16 11 16 11 15 12 15 12 14 13 14 13 13 14 13 14 12 15 12 15 11 16 11 16 10 17 10 17 9 18 9 18 8 19 8 19 5 18 5 18 4 17 4 17 3 14 3 14 4 13 4 13 5 12 5 12 6 11 6 11 7 10 7 10 8 9 8 9 9 8 9 8 10 7 10 7 11 6 11 6 12 5 12 5 13 4 13 4 18 5 18 5 19 6 19 6 20 7 20 7 21 12 21 12 20 13 20 13 19 14 19 14 18 15 18 15 17 16 17 16 16 17 16 17 15 18 15 18 14 19 14 19 13 21 13 21 15 20 15 20 16 19 16 19 17 18 17 18 18 17 18 17 19 16 19 16 20 15 20 15 21 14 21 14 22 13 22 13 23 7 23 7 22 5 22 5 21 4 21 4 20 3 20 3 18 2 18 2 12 3 12 3 11 4 11 4 10 5 10 5 9 6 9 6 8 7 8 7 7 8 7 8 6 9 6 9 5 10 5 10 4 11 4 11 3 12 3 12 2 14 2 14 1 18 1 18 2 19 2 19 3 20 3 20 4 21 4\"/>","check":"<polygon points=\"22 4 22 6 21 6 21 7 20 7 20 8 19 8 19 9 18 9 18 10 17 10 17 11 16 11 16 12 15 12 15 13 14 13 14 14 13 14 13 15 12 15 12 16 11 16 11 17 10 17 10 18 8 18 8 17 7 17 7 16 6 16 6 15 5 15 5 14 4 14 4 13 3 13 3 12 2 12 2 10 4 10 4 11 5 11 5 12 6 12 6 13 7 13 7 14 8 14 8 15 10 15 10 14 11 14 11 13 12 13 12 12 13 12 13 11 14 11 14 10 15 10 15 9 16 9 16 8 17 8 17 7 18 7 18 6 19 6 19 5 20 5 20 4 22 4\"/>","image":"<polygon points=\"9 6 9 9 8 9 8 10 5 10 5 9 4 9 4 6 5 6 5 5 8 5 8 6 9 6\"/><path d=\"m22,2v-1H2v1h-1v20h1v1h20v-1h1V2h-1Zm-5,12v1h1v1h1v1h1v1h1v3h-13v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v1h1Zm3,1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v-1h-1v-1h-1v-1h-1v-1h-1V3h18v12h-1Zm-15,3v1h1v1h1v1H3v-4h1v1h1Z\"/>","users":"<path d=\"m19,18v-1h-1v-1h-2v-1h-8v1h-2v1h-1v1h-1v3h1v1h14v-1h1v-3h-1Zm-11,0v-1h8v1h2v2H6v-2h2Z\"/><path d=\"m15,7v-1h-1v-1h-4v1h-1v1h-1v4h1v1h1v1h4v-1h1v-1h1v-4h-1Zm-5,4v-4h4v4h-4Z\"/><polygon points=\"7 5 8 5 8 6 7 6 7 8 5 8 5 7 4 7 4 5 5 5 5 4 7 4 7 5\"/><polygon points=\"7 12 8 12 8 13 2 13 2 12 1 12 1 10 2 10 2 9 7 9 7 12\"/><polygon points=\"17 6 16 6 16 5 17 5 17 4 19 4 19 5 20 5 20 7 19 7 19 8 17 8 17 6\"/><polygon points=\"23 10 23 12 22 12 22 13 16 13 16 12 17 12 17 9 22 9 22 10 23 10\"/>","user":"<path d=\"m17,5v-2h-1v-1h-2v-1h-4v1h-2v1h-1v2h-1v4h1v2h1v1h2v1h4v-1h2v-1h1v-2h1v-4h-1Zm-2,4v1h-1v1h-4v-1h-1v-1h-1v-4h1v-1h1v-1h4v1h1v1h1v4h-1Z\"/><path d=\"m21,19v-1h-1v-1h-1v-1h-2v-1H7v1h-2v1h-1v1h-1v1h-1v3h1v1h18v-1h1v-3h-1Zm-16,0v-1h2v-1h10v1h2v1h1v2H4v-2h1Z\"/>","spark":"<polygon points=\"23 5 23 6 21 6 21 7 20 7 20 9 19 9 19 7 18 7 18 6 16 6 16 5 18 5 18 4 19 4 19 2 20 2 20 4 21 4 21 5 23 5\"/><polygon points=\"23 18 23 19 21 19 21 20 20 20 20 22 19 22 19 20 18 20 18 19 16 19 16 18 18 18 18 17 19 17 19 15 20 15 20 17 21 17 21 18 23 18\"/><path d=\"M15,11V10H13V9H12V8H11V6H10V4H8V6H7V8H6V9H5v1H3v1H1v2H3v1H5v1H6v1H7v2H8v2h2V18h1V16h1V15h1V14h2V13h2V11Zm-3,2v1H11v1H10v2H8V15H7V14H6V13H4V11H6V10H7V9H8V7h2V9h1v1h1v1h2v2Z\"/>","gear":"<path d=\"m21,10v-1h-1v-2h1v-2h-1v-1h-1v-1h-2v1h-2v-1h-1V1h-4v2h-1v1h-2v-1h-2v1h-1v1h-1v2h1v2h-1v1H1v4h2v1h1v2h-1v2h1v1h1v1h2v-1h2v1h1v2h4v-2h1v-1h2v1h2v-1h1v-1h1v-2h-1v-2h1v-1h2v-4h-2Zm0,3h-1v1h-1v1h-1v2h1v2h-2v-1h-2v1h-1v1h-1v1h-2v-1h-1v-1h-1v-1h-2v1h-2v-2h1v-2h-1v-1h-1v-1h-1v-2h1v-1h1v-1h1v-2h-1v-2h2v1h2v-1h1v-1h1v-1h2v1h1v1h1v1h2v-1h2v2h-1v2h1v1h1v1h1v2Z\"/><path d=\"m16,10v-1h-1v-1h-1v-1h-4v1h-1v1h-1v1h-1v4h1v1h1v1h1v1h4v-1h1v-1h1v-1h1v-4h-1Zm-1,4h-1v1h-4v-1h-1v-4h1v-1h4v1h1v4Z\"/>","search":"<path d=\"m22,20v-1h-1v-1h-1v-1h-1v-1h-2v-1h1v-2h1v-6h-1v-2h-1v-1h-1v-1h-1v-1h-2v-1h-6v1h-2v1h-1v1h-1v1h-1v2h-1v6h1v2h1v1h1v1h1v1h2v1h6v-1h2v-1h1v2h1v1h1v1h1v1h1v1h2v-1h1v-2h-1Zm-10-5v1h-4v-1h-2v-1h-1v-2h-1v-4h1v-2h1v-1h2v-1h4v1h2v1h1v2h1v4h-1v2h-1v1h-2Z\"/>","globe":"<path d=\"m22,9v-2h-1v-2h-1v-1h-1v-1h-2v-1h-2v-1h-6v1h-2v1h-2v1h-1v1h-1v2h-1v2h-1v7h1v1h1v2h1v1h1v1h2v1h2v1h6v-1h2v-1h2v-1h1v-1h1v-2h1v-2h1v-6h-1Zm-1,1v4h-3v-4h3Zm-5-6h1v1h2v2h1v1h-3v-3h-1v-1Zm-2,14v2h-1v1h-2v-1h-1v-2h-1v-2h6v2h-1Zm2-8v4h-8v-4h8Zm-7-4h1v-2h1v-1h2v1h1v2h1v2h-6v-2Zm-5,1h1v-2h2v-1h1v1h-1v3h-3v-1Zm-1,7v-4h3v4h-3Zm2,5v-2h-1v-1h3v3h1v1h-1v-1h-2Zm14-2v2h-2v1h-1v-1h1v-3h3v1h-1Z\"/>","trash":"<rect x=\"8\" y=\"1\" width=\"8\" height=\"1\"/><rect x=\"8\" y=\"2\" width=\"1\" height=\"2\"/><rect x=\"15\" y=\"2\" width=\"1\" height=\"2\"/><rect x=\"2\" y=\"4\" width=\"20\" height=\"2\"/><rect x=\"4\" y=\"6\" width=\"2\" height=\"15\"/><rect x=\"18\" y=\"6\" width=\"2\" height=\"15\"/><rect x=\"4\" y=\"21\" width=\"16\" height=\"2\"/><rect x=\"9\" y=\"9\" width=\"2\" height=\"9\"/><rect x=\"13\" y=\"9\" width=\"2\" height=\"9\"/>","grip":"<rect x=\"7\" y=\"3\" width=\"4\" height=\"4\"/><rect x=\"13\" y=\"3\" width=\"4\" height=\"4\"/><rect x=\"7\" y=\"10\" width=\"4\" height=\"4\"/><rect x=\"13\" y=\"10\" width=\"4\" height=\"4\"/><rect x=\"7\" y=\"17\" width=\"4\" height=\"4\"/><rect x=\"13\" y=\"17\" width=\"4\" height=\"4\"/>","plus":"<polygon points=\"23 11 23 13 13 13 13 23 11 23 11 13 1 13 1 11 11 11 11 1 13 1 13 11 23 11\"/>","arrow-right":"<polygon points=\"23 11 23 13 22 13 22 14 21 14 21 15 20 15 20 16 19 16 19 17 18 17 18 18 17 18 17 19 16 19 16 20 15 20 15 21 14 21 14 22 13 22 13 23 12 23 12 22 11 22 11 21 12 21 12 20 13 20 13 19 14 19 14 18 15 18 15 17 16 17 16 16 17 16 17 15 18 15 18 14 19 14 19 13 1 13 1 11 19 11 19 10 18 10 18 9 17 9 17 8 16 8 16 7 15 7 15 6 14 6 14 5 13 5 13 4 12 4 12 3 11 3 11 2 12 2 12 1 13 1 13 2 14 2 14 3 15 3 15 4 16 4 16 5 17 5 17 6 18 6 18 7 19 7 19 8 20 8 20 9 21 9 21 10 22 10 22 11 23 11\"/>","arrow-left":"<polygon points=\"23 11 23 13 5 13 5 14 6 14 6 15 7 15 7 16 8 16 8 17 9 17 9 18 10 18 10 19 11 19 11 20 12 20 12 21 13 21 13 22 12 22 12 23 11 23 11 22 10 22 10 21 9 21 9 20 8 20 8 19 7 19 7 18 6 18 6 17 5 17 5 16 4 16 4 15 3 15 3 14 2 14 2 13 1 13 1 11 2 11 2 10 3 10 3 9 4 9 4 8 5 8 5 7 6 7 6 6 7 6 7 5 8 5 8 4 9 4 9 3 10 3 10 2 11 2 11 1 12 1 12 2 13 2 13 3 12 3 12 4 11 4 11 5 10 5 10 6 9 6 9 7 8 7 8 8 7 8 7 9 6 9 6 10 5 10 5 11 23 11\"/>","arrow-up":"<polygon points=\"23 11 23 12 22 12 22 13 21 13 21 12 20 12 20 11 19 11 19 10 18 10 18 9 17 9 17 8 16 8 16 7 15 7 15 6 14 6 14 5 13 5 13 23 11 23 11 5 10 5 10 6 9 6 9 7 8 7 8 8 7 8 7 9 6 9 6 10 5 10 5 11 4 11 4 12 3 12 3 13 2 13 2 12 1 12 1 11 2 11 2 10 3 10 3 9 4 9 4 8 5 8 5 7 6 7 6 6 7 6 7 5 8 5 8 4 9 4 9 3 10 3 10 2 11 2 11 1 13 1 13 2 14 2 14 3 15 3 15 4 16 4 16 5 17 5 17 6 18 6 18 7 19 7 19 8 20 8 20 9 21 9 21 10 22 10 22 11 23 11\"/>","arrow-down":"<polygon points=\"23 12 23 13 22 13 22 14 21 14 21 15 20 15 20 16 19 16 19 17 18 17 18 18 17 18 17 19 16 19 16 20 15 20 15 21 14 21 14 22 13 22 13 23 11 23 11 22 10 22 10 21 9 21 9 20 8 20 8 19 7 19 7 18 6 18 6 17 5 17 5 16 4 16 4 15 3 15 3 14 2 14 2 13 1 13 1 12 2 12 2 11 3 11 3 12 4 12 4 13 5 13 5 14 6 14 6 15 7 15 7 16 8 16 8 17 9 17 9 18 10 18 10 19 11 19 11 1 13 1 13 19 14 19 14 18 15 18 15 17 16 17 16 16 17 16 17 15 18 15 18 14 19 14 19 13 20 13 20 12 21 12 21 11 22 11 22 12 23 12\"/>","external":"<polygon points=\"20 15 20 22 19 22 19 23 2 23 2 22 1 22 1 5 2 5 2 4 11 4 11 6 3 6 3 21 18 21 18 15 20 15\"/><polygon points=\"23 1 23 9 21 9 21 5 20 5 20 6 19 6 19 7 18 7 18 8 17 8 17 9 16 9 16 10 15 10 15 11 14 11 14 12 13 12 13 13 12 13 12 14 11 14 11 15 10 15 10 16 9 16 9 17 7 17 7 15 8 15 8 14 9 14 9 13 10 13 10 12 11 12 11 11 12 11 12 10 13 10 13 9 14 9 14 8 15 8 15 7 16 7 16 6 17 6 17 5 18 5 18 4 19 4 19 3 15 3 15 1 23 1\"/>","lock":"<path d=\"m21,12v-1h-3v-6h-1v-2h-1v-1h-2v-1h-4v1h-2v1h-1v2h-1v6h-3v1h-1v10h1v1h18v-1h1v-10h-1Zm-1,1v8H4v-8h16ZM9,5v-1h1v-1h4v1h1v1h1v6h-8v-6h1Z\"/>","flag":"<path d=\"m21,4v1h-2v1h-6v-1h-7v1h-1v-1h1v-2h-1v-1h-2v1h-1v2h1v17h2v-4h1v-1h7v1h6v-1h2v-1h1V4h-1Zm-1,11h-1v1h-6v-1h-7v1h-1v-8h1v-1h7v1h6v-1h1v8Z\"/>","mail":"<path d=\"m21,5v-1H3v1H1v14h1v1h20v-1h1V5h-2Zm-11,7v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h14v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-2v-1h-1Zm-6-5v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h2v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v11H3V7h1Z\"/>","trophy":"<path d=\"m18,4v-2H6v2H1v5h1v2h1v1h1v1h1v1h1v1h3v1h2v3h-4v3h10v-3h-4v-3h2v-1h3v-1h1v-1h1v-1h1v-1h1v-2h1v-5h-5Zm-10,9h-2v-1h-1v-1h-1v-2h-1v-3h2v1h1v2h1v3h1v1Zm0-4v-5h8v5h-1v3h-1v2h-4v-2h-1v-3h-1Zm12,0v2h-1v1h-1v1h-2v-1h1v-2h1v-3h1v-1h2v3h-1Z\"/>","chat":"<polygon points=\"19 10 19 12 18 12 18 13 16 13 16 12 15 12 15 10 16 10 16 9 18 9 18 10 19 10\"/><polygon points=\"14 10 14 12 13 12 13 13 11 13 11 12 10 12 10 10 11 10 11 9 13 9 13 10 14 10\"/><polygon points=\"9 10 9 12 8 12 8 13 6 13 6 12 5 12 5 10 6 10 6 9 8 9 8 10 9 10\"/><path d=\"m22,8v-2h-1v-1h-1v-1h-2v-1h-3v-1h-6v1h-3v1h-2v1h-1v1h-1v2h-1v6h1v2h1v2h-1v1h-1v2h5v-1h1v-1h2v1h6v-1h3v-1h2v-1h1v-1h1v-2h1v-6h-1Zm-1,6h-1v2h-2v1h-3v1h-6v-1h-2v1h-1v1h-2v-1h1v-2h-1v-2h-1v-6h1v-2h2v-1h3v-1h6v1h3v1h2v2h1v6Z\"/>","grid":"<path d=\"m10,13H2v1h-1v8h1v1h8v-1h1v-8h-1v-1Zm-1,8H3v-6h6v6Z\"/><path d=\"m10,2v-1H2v1h-1v8h1v1h8v-1h1V2h-1Zm-7,7V3h6v6H3Z\"/><path d=\"m22,13h-8v1h-1v8h1v1h8v-1h1v-8h-1v-1Zm-1,8h-6v-6h6v6Z\"/><path d=\"m22,2v-1h-8v1h-1v8h1v1h8v-1h1V2h-1Zm-1,7h-6V3h6v6Z\"/>","list":"<rect x=\"2\" y=\"5\" width=\"3\" height=\"3\"/><rect x=\"2\" y=\"11\" width=\"3\" height=\"3\"/><rect x=\"2\" y=\"17\" width=\"3\" height=\"3\"/><rect x=\"8\" y=\"18\" width=\"14\" height=\"1\"/><rect x=\"8\" y=\"6\" width=\"14\" height=\"1\"/><rect x=\"8\" y=\"12\" width=\"14\" height=\"1\"/>","x":"<polygon points=\"14 13 15 13 15 14 16 14 16 15 17 15 17 16 18 16 18 17 19 17 19 18 20 18 20 19 21 19 21 20 22 20 22 21 21 21 21 22 20 22 20 21 19 21 19 20 18 20 18 19 17 19 17 18 16 18 16 17 15 17 15 16 14 16 14 15 13 15 13 14 11 14 11 15 10 15 10 16 9 16 9 17 8 17 8 18 7 18 7 19 6 19 6 20 5 20 5 21 4 21 4 22 3 22 3 21 2 21 2 20 3 20 3 19 4 19 4 18 5 18 5 17 6 17 6 16 7 16 7 15 8 15 8 14 9 14 9 13 10 13 10 11 9 11 9 10 8 10 8 9 7 9 7 8 6 8 6 7 5 7 5 6 4 6 4 5 3 5 3 4 2 4 2 3 3 3 3 2 4 2 4 3 5 3 5 4 6 4 6 5 7 5 7 6 8 6 8 7 9 7 9 8 10 8 10 9 11 9 11 10 13 10 13 9 14 9 14 8 15 8 15 7 16 7 16 6 17 6 17 5 18 5 18 4 19 4 19 3 20 3 20 2 21 2 21 3 22 3 22 4 21 4 21 5 20 5 20 6 19 6 19 7 18 7 18 8 17 8 17 9 16 9 16 10 15 10 15 11 14 11 14 13\"/>","gift":"<path d=\"M22,6V4H21V3H20V2H19V1H5V2H4V3H3V4H2V6H1V22H2v1H22V22h1V6ZM13,3h5V4h1V5h1V7H13ZM4,5H5V4H6V3h5V7H4ZM21,21H13V19h1V18h1V17h1V16h1V13H16V12H13v1H11V12H8v1H7v3H8v1H9v1h1v1h1v2H3V9h8v2h2V9h8Z\"/>","coin":"<path d=\"M17,9V8H15V7H9V8H7V9H6v2H7v1H9v1h6V12h2V11h1V9Zm-2,2H9V9h6Z\"/><path d=\"M21,8V7H20V6H18V5H16V4H8V5H6V6H4V7H3V8H1v8H3v1H4v1H6v1H9v1h6V19h3V18h2V17h1V16h2V8ZM6,16H4V15H3V13H4v1H6Zm5,2H8V16h3Zm5,0H13V16h3Zm5-3H20v1H18V14h2V13h1Zm0-4H20v1H18v1H16v1H8V13H6V12H4V11H3V9H4V8H6V7H8V6h8V7h2V8h2V9h1Z\"/>","ticket":"<rect x=\"7\" y=\"15\" width=\"10\" height=\"2\"/><rect x=\"7\" y=\"11\" width=\"10\" height=\"2\"/><rect x=\"7\" y=\"7\" width=\"10\" height=\"2\"/><path d=\"m19,1v1h-1v1h-1v-1h-1v-1h-2v1h-1v1h-2v-1h-1v-1h-2v1h-1v1h-1v-1h-1v-1h-1v22h1v-1h1v-1h1v1h1v1h2v-1h1v-1h2v1h1v1h2v-1h1v-1h1v1h1v1h1V1h-1Zm-3,19v1h-2v-1h-1v-1h-2v1h-1v1h-2v-1h-1v-1h-1V5h1v-1h1v-1h2v1h1v1h2v-1h1v-1h2v1h1v1h1v14h-1v1h-1Z\"/>","tag":"<polygon points=\"8 5 8 7 7 7 7 8 5 8 5 7 4 7 4 5 5 5 5 4 7 4 7 5 8 5\"/><path d=\"m22,13v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1H2v1h-1v9h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h2v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-2h-1ZM3,3h7v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v2h-1v1h-1v1h-1v1h-1v1h-1v1h-2v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1V3Z\"/>","eye":"<rect x=\"16\" y=\"11\" width=\"1\" height=\"2\"/><polygon points=\"16 13 16 15 15 15 15 16 13 16 13 15 14 15 14 14 15 14 15 13 16 13\"/><polygon points=\"16 9 16 11 15 11 15 10 14 10 14 9 13 9 13 8 15 8 15 9 16 9\"/><rect x=\"11\" y=\"16\" width=\"2\" height=\"1\"/><polygon points=\"11 15 11 16 9 16 9 15 8 15 8 13 9 13 9 14 10 14 10 15 11 15\"/><polygon points=\"13 7 13 8 12 8 12 11 11 11 11 12 8 12 8 13 7 13 7 11 8 11 8 9 9 9 9 8 11 8 11 7 13 7\"/><path d=\"m22,11v-2h-1v-1h-1v-1h-1v-1h-2v-1H7v1h-2v1h-1v1h-1v1h-1v2h-1v2h1v2h1v1h1v1h1v1h2v1h10v-1h2v-1h1v-1h1v-1h1v-2h1v-2h-1Zm-1,3h-1v1h-1v1h-1v1h-2v1h-8v-1h-1v-1h-2v-1h-1v-1h-1v-4h1v-1h1v-1h1v-1h2v-1h8v1h2v1h1v1h1v1h1v4Z\"/>","dot":"<path d=\"m22,9v-2h-1v-2h-1v-1h-1v-1h-2v-1h-2v-1h-6v1h-2v1h-2v1h-1v1h-1v2h-1v2h-1v6h1v2h1v2h1v1h1v1h2v1h2v1h6v-1h2v-1h2v-1h1v-1h1v-2h1v-2h1v-6h-1Zm-1,6h-1v2h-1v2h-2v1h-2v1h-6v-1h-2v-1h-2v-2h-1v-2h-1v-6h1v-2h1v-2h2v-1h2v-1h6v1h2v1h2v2h1v2h1v6Z\"/><polygon points=\"16 15 16 16 15 16 15 17 14 17 14 16 13 16 13 15 12 15 12 14 11 14 11 5 13 5 13 13 14 13 14 14 15 14 15 15 16 15\"/>","table":"<path d=\"m22,2v-1H2v1h-1v20h1v1h20v-1h1V2h-1Zm-9,14h8v5h-8v-5Zm0-1v-6h8v6h-8Zm0-7V3h8v5h-8Zm-2,1v6H3v-6h8Zm-8-1V3h8v5H3Zm8,8v5H3v-5h8Z\"/>","check-list":"<rect x=\"9\" y=\"18\" width=\"14\" height=\"1\"/><rect x=\"9\" y=\"12\" width=\"14\" height=\"1\"/><rect x=\"9\" y=\"6\" width=\"14\" height=\"1\"/><polygon points=\"7 15 8 15 8 17 7 17 7 18 6 18 6 19 5 19 5 20 4 20 4 21 3 21 3 20 2 20 2 19 1 19 1 17 2 17 2 18 3 18 3 19 4 19 4 18 5 18 5 17 6 17 6 16 7 16 7 15\"/><polygon points=\"8 9 8 11 7 11 7 12 6 12 6 13 5 13 5 14 4 14 4 15 3 15 3 14 2 14 2 13 1 13 1 11 2 11 2 12 3 12 3 13 4 13 4 12 5 12 5 11 6 11 6 10 7 10 7 9 8 9\"/><polygon points=\"8 3 8 5 7 5 7 6 6 6 6 7 5 7 5 8 4 8 4 9 3 9 3 8 2 8 2 7 1 7 1 5 2 5 2 6 3 6 3 7 4 7 4 6 5 6 5 5 6 5 6 4 7 4 7 3 8 3\"/>","paint-brush":"<path d=\"M19,2V1H4V2H3V16H4v1H9v4h1v1h1v1h2V22h1V21h1V17h4V16h1V2ZM13,21H11V19h2Zm5-7H5V3H7V5H9V3h2V7h2V3h5Z\"/>","calendar":"<rect x=\"6\" y=\"1\" width=\"2\" height=\"6\"/><rect x=\"9\" y=\"4\" width=\"6\" height=\"2\"/><rect x=\"16\" y=\"1\" width=\"2\" height=\"6\"/><path d=\"M22,5V4H19V6h2V9H3V6H5V4H2V5H1V22H2v1H22V22h1V5ZM21,21H3V11H21Z\"/>","chart-line":"<polygon points=\"22 5 22 12 21 12 21 8 19 8 19 9 18 9 18 10 17 10 17 11 16 11 16 12 15 12 15 13 14 13 14 14 13 14 13 13 12 13 12 12 11 12 11 11 10 11 10 10 9 10 9 11 8 11 8 12 7 12 7 13 6 13 6 11 7 11 7 10 8 10 8 9 9 9 9 8 10 8 10 9 11 9 11 10 12 10 12 11 13 11 13 12 14 12 14 11 15 11 15 10 16 10 16 9 17 9 17 8 18 8 18 7 19 7 19 6 15 6 15 5 22 5\"/><polygon points=\"23 18 23 20 2 20 2 19 1 19 1 4 3 4 3 18 23 18\"/>","notebook":"<path d=\"M22,3V2H21V1H5V2H4V5H1V7H4v4H1v2H4v4H1v2H4v3H5v1H21V22h1V21h1V3ZM9,21H6V3H9Zm12-1H20v1H11V3h9V4h1Z\"/>","crown":"<path d=\"m22,7v-1h-2v1h-1v2h1v1h-1v1h-1v1h-2v-1h-1v-2h-1v-2h-1v-1h1v-2h-1v-1h-2v1h-1v2h1v1h-1v2h-1v2h-1v1h-2v-1h-1v-1h-1v-1h1v-2h-1v-1h-2v1h-1v2h1v1h1v4h1v3h1v2h1v2h12v-2h1v-2h1v-3h1v-4h1v-1h1v-2h-1Zm-4,7v3h-1v2H7v-2h-1v-3h-1v-1h1v1h2v-1h1v-1h1v-1h1v-2h2v2h1v1h1v1h1v1h2v-1h1v1h-1Z\"/>","code":"<polygon points=\"7 7 7 8 6 8 6 9 5 9 5 10 4 10 4 11 3 11 3 13 4 13 4 14 5 14 5 15 6 15 6 16 7 16 7 17 5 17 5 16 4 16 4 15 3 15 3 14 2 14 2 13 1 13 1 11 2 11 2 10 3 10 3 9 4 9 4 8 5 8 5 7 7 7\"/><polygon points=\"15 3 16 3 16 6 15 6 15 9 14 9 14 12 13 12 13 14 12 14 12 17 11 17 11 20 10 20 10 21 9 21 9 18 10 18 10 15 11 15 11 12 12 12 12 10 13 10 13 7 14 7 14 4 15 4 15 3\"/><polygon points=\"23 11 23 13 22 13 22 14 21 14 21 15 20 15 20 16 19 16 19 17 17 17 17 16 18 16 18 15 19 15 19 14 20 14 20 13 21 13 21 11 20 11 20 10 19 10 19 9 18 9 18 8 17 8 17 7 19 7 19 8 20 8 20 9 21 9 21 10 22 10 22 11 23 11\"/>","copy":"<polygon points=\"16 20 16 22 15 22 15 23 3 23 3 22 2 22 2 6 3 6 3 5 6 5 6 20 16 20\"/><path d=\"m16,7V1h-8v1h-1v16h1v1h13v-1h1V7h-6Zm4,10h-11V3h5v6h6v8Z\"/><polygon points=\"22 5 22 6 17 6 17 1 18 1 18 2 19 2 19 3 20 3 20 4 21 4 21 5 22 5\"/>","x-circle":"<polygon points=\"14 13 15 13 15 14 16 14 16 15 17 15 17 16 16 16 16 17 15 17 15 16 14 16 14 15 13 15 13 14 11 14 11 15 10 15 10 16 9 16 9 17 8 17 8 16 7 16 7 15 8 15 8 14 9 14 9 13 10 13 10 11 9 11 9 10 8 10 8 9 7 9 7 8 8 8 8 7 9 7 9 8 10 8 10 9 11 9 11 10 13 10 13 9 14 9 14 8 15 8 15 7 16 7 16 8 17 8 17 9 16 9 16 10 15 10 15 11 14 11 14 13\"/><path d=\"m22,9v-2h-1v-2h-1v-1h-1v-1h-2v-1h-2v-1h-6v1h-2v1h-2v1h-1v1h-1v2h-1v2h-1v6h1v2h1v2h1v1h1v1h2v1h2v1h6v-1h2v-1h2v-1h1v-1h1v-2h1v-2h1v-6h-1Zm-1,6h-1v2h-1v2h-2v1h-2v1h-6v-1h-2v-1h-2v-2h-1v-2h-1v-6h1v-2h1v-2h2v-1h2v-1h6v1h2v1h2v2h1v2h1v6Z\"/>","ban":"<polygon points=\"17 8 17 10 16 10 16 11 15 11 15 13 16 13 16 14 17 14 17 16 16 16 16 17 14 17 14 16 13 16 13 15 11 15 11 16 10 16 10 17 8 17 8 16 7 16 7 14 8 14 8 13 9 13 9 11 8 11 8 10 7 10 7 8 8 8 8 7 10 7 10 8 11 8 11 9 13 9 13 8 14 8 14 7 16 7 16 8 17 8\"/><path d=\"m22,8v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-8v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v8h1v1h1v1h1v1h1v1h1v1h1v1h1v1h8v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-8h-1Zm-2,7v1h-1v1h-1v1h-1v1h-1v1h-1v1h-6v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-6h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h6v1h1v1h1v1h1v1h1v1h1v1h1v6h-1Z\"/>","refresh":"<polygon points=\"23 14 23 15 22 15 22 17 21 17 21 19 20 19 20 20 19 20 19 21 17 21 17 22 15 22 15 23 9 23 9 22 7 22 7 21 5 21 5 20 3 20 3 21 2 21 2 22 1 22 1 15 8 15 8 16 7 16 7 17 6 17 6 19 7 19 7 20 9 20 9 21 15 21 15 20 17 20 17 19 19 19 19 17 20 17 20 14 23 14\"/><polygon points=\"23 2 23 9 16 9 16 8 17 8 17 7 18 7 18 5 17 5 17 4 15 4 15 3 9 3 9 4 7 4 7 5 5 5 5 7 4 7 4 10 1 10 1 9 2 9 2 7 3 7 3 5 4 5 4 4 5 4 5 3 7 3 7 2 9 2 9 1 15 1 15 2 17 2 17 3 19 3 19 4 21 4 21 3 22 3 22 2 23 2\"/>","inbox":"<path d=\"m22,16v-1h-6v-1h1v-1h1v-1h1v-1h-4V2h-1v-1h-4v1h-1v9h-4v1h1v1h1v1h1v1H2v1h-1v6h1v1h20v-1h1v-6h-1Zm-1,5H3v-4h7v1h1v1h2v-1h1v-1h7v4Zm-12-9h2V3h2v9h2v1h-1v1h-1v1h-2v-1h-1v-1h-1v-1Z\"/><rect x=\"19\" y=\"19\" width=\"1\" height=\"1\"/><rect x=\"17\" y=\"19\" width=\"1\" height=\"1\"/>"};

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
