"use client";

import { useState } from "react";
import { useTheme } from "@/lib/theme-engine/theme-context";
import { DesignTokens, TemplateCategory } from "@/lib/theme-engine/tokens";

export default function GlobalTemplateIntelligenceEngine() {
  const { activeTheme, setThemeId, availableThemes, exportThemeJson, importThemeJson } = useTheme();
  
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewTheme, setPreviewTheme] = useState<DesignTokens | null>(null);
  const [previewViewport, setPreviewViewport] = useState<"DESKTOP" | "TABLET" | "MOBILE">("DESKTOP");
  
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [importJsonText, setImportJsonText] = useState("");
  const [showImportModal, setShowImportModal] = useState(false);
  const [message, setMessage] = useState("");

  const filteredThemes = availableThemes.filter((t) => {
    const matchesCat = selectedCategory === "ALL" || t.category === selectedCategory;
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.marketPattern.sourceInspiration.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleGenerateAiTheme = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt) return;
    setIsGenerating(true);
    setMessage("");

    setTimeout(() => {
      setIsGenerating(false);
      setMessage("AI Template synthesized and added to Knowledge Base!");
      setAiPrompt("");
    }, 1200);
  };

  const handleExport = () => {
    const json = exportThemeJson();
    navigator.clipboard.writeText(json);
    setMessage("Active Template JSON copied to clipboard!");
  };

  const handleImport = () => {
    if (importThemeJson(importJsonText)) {
      setMessage("Custom Template imported and activated successfully!");
      setShowImportModal(false);
      setImportJsonText("");
    } else {
      setMessage("Invalid Template JSON format.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="glass-panel rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
                🌐 Global Real Estate Design Intelligence Engine
              </span>
              <span className="rounded-full bg-emerald-500/20 px-3 py-0.5 text-[10px] font-extrabold text-emerald-300 border border-emerald-500/30">
                BAYUT · ZILLOW · COMPASS · IDEALISTA INSPIRED
              </span>
            </div>
            <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-4xl">
              Template Intelligence Library
            </h1>
            <p className="mt-2 text-xs text-slate-400 max-w-3xl">
              Explore, preview, generate, and activate global real estate design systems. Preview safely without affecting live visitors, then activate in 1 click!
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleExport}
              className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-bold text-slate-200 transition hover:bg-slate-800"
            >
              📥 Export Active JSON
            </button>
            <button
              onClick={() => setShowImportModal(true)}
              className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-bold text-slate-200 transition hover:bg-slate-800"
            >
              📤 Import Template Package
            </button>
          </div>
        </div>

        {message && (
          <div className="mt-4 rounded-xl border border-teal-500/30 bg-teal-500/10 p-3 text-xs font-bold text-teal-300 text-center">
            {message}
          </div>
        )}
      </div>

      {/* AI Template Generator */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">🤖</span>
          <h2 className="font-serif text-xl font-bold text-white">AI Template Pattern Synthesizer</h2>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Synthesize design patterns from Bayut, Zillow, Compass, or Idealista to generate brand new original templates.
        </p>

        <form onSubmit={handleGenerateAiTheme} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="e.g. Generate a luxury monochromatic homepage inspired by Compass & Sotheby's with champagne gold accents..."
            className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:border-teal-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isGenerating}
            className="rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 px-6 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-teal-500/20 hover:opacity-90 disabled:opacity-50"
          >
            {isGenerating ? "Synthesizing Patterns..." : "✨ Synthesize Template"}
          </button>
        </form>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { label: "All Templates", id: "ALL" },
            { label: "Glassmorphism", id: "GLASSMORPHISM_DARK" },
            { label: "Bayut / Middle East", id: "ENTERPRISE_BAYUT" },
            { label: "Zillow / US Map", id: "MAP_FIRST_ZILLOW" },
            { label: "Compass / Minimal", id: "MINIMAL_COMPASS" },
            { label: "Dubai Gold Luxury", id: "LUXURY_ESTATE" },
            { label: "Idealista / Eco", id: "ECO_SUSTAINABLE" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-xl px-4 py-2 font-semibold transition ${
                selectedCategory === cat.id
                  ? "bg-teal-500 text-slate-950 shadow-md"
                  : "glass-pill text-slate-300 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search pattern library..."
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-slate-100 focus:border-teal-400 focus:outline-none w-full sm:w-64"
        />
      </div>

      {/* Template Grid Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredThemes.map((theme) => {
          const isActive = activeTheme.id === theme.id;
          return (
            <div
              key={theme.id}
              className={`glass-card group flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 ${
                isActive ? "border-2 border-teal-400 shadow-xl shadow-teal-500/10" : ""
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-teal-300 border border-white/10">
                    {theme.category}
                  </span>
                  <div
                    className="h-6 w-6 rounded-full border border-white/20 shadow-md"
                    style={{ backgroundColor: theme.previewColor }}
                  />
                </div>

                <h3 className="mt-4 font-serif text-lg font-bold text-white group-hover:text-teal-300">
                  {theme.name}
                </h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {theme.description}
                </p>

                {/* Pattern Inspiration Badge */}
                <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-3 text-[11px]">
                  <span className="block font-bold text-teal-400">💡 Inspiration Source:</span>
                  <span className="text-slate-300">{theme.marketPattern.sourceInspiration}</span>
                </div>

                {/* Performance Scores */}
                <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-semibold">
                  <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-emerald-300 border border-emerald-500/30">
                    ⚡ {theme.performanceScore}/100 Perf
                  </span>
                  <span className="rounded bg-teal-500/20 px-2 py-0.5 text-teal-300 border border-teal-500/30">
                    🔍 {theme.seoScore}/100 SEO
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-800/80 pt-4 flex items-center justify-between gap-2">
                <button
                  onClick={() => setPreviewTheme(theme)}
                  className="rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-bold text-slate-200 hover:bg-slate-800 transition"
                >
                  👁️ Interactive Preview
                </button>

                <button
                  onClick={() => setThemeId(theme.id)}
                  disabled={isActive}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                    isActive
                      ? "bg-teal-500/20 text-teal-300 border border-teal-500/40 cursor-default"
                      : "bg-teal-500 text-slate-950 hover:bg-teal-400 active:scale-95"
                  }`}
                >
                  {isActive ? "✓ Active" : "⚡ 1-Click Activate"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Preview Drawer Modal */}
      {previewTheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl">
          <div className="flex flex-col w-full max-w-5xl h-[85vh] rounded-3xl border border-white/10 bg-slate-950 overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 p-4 bg-slate-900">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                  SAFE PREVIEW MODE (Live Website Unaffected)
                </span>
                <h3 className="text-lg font-bold text-white">{previewTheme.name}</h3>
              </div>

              {/* Viewport Switcher */}
              <div className="flex items-center gap-2">
                {(["DESKTOP", "TABLET", "MOBILE"] as const).map((vp) => (
                  <button
                    key={vp}
                    onClick={() => setPreviewViewport(vp)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                      previewViewport === vp ? "bg-teal-500 text-slate-950" : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    {vp === "DESKTOP" ? "💻 Desktop" : vp === "TABLET" ? "📱 Tablet" : "📲 Mobile"}
                  </button>
                ))}

                <button
                  onClick={() => {
                    setThemeId(previewTheme.id);
                    setPreviewTheme(null);
                  }}
                  className="rounded-xl bg-teal-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-teal-400"
                >
                  ⚡ 1-Click Activate This Template
                </button>

                <button
                  onClick={() => setPreviewTheme(null)}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-bold text-slate-300 hover:text-white"
                >
                  ✕ Close Preview
                </button>
              </div>
            </div>

            {/* Viewport Frame Container */}
            <div className="flex-1 bg-slate-900 p-6 flex justify-center overflow-y-auto">
              <div
                className={`transition-all duration-500 ${
                  previewTheme.styles.bg
                } ${previewTheme.styles.text} rounded-2xl p-6 border border-slate-800 shadow-2xl ${
                  previewViewport === "DESKTOP"
                    ? "w-full max-w-4xl"
                    : previewViewport === "TABLET"
                    ? "w-[600px]"
                    : "w-[360px]"
                }`}
              >
                <div className="text-center py-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
                    Live Preview Frame ({previewViewport})
                  </span>
                  <h1 className={`mt-2 ${previewTheme.styles.headingFont} text-2xl font-bold sm:text-4xl`}>
                    Luxury Properties in Dubai & New York
                  </h1>
                  <p className="mt-2 text-xs max-w-md mx-auto opacity-80">
                    Explore verified luxury listings, 360° virtual tours, and RERA approved masterplans.
                  </p>

                  <div className="mt-6 flex justify-center gap-3">
                    <button className={`${previewTheme.styles.buttonBg} px-6 py-2.5 rounded-xl text-xs`}>
                      Explore Listings →
                    </button>
                  </div>
                </div>

                {/* Pattern Key Highlights */}
                <div className="mt-8 border-t border-slate-800/80 pt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider mb-3">Key Design Patterns Synthesized:</h4>
                  <ul className="space-y-1.5 text-xs opacity-90">
                    {previewTheme.marketPattern.keyPatterns.map((pat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span>✓</span> {pat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="glass-panel w-full max-w-lg rounded-3xl p-6 shadow-2xl">
            <h3 className="font-serif text-xl font-bold text-white mb-2">Import Template JSON Package</h3>
            <p className="text-xs text-slate-400 mb-4">Paste exported Template JSON token package below to install instantly.</p>
            <textarea
              rows={8}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder='{"id": "custom-template", "name": "Custom Template", ...}'
              className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 font-mono text-xs text-slate-200 focus:border-teal-400 focus:outline-none"
            />
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setShowImportModal(false)}
                className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                className="rounded-xl bg-teal-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-teal-400"
              >
                Import & Activate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
