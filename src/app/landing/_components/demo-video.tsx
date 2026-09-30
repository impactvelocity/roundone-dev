import Image from "next/image";
import { PixelIcon } from "@/components/pixel-icon";
import { CornerMarks } from "./corner-marks";

/** A YouTube player that fills its positioned parent. */
export function YouTubeFrame({ youtubeId, title }: { youtubeId: string; title: string }) {
  return (
    <iframe
      className="absolute inset-0 h-full w-full"
      src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );
}

/**
 * The demo video in a framed 16:9 player. With no YouTube id yet it shows a
 * placeholder on the night-city art, so the section holds its shape until
 * the real video is ready.
 */
export function DemoVideo({ youtubeId, title }: { youtubeId: string | null; title: string }) {
  return (
    <CornerMarks className="mx-auto max-w-4xl">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[var(--screen-deep)]">
        {youtubeId ? (
          <YouTubeFrame youtubeId={youtubeId} title={title} />
        ) : (
          <>
            <Image src="/landing/retro-footer.webp" alt="" fill sizes="(min-width: 896px) 896px, 100vw" className="object-cover" />
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_45%,rgba(21,12,46,0.55),transparent_80%)]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 text-center">
              <span className="btn-arcade pointer-events-none !px-5 !py-4" aria-hidden>
                <PixelIcon name="play" size={22} />
              </span>
              <span className="display text-lg text-white sm:text-2xl">Demo video coming soon</span>
            </div>
          </>
        )}
      </div>
    </CornerMarks>
  );
}
