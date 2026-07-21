import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import DynamicHomepageEngine from "@/components/home/DynamicHomepageEngine";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Tech Erics — Enterprise Global Real Estate Portal",
    description: "Verified luxury listings, 360° virtual tours, direct developer masterplans across Dubai, India, USA, UK, Canada & 14+ countries.",
    alternates: {
      canonical: `/${locale}`,
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DynamicHomepageEngine />;
}
