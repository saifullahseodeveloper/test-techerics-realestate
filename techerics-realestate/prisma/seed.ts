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
