import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import GlobalLocationSelector from "./GlobalLocationSelector";

export default function Header() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-white font-serif">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 font-sans font-black text-slate-950 shadow-md shadow-teal-500/20">
            TE
          </div>
          <span>
            Tech<span className="text-teal-400">Erics</span>
          </span>
        </Link>

        {/* Global Location Dropdown */}
        <div className="hidden sm:block">
          <GlobalLocationSelector />
        </div>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-300 lg:flex">
          <Link href="/buy" className="transition hover:text-teal-400">
            {t("buy")}
          </Link>
          <Link href="/rent" className="transition hover:text-teal-400">
            {t("rent")}
          </Link>
          <Link href="/new-projects" className="transition hover:text-teal-400">
            {t("newProjects")}
          </Link>
          <Link href="/commercial" className="transition hover:text-teal-400">
            {t("commercial")}
          </Link>
          <Link href="/about" className="transition hover:text-teal-400">
            About
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <LanguageSwitcher />

          <a
            href="https://wa.me/919876543210?text=Hi%20Tech%20Erics,%20I'm%20looking%20for%20a%20property."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/20"
          >
            <span>💬</span> WhatsApp
          </a>

          <Link
            href="/admin/login"
            className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-800 hover:text-white"
          >
            {t("login")}
          </Link>

          <Link
            href="/post-property"
            className="rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 px-3.5 py-1.5 text-xs font-bold text-slate-950 shadow-md shadow-teal-500/20 transition hover:opacity-90 active:scale-95"
          >
            {t("postProperty")}
          </Link>
        </div>
      </div>
    </header>
  );
}
