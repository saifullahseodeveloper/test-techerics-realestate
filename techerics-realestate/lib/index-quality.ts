import type { Metadata } from "next";

type PageQualityInput = {
  listingCount: number;
  hasUniqueContent?: boolean;
  minListingThreshold?: number;
};

/**
 * Enterprise Index Quality Controller
 * Evaluates whether a programmatic landing page meets Google's quality threshold.
 * If listing count < threshold (default 2), injects `noindex, follow` to protect crawl budget.
 */
export function getIndexQualityRobots(input: PageQualityInput): Metadata["robots"] {
  const threshold = input.minListingThreshold ?? 2;

  // Thin content safeguard
  if (input.listingCount < threshold) {
    return {
      index: false,
      follow: true,
      nocache: true,
    };
  }

  return {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  };
}
