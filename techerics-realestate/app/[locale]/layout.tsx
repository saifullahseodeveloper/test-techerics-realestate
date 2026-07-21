import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeProtection from "@/components/CodeProtection";
import { CountryProvider } from "@/lib/country-context";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://techerics.com"),
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
    },
    title: { default: "Tech Erics — Global Real Estate", template: "%s | Tech Erics" },
    other: locale === "ar" ? { dir: "rtl" } : {},
    verification: {
      google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
      other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION ?? "" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased">
        <CodeProtection />
        <NextIntlClientProvider>
          <CountryProvider>
            <Header />
            {children}
            <Footer />
          </CountryProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
