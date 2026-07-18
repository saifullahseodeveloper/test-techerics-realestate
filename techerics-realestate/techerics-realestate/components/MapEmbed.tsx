// Google Maps Embed API (plain iframe) chosen over Mapbox GL / Leaflet for
// this use case: we only need a location pin + directions link, not
// interactive layers. An iframe embed adds zero JS bundle weight — critical
// for Core Web Vitals (LCP/INP) on a page that's already media-heavy with
// photos/video/360 tours.
export default function MapEmbed({
  latitude,
  longitude,
  label,
}: {
  latitude: number;
  longitude: number;
  label: string;
}) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-slate-800">
      <iframe
        title={`Map location of ${label}`}
        loading="lazy"
        className="h-64 w-full"
        referrerPolicy="no-referrer-when-downgrade"
        src={
          apiKey
            ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${latitude},${longitude}&zoom=15`
            : `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`
        }
      />
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-slate-800 px-3 py-2 text-center text-xs text-teal-400 hover:underline"
      >
        Get Directions
      </a>
    </div>
  );
}
