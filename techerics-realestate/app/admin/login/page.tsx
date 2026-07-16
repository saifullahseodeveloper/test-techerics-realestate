"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
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
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-slate-800 bg-slate-900 p-6"
      >
        <h1 className="mb-1 text-xl font-semibold text-slate-100">Tech Erics Admin</h1>
        <p className="mb-6 text-sm text-slate-400">Login to manage properties</p>

        {error && (
          <p className="mb-4 rounded-md bg-red-950/40 p-2 text-sm text-red-400">{error}</p>
        )}

        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="mb-3 w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-sm text-slate-100"
        />
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          className="mb-4 w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-sm text-slate-100"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-teal-500 py-2 text-sm font-medium text-slate-950 hover:bg-teal-400 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
