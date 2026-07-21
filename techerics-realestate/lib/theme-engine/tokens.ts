// ============================================================
// STRUCTURAL LAYOUT ENGINE — COMPONENT & SECTION SCHEMAS
// Defines distinct component layout variants, section orders, and navigation patterns.
// ============================================================

export type HeroVariant =
  | "GLASS_AURORA"
  | "APPLE_MINIMAL_LIGHT"
  | "DUBAI_VIDEO_LUXURY"
  | "LINEAR_GRID_TECH"
  | "MAP_FIRST_ZILLOW"
  | "NEO_BRUTALIST"
  | "EDITORIAL_MAGAZINE";

export type CardVariant =
  | "GLASS_3D_HOVER"
  | "APPLE_PRODUCT_SLAB"
  | "DUBAI_GOLD_CARD"
  | "LINEAR_MONOCHROME_CARD"
  | "NEO_BRUTAL_BOX";

export type SearchVariant =
  | "AI_CONVERSATIONAL"
  | "MAP_INTERACTIVE"
  | "CLEAN_SEARCH_BAR"
  | "COMPACT_OVERLAY";

export type SectionType =
  | "HERO"
  | "CITIES"
  | "FEATURED_PROJECTS"
  | "PREMIUM_PROPERTIES"
  | "VIDEO_REELS"
  | "WHY_US"
  | "DEVELOPER_PARTNERS"
  | "MARKET_INSIGHTS"
  | "TESTIMONIALS"
  | "AWARDS"
  | "CONSULTATION_BANNER";

export type LayoutSchema = {
  heroVariant: HeroVariant;
  cardVariant: CardVariant;
  searchVariant: SearchVariant;
  sectionOrder: SectionType[];
};

export type ThemeCategory =
  | "GLASSMORPHISM_DARK"
  | "APPLE_MINIMAL_LIGHT"
  | "DUBAI_GOLD_LUXURY"
  | "LINEAR_CYBER_DARK"
  | "MAP_FIRST_ZILLOW"
  | "NEO_BRUTALISM_BOLD"
  | "EDITORIAL_MAGAZINE";

export type MarketPattern = {
  region: string;
  sourceInspiration: string;
  keyPatterns: string[];
};

export type DesignTokens = {
  id: string;
  name: string;
  category: ThemeCategory;
  description: string;
  version: string;
  performanceScore: number;
  seoScore: number;
  accessibilityScore: number;
  previewColor: string;
  badge: string;
  isFavorite?: boolean;
  marketPattern: MarketPattern;
  layoutSchema: LayoutSchema;
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
