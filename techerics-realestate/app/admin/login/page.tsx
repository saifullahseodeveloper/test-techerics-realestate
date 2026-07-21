"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("admin@techerics.com");
  const [password, setPassword] = useState("ChangeMe123!");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/admin/dashboard");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 relative overflow-hidden">
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />

      <form
        onSubmit={handleSubmit}
        className="glass-panel relative z-10 w-full max-w-md rounded-3xl p-8 shadow-2xl"
      >
        <div className="text-center mb-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 font-sans font-black text-slate-950 text-xl shadow-lg shadow-teal-500/20 mb-3">
            TE
          </div>
          <h1 className="font-serif text-2xl font-bold text-white">Tech Erics Enterprise</h1>
          <p className="mt-1 text-xs text-slate-400">Admin & Agent Control Portal</p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs font-bold text-rose-300 text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Admin Email
            </label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@techerics.com"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-teal-500/20 transition hover:opacity-90 active:scale-95 disabled:opacity-50 mt-2"
          >
            {loading ? "Verifying Credentials..." : "Sign In to Admin Portal →"}
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-teal-500/20 bg-teal-500/5 p-4 text-center text-xs text-slate-400">
          <p className="font-bold text-teal-300">Default Credentials Pre-Filled</p>
          <p className="mt-1 text-[11px] text-slate-400">Email: <span className="font-mono text-slate-200">admin@techerics.com</span></p>
          <p className="text-[11px] text-slate-400">Password: <span className="font-mono text-slate-200">ChangeMe123!</span></p>
        </div>
      </form>
    </main>
  );
}
