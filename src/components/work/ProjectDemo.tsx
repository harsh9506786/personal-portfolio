import Image from "next/image";
import type { ProjectDemo as Demo } from "@/types";

/** Short looping preview. Videos are muted + inline so they autoplay on phones too. */
export function ProjectDemo({ demo, name }: { demo: Demo; name: string }) {
  return (
    <figure className="mx-auto max-w-4xl">
      <div className="overflow-hidden rounded-2xl border-2 border-ink bg-ink shadow-[6px_6px_0_0_var(--color-ink)]">
        {demo.kind === "video" ? (
          <video
            src={demo.src}
            poster={demo.poster}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label={`${name} demo`}
            className="block h-auto w-full"
          />
        ) : (
          <Image
            src={demo.src}
            alt={`${name} demo`}
            width={1280}
            height={720}
            unoptimized
            className="block h-auto w-full"
          />
        )}
      </div>
      {demo.caption && (
        <figcaption className="mt-3 text-center text-sm text-mute">{demo.caption}</figcaption>
      )}
    </figure>
  );
}
