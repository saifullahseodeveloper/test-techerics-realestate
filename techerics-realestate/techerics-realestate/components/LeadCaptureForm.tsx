"use client";

import { useState } from "react";

export default function LeadCaptureForm({ propertyId }: { propertyId: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);

    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        propertyId,
        name: form.get("name"),
        phone: form.get("phone"),
        message: form.get("message"),
      }),
    });
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-teal-700 bg-teal-950/30 p-4 text-sm text-teal-300">
        Thanks! We'll contact you shortly on WhatsApp / phone.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky top-20 rounded-xl border border-slate-800 bg-slate-900 p-4"
    >
      <h3 className="mb-3 font-medium text-slate-100">Interested? Enquire now</h3>
      <input
        name="name"
        required
        placeholder="Your name"
        className="mb-2 w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-sm text-slate-100"
      />
      <input
        name="phone"
        required
        placeholder="Phone number"
        className="mb-2 w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-sm text-slate-100"
      />
      <textarea
        name="message"
        placeholder="Message (optional)"
        className="mb-3 w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-sm text-slate-100"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-md bg-teal-500 py-2 text-sm font-medium text-slate-950 hover:bg-teal-400 disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}
