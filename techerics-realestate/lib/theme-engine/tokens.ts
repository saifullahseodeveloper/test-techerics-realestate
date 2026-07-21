// ============================================================
// GLOBAL REAL ESTATE TEMPLATE INTELLIGENCE ENGINE — TAXONOMY
// Synthesizes design patterns from Bayut, Zillow, PropertyFinder,
// Rightmove, Compass, Redfin, MagicBricks, and Idealista.
// ============================================================

export type TemplateCategory =
  | "LUXURY_ESTATE"
  | "MINIMAL_COMPASS"
  | "ENTERPRISE_BAYUT"
  | "EDITORIAL_MAGAZINE"
  | "GLASSMORPHISM_DARK"
  | "MAP_FIRST_ZILLOW"
  | "COMMERCIAL_PORTAL"
  | "ECO_SUSTAINABLE";

export type MarketPattern = {
  region: string;
  sourceInspiration: string; // e.g. "Bayut & PropertyFinder UX"
  keyPatterns: string[];
};

export type DesignTokens = {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  version: string;
  performanceScore: number;
  seoScore: number;
  accessibilityScore: number;
  previewColor: string;
  badge: string;
  isFavorite?: boolean;
  marketPattern: MarketPattern;
  styles: {
    bg: string;
    text: string;
    headingFont: string;
    bodyFont: string;
    accent: string;
    accentGlow: string;
    cardBg: string;
    cardBorder: string;
    cardHoverBorder: string;
    headerBg: string;
    footerBg: string;
    buttonBg: string;
    buttonText: string;
    pillBg: string;
    pillText: string;
    radius: string;
    glassBlur: string;
    shadow: string;
  };
};
