"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [purpose, setPurpose] = useState<"SALE" | "RENT">("SALE");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}&purpose=${purpose}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="mx-auto flex max-w-2xl flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-3 backdrop-blur sm:flex-row"
    >
      <div className="flex gap-1 rounded-lg bg-slate-800 p-1 text-sm">
        {(["SALE", "RENT"] as const).map((p) => (
          <button
            type="button"
            key={p}
            onClick={() => setPurpose(p)}
            className={`rounded-md px-3 py-1.5 transition ${
              purpose === p
                ? "bg-teal-500 text-slate-950"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {p === "SALE" ? "Buy" : "Rent"}
          </button>
        ))}
      </div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search city, locality, or project..."
        className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 placeholder:text-slate-500"
      />
      <button
        type="submit"
        className="rounded-lg bg-violet-500 px-5 py-2 font-medium text-white hover:bg-violet-400"
      >
        Search
      </button>
    </form>
  );
}
