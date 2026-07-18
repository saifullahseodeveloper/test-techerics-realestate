"use client";

// Photo Sphere Viewer chosen after research: most advanced hotspot system,
// best mobile gyroscope support, native 360-video support, official React
// wrapper maintained (2.2k GitHub stars) — better fit than Pannellum
// (image-only, no video) for a real estate 360 walkthrough use case.
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";

export default function Tour360Viewer({ url }: { url: string }) {
  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-slate-700">
      <ReactPhotoSphereViewer
        src={url}
        height={"480px"}
        width={"100%"}
        navbar={["zoom", "fullscreen"]}
        touchmoveTwoFingers
        mousewheelCtrlKey={false}
      />
      <p className="bg-slate-800 px-3 py-2 text-xs text-slate-400">
        360° Virtual Tour — drag to look around, pinch to zoom
      </p>
    </div>
  );
}
