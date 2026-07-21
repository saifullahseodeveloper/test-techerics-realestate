"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GLOBAL_COUNTRIES, GLOBAL_CITIES, CountryData, CityData } from "@/lib/global-locations";
import { useCountry } from "@/lib/country-context";
import { getCountryMarket } from "@/lib/country-data";

type Props = {
  selectedCity?: string;
  onSelect?: (country: CountryData, city?: CityData) => void;
};

export default function GlobalLocationSelector({ selectedCity, onSelect }: Props) {
  const router = useRouter();
  const { countryCode, setCountryCode, market } = useCountry();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const activeCountryData =
    GLOBAL_COUNTRIES.find((c) => c.code === countryCode) || GLOBAL_COUNTRIES[0];

  const filteredCities = GLOBAL_CITIES.filter((city) => {
    const matchesCountry = city.countryCode === countryCode;
    const matchesSearch =
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.popularLocalities.some((l) => l.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCountry && matchesSearch;
  });

  const handleCountryClick = (c: CountryData) => {
    setCountryCode(c.code);
    const m = getCountryMarket(c.code);
    if (m.defaultLocale === "ar") {
      router.push(`/ar`);
    } else if (m.defaultLocale === "hi") {
      router.push(`/hi`);
    } else {
      router.push(`/en`);
    }
  };

  const handleCityClick = (city: CityData) => {
    if (onSelect) {
      onSelect(activeCountryData, city);
    } else {
      router.push(`/${city.slug}`);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/90 px-3.5 py-2 text-xs font-semibold text-white shadow-md backdrop-blur transition hover:border-teal-400 hover:bg-slate-800"
      >
        <span>{activeCountryData.flag}</span>
        <span className="truncate max-w-[120px]">
          {selectedCity || activeCountryData.name}
        </span>
        <span className="text-slate-400 text-[10px]">▼</span>
      </button>

      {/* Modal Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-800 bg-slate-950 p-4 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Select Country & Market
            </h4>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          </div>

          {/* Country Tabs */}
          <div className="mt-3 flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
            {GLOBAL_COUNTRIES.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => handleCountryClick(c)}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                  countryCode === c.code
                    ? "bg-teal-500 text-slate-950 font-bold shadow"
                    : "bg-slate-900 text-slate-300 hover:bg-slate-800"
                }`}
              >
                <span>{c.flag}</span>
                <span>{c.name}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="mt-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search cities in ${market.countryName}...`}
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-teal-400 focus:outline-none"
            />
          </div>

          {/* Cities List */}
          <div className="mt-3 max-h-48 overflow-y-auto space-y-1 pr-1">
            {filteredCities.map((city) => (
              <div
                key={city.slug}
                onClick={() => handleCityClick(city)}
                className="group flex flex-col cursor-pointer rounded-xl p-2 transition hover:bg-slate-900"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-teal-300">
                  <span>📍 {city.name}</span>
                  <span className="text-[10px] text-slate-500">{city.regionName}</span>
                </div>
                <p className="mt-0.5 text-[11px] text-slate-400 truncate">
                  {city.popularLocalities.join(" • ")}
                </p>
              </div>
            ))}
            {!filteredCities.length && (
              <p className="py-4 text-center text-xs text-slate-500">
                No cities found for {market.countryName}.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
