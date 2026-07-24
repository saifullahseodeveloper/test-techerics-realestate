"use client";

import { useState } from "react";
import Link from "next/link";

export default function BulkSiteScraperPage() {
  const [masterUrl, setMasterUrl] = useState("");
  const [isExecutingMaster, setIsExecutingMaster] = useState(false);
  const [masterResult, setMasterResult] = useState<any>(null);

  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [discoveredUrls, setDiscoveredUrls] = useState<string[]>([]);
  const [selectedUrls, setSelectedUrls] = useState<Set<string>>(new Set());

  const [isImporting, setIsImporting] = useState(false);
  const [importedResults, setImportedResults] = useState<{ slug: string; title: string }[]>([]);
  const [message, setMessage] = useState("");

  // Master Autonomous Execution Command
  async function handleMasterExecute(e: React.FormEvent) {
    e.preventDefault();
    if (!masterUrl) return;

    setIsExecutingMaster(true);
    setMessage("");
    setMasterResult(null);

    try {
      const res = await fetch("/api/admin/scraper/master", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUrl: masterUrl }),
      });

      const data = await res.json();
      setIsExecutingMaster(false);

      if (data.success) {
        setMasterResult(data);
        setMessage(`Master Command executed successfully! Created ${data.createdPropertiesCount} Master Listings and Merged ${data.mergedDuplicatesCount} Duplicates.`);
      } else {
        setMessage(data.error || "Master command execution failed.");
      }
    } catch (err) {
      console.error(err);
      setIsExecutingMaster(false);
      setMessage("Master Command execution failed.");
    }
  }

  // Mode 1: Discover listing URLs from website
  async function handleDiscover(e: React.FormEvent) {
    e.preventDefault();
    if (!websiteUrl) return;

    setIsDiscovering(true);
    setMessage("");
    setDiscoveredUrls([]);
    setSelectedUrls(new Set());
    setImportedResults([]);

    try {
      const res = await fetch("/api/admin/scraper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "discover", url: websiteUrl }),
      });

      const data = await res.json();
      setIsDiscovering(false);

      if (data.success && data.urls?.length) {
        setDiscoveredUrls(data.urls);
        setSelectedUrls(new Set(data.urls));
        setMessage(`Found ${data.urls.length} property listing URLs on target website!`);
      } else {
        setMessage(data.error || "No listing URLs found on target website.");
      }
    } catch (err) {
      console.error(err);
      setIsDiscovering(false);
      setMessage("Failed to discover website links.");
    }
  }

  function toggleUrl(url: string) {
    const next = new Set(selectedUrls);
    if (next.has(url)) next.delete(url);
    else next.add(url);
    setSelectedUrls(next);
  }

  function toggleAll() {
    if (selectedUrls.size === discoveredUrls.length) {
      setSelectedUrls(new Set());
    } else {
      setSelectedUrls(new Set(discoveredUrls));
    }
  }

  // Mode 2: Bulk Scrape, AI Rewrite & Import
  async function handleBulkImport() {
    const urlsToImport = Array.from(selectedUrls);
    if (!urlsToImport.length) return;

    setIsImporting(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/scraper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "import", urls: urlsToImport }),
      });

      const data = await res.json();
      setIsImporting(false);

      if (data.success && data.properties?.length) {
        setImportedResults(data.properties);
        setMessage(`Successfully scraped, AI rewritten, and imported ${data.properties.length} properties to website!`);
      } else {
        setMessage(data.error || "Bulk import completed with errors.");
      }
    } catch (err) {
      console.error(err);
      setIsImporting(false);
      setMessage("Bulk import failed.");
    }
  }

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="glass-panel rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
                ⚡ AI Master Autonomous Real Estate Engine
              </span>
              <span className="rounded-full bg-teal-500/20 px-3 py-0.5 text-[10px] font-extrabold text-teal-300 border border-teal-500/30">
                14-POINT SPECIFICATION SYSTEM
              </span>
            </div>
            <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-4xl">
              AI Autonomous Ingestion Operating System
            </h1>
            <p className="mt-2 text-xs text-slate-400 max-w-3xl">
              Crawls target sites, runs AI Duplicate Fingerprinting, performs E-E-A-T SEO rewriting, calculates investment yields, and builds an interconnected 100+ link Spider-Mesh Knowledge Graph!
            </p>
          </div>
        </div>

        {message && (
          <div className="mt-4 rounded-xl border border-teal-500/30 bg-teal-500/10 p-3 text-xs font-bold text-teal-300 text-center">
            {message}
          </div>
        )}
      </div>

      {/* AI Master Command Console Box */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-teal-500/30">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🤖</span>
          <div>
            <h2 className="font-serif text-xl font-bold text-white">AI Master Autonomous Command Engine</h2>
            <p className="text-xs text-slate-400">
              Single command whole-site ingestion: Crawl, Deduplicate, Valuation Score, E-E-A-T Rewrite, and Knowledge Graph Linking.
            </p>
          </div>
        </div>

        <form onSubmit={handleMasterExecute} className="mt-4 flex flex-col sm:flex-row gap-3">
          <input
            type="url"
            value={masterUrl}
            onChange={(e) => setMasterUrl(e.target.value)}
            required
            placeholder="Scrape https://example.com and convert it into a production-ready SEO-optimized listing ecosystem"
            className="flex-1 rounded-xl border border-teal-500/40 bg-slate-900 px-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:border-teal-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isExecutingMaster}
            className="rounded-xl bg-gradient-to-r from-teal-400 via-emerald-400 to-amber-400 px-6 py-3 text-xs font-extrabold text-slate-950 shadow-lg shadow-teal-500/20 hover:opacity-90 disabled:opacity-50"
          >
            {isExecutingMaster ? "Executing Master Command..." : "⚡ Execute Master Command"}
          </button>
        </form>
      </div>

      {/* Master Autonomous Results Card */}
      {masterResult && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border border-emerald-500/40">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="font-serif text-xl font-bold text-white">🎉 Master Autonomous Ingestion Report</h3>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
              Target: {masterResult.targetUrl}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-4 text-center">
            <div className="glass-card rounded-2xl p-4">
              <span className="block text-xs uppercase font-bold text-slate-400">Discovered URLs</span>
              <span className="font-serif text-2xl font-extrabold text-white mt-1 block">{masterResult.totalDiscovered}</span>
            </div>
            <div className="glass-card rounded-2xl p-4">
              <span className="block text-xs uppercase font-bold text-slate-400">Master Properties Created</span>
              <span className="font-serif text-2xl font-extrabold text-teal-400 mt-1 block">{masterResult.createdPropertiesCount}</span>
            </div>
            <div className="glass-card rounded-2xl p-4">
              <span className="block text-xs uppercase font-bold text-slate-400">Duplicates Merged</span>
              <span className="font-serif text-2xl font-extrabold text-amber-300 mt-1 block">{masterResult.mergedDuplicatesCount}</span>
            </div>
            <div className="glass-card rounded-2xl p-4">
              <span className="block text-xs uppercase font-bold text-slate-400">Knowledge Graph Nodes</span>
              <span className="font-serif text-2xl font-extrabold text-emerald-300 mt-1 block">{masterResult.knowledgeGraphNodesCount}</span>
            </div>
          </div>

          {/* Audit Logs Terminal */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-300 max-h-60 overflow-y-auto space-y-1">
            <span className="text-teal-400 font-bold block mb-2">📋 Execution Audit Terminal:</span>
            {masterResult.logs.map((log: string, idx: number) => (
              <div key={idx} className="leading-relaxed">{log}</div>
            ))}
          </div>
        </div>
      )}

      {/* Manual Link Discovery & Batch Selection Box */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8">
        <h2 className="font-serif text-xl font-bold text-white mb-2">Manual Link Discovery & Batch Selection</h2>
        <p className="text-xs text-slate-400 mb-4">
          Or paste a URL to manually select which specific listing links to import.
        </p>

        <form onSubmit={handleDiscover} className="flex flex-col sm:flex-row gap-3">
          <input
            type="url"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="https://example-realestate-website.com/properties"
            className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:border-teal-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isDiscovering}
            className="rounded-xl bg-slate-800 border border-slate-700 px-6 py-3 text-xs font-bold text-slate-200 hover:bg-slate-700 disabled:opacity-50"
          >
            {isDiscovering ? "Discovering Links..." : "🔍 Discover Links"}
          </button>
        </form>
      </div>

      {/* Discovered URLs Grid & Selection Controls */}
      {discoveredUrls.length > 0 && (
        <div className="glass-panel rounded-3xl p-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-white">
                Select Listings to Import ({selectedUrls.size} / {discoveredUrls.length})
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleAll}
                className="rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800"
              >
                {selectedUrls.size === discoveredUrls.length ? "Deselect All" : "Select All"}
              </button>

              <button
                onClick={handleBulkImport}
                disabled={isImporting || selectedUrls.size === 0}
                className="rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 px-6 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-teal-500/20 hover:opacity-90 disabled:opacity-50"
              >
                {isImporting ? "Scraping & Rewriting..." : `⚡ Import Selected (${selectedUrls.size})`}
              </button>
            </div>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
            {discoveredUrls.map((url, idx) => {
              const isSelected = selectedUrls.has(url);
              return (
                <div
                  key={idx}
                  onClick={() => toggleUrl(url)}
                  className={`flex items-center justify-between rounded-xl p-3 text-xs border cursor-pointer transition ${
                    isSelected
                      ? "border-teal-500/40 bg-teal-500/10 text-white"
                      : "border-slate-800 bg-slate-900/60 text-slate-400 hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="rounded border-slate-700 bg-slate-800 text-teal-500 focus:ring-0"
                    />
                    <span className="truncate font-mono">{url}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase text-teal-400 shrink-0 ml-2">Listing {idx + 1}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Imported Results List */}
      {importedResults.length > 0 && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8">
          <h2 className="font-serif text-xl font-bold text-white mb-4">
            🎉 Imported Properties ({importedResults.length})
          </h2>

          <div className="space-y-3">
            {importedResults.map((p, i) => (
              <div key={i} className="flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
                <div>
                  <span className="text-xs font-bold text-white block">{p.title}</span>
                  <span className="text-[11px] text-emerald-400 font-mono">Slug: /{p.slug}</span>
                </div>
                <Link
                  href={`/en/property/${p.slug}`}
                  target="_blank"
                  className="rounded-xl bg-teal-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-teal-400 transition"
                >
                  View Live Property Page →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
