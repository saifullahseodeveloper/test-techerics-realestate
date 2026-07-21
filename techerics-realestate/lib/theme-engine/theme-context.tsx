"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { DesignTokens } from "./tokens";
import { THEME_PRESETS } from "./themes";

type ThemeContextType = {
  activeTheme: DesignTokens;
  setThemeId: (themeId: string) => void;
  availableThemes: DesignTokens[];
  exportThemeJson: () => string;
  importThemeJson: (jsonString: string) => boolean;
};

const ThemeContext = createContext<ThemeContextType>({
  activeTheme: THEME_PRESETS["glassmorphism-dark"],
  setThemeId: () => {},
  availableThemes: Object.values(THEME_PRESETS),
  exportThemeJson: () => "",
  importThemeJson: () => false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeTheme, setActiveTheme] = useState<DesignTokens>(
    THEME_PRESETS["glassmorphism-dark"]
  );

  useEffect(() => {
    const saved = localStorage.getItem("selected_theme_id");
    if (saved && THEME_PRESETS[saved]) {
      setActiveTheme(THEME_PRESETS[saved]);
    }
  }, []);

  // Whenever activeTheme changes, update body attributes & localStorage/cookies
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", activeTheme.id);
      if (activeTheme.id.includes("light") || activeTheme.id.includes("brutalism") || activeTheme.id.includes("scandinavian")) {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
      }
    }
  }, [activeTheme]);

  const setThemeId = (themeId: string) => {
    if (THEME_PRESETS[themeId]) {
      const theme = THEME_PRESETS[themeId];
      setActiveTheme(theme);
      localStorage.setItem("selected_theme_id", themeId);
      document.cookie = `selected_theme_id=${themeId}; path=/; max-age=31536000`;
    }
  };

  const exportThemeJson = (): string => {
    return JSON.stringify(activeTheme, null, 2);
  };

  const importThemeJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString) as DesignTokens;
      if (parsed && parsed.id && parsed.styles) {
        THEME_PRESETS[parsed.id] = parsed;
        setActiveTheme(parsed);
        localStorage.setItem("selected_theme_id", parsed.id);
        return true;
      }
    } catch (err) {
      console.error("Failed to import theme package:", err);
    }
    return false;
  };

  return (
    <ThemeContext.Provider
      value={{
        activeTheme,
        setThemeId,
        availableThemes: Object.values(THEME_PRESETS),
        exportThemeJson,
        importThemeJson,
      }}
    >
      <div
        id="theme-root-container"
        className={`${activeTheme.styles.bg} ${activeTheme.styles.text} transition-colors duration-500 min-h-screen`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
