"use client";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  avatar: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Tech Erics team made our Bandra home purchase completely smooth. Zero hidden charges, 100% legal clarity, and direct developer negotiation saved us over ₹12 Lakhs!",
    name: "Vikram & Neha Sharma",
    role: "IT Director & Architect",
    location: "Bought 3 BHK in Bandra West",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote: "The 360° virtual tours allowed us to inspect 10+ properties in Gurgaon before traveling. The agent was super transparent and coordinated everything seamlessly.",
    name: "Rajesh Malhotra",
    role: "Senior Consultant",
    location: "Bought 4 BHK Villa in Gurgaon",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote: "As an NRI buyer, trust is paramount. Tech Erics verified all land titles and completed the registration without me having to take leave from work.",
    name: "Ananya Iyer",
    role: "NRI Tech Lead",
    location: "Bought Penthouse in Bangalore",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote: "Found our ideal commercial office space in BKC through their dedicated corporate team. Extremely professional service with zero brokerage!",
    name: "Amitabh Deshmukh",
    role: "Founder, Fintech Corp",
    location: "Leased Commercial in BKC",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote: "The video walkthroughs on their platform are 100% realistic. What we saw online was exactly what we got on-site.",
    name: "Pooja & Rohan Mehta",
    role: "Entrepreneurs",
    location: "Bought Sea View Flat in Worli",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote: "Exceptional service! They handled bank loan approvals, legal documentation, and registration in under 14 days.",
    name: "Dr. K. S. Reddy",
    role: "Chief Cardiologist",
    location: "Bought Villa in Jubilee Hills",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-slate-900 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
            Verified Customer Reviews
          </span>
          <h2 className="mt-1 font-serif text-2xl font-bold text-white sm:text-3xl">
            Real Stories from Happy Homeowners
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Join over 5,000+ satisfied families and investors who trusted Tech Erics for their property journey.
          </p>
        </div>

        {/* 3x2 Grid of Testimonial Cards matching reference image */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-md transition-all duration-300 hover:border-teal-500/40 hover:shadow-xl"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 text-sm">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                {/* Quote Text */}
                <p className="mt-3 text-sm italic text-slate-300 leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              {/* User info footer */}
              <div className="mt-6 flex items-center gap-3 border-t border-slate-800/80 pt-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-10 w-10 rounded-full object-cover border border-teal-500/50"
                />
                <div>
                  <h4 className="text-sm font-semibold text-white">{t.name}</h4>
                  <p className="text-xs text-teal-400 font-medium">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
