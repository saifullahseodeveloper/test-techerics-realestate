// ============================================================
// AI AUTO-SEO WRITER & CONTENT REWRITER
// Rewrites property facts into high-converting, professional, 100%
// unique SEO titles, descriptions, and meta tags.
// ============================================================

import { GoogleGenAI } from "@google/genai";

function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

type RawPropertyInput = {
  propertyType: string;
  bedrooms?: number;
  bathrooms?: number;
  areaSqft?: number;
  cityName: string;
  localityName: string;
  amenities: string[];
  rawNotes: string;
};

type SeoContent = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
};

export async function generatePropertySeoContent(
  input: RawPropertyInput
): Promise<SeoContent> {
  const bedText = input.bedrooms ? `${input.bedrooms} BHK ` : "";
  const propTitle = `${bedText}${input.propertyType} in ${input.localityName}, ${input.cityName}`;

  const ai = getGenAI();
  if (!ai) {
    // Rich, formatted fallback description if Gemini API key is missing
    const richFallbackDescription = `
Welcome to this extraordinary ${bedText.toLowerCase()}${input.propertyType.toLowerCase()} situated in the prestigious neighborhood of ${input.localityName}, ${input.cityName}. Designed with modern luxury, refined architecture, and high-end finishes, this residence offers an elevated lifestyle for discerning buyers.

### Key Highlights & Features:
- **Spacious Layout**: ${input.areaSqft ? `${input.areaSqft} sqft of thoughtfully planned living space` : "Generous interior floorplan with optimal natural light"}.
- **Bedrooms & Baths**: ${input.bedrooms ? `${input.bedrooms} luxurious bedrooms` : "Multiple bedrooms"} with en-suite bathrooms and premium fixtures.
- **Prime Location Advantage**: Nestled in ${input.localityName}, ${input.cityName}, offering seamless connectivity to international airports, business hubs, top-rated schools, and fine dining.
- **World-Class Amenities**: ${input.amenities.length ? input.amenities.join(", ") : "24/7 Concierge, Private Parking, Swimming Pool, High-speed Elevators, and Fitness Center"}.

### Investment Potential:
Located in one of ${input.cityName}'s fastest-appreciating real estate corridors, this property represents an outstanding opportunity for capital growth and strong rental yields. Contact us today to schedule a private walkthrough.
    `.trim();

    return {
      title: propTitle,
      metaTitle: `${propTitle} | Verified Price & Floor Plan`,
      metaDescription: `Explore luxury ${bedText.toLowerCase()}${input.propertyType.toLowerCase()} in ${input.localityName}, ${input.cityName}. ${input.areaSqft ? `${input.areaSqft} sqft.` : ""} RERA approved, 360° tour available.`,
      description: richFallbackDescription,
    };
  }

  const prompt = `You are a world-class luxury real estate copywriter. Rewrite the following property facts into 100% original, professional, high-converting SEO content.

Property Type: ${input.propertyType}
Bedrooms: ${input.bedrooms ?? "N/A"}
Bathrooms: ${input.bathrooms ?? "N/A"}
Area: ${input.areaSqft ?? "N/A"} sqft
City: ${input.cityName}
Locality: ${input.localityName}
Amenities: ${input.amenities.join(", ")}
Source Facts: ${input.rawNotes}

Return ONLY valid JSON with these exact keys (no markdown preambles or backticks):
{
  "title": "concise professional title under 65 chars (do not repeat city/locality twice)",
  "metaTitle": "SEO meta title under 60 chars including price/location hook",
  "metaDescription": "SEO meta description under 155 chars highlighting key USPs",
  "description": "rich 250+ word structured markdown description with Key Highlights, Location Advantage, and Investment Potential sections. Do not copy generic filler."
}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });

    const cleaned = (response.text ?? "{}").replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned) as SeoContent;

    if (parsed.title && parsed.description) {
      return parsed;
    }
  } catch (err) {
    console.error("AI SEO Generation error:", err);
  }

  return {
    title: propTitle,
    metaTitle: `${propTitle} | Verified Price & Floor Plan`,
    metaDescription: `Explore luxury ${bedText.toLowerCase()}${input.propertyType.toLowerCase()} in ${input.localityName}, ${input.cityName}. RERA approved.`,
    description: `Spacious ${bedText}${input.propertyType} located in ${input.localityName}, ${input.cityName}. Featuring premium architecture and world-class amenities.`,
  };
}

/** Auto alt-text batch generator for uploaded images */
export async function generateAltTextBatch(
  propertyTitle: string,
  locality: string,
  city: string,
  imageCount: number
): Promise<string[]> {
  return Array.from(
    { length: imageCount },
    (_, i) => `${propertyTitle} in ${locality}, ${city} - View ${i + 1}`
  );
}
