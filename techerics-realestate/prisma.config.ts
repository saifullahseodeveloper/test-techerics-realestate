import "dotenv/config";
import { defineConfig } from "prisma/config";

// Neon DB compatibility: Prisma migrations require a direct (unpooled) connection
// because PgBouncer connection pooling blocks postgres advisory locks (error P1002).
// We prioritize DIRECT_URL, or automatically strip '-pooler' from DATABASE_URL.
const rawUrl = process.env.DIRECT_URL || process.env.DATABASE_URL || "";
const directDbUrl = rawUrl.replace("-pooler.", ".");

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: directDbUrl,
  },
});

