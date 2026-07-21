"use client";

import { useTheme } from "@/lib/theme-engine/theme-context";
import { SectionType } from "@/lib/theme-engine/tokens";
import HeroSection from "@/components/home/HeroSection";
import HeroAppleMinimal from "@/components/home/variants/HeroAppleMinimal";
import HeroDubaiVideo from "@/components/home/variants/HeroDubaiVideo";
import HeroNeoBrutalist from "@/components/home/variants/HeroNeoBrutalist";
import ExploreCities from "@/components/home/ExploreCities";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import PremiumProperties from "@/components/home/PremiumProperties";
import VideoReelsSection from "@/components/home/VideoReelsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import DeveloperPartners from "@/components/home/DeveloperPartners";
import MarketInsights from "@/components/home/MarketInsights";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import AwardsSection from "@/components/home/AwardsSection";
import LeadConsultationBanner from "@/components/home/LeadConsultationBanner";

export default function DynamicHomepageEngine() {
  const { activeTheme } = useTheme();

  const sectionOrder: SectionType[] = activeTheme.layoutSchema?.sectionOrder || [
    "HERO",
    "CITIES",
    "FEATURED_PROJECTS",
    "PREMIUM_PROPERTIES",
    "VIDEO_REELS",
    "WHY_US",
    "DEVELOPER_PARTNERS",
    "MARKET_INSIGHTS",
    "TESTIMONIALS",
    "AWARDS",
    "CONSULTATION_BANNER",
  ];

  return (
    <div className="space-y-0">
      {sectionOrder.map((sectionKey) => {
        switch (sectionKey) {
          case "HERO": {
            const variant = activeTheme.layoutSchema?.heroVariant;
            if (variant === "APPLE_MINIMAL_LIGHT") return <HeroAppleMinimal key="hero-apple" />;
            if (variant === "DUBAI_VIDEO_LUXURY") return <HeroDubaiVideo key="hero-dubai" />;
            if (variant === "NEO_BRUTALIST") return <HeroNeoBrutalist key="hero-brutalist" />;
            return <HeroSection key="hero-default" />;
          }
          case "CITIES":
            return <ExploreCities key="cities" />;
          case "FEATURED_PROJECTS":
            return <FeaturedProjects key="projects" />;
          case "PREMIUM_PROPERTIES":
            return <PremiumProperties key="properties" />;
          case "VIDEO_REELS":
            return <VideoReelsSection key="reels" />;
          case "WHY_US":
            return <WhyChooseUs key="whyus" />;
          case "DEVELOPER_PARTNERS":
            return <DeveloperPartners key="devs" />;
          case "MARKET_INSIGHTS":
            return <MarketInsights key="insights" />;
          case "TESTIMONIALS":
            return <TestimonialsSection key="testimonials" />;
          case "AWARDS":
            return <AwardsSection key="awards" />;
          case "CONSULTATION_BANNER":
            return <LeadConsultationBanner key="consultation" />;
          default:
            return null;
        }
      })}
    </div>
  );
}
