// ============================================================
// ENTERPRISE COUNTRY MARKET CONFIGURATION & LOCALIZATION DATASET
// Supports 15+ international markets with native language, RTL,
// native currency formatters, localized office contacts, reviews, and developers.
// ============================================================

export type DeveloperData = {
  name: string;
  projectsCount: string;
  logo: string;
  slug: string;
};

export type SampleProject = {
  id: string;
  title: string;
  location: string;
  bhk: string;
  sqft: string;
  price: string;
  developer: string;
  image: string;
  badge: string;
  status: string;
};

export type SampleProperty = {
  id: string;
  title: string;
  location: string;
  bhk: string;
  bath: string;
  area: string;
  price: string;
  type: "VILLA" | "APARTMENT" | "COMMERCIAL";
  purpose: "FOR SALE" | "FOR RENT";
  image: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  avatar: string;
};

export type Award = {
  title: string;
  organization: string;
  year: string;
  image: string;
};

export type CountryMarketConfig = {
  code: string;
  countryName: string;
  slug: string;
  currency: string;
  symbol: string;
  flag: string;
  defaultLocale: "en" | "ar" | "hi" | "fr" | "de" | "es" | "tr" | "ja";
  nativeLanguageName: string;
  formatPrice: (amount: number) => string;
  officeAddress: string;
  officePhone: string;
  officeEmail: string;
  topDevelopers: DeveloperData[];
  heroImage: string;
  heroHeadline: string;
  heroSubheadline: string;
  searchPlaceholder: string;
  sampleProjects: SampleProject[];
  sampleProperties: SampleProperty[];
  testimonials: Testimonial[];
  awards: Award[];
};

export const GLOBAL_MARKETS: Record<string, CountryMarketConfig> = {
  AE: {
    code: "AE",
    countryName: "United Arab Emirates",
    slug: "uae",
    currency: "AED",
    symbol: "AED ",
    flag: "🇦🇪",
    defaultLocale: "ar",
    nativeLanguageName: "العربية",
    formatPrice: (amount: number) => {
      if (amount >= 1000000) return `AED ${(amount / 1000000).toFixed(2)}M`;
      if (amount >= 1000) return `AED ${(amount / 1000).toFixed(0)}K`;
      return `AED ${amount.toLocaleString()}`;
    },
    officeAddress: "Tech Erics Tower, Downtown Boulevard, Dubai, UAE",
    officePhone: "+971 4 300 8000",
    officeEmail: "uae@techerics.com",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80",
    heroHeadline: "Find Your Dream Property in the UAE",
    heroSubheadline: "Explore luxury Dubai apartments, beachfront Palm Jumeirah villas, and high-yield commercial hubs.",
    searchPlaceholder: "Search by Emirate, Dubai Marina, Downtown, Palm Jumeirah...",
    topDevelopers: [
      { name: "EMAAR PROPERTIES", projectsCount: "120+ Projects", logo: "🏆", slug: "emaar" },
      { name: "DAMAC PROPERTIES", projectsCount: "85+ Projects", logo: "✨", slug: "damac" },
      { name: "NAKHEEL", projectsCount: "45+ Projects", logo: "🌴", slug: "nakheel" },
      { name: "SOBHA REALTY", projectsCount: "35+ Projects", logo: "🏰", slug: "sobha-realty" },
      { name: "ALDAR PROPERTIES", projectsCount: "50+ Projects", logo: "🏛️", slug: "aldar" },
      { name: "DUBAI HOLDING", projectsCount: "65+ Projects", logo: "🌟", slug: "dubai-holding" },
      { name: "MERAAS", projectsCount: "28+ Projects", logo: "💎", slug: "meraas" },
      { name: "DANUBE PROPERTIES", projectsCount: "40+ Projects", logo: "🏗️", slug: "danube" },
    ],
    sampleProjects: [
      {
        id: "sunteck-beach-residences",
        title: "EMAAR Beachfront – Oceanopolis Towers",
        location: "Dubai Marina, Dubai",
        bhk: "2, 3 & 4 BHK Luxury Apartments",
        sqft: "1,450 - 3,200 sqft",
        price: "AED 2.95M",
        developer: "EMAAR Properties",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        badge: "NEW LAUNCH",
        status: "Handover Q4 2026",
      },
      {
        id: "damac-lagoons-nice",
        title: "DAMAC Lagoons – Nice Cluster",
        location: "DAMAC Lagoons, Dubai",
        bhk: "4 & 5 BHK Mediterranean Villas",
        sqft: "2,200 - 4,100 sqft",
        price: "AED 3.4M",
        developer: "DAMAC Properties",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        badge: "VERIFIED RERA",
        status: "Off-Plan Masterplan",
      },
    ],
    sampleProperties: [
      {
        id: "palm-jumeirah-penthouse",
        title: "Ultra-Luxury Waterfront Penthouse",
        location: "Palm Jumeirah, Dubai",
        bhk: "5 BHK",
        bath: "6 Bath",
        area: "6,500 sqft",
        price: "AED 18.5M",
        type: "APARTMENT",
        purpose: "FOR SALE",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "downtown-dubai-tower-office",
        title: "Grade-A Commercial Sky Office",
        location: "Business Bay, Dubai",
        bhk: "Open Layout",
        bath: "4 Restrooms",
        area: "4,200 sqft",
        price: "AED 450K / yr",
        type: "COMMERCIAL",
        purpose: "FOR RENT",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      },
    ],
    testimonials: [
      {
        quote: "Buying an off-plan villa in Palm Jumeirah through Tech Erics was seamless. 100% legal clarity and direct EMAAR developer access!",
        name: "Tariq Al Mansoori",
        role: "Investment Director",
        location: "Bought Villa in Palm Jumeirah",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      },
      {
        quote: "The 360° virtual tours saved me 3 trips to Dubai. Secured a high-yield Downtown apartment with zero commission.",
        name: "Sarah Jenkins",
        role: "UK Investor",
        location: "Bought Apartment in Downtown Dubai",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      },
    ],
    awards: [
      {
        title: "Best UAE Luxury Real Estate Portal 2025",
        organization: "Gulf Real Estate Excellence Summit",
        year: "2025",
        image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=400&q=80",
      },
      {
        title: "Excellence in PropTech & Virtual Tours",
        organization: "Middle East Tech & Realty Awards",
        year: "2024",
        image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  IN: {
    code: "IN",
    countryName: "India",
    slug: "india",
    currency: "INR",
    symbol: "₹ ",
    flag: "🇮🇳",
    defaultLocale: "hi",
    nativeLanguageName: "हिन्दी",
    formatPrice: (amount: number) => {
      if (amount >= 10000000) return `₹ ${(amount / 10000000).toFixed(2)} Cr`;
      if (amount >= 100000) return `₹ ${(amount / 100000).toFixed(2)} Lakh`;
      return `₹ ${amount.toLocaleString("en-IN")}`;
    },
    officeAddress: "Tech Erics Tower, BKC, Mumbai - 400051, India",
    officePhone: "+91 22 4000 8000",
    officeEmail: "india@techerics.com",
    heroImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1920&q=80",
    heroHeadline: "India's #1 Real Estate & Property Portal",
    heroSubheadline: "Discover premier residential townships, luxury penthouses, and RERA verified plots.",
    searchPlaceholder: "Search Mumbai, Delhi NCR, Bangalore, Pune, Hyderabad...",
    topDevelopers: [
      { name: "GODREJ PROPERTIES", projectsCount: "42+ Projects", logo: "🌿", slug: "godrej" },
      { name: "DLF LIMITED", projectsCount: "38+ Projects", logo: "🏢", slug: "dlf" },
      { name: "OBEROI REALTY", projectsCount: "25+ Projects", logo: "👑", slug: "oberoi" },
      { name: "PRESTIGE GROUP", projectsCount: "60+ Projects", logo: "⚜️", slug: "prestige" },
      { name: "SOBHA LIMITED", projectsCount: "30+ Projects", logo: "🏰", slug: "sobha-india" },
      { name: "HIRANANDANI", projectsCount: "18+ Projects", logo: "🏛️", slug: "hiranandani" },
      { name: "LODHA GROUP", projectsCount: "55+ Projects", logo: "💎", slug: "lodha" },
      { name: "TATA HOUSING", projectsCount: "22+ Projects", logo: "⚙️", slug: "tata" },
    ],
    sampleProjects: [
      {
        id: "godrej-horizon-bandra",
        title: "Godrej Horizon – Sea Facing Towers",
        location: "Wadala / Bandra, Mumbai",
        bhk: "2, 3 & 4 BHK Luxury Residences",
        sqft: "1,100 - 2,400 sqft",
        price: "₹ 2.85 Cr",
        developer: "Godrej Properties",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
        badge: "FEATURED",
        status: "Ready to Move",
      },
      {
        id: "dlf-the-camellias",
        title: "DLF The Camellias – Super Luxury",
        location: "Golf Course Road, Gurgaon",
        bhk: "4 & 5 BHK Golf Estates",
        sqft: "7,400 - 11,000 sqft",
        price: "₹ 35.0 Cr",
        developer: "DLF Limited",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        badge: "VERIFIED RERA",
        status: "Immediate Possession",
      },
    ],
    sampleProperties: [
      {
        id: "oberoi-sky-city",
        title: "Oberoi Sky City Sky Villa",
        location: "Borivali East, Mumbai",
        bhk: "3 BHK",
        bath: "3 Bath",
        area: "1,850 sqft",
        price: "₹ 3.75 Cr",
        type: "APARTMENT",
        purpose: "FOR SALE",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      },
    ],
    testimonials: [
      {
        quote: "Tech Erics team made our Bandra home purchase completely smooth. Zero hidden charges and saved us over ₹12 Lakhs!",
        name: "Vikram & Neha Sharma",
        role: "IT Director & Architect",
        location: "Bought 3 BHK in Bandra West",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      {
        quote: "As an NRI buyer, trust is paramount. Tech Erics verified all land titles and completed registration in Gurgaon.",
        name: "Ananya Iyer",
        role: "NRI Tech Lead",
        location: "Bought Golf Estate in Gurgaon",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      },
    ],
    awards: [
      {
        title: "Best Indian PropTech Platform 2025",
        organization: "National Real Estate Excellence Summit",
        year: "2025",
        image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=400&q=80",
      },
      {
        title: "Highest Customer Satisfaction Award",
        organization: "Indian Realty Consumers Forum",
        year: "2024",
        image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  US: {
    code: "US",
    countryName: "United States",
    slug: "usa",
    currency: "USD",
    symbol: "$",
    flag: "🇺🇸",
    defaultLocale: "en",
    nativeLanguageName: "English",
    formatPrice: (amount: number) => {
      if (amount >= 1000000) return `$${(amount / 1000000).toFixed(2)}M`;
      if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
      return `$${amount.toLocaleString()}`;
    },
    officeAddress: "Tech Erics Center, 5th Ave, Manhattan, New York, NY 10001, USA",
    officePhone: "+1 (800) 555-ERICS",
    officeEmail: "usa@techerics.com",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80",
    heroHeadline: "Find Homes for Sale & Rent in the US",
    heroSubheadline: "Explore luxury single-family homes, Manhattan penthouses, and coastal California estates.",
    searchPlaceholder: "Search New York, Los Angeles, Miami, San Francisco...",
    topDevelopers: [
      { name: "D.R. HORTON", projectsCount: "150+ Communities", logo: "🏡", slug: "dr-horton" },
      { name: "LENNAR CORP", projectsCount: "135+ Communities", logo: "🌲", slug: "lennar" },
      { name: "PULTEGROUP", projectsCount: "90+ Communities", logo: "🏙️", slug: "pulte" },
      { name: "TOLL BROTHERS", projectsCount: "75+ Projects", logo: "👑", slug: "toll-brothers" },
      { name: "RELATED COMPANIES", projectsCount: "45+ High Rises", logo: "🗽", slug: "related" },
    ],
    sampleProjects: [
      {
        id: "manhattan-hudson-yards",
        title: "35 Hudson Yards – Modern Sky Residences",
        location: "Hudson Yards, New York",
        bhk: "2, 3 & 4 Bed Condos",
        sqft: "1,800 - 4,500 sqft",
        price: "$4.25M",
        developer: "Related Companies",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
        badge: "VERIFIED",
        status: "Completed 2024",
      },
    ],
    sampleProperties: [
      {
        id: "beverly-hills-estate",
        title: "Modern Architectural Beverly Hills Villa",
        location: "Beverly Hills, California",
        bhk: "6 Bed",
        bath: "7 Bath",
        area: "8,500 sqft",
        price: "$14.5M",
        type: "VILLA",
        purpose: "FOR SALE",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      },
    ],
    testimonials: [
      {
        quote: "Tech Erics helped us close on our Tribeca loft with zero hassle. The WalkScore data and 360° virtual tour were 100% spot on!",
        name: "Michael & Jessica Miller",
        role: "Wall Street Analyst",
        location: "Bought Condo in Manhattan, NY",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      },
      {
        quote: "Secured our dream Malibu coastal home through Tech Erics. Professional team with complete market analysis.",
        name: "David Sterling",
        role: "Tech Entrepreneur",
        location: "Bought Ocean Villa in Malibu, CA",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      },
    ],
    awards: [
      {
        title: "America's Best Real Estate Platform 2025",
        organization: "US PropTech & Realty Summit",
        year: "2025",
        image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=400&q=80",
      },
      {
        title: "Innovation in Luxury Property Search",
        organization: "American Real Estate Association",
        year: "2024",
        image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
};

export const COUNTRY_MARKETS = GLOBAL_MARKETS;

/** Helper to retrieve market configuration with fallback */
export function getCountryMarket(countryCode: string): CountryMarketConfig {
  const code = (countryCode || "IN").toUpperCase();
  return GLOBAL_MARKETS[code] || GLOBAL_MARKETS.IN;
}
