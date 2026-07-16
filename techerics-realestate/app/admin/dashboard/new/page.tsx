"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MediaUploader from "@/components/MediaUploader";

// Design intent: agent NEVER sees a "meta title" or "keywords" field.
// They fill plain facts about the property; /api/admin/properties does
// all SEO work invisibly. This is the core promise of the whole build —
// zero SEO knowledge required to publish a fully-optimized listing.
export default function NewPropertyPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [tempPropertyId] = useState(() => crypto.randomUUID());
  const [uploadedMedia, setUploadedMedia] = useState<{ url: string; kind: string }[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/admin/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        propertyType: form.get("propertyType"),
        bedrooms: Number(form.get("bedrooms")) || undefined,
        bathrooms: Number(form.get("bathrooms")) || undefined,
        areaSqft: Number(form.get("areaSqft")) || undefined,
        cityId: form.get("cityId"),
        localityId: form.get("localityId"),
        addressLine: form.get("addressLine"),
        latitude: Number(form.get("latitude")),
        longitude: Number(form.get("longitude")),
        price: Number(form.get("price")),
        currency: "INR",
        purpose: form.get("purpose"),
        rawNotes: form.get("rawNotes"), // agent yahan plain language me likhta hai
        amenities: (form.get("amenities") as string)?.split(",").map((a) => a.trim()) ?? [],
        photoUrls: uploadedMedia.filter((m) => m.kind === "photo").map((m) => m.url),
        videoUrls: uploadedMedia.filter((m) => m.kind !== "photo"),
      }),
    });

    setSaving(false);
    if (res.ok) router.push("/admin/dashboard");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100">
      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-4">
        <h1 className="text-xl font-semibold">Add New Property</h1>
        <p className="text-sm text-slate-400">
          Bas basic details bharo — SEO, meta tags, alt-text sab khud generate ho jaayega.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <select name="propertyType" required className="rounded-md border border-slate-700 bg-slate-800 p-2">
            <option value="APARTMENT">Apartment</option>
            <option value="VILLA">Villa</option>
            <option value="INDEPENDENT_HOUSE">Independent House</option>
            <option value="PLOT">Plot</option>
            <option value="COMMERCIAL_OFFICE">Commercial Office</option>
          </select>
          <select name="purpose" required className="rounded-md border border-slate-700 bg-slate-800 p-2">
            <option value="SALE">For Sale</option>
            <option value="RENT">For Rent</option>
          </select>
          <input name="bedrooms" type="number" placeholder="Bedrooms" className="rounded-md border border-slate-700 bg-slate-800 p-2" />
          <input name="bathrooms" type="number" placeholder="Bathrooms" className="rounded-md border border-slate-700 bg-slate-800 p-2" />
          <input name="areaSqft" type="number" placeholder="Area (sqft)" className="rounded-md border border-slate-700 bg-slate-800 p-2" />
          <input name="price" type="number" required placeholder="Price (INR)" className="rounded-md border border-slate-700 bg-slate-800 p-2" />
          <input name="cityId" required placeholder="City ID" className="rounded-md border border-slate-700 bg-slate-800 p-2" />
          <input name="localityId" required placeholder="Locality ID" className="rounded-md border border-slate-700 bg-slate-800 p-2" />
          <input name="latitude" type="number" step="any" placeholder="Latitude" className="rounded-md border border-slate-700 bg-slate-800 p-2" />
          <input name="longitude" type="number" step="any" placeholder="Longitude" className="rounded-md border border-slate-700 bg-slate-800 p-2" />
        </div>

        <input name="addressLine" placeholder="Address line" className="w-full rounded-md border border-slate-700 bg-slate-800 p-2" />
        <input name="amenities" placeholder="Amenities (comma separated: Pool, Gym, Parking)" className="w-full rounded-md border border-slate-700 bg-slate-800 p-2" />
        <textarea
          name="rawNotes"
          required
          rows={4}
          placeholder="Property ke baare mein kuch bhi likho — jaise aap ek client ko batate ho. AI ise professional listing mein badal dega."
          className="w-full rounded-md border border-slate-700 bg-slate-800 p-2"
        />

        <MediaUploader propertyId={tempPropertyId} onUploaded={setUploadedMedia} />

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-md bg-teal-500 py-2 font-medium text-slate-950 hover:bg-teal-400 disabled:opacity-50"
        >
          {saving ? "Generating SEO content + saving..." : "Publish Property"}
        </button>
      </form>
    </main>
  );
}
