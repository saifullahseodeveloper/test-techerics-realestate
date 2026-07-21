"use client";

import Link from "next/link";

type CityCard = {
  name: string;
  slug: string;
  count: string;
  image: string;
  desc: string;
};

const CITIES: CityCard[] = [
  {
    name: "Mumbai",
    slug: "mumbai",
    count: "1,240+ Listings",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
    desc: "Sea-facing flats in Bandra, BKC offices & South Mumbai heritage villas",
  },
  {
    name: "Delhi NCR",
    slug: "delhi-ncr",
    count: "980+ Listings",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
    desc: "Golf Course Road luxury penthouses & Cyber City tech parks",
  },
  {
    name: "Bangalore",
    slug: "bangalore",
    count: "850+ Listings",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80",
    desc: "Indiranagar villas, Whitefield IT corridor & Koramangala apartments",
  },
  {
    name: "Pune",
    slug: "pune",
    count: "620+ Listings",
    image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80",
    desc: "Koregaon Park greenery, Baner gated communities & Hinjewadi plots",
  },
  {
    name: "Hyderabad",
    slug: "hyderabad",
    count: "540+ Listings",
    image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=800&q=80",
    desc: "Jubilee Hills celebrity mansions & HITEC City commercial towers",
  },
  {
    name: "Dubai",
    slug: "dubai",
    count: "310+ International",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    desc: "Downtown Dubai skyline apartments & Palm Jumeirah beach villas",
  },
];

export default function ExploreCities() {
  return (
    <section className="bg-slate-950 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
            Prime Locations
          </span>
          <h2 className="mt-1 font-serif text-2xl font-bold text-white sm:text-3xl">
            Explore Properties by City
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Click any city to view verified listings, locality price trends, and neighborhood guides.
          </p>
        </div>

        {/* 3x2 Grid of visual cards with image overlay */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/50 hover:shadow-2xl"
            >
              {/* Image background */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={city.image}
                  alt={city.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              </div>

              {/* Text content over image */}
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-teal-300">
                    {city.name}
                  </h3>
                  <span className="rounded-full bg-teal-500/20 px-3 py-1 text-xs font-semibold text-teal-300 backdrop-blur border border-teal-500/30">
                    {city.count}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-slate-300 line-clamp-2">
                  {city.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
