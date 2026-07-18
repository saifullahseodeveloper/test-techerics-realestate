"use client";

import { useState } from "react";
import Image from "next/image";
import type { Media } from "@prisma/client";
import ImageLightbox from "./ImageLightbox";

export default function PropertyGallery({
  media,
  propertyTitle,
}: {
  media: Media[];
  propertyTitle: string;
}) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!media.length) return null;

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        className="relative block aspect-video w-full cursor-zoom-in overflow-hidden rounded-xl bg-slate-800"
      >
        <Image
          src={media[active].url}
          alt={media[active].altText ?? `${propertyTitle} - photo ${active + 1}`}
          fill
          priority={active === 0}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </button>
      <div className="mt-2 flex gap-2 overflow-x-auto">
        {media.map((m, i) => (
          <button
            key={m.id}
            onClick={() => setActive(i)}
            className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 ${
              i === active ? "border-teal-400" : "border-transparent"
            }`}
          >
            <Image
              src={m.url}
              alt={m.altText ?? `${propertyTitle} thumbnail ${i + 1}`}
              fill
              loading="lazy"
              className="object-cover"
              sizes="96px"
            />
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <ImageLightbox
          url={media[active].url}
          alt={media[active].altText ?? propertyTitle}
          onClose={() => setLightboxOpen(false)}
          onNext={() => setActive((i) => (i + 1) % media.length)}
          onPrev={() => setActive((i) => (i - 1 + media.length) % media.length)}
        />
      )}
    </div>
  );
}
