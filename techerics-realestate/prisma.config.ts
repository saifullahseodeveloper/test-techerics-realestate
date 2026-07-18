import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// Prisma 7 moved the datasource URL out of schema.prisma into this config
// file — schema.prisma's `url = env("DATABASE_URL")` alone is no longer
// enough for CLI commands like `migrate deploy` (this file didn't exist
// when the project was first scaffolded; Prisma 7 released after that
// and made this file mandatory).
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
