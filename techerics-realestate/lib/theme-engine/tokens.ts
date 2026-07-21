// ============================================================
// ENTERPRISE EXPERIENCE ENGINE — DESIGN TOKENS & SCHEMA
// Defines theme variables, typography, animations, and variant styles.
// ============================================================

export type ThemeCategory =
  | "LUXURY"
  | "MINIMAL"
  | "ENTERPRISE"
  | "CYBER"
  | "EDITORIAL"
  | "FUTURISTIC";

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
    radius: string; // e.g. "rounded-2xl" or "rounded-none"
    glassBlur: string; // e.g. "backdrop-blur-xl"
    shadow: string;
  };
};
