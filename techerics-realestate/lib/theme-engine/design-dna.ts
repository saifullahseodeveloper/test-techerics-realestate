// ============================================================
// ENTERPRISE DESIGN DNA & INTELLIGENCE DATABASE
// Abstracts design principles, layout ratios, motion systems,
// typography scales, and storytelling patterns across industries.
// ============================================================

export type DesignPrinciple = {
  id: string;
  industryCategory:
    | "PREMIUM_SAAS"
    | "LUXURY_AUTOMOTIVE"
    | "ARCHITECTURE_HOSPITALITY"
    | "GLOBAL_REAL_ESTATE";
  sourceInspiration: string;
  layoutStructure: string;
  navigationSystem: string;
  spacingAndGrid: string;
  typographyScale: string;
  motionSystem: string;
  interactionModel: string;
  storytellingPattern: string;
};

export const DESIGN_DNA_DATABASE: Record<string, DesignPrinciple> = {
  "apple-minimalism": {
    id: "apple-minimalism",
    industryCategory: "PREMIUM_SAAS",
    sourceInspiration: "Apple, Stripe & Linear UX",
    layoutStructure: "Symmetrical product slab presentation with generous 120px section breathing room.",
    navigationSystem: "Floating translucent glass navigation pill with micro-blur dropshadow.",
    spacingAndGrid: "Strict 8pt / 16pt / 32pt / 64pt / 120pt exponential rhythm.",
    typographyScale: "San Francisco display typography with -0.03em tracking on major H1s.",
    motionSystem: "GPU-accelerated cubic-bezier(0.16, 1, 0.3, 1) spring physics.",
    interactionModel: "Subtle 2px hover elevation with zero layout shift.",
    storytellingPattern: "Feature-driven product presentation starting with macro value statement.",
  },
  "dubai-luxury-hospitality": {
    id: "dubai-luxury-hospitality",
    industryCategory: "ARCHITECTURE_HOSPITALITY",
    sourceInspiration: "Ritz-Carlton, Bugatti & Bayut Luxury",
    layoutStructure: "Asymmetrical editorial layout with full-bleed cinematic video framing.",
    navigationSystem: "Obsidian gold-trimmed mega menu with direct concierge booking action.",
    spacingAndGrid: "Wide fluid grid system tailored for 4K ultra-resolution displays.",
    typographyScale: "Editorial serif display headings paired with high-legibility geometric sans body.",
    motionSystem: "Slow-bleed fade transitions (1200ms) conveying opulence and prestige.",
    interactionModel: "Champagne gold foil hover glows and interactive 360° virtual tour triggers.",
    storytellingPattern: "Lifestyle-first narrative focusing on ROI, architectural legacy, and exclusivity.",
  },
  "zillow-data-search": {
    id: "zillow-data-search",
    industryCategory: "GLOBAL_REAL_ESTATE",
    sourceInspiration: "Zillow, Redfin & Compass Data Engine",
    layoutStructure: "Split-screen interactive map layout with instant data card feed.",
    navigationSystem: "Compact search filter bar with instant multi-select dropdown pills.",
    spacingAndGrid: "High-density 12-column grid optimizing information per square inch.",
    typographyScale: "Crisp neutral sans-serif with bold price hierarchy tags.",
    motionSystem: "Instant 150ms state updates for filter responsiveness.",
    interactionModel: "Hovering property card highlights corresponding map pin instantly.",
    storytellingPattern: "Data-first transparency highlighting WalkScore®, price trends, and historical metrics.",
  },
  "framer-neo-brutalism": {
    id: "framer-neo-brutalism",
    industryCategory: "PREMIUM_SAAS",
    sourceInspiration: "Framer, Webflow & Retro Editorial",
    layoutStructure: "High-contrast block grid with heavy 4px solid borders.",
    navigationSystem: "Bold blocky navigation header with pop shadow buttons.",
    spacingAndGrid: "Fixed 24pt / 48pt rigid box padding.",
    typographyScale: "Monospaced code fonts paired with ultra-black uppercase headers.",
    motionSystem: "Hard snap 1-frame click state transitions.",
    interactionModel: "6px offset solid black drop shadows that snap on hover.",
    storytellingPattern: "Raw high-energy presentation focused on creative disruption.",
  },
};
