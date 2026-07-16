"use client";

import { useRef, useState } from "react";
import type { Media } from "@prisma/client";

// Instagram Reels pattern: vertical scroll-snap, autoplay-on-view,
// muted-by-default with tap-to-unmute (matches user expectation from
// IG/TikTok — reduces bounce vs. a plain <video> tag).
export default function PropertyReels({ reels }: { reels: Media[] }) {
  const [mutedIndex, setMutedIndex] = useState<Set<number>>(new Set());
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  if (!reels.length) return null;

  function toggleMute(i: number) {
    setMutedIndex((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  return (
    <div className="mt-6">
      <h2 className="mb-2 text-sm font-medium text-slate-300">Property Reels</h2>
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
        {reels.map((reel, i) => (
          <div
            key={reel.id}
            className="relative aspect-[9/16] w-48 shrink-0 snap-start overflow-hidden rounded-xl bg-slate-900"
          >
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={reel.url}
              muted={!mutedIndex.has(i)}
              loop
              playsInline
              autoPlay
              className="h-full w-full object-cover"
            />
            <button
              onClick={() => toggleMute(i)}
              className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-1 text-xs text-white"
            >
              {mutedIndex.has(i) ? "🔊" : "🔇"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
