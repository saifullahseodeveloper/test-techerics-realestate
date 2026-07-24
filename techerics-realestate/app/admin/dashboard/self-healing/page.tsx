"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AiSelfHealingPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [audits, setAudits] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAudits();
  }, []);

  async function fetchAudits() {
    try {
      const res = await fetch("/api/admin/self-healing");
      const data = await res.json();
      if (data.success) {
        setAudits(data.audits || []);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleTriggerAudit() {
    setIsScanning(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/self-healing", { method: "POST" });
      const data = await res.json();
      setIsScanning(false);

      if (data.success) {
        setSummary(data.summary);
        setMessage(`Site-Wide Audit Complete! Health Score: ${data.summary.healthScore}%. Auto-fixed ${data.summary.autoFixedCount} issues.`);
        fetchAudits();
      } else {
        setMessage(data.error || "Audit scan failed.");
      }
    } catch (err) {
      console.error(err);
      setIsScanning(false);
      setMessage("Failed to run self-healing scan.");
    }
  }

  async function handleAction(auditId: string, action: "approve" | "reject" | "toggleLock") {
    try {
      const res = await fetch("/api/admin/self-healing", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auditId, action }),
      });
      const data = await res.json();
      if (data.success) {
        fetchAudits();
      }
    } catch (err) {
      console.error(err);
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
                🛡️ Autonomous SEO & Content Engineer
              </span>
              <span className="rounded-full bg-emerald-500/20 px-3 py-0.5 text-[10px] font-extrabold text-emerald-300 border border-emerald-500/30">
                SELF-HEALING OPTIMIZATION OS
              </span>
            </div>
            <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-4xl">
              AI Self-Healing & Approval Workflow
            </h1>
            <p className="mt-2 text-xs text-slate-400 max-w-3xl">
              Continuously scans pages for thin content, weak SEO titles, and missing schema. Auto-applies high-confidence fixes (&gt;90%) while allowing 1-click admin approval and field locking immunity!
            </p>
          </div>

          <button
            onClick={handleTriggerAudit}
            disabled={isScanning}
            className="rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 px-6 py-3.5 text-xs font-extrabold text-slate-950 shadow-lg shadow-teal-500/20 hover:opacity-90 disabled:opacity-50"
          >
            {isScanning ? "Scanning Entire Site..." : "🛡️ Trigger Site-Wide Self-Healing Audit"}
          </button>
        </div>

        {message && (
          <div className="mt-4 rounded-xl border border-teal-500/30 bg-teal-500/10 p-3 text-xs font-bold text-teal-300 text-center">
            {message}
          </div>
        )}
      </div>

      {/* Health Audit KPI Scorecard */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="glass-panel rounded-3xl p-6 text-center border border-teal-500/30">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Site Health Index</span>
          <span className="font-serif text-3xl font-extrabold text-teal-400 mt-2 block">
            {summary ? `${summary.healthScore}%` : "94%"}
          </span>
          <span className="text-[10px] font-bold text-emerald-400 mt-1 block">Optimal SEO Health</span>
        </div>

        <div className="glass-panel rounded-3xl p-6 text-center border border-emerald-500/30">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Auto-Fixed Issues</span>
          <span className="font-serif text-3xl font-extrabold text-emerald-300 mt-2 block">
            {summary ? summary.autoFixedCount : audits.filter((a) => a.status === "AUTO_APPLIED").length}
          </span>
          <span className="text-[10px] font-bold text-slate-500 mt-1 block">High Confidence (&gt;90%)</span>
        </div>

        <div className="glass-panel rounded-3xl p-6 text-center border border-amber-500/30">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Pending Admin Review</span>
          <span className="font-serif text-3xl font-extrabold text-amber-300 mt-2 block">
            {summary ? summary.pendingReviewCount : audits.filter((a) => a.status === "PENDING").length}
          </span>
          <span className="text-[10px] font-bold text-amber-400 mt-1 block">Requires 1-Click Review</span>
        </div>

        <div className="glass-panel rounded-3xl p-6 text-center border border-slate-700">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Locked Fields</span>
          <span className="font-serif text-3xl font-extrabold text-slate-200 mt-2 block">
            {audits.filter((a) => a.isLocked).length}
          </span>
          <span className="text-[10px] font-bold text-slate-500 mt-1 block">Protected Immunity Fields</span>
        </div>
      </div>

      {/* AI Approval Workflow & Audit Log Table */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 overflow-hidden">
        <h2 className="font-serif text-xl font-bold text-white mb-4">
          AI Optimization Recommendations & Approval Workflow ({audits.length})
        </h2>

        {audits.length === 0 ? (
          <div className="text-center py-12 text-xs text-slate-400">
            No pending audits. Click "Trigger Site-Wide Self-Healing Audit" above to scan all pages!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                  <th className="py-3 px-4">Page / Target URL</th>
                  <th className="py-3 px-4">Optimization Type</th>
                  <th className="py-3 px-4">Confidence Score</th>
                  <th className="py-3 px-4">Original vs AI Suggestion</th>
                  <th className="py-3 px-4">Status & Field Lock</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {audits.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/50 transition">
                    <td className="py-3.5 px-4">
                      <Link href={item.pageUrl} target="_blank" className="font-mono text-teal-400 hover:underline">
                        {item.pageUrl}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-200">{item.type}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold border ${
                          item.confidenceScore >= 90
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                            : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                        }`}
                      >
                        {item.confidenceScore}% Confidence
                      </span>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate">
                      <div className="text-[11px] text-slate-400 line-through truncate">{item.originalValue || "N/A"}</div>
                      <div className="text-xs text-white font-semibold truncate">{item.suggestedValue}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            item.status === "AUTO_APPLIED"
                              ? "bg-teal-500/20 text-teal-300"
                              : item.status === "APPROVED"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : item.status === "REJECTED"
                              ? "bg-rose-500/20 text-rose-300"
                              : "bg-amber-500/20 text-amber-300"
                          }`}
                        >
                          {item.status}
                        </span>

                        {item.isLocked && (
                          <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                            🔒 Locked
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      {item.status === "PENDING" && (
                        <>
                          <button
                            onClick={() => handleAction(item.id, "approve")}
                            className="rounded-lg bg-emerald-500 px-3 py-1 text-[11px] font-bold text-slate-950 hover:bg-emerald-400"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction(item.id, "reject")}
                            className="rounded-lg bg-rose-500/20 border border-rose-500/30 px-3 py-1 text-[11px] font-bold text-rose-300 hover:bg-rose-500/30"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => handleAction(item.id, "toggleLock")}
                        className="rounded-lg bg-slate-800 border border-slate-700 px-2.5 py-1 text-[10px] font-bold text-slate-300 hover:bg-slate-700"
                      >
                        {item.isLocked ? "Unlock Field" : "🔒 Lock Field"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
