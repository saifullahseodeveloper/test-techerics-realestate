import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import { GLOBAL_COUNTRIES, GLOBAL_CITIES } from "../lib/global-locations";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding global geography & admin user...");

  // 1) Countries & Cities
  for (const cData of GLOBAL_COUNTRIES) {
    const country = await prisma.country.upsert({
      where: { code: cData.code },
      update: { name: cData.name } as any,
      create: { code: cData.code, slug: cData.slug, name: cData.name },
    });

    const region = await prisma.region.upsert({
      where: { countryId_slug: { countryId: country.id, slug: cData.slug } },
      update: {},
      create: { name: `${cData.name} Region`, slug: cData.slug, countryId: country.id },
    });

    const matchingCities = GLOBAL_CITIES.filter((city) => city.countryCode === cData.code);

    for (const cityItem of matchingCities) {
      const city = await prisma.city.upsert({
        where: { slug: cityItem.slug },
        update: { seoContent: cityItem.seoDescription },
        create: {
          name: cityItem.name,
          slug: cityItem.slug,
          regionId: region.id,
          latitude: cityItem.latitude,
          longitude: cityItem.longitude,
          seoContent: cityItem.seoDescription,
        },
      });

      for (const locName of cityItem.popularLocalities) {
        const locSlug = locName.toLowerCase().replace(/\s+/g, "-");
        await prisma.locality.upsert({
          where: { cityId_slug: { cityId: city.id, slug: locSlug } },
          update: {},
          create: { name: locName, slug: locSlug, cityId: city.id, avgPricePerSqft: 15000 },
        });
      }
    }
  }

  // 2) Initial Super-Admin user
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@techerics.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!";
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: "Tech Erics Admin",
      role: "SUPER_ADMIN",
    },
  });

  // 3) Blog Categories & Sample Posts
  const catMarket = await prisma.blogCategory.upsert({
    where: { slug: "market-trends" },
    update: {},
    create: { name: "Market Trends", slug: "market-trends" }
  });

  const catGuide = await prisma.blogCategory.upsert({
    where: { slug: "area-guides" },
    update: {},
    create: { name: "Area Guides", slug: "area-guides" }
  });

  await prisma.blogPost.upsert({
    where: { slug: "dubai-real-estate-market-report-2026" },
    update: {},
    create: {
      title: "Dubai Real Estate Market Report 2026",
      slug: "dubai-real-estate-market-report-2026",
      content: "The Dubai real estate market continues to surge in 2026, driven by high demand for luxury villas and waterfront properties. Investors are seeing a 14% YoY appreciation...",
      authorName: "Sarah Al Maktoum",
      categoryId: catMarket.id,
      published: true,
      coverImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80"
    }
  });

  await prisma.blogPost.upsert({
    where: { slug: "ultimate-guide-to-buying-property-in-mumbai" },
    update: {},
    create: {
      title: "The Ultimate Guide to Buying Property in Mumbai",
      slug: "ultimate-guide-to-buying-property-in-mumbai",
      content: "Mumbai remains one of the most lucrative real estate markets in India. In this guide, we break down top localities like Bandra and South Mumbai for prospective buyers...",
      authorName: "Rahul Sharma",
      categoryId: catGuide.id,
      published: true,
      coverImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80"
    }
  });

  console.log(`Global Seed complete! Super Admin: ${adminEmail}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
