import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware Link/useRouter/usePathname — import these instead of
// next/navigation anywhere locale switching matters (research flagged
// this as the #1 i18n bug: plain next/navigation silently drops the
// locale prefix). Kept in its own file, separate from routing.ts —
// next-intl v4 has a known bug when createNavigation is co-located
// with the routing config in the same module.
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
