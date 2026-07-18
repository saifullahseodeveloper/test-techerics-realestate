"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Property, Listing } from "@prisma/client";

export default function EditPropertyForm({
  property,
}: {
  property: Property & { listings: Listing[] };
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);

    await fetch(`/api/admin/properties/${property.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.get("title"),
        description: form.get("description"),
        bedrooms: Number(form.get("bedrooms")) || undefined,
        bathrooms: Number(form.get("bathrooms")) || undefined,
        areaSqft: Number(form.get("areaSqft")) || undefined,
        price: Number(form.get("price")) || undefined,
      }),
    });

    setSaving(false);
    router.push("/admin/dashboard");
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm("Mark this property as off-market? It will be hidden from search.")) return;
    await fetch(`/api/admin/properties/${property.id}`, { method: "DELETE" });
    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="title"
        defaultValue={property.title}
        className="w-full rounded-md border border-slate-700 bg-slate-800 p-2"
      />
      <textarea
        name="description"
        defaultValue={property.description}
        rows={4}
        className="w-full rounded-md border border-slate-700 bg-slate-800 p-2"
      />
      <div className="grid grid-cols-3 gap-3">
        <input name="bedrooms" type="number" defaultValue={property.bedrooms ?? ""} placeholder="Bedrooms" className="rounded-md border border-slate-700 bg-slate-800 p-2" />
        <input name="bathrooms" type="number" defaultValue={property.bathrooms ?? ""} placeholder="Bathrooms" className="rounded-md border border-slate-700 bg-slate-800 p-2" />
        <input name="areaSqft" type="number" defaultValue={property.areaSqft ?? ""} placeholder="Area (sqft)" className="rounded-md border border-slate-700 bg-slate-800 p-2" />
      </div>
      <input
        name="price"
        type="number"
        defaultValue={property.listings[0] ? Number(property.listings[0].price) : ""}
        placeholder="New price (leave blank to keep current)"
        className="w-full rounded-md border border-slate-700 bg-slate-800 p-2"
      />

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 rounded-md bg-teal-500 py-2 font-medium text-slate-950 hover:bg-teal-400 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="rounded-md border border-red-800 px-4 py-2 text-sm text-red-400 hover:bg-red-950/30"
        >
          Mark Off-Market
        </button>
      </div>
    </form>
  );
}
