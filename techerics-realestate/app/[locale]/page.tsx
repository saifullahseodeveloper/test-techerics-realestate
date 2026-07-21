import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import DeveloperPartners from "@/components/home/DeveloperPartners";
import PremiumProperties from "@/components/home/PremiumProperties";
import ExploreCities from "@/components/home/ExploreCities";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import VideoReelsSection from "@/components/home/VideoReelsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import AwardsSection from "@/components/home/AwardsSection";
import LeadConsultationBanner from "@/components/home/LeadConsultationBanner";
import MarketInsights from "@/components/home/MarketInsights";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Find Verified Premium Properties, Luxury Villas & Apartments | Tech Erics",
  description:
    "Explore luxury apartments, sea-facing villas, commercial offices, and verified plots with 360° virtual tours and direct WhatsApp contact across India's top cities.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-teal-500 selection:text-slate-950">
      {/* 1. Hero Section matching reference image */}
      <HeroSection />

      {/* 2. Featured / Hot Projects Carousel */}
      <FeaturedProjects />

      {/* 3. Trusted Developer Partners Banner */}
      <DeveloperPartners />

      {/* 4. Premium Properties Showcase */}
      <PremiumProperties />

      {/* 5. Explore by City Grid */}
      <ExploreCities />

      {/* 6. Real Stories from Happy Homeowners (Testimonials) */}
      <TestimonialsSection />

      {/* 7. Property Video Walkthroughs & Reels */}
      <VideoReelsSection />

      {/* 8. Why Choose Us (The Tech Erics Advantage) */}
      <WhyChooseUs />

      {/* 9. Awards & Industry Accolades */}
      <AwardsSection />

      {/* 10. Free Lead Consultation VIP Banner */}
      <LeadConsultationBanner />

      {/* 11. Property Guides & Market Insights (Blog) */}
      <MarketInsights />
    </main>
  );
}
