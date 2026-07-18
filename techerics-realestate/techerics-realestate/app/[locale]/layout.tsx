import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
    title: { default: "Tech Erics — Real Estate", template: "%s | Tech Erics" },
    other: locale === "ar" ? { dir: "rtl" } : {},
    // Google Search Console + Bing verification — paste actual codes when
    // registering the property (Search Console needed to submit sitemap.xml
    // and monitor indexing/Core Web Vitals for real users)
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

  // Required so translations work correctly in Server Components and
  // static rendering is enabled (research flagged: skipping this
  // silently forces the whole route to dynamic rendering).
  setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className="min-h-screen bg-navy-950 font-sans text-slate-100 antialiased">
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
        {/* Real-user Core Web Vitals + traffic monitoring — feeds back into
            the SEO loop (LCP/INP/CLS regressions get caught before they hurt rankings) */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
