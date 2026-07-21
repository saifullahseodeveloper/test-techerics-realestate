import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import PropertyCard from "@/components/PropertyCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Saved Properties | Tech Erics",
};

export default async function SavedPropertiesPage() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect("/admin/login?callbackUrl=/dashboard/saved");
  }

  const saved = await prisma.savedProperty.findMany({
    where: { userId: session.user.id },
    include: {
      property: {
        include: {
          city: true,
          locality: true,
          developer: true,
          listings: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-serif text-3xl font-bold text-white mb-8">
          My Saved Properties
        </h1>

        {saved.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
            <h2 className="text-xl font-bold text-slate-300">No properties saved yet</h2>
            <p className="mt-2 text-sm text-slate-500">
              Explore our listings and click the heart icon to save properties for later.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-lg bg-teal-500 px-6 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-teal-400"
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((s) => {
              const p = s.property;
              const listing = p.listings[0];
              const priceStr = listing ? `${listing.currency} ${listing.price.toString()}` : "Price on Request";

              return (
                <div key={s.id} className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80" 
                      alt={p.title} 
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105" 
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-teal-400 font-semibold">📍 {p.locality.name}, {p.city.name}</span>
                    <h3 className="mt-1 text-base font-bold text-white group-hover:text-teal-300 line-clamp-1">{p.title}</h3>
                    <div className="mt-3 flex items-center justify-between border-t border-b border-slate-800 py-2.5 text-xs text-slate-400">
                      <span>🛏️ {p.bedrooms} Bed</span>
                      <span>📐 {p.areaSqft} sqft</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-base font-extrabold text-amber-300">{priceStr}</span>
                      <Link
                        href={`/en/property/${p.slug}`}
                        className="rounded-xl bg-teal-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-teal-400"
                      >
                        View Property →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
