"use client";

// Switched from Cloudflare R2 to Cloudinary (research-backed): Cloudinary's
// free plan (25 credits/month — ~5GB storage, 10GB bandwidth, 10k
// transformations) requires NO credit card, unlike R2 which mandates
// billing details even to stay on the free tier. Cloudinary also supports
// "unsigned uploads" — the browser uploads directly to Cloudinary using
// just a public cloud name + upload preset, so we don't even need a
// server API route or a secret key for this. Simpler for a non-technical
// setup, and it auto-optimizes images/video on delivery as a bonus.

import { useState } from "react";

type MediaKind = "photo" | "video" | "tour360" | "reel" | "floorplan";
type UploadedFile = { url: string; kind: MediaKind; name: string };

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export default function MediaUploader({
  propertyId,
  onUploaded,
}: {
  propertyId: string;
  onUploaded: (files: UploadedFile[]) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [uploaded, setUploaded] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function uploadFile(file: File, kind: MediaKind): Promise<UploadedFile> {
    const isVideo = file.type.startsWith("video/");
    const resourceType = isVideo ? "video" : "image";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET!);
    formData.append("folder", `techerics/${propertyId}/${kind}`);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`
      );
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          setProgress((p) => ({ ...p, [file.name]: Math.round((e.loaded / e.total) * 100) }));
        }
      };
      xhr.onload = () => {
        if (xhr.status >= 300) {
          reject(new Error("Upload failed — check your Cloudinary preset settings"));
          return;
        }
        const data = JSON.parse(xhr.responseText);
        resolve({ url: data.secure_url, kind, name: file.name });
      };
      xhr.onerror = () => reject(new Error("Upload failed"));
      xhr.send(formData);
    });
  }

  async function handleFiles(files: FileList, kind: MediaKind) {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      setError("Cloudinary abhi configure nahi hai — .env mein NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME aur NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET daalo.");
      return;
    }
    setError(null);
    setUploading(true);
    const results: UploadedFile[] = [];
    for (const file of Array.from(files)) {
      try {
        results.push(await uploadFile(file, kind));
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Upload failed");
      }
    }
    const next = [...uploaded, ...results];
    setUploaded(next);
    onUploaded(next);
    setUploading(false);
  }

  return (
    <div className="space-y-3 rounded-xl border border-slate-800 p-4">
      <UploadRow label="Photos" accept="image/*" kind="photo" onFiles={handleFiles} />
      <UploadRow label="Video Tour" accept="video/*" kind="video" onFiles={handleFiles} />
      <UploadRow label="360° Panorama" accept="image/*" kind="tour360" onFiles={handleFiles} />
      <UploadRow label="Reel (short video)" accept="video/*" kind="reel" onFiles={handleFiles} />

      {error && <p className="text-xs text-red-400">{error}</p>}
      {uploading && <p className="text-xs text-teal-400">Uploading...</p>}
      {Object.entries(progress).map(([name, pct]) => (
        <div key={name} className="text-xs text-slate-400">
          {name}: {pct}%
        </div>
      ))}
      {!!uploaded.length && (
        <p className="text-xs text-slate-500">{uploaded.length} file(s) uploaded ✓</p>
      )}
    </div>
  );
}

function UploadRow({
  label,
  accept,
  kind,
  onFiles,
}: {
  label: string;
  accept: string;
  kind: MediaKind;
  onFiles: (files: FileList, kind: MediaKind) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-md border border-dashed border-slate-700 p-2 text-sm text-slate-300 hover:border-teal-500">
      {label}
      <input
        type="file"
        accept={accept}
        multiple
        className="hidden"
        onChange={(e) => e.target.files && onFiles(e.target.files, kind)}
      />
      <span className="text-xs text-teal-400">+ Upload</span>
    </label>
  );
}
