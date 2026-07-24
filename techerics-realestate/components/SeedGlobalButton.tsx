"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SeedGlobalButton() {
  const router = useRouter();
  const [seeding, setSeeding] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSeed() {
    if (!confirm("Are you sure you want to clear ALL existing properties and re-seed 10 property types for EVERY country?")) {
      return;
    }

    setSeeding(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/seed-global", { method: "POST" });
      const data = await res.json();
      setSeeding(false);

      if (data.success) {
        setMessage(`Success! Created ${data.createdCount} properties across all countries.`);
        router.refresh();
      } else {
        setMessage(data.error || "Failed to seed properties.");
      }
    } catch (err) {
      console.error(err);
      setSeeding(false);
      setMessage("Failed to trigger global seed.");
    }
  }

  return (
    <div className="flex items-center gap-3">
      {message && <span className="text-xs text-emerald-400 font-bold">{message}</span>}
      <button
        onClick={handleSeed}
        disabled={seeding}
        className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2.5 text-xs font-bold text-rose-300 hover:bg-rose-500/20 disabled:opacity-50 transition"
      >
        {seeding ? "Wiping & Seeding All Countries..." : "🔥 1-Click Clear & Seed All Countries"}
      </button>
    </div>
  );
}
