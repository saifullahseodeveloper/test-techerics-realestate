// ============================================================
// AI AUTO-SEO WRITER
// Jab admin dashboard me agent property save karta hai, ye function
// automatically call hota hai (API route ke andar) — Gemini ko property
// ke raw details deta hai, wapas SEO-optimized title/description/meta
// milta hai. Agent ko SEO ki koi manual jarurat nahi padti.
//
// Gemini 2.5 Flash chosen: genuine free tier available (unlike Anthropic/
// OpenAI which require billing from the first call) — good fit for a
// small business just starting out. Same function signature as before,
// so switching to a paid provider later (if volume grows) is a one-file change.
// ============================================================

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type RawPropertyInput = {
  propertyType: string;
  bedrooms?: number;
  bathrooms?: number;
  areaSqft?: number;
  cityName: string;
  localityName: string;
  amenities: string[];
  rawNotes: string; // agent ne jo bhi rough details di hain
};

type SeoContent = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  description: string; // 250+ words, unique, human-readable
};

export async function generatePropertySeoContent(
  input: RawPropertyInput
): Promise<SeoContent> {
  const prompt = `You are an expert real estate SEO copywriter. Given these raw property details, generate SEO-optimized content.

Property type: ${input.propertyType}
Bedrooms: ${input.bedrooms ?? "N/A"}
Bathrooms: ${input.bathrooms ?? "N/A"}
Area: ${input.areaSqft ?? "N/A"} sqft
City: ${input.cityName}
Locality: ${input.localityName}
Amenities: ${input.amenities.join(", ")}
Agent notes: ${input.rawNotes}

Return ONLY valid JSON with these exact keys (no markdown, no preamble):
{
  "title": "concise property title, under 70 chars",
  "metaTitle": "SEO meta title, under 60 chars, include locality+city+price hook",
  "metaDescription": "SEO meta description, under 160 chars, include key selling points",
  "description": "unique 250+ word property description, natural language, mentions locality context, avoid keyword stuffing, no generic filler"
}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: { responseMimeType: "application/json" },
  });

  const cleaned = (response.text ?? "{}").replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned) as SeoContent;
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
    (_, i) => `${propertyTitle} in ${locality}, ${city} - Image ${i + 1}`
  );
}
