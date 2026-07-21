"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { COUNTRY_MARKETS, CountryMarketConfig, getCountryMarket } from "./country-data";

type CountryContextType = {
  countryCode: string;
  market: CountryMarketConfig;
  setCountryCode: (code: string) => void;
};

const CountryContext = createContext<CountryContextType>({
  countryCode: "IN",
  market: COUNTRY_MARKETS.IN,
  setCountryCode: () => {},
});

export function CountryProvider({ children }: { children: React.ReactNode }) {
  const [countryCode, setCountryCodeState] = useState<string>("IN");

  useEffect(() => {
    const saved = localStorage.getItem("selected_country");
    if (saved && COUNTRY_MARKETS[saved]) {
      setCountryCodeState(saved);
    }
  }, []);

  const setCountryCode = (code: string) => {
    if (COUNTRY_MARKETS[code]) {
      setCountryCodeState(code);
      localStorage.setItem("selected_country", code);
    }
  };

  const market = getCountryMarket(countryCode);

  return (
    <CountryContext.Provider value={{ countryCode, market, setCountryCode }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  return useContext(CountryContext);
}
