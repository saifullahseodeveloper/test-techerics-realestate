// ============================================================
// COUNTRY-SPECIFIC REAL ESTATE MARKET DATASET
// Dynamically alters homepage headlines, images, currencies,
// top developers, featured projects, cities & localities per country.
// ============================================================

export type DeveloperInfo = {
  name: string;
  count: string;
};

export type CountryMarketConfig = {
  countryCode: string;
  countryName: string;
  flag: string;
  currency: string;
  symbol: string;
  defaultLocale: "en" | "ar" | "hi";
  heroTag: string;
  heroHeadline: string;
  heroHighlight: string;
  heroSubtitle: string;
  heroBgImage: string;
  topDevelopers: DeveloperInfo[];
  topCities: { name: string; slug: string; count: string; image: string; desc: string }[];
  sampleProperties: {
    id: string;
    title: string;
    location: string;
    price: string;
    type: string;
    bhk: string;
    bath: string;
    area: string;
    image: string;
    tag: string;
    purpose: "FOR SALE" | "FOR RENT";
  }[];
  sampleProjects: {
    id: string;
    title: string;
    location: string;
    developer: string;
    price: string;
    status: string;
    bhk: string;
    sqft: string;
    image: string;
    badge: string;
  }[];
};

export const COUNTRY_MARKETS: Record<string, CountryMarketConfig> = {
  // 🇮🇳 INDIA
  IN: {
    countryCode: "IN",
    countryName: "India",
    flag: "🇮🇳",
    currency: "INR",
    symbol: "₹",
    defaultLocale: "en",
    heroTag: "India's Premier Luxury Real Estate Platform",
    heroHeadline: "Find your next",
    heroHighlight: "premium property in India.",
    heroSubtitle: "Search top luxury villas, modern apartments, commercial spaces, and verified plots across Mumbai, Delhi, Bangalore, Pune & Hyderabad.",
    heroBgImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80",
    topDevelopers: [
      { name: "GODREJ PROPERTIES", count: "42+ Projects" },
      { name: "DLF LIMITED", count: "38+ Projects" },
      { name: "OBEROI REALTY", count: "25+ Projects" },
      { name: "PRESTIGE GROUP", count: "60+ Projects" },
      { name: "SOBHA LIMITED", count: "30+ Projects" },
      { name: "HIRANANDANI", count: "18+ Projects" },
      { name: "LODHA GROUP", count: "55+ Projects" },
      { name: "TATA HOUSING", count: "22+ Projects" },
    ],
    topCities: [
      { name: "Mumbai", slug: "mumbai", count: "1,240+ Listings", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80", desc: "Sea-facing flats in Bandra, BKC offices & South Mumbai heritage villas" },
      { name: "Delhi NCR", slug: "delhi-ncr", count: "980+ Listings", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80", desc: "Golf Course Road luxury penthouses & Cyber City tech parks" },
      { name: "Bangalore", slug: "bangalore", count: "850+ Listings", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80", desc: "Indiranagar villas, Whitefield IT corridor & Koramangala apartments" },
      { name: "Pune", slug: "pune", count: "620+ Listings", image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80", desc: "Koregaon Park greenery, Baner gated communities & Hinjewadi plots" },
      { name: "Hyderabad", slug: "hyderabad", count: "540+ Listings", image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=800&q=80", desc: "Jubilee Hills celebrity mansions & HITEC City commercial towers" },
    ],
    sampleProperties: [
      { id: "in-1", title: "Sea-Facing Modern Villa with Private Garden", location: "Bandra West, Mumbai", price: "₹ 7.50 Cr", type: "VILLA", bhk: "4 BHK", bath: "4 Bath", area: "3,400 sqft", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", tag: "FEATURED VILLA", purpose: "FOR SALE" },
      { id: "in-2", title: "Luxury Duplex Penthouse in Golf Course Road", location: "DLF Phase 5, Gurgaon", price: "₹ 5.20 Cr", type: "APARTMENT", bhk: "3 BHK", bath: "3 Bath", area: "2,600 sqft", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80", tag: "SUPER LUXURY", purpose: "FOR SALE" },
    ],
    sampleProjects: [
      { id: "in-proj-1", title: "The Grand Horizon Luxury Estates", location: "Bandra West, Mumbai", developer: "Oberoi Realty", price: "₹ 4.85 Cr Onwards", status: "FOR SALE", bhk: "3 & 4 BHK", sqft: "1,850 - 2,900 sqft", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", badge: "HOT LAUNCH" },
      { id: "in-proj-2", title: "Palais Royale Skyline Penthouses", location: "Worli, Mumbai", developer: "LODHA Group", price: "₹ 8.50 Cr Onwards", status: "FOR SALE", bhk: "4 & 5 BHK", sqft: "3,200 - 5,100 sqft", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80", badge: "EXCLUSIVE" },
    ],
  },

  // 🇦🇪 UAE
  AE: {
    countryCode: "AE",
    countryName: "United Arab Emirates",
    flag: "🇦🇪",
    currency: "AED",
    symbol: "AED ",
    defaultLocale: "ar",
    heroTag: "UAE's Leading Luxury Off-Plan & Ready Real Estate Portal",
    heroHeadline: "Discover iconic",
    heroHighlight: "Dubai & Abu Dhabi properties.",
    heroSubtitle: "Explore Palm Jumeirah beachfront mansions, Downtown Dubai skyline apartments, and Business Bay offices with zero property tax.",
    heroBgImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=80",
    topDevelopers: [
      { name: "EMAAR PROPERTIES", count: "120+ Projects" },
      { name: "DAMAC PROPERTIES", count: "85+ Projects" },
      { name: "NAKHEEL", count: "45+ Projects" },
      { name: "SOBHA REALTY", count: "35+ Projects" },
      { name: "ALDAR PROPERTIES", count: "50+ Projects" },
      { name: "DUBAI HOLDING", count: "65+ Projects" },
      { name: "MERAAS", count: "28+ Projects" },
      { name: "DANUBE PROPERTIES", count: "40+ Projects" },
    ],
    topCities: [
      { name: "Dubai", slug: "dubai", count: "2,450+ Listings", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80", desc: "Burj Khalifa views, Downtown penthouses, Palm beachfront villas & Marina towers" },
      { name: "Abu Dhabi", slug: "abu-dhabi", count: "1,120+ Listings", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80", desc: "Saadiyat cultural district, Yas Island luxury villas & Al Reem high-rises" },
    ],
    sampleProperties: [
      { id: "ae-1", title: "Palm Jumeirah Oceanfront Mansion with Private Beach", location: "Palm Jumeirah, Dubai", price: "AED 18,500,000", type: "VILLA", bhk: "6 BHK", bath: "7 Bath", area: "8,500 sqft", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80", tag: "WATERFRONT", purpose: "FOR SALE" },
      { id: "ae-2", title: "Burj Khalifa Skyline Luxury Penthouse", location: "Downtown Dubai", price: "AED 9,200,000", type: "APARTMENT", bhk: "4 BHK", bath: "4 Bath", area: "4,100 sqft", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80", tag: "BURJ VIEW", purpose: "FOR SALE" },
    ],
    sampleProjects: [
      { id: "ae-proj-1", title: "Emaar Beachfront South Beach Towers", location: "Dubai Harbour, Dubai", developer: "Emaar Properties", price: "AED 3,100,000 Onwards", status: "FOR SALE", bhk: "1 - 3 BHK", sqft: "950 - 2,100 sqft", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80", badge: "OFF-PLAN LAUNCH" },
      { id: "ae-proj-2", title: "Damac Lagoons Mediterranean Villas", location: "Damac Lagoons, Dubai", developer: "Damac Properties", price: "AED 2,850,000 Onwards", status: "FOR SALE", bhk: "4 & 5 BHK", sqft: "2,800 - 4,200 sqft", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", badge: "EXCLUSIVE" },
    ],
  },

  // 🇺🇸 USA
  US: {
    countryCode: "US",
    countryName: "United States",
    flag: "🇺🇸",
    currency: "USD",
    symbol: "$",
    defaultLocale: "en",
    heroTag: "Premier US Residential & Commercial Real Estate",
    heroHeadline: "Explore America's",
    heroHighlight: "finest real estate investments.",
    heroSubtitle: "Search Manhattan penthouses, Beverly Hills estates, Miami oceanfront condos, and suburban family communities.",
    heroBgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80",
    topDevelopers: [
      { name: "D.R. HORTON", count: "150+ Communities" },
      { name: "LENNAR CORP", count: "135+ Communities" },
      { name: "PULTEGROUP", count: "90+ Communities" },
      { name: "TOLL BROTHERS", count: "75+ Luxury Projects" },
      { name: "RELATED COMPANIES", count: "45+ High Rises" },
      { name: "TISHMAN SPEYER", count: "30+ Towers" },
      { name: "SL GREEN REALTY", count: "25+ Commercial" },
      { name: "EXTELL DEVELOPMENT", count: "20+ Penthouses" },
    ],
    topCities: [
      { name: "New York", slug: "new-york", count: "3,100+ Listings", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", desc: "Manhattan Upper East Side brownstones, SoHo lofts & Tribeca penthouses" },
      { name: "Los Angeles", slug: "los-angeles", count: "2,150+ Listings", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", desc: "Beverly Hills architectural estates, Bel Air mansions & Malibu coastal homes" },
      { name: "Miami", slug: "miami", count: "1,890+ Listings", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80", desc: "South Beach oceanfront towers, Brickell luxury condos & Star Island estates" },
    ],
    sampleProperties: [
      { id: "us-1", title: "Manhattan Central Park View Penthouse", location: "Upper East Side, New York", price: "$ 14,500,000", type: "PENTHOUSE", bhk: "4 Bed", bath: "5 Bath", area: "4,800 sqft", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80", tag: "PARK VIEW", purpose: "FOR SALE" },
      { id: "us-2", title: "Beverly Hills Contemporary Gated Estate", location: "Beverly Hills, Los Angeles", price: "$ 12,800,000", type: "VILLA", bhk: "5 Bed", bath: "6 Bath", area: "6,200 sqft", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", tag: "CELEBRITY HOMES", purpose: "FOR SALE" },
    ],
    sampleProjects: [
      { id: "us-proj-1", title: "Hudson Yards Modern Tower Residences", location: "Midtown West, New York", developer: "Related Companies", price: "$ 4,200,000 Onwards", status: "FOR SALE", bhk: "2 & 3 Bed", sqft: "1,600 - 2,900 sqft", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", badge: "NEW DEVELOPMENT" },
    ],
  },

  // 🇬🇧 UK
  GB: {
    countryCode: "GB",
    countryName: "United Kingdom",
    flag: "🇬🇧",
    currency: "GBP",
    symbol: "£",
    defaultLocale: "en",
    heroTag: "Prime UK & London Luxury Property Portal",
    heroHeadline: "Find prestigious",
    heroHighlight: "London & UK residences.",
    heroSubtitle: "Browse Mayfair period townhouses, Knightsbridge luxury apartments, and Thames waterfront developments.",
    heroBgImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2000&q=80",
    topDevelopers: [
      { name: "BERKELEY GROUP", count: "65+ Developments" },
      { name: "BARRATT DEVELOPMENTS", count: "80+ Schemes" },
      { name: "TAYLOR WIMPEY", count: "75+ Projects" },
      { name: "PERSIMMON HOMES", count: "90+ Communities" },
      { name: "BALLYMORE", count: "30+ Luxury Waterfront" },
      { name: "REDROW HOMES", count: "45+ Estates" },
      { name: "GROSVENOR ESTATE", count: "25+ Prime London" },
      { name: "SHAFTSBURY CAPITAL", count: "20+ Commercial" },
    ],
    topCities: [
      { name: "London", slug: "london", count: "2,850+ Listings", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80", desc: "Mayfair mansions, Knightsbridge luxury flats & Kensington period houses" },
    ],
    sampleProperties: [
      { id: "gb-1", title: "Knightsbridge Garden Square Period Residence", location: "Knightsbridge, London", price: "£ 8,950,000", type: "APARTMENT", bhk: "3 Bed", bath: "3 Bath", area: "2,800 sqft", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80", tag: "PRIME CENTRAL", purpose: "FOR SALE" },
    ],
    sampleProjects: [
      { id: "gb-proj-1", title: "White City Living Luxury Scheme", location: "Shepherd's Bush, London", developer: "Berkeley Group", price: "£ 850,000 Onwards", status: "FOR SALE", bhk: "1 - 3 Bed", sqft: "650 - 1,400 sqft", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80", badge: "NEW RELEASE" },
    ],
  },

  // 🇸🇦 SAUDI ARABIA
  SA: {
    countryCode: "SA",
    countryName: "Saudi Arabia",
    flag: "🇸🇦",
    currency: "SAR",
    symbol: "SAR ",
    defaultLocale: "ar",
    heroTag: "Saudi Arabia Vision 2030 Real Estate Portal",
    heroHeadline: "Invest in Saudi",
    heroHighlight: "Vision 2030 giga-projects.",
    heroSubtitle: "Explore luxury compounds in Riyadh, Red Sea coastal resorts, and Jeddah waterfront towers.",
    heroBgImage: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=2000&q=80",
    topDevelopers: [
      { name: "ROSHN (PIF)", count: "80+ Masterplans" },
      { name: "NEOM REAL ESTATE", count: "35+ Futuristic Projects" },
      { name: "DIRIYAH COMPANY", count: "25+ Heritage Projects" },
      { name: "RED SEA GLOBAL", count: "20+ Luxury Resorts" },
      { name: "DAR AL ARKAN", count: "45+ Residential Towers" },
      { name: "EMAAR ECONOMIC CITY", count: "30+ Communities" },
      { name: "RETAL URBAN DEV", count: "40+ Projects" },
      { name: "ALAKARIA", count: "25+ Projects" },
    ],
    topCities: [
      { name: "Riyadh", slug: "riyadh", count: "1,650+ Listings", image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=800&q=80", desc: "KAFD financial district towers, Al Olaya commercial hubs & Al Malqa villas" },
    ],
    sampleProperties: [
      { id: "sa-1", title: "Riyadh Luxury Compound Royal Villa", location: "Hittin, Riyadh", price: "SAR 7,800,000", type: "VILLA", bhk: "5 BHK", bath: "6 Bath", area: "5,400 sqft", image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=800&q=80", tag: "ROYAL COMPOUND", purpose: "FOR SALE" },
    ],
    sampleProjects: [
      { id: "sa-proj-1", title: "ROSHN SEDRA Gated Community", location: "North Riyadh, Riyadh", developer: "ROSHN (PIF)", price: "SAR 2,400,000 Onwards", status: "FOR SALE", bhk: "3 & 4 Villa", sqft: "2,200 - 3,800 sqft", image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=800&q=80", badge: "VISION 2030" },
    ],
  },
};

export function getCountryMarket(code: string): CountryMarketConfig {
  return COUNTRY_MARKETS[code] || COUNTRY_MARKETS.IN;
}
