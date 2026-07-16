"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function ImageLightbox({
  url,
  alt,
  onClose,
  onNext,
  onPrev,
}: {
  url: string;
  alt: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    }
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 text-2xl text-white/80 hover:text-white"
      >
        ✕
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous"
        className="absolute left-4 text-3xl text-white/70 hover:text-white"
      >
        ‹
      </button>
      <div
        className="relative h-[80vh] w-[90vw] max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={url} alt={alt} fill className="object-contain" sizes="90vw" />
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next"
        className="absolute right-4 text-3xl text-white/70 hover:text-white"
      >
        ›
      </button>
    </div>
  );
}
