import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "hi", "ar"],
  defaultLocale: "en",
  localePrefix: "always", // /en/..., /hi/..., /ar/... — best for hreflang clarity
});
