import type { Config } from "tailwindcss";

// Design tokens for the dark navy/teal/violet identity requested for
// Tech Erics. Kept as named tokens (not raw hex in components) so the
// whole site's theme can be tuned from one place.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#050914",
          900: "#0a1128",
          800: "#101a3a",
        },
        teal: {
          400: "#2dd4bf",
          500: "#14b8a6",
        },
        violet: {
          400: "#a78bfa",
          500: "#8b5cf6",
        },
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at top left, rgba(139,92,246,0.15), transparent 40%), radial-gradient(circle at bottom right, rgba(20,184,166,0.15), transparent 40%)",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
};

export default config;
