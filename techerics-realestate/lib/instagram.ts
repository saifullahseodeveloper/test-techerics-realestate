import "server-only";

// Official Instagram Graph API flow (Meta docs, 2026): create a media
// container -> poll status_code until FINISHED -> publish via creation_id.
// video_url must be a publicly reachable URL — this is exactly what our
// R2 public bucket URLs already are, so no extra hosting step needed.
// Rate limit: 100 published posts / rolling 24h per account — we treat
// this as best-effort and never let a failure block the property save.

const GRAPH_VERSION = "v21.0";
const IG_USER_ID = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID!;
const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN!;

async function pollContainerUntilReady(containerId: string, maxAttempts = 20) {
  for (let i = 0; i < maxAttempts; i++) {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${containerId}?fields=status_code&access_token=${ACCESS_TOKEN}`
    );
    const data = await res.json();
    if (data.status_code === "FINISHED") return true;
    if (data.status_code === "ERROR") return false;
    await new Promise((r) => setTimeout(r, 5000)); // 5s between polls, per Meta guidance
  }
  return false;
}

function buildCaption(propertyTitle: string, locality: string, city: string, price: string) {
  return `${propertyTitle}\n📍 ${locality}, ${city}\n💰 ${price}\n\nDM or visit link in bio for details.\n#RealEstate${city.replace(/\s/g, "")} #PropertyFor${locality.replace(/\s/g, "")} #TechErics`;
}

/** Publishes a property Reel to Instagram. Returns null on any failure (non-blocking). */
export async function publishPropertyReel(params: {
  videoUrl: string;
  coverImageUrl?: string;
  propertyTitle: string;
  locality: string;
  city: string;
  price: string;
}): Promise<{ mediaId: string } | null> {
  if (!IG_USER_ID || !ACCESS_TOKEN) return null; // not configured yet — silently skip

  try {
    const caption = buildCaption(params.propertyTitle, params.locality, params.city, params.price);

    // Step 1: create container
    const containerRes = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${IG_USER_ID}/media`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          media_type: "REELS",
          video_url: params.videoUrl,
          cover_url: params.coverImageUrl,
          caption,
          share_to_feed: true,
          access_token: ACCESS_TOKEN,
        }),
      }
    );
    const container = await containerRes.json();
    if (!container.id) {
      console.error("Instagram container creation failed:", container);
      return null;
    }

    // Step 2: poll until video processing finishes
    const ready = await pollContainerUntilReady(container.id);
    if (!ready) return null;

    // Step 3: publish
    const publishRes = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${IG_USER_ID}/media_publish`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creation_id: container.id, access_token: ACCESS_TOKEN }),
      }
    );
    const published = await publishRes.json();
    return published.id ? { mediaId: published.id } : null;
  } catch (err) {
    console.error("Instagram publish error (non-blocking):", err);
    return null;
  }
}

/** Publishes a single photo post (for listings without a reel). */
export async function publishPropertyPhoto(params: {
  imageUrl: string;
  propertyTitle: string;
  locality: string;
  city: string;
  price: string;
}): Promise<{ mediaId: string } | null> {
  if (!IG_USER_ID || !ACCESS_TOKEN) return null;

  try {
    const caption = buildCaption(params.propertyTitle, params.locality, params.city, params.price);
    const containerRes = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${IG_USER_ID}/media`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: params.imageUrl,
          caption,
          access_token: ACCESS_TOKEN,
        }),
      }
    );
    const container = await containerRes.json();
    if (!container.id) return null;

    const publishRes = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${IG_USER_ID}/media_publish`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creation_id: container.id, access_token: ACCESS_TOKEN }),
      }
    );
    const published = await publishRes.json();
    return published.id ? { mediaId: published.id } : null;
  } catch (err) {
    console.error("Instagram photo publish error (non-blocking):", err);
    return null;
  }
}
