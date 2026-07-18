import { ImageResponse } from "next/og";

// Built-in Next.js `next/og` (Satori-based) chosen over a headless-browser
// screenshot service — renders in milliseconds at the edge, no extra
// infra, and is Vercel's own recommended approach for dynamic OG images.
// This is what makes a WhatsApp/Instagram/Facebook share of a property
// link show the actual photo + price instead of a generic site logo.
export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Tech Erics Real Estate";
  const price = searchParams.get("price") ?? "";
  const location = searchParams.get("location") ?? "";
  const image = searchParams.get("image");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          backgroundColor: "#050914",
          backgroundImage: image ? `url(${image})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: "48px",
            background: "linear-gradient(to top, rgba(5,9,20,0.95) 20%, rgba(5,9,20,0.1) 100%)",
          }}
        >
          {price && (
            <div style={{ fontSize: 40, fontWeight: 700, color: "#2dd4bf", display: "flex" }}>
              {price}
            </div>
          )}
          <div style={{ fontSize: 32, fontWeight: 600, color: "white", marginTop: 8, display: "flex" }}>
            {title}
          </div>
          {location && (
            <div style={{ fontSize: 22, color: "#a78bfa", marginTop: 6, display: "flex" }}>
              📍 {location}
            </div>
          )}
          <div style={{ fontSize: 18, color: "#94a3b8", marginTop: 16, display: "flex" }}>
            techerics.com
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
