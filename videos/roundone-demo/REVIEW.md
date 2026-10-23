# Review — RoundOne demo film, 2:44.0

Render: `renders/roundone-demo.mp4` (1920x1080, 30 fps, 67.7 MB), narrated in the ElevenLabs Flint voice. Final mix: −14.7 LUFS integrated, peak −1.5 dBFS. Voiced stretches sit around −14 LUFS, the cold open −16 and the end card −18 (both carry the launch film's own mix). After the Flint read went in, the sandbox beat was tightened: the install wait is now 12× and the build 2.4×, so it runs 21.8 s instead of 25.2 s.

The earlier scratch-voice render (`renders/roundone-demo-scratch-vo.mp4`, 2:47.4) is kept for comparison. The notes below were written against it, and the scratch-voice points no longer apply.

## Creative calls

- One stage for the whole live part: the app runs in a browser window on the launch film's paper ground, and the header (eyebrow and Geist Pixel title) and chapter stepper change per beat. The ground never cuts. Inside the window, recordings cut hard, the way a screen recording does.
- The camera starts each new screen wide and pushes in on the part the voice talks about (the criterion drawer, the trace, the scoring rail), since the app's own type is small at 1080p.
- Every sped-up shot carries an `N× speed` chip (1.4× to 9×). The address bar shows the real localhost URL; judge and form tokens are cut short.
- The proof beat sits right after the verdict: the app and the live server log side by side, then the log fills the stage with a legend naming Token Factory, Sandboxes and Tavily.
- The cold open (0–16.8 s) and end card (last 4.7 s) are cut straight from the launch film's fast render, with their own voice and music. The bed under the live part is the same track (`roundone-bgm.mp3` from 36 s, volume 0.14).

## Measured

- `hyperframes check`: passes. Kept warnings: `nested_media_start_basis_ambiguous` (video timing is local to the tour composition on purpose), `container_overflow` and `panel_out_of_canvas` on the app window (it bleeds off the bottom on purpose, like the launch film's tour), and `text_below_floor` on browser chrome, URL and speed chips (texture rather than reading text; the app's own text is in the footage).
- Audio of the render: no clipping, true peak −2.2 dBTP, −18.6 LUFS integrated. Mean level about −18 dB in the cold open, −21 dB under the scratch voice, −32 dB where only the bed plays, −20 dB on the end card. This was measured, not heard.

## Weakest spots

- The scratch voice: a robotic macOS read, about 3 dB under the cold open. It goes when the Flint read is dropped in (`VOICEOVER.md`).
- The sandbox beat has about 12 s with only music after its line ends, while install and build run at 9×. With the real read, that's the place to add a sentence or trim the 21–96 s shot.
- The judge beat's first shot moves fast (3×) across the project page.
- The app's own rough edges show in the footage: the "To improve" bullets start with ": ", and the old review summary flashes past at 3× before the re-run.

## Not checked

- Phone-width legibility of the footage itself; the app's text is small by nature.
- How the real Flint read fits each beat. `node kit/build.mjs` warns per segment once the files are swapped.
