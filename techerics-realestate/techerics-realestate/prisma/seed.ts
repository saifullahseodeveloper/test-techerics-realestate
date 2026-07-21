import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1) Country + Region + sample Cities/Localities (India-focused, extend as needed)
  const india = await prisma.country.upsert({
    where: { code: "IN" },
    update: {},
    create: { code: "IN", slug: "india" },
  });

  const maharashtra = await prisma.region.upsert({
    where: { countryId_slug: { countryId: india.id, slug: "maharashtra" } },
    update: {},
    create: { name: "Maharashtra", slug: "maharashtra", countryId: india.id },
  });

  const mumbai = await prisma.city.upsert({
    where: { regionId_slug: { regionId: maharashtra.id, slug: "mumbai" } },
    update: {},
    create: {
      name: "Mumbai",
      slug: "mumbai",
      regionId: maharashtra.id,
      latitude: 19.076,
      longitude: 72.8777,
      seoContent:
        "Mumbai is India's financial capital, offering everything from sea-facing apartments in Bandra to commercial spaces in BKC. Property prices vary widely by suburb, with South Mumbai commanding the highest premiums.",
    },
  });

  const localities = ["Bandra West", "Andheri West", "Powai", "Malad West", "Thane"];
  for (const name of localities) {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    await prisma.locality.upsert({
      where: { cityId_slug: { cityId: mumbai.id, slug } },
      update: {},
      create: { name, slug, cityId: mumbai.id, avgPricePerSqft: 25000 },
    });
  }

  // 2) Initial super-admin user — password hashed with bcrypt, never stored plain
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

  console.log(`Seed complete. Admin login: ${adminEmail} / (password from SEED_ADMIN_PASSWORD env)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
