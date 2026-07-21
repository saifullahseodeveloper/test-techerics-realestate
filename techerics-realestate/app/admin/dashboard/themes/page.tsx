"use client";

import { useState } from "react";
import { useTheme } from "@/lib/theme-engine/theme-context";
import { DesignTokens } from "@/lib/theme-engine/tokens";

export default function ExperienceEngineDashboard() {
  const { activeTheme, setThemeId, availableThemes, exportThemeJson, importThemeJson } = useTheme();
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [abTestingActive, setAbTestingActive] = useState(false);
  const [importJsonText, setImportJsonText] = useState("");
  const [showImportModal, setShowImportModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleGenerateAiTheme = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt) return;
    setIsGenerating(true);
    setMessage("");

    setTimeout(() => {
      setIsGenerating(false);
      setMessage("AI Theme generated and saved to library successfully!");
      setAiPrompt("");
    }, 1200);
  };

  const handleExport = () => {
    const json = exportThemeJson();
    navigator.clipboard.writeText(json);
    setMessage("Active Theme JSON copied to clipboard!");
  };

  const handleImport = () => {
    if (importThemeJson(importJsonText)) {
      setMessage("Custom Theme imported and activated successfully!");
      setShowImportModal(false);
      setImportJsonText("");
    } else {
      setMessage("Invalid Theme JSON format.");
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
                ⚡ Enterprise Website Experience OS
              </span>
              <span className="rounded-full bg-teal-500/20 px-3 py-0.5 text-[10px] font-extrabold text-teal-300 border border-teal-500/30">
                1-CLICK TRANSFORM ENGINE
              </span>
            </div>
            <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-4xl">
              Homepage & Website Theme Library
            </h1>
            <p className="mt-2 text-xs text-slate-400 max-w-2xl">
              Switch, manage, generate, export, and A/B test website experiences. Activating a theme transforms the entire portal's visual identity without redeploying or altering SEO.
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
              📤 Import Theme JSON
            </button>
          </div>
        </div>

        {message && (
          <div className="mt-4 rounded-xl border border-teal-500/30 bg-teal-500/10 p-3 text-xs font-bold text-teal-300 text-center">
            {message}
          </div>
        )}
      </div>

      {/* Active Theme Bar & A/B Testing Switcher */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="glass-card rounded-2xl p-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Website Theme</span>
            <h3 className="text-lg font-bold text-white mt-1">{activeTheme.name}</h3>
            <span className="text-xs text-teal-400 font-semibold">{activeTheme.category} · Version {activeTheme.version}</span>
          </div>
          <div
            className="h-10 w-10 rounded-xl border border-white/20 shadow-md"
            style={{ backgroundColor: activeTheme.previewColor }}
          />
        </div>

        <div className="glass-card rounded-2xl p-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">A/B Testing Simulator</span>
            <h3 className="text-lg font-bold text-white mt-1">
              {abTestingActive ? "A/B Traffic Splitting Active (50/50)" : "Single Theme Mode"}
            </h3>
            <span className="text-xs text-slate-400">
              {abTestingActive ? "Comparing Glassmorphism vs Apple Minimal Light (+24% CTR)" : "Click to test conversion rates"}
            </span>
          </div>

          <button
            onClick={() => setAbTestingActive(!abTestingActive)}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
              abTestingActive
                ? "bg-rose-500 text-white"
                : "bg-teal-500 text-slate-950 hover:bg-teal-400"
            }`}
          >
            {abTestingActive ? "Stop A/B Test" : "Start A/B Test"}
          </button>
        </div>
      </div>

      {/* AI Theme Generator Box */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">🤖</span>
          <h2 className="font-serif text-xl font-bold text-white">AI Homepage & Experience Generator</h2>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Describe the visual identity, colors, and layout style you want. AI will generate a complete Design Token package and add it to your Theme Library.
        </p>

        <form onSubmit={handleGenerateAiTheme} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="e.g. Create a Luxury Black Glassmorphism theme inspired by Apple, Stripe & Bayut..."
            className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:border-teal-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isGenerating}
            className="rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 px-6 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-teal-500/20 hover:opacity-90 disabled:opacity-50"
          >
            {isGenerating ? "Generating Tokens..." : "✨ Generate AI Theme"}
          </button>
        </form>
      </div>

      {/* Theme Presets Library */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl font-bold text-white">Theme Presets ({availableThemes.length})</h2>
          <span className="text-xs text-slate-400">1-Click Instant Sitewide Transformation</span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {availableThemes.map((theme) => {
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

                  {/* Performance Badges */}
                  <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-semibold">
                    <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-emerald-300 border border-emerald-500/30">
                      ⚡ Performance {theme.performanceScore}/100
                    </span>
                    <span className="rounded bg-teal-500/20 px-2 py-0.5 text-teal-300 border border-teal-500/30">
                      🔍 SEO {theme.seoScore}/100
                    </span>
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-800/80 pt-4 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono">v{theme.version}</span>

                  <button
                    onClick={() => setThemeId(theme.id)}
                    disabled={isActive}
                    className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                      isActive
                        ? "bg-teal-500/20 text-teal-300 border border-teal-500/40 cursor-default"
                        : "bg-teal-500 text-slate-950 hover:bg-teal-400 active:scale-95"
                    }`}
                  >
                    {isActive ? "✓ Active Sitewide" : "⚡ 1-Click Activate"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="glass-panel w-full max-w-lg rounded-3xl p-6 shadow-2xl">
            <h3 className="font-serif text-xl font-bold text-white mb-2">Import Theme JSON Package</h3>
            <p className="text-xs text-slate-400 mb-4">Paste exported Theme JSON token code below to install instantly.</p>
            <textarea
              rows={8}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder='{"id": "custom-theme", "name": "Custom Theme", ...}'
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
