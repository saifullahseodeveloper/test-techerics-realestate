"use client";

import { useState } from "react";
import Link from "next/link";

export default function BulkSiteScraperPage() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [discoveredUrls, setDiscoveredUrls] = useState<string[]>([]);
  const [selectedUrls, setSelectedUrls] = useState<Set<string>>(new Set());

  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState({ current: 0, total: 0 });
  const [importedResults, setImportedResults] = useState<{ slug: string; title: string }[]>([]);
  const [message, setMessage] = useState("");

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
        setSelectedUrls(new Set(data.urls)); // Select all by default
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

  // Toggle URL selection
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
    setImportProgress({ current: 0, total: urlsToImport.length });
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
                🌐 Automated AI Ingestion Engine
              </span>
              <span className="rounded-full bg-teal-500/20 px-3 py-0.5 text-[10px] font-extrabold text-teal-300 border border-teal-500/30">
                WHOLE-SITE BULK SCRAPER & REWRITER
              </span>
            </div>
            <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-4xl">
              Real Estate Website Scraper
            </h1>
            <p className="mt-2 text-xs text-slate-400 max-w-2xl">
              Paste any real estate portal or sitemap URL. The system automatically discovers all property links, scrapes facts, rewrites titles & descriptions with AI for 100% original content, and auto-publishes to your database!
            </p>
          </div>
        </div>

        {message && (
          <div className="mt-4 rounded-xl border border-teal-500/30 bg-teal-500/10 p-3 text-xs font-bold text-teal-300 text-center">
            {message}
          </div>
        )}
      </div>

      {/* Website Link Discovery Box */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8">
        <h2 className="font-serif text-xl font-bold text-white mb-2">Step 1: Enter Target Website or Sitemap URL</h2>
        <p className="text-xs text-slate-400 mb-4">
          Provide a homepage (e.g. <span className="font-mono text-slate-200">https://magicbricks.com</span>), sitemap (<span className="font-mono text-slate-200">/sitemap.xml</span>), or catalog category link.
        </p>

        <form onSubmit={handleDiscover} className="flex flex-col sm:flex-row gap-3">
          <input
            type="url"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            required
            placeholder="https://example-realestate-website.com/properties"
            className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:border-teal-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isDiscovering}
            className="rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 px-6 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-teal-500/20 hover:opacity-90 disabled:opacity-50"
          >
            {isDiscovering ? "Discovering Links..." : "🔍 Discover All Website Listings"}
          </button>
        </form>
      </div>

      {/* Discovered URLs Grid & Selection Controls */}
      {discoveredUrls.length > 0 && (
        <div className="glass-panel rounded-3xl p-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-white">
                Step 2: Select Listings to Scrape & AI Rewrite ({selectedUrls.size} / {discoveredUrls.length})
              </h2>
              <p className="text-xs text-slate-400">All selected listings will be scraped, AI rewritten, and imported in bulk.</p>
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
                {isImporting ? "Scraping & AI Rewriting..." : `⚡ 1-Click Bulk Scrape & Publish (${selectedUrls.size})`}
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
            🎉 Successfully Imported & AI Rewritten Properties ({importedResults.length})
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
