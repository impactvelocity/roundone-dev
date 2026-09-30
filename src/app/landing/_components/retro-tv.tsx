import { BrandMark } from "@/components/brand-mark";
import { PixelIcon } from "@/components/pixel-icon";
import { brand } from "@/lib/branding";
import { YouTubeFrame } from "./demo-video";

/** A four-point pixel star: the big one from the Pixel Icon Library's solid sparkles (CC BY 4.0). */
function Twinkle({ className, delay }: { className: string; delay?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="1 4 16 16"
      fill="currentColor"
      shapeRendering="crispEdges"
      className={`twinkle ${className}`}
      style={delay ? { animationDelay: delay } : undefined}
    >
      <polygon points="17 11 17 13 15 13 15 14 13 14 13 15 12 15 12 16 11 16 11 18 10 18 10 20 8 20 8 18 7 18 7 16 6 16 6 15 5 15 5 14 3 14 3 13 1 13 1 11 3 11 3 10 5 10 5 9 6 9 6 8 7 8 7 6 8 6 8 4 10 4 10 6 11 6 11 8 12 8 12 9 13 9 13 10 15 10 15 11 17 11" />
    </svg>
  );
}

/**
 * The promo video on a retro TV: a chunky set with a nameplate, speaker,
 * runtime readout and knobs under the screen. The picture switches on like a CRT once the set has risen into
 * place (see .tv-power in landing.css).
 */
export function RetroTv({ youtubeId, title, runtime }: { youtubeId: string; title: string; runtime: string }) {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* Sparkles hang off the corners. Phones don't have the gutter for them. */}
      <Twinkle className="absolute -top-6 -right-3 hidden size-8 text-[#fbbf24] sm:block" />
      <Twinkle className="absolute -top-10 right-14 hidden size-4 text-[#d946ef] sm:block" delay="0.8s" />
      <Twinkle className="absolute -bottom-5 -left-3 hidden size-6 text-[#fb7a3c] sm:block" delay="1.6s" />

      <div className="tv">
        <div className="tv-screen">
          <div className="tv-glass">
            <YouTubeFrame youtubeId={youtubeId} title={title} />
            <span aria-hidden className="tv-power" />
          </div>
        </div>
        <div className="flex items-center gap-3 px-1 pt-2.5 sm:gap-5 sm:px-2 sm:pt-3">
          <span className="flex items-center gap-2">
            <BrandMark className="size-6" badgeClassName="bg-white text-[0.55rem] text-[var(--screen-deep)]" />
            <span className="display text-sm tracking-wide text-[var(--on-dark)]">{brand.name}</span>
          </span>
          <span aria-hidden className="tv-grille hidden flex-1 sm:block" />
          <span className="tv-lcd display ml-auto sm:ml-0">
            <PixelIcon name="play" size={9} />
            <span className="sr-only">Runtime </span>
            {runtime}
          </span>
          <span aria-hidden className="flex items-center gap-2.5">
            <span className="tv-knob -rotate-45" />
            <span className="tv-knob rotate-[70deg]" />
          </span>
          <span aria-hidden className="live-dot size-2 shrink-0 rounded-full bg-[#f43f5e] shadow-[0_0_10px_2px_rgba(244,63,94,0.7)]" />
        </div>
      </div>
    </div>
  );
}
