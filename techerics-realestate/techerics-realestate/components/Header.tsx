import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-navy-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-100">
          Tech<span className="text-teal-400">Eric</span>
          <span className="text-violet-400">s</span>
        </Link>

        <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
          <Link href="/buy" className="hover:text-teal-400">{t("buy")}</Link>
          <Link href="/rent" className="hover:text-teal-400">{t("rent")}</Link>
          <Link href="/new-projects" className="hover:text-teal-400">{t("newProjects")}</Link>
          <Link href="/commercial" className="hover:text-teal-400">{t("commercial")}</Link>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="/admin/login"
            className="rounded-md border border-slate-700 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800"
          >
            {t("login")}
          </Link>
          <Link
            href="/post-property"
            className="rounded-md bg-teal-500 px-3 py-1.5 text-sm font-medium text-slate-950 hover:bg-teal-400"
          >
            {t("postProperty")}
          </Link>
        </div>
      </div>
    </header>
  );
}
