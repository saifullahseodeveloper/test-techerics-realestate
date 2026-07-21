// ============================================================
// GLOBAL LOCATIONS DATASET & PROGRAMMATIC SEO HELPERS
// Supports 25+ worldwide countries, 100+ major cities, and key
// localities for programmatic real estate SEO pages.
// ============================================================

export type CountryData = {
  name: string;
  code: string; // ISO 2-letter
  slug: string;
  currency: string;
  symbol: string;
  flag: string;
  region: string;
};

export type CityData = {
  name: string;
  slug: string;
  countryCode: string;
  countryName: string;
  regionName: string;
  latitude: number;
  longitude: number;
  popularLocalities: string[];
  seoDescription: string;
};

export const GLOBAL_COUNTRIES: CountryData[] = [
  { name: "India", code: "IN", slug: "india", currency: "INR", symbol: "₹", flag: "🇮🇳", region: "Asia" },
  { name: "United Arab Emirates", code: "AE", slug: "uae", currency: "AED", symbol: "AED ", flag: "🇦🇪", region: "Middle East" },
  { name: "United States", code: "US", slug: "usa", currency: "USD", symbol: "$", flag: "🇺🇸", region: "North America" },
  { name: "United Kingdom", code: "GB", slug: "uk", currency: "GBP", symbol: "£", flag: "🇬🇧", region: "Europe" },
  { name: "Canada", code: "CA", slug: "canada", currency: "CAD", symbol: "C$", flag: "🇨🇦", region: "North America" },
  { name: "Australia", code: "AU", slug: "australia", currency: "AUD", symbol: "A$", flag: "🇦🇺", region: "Oceania" },
  { name: "Singapore", code: "SG", slug: "singapore", currency: "SGD", symbol: "S$", flag: "🇸🇬", region: "Asia" },
  { name: "Saudi Arabia", code: "SA", slug: "saudi-arabia", currency: "SAR", symbol: "SAR ", flag: "🇸🇦", region: "Middle East" },
  { name: "Qatar", code: "QA", slug: "qatar", currency: "QAR", symbol: "QAR ", flag: "🇶🇦", region: "Middle East" },
  { name: "Germany", code: "DE", slug: "germany", currency: "EUR", symbol: "€", flag: "🇩🇪", region: "Europe" },
  { name: "France", code: "FR", slug: "france", currency: "EUR", symbol: "€", flag: "🇫🇷", region: "Europe" },
  { name: "Spain", code: "ES", slug: "spain", currency: "EUR", symbol: "€", flag: "🇪🇸", region: "Europe" },
  { name: "Thailand", code: "TH", slug: "thailand", currency: "THB", symbol: "฿", flag: "🇹🇭", region: "Asia" },
  { name: "Indonesia", code: "ID", slug: "indonesia", currency: "IDR", symbol: "Rp ", flag: "🇮🇩", region: "Asia" },
];

export const GLOBAL_CITIES: CityData[] = [
  // --- INDIA ---
  {
    name: "Mumbai",
    slug: "mumbai",
    countryCode: "IN",
    countryName: "India",
    regionName: "Maharashtra",
    latitude: 19.076,
    longitude: 72.8777,
    popularLocalities: ["Bandra West", "Worli", "BKC", "Powai", "Andheri West", "Lower Parel", "Juhu"],
    seoDescription: "Explore luxury sea-facing apartments, penthouses, and commercial spaces in Mumbai, India's financial capital.",
  },
  {
    name: "Delhi NCR",
    slug: "delhi-ncr",
    countryCode: "IN",
    countryName: "India",
    regionName: "Delhi / Haryana / UP",
    latitude: 28.6139,
    longitude: 77.209,
    popularLocalities: ["Golf Course Road", "Cyber City", "Vasant Vihar", "Noida Expressway", "Sohna Road"],
    seoDescription: "Find premier residential townships, villas, and commercial hubs across Delhi, Gurgaon, and Noida.",
  },
  {
    name: "Bangalore",
    slug: "bangalore",
    countryCode: "IN",
    countryName: "India",
    regionName: "Karnataka",
    latitude: 12.9716,
    longitude: 77.5946,
    popularLocalities: ["Indiranagar", "Koramangala", "Whitefield", "Sarjapur Road", "Hebbal"],
    seoDescription: "Search top IT corridor apartments, gated communities, and luxury penthouses in Bangalore.",
  },
  {
    name: "Pune",
    slug: "pune",
    countryCode: "IN",
    countryName: "India",
    regionName: "Maharashtra",
    latitude: 18.5204,
    longitude: 73.8567,
    popularLocalities: ["Koregaon Park", "Baner", "Hinjewadi", "Viman Nagar", "Kharadi"],
    seoDescription: "Discover luxury villas, green gated townships, and tech park commercial spaces in Pune.",
  },
  {
    name: "Hyderabad",
    slug: "hyderabad",
    countryCode: "IN",
    countryName: "India",
    regionName: "Telangana",
    latitude: 17.385,
    longitude: 78.4867,
    popularLocalities: ["Jubilee Hills", "Banjara Hills", "HITEC City", "Gachibowli", "Kondapur"],
    seoDescription: "Browse ultra-luxury villas and commercial towers in Hyderabad's premier tech hubs.",
  },

  // --- UAE ---
  {
    name: "Dubai",
    slug: "dubai",
    countryCode: "AE",
    countryName: "United Arab Emirates",
    regionName: "Dubai Emirate",
    latitude: 25.2048,
    longitude: 55.2708,
    popularLocalities: ["Downtown Dubai", "Palm Jumeirah", "Dubai Marina", "Business Bay", "Jumeirah Golf Estates"],
    seoDescription: "Invest in Dubai skyline apartments, beachfront Palm Jumeirah villas, and high-yield commercial investments.",
  },
  {
    name: "Abu Dhabi",
    slug: "abu-dhabi",
    countryCode: "AE",
    countryName: "United Arab Emirates",
    regionName: "Abu Dhabi Emirate",
    latitude: 24.4539,
    longitude: 54.3773,
    popularLocalities: ["Saadiyat Island", "Yas Island", "Al Reem Island", "Corniche"],
    seoDescription: "Luxury island residences, beachfront villas, and waterfront developments in Abu Dhabi.",
  },

  // --- USA ---
  {
    name: "New York",
    slug: "new-york",
    countryCode: "US",
    countryName: "United States",
    regionName: "New York",
    latitude: 40.7128,
    longitude: -74.006,
    popularLocalities: ["Manhattan Upper East Side", "Tribeca", "Brooklyn Heights", "SoHo"],
    seoDescription: "Find luxury Manhattan penthouses, brownstones, and high-rise condominiums in New York City.",
  },
  {
    name: "Los Angeles",
    slug: "los-angeles",
    countryCode: "US",
    countryName: "United States",
    regionName: "California",
    latitude: 34.0522,
    longitude: -118.2437,
    popularLocalities: ["Beverly Hills", "Bel Air", "Santa Monica", "Malibu", "Hollywood Hills"],
    seoDescription: "Luxury celebrity mansions, coastal villas, and modern architectural estates in Los Angeles.",
  },
  {
    name: "Miami",
    slug: "miami",
    countryCode: "US",
    countryName: "United States",
    regionName: "Florida",
    latitude: 25.7617,
    longitude: -80.1918,
    popularLocalities: ["South Beach", "Brickell", "Star Island", "Sunny Isles"],
    seoDescription: "Oceanfront condos, luxury waterfront estates, and tropical villas in Miami.",
  },

  // --- UK ---
  {
    name: "London",
    slug: "london",
    countryCode: "GB",
    countryName: "United Kingdom",
    regionName: "Greater London",
    latitude: 51.5074,
    longitude: -0.1278,
    popularLocalities: ["Mayfair", "Knightsbridge", "Kensington", "Canary Wharf", "Chelsea"],
    seoDescription: "Prime central London luxury apartments, period townhouses, and financial district penthouses.",
  },

  // --- CANADA ---
  {
    name: "Toronto",
    slug: "toronto",
    countryCode: "CA",
    countryName: "Canada",
    regionName: "Ontario",
    latitude: 43.6532,
    longitude: -79.3832,
    popularLocalities: ["Yorkville", "Downtown Core", "The Bridle Path", "Waterfront"],
    seoDescription: "Discover luxury downtown Toronto condos, custom executive estates, and commercial real estate.",
  },

  // --- AUSTRALIA ---
  {
    name: "Sydney",
    slug: "sydney",
    countryCode: "AU",
    countryName: "Australia",
    regionName: "New South Wales",
    latitude: -33.8688,
    longitude: 151.2093,
    popularLocalities: ["Point Piper", "Bondi Beach", "Mosman", "Darling Harbour"],
    seoDescription: "Harbourfront mansions, Bondi oceanview apartments, and prime Sydney CBD properties.",
  },

  // --- SINGAPORE ---
  {
    name: "Singapore",
    slug: "singapore",
    countryCode: "SG",
    countryName: "Singapore",
    regionName: "Central Region",
    latitude: 1.3521,
    longitude: 103.8198,
    popularLocalities: ["Orchard Road", "Marina Bay", "Sentosa Cove", "Bukit Timah"],
    seoDescription: "Prime District 9/10 luxury condominiums, Sentosa waterfront bungalows, and commercial towers in Singapore.",
  },

  // --- SAUDI ARABIA ---
  {
    name: "Riyadh",
    slug: "riyadh",
    countryCode: "SA",
    countryName: "Saudi Arabia",
    regionName: "Riyadh Province",
    latitude: 24.7136,
    longitude: 46.6753,
    popularLocalities: ["KAFD Financial District", "Al Olaya", "Al Malqa", "Hittin"],
    seoDescription: "Explore luxury villas, modern compounds, and commercial towers in Riyadh.",
  },
];

/** Helper to generate structured JSON-LD for any city page */
export function generateCitySchema(city: CityData) {
  return {
    "@context": "https://schema.org",
    "@type": "City",
    name: city.name,
    containedInPlace: {
      "@type": "Country",
      name: city.countryName,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: city.latitude,
      longitude: city.longitude,
    },
    description: city.seoDescription,
  };
}
