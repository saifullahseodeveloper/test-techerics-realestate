"use client";

import { useState } from "react";

type VideoReel = {
  id: string;
  title: string;
  location: string;
  views: string;
  duration: string;
  thumbnail: string;
  videoUrl?: string;
};

const REELS: VideoReel[] = [
  {
    id: "reel-1",
    title: "Inside ₹6.5 Cr Sea View Penthouse Walkthrough",
    location: "Bandra West, Mumbai",
    views: "45.2K views",
    duration: "0:45",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "reel-2",
    title: "Touring a Ultra Luxury Golf Villa in Gurgaon",
    location: "Golf Course Rd, Gurgaon",
    views: "32.8K views",
    duration: "0:58",
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "reel-3",
    title: "Private Infinity Pool Villa Full Video Tour",
    location: "Koregaon Park, Pune",
    views: "28.1K views",
    duration: "0:39",
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "reel-4",
    title: "Prime Commercial Office Space in BKC Tour",
    location: "BKC, Mumbai",
    views: "19.5K views",
    duration: "0:52",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
  },
];

export default function VideoReelsSection() {
  const [activeReel, setActiveReel] = useState<VideoReel | null>(null);

  return (
    <section className="bg-slate-950 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
              Media & Video Tours
            </span>
            <h2 className="mt-1 font-serif text-2xl font-bold text-white sm:text-3xl">
              Tech Erics Property Reels
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              High-definition 4K video walkthroughs and short reels of luxury residences.
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
          >
            Follow on Instagram ↗
          </a>
        </div>

        {/* 4 Vertical 9:16 Video Cards matching reference image */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {REELS.map((reel) => (
            <div
              key={reel.id}
              onClick={() => setActiveReel(reel)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 aspect-[9/16] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-teal-500/60 hover:shadow-2xl"
            >
              {/* Thumbnail image */}
              <img
                src={reel.thumbnail}
                alt={reel.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />

              {/* Play icon overlay in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-500/90 text-slate-950 shadow-lg backdrop-blur transition-transform duration-300 group-hover:scale-110">
                  <svg className="h-5 w-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Top tags */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="rounded-md bg-slate-950/80 px-2 py-0.5 text-[10px] font-semibold text-slate-300 backdrop-blur">
                  📍 {reel.location}
                </span>
                <span className="rounded-md bg-slate-950/80 px-2 py-0.5 text-[10px] font-mono text-teal-400 backdrop-blur">
                  {reel.duration}
                </span>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-3 left-3 right-3">
                <h4 className="text-xs font-semibold text-white line-clamp-2 leading-snug">
                  {reel.title}
                </h4>
                <p className="mt-1 text-[11px] text-teal-400 font-medium">{reel.views}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {activeReel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md"
          onClick={() => setActiveReel(null)}
        >
          <div
            className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveReel(null)}
              className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              ✕
            </button>
            <h3 className="font-semibold text-white text-sm pr-8">{activeReel.title}</h3>
            <p className="text-xs text-teal-400 mt-0.5">{activeReel.location}</p>
            <div className="mt-3 aspect-[9/16] w-full overflow-hidden rounded-xl bg-slate-950">
              <img
                src={activeReel.thumbnail}
                alt={activeReel.title}
                className="h-full w-full object-cover"
              />
            </div>
            <a
              href={`https://wa.me/919876543210?text=I%20want%20to%20know%20more%20about%20${encodeURIComponent(activeReel.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400"
            >
              💬 Enquire about this Property on WhatsApp
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
