import Link from "next/link";
import { GLOBAL_CITIES, GLOBAL_COUNTRIES } from "@/lib/global-locations";

export default function NotFound() {
  const popularCities = GLOBAL_CITIES.slice(0, 8);
  const popularCountries = GLOBAL_COUNTRIES.slice(0, 6);

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased">
        <main className="min-h-screen px-4 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
              Page Not Found
            </span>
            <h1 className="mt-3 font-serif text-5xl font-bold text-white sm:text-7xl">
              404
            </h1>
            <p className="mt-4 text-base text-slate-400 max-w-lg mx-auto">
              The page you're looking for doesn't exist or may have been moved. 
              Explore our popular locations and properties below.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/en"
                className="rounded-xl bg-teal-500 px-6 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-teal-400"
              >
                Go to Homepage
              </Link>
              <Link
                href="/en/blog"
                className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-2.5 text-sm font-bold text-slate-200 transition hover:bg-slate-800"
              >
                Read Market Insights
              </Link>
            </div>
          </div>

          {/* Suggested Locations */}
          <div className="mx-auto mt-16 max-w-5xl">
            <h2 className="font-serif text-xl font-bold text-white text-center mb-8">
              Popular Locations You May Be Looking For
            </h2>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {popularCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/en/${city.slug}`}
                  className="group rounded-2xl border border-slate-800 bg-slate-900 p-4 transition hover:border-teal-500/40"
                >
                  <span className="text-sm font-bold text-white group-hover:text-teal-300">
                    📍 {city.name}
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">
                    {city.countryName} · {city.regionName}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Browse by Country */}
          <div className="mx-auto mt-12 max-w-5xl">
            <h2 className="font-serif text-lg font-bold text-white text-center mb-6">
              Browse by Country
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {popularCountries.map((country) => (
                <Link
                  key={country.slug}
                  href={`/en/${country.slug}`}
                  className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-teal-500/30 hover:text-white"
                >
                  {country.flag} {country.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Searches */}
          <div className="mx-auto mt-12 max-w-5xl">
            <h2 className="font-serif text-lg font-bold text-white text-center mb-6">
              Popular Searches
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { label: "Apartments in Dubai", href: "/en/dubai/apartments/for-sale" },
                { label: "Villas in Mumbai", href: "/en/mumbai/villas/for-sale" },
                { label: "Offices in Abu Dhabi", href: "/en/abu-dhabi/offices/for-rent" },
                { label: "Penthouses in London", href: "/en/london/penthouses/for-sale" },
                { label: "Studios in New York", href: "/en/new-york/studios/for-rent" },
                { label: "Townhouses in Dubai", href: "/en/dubai/townhouses/for-sale" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs font-medium text-slate-400 transition hover:text-teal-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
